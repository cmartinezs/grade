'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, InputGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageWrapper from '@/components/PageWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { createEvaluation, getUserByEmail } from '@/dataconnect-generated';
import { generateUUID } from '@/lib/uuid';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';

// Escalas de calificación disponibles
const GRADE_SCALES = [
  { id: '1-7', name: 'Escala 1.0 - 7.0', description: 'Escala chilena tradicional' },
  { id: '0-100', name: 'Escala 0 - 100', description: 'Escala porcentual' },
  { id: '1-10', name: 'Escala 1 - 10', description: 'Escala decimal' },
  { id: 'A-F', name: 'Escala A - F', description: 'Escala de letras' },
];

// Estados de evaluación
const EVALUATION_STATES = {
  DRAFT: 'Borrador',
  PUBLISHED: 'Publicada',
  APPLIED: 'Aplicada',
  GRADED: 'Calificada',
  ARCHIVED: 'Archivada',
};

interface FormErrors {
  title?: string;
  gradeScale?: string;
  subjectId?: string;
  questionSubsetPercent?: string;
  general?: string;
}

export default function CreateEvaluationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { subjects, loading: loadingSubjects } = useCurriculumHierarchy();

  // Form state
  const [title, setTitle] = useState('');
  const [gradeScale, setGradeScale] = useState('1-7');
  const [subjectId, setSubjectId] = useState('');
  const [allowQuestionSubset, setAllowQuestionSubset] = useState(false);
  const [questionSubsetPercent, setQuestionSubsetPercent] = useState<number>(80);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdEvaluationId, setCreatedEvaluationId] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  // Filtrar asignaturas activas
  const activeSubjects = subjects.filter(s => s.active && !s.deleted_at);

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

    if (!user?.email || !user?.firebaseUid) {
      setErrors({ general: 'Usuario no autenticado' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Obtener userId de Data Connect
      const userResult = await getUserByEmail({ email: user.email });
      const userData = userResult.data?.users?.[0];

      if (!userData?.userId) {
        throw new Error('Usuario no encontrado en Data Connect');
      }

      const evaluationId = generateUUID();

      await createEvaluation({
        evaluationId,
        title: title.trim(),
        gradeScale,
        subjectId,
        userId: userData.userId,
        allowQuestionSubset,
        questionSubsetPercent: allowQuestionSubset ? questionSubsetPercent : null,
        firebaseId: user.firebaseUid,
      });

      setSubmitSuccess(true);
      setCreatedEvaluationId(evaluationId);

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/evaluation-management');
      }, 2000);

    } catch (error) {
      console.error('Error creating evaluation:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Error al crear la evaluación',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <PageWrapper>
        <Container className="py-4">
          {/* Header */}
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="mb-1">📝 Crear Nueva Evaluación</h2>
                  <p className="text-muted mb-0">
                    Configure los detalles de la evaluación. Podrá agregar preguntas en el siguiente paso.
                  </p>
                </div>
                <Button
                  variant="outline-secondary"
                  onClick={() => router.push('/evaluation-management')}
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
                  <Alert.Heading>✅ Evaluación creada exitosamente!</Alert.Heading>
                  <p>ID de la evaluación: <strong>{createdEvaluationId}</strong></p>
                  <p className="mb-0">Redirigiendo a la gestión de evaluaciones...</p>
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
                    </Form.Group>

                    {/* Escala de calificación */}
                    <Form.Group className="mb-4">
                      <Form.Label>
                        Escala de Calificación <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="d-flex flex-wrap gap-3">
                        {GRADE_SCALES.map((scale) => (
                          <Form.Check
                            key={scale.id}
                            type="radio"
                            id={`scale-${scale.id}`}
                            name="gradeScale"
                            label={
                              <span>
                                <strong>{scale.name}</strong>
                                <br />
                                <small className="text-muted">{scale.description}</small>
                              </span>
                            }
                            checked={gradeScale === scale.id}
                            onChange={() => setGradeScale(scale.id)}
                            disabled={isSubmitting || submitSuccess}
                            className="p-2 border rounded"
                            style={{ minWidth: '200px' }}
                          />
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
                        onClick={() => router.push('/evaluation-management')}
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
                            Creando...
                          </>
                        ) : (
                          '💾 Crear Evaluación'
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
                    <strong>Estado inicial:</strong> Borrador
                  </p>
                  <p className="text-muted mb-0">
                    La evaluación se creará en estado <strong>Borrador</strong>. 
                    Después podrás agregar preguntas y publicarla cuando esté lista.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-warning">
                <Card.Header className="bg-warning text-dark">
                  <h6 className="mb-0">📌 Próximos Pasos</h6>
                </Card.Header>
                <Card.Body>
                  <ol className="mb-0 ps-3">
                    <li className="mb-2">Crear la evaluación (paso actual)</li>
                    <li className="mb-2">Agregar preguntas del banco</li>
                    <li className="mb-2">Asignar puntajes a cada pregunta</li>
                    <li className="mb-2">Asignar a cursos (fecha y duración)</li>
                    <li>Publicar la evaluación</li>
                  </ol>
                </Card.Body>
              </Card>

              {/* Nota sobre fecha y duración */}
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

              {/* Estados de evaluación */}
              <Card className="mt-4">
                <Card.Header>
                  <h6 className="mb-0">🔄 Estados de Evaluación</h6>
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled mb-0">
                    {Object.entries(EVALUATION_STATES).map(([key, value]) => (
                      <li key={key} className="mb-2">
                        <span className={`badge ${key === 'DRAFT' ? 'bg-secondary' : 
                          key === 'PUBLISHED' ? 'bg-primary' : 
                          key === 'APPLIED' ? 'bg-info' : 
                          key === 'GRADED' ? 'bg-success' : 'bg-dark'}`}>
                          {value}
                        </span>
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
