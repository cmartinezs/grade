'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Tabs, Tab, ListGroup, Badge, InputGroup } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { studentStore } from '@/lib/studentStore';
import { createStudentInDataConnect, enrollStudentInCourseInDataConnect, fetchStudentsFromDataConnect } from '@/lib/studentDataConnect';
import { Student, CreateStudentInput, StudentEnrollment } from '@/types/student';

interface EnrollStudentModalProps {
  show: boolean;
  onHide: () => void;
  courseId: string;
  courseName: string;
  enrolledStudents: StudentEnrollment[];
  onEnrollSuccess: (enrollment: StudentEnrollment) => void;
}

export default function EnrollStudentModal({
  show,
  onHide,
  courseId,
  courseName,
  enrolledStudents,
  onEnrollSuccess,
}: EnrollStudentModalProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'existing' | 'new'>('existing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  // Existing student selection
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  
  // New student form
  const [newStudent, setNewStudent] = useState<CreateStudentInput>({
    firstName: '',
    lastName: '',
    identifier: '',
  });

  // Load all students when modal opens
  useEffect(() => {
    if (show && user?.id && user?.firebaseUid) {
      loadStudents();
    }
    // Reset form when modal closes
    if (!show) {
      resetForm();
    }
  }, [show, user?.id, user?.firebaseUid]);

  const loadStudents = async () => {
    if (!user?.id || !user?.firebaseUid) return;

    try {
      // Try to get from cache first
      let students = studentStore.getAllStudents();
      
      // If cache is empty, load from Data-Connect
      if (students.length === 0) {
        students = await fetchStudentsFromDataConnect(user.id, user.firebaseUid);
        students.forEach(s => studentStore.setStudent(s));
      }

      setAllStudents(students);
    } catch (err) {
      console.error('Error loading students:', err);
      setError('Error al cargar estudiantes');
    }
  };

  const resetForm = () => {
    setActiveTab('existing');
    setSelectedStudentId('');
    setSearchQuery('');
    setNewStudent({ firstName: '', lastName: '', identifier: '' });
    setError('');
    setSuccess('');
  };

  const handleEnrollExisting = async () => {
    if (!selectedStudentId) {
      setError('Debes seleccionar un estudiante');
      return;
    }

    if (!user?.id || !user?.firebaseUid) {
      setError('Usuario no autenticado');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Enroll student in course
      const result = await enrollStudentInCourseInDataConnect(
        courseId,
        selectedStudentId,
        user.id,
        user.firebaseUid
      );

      // Get student data
      const student = studentStore.getStudent(selectedStudentId);
      if (!student) {
        throw new Error('Estudiante no encontrado');
      }

      // Create enrollment object
      const enrollment: StudentEnrollment = {
        ...student,
        enrollmentId: result.courseStudentId,
        enrolledOn: new Date(),
      };

      // Update cache
      studentStore.addEnrollmentToCourse(courseId, enrollment);

      // Notify parent
      onEnrollSuccess(enrollment);

      setSuccess(`Estudiante ${student.firstName} ${student.lastName} inscrito exitosamente`);
      
      // Close modal after brief delay
      setTimeout(() => {
        onHide();
      }, 1500);
    } catch (err) {
      console.error('Error enrolling student:', err);
      setError(err instanceof Error ? err.message : 'Error al inscribir estudiante');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAndEnroll = async () => {
    // Validate form
    if (!newStudent.firstName.trim()) {
      setError('El nombre es requerido');
      return;
    }
    if (!newStudent.lastName.trim()) {
      setError('El apellido es requerido');
      return;
    }
    if (!newStudent.identifier.trim()) {
      setError('El RUT/ID es requerido');
      return;
    }

    if (!user?.id || !user?.firebaseUid) {
      setError('Usuario no autenticado');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Create new student
      const createdStudent = await createStudentInDataConnect(
        newStudent,
        user.id,
        user.firebaseUid
      );

      // Add to cache
      studentStore.setStudent(createdStudent);

      // Enroll in course
      const result = await enrollStudentInCourseInDataConnect(
        courseId,
        createdStudent.studentId,
        user.id,
        user.firebaseUid
      );

      // Create enrollment object
      const enrollment: StudentEnrollment = {
        ...createdStudent,
        enrollmentId: result.courseStudentId,
        enrolledOn: new Date(),
      };

      // Update cache
      studentStore.addEnrollmentToCourse(courseId, enrollment);

      // Notify parent
      onEnrollSuccess(enrollment);

      setSuccess(`Estudiante ${createdStudent.firstName} ${createdStudent.lastName} creado e inscrito exitosamente`);
      
      // Close modal after brief delay
      setTimeout(() => {
        onHide();
      }, 1500);
    } catch (err) {
      console.error('Error creating and enrolling student:', err);
      setError(err instanceof Error ? err.message : 'Error al crear e inscribir estudiante');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'existing') {
      handleEnrollExisting();
    } else {
      handleCreateAndEnroll();
    }
  };

  // Filter students
  const filteredStudents = allStudents.filter(student => {
    // Exclude already enrolled students
    if (enrolledStudents.some(e => e.studentId === student.studentId)) {
      return false;
    }

    // Apply search filter
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      student.firstName.toLowerCase().includes(query) ||
      student.lastName.toLowerCase().includes(query) ||
      student.identifier.toLowerCase().includes(query)
    );
  });

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          ➕ Inscribir Estudiante en {courseName}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" onClose={() => setSuccess('')} dismissible>
              {success}
            </Alert>
          )}

          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k as 'existing' | 'new')}
            className="mb-3"
          >
            <Tab eventKey="existing" title="📋 Estudiante Existente">
              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>🔍</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nombre, apellido o RUT/ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </div>

              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {filteredStudents.length === 0 ? (
                  <Alert variant="info" className="text-center">
                    {allStudents.length === 0
                      ? 'No hay estudiantes disponibles. Crea uno nuevo en la pestaña "Nuevo Estudiante".'
                      : 'No se encontraron estudiantes disponibles con ese criterio de búsqueda.'}
                  </Alert>
                ) : (
                  <ListGroup>
                    {filteredStudents.map((student) => (
                      <ListGroup.Item
                        key={student.studentId}
                        active={selectedStudentId === student.studentId}
                        action
                        onClick={() => setSelectedStudentId(student.studentId)}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{student.firstName} {student.lastName}</strong>
                          <br />
                          <small className="text-muted">
                            <code>{student.identifier}</code>
                          </small>
                        </div>
                        {selectedStudentId === student.studentId && (
                          <Badge bg="primary">✓ Seleccionado</Badge>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </div>
            </Tab>

            <Tab eventKey="new" title="➕ Nuevo Estudiante">
              <Form.Group className="mb-3">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre"
                  value={newStudent.firstName}
                  onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el apellido"
                  value={newStudent.lastName}
                  onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>RUT/ID *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el RUT o identificador único"
                  value={newStudent.identifier}
                  onChange={(e) => setNewStudent({ ...newStudent, identifier: e.target.value })}
                  required
                />
                <Form.Text className="text-muted">
                  Debe ser único en el sistema
                </Form.Text>
              </Form.Group>

              <Alert variant="info" className="mb-0">
                <small>
                  <strong>Nota:</strong> El estudiante será creado e inmediatamente inscrito en este curso.
                </small>
              </Alert>
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={
              isSubmitting ||
              (activeTab === 'existing' && !selectedStudentId) ||
              (activeTab === 'new' && (!newStudent.firstName || !newStudent.lastName || !newStudent.identifier))
            }
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Inscribiendo...
              </>
            ) : (
              <>
                ➕ {activeTab === 'existing' ? 'Inscribir Estudiante' : 'Crear e Inscribir'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
