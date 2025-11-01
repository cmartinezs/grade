'use client'

import { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import CourseForm from '@/components/CourseForm';
import { courseStore } from '@/lib/courseStore';

interface CreateCourseModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export default function CreateCourseModal({ show, onHide, onSuccess }: CreateCourseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdCourseId, setCreatedCourseId] = useState('');

  const handleClose = () => {
    setSubmitSuccess(false);
    setCreatedCourseId('');
    onHide();
  };

  const handleSubmit = async (data: { name: string; code: string; level: string; institution: string; active: boolean }) => {
    setIsSubmitting(true);
    try {
      const newCourse = await courseStore.createCourse(
        data,
        'anonymous'
      );
      setSubmitSuccess(true);
      setCreatedCourseId(newCourse.course_id);

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
          <CourseForm
            mode="create"
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
