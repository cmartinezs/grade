'use client'

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { courseStore } from '@/lib/courseStore';
import { Course, CourseValidationError } from '@/types/course';

interface EditCourseModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  courseId: string | null;
}

// Common academic levels in Chile
const ACADEMIC_LEVELS = [
  '1° Básico', '2° Básico', '3° Básico', '4° Básico', '5° Básico', '6° Básico',
  '7° Básico', '8° Básico',
  '1° Medio', '2° Medio', '3° Medio', '4° Medio'
];

export default function EditCourseModal({ show, onHide, onSuccess, courseId }: EditCourseModalProps) {
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [level, setLevel] = useState('');
  const [institution, setInstitution] = useState('');
  const [active, setActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<CourseValidationError[]>([]);

  // Load course data when modal opens
  useEffect(() => {
    if (show && courseId) {
      const loadedCourse = courseStore.getCourse(courseId);
      if (loadedCourse) {
        setCourse(loadedCourse);
        setName(loadedCourse.name);
        setCode(loadedCourse.code);
        setLevel(loadedCourse.level);
        setInstitution(loadedCourse.institution);
        setActive(loadedCourse.active);
      }
    }
  }, [show, courseId]);

  const resetForm = () => {
    setCourse(null);
    setName('');
    setCode('');
    setLevel('');
    setInstitution('');
    setActive(true);
    setValidationErrors([]);
    setSubmitSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const getErrorsForField = (field: string): CourseValidationError[] => {
    return validationErrors.filter(e => e.field === field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseId) return;

    setValidationErrors([]);
    setIsSubmitting(true);

    try {
      await courseStore.updateCourse(
        courseId,
        {
          name: name.trim(),
          code: code.trim(),
          level: level.trim(),
          institution: institution.trim(),
          active
        },
        user?.email || 'anonymous'
      );

      setSubmitSuccess(true);

      // Auto-close after 2 seconds
      setTimeout(() => {
        onSuccess();
        onHide();
        resetForm();
      }, 2000);

    } catch (error) {
      if (error instanceof Error) {
        const message = error.message;
        
        // Parse validation errors
        if (message.startsWith('Validation errors:')) {
          const errorsText = message.replace('Validation errors: ', '');
          const errors = errorsText.split(', ').map(err => {
            const [field, msg] = err.split(': ');
            return { field, message: msg };
          });
          setValidationErrors(errors);
        } else {
          // General error
          setValidationErrors([{ field: 'general', message }]);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!course && show) {
    return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            No se pudo cargar el curso. Por favor, intenta nuevamente.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {submitSuccess ? '✅ Curso Actualizado' : '✏️ Editar Curso'}
        </Modal.Title>
      </Modal.Header>

      {submitSuccess ? (
        <Modal.Body>
          <Alert variant="success">
            <Alert.Heading>¡Curso actualizado exitosamente!</Alert.Heading>
            <p className="mb-0">
              El curso <strong>{name}</strong> ha sido actualizado correctamente.
            </p>
          </Alert>
        </Modal.Body>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="modal-body-scrollable">
            {/* General Error */}
            {getErrorsForField('general').length > 0 && (
              <Alert variant="danger">
                {getErrorsForField('general').map((err, idx) => (
                  <div key={idx}>{err.message}</div>
                ))}
              </Alert>
            )}

            {/* Course Name */}
            <Form.Group className="mb-3">
              <Form.Label>
                Nombre del Curso <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: 5° Básico A, 1° Medio B, 8° Básico C"
                disabled={isSubmitting}
                isInvalid={getErrorsForField('name').length > 0}
              />
              {getErrorsForField('name').map((err, idx) => (
                <Form.Control.Feedback key={idx} type="invalid">
                  {err.message}
                </Form.Control.Feedback>
              ))}
            </Form.Group>

            {/* Course Code */}
            <Form.Group className="mb-3">
              <Form.Label>
                Código del Curso <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Ej: 5B-A, 1M-B, 8B-C"
                disabled={isSubmitting}
                isInvalid={getErrorsForField('code').length > 0}
              />
              <Form.Text className="text-muted">
                El código debe ser único. Se convertirá automáticamente a mayúsculas.
              </Form.Text>
              {getErrorsForField('code').map((err, idx) => (
                <Form.Control.Feedback key={idx} type="invalid">
                  {err.message}
                </Form.Control.Feedback>
              ))}
            </Form.Group>

            {/* Academic Level */}
            <Form.Group className="mb-3">
              <Form.Label>
                Nivel Académico <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                disabled={isSubmitting}
                isInvalid={getErrorsForField('level').length > 0}
              >
                <option value="">Seleccione un nivel...</option>
                {ACADEMIC_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </Form.Select>
              {getErrorsForField('level').map((err, idx) => (
                <Form.Control.Feedback key={idx} type="invalid">
                  {err.message}
                </Form.Control.Feedback>
              ))}
            </Form.Group>

            {/* Institution */}
            <Form.Group className="mb-3">
              <Form.Label>
                Institución <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Ej: Colegio San José, Liceo A-1, etc."
                disabled={isSubmitting}
                isInvalid={getErrorsForField('institution').length > 0}
              />
              {getErrorsForField('institution').map((err, idx) => (
                <Form.Control.Feedback key={idx} type="invalid">
                  {err.message}
                </Form.Control.Feedback>
              ))}
            </Form.Group>

            {/* Active Status */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="edit-course-active"
                label="Curso activo"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                disabled={isSubmitting}
              />
              <Form.Text className="text-muted">
                Los cursos inactivos no estarán disponibles para nuevas evaluaciones.
              </Form.Text>
            </Form.Group>

            {/* Audit Info */}
            {course && (
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="mb-2">Información de Auditoría</h6>
                <div className="small text-muted">
                  <div><strong>Creado:</strong> {new Date(course.created_at).toLocaleString()} por {course.created_by}</div>
                  <div><strong>Última actualización:</strong> {new Date(course.updated_at).toLocaleString()} por {course.updated_by}</div>
                </div>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : '💾 Guardar Cambios'}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
}
