/**
 * CU-BP-01: Crear ítem nuevo en el Banco de Preguntas
 * Modal component for creating new questions
 */

'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Badge, Row, Col, Card } from 'react-bootstrap';
import {
  QuestionType,
  DifficultyLevel,
  CreateQuestionInput,
  CreateQuestionOptionInput,
  QuestionValidationError,
  DuplicateDetectionResult,
} from '@/types/question';
import { questionStore, QUESTION_TYPE_RULES } from '@/lib/questionStore';
import { getAllSubjects, getAllUnits, getAllTopics } from '@/lib/taxonomyStore';
import { useAuth } from '@/contexts/AuthContext';

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

  // Load taxonomy data
  const subjects = getAllSubjects().filter(s => s.active && !s.deleted_at);
  const units = selectedSubject 
    ? getAllUnits().filter(u => u.subject_fk === selectedSubject && u.active && !u.deleted_at)
    : [];
  const topics = selectedUnit
    ? getAllTopics().filter(t => t.unit_fk === selectedUnit && t.active && !t.deleted_at)
    : [];

  // Check for missing taxonomy levels
  const selectedSubjectData = subjects.find(s => s.subject_id === selectedSubject);
  const selectedUnitData = units.find(u => u.unit_id === selectedUnit);
  const hasNoUnits = selectedSubject && units.length === 0;
  const hasNoTopics = selectedUnit && topics.length === 0;

  const difficultyLevels = questionStore.getDifficultyLevels();

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

  const hasErrors = validationErrors.length > 0;
  const rules = QUESTION_TYPE_RULES[questionType];

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {submitSuccess ? '✅ Pregunta Creada' : '➕ Nueva Pregunta'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
            {hasErrors && getErrorsForField('general').length > 0 && (
              <Alert variant="danger">
                {getErrorsForField('general').map((err, i) => (
                  <div key={i}>{err.message}</div>
                ))}
              </Alert>
            )}

            {/* Duplicate warning */}
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

            {/* Question Type */}
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Pregunta *</Form.Label>
              <Form.Select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                isInvalid={getErrorsForField('type').length > 0}
              >
                {Object.values(QUESTION_TYPE_RULES).map((rule) => (
                  <option key={rule.type} value={rule.type}>
                    {rule.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">{rules.description}</Form.Text>
              {getErrorsForField('type').map((err, i) => (
                <Form.Control.Feedback key={i} type="invalid" style={{ display: 'block' }}>
                  {err.message}
                </Form.Control.Feedback>
              ))}
            </Form.Group>

            {/* Question Statement */}
            <Form.Group className="mb-3">
              <Form.Label>Enunciado de la Pregunta *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
                placeholder="Escribe el texto de la pregunta..."
                isInvalid={getErrorsForField('enunciado').length > 0}
              />
              {getErrorsForField('enunciado').map((err, i) => (
                <Form.Control.Feedback key={i} type="invalid">
                  {err.message}
                </Form.Control.Feedback>
              ))}
            </Form.Group>

            {/* Taxonomy Selection */}
            <Card className="mb-3">
              <Card.Header>
                <strong>Taxonomía (Tema) *</strong>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>Asignatura</Form.Label>
                      <Form.Select
                        value={selectedSubject}
                        onChange={(e) => {
                          setSelectedSubject(e.target.value);
                          setSelectedUnit('');
                          setSelectedTopic('');
                        }}
                      >
                        <option value="">Seleccione...</option>
                        {subjects.map((s) => (
                          <option key={s.subject_id} value={s.subject_id}>
                            {s.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>Unidad</Form.Label>
                      <Form.Select
                        value={selectedUnit}
                        onChange={(e) => {
                          setSelectedUnit(e.target.value);
                          setSelectedTopic('');
                        }}
                        disabled={!selectedSubject}
                      >
                        <option value="">Seleccione...</option>
                        {units.map((u) => (
                          <option key={u.unit_id} value={u.unit_id}>
                            {u.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>Tema *</Form.Label>
                      <Form.Select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        disabled={!selectedUnit}
                        isInvalid={getErrorsForField('topic_fk').length > 0}
                      >
                        <option value="">Seleccione...</option>
                        {topics.map((t) => (
                          <option key={t.topic_id} value={t.topic_id}>
                            {t.name}
                          </option>
                        ))}
                      </Form.Select>
                      {getErrorsForField('topic_fk').map((err, i) => (
                        <Form.Control.Feedback key={i} type="invalid">
                          {err.message}
                        </Form.Control.Feedback>
                      ))}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Warning: No units for selected subject */}
                {hasNoUnits && (
                  <Alert variant="warning" className="mb-0 mt-2">
                    <div className="d-flex align-items-start">
                      <span className="me-2">⚠️</span>
                      <div>
                        <strong>La asignatura &ldquo;{selectedSubjectData?.name}&rdquo; no tiene unidades.</strong>
                        <p className="mb-0 mt-1 small">
                          Para poder crear una pregunta, primero debes crear al menos una unidad para esta asignatura.
                          Ve a <strong>Gestión de Taxonomías</strong> para agregar unidades.
                        </p>
                      </div>
                    </div>
                  </Alert>
                )}

                {/* Warning: No topics for selected unit */}
                {hasNoTopics && (
                  <Alert variant="warning" className="mb-0 mt-2">
                    <div className="d-flex align-items-start">
                      <span className="me-2">⚠️</span>
                      <div>
                        <strong>La unidad &ldquo;{selectedUnitData?.name}&rdquo; no tiene temas.</strong>
                        <p className="mb-0 mt-1 small">
                          Para poder crear una pregunta, primero debes crear al menos un tema para esta unidad.
                          Ve a <strong>Gestión de Taxonomías</strong> para agregar temas.
                        </p>
                      </div>
                    </div>
                  </Alert>
                )}
              </Card.Body>
            </Card>

            {/* Difficulty */}
            <Form.Group className="mb-3">
              <Form.Label>Dificultad *</Form.Label>
              <div className="d-flex gap-2">
                {difficultyLevels.map((level) => (
                  <Form.Check
                    key={level.difficulty_id}
                    type="radio"
                    id={`difficulty-${level.difficulty_id}`}
                    label={level.name}
                    name="difficulty"
                    value={level.difficulty_id}
                    checked={difficulty === level.difficulty_id}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                  />
                ))}
              </div>
              {getErrorsForField('difficulty_fk').map((err, i) => (
                <div key={i} className="text-danger small mt-1">
                  {err.message}
                </div>
              ))}
            </Form.Group>

            {/* Options (for non-desarrollo questions) */}
            {questionType !== 'desarrollo' && (
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <strong>Alternativas *</strong>
                  <Badge bg="info">
                    {rules.minOptions === rules.maxOptions
                      ? `Exactamente ${rules.minOptions} opciones`
                      : `Mínimo ${rules.minOptions} opciones`}
                  </Badge>
                </Card.Header>
                <Card.Body>
                  {getErrorsForField('options').length > 0 && (
                    <Alert variant="danger" className="mb-3">
                      {getErrorsForField('options').map((err, i) => (
                        <div key={i}>{err.message}</div>
                      ))}
                    </Alert>
                  )}

                  {options.map((option, index) => (
                    <Row key={index} className="mb-2 align-items-center">
                      <Col xs={1}>
                        <Form.Check
                          type={rules.exactlyOneCorrect ? 'radio' : 'checkbox'}
                          name="correct-option"
                          checked={option.is_correct}
                          onChange={(e) => handleOptionCorrectChange(index, e.target.checked)}
                          label=""
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder={`Opción ${index + 1}`}
                          value={option.text}
                          onChange={(e) => handleOptionTextChange(index, e.target.value)}
                          disabled={questionType === 'verdadero_falso'}
                          isInvalid={getErrorsForField(`options[${index}].text`).length > 0}
                        />
                        {getErrorsForField(`options[${index}].text`).map((err, i) => (
                          <Form.Control.Feedback key={i} type="invalid">
                            {err.message}
                          </Form.Control.Feedback>
                        ))}
                      </Col>
                      {questionType !== 'verdadero_falso' && options.length > rules.minOptions && (
                        <Col xs="auto">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveOption(index)}
                          >
                            ✕
                          </Button>
                        </Col>
                      )}
                    </Row>
                  ))}

                  {questionType !== 'verdadero_falso' && 
                   (!rules.maxOptions || options.length < rules.maxOptions) && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={handleAddOption}
                      className="mt-2"
                    >
                      + Agregar Opción
                    </Button>
                  )}

                  <Form.Text className="d-block mt-2 text-muted">
                    {rules.exactlyOneCorrect
                      ? '☝️ Marca la opción correcta'
                      : '✅ Marca una o más opciones correctas'}
                  </Form.Text>
                </Card.Body>
              </Card>
            )}

            {/* Development question note */}
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
              disabled={isSubmitting || showDuplicateWarning || hasNoUnits || hasNoTopics || !selectedTopic}
              title={
                hasNoUnits 
                  ? 'La asignatura seleccionada no tiene unidades. Crea una primero en Gestión de Taxonomías.'
                  : hasNoTopics
                  ? 'La unidad seleccionada no tiene temas. Crea uno primero en Gestión de Taxonomías.'
                  : !selectedTopic
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
