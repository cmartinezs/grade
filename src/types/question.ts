/**
 * CU-BP-01: Crear ítem nuevo en el Banco de Preguntas
 * Types for questions bank management
 */

// Enum types matching database - códigos del JSON question-types.json
export type QuestionType = 'TF' | 'SS' | 'MC2' | 'MC3' | 'MC4' | 'MC5';

export type DifficultyLevel = 'bajo' | 'medio' | 'alto';

// Main entities
export interface Question {
  question_id: string;
  type: QuestionType;
  enunciado: string; // Question text/statement
  version: number;
  active: boolean;
  original_version_fk: string | null; // Reference to original version for versioning
  topic_fk: string; // References topic_id from taxonomy
  difficulty_fk: DifficultyLevel;
  learning_outcome_fk: string | null; // Optional reference to learning outcomes (future implementation)
  author_fk: string; // User who created the question
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  deleted_at: Date | null;
  deleted_by: string | null;
}

export interface QuestionOption {
  question_option_id: string;
  question_fk: string; // References question_id
  text: string; // Option text
  is_correct: boolean; // Whether this option is correct
  position: number; // Display order (1-based)
  partial_score: number | null; // Optional partial scoring
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
}

// Input types for creating questions
export interface CreateQuestionInput {
  type: QuestionType;
  enunciado: string;
  topic_fk: string;
  difficulty_fk: DifficultyLevel;
  learning_outcome_fk?: string | null;
  options: CreateQuestionOptionInput[];
}

export interface CreateQuestionOptionInput {
  text: string;
  is_correct: boolean;
  position: number;
  partial_score?: number | null;
}

// Update types
export interface UpdateQuestionInput {
  enunciado?: string;
  topic_fk?: string;
  difficulty_fk?: DifficultyLevel;
  learning_outcome_fk?: string | null;
  active?: boolean;
}

// Validation error type
export interface QuestionValidationError {
  field: string;
  message: string;
}

// Full question with options and metadata for display
export interface QuestionWithDetails extends Question {
  options: QuestionOption[];
  topic_name?: string;
  unit_name?: string;
  subject_name?: string;
}

// Duplicate detection result
export interface DuplicateDetectionResult {
  isDuplicate: boolean;
  similarQuestions: QuestionWithDetails[];
  similarityScore: number; // 0-100
}

// Difficulty catalog
export interface Difficulty {
  difficulty_id: DifficultyLevel;
  name: string;
  description?: string;
  active: boolean;
}

// Learning outcome (for future implementation)
export interface LearningOutcome {
  outcome_id: string;
  code: string;
  name: string;
  description: string;
  active: boolean;
}

// Question type metadata
export interface QuestionTypeMetadata {
  type: QuestionType;
  name: string;
  description: string;
  minOptions: number;
  maxOptions: number | null; // null = unlimited
  exactlyOneCorrect: boolean;
  atLeastOneCorrect: boolean;
}
