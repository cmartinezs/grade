"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Table,
  Spinner,
  Alert,
  Modal,
  Form,
  InputGroup,
  ListGroup,
} from 'react-bootstrap';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import ViewQuestionModal from '@/app/questions-bank/components/ViewQuestionModal';
import { QRCodeSVG } from 'qrcode.react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { generateAccessCode } from '@/lib/evaluationCode';
import {
  getEvaluationById,
  getUserByEmail,
  listSubjects,
  listQuestionsByUser,
  getAllCoursesByUser,
  addQuestionToEvaluation,
  removeQuestionFromEvaluation,
  updateEvaluationState,
  assignEvaluationToCourse,
  getCoursesForEvaluation,
  updateCourseEvaluationAccessCode,
  listTopics,
  listUnits,
  listDifficulties,
  listQuestionTypes,
  listEducationalLevels,
  getCourseStudentsDetail,
} from '@/dataconnect-generated';
import { generateUUID } from '@/lib/uuid';
import {
  EvaluationState,
  getEvaluationStateInfo,
  getGradeScaleInfo,
  isEvaluationDraft,
  canAssignToCourse,
} from '@/types/evaluation';

interface EvaluationData {
  evaluationId: string;
  title: string;
  gradeScale: string;
  state: string;
  subjectId: string;
  allowQuestionSubset: boolean;
  questionSubsetPercent?: number | null;
  createdAt: string;
  updatedAt?: string | null;
}

interface EvaluationQuestion {
  evaluationQuestionId: string;
  questionId: string;
  points: number;
  position: number;
}

interface Question {
  questionId: string;
  text: string;
  topicId: string;
  difficultyId: string;
  questionTypeId: string;
  active: boolean;
}

interface Subject {
  subjectId: string;
  name: string;
  levelId: string;
}

interface Unit {
  unitId: string;
  subjectId: string;
}

interface Topic {
  topicId: string;
  unitId: string;
}

interface QuestionType {
  questionTypeId: string;
  code: string;
  name: string;
}

interface Difficulty {
  difficultyId: string;
  code: string;
  level: string;
  weight: number;
}

interface EducationalLevel {
  levelId: string;
  name: string;
  code: string;
}

interface Course {
  courseId: string;
  name: string;
  code: string;
  section?: string | null;
  institutionName?: string | null;
  levelId?: string | null;
}

interface CourseEvaluation {
  courseEvaluationId: string;
  courseId: string;
  evaluationId: string;
  accessCode?: string | null;
}

interface CourseStudentCount {
  courseId: string;
  count: number;
}

