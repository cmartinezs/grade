'use client'

import { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import CourseForm from '@/components/CourseForm';
import { courseStore } from '@/lib/courseStore';

interface EditCourseModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  courseId: string | null;
}

export default function EditCourseModal({ show, onHide, onSuccess, courseId }: EditCourseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleClose = () => {
    setSubmitSuccess(false);
    onHide();
  };

  const handleSubmit = async (data: { name: string; code: string; levelId: string; institution: string; active: boolean }) => {
    if (!courseId) return;

    setIsSubmitting(true);
    try {
      await courseStore.updateCourse(
        courseId,
        data,
        'anonymous'
      );
      setSubmitSuccess(true);

      // Auto-close after 2 seconds
      setTimeout(() => {
        onSuccess();
        onHide();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop={isSubmitting ? 'static' : true}>
      <Modal.Header closeButton={!isSubmitting && !submitSuccess}>
        <Modal.Title>
          {submitSuccess ? '✅ Curso Actualizado' : '✏️ Editar Curso'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {submitSuccess ? (
          <Alert variant="success">
            <Alert.Heading>¡Curso actualizado exitosamente!</Alert.Heading>
            <p>ID del curso: <strong>{courseId}</strong></p>
            <hr />
            <p className="mb-0">
              <small>Los cambios han sido guardados exitosamente.</small>
            </p>
          </Alert>
        ) : (
          <CourseForm
            mode="edit"
            courseId={courseId || undefined}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onSubmitSuccess={() => {
              // Success is handled by handleSubmit
            }}
          />
        )}
      </Modal.Body>

      {!submitSuccess && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
