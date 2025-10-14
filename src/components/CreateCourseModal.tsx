'use client'

import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { courseStore } from '@/lib/courseStore';
import { CourseValidationError } from '@/types/course';

interface CreateCourseModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

// Common academic levels in Chile
const ACADEMIC_LEVELS = [
  '1° Básico', '2° Básico', '3° Básico', '4° Básico', '5° Básico', '6° Básico',
  '7° Básico', '8° Básico',
  '1° Medio', '2° Medio', '3° Medio', '4° Medio'
];

export default function CreateCourseModal({ show, onHide, onSuccess }: CreateCourseModalProps) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [level, setLevel] = useState('');
  const [institution, setInstitution] = useState('');
  const [active, setActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdCourseId, setCreatedCourseId] = useState('');
  const [validationErrors, setValidationErrors] = useState<CourseValidationError[]>([]);

  const resetForm = () => {
    setName('');
    setCode('');
    setLevel('');
    setInstitution('');
    setActive(true);
    setValidationErrors([]);
    setSubmitSuccess(false);
    setCreatedCourseId('');
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
    
    setValidationErrors([]);
    setIsSubmitting(true);

    try {
      const newCourse = await courseStore.createCourse(
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
      setCreatedCourseId(newCourse.course_id);

      // Auto-close after 2 seconds
      setTimeout(() => {
        onSuccess();
        onHide();
        resetForm();
      }, 2000);

    } catch (error) {
      if (error instanceof Error) {
        const errorMsg = error.message;
        if (errorMsg.startsWith('Validation errors:')) {
          const errors: CourseValidationError[] = [];
          const parts = errorMsg.split('Validation errors:')[1].split(',');
          parts.forEach(part => {
            const [field, message] = part.trim().split(':');
            if (field && message) {
              errors.push({ field: field.trim(), message: message.trim() });
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

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop={isSubmitting ? 'static' : true}>
      <Modal.Header closeButton={!isSubmitting && !submitSuccess}>
        <Modal.Title>
          {submitSuccess ? '✅ Curso Creado' : '➕ Crear Nuevo Curso'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {submitSuccess ? (
          <Alert variant="success">
            <Alert.Heading>¡Curso creado exitosamente!</Alert.Heading>
            <p>ID del curso: <strong>{createdCourseId}</strong></p>
            <hr />
            <p className="mb-0">
              <small>El curso ya está disponible en el catálogo.</small>
            </p>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            {/* General errors */}
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
                id="course-active"
                label="Curso activo"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                disabled={isSubmitting}
              />
              <Form.Text className="text-muted">
                Por defecto, los cursos nuevos se crean en estado activo.
              </Form.Text>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>

      {!submitSuccess && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creando...
              </>
            ) : (
              '➕ Crear Curso'
            )}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
