/**
 * CU-BP-03: Clonar Ítem
 * Modal component for cloning questions
 * 
 * This modal allows users to:
 * - Clone an existing question to create a completely new, independent item
 * - Edit the cloned content before saving (enunciado, opciones, metadatos)
 * - The cloned item gets a new ID, version 1, and no reference to the original
 */

'use client';

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
import { questionStore, QUESTION_TYPE_RULES } from '@/lib/questionStore';
import { getAllUnits, getAllTopics } from '@/lib/taxonomyStore';
import { useAuth } from '@/contexts/AuthContext';
import QuestionFormFields from './QuestionFormFields';

interface CloneQuestionModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  questionId: string | null;
}

export default function CloneQuestionModal({
  show,
  onHide,
  onSuccess,
  questionId,
}: CloneQuestionModalProps) {
  const { user } = useAuth();

  // Original question data
  const [originalQuestion, setOriginalQuestion] = useState<QuestionWithDetails | null>(null);

  // Form state
  const [questionType, setQuestionType] = useState<QuestionType>('seleccion_unica');
  const [enunciado, setEnunciado] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
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
    if (show && questionId) {
      const question = questionStore.getQuestionWithDetails(questionId);
      if (question) {
        setIsLoadingQuestion(true);
        setOriginalQuestion(question);
        
        // Populate form with question data (non-taxonomy fields)
        setQuestionType(question.type);
        setEnunciado(question.enunciado);
        setDifficulty(question.difficulty_fk);

        // Populate options
        if (question.type !== 'desarrollo' && question.options) {
          setOptions(question.options.map(opt => ({
            text: opt.text,
            is_correct: opt.is_correct,
            position: opt.position,
            partial_score: opt.partial_score,
          })));
        }
      }
    } else {
      setIsLoadingQuestion(false);
      resetForm();
    }
  }, [show, questionId]);

  // Load taxonomy hierarchy separately after originalQuestion is set
  useEffect(() => {
    if (originalQuestion && isLoadingQuestion) {
      const allTopics = getAllTopics();
      const allUnits = getAllUnits();
      const topic = allTopics.find(t => t.topic_id === originalQuestion.topic_fk);
      
      if (topic) {
        const unit = allUnits.find(u => u.unit_id === topic.unit_fk);
        if (unit) {
          // Batch all state updates together
          Promise.resolve().then(() => {
            setSelectedSubject(unit.subject_fk);
            setSelectedUnit(topic.unit_fk);
            setSelectedTopic(originalQuestion.topic_fk);
          }).then(() => {
            // Give React a moment to process all state updates
            setTimeout(() => setIsLoadingQuestion(false), 100);
          });
        } else {
          setIsLoadingQuestion(false);
        }
      } else {
        setIsLoadingQuestion(false);
      }
    }
  }, [originalQuestion, isLoadingQuestion]);

  // Update options when question type changes
  useEffect(() => {
    if (!originalQuestion) return; // Only auto-adjust if we have original data
    
    const rules = QUESTION_TYPE_RULES[questionType];

    if (questionType === 'desarrollo') {
      setOptions([]);
    } else if (questionType === 'verdadero_falso') {
      setOptions([
        { text: 'Verdadero', is_correct: false, position: 1 },
        { text: 'Falso', is_correct: false, position: 2 },
      ]);
    } else {
      // Keep existing options if changing between seleccion_unica/multiple
      setOptions((prevOptions) => {
        if (prevOptions.length < rules.minOptions) {
          const newOptions = [...prevOptions];
          while (newOptions.length < rules.minOptions) {
            newOptions.push({
              text: '',
              is_correct: false,
              position: newOptions.length + 1,
            });
          }
          return newOptions;
        }
        return prevOptions;
      });
    }
  }, [questionType, originalQuestion]);

  const resetForm = () => {
    setOriginalQuestion(null);
    setQuestionType('seleccion_unica');
    setEnunciado('');
    setSelectedSubject('');
    setSelectedUnit('');
    setSelectedTopic('');
    setDifficulty('medio');
    setOptions([
      { text: '', is_correct: false, position: 1 },
      { text: '', is_correct: false, position: 2 },
    ]);
    setValidationErrors([]);
    setSubmitSuccess(false);
    setNewQuestionId('');
    setIsLoadingQuestion(false);
  };

  const handleAddOption = () => {
    setOptions([
      ...options,
      { text: '', is_correct: false, position: options.length + 1 },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    // Reindex positions
    newOptions.forEach((opt, i) => {
      opt.position = i + 1;
    });
    setOptions(newOptions);
  };

  const handleOptionTextChange = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleOptionCorrectChange = (index: number, isCorrect: boolean) => {
    const newOptions = [...options];
    const rules = QUESTION_TYPE_RULES[questionType];
    
    if (rules.exactlyOneCorrect) {
      // For single answer questions, uncheck all others
      newOptions.forEach((opt, i) => {
        opt.is_correct = i === index ? isCorrect : false;
      });
    } else {
      newOptions[index].is_correct = isCorrect;
    }
    
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    setValidationErrors([]);
    setIsSubmitting(true);

    try {
      if (!questionId) {
        throw new Error('No se ha especificado el ID de la pregunta a clonar');
      }

      // Prepare modifications
      const modifications: Partial<CreateQuestionInput> = {
        type: questionType,
        enunciado: enunciado.trim(),
        topic_fk: selectedTopic,
        difficulty_fk: difficulty,
        options: questionType === 'desarrollo' ? [] : options,
      };

      // Clone the question with modifications
      const clonedQuestion = await questionStore.cloneQuestion(
        questionId,
        user?.email || 'anonymous',
        modifications
      );
      
      setSubmitSuccess(true);
      setNewQuestionId(clonedQuestion.question_id);
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        onSuccess();
        onHide();
      }, 2000);

    } catch (error) {
      if (error instanceof Error) {
        // Parse validation errors from error message
        const errorMsg = error.message;
        if (errorMsg.startsWith('Validation errors:')) {
          const errors: QuestionValidationError[] = [];
          const parts = errorMsg.split('Validation errors:')[1].split(',');
          parts.forEach(part => {
            const [field, message] = part.split(':').map(s => s.trim());
            if (field && message) {
              errors.push({ field, message });
            }
          });
          setValidationErrors(errors);
        } else {
          setValidationErrors([{ field: 'general', message: errorMsg }]);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorsForField = (field: string) => {
    return validationErrors.filter(e => e.field === field);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {submitSuccess ? '✅ Pregunta Clonada' : '📋 Clonar Pregunta'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-scrollable">
        {isLoadingQuestion ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando datos de la pregunta...</p>
          </div>
        ) : submitSuccess ? (
          <Alert variant="success">
            <Alert.Heading>¡Pregunta clonada exitosamente!</Alert.Heading>
            <p>
              Se ha creado un nuevo ítem independiente con ID: <strong>{newQuestionId}</strong>
            </p>
            <p className="mb-0">
              <small className="text-muted">
                El nuevo ítem tiene versión 1 y no tiene relación con la pregunta original.
              </small>
            </p>
            <hr />
            <div className="d-flex gap-2">
              <Button variant="success" size="sm" onClick={() => {
                onSuccess();
                onHide();
              }}>
                Cerrar
              </Button>
            </div>
          </Alert>
        ) : (
          <Form>
            {/* Info Alert */}
            {originalQuestion && (
              <Alert variant="info">
                <div className="d-flex align-items-start">
                  <div className="me-2">ℹ️</div>
                  <div>
                    <strong>Clonando pregunta:</strong>
                    <div className="mt-2">
                      <Badge bg="secondary" className="me-2">ID Original: {originalQuestion.question_id}</Badge>
                      <Badge bg="secondary">v{originalQuestion.version}</Badge>
                    </div>
                    <p className="mt-2 mb-0 small">
                      El clon será un ítem completamente nuevo e independiente con su propio ID único,
                      versión 1, y sin vínculo con la pregunta original. Puedes modificar cualquier campo antes de guardarlo.
                    </p>
                  </div>
                </div>
              </Alert>
            )}

            {/* General errors */}
            {getErrorsForField('general').length > 0 && (
              <Alert variant="danger">
                {getErrorsForField('general').map((err, i) => (
                  <div key={i}>{err.message}</div>
                ))}
              </Alert>
            )}

            {/* Campos comunes del formulario de preguntas */}
            <QuestionFormFields
              questionType={questionType}
              onQuestionTypeChange={setQuestionType}
              enunciado={enunciado}
              onEnunciadoChange={setEnunciado}
              selectedSubject={selectedSubject}
              selectedUnit={selectedUnit}
              selectedTopic={selectedTopic}
              onSubjectChange={(value) => {
                setSelectedSubject(value);
                setSelectedUnit('');
                setSelectedTopic('');
              }}
              onUnitChange={(value) => {
                setSelectedUnit(value);
                setSelectedTopic('');
              }}
              onTopicChange={setSelectedTopic}
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              options={options}
              onOptionTextChange={handleOptionTextChange}
              onOptionCorrectChange={handleOptionCorrectChange}
              onAddOption={handleAddOption}
              onRemoveOption={handleRemoveOption}
              getErrorsForField={getErrorsForField}
              disabled={isSubmitting}
              showDifficultyAsRadio={false}
            />

            {/* Summary específico del modal de clonación */}
            {!validationErrors.some(e => e.field !== 'general') && enunciado && selectedTopic && (
              <Alert variant="light">
                <h6>Resumen del clon:</h6>
                <ul className="mb-0">
                  <li><strong>Tipo:</strong> {QUESTION_TYPE_RULES[questionType].name}</li>
                  <li><strong>Dificultad:</strong> {difficulty}</li>
                  <li><strong>Alternativas:</strong> {options.length}</li>
                  <li>
                    <strong>Estado:</strong> <Badge bg="success">Activo</Badge> 
                    <Badge bg="info" className="ms-2">Versión 1</Badge>
                  </li>
                </ul>
              </Alert>
            )}
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        {!submitSuccess && (
          <>
            <Button variant="secondary" onClick={onHide} disabled={isSubmitting || isLoadingQuestion}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || isLoadingQuestion || !selectedTopic || !enunciado.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Clonando...
                </>
              ) : (
                '📋 Clonar Pregunta'
              )}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
