'use client'

import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { QuestionWithDetails } from '@/types/question';

interface ReactivateQuestionModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: (reason?: string) => void;
  question: QuestionWithDetails | null;
  isSubmitting: boolean;
}

export default function ReactivateQuestionModal({
  show,
  onHide,
  onConfirm,
  question,
  isSubmitting
}: ReactivateQuestionModalProps) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(reason.trim() || undefined);
  };

  const handleClose = () => {
    setReason('');
    onHide();
  };

  if (!question) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>✅ Reactivar Pregunta</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Alert variant="success">
            <Alert.Heading className="h6">
              <i className="bi bi-check-circle-fill me-2"></i>
              Confirmación de Reactivación
            </Alert.Heading>
            <p className="mb-0 small">
              Esta acción reactivará la pregunta y volverá a estar disponible para búsquedas y selección en evaluaciones.
            </p>
          </Alert>

          <div className="mb-3 p-3 bg-light rounded">
            <h6 className="text-primary mb-2">Información de la Pregunta</h6>
            <div className="small">
              <div className="mb-1">
                <strong>ID:</strong> <code>{question.question_id}</code>
              </div>
              <div className="mb-1">
                <strong>Versión:</strong> {question.version}
              </div>
              <div className="mb-1">
                <strong>Tipo:</strong> {question.type === 'verdadero_falso' ? 'Verdadero/Falso' : 
                                        question.type === 'seleccion_unica' ? 'Selección Única' :
                                        question.type === 'seleccion_multiple' ? 'Selección Múltiple' : 'Desarrollo'}
              </div>
              <div className="mb-1">
                <strong>Enunciado:</strong> {question.enunciado.substring(0, 100)}
                {question.enunciado.length > 100 ? '...' : ''}
              </div>
            </div>
          </div>

          <Alert variant="info" className="small">
            <i className="bi bi-info-circle-fill me-2"></i>
            La pregunta volverá a su estado activo y podrá ser utilizada nuevamente en evaluaciones.
            Esta acción quedará registrada en el historial.
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label>
              Motivo de Reactivación <span className="text-muted">(opcional)</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ej: Error en el retiro previo, contenido actualizado y validado, etc."
              disabled={isSubmitting}
            />
            <Form.Text className="text-muted">
              Puede proporcionar un motivo para justificar la reactivación (recomendado para trazabilidad).
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            variant="success" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Reactivando...
              </>
            ) : (
              '✅ Confirmar Reactivación'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
