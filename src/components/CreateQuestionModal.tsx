/**
 * CU-BP-01: Crear ítem nuevo en el Banco de Preguntas
 * Modal component for creating new questions
 */

'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {
  QuestionType,
  DifficultyLevel,
  CreateQuestionInput,
  CreateQuestionOptionInput,
  QuestionValidationError,
  DuplicateDetectionResult,
} from '@/types/question';
import { questionStore, QUESTION_TYPE_RULES } from '@/lib/questionStore';
import { useAuth } from '@/contexts/AuthContext';
import QuestionFormFields from './QuestionFormFields';

interface CreateQuestionModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  initialType?: QuestionType;
  initialEnunciado?: string;
  initialDifficulty?: DifficultyLevel;
  initialSubject?: string;
}

export default function CreateQuestionModal({ 
  show, 
  onHide, 
  onSuccess,
  initialType,
  initialEnunciado,
  initialDifficulty,
  initialSubject,
}: CreateQuestionModalProps) {
  const { user } = useAuth();
  
  // Form state
  const [questionType, setQuestionType] = useState<QuestionType>(initialType || 'seleccion_unica');
  const [enunciado, setEnunciado] = useState(initialEnunciado || '');
  const [selectedSubject, setSelectedSubject] = useState(initialSubject || '');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialDifficulty || 'medio');
  const [options, setOptions] = useState<CreateQuestionOptionInput[]>([
    { text: '', is_correct: false, position: 1 },
    { text: '', is_correct: false, position: 2 },
  ]);

  // UI state
  const [validationErrors, setValidationErrors] = useState<QuestionValidationError[]>([]);
  const [duplicateWarning, setDuplicateWarning] = useState<DuplicateDetectionResult | null>(null);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdQuestionId, setCreatedQuestionId] = useState('');

  // Initialize form with provided values when modal opens
  useEffect(() => {
    if (show) {
      // Apply initial values when modal opens
      if (initialType) setQuestionType(initialType);
      if (initialEnunciado) setEnunciado(initialEnunciado);
      if (initialDifficulty) setDifficulty(initialDifficulty);
      if (initialSubject) setSelectedSubject(initialSubject);
    }
  }, [show, initialType, initialEnunciado, initialDifficulty, initialSubject]);

  // Update options when question type changes
  useEffect(() => {
    const rules = QUESTION_TYPE_RULES[questionType];
    
    if (questionType === 'desarrollo') {
      setOptions([]);
    } else if (questionType === 'verdadero_falso') {
      setOptions([
        { text: 'Verdadero', is_correct: false, position: 1 },
        { text: 'Falso', is_correct: false, position: 2 },
      ]);
    } else {
      // Ensure minimum options
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
  }, [questionType]);

  const resetForm = () => {
    // Reset to initial values if provided, otherwise use defaults
    setQuestionType(initialType || 'seleccion_unica');
    setEnunciado(initialEnunciado || '');
    setSelectedSubject(initialSubject || '');
    setSelectedUnit('');
    setSelectedTopic('');
    setDifficulty(initialDifficulty || 'medio');
    setOptions([
      { text: '', is_correct: false, position: 1 },
      { text: '', is_correct: false, position: 2 },
    ]);
    setValidationErrors([]);
    setDuplicateWarning(null);
    setShowDuplicateWarning(false);
    setSubmitSuccess(false);
    setCreatedQuestionId('');
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

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

  const checkForDuplicates = () => {
    if (enunciado.trim() && selectedTopic) {
      const result = questionStore.detectDuplicates(enunciado, selectedTopic, questionType);
      if (result.isDuplicate) {
        setDuplicateWarning(result);
        setShowDuplicateWarning(true);
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (forceSave = false) => {
    setValidationErrors([]);
    setIsSubmitting(true);

    try {
      // Check for duplicates first (unless forcing save)
      if (!forceSave && !showDuplicateWarning) {
        const hasDuplicates = checkForDuplicates();
        if (hasDuplicates) {
          setIsSubmitting(false);
          return;
        }
      }

      const input: CreateQuestionInput = {
        type: questionType,
        enunciado: enunciado.trim(),
        topic_fk: selectedTopic,
        difficulty_fk: difficulty,
        options: questionType === 'desarrollo' ? [] : options,
      };

      const newQuestion = await questionStore.createQuestion(input, user?.email || 'anonymous');
      
      setSubmitSuccess(true);
      setCreatedQuestionId(newQuestion.question_id);
      
      // Auto-close after 2 seconds or wait for user action
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

  const handleForceSave = () => {
    setShowDuplicateWarning(false);
    handleSubmit(true);
  };

  const handleCancelDuplicate = () => {
    setShowDuplicateWarning(false);
    setDuplicateWarning(null);
  };

  const getErrorsForField = (field: string) => {
    return validationErrors.filter(e => e.field === field);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {submitSuccess ? '✅ Pregunta Creada' : '➕ Nueva Pregunta'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-scrollable">
        {submitSuccess ? (
          <Alert variant="success">
            <Alert.Heading>¡Pregunta creada exitosamente!</Alert.Heading>
            <p>ID de la pregunta: <strong>{createdQuestionId}</strong></p>
            <hr />
            <div className="d-flex gap-2">
              <Button variant="outline-success" size="sm" onClick={() => {
                onSuccess();
                onHide();
              }}>
                Ver Pregunta
              </Button>
              <Button variant="success" size="sm" onClick={resetForm}>
                Crear Otra
              </Button>
            </div>
          </Alert>
        ) : (
          <Form>
            {/* General errors */}
            {getErrorsForField('general').length > 0 && (
              <Alert variant="danger">
                {getErrorsForField('general').map((err, i) => (
                  <div key={i}>{err.message}</div>
                ))}
              </Alert>
            )}

            {/* Duplicate warning - ESPECÍFICO DE CREATE */}
            {showDuplicateWarning && duplicateWarning && (
              <Alert variant="warning">
                <Alert.Heading>⚠️ Posible Duplicado Detectado</Alert.Heading>
                <p>Se encontraron {duplicateWarning.similarQuestions.length} pregunta(s) similar(es):</p>
                <ul className="mb-3">
                  {duplicateWarning.similarQuestions.slice(0, 3).map((q) => (
                    <li key={q.question_id}>
                      <small>{q.enunciado.substring(0, 100)}...</small>
                    </li>
                  ))}
                </ul>
                <div className="d-flex gap-2">
                  <Button variant="warning" size="sm" onClick={handleForceSave}>
                    Continuar de Todas Formas
                  </Button>
                  <Button variant="outline-secondary" size="sm" onClick={handleCancelDuplicate}>
                    Cancelar
                  </Button>
                </div>
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

            {/* Development question note - ESPECÍFICO DE CREATE */}
            {questionType === 'desarrollo' && (
              <Alert variant="info">
                <strong>Nota:</strong> Las preguntas de desarrollo no requieren alternativas predefinidas.
                Se pueden agregar criterios de corrección y rúbricas en una versión futura.
              </Alert>
            )}
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
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting || showDuplicateWarning || !selectedTopic}
              title={
                !selectedTopic
                  ? 'Debes seleccionar un tema para continuar'
                  : ''
              }
            >
              {isSubmitting ? '⏳ Guardando...' : '💾 Guardar Pregunta'}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