export default function EvaluationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const evaluationId = params.evaluationId as string;

  // Data state
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [evaluationQuestions, setEvaluationQuestions] = useState<EvaluationQuestion[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [educationalLevels, setEducationalLevels] = useState<EducationalLevel[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignedCourses, setAssignedCourses] = useState<CourseEvaluation[]>([]);
  const [courseStudentCounts, setCourseStudentCounts] = useState<CourseStudentCount[]>([]);
  const [userId, setUserId] = useState<string>('');

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal states
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showAssignCourseModal, setShowAssignCourseModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showQuestionDetailModal, setShowQuestionDetailModal] = useState(false);
  const [selectedQuestionForDetail, setSelectedQuestionForDetail] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState<{ 
    courseId: string; 
    evaluationId: string;
    courseEvaluationId: string;
    courseName: string;
    courseCode: string;
    courseSection: string;
    institution: string;
    level: string;
    studentCount: number;
    accessCode: string | null;
  } | null>(null);
  const [generatingAccessCode, setGeneratingAccessCode] = useState(false);

  // Add question form state
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const [questionPoints, setQuestionPoints] = useState<number>(1);
  const [addingQuestion, setAddingQuestion] = useState(false);

  // Assign course form state
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [assigningCourse, setAssigningCourse] = useState(false);

  // Publish state
  const [publishing, setPublishing] = useState(false);

  // Load evaluation data
  const loadEvaluationData = useCallback(async () => {
    if (!user?.email || !evaluationId) return;

    try {
      setLoading(true);
      setError(null);

      // Get userId
      const userResult = await getUserByEmail({ email: user.email });
      const userData = userResult.data?.users?.[0];

      if (!userData?.userId) {
        setError('Usuario no encontrado');
        return;
      }

      setUserId(userData.userId);

      // Load all data in parallel
      const [evaluationResult, subjectsResult, unitsResult, topicsResult, questionTypesResult, difficultiesResult, levelsResult, questionsResult, coursesResult, assignedResult] = await Promise.all([
        getEvaluationById({
          userId: userData.userId,
          evaluationId,
          firebaseId: user.firebaseUid,
        }),
        listSubjects(),
        listUnits(),
        listTopics(),
        listQuestionTypes(),
        listDifficulties(),
        listEducationalLevels(),
        listQuestionsByUser({
          userId: userData.userId,
          firebaseId: user.firebaseUid,
        }),
        getAllCoursesByUser({
          userId: userData.userId,
          firebaseId: user.firebaseUid,
        }),
        getCoursesForEvaluation({ evaluationId }),
      ]);

      const evalData = evaluationResult.data?.evaluations?.[0];
      if (!evalData) {
        setError('Evaluación no encontrada');
        return;
      }

      setEvaluation(evalData);
      setEvaluationQuestions(evaluationResult.data?.evaluationQuestions || []);
      setSubjects(subjectsResult.data?.subjects || []);
      setUnits(unitsResult.data?.units || []);
      setTopics(topicsResult.data?.topics || []);
      setQuestionTypes(questionTypesResult.data?.questionTypes || []);
      setDifficulties(difficultiesResult.data?.difficulties || []);
      setEducationalLevels(levelsResult.data?.educationalLevels || []);
      setAllQuestions(questionsResult.data?.questions || []);
      setCourses(coursesResult.data?.courses || []);
      setAssignedCourses(assignedResult.data?.courseEvaluations || []);

      // Load student counts for assigned courses
      const assignedCoursesList = assignedResult.data?.courseEvaluations || [];
      if (assignedCoursesList.length > 0) {
        const studentCountPromises = assignedCoursesList.map(async (ac: CourseEvaluation) => {
          try {
            const result = await getCourseStudentsDetail({ courseId: ac.courseId });
            return {
              courseId: ac.courseId,
              count: result.data?.courseStudents?.length || 0,
            };
          } catch {
            return { courseId: ac.courseId, count: 0 };
          }
        });
        const counts = await Promise.all(studentCountPromises);
        setCourseStudentCounts(counts);
      }
    } catch (err) {
      console.error('Error loading evaluation:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar la evaluación');
    } finally {
      setLoading(false);
    }
  }, [user, evaluationId]);

  useEffect(() => {
    loadEvaluationData();
  }, [loadEvaluationData]);

  // Helper functions
  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.subjectId === subjectId);
    return subject?.name || 'Sin asignatura';
  };

  const getSubjectWithLevel = (subjectId: string) => {
    const subject = subjects.find(s => s.subjectId === subjectId);
    if (!subject) return { name: 'Sin asignatura', levelName: '' };
    const level = educationalLevels.find(l => l.levelId === subject.levelId);
    return { name: subject.name, levelName: level?.name || '' };
  };

  const getQuestionText = (questionId: string) => {
    const question = allQuestions.find(q => q.questionId === questionId);
    return question?.text || 'Pregunta no encontrada';
  };

  const getCourseFullInfo = (courseId: string) => {
    const course = courses.find(c => c.courseId === courseId);
    if (!course) return { name: 'Curso no encontrado', code: '', section: '', institution: '', level: '', studentCount: 0 };
    
    const level = course.levelId 
      ? educationalLevels.find(l => l.levelId === course.levelId)
      : null;
    
    const studentCount = courseStudentCounts.find(c => c.courseId === courseId)?.count || 0;
    
    return {
      name: course.name,
      code: course.code,
      section: course.section || '',
      institution: course.institutionName || 'Sin institución',
      level: level?.name || 'Sin nivel',
      studentCount,
    };
  };

  const getTotalPoints = () => {
    return evaluationQuestions.reduce((sum, eq) => sum + eq.points, 0);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '-';
    }
  };

  // Get available questions (not already added, filtered by evaluation's subject)
  const getAvailableQuestions = () => {
    const addedQuestionIds = new Set(evaluationQuestions.map(eq => eq.questionId));
    
    // Get units for this subject
    const subjectUnitIds = new Set(
      units
        .filter(u => u.subjectId === evaluation?.subjectId)
        .map(u => u.unitId)
    );
    
    // Get topics for those units
    const subjectTopicIds = new Set(
      topics
        .filter(t => subjectUnitIds.has(t.unitId))
        .map(t => t.topicId)
    );
    
    // Filter questions by: active, not already added, and belongs to this subject's topics
    return allQuestions.filter(q => 
      q.active && 
      !addedQuestionIds.has(q.questionId) && 
      subjectTopicIds.has(q.topicId)
    );
  };

  // Get available courses (not already assigned, filtered by evaluation's subject level)
  const getAvailableCourses = () => {
    const assignedCourseIds = new Set(assignedCourses.map(ac => ac.courseId));
    
    // Get the level of the evaluation's subject
    const evaluationSubject = subjects.find(s => s.subjectId === evaluation?.subjectId);
    const evaluationLevelId = evaluationSubject?.levelId;
    
    // Filter courses by: not already assigned AND same level as the evaluation's subject
    return courses.filter(c => 
      !assignedCourseIds.has(c.courseId) && 
      c.levelId === evaluationLevelId
    );
  };

  // Handle add question
  const handleAddQuestion = async () => {
    if (!selectedQuestionId || questionPoints <= 0) return;

    try {
      setAddingQuestion(true);
      const nextPosition = evaluationQuestions.length + 1;

      await addQuestionToEvaluation({
        evaluationQuestionId: generateUUID(),
        evaluationId,
        questionId: selectedQuestionId,
        points: questionPoints,
        position: nextPosition,
      });

      setSuccessMessage('Pregunta agregada exitosamente');
      setShowAddQuestionModal(false);
      setSelectedQuestionId('');
      setQuestionPoints(1);
      await loadEvaluationData();
    } catch (err) {
      console.error('Error adding question:', err);
      setError(err instanceof Error ? err.message : 'Error al agregar la pregunta');
    } finally {
      setAddingQuestion(false);
    }
  };

  // Handle remove question
  const handleRemoveQuestion = async (evaluationQuestionId: string) => {
    if (!confirm('¿Estás seguro de eliminar esta pregunta de la evaluación?')) return;

    try {
      await removeQuestionFromEvaluation({ evaluationQuestionId });
      setSuccessMessage('Pregunta eliminada de la evaluación');
      await loadEvaluationData();
    } catch (err) {
      console.error('Error removing question:', err);
      setError(err instanceof Error ? err.message : 'Error al eliminar la pregunta');
    }
  };

  // Handle assign course
  const handleAssignCourse = async () => {
    if (!selectedCourseId || !scheduledDate || durationMinutes <= 0) return;

    try {
      setAssigningCourse(true);

      await assignEvaluationToCourse({
        courseEvaluationId: generateUUID(),
        courseId: selectedCourseId,
        evaluationId,
        scheduledDate,
        durationMinutes,
        createdBy: userId,
        firebaseId: user?.firebaseUid || '',
      });

      setSuccessMessage('Evaluación asignada al curso exitosamente');
      setShowAssignCourseModal(false);
      setSelectedCourseId('');
      setScheduledDate('');
      setDurationMinutes(60);
      await loadEvaluationData();
    } catch (err) {
      console.error('Error assigning course:', err);
      setError(err instanceof Error ? err.message : 'Error al asignar el curso');
    } finally {
      setAssigningCourse(false);
    }
  };

  // Handle publish
  const handlePublish = async () => {
    if (evaluationQuestions.length === 0) {
      setError('Debes agregar al menos una pregunta antes de publicar');
      return;
    }

    try {
      setPublishing(true);

      await updateEvaluationState({
        evaluationId,
        state: EvaluationState.PUBLISHED,
        updatedBy: userId,
        updatedAt: new Date().toISOString(),
        firebaseId: user?.firebaseUid || '',
      });

      setSuccessMessage('¡Evaluación publicada exitosamente!');
      setShowPublishModal(false);
      await loadEvaluationData();
    } catch (err) {
      console.error('Error publishing:', err);
      setError(err instanceof Error ? err.message : 'Error al publicar la evaluación');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <Container className="py-5">
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Cargando evaluación...</p>
          </div>
        </Container>
      </ProtectedRoute>
    );
  }

  if (!evaluation) {
    return (
      <ProtectedRoute>
        <Container className="py-5">
          <Alert variant="danger">
            <Alert.Heading>Evaluación no encontrada</Alert.Heading>
            <p>La evaluación que buscas no existe o no tienes permisos para verla.</p>
            <Button variant="outline-danger" onClick={() => router.push('/evaluation-management')}>
              ← Volver a Evaluaciones
            </Button>
          </Alert>
        </Container>
      </ProtectedRoute>
    );
  }

  const stateInfo = getEvaluationStateInfo(evaluation.state);
  const isDraft = isEvaluationDraft(evaluation.state);
  const availableQuestions = getAvailableQuestions();
  const availableCourses = getAvailableCourses();

  return (
    <ProtectedRoute>
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Button
                  variant="link"
                  className="p-0 mb-2 text-muted"
                  onClick={() => router.push('/evaluation-management')}
                >
                  ← Volver a Evaluaciones
                </Button>
                <h2 className="mb-1">
                  {stateInfo.icon} {evaluation.title}
                </h2>
                <div className="d-flex align-items-center gap-3">
                  <Badge bg={stateInfo.variant} className="fs-6">
                    {stateInfo.label}
                  </Badge>
                  <span className="text-muted">
                    {(() => {
                      const { name, levelName } = getSubjectWithLevel(evaluation.subjectId);
                      return levelName ? `${name} - ${levelName}` : name;
                    })()}
                  </span>
                </div>
              </div>

              {isDraft && (
                <div className="d-flex gap-2">
                  <Button
                    variant="success"
                    onClick={() => setShowPublishModal(true)}
                    disabled={evaluationQuestions.length === 0}
                  >
                    📢 Publicar Evaluación
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Messages */}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            ❌ {error}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)}>
            ✅ {successMessage}
          </Alert>
        )}

        <Row>
          {/* Main Content */}
          <Col lg={8}>
            {/* Info Card */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">📋 Información General</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p><strong>Escala de Calificación:</strong> {getGradeScaleInfo(evaluation.gradeScale).name}</p>
                    <p><strong>Asignatura:</strong> {getSubjectName(evaluation.subjectId)}</p>
                    <p><strong>Creada:</strong> {formatDate(evaluation.createdAt)}</p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Subconjunto Aleatorio:</strong>{' '}
                      {evaluation.allowQuestionSubset ? (
                        <Badge bg="info">Sí - {evaluation.questionSubsetPercent}%</Badge>
                      ) : (
                        <Badge bg="secondary">No</Badge>
                      )}
                    </p>
                    <p><strong>Total Preguntas:</strong> {evaluationQuestions.length}</p>
                    <p><strong>Puntaje Total:</strong> {getTotalPoints()} pts</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Questions Card */}
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">📝 Preguntas de la Evaluación</h5>
                {isDraft && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowAddQuestionModal(true)}
                    disabled={availableQuestions.length === 0}
                  >
                    ➕ Agregar Pregunta
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                {/* Advertencia si no hay preguntas disponibles para agregar */}
                {isDraft && availableQuestions.length === 0 && evaluationQuestions.length === 0 && (
                  <Alert variant="warning" className="mb-3">
                    <strong>⚠️ Sin preguntas disponibles:</strong> No hay preguntas en el banco para esta asignatura. 
                    Debes <Alert.Link href="/questions-bank">crear preguntas</Alert.Link> antes de poder agregarlas a la evaluación.
                  </Alert>
                )}
                {isDraft && availableQuestions.length === 0 && evaluationQuestions.length > 0 && (
                  <Alert variant="info" className="mb-3">
                    <strong>ℹ️ Todas las preguntas agregadas:</strong> Ya has agregado todas las preguntas disponibles para esta asignatura.
                  </Alert>
                )}
                {evaluationQuestions.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted mb-3">No hay preguntas agregadas aún</p>
                    {isDraft && availableQuestions.length > 0 && (
                      <Button
                        variant="outline-primary"
                        onClick={() => setShowAddQuestionModal(true)}
                      >
                        ➕ Agregar Primera Pregunta
                      </Button>
                    )}
                    {isDraft && availableQuestions.length === 0 && (
                      <Button
                        variant="outline-secondary"
                        onClick={() => router.push('/questions-bank')}
                      >
                        📚 Ir al Banco de Preguntas
                      </Button>
                    )}
                  </div>
                ) : (
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th style={{ width: '50px' }}>#</th>
                        <th>Pregunta</th>
                        <th style={{ width: '100px' }}>Puntaje</th>
                        {isDraft && <th style={{ width: '100px' }}>Acciones</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {evaluationQuestions
                        .sort((a, b) => a.position - b.position)
                        .map((eq) => (
                          <tr 
                            key={eq.evaluationQuestionId}
                            onClick={() => {
                              setSelectedQuestionForDetail(eq.questionId);
                              setShowQuestionDetailModal(true);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="hover-row"
                          >
                            <td>{eq.position}</td>
                            <td>
                              <span className="text-truncate d-inline-block" style={{ maxWidth: '400px' }}>
                                {getQuestionText(eq.questionId)}
                              </span>
                              <small className="d-block text-muted">Click para ver detalle</small>
                            </td>
                            <td>
                              <Badge bg="primary">{eq.points} pts</Badge>
                            </td>
                            {isDraft && (
                              <td>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleRemoveQuestion(eq.evaluationQuestionId)}
                                >
                                  🗑️
                                </Button>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>

            {/* Assigned Courses Card */}
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">🎓 Cursos Asignados</h5>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowAssignCourseModal(true)}
                  disabled={availableCourses.length === 0 || !canAssignToCourse(evaluation.state)}
                >
                  ➕ Asignar a Curso
                </Button>
              </Card.Header>
              <Card.Body>
                {isEvaluationDraft(evaluation.state) && (
                  <Alert variant="warning" className="mb-3">
                    ⚠️ Debes publicar la evaluación antes de asignarla a un curso.
                  </Alert>
                )}
                {assignedCourses.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">No hay cursos asignados aún</p>
                  </div>
                ) : (
                  <ListGroup>
                    {assignedCourses.map((ac) => {
                      const courseInfo = getCourseFullInfo(ac.courseId);
                      return (
                        <ListGroup.Item
                          key={ac.courseEvaluationId}
                          className="d-flex justify-content-between align-items-start"
                        >
                          <div>
                            <div className="fw-bold d-flex align-items-center gap-2">
                              {courseInfo.name}
                              <Badge bg="info">{courseInfo.code}</Badge>
                              {courseInfo.section && <Badge bg="secondary">{courseInfo.section}</Badge>}
                            </div>
                            <small className="text-muted d-block">
                              🏛️ {courseInfo.institution} • 📚 {courseInfo.level}
                            </small>
                            <small className="text-muted d-block">
                              👥 {courseInfo.studentCount} {courseInfo.studentCount === 1 ? 'alumno' : 'alumnos'}
                            </small>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => {
                                setQrData({
                                  courseId: ac.courseId,
                                  evaluationId: evaluationId,
                                  courseEvaluationId: ac.courseEvaluationId,
                                  courseName: courseInfo.name,
                                  courseCode: courseInfo.code,
                                  courseSection: courseInfo.section,
                                  institution: courseInfo.institution,
                                  level: courseInfo.level,
                                  studentCount: courseInfo.studentCount,
                                  accessCode: ac.accessCode || null,
                                });
                                setShowQRModal(true);
                              }}
                              title="Generar Código QR"
                            >
                              📱 QR
                            </Button>
                            <Badge bg="success">Asignado</Badge>
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Quick Actions */}
            <Card className="mb-4">
              <Card.Header>
                <h6 className="mb-0">⚡ Acciones Rápidas</h6>
              </Card.Header>
              <Card.Body className="d-grid gap-2">
                {isDraft && (
                  <>
                    <Button
                      variant="outline-primary"
                      onClick={() => setShowAddQuestionModal(true)}
                      disabled={availableQuestions.length === 0}
                    >
                      ➕ Agregar Pregunta
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => setShowPublishModal(true)}
                      disabled={evaluationQuestions.length === 0}
                    >
                      📢 Publicar Evaluación
                    </Button>
                  </>
                )}
                {canAssignToCourse(evaluation.state) && (
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowAssignCourseModal(true)}
                    disabled={availableCourses.length === 0}
                  >
                    🎓 Asignar a Curso
                  </Button>
                )}
                <Button
                  variant="outline-secondary"
                  onClick={() => router.push('/evaluation-management')}
                >
                  ← Volver al Listado
                </Button>
              </Card.Body>
            </Card>

            {/* Stats */}
            <Card className="mb-4">
              <Card.Header>
                <h6 className="mb-0">📊 Estadísticas</h6>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Preguntas:</span>
                  <strong>{evaluationQuestions.length}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Puntaje Total:</span>
                  <strong>{getTotalPoints()} pts</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Cursos Asignados:</span>
                  <strong>{assignedCourses.length}</strong>
                </div>
              </Card.Body>
            </Card>

            {/* Help */}
            <Card className="border-info">
              <Card.Header className="bg-info text-white">
                <h6 className="mb-0">ℹ️ Ayuda</h6>
              </Card.Header>
              <Card.Body>
                <small className="text-muted">
                  <strong>Flujo de trabajo:</strong>
                  <ol className="mt-2 mb-0 ps-3">
                    <li>Agregar preguntas a la evaluación</li>
                    <li>Publicar la evaluación</li>
                    <li>Asignar a uno o más cursos</li>
                    <li>Los estudiantes podrán rendirla</li>
                  </ol>
                </small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Add Question Modal */}
        <Modal show={showAddQuestionModal} onHide={() => setShowAddQuestionModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>➕ Agregar Pregunta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AutocompleteSelect
              label="Selecciona una pregunta"
              value={selectedQuestionId}
              onChange={(value) => setSelectedQuestionId(String(value))}
              options={availableQuestions.map((q) => {
                const questionType = questionTypes.find(qt => qt.questionTypeId === q.questionTypeId);
                const difficulty = difficulties.find(d => d.difficultyId === q.difficultyId);
                return {
                  id: q.questionId,
                  name: q.text.length > 100 ? q.text.substring(0, 100) + '...' : q.text,
                  description: `Tipo: ${questionType?.name || 'N/A'} | Dificultad: ${difficulty?.level || 'N/A'}`
                };
              })}
              placeholder="Escribe para buscar una pregunta..."
              required
              warningMessage={
                availableQuestions.length === 0
                  ? 'No hay preguntas disponibles. Todas las preguntas ya han sido agregadas o no tienes preguntas para esta asignatura.'
                  : undefined
              }
            />

            <Form.Group>
              <Form.Label>Puntaje</Form.Label>
              <InputGroup style={{ maxWidth: '200px' }}>
                <Form.Control
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={questionPoints}
                  onChange={(e) => setQuestionPoints(parseFloat(e.target.value) || 1)}
                />
                <InputGroup.Text>puntos</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddQuestionModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleAddQuestion}
              disabled={!selectedQuestionId || questionPoints <= 0 || addingQuestion}
            >
              {addingQuestion ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Agregando...
                </>
              ) : (
                '➕ Agregar Pregunta'
              )}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Assign Course Modal */}
        <Modal show={showAssignCourseModal} onHide={() => setShowAssignCourseModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>🎓 Asignar a Curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Selecciona un curso</Form.Label>
              <Form.Select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                <option value="">-- Selecciona un curso --</option>
                {availableCourses.map((c) => (
                  <option key={c.courseId} value={c.courseId}>
                    {c.name} ({c.code}) {c.section ? `- ${c.section}` : ''}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha Programada</Form.Label>
              <Form.Control
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Duración</Form.Label>
              <InputGroup style={{ maxWidth: '200px' }}>
                <Form.Control
                  type="number"
                  min={15}
                  step={15}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 60)}
                />
                <InputGroup.Text>minutos</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAssignCourseModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleAssignCourse}
              disabled={!selectedCourseId || !scheduledDate || durationMinutes <= 0 || assigningCourse}
            >
              {assigningCourse ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Asignando...
                </>
              ) : (
                '🎓 Asignar a Curso'
              )}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Publish Modal */}
        <Modal show={showPublishModal} onHide={() => setShowPublishModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>📢 Publicar Evaluación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant="warning">
              <strong>⚠️ Atención:</strong> Una vez publicada la evaluación, no podrás modificar las preguntas.
            </Alert>
            <p>¿Estás seguro de que deseas publicar esta evaluación?</p>
            <ul>
              <li><strong>Título:</strong> {evaluation.title}</li>
              <li><strong>Preguntas:</strong> {evaluationQuestions.length}</li>
              <li><strong>Puntaje Total:</strong> {getTotalPoints()} pts</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPublishModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="success"
              onClick={handlePublish}
              disabled={publishing}
            >
              {publishing ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Publicando...
                </>
              ) : (
                '📢 Publicar Evaluación'
              )}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Question Detail Modal */}
        <ViewQuestionModal
          show={showQuestionDetailModal}
          onHide={() => {
            setShowQuestionDetailModal(false);
            setSelectedQuestionForDetail(null);
          }}
          questionId={selectedQuestionForDetail}
        />

        {/* QR Code Modal */}
        <Modal show={showQRModal} onHide={() => setShowQRModal(false)} centered size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>📱 Código QR para Evaluación</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            {qrData && evaluation && (
              <>
                {/* Información en 2 columnas arriba */}
                <Row className="mb-4">
                  <Col md={6}>
                    <h6 className="text-primary mb-3">🏫 Información del Curso</h6>
                    <div className="mb-2 d-flex">
                      <strong className="me-2">Curso:</strong>
                      <span className="d-flex align-items-center gap-2">
                        {qrData.courseName}
                        <Badge bg="info">{qrData.courseCode}</Badge>
                        {qrData.courseSection && <Badge bg="secondary">{qrData.courseSection}</Badge>}
                      </span>
                    </div>
                    <div className="mb-2 d-flex">
                      <strong className="me-2">Institución:</strong>
                      <span>{qrData.institution}</span>
                    </div>
                    <div className="mb-2 d-flex">
                      <strong className="me-2">Nivel:</strong>
                      <span>{qrData.level}</span>
                    </div>
                    <div className="mb-2 d-flex">
                      <strong className="me-2">Alumnos:</strong>
                      <span>{qrData.studentCount} {qrData.studentCount === 1 ? 'alumno' : 'alumnos'}</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <h6 className="text-primary mb-3">📋 Información de la Evaluación</h6>
                    <div className="mb-2 d-flex">
                      <strong className="me-2">Título:</strong>
                      <span>{evaluation.title}</span>
                    </div>
                    <div className="mb-2 d-flex">
                      <strong className="me-2">Asignatura:</strong>
                      <span>
                        {(() => {
                          const { name, levelName } = getSubjectWithLevel(evaluation.subjectId);
                          return levelName ? `${name} (${levelName})` : name;
                        })()}
                      </span>
                    </div>
                    <div className="mb-2 d-flex">
                      <strong className="me-2">Escala:</strong>
                      <span>{getGradeScaleInfo(evaluation.gradeScale).name}</span>
                    </div>
                    <div className="mb-2 d-flex">
                      <strong className="me-2">Preguntas:</strong>
                      <span>{evaluationQuestions.length}</span>
                    </div>
                    <div className="mb-2 d-flex">
                      <strong className="me-2">Puntaje:</strong>
                      <span>{getTotalPoints()} pts</span>
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <strong className="me-2">Estado:</strong>
                      <Badge bg={getEvaluationStateInfo(evaluation.state).variant}>
                        {getEvaluationStateInfo(evaluation.state).label}
                      </Badge>
                    </div>
                  </Col>
                </Row>
                
                {/* QR Code y código de acceso */}
                <hr />
                <Row>
                  <Col md={7} className="text-center border-end">
                    <h6 className="text-muted mb-3">📲 Escanear código QR</h6>
                    <QRCodeSVG 
                      value={JSON.stringify({ courseId: qrData.courseId, evaluationId })}
                      size={250}
                      level="H"
                      includeMargin={true}
                    />
                  </Col>
                  <Col md={5} className="d-flex flex-column justify-content-center">
                    <h6 className="text-muted mb-3 text-center">⌨️ O ingresar código manual</h6>
                    <p className="text-center text-muted small mb-3">
                      Si no puedes escanear el QR, ingresa este código en la app:
                    </p>
                    {qrData.accessCode ? (
                      <>
                        <div 
                          className="bg-light border rounded p-3 text-center"
                          style={{ fontFamily: 'monospace', fontSize: '1.3rem', letterSpacing: '2px' }}
                        >
                          <strong>{qrData.accessCode}</strong>
                        </div>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            navigator.clipboard.writeText(qrData.accessCode!);
                          }}
                        >
                          📋 Copiar código
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="text-center">
                          <Button
                            variant="primary"
                            disabled={generatingAccessCode}
                            onClick={async () => {
                              if (!user?.firebaseUid) return;
                              setGeneratingAccessCode(true);
                              try {
                                const newCode = generateAccessCode({ 
                                  courseId: qrData.courseId, 
                                  evaluationId 
                                });
                                await updateCourseEvaluationAccessCode({
                                  courseEvaluationId: qrData.courseEvaluationId,
                                  accessCode: newCode,
                                  firebaseId: user.firebaseUid,
                                });
                                // Actualizar el estado local
                                setQrData(prev => prev ? { ...prev, accessCode: newCode } : null);
                                // También actualizar assignedCourses
                                setAssignedCourses(prev => prev.map(ac => 
                                  ac.courseEvaluationId === qrData.courseEvaluationId 
                                    ? { ...ac, accessCode: newCode }
                                    : ac
                                ));
                              } catch (err) {
                                console.error('Error generating access code:', err);
                              } finally {
                                setGeneratingAccessCode(false);
                              }
                            }}
                          >
                            {generatingAccessCode ? (
                              <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Generando...
                              </>
                            ) : (
                              '🔑 Generar Código'
                            )}
                          </Button>
                        </div>
                        <p className="text-center text-muted small mt-2">
                          El código se guardará para uso futuro
                        </p>
                      </>
                    )}
                  </Col>
                </Row>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowQRModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </ProtectedRoute>
  );
}
