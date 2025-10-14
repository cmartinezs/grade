"use client";

import { useState } from 'react';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import { QuestionWithDetails } from '@/types/question';

interface RetireQuestionModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: (reason?: string) => void;
  question: QuestionWithDetails | null;
  isSubmitting?: boolean;
}

export default function RetireQuestionModal({
  show,
  onHide,
  onConfirm,
  question,
  isSubmitting = false,
}: RetireQuestionModalProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason || undefined);
    setReason('');
  };

  const handleCancel = () => {
    setReason('');
    onHide();
  };

  if (!question) return null;

  return (
    <Modal show={show} onHide={handleCancel} backdrop={isSubmitting ? 'static' : true}>
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>⚠️ Confirmar Retiro de Pregunta</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="warning">
          <Alert.Heading>¿Estás seguro de retirar esta pregunta?</Alert.Heading>
          <p>
            Esta acción marcará la pregunta como <strong>inactiva</strong> y dejará de aparecer 
            en las listas y búsquedas para componer nuevas evaluaciones.
          </p>
        </Alert>

        {/* Question details */}
        <div className="mb-3">
          <h6>Detalles de la pregunta:</h6>
          <div className="border rounded p-3 bg-light">
            <p className="mb-2">
              <strong>ID:</strong> {question.question_id} <span className="badge bg-info">v{question.version}</span>
            </p>
            <p className="mb-2">
              <strong>Tipo:</strong> {question.type}
            </p>
            <p className="mb-2">
              <strong>Enunciado:</strong> {question.enunciado.substring(0, 100)}
              {question.enunciado.length > 100 ? '...' : ''}
            </p>
            <p className="mb-0">
              <strong>Tema:</strong> {question.topic_name}
            </p>
          </div>
        </div>

        {/* Optional reason */}
        <Form.Group className="mb-3">
          <Form.Label>Motivo del retiro (opcional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ej: Contenido desactualizado, error en el enunciado, etc."
            disabled={isSubmitting}
          />
          <Form.Text className="text-muted">
            Este motivo quedará registrado en el historial
          </Form.Text>
        </Form.Group>

        <Alert variant="info" className="mb-0">
          <small>
            ℹ️ <strong>Nota:</strong> Las evaluaciones ya aplicadas no se verán afectadas. 
            Solo se impedirá usar esta pregunta en nuevas evaluaciones.
          </small>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
          ❌ Cancelar
        </Button>
        <Button 
          variant="warning" 
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Retirando...' : '⚠️ Retirar Pregunta'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
