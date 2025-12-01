'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageWrapper from '@/components/PageWrapper';
import PageHeader from '@/components/PageHeader';
import MasterDataTable, { ColumnConfig, ActionButton } from '@/components/shared/MasterDataTable';
import EnrollStudentModal from './EnrollStudentModal';
import { useAuth } from '@/contexts/AuthContext';
import { courseStore } from '@/lib/courseStore';
import { levelStore } from '@/lib/levelStore';
import { studentStore } from '@/lib/studentStore';
import { fetchCourseEnrollmentsFromDataConnect } from '@/lib/studentDataConnect';
import { Course } from '@/types/course';
import { StudentEnrollment } from '@/types/student';

const PAGE_SIZE = 10;

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const courseId = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<StudentEnrollment[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  // Load course data
  useEffect(() => {
    if (!courseId || !user?.id || !user?.firebaseUid) return;

    const loadCourseData = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Load levels and courses if not already loaded
        await levelStore.loadLevels();
        await courseStore.loadCourses(user.id, user.firebaseUid);
        
        // Get the course
        const courseData = courseStore.getCourse(courseId);
        if (!courseData) {
          setError('Curso no encontrado');
          return;
        }
        
        console.log('[COURSE DETAIL] Course data:', courseData);
        console.log('[COURSE DETAIL] Level ID:', courseData.levelId);
        console.log('[COURSE DETAIL] Section:', courseData.section);
        
        setCourse(courseData);

        // Load students enrolled in this course
        await loadStudents();
      } catch (err) {
        console.error('Error loading course:', err);
        setError('Error al cargar el curso');
      } finally {
        setIsLoading(false);
      }
    };

    loadCourseData();
  }, [courseId, user?.id, user?.firebaseUid]);

  const loadStudents = async () => {
    if (!courseId || !user?.firebaseUid) return;

    try {
      // Try to get from cache first
      let enrollments = studentStore.getEnrollmentsByCourse(courseId);
      
      // If cache is empty, load from Data-Connect
      if (enrollments.length === 0) {
        enrollments = await fetchCourseEnrollmentsFromDataConnect(courseId, user.firebaseUid);
        studentStore.setEnrollmentsByCourse(courseId, enrollments);
      }

      setStudents(enrollments);
      setTotalStudents(enrollments.length);
      setTotalPages(Math.ceil(enrollments.length / PAGE_SIZE));
    } catch (err) {
      console.error('Error loading students:', err);
      // Don't set error state, just show empty list
      setStudents([]);
      setTotalStudents(0);
      setTotalPages(0);
    }
  };

  const handleEnrollSuccess = (enrollment: StudentEnrollment) => {
    // Add new enrollment to the list
    const updatedStudents = [...students, enrollment];
    setStudents(updatedStudents);
    setTotalStudents(updatedStudents.length);
    setTotalPages(Math.ceil(updatedStudents.length / PAGE_SIZE));
  };

  const handleUnenrollStudent = async (student: StudentEnrollment) => {
    if (!user?.id || !user?.firebaseUid) return;
    
    // TODO: Implement unenroll confirmation and API call
    console.log('Unenroll student:', student);
  };

  const getLevelName = (levelId: string): string => {
    const level = levelStore.getLevelById(levelId);
    console.log('[COURSE DETAIL] Getting level name for:', levelId, 'Found:', level);
    return level ? level.name : `Nivel ${levelId}`;
  };

  const columns: ColumnConfig<StudentEnrollment>[] = [
    {
      key: 'identifier',
      label: 'RUT/ID',
      render: (value) => <code className="text-primary">{String(value)}</code>,
      width: '150px',
    },
    {
      key: 'firstName',
      label: 'Nombre',
      render: (value) => <strong>{String(value)}</strong>,
    },
    {
      key: 'lastName',
      label: 'Apellido',
      render: (value) => <strong>{String(value)}</strong>,
    },
    {
      key: 'enrolledOn',
      label: 'Fecha Matrícula',
      render: (value) => {
        if (!value) return <span className="text-muted small">-</span>;
        const date = new Date(value as string | Date);
        return <span className="text-muted small">{date.toLocaleDateString()}</span>;
      },
      width: '140px',
    },
  ];

  const actions: ActionButton<StudentEnrollment>[] = [
    {
      icon: '🗑️',
      label: 'Desinscribir',
      onClick: handleUnenrollStudent,
      variant: 'outline-danger',
      title: 'Desinscribir estudiante del curso',
    },
  ];

  if (error) {
    return (
      <ProtectedRoute>
        <PageWrapper>
          <Container fluid className="py-4">
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
              <Button variant="outline-danger" onClick={() => router.back()}>
                Volver
              </Button>
            </Alert>
          </Container>
        </PageWrapper>
      </ProtectedRoute>
    );
  }

  if (!course) {
    return (
      <ProtectedRoute>
        <PageWrapper>
          <Container fluid className="py-4">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          </Container>
        </PageWrapper>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <PageWrapper>
        <Container fluid className="py-4">
          {/* Header with Back Button */}
          <Row className="mb-4">
            <Col>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => router.push('/evaluation-management/courses')}
                className="mb-3"
              >
                ← Volver a Cursos
              </Button>
              <PageHeader
                icon="📚"
                title={`Detalle del Curso: ${course.name}`}
                description={`Información y nómina de estudiantes del curso ${course.code}`}
              />
            </Col>
          </Row>

          {/* Course Information Card */}
          <Row className="mb-4">
            <Col>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">📋 Información del Curso</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  {/* Sección Principal */}
                  <div className="mb-3 pb-3 border-bottom">
                    <h6 className="text-primary mb-2 fw-bold">Identificación del Curso</h6>
                    <Row className="g-2">
                      <Col md={6}>
                        <div className="bg-light p-2 rounded">
                          <div className="text-muted small">Código</div>
                          <div className="fw-bold">
                            <code className="text-primary fs-6">{course.code}</code>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="bg-light p-2 rounded">
                          <div className="text-muted small">Nombre del Curso</div>
                          <div className="fw-bold">{course.name}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Sección Académica */}
                  <div className="mb-3 pb-3 border-bottom">
                    <h6 className="text-primary mb-2 fw-bold">Información Académica</h6>
                    <Row className="g-2">
                      <Col md={4}>
                        <div className="bg-light p-2 rounded">
                          <div className="text-muted small">Nivel Educacional</div>
                          <div>
                            <Badge bg="info" className="px-2 py-1">{getLevelName(course.levelId)}</Badge>
                          </div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="bg-light p-2 rounded">
                          <div className="text-muted small">Paralelo / Sección</div>
                          <div className="fw-bold fs-5 text-primary">{course.section || <span className="text-muted fs-6">Sin paralelo</span>}</div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="bg-light p-2 rounded">
                          <div className="text-muted small">Estado</div>
                          <div>
                            <Badge bg={course.active ? 'success' : 'secondary'} className="px-2 py-1">
                              {course.active ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Sección Institucional */}
                  <div>
                    <h6 className="text-primary mb-2 fw-bold">Información Institucional</h6>
                    <Row className="g-2">
                      <Col md={8}>
                        <div className="bg-light p-2 rounded">
                          <div className="text-muted small">Institución Educativa</div>
                          <div className="fw-bold">{course.institution}</div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="bg-light p-2 rounded">
                          <div className="text-muted small">Fecha de Creación</div>
                          <div className="fw-bold small">
                            {new Date(course.created_at).toLocaleDateString('es-CL', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Students List */}
          <Row>
            <Col>
              <MasterDataTable<StudentEnrollment>
                items={students}
                totalItems={totalStudents}
                totalPages={totalPages}
                currentPage={currentPage}
                pageSize={PAGE_SIZE}
                isLoading={isLoading}
                title="👥 Nómina de Estudiantes"
                description={`Gestiona la matrícula de estudiantes en este curso`}
                icon="👥"
                columns={columns}
                actions={actions}
                searchText={searchText}
                onSearchChange={setSearchText}
                onPageChange={setCurrentPage}
                onCreateClick={() => setShowEnrollModal(true)}
                createButtonLabel="Inscribir Estudiante"
                createButtonIcon="➕"
                emptyMessage="No hay estudiantes inscritos en este curso"
                emptyIcon="📭"
                emptyActionLabel="Inscribir Primer Estudiante"
              />
            </Col>
          </Row>
        </Container>

        {/* Enrollment Modal */}
        {course && (
          <EnrollStudentModal
            show={showEnrollModal}
            onHide={() => setShowEnrollModal(false)}
            courseId={courseId}
            courseName={course.name}
            enrolledStudents={students}
            onEnrollSuccess={handleEnrollSuccess}
          />
        )}
      </PageWrapper>
    </ProtectedRoute>
  );
}
