"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Badge, Row, Col, Card } from 'react-bootstrap';
import {
  QuestionType,
  DifficultyLevel,
  CreateQuestionInput,
  CreateQuestionOptionInput,
  QuestionValidationError,
  QuestionWithDetails,
} from '@/types/question';
import { questionStore, QUESTION_TYPE_RULES } from '@/lib/questionStore';
import { getAllSubjects, getAllUnits, getAllTopics } from '@/lib/taxonomyStore';
import { useAuth } from '@/contexts/AuthContext';

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

  // Load taxonomy data
  const subjects = getAllSubjects().filter(s => s.active && !s.deleted_at);
  const units = selectedSubject
    ? getAllUnits().filter(u => u.subject_fk === selectedSubject && u.active && !u.deleted_at)
    : [];
  const topics = selectedUnit
    ? getAllTopics().filter(t => t.unit_fk === selectedUnit && t.active && !t.deleted_at)
    : [];

  // Check for missing taxonomy levels
  const hasNoUnits = selectedSubject && units.length === 0;
  const hasNoTopics = selectedUnit && topics.length === 0;

  const difficultyLevels = questionStore.getDifficultyLevels();

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

            {/* Question Type */}
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Pregunta *</Form.Label>
              <Form.Select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                disabled={isSubmitting}
              >
                {Object.values(QUESTION_TYPE_RULES).map((rule) => (
                  <option key={rule.type} value={rule.type}>
                    {rule.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                {QUESTION_TYPE_RULES[questionType].description}
              </Form.Text>
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
                disabled={isSubmitting}
              />
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
                          // Reset children only on manual change (not during load)
                          if (!isLoadingQuestion) {
                            setSelectedUnit('');
                            setSelectedTopic('');
                          }
                        }}
                        disabled={isSubmitting}
                      >
                        <option value="">Seleccione...</option>
                        {subjects.map((subject) => (
                          <option key={subject.subject_id} value={subject.subject_id}>
                            {subject.name}
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
                          // Reset children only on manual change (not during load)
                          if (!isLoadingQuestion) {
                            setSelectedTopic('');
                          }
                        }}
                        disabled={!selectedSubject || isSubmitting || !!hasNoUnits}
                      >
                        <option value="">Seleccionar...</option>
                        {units.map((unit) => (
                          <option key={unit.unit_id} value={unit.unit_id}>
                            {unit.name}
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
                        disabled={!selectedUnit || isSubmitting || !!hasNoTopics}
                      >
                        <option value="">Seleccione...</option>
                        {topics.map((topic) => (
                          <option key={topic.topic_id} value={topic.topic_id}>
                            {topic.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Warning: No units for selected subject */}
                {hasNoUnits && selectedSubject && (
                  <Alert variant="warning" className="mb-0 mt-2">
                    <div className="d-flex align-items-start">
                      <span className="me-2">⚠️</span>
                      <div>
                        <strong>La asignatura seleccionada no tiene unidades.</strong>
                        <p className="mb-0 mt-1 small">
                          Debes crear al menos una unidad en <strong>Gestión de Taxonomías</strong> antes de poder seleccionar un tema.
                        </p>
                      </div>
                    </div>
                  </Alert>
                )}

                {/* Warning: No topics for selected unit */}
                {hasNoTopics && selectedUnit && !hasNoUnits && (
                  <Alert variant="warning" className="mb-0 mt-2">
                    <div className="d-flex align-items-start">
                      <span className="me-2">⚠️</span>
                      <div>
                        <strong>La unidad seleccionada no tiene temas.</strong>
                        <p className="mb-0 mt-1 small">
                          Debes crear al menos un tema en <strong>Gestión de Taxonomías</strong> antes de continuar.
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
                    disabled={isSubmitting}
                  />
                ))}
              </div>
            </Form.Group>

            {/* Options (if not desarrollo) */}
            {questionType !== 'desarrollo' && (
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <strong>Alternativas *</strong>
                  <Badge bg="info">
                    {QUESTION_TYPE_RULES[questionType].exactlyOneCorrect
                      ? 'Solo una correcta'
                      : 'Al menos una correcta'}
                  </Badge>
                </Card.Header>
                <Card.Body>
                  {options.map((option, index) => (
                    <div key={index} className="mb-3 p-3 border rounded">
                      <div className="d-flex align-items-start gap-2">
                        <Form.Check
                          type="checkbox"
                          checked={option.is_correct}
                          onChange={(e) => handleOptionCorrectChange(index, e.target.checked)}
                          disabled={isSubmitting}
                          label=""
                          title="Marcar como correcta"
                        />
                        <div className="flex-grow-1">
                          <Form.Control
                            type="text"
                            value={option.text}
                            onChange={(e) => handleOptionTextChange(index, e.target.value)}
                            placeholder={`Alternativa ${index + 1}`}
                            disabled={isSubmitting || (questionType === 'verdadero_falso')}
                          />
                        </div>
                        {questionType !== 'verdadero_falso' &&
                          options.length > QUESTION_TYPE_RULES[questionType].minOptions && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeOption(index)}
                              disabled={isSubmitting}
                            >
                              ❌
                            </Button>
                          )}
                      </div>
                    </div>
                  ))}

                  {questionType !== 'verdadero_falso' && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={addOption}
                      disabled={isSubmitting}
                    >
                      ➕ Agregar Alternativa
                    </Button>
                  )}
                </Card.Body>
              </Card>
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
              onClick={handleSubmit}
              disabled={isSubmitting || hasNoUnits || hasNoTopics || !selectedTopic}
              title={
                hasNoUnits
                  ? 'La asignatura seleccionada no tiene unidades.'
                  : hasNoTopics
                  ? 'La unidad seleccionada no tiene temas.'
                  : !selectedTopic
                  ? 'Debes seleccionar un tema para continuar'
                  : ''
              }
            >
              {isSubmitting ? '⏳ Guardando...' : mode === 'version' ? '💾 Crear Nueva Versión' : '💾 Guardar Cambios'}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
