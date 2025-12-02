'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, InputGroup, Badge, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { 
  createEvaluation, 
  updateEvaluation,
  getUserByEmail, 
  listQuestionsByUser,
  getEvaluationById,
} from '@/dataconnect-generated';
import { generateUUID } from '@/lib/uuid';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import {
  EVALUATION_STATE_INFO,
  GRADE_SCALE_INFO,
  isEvaluationDraft,
  getEvaluationStateInfo,
} from '@/types/evaluation';

// Escalas de calificación disponibles para el formulario
const GRADE_SCALES = Object.entries(GRADE_SCALE_INFO).map(([id, info]) => ({
  id,
  name: info.name,
  description: info.description,
}));

interface FormErrors {
  title?: string;
  gradeScale?: string;
  subjectId?: string;
  questionSubsetPercent?: string;
  general?: string;
}

interface Question {
  questionId: string;
  topicId: string;
  active: boolean;
}

interface EvaluationFormProps {
  mode: 'create' | 'edit';
  evaluationId?: string;
}

export default function EvaluationForm({ mode, evaluationId }: EvaluationFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { subjects, units, topics, loading: loadingSubjects } = useCurriculumHierarchy();

  // Data state
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(mode === 'edit');
  const [notDraftError, setNotDraftError] = useState(false);
  const [evaluationState, setEvaluationState] = useState<string>('');
  const [evaluationTitle, setEvaluationTitle] = useState<string>('');

  // Form state
  const [title, setTitle] = useState('');
  const [gradeScale, setGradeScale] = useState('1-7');
  const [subjectId, setSubjectId] = useState('');
  const [allowQuestionSubset, setAllowQuestionSubset] = useState(false);
  const [questionSubsetPercent, setQuestionSubsetPercent] = useState<number>(80);

  // Questions state
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdEvaluationId, setCreatedEvaluationId] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  // Load user and questions
  const loadUserAndQuestions = useCallback(async () => {
    if (!user?.email || !user?.firebaseUid) return;

    try {
      setLoadingQuestions(true);
      const userResult = await getUserByEmail({ email: user.email });
      const userData = userResult.data?.users?.[0];
      
      if (userData?.userId) {
        setUserId(userData.userId);
        const questionsResult = await listQuestionsByUser({
          userId: userData.userId,
          firebaseId: user.firebaseUid,
        });
        setAllQuestions(questionsResult.data?.questions || []);
      }
    } catch (err) {
      console.error('Error loading questions:', err);
    } finally {
      setLoadingQuestions(false);
    }
  }, [user]);

  // Load evaluation data (for edit mode)
  const loadEvaluation = useCallback(async () => {
    if (mode !== 'edit' || !evaluationId || !user?.email || !user?.firebaseUid) return;

    try {
      setLoading(true);

      // Get userId first
      const userResult = await getUserByEmail({ email: user.email });
      const userData = userResult.data?.users?.[0];

      if (!userData?.userId) {
        setErrors({ general: 'Usuario no encontrado' });
        return;
      }

      setUserId(userData.userId);

      // Get evaluation
      const evaluationResult = await getEvaluationById({
        userId: userData.userId,
        evaluationId,
        firebaseId: user.firebaseUid,
      });

      const evalData = evaluationResult.data?.evaluations?.[0];

      if (!evalData) {
        setErrors({ general: 'Evaluación no encontrada' });
        return;
      }

      // Check if it's in DRAFT state
      if (!isEvaluationDraft(evalData.state)) {
        setNotDraftError(true);
        setEvaluationState(evalData.state);
        setEvaluationTitle(evalData.title);
        // Redirect after 3 seconds
        setTimeout(() => {
          router.push('/evaluation-management');
        }, 3000);
        return;
      }

      // Load form data
      setTitle(evalData.title);
      setGradeScale(evalData.gradeScale);
      setSubjectId(evalData.subjectId);
      setAllowQuestionSubset(evalData.allowQuestionSubset);
      setQuestionSubsetPercent(evalData.questionSubsetPercent || 80);

    } catch (err) {
      console.error('Error loading evaluation:', err);
      setErrors({ general: err instanceof Error ? err.message : 'Error al cargar la evaluación' });
    } finally {
      setLoading(false);
    }
  }, [mode, evaluationId, user, router]);

  useEffect(() => {
    loadUserAndQuestions();
  }, [loadUserAndQuestions]);

  useEffect(() => {
    if (mode === 'edit') {
      loadEvaluation();
    }
  }, [mode, loadEvaluation]);

  // Count questions available for a subject
  const getQuestionCountForSubject = (subjectIdParam: string): number => {
    const subjectUnits = units.filter(u => u.subject_fk === subjectIdParam);
    const subjectUnitIds = new Set(subjectUnits.map(u => u.unit_id));
    const subjectTopics = topics.filter(t => subjectUnitIds.has(t.unit_fk));
    const subjectTopicIds = new Set(subjectTopics.map(t => t.topic_id));
    return allQuestions.filter(q => q.active && subjectTopicIds.has(q.topicId)).length;
  };

  const selectedSubjectQuestionCount = subjectId ? getQuestionCountForSubject(subjectId) : 0;
  const activeSubjects = subjects.filter(s => s.active && !s.deleted_at);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (title.trim().length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres';
    }

    if (!gradeScale) {
      newErrors.gradeScale = 'Debes seleccionar una escala de calificación';
    }

    if (!subjectId) {
      newErrors.subjectId = 'Debes seleccionar una asignatura';
    }

    if (allowQuestionSubset) {
      if (!questionSubsetPercent || questionSubsetPercent < 10) {
        newErrors.questionSubsetPercent = 'El porcentaje debe ser al menos 10%';
      } else if (questionSubsetPercent > 100) {
        newErrors.questionSubsetPercent = 'El porcentaje no puede exceder 100%';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!user?.email || !user?.firebaseUid) {
      setErrors({ general: 'Usuario no autenticado' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      if (mode === 'create') {
        // Get userId if not already loaded
        let currentUserId = userId;
        if (!currentUserId) {
          const userResult = await getUserByEmail({ email: user.email });
          const userData = userResult.data?.users?.[0];
          if (!userData?.userId) throw new Error('Usuario no encontrado en Data Connect');
          currentUserId = userData.userId;
        }

        const newEvaluationId = generateUUID();

        await createEvaluation({
          evaluationId: newEvaluationId,
          title: title.trim(),
          gradeScale,
          subjectId,
          userId: currentUserId,
          allowQuestionSubset,
          questionSubsetPercent: allowQuestionSubset ? questionSubsetPercent : null,
          firebaseId: user.firebaseUid,
        });

        setSubmitSuccess(true);
        setCreatedEvaluationId(newEvaluationId);

        setTimeout(() => {
          router.push('/evaluation-management');
        }, 2000);

      } else {
        // Edit mode
        await updateEvaluation({
          evaluationId: evaluationId!,
          title: title.trim(),
          gradeScale,
          subjectId,
          allowQuestionSubset,
          questionSubsetPercent: allowQuestionSubset ? questionSubsetPercent : null,
          updatedBy: userId,
          updatedAt: new Date().toISOString(),
          firebaseId: user.firebaseUid,
        });

        setSubmitSuccess(true);

        setTimeout(() => {
          router.push(`/evaluation-management/${evaluationId}`);
        }, 2000);
      }

    } catch (error) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} evaluation:`, error);
      setErrors({
        general: error instanceof Error ? error.message : `Error al ${mode === 'create' ? 'crear' : 'actualizar'} la evaluación`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const backUrl = mode === 'create' 
    ? '/evaluation-management' 
    : `/evaluation-management/${evaluationId}`;

  // Loading state
  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Cargando evaluación...</p>
        </div>
      </Container>
    );
  }

  // Not draft error (edit mode only)
  if (notDraftError) {
    const stateInfo = getEvaluationStateInfo(evaluationState);
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Alert variant="warning" className="text-center">
              <Alert.Heading>⚠️ No se puede editar esta evaluación</Alert.Heading>
              <hr />
              <p>
                La evaluación <strong>&quot;{evaluationTitle}&quot;</strong> está en estado{' '}
                <span className={`badge bg-${stateInfo.variant}`}>
                  {stateInfo.icon} {stateInfo.label}
                </span>
              </p>
              <p className="mb-3">
                Solo se pueden editar evaluaciones en estado <strong>Borrador</strong>.
              </p>
              <hr />
              <p className="mb-0 text-muted">Redirigiendo a la lista de evaluaciones...</p>
              <div className="mt-3">
                <Button variant="primary" onClick={() => router.push('/evaluation-management')}>
                  ← Ir a Evaluaciones
                </Button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">
                {mode === 'create' ? '📝 Crear Nueva Evaluación' : '✏️ Editar Evaluación'}
              </h2>
              <p className="text-muted mb-0">
                {mode === 'create' 
                  ? 'Configure los detalles de la evaluación. Podrá agregar preguntas en el siguiente paso.'
                  : 'Modifica los detalles de la evaluación. Solo disponible para evaluaciones en borrador.'
                }
              </p>
            </div>
            <Button variant="outline-secondary" onClick={() => router.push(backUrl)}>
              ← Volver
            </Button>
          </div>
        </Col>
      </Row>

      {/* Success message */}
      {submitSuccess && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success">
              <Alert.Heading>
                ✅ Evaluación {mode === 'create' ? 'creada' : 'actualizada'} exitosamente!
              </Alert.Heading>
              {mode === 'create' && <p>ID de la evaluación: <strong>{createdEvaluationId}</strong></p>}
              <p className="mb-0">
                Redirigiendo {mode === 'create' ? 'a la gestión de evaluaciones' : 'al detalle de la evaluación'}...
              </p>
            </Alert>
          </Col>
        </Row>
      )}

      {/* General error */}
      {errors.general && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setErrors({})}>
              ❌ {errors.general}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Form */}
      <Row>
        <Col lg={8}>
          <Card className="border-primary border-2">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">📋 Información de la Evaluación</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Title */}
                <Form.Group className="mb-4">
                  <Form.Label>
                    Título de la Evaluación <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Prueba de Matemáticas - Unidad 1"
                    isInvalid={!!errors.title}
                    disabled={isSubmitting || submitSuccess}
                    maxLength={200}
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Un nombre descriptivo para identificar la evaluación
                  </Form.Text>
                </Form.Group>

                {/* Subject */}
                <Form.Group className="mb-4">
                  <AutocompleteSelect
                    label="Asignatura"
                    value={subjectId}
                    onChange={(value) => setSubjectId(String(value))}
                    options={activeSubjects.map(s => {
                      const questionCount = getQuestionCountForSubject(s.subject_id);
                      return {
                        id: s.subject_id,
                        name: s.name,
                        description: `${s.code} • ${questionCount} pregunta${questionCount !== 1 ? 's' : ''} disponible${questionCount !== 1 ? 's' : ''}`
                      };
                    })}
                    placeholder={loadingSubjects || loadingQuestions ? "Cargando..." : "Busca una asignatura..."}
                    disabled={isSubmitting || submitSuccess || loadingSubjects}
                    isInvalid={!!errors.subjectId}
                    errorMessage={errors.subjectId}
                    required
                  />
                  {subjectId && !loadingQuestions && (
                    <div className="mt-2">
                      {selectedSubjectQuestionCount === 0 ? (
                        <Alert variant="warning" className="py-2 mb-0">
                          ⚠️ <strong>Sin preguntas disponibles:</strong> Esta asignatura no tiene preguntas en el banco. 
                          Deberás crear preguntas en el <a href="/questions-bank">Banco de Preguntas</a> antes de poder agregarlas a la evaluación.
                          {mode === 'edit' && (
                            <>
                              <br />
                              <strong>Precaución:</strong> Cambiar la asignatura puede afectar las preguntas ya agregadas.
                            </>
                          )}
                        </Alert>
                      ) : (
                        <>
                          <Badge bg="success">
                            ✓ {selectedSubjectQuestionCount} pregunta{selectedSubjectQuestionCount !== 1 ? 's' : ''} disponible{selectedSubjectQuestionCount !== 1 ? 's' : ''}
                          </Badge>
                          {mode === 'edit' && (
                            <Alert variant="warning" className="py-2 mb-0 mt-2">
                              ⚠️ <strong>Precaución:</strong> Cambiar la asignatura puede afectar las preguntas ya agregadas.
                            </Alert>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </Form.Group>

                {/* Grade Scale */}
                <Form.Group className="mb-4">
                  <Form.Label>
                    Escala de Calificación <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-3">
                    {GRADE_SCALES.map((scale) => (
                      <div 
                        key={scale.id}
                        className={`p-3 border rounded d-flex align-items-start ${gradeScale === scale.id ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                        style={{ minWidth: '150px', cursor: 'pointer' }}
                        onClick={() => !isSubmitting && !submitSuccess && setGradeScale(scale.id)}
                      >
                        <Form.Check
                          type="radio"
                          id={`scale-${scale.id}`}
                          name="gradeScale"
                          checked={gradeScale === scale.id}
                          onChange={() => setGradeScale(scale.id)}
                          disabled={isSubmitting || submitSuccess}
                          className="me-2"
                        />
                        <div>
                          <strong>{scale.name}</strong>
                          <br />
                          <small className="text-muted">{scale.description}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.gradeScale && (
                    <div className="text-danger mt-1">
                      <small>{errors.gradeScale}</small>
                    </div>
                  )}
                </Form.Group>

                <hr className="my-4" />

                {/* Advanced config */}
                <h6 className="mb-3">⚙️ Configuración Avanzada</h6>

                <div className="p-3 border rounded bg-light mb-4">
                  <Form.Check
                    type="switch"
                    id="allowQuestionSubset"
                    label={
                      <span>
                        <strong>Subconjunto Aleatorio de Preguntas</strong>
                        <br />
                        <small className="text-muted">
                          Cada estudiante recibirá un subconjunto aleatorio de las preguntas disponibles
                        </small>
                      </span>
                    }
                    checked={allowQuestionSubset}
                    onChange={(e) => setAllowQuestionSubset(e.target.checked)}
                    disabled={isSubmitting || submitSuccess}
                  />

                  {allowQuestionSubset && (
                    <div className="mt-3 ps-4">
                      <Form.Group>
                        <Form.Label>Porcentaje de Preguntas a Asignar</Form.Label>
                        <InputGroup style={{ maxWidth: '200px' }}>
                          <Form.Control
                            type="number"
                            value={questionSubsetPercent}
                            onChange={(e) => setQuestionSubsetPercent(Number(e.target.value))}
                            min={10}
                            max={100}
                            step={5}
                            isInvalid={!!errors.questionSubsetPercent}
                            disabled={isSubmitting || submitSuccess}
                          />
                          <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                          {errors.questionSubsetPercent}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                          Ej: Si hay 20 preguntas y configuras 80%, cada estudiante recibirá 16 preguntas aleatorias
                        </Form.Text>
                      </Form.Group>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="d-flex gap-2 justify-content-end mt-4">
                  <Button
                    variant="outline-secondary"
                    onClick={() => router.push(backUrl)}
                    disabled={isSubmitting}
                  >
                    ❌ Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || submitSuccess}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        {mode === 'create' ? 'Creando...' : 'Guardando...'}
                      </>
                    ) : (
                      mode === 'create' ? '💾 Crear Evaluación' : '💾 Guardar Cambios'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          <Card className="border-info mb-4">
            <Card.Header className="bg-info text-white">
              <h6 className="mb-0">ℹ️ Información</h6>
            </Card.Header>
            <Card.Body>
              {mode === 'create' ? (
                <>
                  <p className="mb-2"><strong>Estado inicial:</strong> Borrador</p>
                  <p className="text-muted mb-0">
                    La evaluación se creará en estado <strong>Borrador</strong>. 
                    Después podrás agregar preguntas y publicarla cuando esté lista.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-2">
                    <strong>ID:</strong> <code className="small">{evaluationId}</code>
                  </p>
                  <p className="mb-2">
                    <strong>Estado actual:</strong>{' '}
                    <span className="badge bg-secondary">📝 Borrador</span>
                  </p>
                  <hr />
                  <p className="text-muted mb-0 small">
                    Solo puedes editar evaluaciones en estado <strong>Borrador</strong>. 
                    Una vez publicada, la evaluación no podrá ser modificada.
                  </p>
                </>
              )}
            </Card.Body>
          </Card>

          <Card className="border-warning">
            <Card.Header className="bg-warning text-dark">
              <h6 className="mb-0">{mode === 'create' ? '📌 Próximos Pasos' : '⚠️ Precauciones'}</h6>
            </Card.Header>
            <Card.Body>
              {mode === 'create' ? (
                <ol className="mb-0 ps-3">
                  <li className="mb-2">Crear la evaluación (paso actual)</li>
                  <li className="mb-2">Agregar preguntas del banco</li>
                  <li className="mb-2">Asignar puntajes a cada pregunta</li>
                  <li className="mb-2">Asignar a cursos (fecha y duración)</li>
                  <li>Publicar la evaluación</li>
                </ol>
              ) : (
                <ul className="mb-0 ps-3 small">
                  <li className="mb-2">
                    <strong>Cambiar asignatura:</strong> Si la evaluación ya tiene preguntas, 
                    cambiar la asignatura puede hacer que las preguntas existentes no correspondan.
                  </li>
                  <li className="mb-2">
                    <strong>Escala de calificación:</strong> Asegúrate de elegir la escala correcta 
                    antes de agregar preguntas.
                  </li>
                  <li>
                    <strong>Subconjunto aleatorio:</strong> Esta opción solo tiene efecto si hay 
                    suficientes preguntas en la evaluación.
                  </li>
                </ul>
              )}
            </Card.Body>
          </Card>

          {mode === 'create' && (
            <Card className="mt-4 border-secondary">
              <Card.Header className="bg-secondary text-white">
                <h6 className="mb-0">📅 Fecha y Duración</h6>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-0">
                  <small>
                    La <strong>fecha programada</strong> y la <strong>duración</strong> se configuran 
                    al asignar la evaluación a un curso. Esto permite que la misma evaluación 
                    se aplique en diferentes fechas y con diferentes duraciones según el curso.
                  </small>
                </p>
              </Card.Body>
            </Card>
          )}

          <Card className="mt-4">
            <Card.Header>
              <h6 className="mb-0">🔄 Estados de Evaluación</h6>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled mb-0">
                {Object.entries(EVALUATION_STATE_INFO).map(([key, info]) => (
                  <li key={key} className="mb-2">
                    <span className={`badge bg-${info.variant} ${key === 'DRAFT' ? 'border border-dark' : ''}`}>
                      {info.icon} {info.label}
                    </span>
                    {key === 'DRAFT' && mode === 'edit' && (
                      <small className="text-success ms-2">← Editable</small>
                    )}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
