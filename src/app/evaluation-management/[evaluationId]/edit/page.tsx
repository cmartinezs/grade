'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageWrapper from '@/components/PageWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { 
  getEvaluationById, 
  updateEvaluation, 
  getUserByEmail 
} from '@/dataconnect-generated';
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

interface EvaluationData {
  evaluationId: string;
  title: string;
  gradeScale: string;
  state: string;
  subjectId: string;
  allowQuestionSubset: boolean;
  questionSubsetPercent?: number | null;
}

export default function EditEvaluationPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const evaluationId = params.evaluationId as string;
  const { subjects, loading: loadingSubjects } = useCurriculumHierarchy();

  // Data state
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [notDraftError, setNotDraftError] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [gradeScale, setGradeScale] = useState('1-7');
  const [subjectId, setSubjectId] = useState('');
  const [allowQuestionSubset, setAllowQuestionSubset] = useState(false);
  const [questionSubsetPercent, setQuestionSubsetPercent] = useState<number>(80);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Filtrar asignaturas activas
  const activeSubjects = subjects.filter(s => s.active && !s.deleted_at);

  // Cargar datos de la evaluación
  const loadEvaluation = useCallback(async () => {
    if (!user?.email || !evaluationId) return;

    try {
      setLoading(true);

      // Obtener userId
      const userResult = await getUserByEmail({ email: user.email });
      const userData = userResult.data?.users?.[0];

      if (!userData?.userId) {
        setErrors({ general: 'Usuario no encontrado' });
        return;
      }

      setUserId(userData.userId);

      // Obtener evaluación
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

      // Verificar si está en estado DRAFT
      if (!isEvaluationDraft(evalData.state)) {
        setNotDraftError(true);
        setEvaluation(evalData);
        // Redirigir después de 3 segundos
        setTimeout(() => {
          router.push('/evaluation-management');
        }, 3000);
        return;
      }

      // Cargar datos en el formulario
      setEvaluation(evalData);
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
  }, [user, evaluationId, router]);

  useEffect(() => {
    loadEvaluation();
  }, [loadEvaluation]);

  // Validar formulario
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

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user?.email || !user?.firebaseUid || !userId) {
      setErrors({ general: 'Usuario no autenticado' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await updateEvaluation({
        evaluationId,
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

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push(`/evaluation-management/${evaluationId}`);
      }, 2000);

    } catch (error) {
      console.error('Error updating evaluation:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Error al actualizar la evaluación',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pantalla de carga
  if (loading) {
    return (
      <ProtectedRoute>
        <PageWrapper>
          <Container className="py-5">
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Cargando evaluación...</p>
            </div>
          </Container>
        </PageWrapper>
      </ProtectedRoute>
    );
  }

  // Error: La evaluación no está en estado borrador
  if (notDraftError && evaluation) {
    const stateInfo = getEvaluationStateInfo(evaluation.state);
    return (
      <ProtectedRoute>
        <PageWrapper>
          <Container className="py-5">
            <Row className="justify-content-center">
              <Col md={8} lg={6}>
                <Alert variant="warning" className="text-center">
                  <Alert.Heading>
                    ⚠️ No se puede editar esta evaluación
                  </Alert.Heading>
                  <hr />
                  <p>
                    La evaluación <strong>&quot;{evaluation.title}&quot;</strong> está en estado{' '}
                    <span className={`badge bg-${stateInfo.variant}`}>
                      {stateInfo.icon} {stateInfo.label}
                    </span>
                  </p>
                  <p className="mb-3">
                    Solo se pueden editar evaluaciones en estado <strong>Borrador</strong>.
                  </p>
                  <hr />
                  <p className="mb-0 text-muted">
                    Redirigiendo a la lista de evaluaciones...
                  </p>
                  <div className="mt-3">
                    <Button 
                      variant="primary" 
                      onClick={() => router.push('/evaluation-management')}
                    >
                      ← Ir a Evaluaciones
                    </Button>
                  </div>
                </Alert>
              </Col>
            </Row>
          </Container>
        </PageWrapper>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <PageWrapper>
        <Container className="py-4">
          {/* Header */}
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="mb-1">✏️ Editar Evaluación</h2>
                  <p className="text-muted mb-0">
                    Modifica los detalles de la evaluación. Solo disponible para evaluaciones en borrador.
                  </p>
                </div>
                <Button
                  variant="outline-secondary"
                  onClick={() => router.push(`/evaluation-management/${evaluationId}`)}
                >
                  ← Volver
                </Button>
              </div>
            </Col>
          </Row>

          {/* Mensaje de éxito */}
          {submitSuccess && (
            <Row className="mb-4">
              <Col>
                <Alert variant="success">
                  <Alert.Heading>✅ Evaluación actualizada exitosamente!</Alert.Heading>
                  <p className="mb-0">Redirigiendo al detalle de la evaluación...</p>
                </Alert>
              </Col>
            </Row>
          )}

          {/* Error general */}
          {errors.general && (
            <Row className="mb-4">
              <Col>
                <Alert variant="danger" dismissible onClose={() => setErrors({})}>
                  ❌ {errors.general}
                </Alert>
              </Col>
            </Row>
          )}

          {/* Formulario */}
          <Row>
            <Col lg={8}>
              <Card className="border-primary border-2">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">📋 Información de la Evaluación</h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    {/* Título */}
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
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Un nombre descriptivo para identificar la evaluación
                      </Form.Text>
                    </Form.Group>

                    {/* Asignatura */}
                    <Form.Group className="mb-4">
                      <AutocompleteSelect
                        label="Asignatura"
                        value={subjectId}
                        onChange={(value) => setSubjectId(String(value))}
                        options={activeSubjects.map(s => ({
                          id: s.subject_id,
                          name: s.name,
                          description: s.code
                        }))}
                        placeholder={loadingSubjects ? "Cargando asignaturas..." : "Busca una asignatura..."}
                        disabled={isSubmitting || submitSuccess || loadingSubjects}
                        isInvalid={!!errors.subjectId}
                        errorMessage={errors.subjectId}
                        required
                      />
                      <Form.Text className="text-warning">
                        ⚠️ Cambiar la asignatura puede afectar las preguntas ya agregadas
                      </Form.Text>
                    </Form.Group>

                    {/* Escala de calificación */}
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

                    {/* Separador */}
                    <hr className="my-4" />

                    {/* Configuración avanzada */}
                    <h6 className="mb-3">⚙️ Configuración Avanzada</h6>

                    {/* Subconjunto de preguntas */}
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
                            <Form.Label>
                              Porcentaje de Preguntas a Asignar
                            </Form.Label>
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

                    {/* Botones de acción */}
                    <div className="d-flex gap-2 justify-content-end mt-4">
                      <Button
                        variant="outline-secondary"
                        onClick={() => router.push(`/evaluation-management/${evaluationId}`)}
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
                            Guardando...
                          </>
                        ) : (
                          '💾 Guardar Cambios'
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Panel lateral informativo */}
            <Col lg={4}>
              <Card className="border-info mb-4">
                <Card.Header className="bg-info text-white">
                  <h6 className="mb-0">ℹ️ Información</h6>
                </Card.Header>
                <Card.Body>
                  <p className="mb-2">
                    <strong>ID:</strong> <code className="small">{evaluationId}</code>
                  </p>
                  <p className="mb-2">
                    <strong>Estado actual:</strong>{' '}
                    <span className="badge bg-secondary">
                      📝 Borrador
                    </span>
                  </p>
                  <hr />
                  <p className="text-muted mb-0 small">
                    Solo puedes editar evaluaciones en estado <strong>Borrador</strong>. 
                    Una vez publicada, la evaluación no podrá ser modificada.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-warning">
                <Card.Header className="bg-warning text-dark">
                  <h6 className="mb-0">⚠️ Precauciones</h6>
                </Card.Header>
                <Card.Body>
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
                </Card.Body>
              </Card>

              {/* Estados de evaluación */}
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
                        {key === 'DRAFT' && (
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
      </PageWrapper>
    </ProtectedRoute>
  );
}
