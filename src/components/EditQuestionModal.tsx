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
import { questionStore, QUESTION_TYPE_RULES } from '@/lib/questionStore';
import { getAllTopics, getAllUnits } from '@/lib/taxonomyStore';
import { useAuth } from '@/contexts/AuthContext';
import QuestionFormFields from '@/components/QuestionFormFields';

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
      if (options.length < rules.minOptions) {
        const newOptions = [...options];
        while (newOptions.length < rules.minOptions) {
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
    const typeRules = QUESTION_TYPE_RULES[questionType];
    const newOptions = [...options];

    if (typeRules.exactlyOneCorrect && isCorrect) {
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

      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
