"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Badge } from 'react-bootstrap';
import {
  QuestionType,
  DifficultyLevel,
  CreateQuestionInput,
  CreateQuestionOptionInput,
  QuestionValidationError,
  QuestionWithDetails,
} from '@/types/question';
import { questionStore } from '@/lib/questionStore';
import { fetchQuestionById, mapQuestionTypeIdToCode } from '@/lib/questionConnect';
import { getUserByEmail } from '@/dataconnect-generated';
import { getAllTopics, getAllUnits } from '@/lib/curriculumHierarchyStore';
import { useAuth } from '@/contexts/AuthContext';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import QuestionFormFields from './shared/QuestionFormFields';

interface EditQuestionModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  questionId: string | null;
  mode: 'edit' | 'version'; // 'edit' updates, 'version' creates new version
}

export default function EditQuestionModal({
  show,
  onHide,
  onSuccess,
  questionId,
  mode,
}: EditQuestionModalProps) {
  const { user } = useAuth();
  const { questionTypes } = useQuestionTypes();
  const { subjects, units, topics } = useCurriculumHierarchy();

  // Original question data
  const [originalQuestion, setOriginalQuestion] = useState<QuestionWithDetails | null>(null);

  // Form state
  const [questionType, setQuestionType] = useState<QuestionType>('seleccion_unica');
  const [enunciado, setEnunciado] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedTaxonomy, setSelectedTaxonomy] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medio');
  const [options, setOptions] = useState<CreateQuestionOptionInput[]>([]);

  // UI state
  const [validationErrors, setValidationErrors] = useState<QuestionValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newQuestionId, setNewQuestionId] = useState('');
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);

  // Load question data when modal opens
  useEffect(() => {
    const loadQuestion = async () => {
      if (show && questionId && user?.firebaseUid && user?.email) {
        try {
          setIsLoadingQuestion(true);
          
          // Obtener userId desde Data Connect
          const userResult = await getUserByEmail({ email: user.email });
          const userData = userResult.data?.users?.[0];
          
          if (!userData?.userId) {
            throw new Error('Usuario no encontrado en Data Connect');
          }

          // Cargar pregunta desde Data Connect
          const dcQuestion = await fetchQuestionById(questionId, userData.userId, user.firebaseUid);
          
          if (!dcQuestion) {
            throw new Error('Pregunta no encontrada');
          }

          // Transformar a formato local
          const question: QuestionWithDetails = {
            question_id: dcQuestion.questionId,
            type: mapQuestionTypeIdToCode(dcQuestion.questionTypeId, questionTypes) as QuestionType,
            enunciado: dcQuestion.text,
            version: dcQuestion.version,
            active: dcQuestion.active,
            original_version_fk: dcQuestion.originalQuestionId || null,
            topic_fk: dcQuestion.topicId,
            difficulty_fk: dcQuestion.difficultyId as DifficultyLevel,
            learning_outcome_fk: dcQuestion.taxonomyId,
            author_fk: dcQuestion.userId,
            created_at: new Date(),
            updated_at: new Date(),
            updated_by: dcQuestion.userId,
            deleted_at: null,
            deleted_by: null,
            options: (dcQuestion.options || []).map(opt => ({
              question_option_id: opt.questionOptionId,
              question_fk: opt.questionId,
              text: opt.text,
              is_correct: opt.isCorrect,
              position: opt.position,
              partial_score: opt.score,
              created_at: new Date(),
              created_by: dcQuestion.userId,
              updated_at: new Date(),
              updated_by: dcQuestion.userId,
            })),
          };

          setOriginalQuestion(question);
          
          // Populate form with question data
          setQuestionType(question.type);
          setEnunciado(question.enunciado);
          setDifficulty(question.difficulty_fk);
          setSelectedTaxonomy(question.learning_outcome_fk || '');

          // Populate curriculum hierarchy fields
          const topic = topics.find(t => t.topic_id === question.topic_fk);
          if (topic) {
            const unit = units.find(u => u.unit_id === topic.unit_fk);
            if (unit) {
              const subject = subjects.find(s => s.subject_id === unit.subject_fk);
              if (subject) {
                setSelectedSubject(subject.subject_id);
                setSelectedUnit(unit.unit_id);
                setSelectedTopic(topic.topic_id);
              }
            }
          }

          // Populate options
          if (question.type !== 'desarrollo' && question.type !== 'D' && question.options && question.options.length > 0) {
            const mappedOptions = question.options.map(opt => ({
              text: opt.text || '',
              is_correct: opt.is_correct || false,
              position: opt.position || 0,
              partial_score: opt.partial_score || null,
            }));
            setOptions(mappedOptions);
          }
        } catch (error) {
          console.error('Error loading question:', error);
          setValidationErrors([{ field: 'general', message: 'Error cargando pregunta' }]);
        } finally {
          setIsLoadingQuestion(false);
        }
      } else {
        // Reset form if no questionId or user not ready
        setIsLoadingQuestion(false);
        resetForm();
      }
    };

    loadQuestion();
  }, [show, questionId, user?.firebaseUid, user?.email, questionTypes, subjects, units, topics]);

  // Load CurriculumHierarchy hierarchy separately after originalQuestion is set
  // Este efecto ya no es necesario porque los datos se cargan directamente en el primer useEffect
  // y QuestionFormFields manejará la carga de la jerarquía usando los hooks correspondientes

  // Update options when question type changes
  useEffect(() => {
    if (!originalQuestion || questionTypes.length === 0) return; // Only auto-adjust if we have original data and types loaded
    
    const currentQuestionType = questionTypes.find(qt => qt.code === questionType);
    if (!currentQuestionType) return;
    
    const minOptions = currentQuestionType.minOptions || 0;

    if (minOptions === 0) {
      setOptions([]);
    } else {
      // Keep existing options if changing between types
      if (options.length < minOptions) {
        const newOptions = [...options];
        while (newOptions.length < minOptions) {
          newOptions.push({
            text: '',
            is_correct: false,
            position: newOptions.length + 1,
          });
        }
        setOptions(newOptions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionType, originalQuestion]);

  // Reset logic is now handled directly in onChange handlers
  // This prevents race conditions during initial data load

  const resetForm = () => {
    setOriginalQuestion(null);
    setIsLoadingQuestion(false);
    setQuestionType('seleccion_unica');
    setEnunciado('');
    setSelectedSubject('');
    setSelectedUnit('');
    setSelectedTopic('');
    setSelectedTaxonomy('');
    setDifficulty('medio');
    setOptions([]);
    setValidationErrors([]);
    setIsSubmitting(false);
    setSubmitSuccess(false);
    setNewQuestionId('');
  };

  const handleOptionTextChange = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleOptionCorrectChange = (index: number, isCorrect: boolean) => {
    const currentQuestionType = questionTypes.find(qt => qt.code === questionType);
    const correctOptions = currentQuestionType?.correctOptions || 1;
    const newOptions = [...options];

    if (correctOptions === 1 && isCorrect) {
      // Uncheck all others
      newOptions.forEach((opt, i) => {
        opt.is_correct = i === index;
      });
    } else {
      newOptions[index].is_correct = isCorrect;
    }

    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([
      ...options,
      { text: '', is_correct: false, position: options.length + 1 },
    ]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    // Reorder positions
    newOptions.forEach((opt, i) => {
      opt.position = i + 1;
    });
    setOptions(newOptions);
  };

  const getErrorsForField = (field: string): QuestionValidationError[] => {
    return validationErrors.filter(err => err.field === field);
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('Usuario no autenticado');
      return;
    }

    if (!selectedTopic) {
      setValidationErrors([{ field: 'topic', message: 'Debe seleccionar un tema' }]);
      return;
    }

    setIsSubmitting(true);
    setValidationErrors([]);

    try {
      const input: CreateQuestionInput = {
        type: questionType,
        enunciado,
        topic_fk: selectedTopic,
        difficulty_fk: difficulty,
        learning_outcome_fk: null,
        options,
      };

      let result;
      if (mode === 'version' && questionId) {
        // Create new version (CU-BP-02)
        result = await questionStore.createQuestionVersion(questionId, user.email, input);
        setNewQuestionId(result.question_id);
        setSubmitSuccess(true);
      } else if (mode === 'edit' && questionId) {
        // Update existing question (not implemented in this CU)
        throw new Error('Direct edit not implemented - use version instead');
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith('Validation errors:')) {
          const errorMessages = error.message.replace('Validation errors: ', '');
          setValidationErrors(
            errorMessages.split(', ').map(msg => {
              const [field, message] = msg.split(': ');
              return { field, message };
            })
          );
        } else {
          alert(`Error: ${error.message}`);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    resetForm();
    onHide();
    onSuccess();
  };

  const getModalTitle = () => {
    if (submitSuccess) return '✅ Versión Creada Exitosamente';
    if (mode === 'version') return '🔄 Crear Nueva Versión';
    return '✏️ Editar Pregunta';
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop={isSubmitting ? 'static' : true}>
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>{getModalTitle()}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-scrollable">
        {submitSuccess ? (
          <Alert variant="success">
            <Alert.Heading>
              {mode === 'version' ? '🎉 ¡Nueva versión creada exitosamente!' : '✅ Pregunta actualizada exitosamente'}
            </Alert.Heading>
            <p>
              {mode === 'version' 
                ? `Se ha creado una nueva versión de la pregunta con ID: ${newQuestionId}`
                : `La pregunta ${newQuestionId} ha sido actualizada correctamente`
              }
            </p>
            {mode === 'version' && originalQuestion && (
              <p className="mb-0">
                <Badge bg="info">v{originalQuestion.version}</Badge> → <Badge bg="success">v{originalQuestion.version + 1}</Badge>
              </p>
            )}
            <hr />
            <div className="d-flex gap-2">
              <Button variant="outline-success" size="sm" onClick={handleSuccessClose}>
                ✅ Aceptar
              </Button>
            </div>
          </Alert>
        ) : (
          <Form>
            {/* Version info alert */}
            {mode === 'version' && originalQuestion && (
              <Alert variant="info">
                <strong>ℹ️ Creación de Nueva Versión</strong>
                <p className="mb-0">
                  Estás creando una nueva versión de la pregunta <strong>{originalQuestion.question_id}</strong> (v{originalQuestion.version}).
                  La versión original se mantendrá intacta para trazabilidad histórica.
                </p>
              </Alert>
            )}

            {/* Validation errors */}
            {validationErrors.length > 0 && (
              <Alert variant="danger">
                <strong>⚠️ Errores de validación:</strong>
                <ul className="mb-0 mt-2">
                  {validationErrors.map((error, idx) => (
                    <li key={idx}>
                      <strong>{error.field}:</strong> {error.message}
                    </li>
                  ))}
                </ul>
              </Alert>
            )}

            {/* Common Question Form Fields */}
            <QuestionFormFields
              questionType={questionType}
              onQuestionTypeChange={setQuestionType}
              enunciado={enunciado}
              onEnunciadoChange={setEnunciado}
              selectedSubject={selectedSubject}
              selectedUnit={selectedUnit}
              selectedTopic={selectedTopic}
              onSubjectChange={(val) => {
                setSelectedSubject(val);
                if (!isLoadingQuestion) {
                  setSelectedUnit('');
                  setSelectedTopic('');
                }
              }}
              onUnitChange={(val) => {
                setSelectedUnit(val);
                if (!isLoadingQuestion) {
                  setSelectedTopic('');
                }
              }}
              onTopicChange={setSelectedTopic}
              selectedTaxonomy={selectedTaxonomy}
              onTaxonomyChange={setSelectedTaxonomy}
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              options={options}
              onOptionTextChange={handleOptionTextChange}
              onOptionCorrectChange={handleOptionCorrectChange}
              onAddOption={addOption}
              onRemoveOption={removeOption}
              getErrorsForField={getErrorsForField}
              disabled={isSubmitting}
              showDifficultyAsRadio={false}
            />
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        {!submitSuccess && (
          <>
            <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
              ❌ Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedTopic}
              title={!selectedTopic ? 'Debes seleccionar un tema para continuar' : ''}
            >
              {isSubmitting ? '⏳ Guardando...' : mode === 'version' ? '💾 Crear Nueva Versión' : '💾 Guardar Cambios'}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
