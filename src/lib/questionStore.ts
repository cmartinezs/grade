/**
 * CU-BP-01: Crear ítem nuevo en el Banco de Preguntas
 * Mock data store for questions bank with localStorage
 */

import {
  Question,
  QuestionOption,
  CreateQuestionInput,
  UpdateQuestionInput,
  QuestionValidationError,
  QuestionWithDetails,
  DuplicateDetectionResult,
  QuestionType,
  DifficultyLevel,
} from '@/types/question';
import { getAllTopics, getAllUnits, getAllSubjects } from './curriculumHierarchyStore';

// LocalStorage keys
const STORAGE_KEYS = {
  QUESTIONS: 'questions_bank_questions',
  OPTIONS: 'questions_bank_options',
  COUNTERS: 'questions_bank_counters',
};

class QuestionStore {
  private initialized = false;

  // Initialize localStorage with default data if empty
  private initialize(): void {
    if (this.initialized) return;

    if (typeof window === 'undefined') return; // Skip on server-side

    // Check if data exists
    const existingQuestions = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!existingQuestions) {
      // First time - initialize with empty arrays
      this.saveQuestions([]);
      this.saveOptions([]);
      this.saveCounters({ question: 0, option: 0 });
    }

    this.initialized = true;
  }

  // Helper methods for localStorage
  private saveQuestions(questions: Question[]): void {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }

  private loadQuestions(): Question[] {
    this.initialize();
    const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!data) return [];
    
    const parsed = JSON.parse(data) as Question[];
    // Convert date strings back to Date objects
    return parsed.map((q) => ({
      ...q,
      created_at: new Date(q.created_at),
      updated_at: new Date(q.updated_at),
      deleted_at: q.deleted_at ? new Date(q.deleted_at) : null,
    }));
  }

  private saveOptions(options: QuestionOption[]): void {
    localStorage.setItem(STORAGE_KEYS.OPTIONS, JSON.stringify(options));
  }

  private loadOptions(): QuestionOption[] {
    this.initialize();
    const data = localStorage.getItem(STORAGE_KEYS.OPTIONS);
    if (!data) return [];
    
    const parsed = JSON.parse(data) as QuestionOption[];
    return parsed.map((opt) => ({
      ...opt,
      created_at: new Date(opt.created_at),
      updated_at: new Date(opt.updated_at),
    }));
  }

  private saveCounters(counters: { question: number; option: number }): void {
    localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify(counters));
  }

  private loadCounters(): { question: number; option: number } {
    this.initialize();
    const data = localStorage.getItem(STORAGE_KEYS.COUNTERS);
    return data ? JSON.parse(data) : { question: 0, option: 0 };
  }

  private generateId(type: 'question' | 'option'): string {
    const counters = this.loadCounters();
    const prefix = type === 'question' ? 'q' : 'opt';
    const newId = counters[type] + 1;
    counters[type] = newId;
    this.saveCounters(counters);
    return `${prefix}-${newId}`;
  }

  // Validation methods (RN-1, RN-2, RN-3, RN-6)
  validateQuestion(
    input: CreateQuestionInput, 
    questionTypeMetadata?: { minOptions: number; maxOptions: number; correctOptions: number; name: string }
  ): QuestionValidationError[] {
    const errors: QuestionValidationError[] = [];

    // RN-1: Required fields
    if (!input.enunciado?.trim()) {
      errors.push({ field: 'enunciado', message: 'El enunciado es obligatorio' });
    }

    if (!input.type) {
      errors.push({ field: 'type', message: 'El tipo de pregunta es obligatorio' });
    }

    if (!input.topic_fk) {
      errors.push({ field: 'topic_fk', message: 'El tema es obligatorio' });
    }

    if (!input.difficulty_fk) {
      errors.push({ field: 'difficulty_fk', message: 'La dificultad es obligatoria' });
    }

    // RN-3: Validate topic exists in CurriculumHierarchy
    if (input.topic_fk) {
      const topics = getAllTopics();
      const topic = topics.find((t) => t.topic_id === input.topic_fk && !t.deleted_at);
      if (!topic) {
        errors.push({ field: 'topic_fk', message: 'El tema seleccionado no existe o no está vigente' });
      }
    }

    // Validate options based on question type metadata
    if (questionTypeMetadata && questionTypeMetadata.minOptions > 0) {
      
      // RN-2: Validate number of options
      if (input.options.length < questionTypeMetadata.minOptions) {
        errors.push({
          field: 'options',
          message: `Debe tener al menos ${questionTypeMetadata.minOptions} opciones para preguntas de tipo ${questionTypeMetadata.name}`
        });
      }

      if (questionTypeMetadata.maxOptions > 0 && input.options.length > questionTypeMetadata.maxOptions) {
        errors.push({
          field: 'options',
          message: `Debe tener exactamente ${questionTypeMetadata.maxOptions} opciones para preguntas de tipo ${questionTypeMetadata.name}`
        });
      }

      // RN-2: Validate correct answers
      const correctCount = input.options.filter(opt => opt.is_correct).length;
      
      if (questionTypeMetadata.correctOptions > 0 && correctCount === 0) {
        errors.push({
          field: 'options',
          message: 'Debe marcar al menos una opción como correcta'
        });
      }

      if (correctCount !== questionTypeMetadata.correctOptions) {
        errors.push({
          field: 'options',
          message: `Debe marcar exactamente ${questionTypeMetadata.correctOptions} ${questionTypeMetadata.correctOptions === 1 ? 'opción como correcta' : 'opciones como correctas'} para preguntas de tipo ${questionTypeMetadata.name}`
        });
      }

      // RN-6: Validate positions are unique and consecutive
      const positions = input.options.map(opt => opt.position).sort((a, b) => a - b);
      const expectedPositions = Array.from({ length: positions.length }, (_, i) => i + 1);
      
      if (JSON.stringify(positions) !== JSON.stringify(expectedPositions)) {
        errors.push({
          field: 'options',
          message: 'Las posiciones de las opciones deben ser únicas y consecutivas (1, 2, 3, ...)'
        });
      }

      // Validate option texts
      input.options.forEach((opt, index) => {
        if (!opt.text?.trim()) {
          errors.push({
            field: `options[${index}].text`,
            message: `El texto de la opción ${index + 1} es obligatorio`
          });
        }
      });
    }

    return errors;
  }

  // Create question (RN-4, RN-5, RN-7)
  async createQuestion(input: CreateQuestionInput, currentUser: string): Promise<Question> {
    // Validate
    const validationErrors = this.validateQuestion(input);
    if (validationErrors.length > 0) {
      throw new Error(`Validation errors: ${validationErrors.map(e => `${e.field}: ${e.message}`).join(', ')}`);
    }

    const questions = this.loadQuestions();
    const options = this.loadOptions();
    
    const now = new Date();
    
    // RN-5: Create with version 1 and active state (RN-4)
    const newQuestion: Question = {
      question_id: this.generateId('question'),
      type: input.type,
      enunciado: input.enunciado.trim(),
      version: 1,
      active: true, // RN-4
      original_version_fk: null,
      topic_fk: input.topic_fk,
      difficulty_fk: input.difficulty_fk,
      learning_outcome_fk: input.learning_outcome_fk || null,
      author_fk: currentUser, // RN-5: Trazabilidad
      created_at: now, // RN-5: Trazabilidad
      updated_at: now,
      updated_by: currentUser,
      deleted_at: null,
      deleted_by: null,
    };

    questions.push(newQuestion);
    this.saveQuestions(questions);

    // Create options
    for (const optInput of input.options) {
      const newOption: QuestionOption = {
        question_option_id: this.generateId('option'),
        question_fk: newQuestion.question_id,
        text: optInput.text.trim(),
        is_correct: optInput.is_correct,
        position: optInput.position,
        partial_score: optInput.partial_score || null,
        created_at: now,
        created_by: currentUser,
        updated_at: now,
        updated_by: currentUser,
      };
      options.push(newOption);
    }
    this.saveOptions(options);

    // RN-7: Simulate indexing (in real system, would trigger background job)
    // For localStorage implementation, indexing is immediate via search

    return newQuestion;
  }

  // Get question with full details
  getQuestionWithDetails(questionId: string): QuestionWithDetails | null {
    const questions = this.loadQuestions();
    const options = this.loadOptions();
    
    const question = questions.find(q => q.question_id === questionId);
    if (!question) return null;

    const questionOptions = options.filter(opt => opt.question_fk === questionId)
      .sort((a, b) => a.position - b.position);

    // Get CurriculumHierarchy metadata
    const topics = getAllTopics();
    const units = getAllUnits();
    const subjects = getAllSubjects();

    const topic = topics.find((t) => t.topic_id === question.topic_fk);
    const unit = topic ? units.find((u) => u.unit_id === topic.unit_fk) : undefined;
    const subject = unit ? subjects.find((s) => s.subject_id === unit.subject_fk) : undefined;

    return {
      ...question,
      options: questionOptions,
      topic_name: topic?.name,
      unit_name: unit?.name,
      subject_name: subject?.name,
    };
  }

  // Get all active questions with details
  getAllQuestionsWithDetails(includeInactive = false): QuestionWithDetails[] {
    const questions = this.loadQuestions();
    const filtered = questions.filter(q => 
      (includeInactive || q.active) && !q.deleted_at
    );

    return filtered.map(q => this.getQuestionWithDetails(q.question_id)!).filter(Boolean);
  }

  // Search questions
  searchQuestions(searchText: string, filters?: {
    type?: QuestionType;
    topic_fk?: string;
    difficulty_fk?: DifficultyLevel;
    subject_fk?: string;
    unit_fk?: string;
    includeInactive?: boolean;
  }): QuestionWithDetails[] {
    let results = this.getAllQuestionsWithDetails(filters?.includeInactive || false);

    // Text search
    if (searchText?.trim()) {
      const searchLower = searchText.toLowerCase();
      results = results.filter(q => 
        q.enunciado.toLowerCase().includes(searchLower) ||
        q.options.some(opt => opt.text.toLowerCase().includes(searchLower))
      );
    }

    // Apply filters
    if (filters?.type) {
      results = results.filter(q => q.type === filters.type);
    }

    if (filters?.topic_fk) {
      results = results.filter(q => q.topic_fk === filters.topic_fk);
    }

    if (filters?.difficulty_fk) {
      results = results.filter(q => q.difficulty_fk === filters.difficulty_fk);
    }

    if (filters?.subject_fk) {
      const units = getAllUnits().filter((u) => u.subject_fk === filters.subject_fk);
      const unitIds = new Set(units.map((u) => u.unit_id));
      const topics = getAllTopics().filter((t) => unitIds.has(t.unit_fk));
      const topicIds = new Set(topics.map((t) => t.topic_id));
      results = results.filter(q => topicIds.has(q.topic_fk));
    }

    if (filters?.unit_fk) {
      const topics = getAllTopics().filter((t) => t.unit_fk === filters.unit_fk);
      const topicIds = new Set(topics.map((t) => t.topic_id));
      results = results.filter(q => topicIds.has(q.topic_fk));
    }

    return results;
  }

  // Detect potential duplicates
  detectDuplicates(enunciado: string, topicFk: string, type: QuestionType, optionsTexts?: string[]): DuplicateDetectionResult {
    const allQuestions = this.getAllQuestionsWithDetails();
    const similarQuestions: QuestionWithDetails[] = [];

    const enunciadoLower = enunciado.toLowerCase().trim();
    const enunciadoWords = enunciadoLower.split(/\s+/).filter(w => w.length > 3); // Solo palabras >3 chars

    // Preparar textos de opciones para comparación
    const optionsLower = optionsTexts?.map(t => t.toLowerCase().trim()) || [];
    const optionsWords = optionsLower.flatMap(opt => opt.split(/\s+/).filter(w => w.length > 3));

    for (const question of allQuestions) {
      const qEnunciadoLower = question.enunciado.toLowerCase();
      
      // Calculate similarity score
      let score = 0;

      // Same topic: +30 points
      if (question.topic_fk === topicFk) {
        score += 30;
      }

      // Same type: +20 points
      if (question.type === type) {
        score += 20;
      }

      // Text similarity in enunciado: up to 40 points
      const matchingEnunciadoWords = enunciadoWords.filter(word => 
        word.length > 3 && qEnunciadoLower.includes(word)
      ).length;
      const textSimilarity = enunciadoWords.length > 0 
        ? (matchingEnunciadoWords / enunciadoWords.length) * 40 
        : 0;
      score += textSimilarity;

      // Options similarity: up to 30 points (if options provided)
      if (optionsWords.length > 0 && question.options && question.options.length > 0) {
        const qOptionsLower = question.options.map(opt => opt.text.toLowerCase());
        const qOptionsWords = qOptionsLower.flatMap(opt => opt.split(/\s+/).filter(w => w.length > 3));
        
        const matchingOptionsWords = optionsWords.filter(word => 
          qOptionsWords.some(qWord => qWord.includes(word) || word.includes(qWord))
        ).length;
        
        const optionsSimilarity = optionsWords.length > 0
          ? (matchingOptionsWords / optionsWords.length) * 30
          : 0;
        score += optionsSimilarity;
      }

      if (score >= 50) { // Threshold for considering it a duplicate (reducido de 60 a 50)
        similarQuestions.push(question);
      }
    }

    // Ordenar por score (calculado aproximadamente)
    similarQuestions.sort((a, b) => {
      // Re-calcular scores para ordenar
      let scoreA = 0, scoreB = 0;
      
      if (a.topic_fk === topicFk) scoreA += 30;
      if (b.topic_fk === topicFk) scoreB += 30;
      if (a.type === type) scoreA += 20;
      if (b.type === type) scoreB += 20;
      
      return scoreB - scoreA;
    });

    return {
      isDuplicate: similarQuestions.length > 0,
      similarQuestions,
      similarityScore: similarQuestions.length > 0 
        ? Math.max(...similarQuestions.map(() => 70)) // Simplified score
        : 0,
    };
  }

  // Update question
  async updateQuestion(
    questionId: string,
    input: UpdateQuestionInput,
    currentUser: string
  ): Promise<Question> {
    const questions = this.loadQuestions();
    const index = questions.findIndex(q => q.question_id === questionId);

    if (index === -1) {
      throw new Error('Pregunta no encontrada');
    }

    const question = questions[index];

    if (question.deleted_at) {
      throw new Error('No se puede actualizar una pregunta eliminada');
    }

    // Validate topic if changed
    if (input.topic_fk && input.topic_fk !== question.topic_fk) {
      const topics = getAllTopics();
      const topic = topics.find((t) => t.topic_id === input.topic_fk && !t.deleted_at);
      if (!topic) {
        throw new Error('El tema seleccionado no existe o no está vigente');
      }
    }

    const updatedQuestion: Question = {
      ...question,
      ...(input.enunciado && { enunciado: input.enunciado.trim() }),
      ...(input.topic_fk && { topic_fk: input.topic_fk }),
      ...(input.difficulty_fk && { difficulty_fk: input.difficulty_fk }),
      ...(input.learning_outcome_fk !== undefined && { learning_outcome_fk: input.learning_outcome_fk }),
      ...(input.active !== undefined && { active: input.active }),
      updated_at: new Date(),
      updated_by: currentUser,
    };

    questions[index] = updatedQuestion;
    this.saveQuestions(questions);

    return updatedQuestion;
  }

  // Soft delete question
  async deleteQuestion(questionId: string, currentUser: string): Promise<void> {
    const questions = this.loadQuestions();
    const index = questions.findIndex(q => q.question_id === questionId);

    if (index === -1) {
      throw new Error('Pregunta no encontrada');
    }

    questions[index] = {
      ...questions[index],
      deleted_at: new Date(),
      deleted_by: currentUser,
      active: false,
    };

    this.saveQuestions(questions);
  }

  // Retire question - CU-BP-05: Retirar Ítem
  // RN-1: El retiro no elimina el ítem; lo pone en estado inactivo
  // RN-2: Las evaluaciones ya aplicadas conservan el ítem en su historial
  // RN-3: Solo usuarios con rol de Coordinador o Administrador pueden retirar ítems
  // RN-4: La acción debe quedar registrada en el historial
  async retireQuestion(questionId: string, currentUser: string, reason?: string): Promise<void> {
    const questions = this.loadQuestions();
    const index = questions.findIndex(q => q.question_id === questionId);

    if (index === -1) {
      throw new Error('Pregunta no encontrada');
    }

    const question = questions[index];

    // A1 — Ítem ya retirado
    if (!question.active) {
      throw new Error('La pregunta ya está inactiva');
    }

    // Marcar como inactivo (RN-1)
    questions[index] = {
      ...question,
      active: false,
      updated_at: new Date(),
      updated_by: currentUser,
    };

    this.saveQuestions(questions);

    // RN-4: Registrar en historial (por ahora en consola, podría ser un store separado)
    console.log(`[HISTORIAL] Pregunta ${questionId} retirada por ${currentUser} el ${new Date().toISOString()}${reason ? ` - Motivo: ${reason}` : ''}`);
  }

  // Reactivate retired question
  // Reactivate a retired question (CU-BP-06: RN-1 to RN-3)
  async reactivateQuestion(questionId: string, currentUser: string, reason?: string): Promise<void> {
    const questions = this.loadQuestions();
    const index = questions.findIndex(q => q.question_id === questionId);

    // Validate question exists
    if (index === -1) {
      throw new Error('Pregunta no encontrada');
    }

    const question = questions[index];

    // A3: Cannot reactivate deleted questions
    if (question.deleted_at) {
      throw new Error('No se puede reactivar una pregunta eliminada');
    }

    // A1: Validate question is actually inactive
    if (question.active) {
      throw new Error('La pregunta ya está activa');
    }

    // RN-1: Reactivate the question (set active = true without altering history or visible version)
    questions[index] = {
      ...question,
      active: true,
      updated_at: new Date(),
      updated_by: currentUser,
    };

    this.saveQuestions(questions);

    // RN-3: Register action with traceability (user, date/time, and optional reason)
    const reasonLog = reason ? ` - Motivo: ${reason}` : '';
    console.log(`[HISTORIAL] Pregunta ${questionId} reactivada por ${currentUser} el ${new Date().toISOString()}${reasonLog}`);
  }

  // Create new version of a question (CU-BP-02: RN-1 to RN-6)
  async createQuestionVersion(
    questionId: string,
    currentUser: string,
    modifications?: Partial<CreateQuestionInput>
  ): Promise<Question> {
    const questions = this.loadQuestions();
    const options = this.loadOptions();
    
    // Find the original question
    const originalQuestion = questions.find(q => q.question_id === questionId);
    if (!originalQuestion) {
      throw new Error('Pregunta no encontrada');
    }

    if (originalQuestion.deleted_at) {
      throw new Error('No se puede versionar una pregunta eliminada');
    }

    // Get original question's options
    const originalOptions = options.filter(opt => opt.question_fk === questionId)
      .sort((a, b) => a.position - b.position);

    // RN-5: Determine the version root (original_version_fk or current ID)
    const versionRoot = originalQuestion.original_version_fk || originalQuestion.question_id;

    // RN-5: Calculate new version number (find max version in lineage)
    const sameLineage = questions.filter(q => 
      q.question_id === versionRoot || q.original_version_fk === versionRoot
    );
    const maxVersion = Math.max(...sameLineage.map(q => q.version));
    const newVersion = maxVersion + 1;

    const now = new Date();

    // RN-1, RN-4: Clone all data and create new version with new ID
    const newQuestion: Question = {
      question_id: this.generateId('question'), // RN-1: New unique ID
      type: modifications?.type || originalQuestion.type, // RN-4: Can be modified
      enunciado: modifications?.enunciado || originalQuestion.enunciado,
      version: newVersion, // RN-5: Incremented version
      active: true, // RN-3: New version is active
      original_version_fk: versionRoot, // RN-2: Maintain version lineage
      topic_fk: modifications?.topic_fk || originalQuestion.topic_fk, // RN-4: Can be modified
      difficulty_fk: modifications?.difficulty_fk || originalQuestion.difficulty_fk, // RN-4: Can be modified
      learning_outcome_fk: modifications?.learning_outcome_fk !== undefined 
        ? modifications.learning_outcome_fk 
        : originalQuestion.learning_outcome_fk,
      author_fk: currentUser, // New version has new author
      created_at: now, // New creation timestamp
      updated_at: now,
      updated_by: currentUser,
      deleted_at: null,
      deleted_by: null,
    };

    // Validate the new version
    const validationInput: CreateQuestionInput = {
      type: newQuestion.type,
      enunciado: newQuestion.enunciado,
      topic_fk: newQuestion.topic_fk,
      difficulty_fk: newQuestion.difficulty_fk,
      learning_outcome_fk: newQuestion.learning_outcome_fk,
      options: modifications?.options || originalOptions.map(opt => ({
        text: opt.text,
        is_correct: opt.is_correct,
        position: opt.position,
        partial_score: opt.partial_score,
      })),
    };

    const validationErrors = this.validateQuestion(validationInput);
    if (validationErrors.length > 0) {
      throw new Error(`Validation errors: ${validationErrors.map(e => `${e.field}: ${e.message}`).join(', ')}`);
    }

    // Save new question
    questions.push(newQuestion);
    this.saveQuestions(questions);

    // Clone or create new options
    const newOptions = (modifications?.options || originalOptions.map(opt => ({
      text: opt.text,
      is_correct: opt.is_correct,
      position: opt.position,
      partial_score: opt.partial_score,
    }))).map(optInput => {
      const newOption: QuestionOption = {
        question_option_id: this.generateId('option'),
        question_fk: newQuestion.question_id,
        text: optInput.text.trim(),
        is_correct: optInput.is_correct,
        position: optInput.position,
        partial_score: optInput.partial_score || null,
        created_at: now,
        created_by: currentUser,
        updated_at: now,
        updated_by: currentUser,
      };
      return newOption;
    });

    options.push(...newOptions);
    this.saveOptions(options);

    // RN-3: Original version remains active (no modification to old version)
    // RN-6: Evaluations maintain their reference to specific versions (handled by evaluation system)

    return newQuestion;
  }

  // Get version history for a question
  getQuestionVersionHistory(questionId: string): QuestionWithDetails[] {
    const questions = this.loadQuestions();
    const question = questions.find(q => q.question_id === questionId);
    
    if (!question) {
      return [];
    }

    // Find the version root
    const versionRoot = question.original_version_fk || question.question_id;

    // Get all versions in the lineage
    const allVersions = questions.filter(q => 
      q.question_id === versionRoot || q.original_version_fk === versionRoot
    );

    // Sort by version number descending (newest first)
    const sortedVersions = allVersions
      .sort((a, b) => b.version - a.version)
      .map(q => this.getQuestionWithDetails(q.question_id)!)
      .filter(Boolean);

    return sortedVersions;
  }

  // Check if a question has multiple versions
  hasMultipleVersions(questionId: string): boolean {
    const history = this.getQuestionVersionHistory(questionId);
    return history.length > 1;
  }

  // Get the latest version of a question
  getLatestVersion(questionId: string): QuestionWithDetails | null {
    const history = this.getQuestionVersionHistory(questionId);
    return history.length > 0 ? history[0] : null;
  }

  // Clone a question (CU-BP-03: RN-1 to RN-6)
  async cloneQuestion(
    questionId: string,
    currentUser: string,
    modifications?: Partial<CreateQuestionInput>
  ): Promise<Question> {
    const questions = this.loadQuestions();
    const options = this.loadOptions();
    
    // Find the source question
    const sourceQuestion = questions.find(q => q.question_id === questionId);
    if (!sourceQuestion) {
      throw new Error('Pregunta no encontrada');
    }

    if (sourceQuestion.deleted_at) {
      throw new Error('No se puede clonar una pregunta eliminada');
    }

    // Get source question's options
    const sourceOptions = options.filter(opt => opt.question_fk === questionId)
      .sort((a, b) => a.position - b.position);

    const now = new Date();

    // RN-1, RN-2: Create completely independent item with new unique ID
    // RN-3: Clone starts with version 1
    // RN-4: No relationship to original (original_version_fk = NULL)
    const clonedQuestion: Question = {
      question_id: this.generateId('question'), // RN-2: New unique ID
      type: modifications?.type || sourceQuestion.type, // RN-4: Can be modified
      enunciado: modifications?.enunciado || sourceQuestion.enunciado,
      version: 1, // RN-3: Clone starts with version 1
      active: true, // RN-1: Clone is marked as active
      original_version_fk: null, // RN-4: No reference to original
      topic_fk: modifications?.topic_fk || sourceQuestion.topic_fk, // RN-4: Can be modified
      difficulty_fk: modifications?.difficulty_fk || sourceQuestion.difficulty_fk, // RN-4: Can be modified
      learning_outcome_fk: modifications?.learning_outcome_fk !== undefined 
        ? modifications.learning_outcome_fk 
        : sourceQuestion.learning_outcome_fk,
      author_fk: currentUser, // RN-5: Author is the user who clones, not original author
      created_at: now, // RN-5: Traceability - creation timestamp
      updated_at: now,
      updated_by: currentUser,
      deleted_at: null,
      deleted_by: null,
    };

    // Validate the cloned question
    const validationInput: CreateQuestionInput = {
      type: clonedQuestion.type,
      enunciado: clonedQuestion.enunciado,
      topic_fk: clonedQuestion.topic_fk,
      difficulty_fk: clonedQuestion.difficulty_fk,
      learning_outcome_fk: clonedQuestion.learning_outcome_fk,
      options: modifications?.options || sourceOptions.map(opt => ({
        text: opt.text,
        is_correct: opt.is_correct,
        position: opt.position,
        partial_score: opt.partial_score,
      })),
    };

    const validationErrors = this.validateQuestion(validationInput);
    if (validationErrors.length > 0) {
      throw new Error(`Validation errors: ${validationErrors.map(e => `${e.field}: ${e.message}`).join(', ')}`);
    }

    // Save cloned question
    questions.push(clonedQuestion);
    this.saveQuestions(questions);

    // Clone options with new IDs
    const newOptions = (modifications?.options || sourceOptions.map(opt => ({
      text: opt.text,
      is_correct: opt.is_correct,
      position: opt.position,
      partial_score: opt.partial_score,
    }))).map(optInput => {
      const newOption: QuestionOption = {
        question_option_id: this.generateId('option'),
        question_fk: clonedQuestion.question_id,
        text: optInput.text.trim(),
        is_correct: optInput.is_correct,
        position: optInput.position,
        partial_score: optInput.partial_score || null,
        created_at: now,
        created_by: currentUser,
        updated_at: now,
        updated_by: currentUser,
      };
      return newOption;
    });

    options.push(...newOptions);
    this.saveOptions(options);

    // RN-6: No formal link between original and clone (could be logged in audit)
    // For audit purposes, we could log this action but it's not required by the system

    return clonedQuestion;
  }

  // Group questions by version families (returns only latest versions)
  getQuestionsGroupedByVersion(): QuestionWithDetails[] {
    const questions = this.loadQuestions();
    const versionRoots = new Set<string>();
    const latestVersions: QuestionWithDetails[] = [];

    // Find all version roots
    questions.forEach(q => {
      const root = q.original_version_fk || q.question_id;
      versionRoots.add(root);
    });

    // For each root, get the latest version
    versionRoots.forEach(rootId => {
      const versions = questions.filter(q => 
        q.question_id === rootId || q.original_version_fk === rootId
      ).sort((a, b) => b.version - a.version);

      if (versions.length > 0) {
        const latestVersion = this.getQuestionWithDetails(versions[0].question_id);
        if (latestVersion) {
          latestVersions.push(latestVersion);
        }
      }
    });

    return latestVersions;
  }

  // Search questions grouped by version (returns only latest versions that match filters)
  searchQuestionsGrouped(
    searchTerm: string = '',
    filters: {
      type?: QuestionType;
      difficulty_fk?: DifficultyLevel;
      subject_fk?: string;
      unit_fk?: string;
      topic_fk?: string;
      includeInactive?: boolean;
    } = {}
  ): QuestionWithDetails[] {
    // First, apply filters to get matching questions
    const allQuestions = this.searchQuestions(searchTerm, filters);
    const versionRootsMap = new Map<string, string[]>(); // root -> [question_ids]

    // Group all matching questions by their version root
    allQuestions.forEach(q => {
      const root = q.original_version_fk || q.question_id;
      if (!versionRootsMap.has(root)) {
        versionRootsMap.set(root, []);
      }
      versionRootsMap.get(root)!.push(q.question_id);
    });

    // For each root, get the latest version
    const groupedResults: QuestionWithDetails[] = [];
    versionRootsMap.forEach((questionIds, rootId) => {
      // Get all versions for this root (not just the ones that match filters)
      const allVersions = this.getQuestionVersionHistory(rootId);
      
      // Get the latest version (highest version number)
      if (allVersions.length > 0) {
        const latestVersion = allVersions[0]; // Already sorted by version DESC
        
        // Apply includeInactive filter to the latest version
        if (filters.includeInactive || latestVersion.active) {
          groupedResults.push(latestVersion);
        }
      }
    });

    // Sort by updated_at descending (most recently updated first)
    return groupedResults.sort((a, b) => 
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }

}

export const questionStore = new QuestionStore();
