"use client";

import { useState } from 'react';
import { Modal, Button, Alert, Form, Card, Badge } from 'react-bootstrap';
import { QuestionWithDetails } from '@/types/question';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';

interface RetireQuestionModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: (reason?: string) => Promise<void>;
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
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { questionTypes } = useQuestionTypes();
  const { difficulties } = useDifficulties();
  const { subjects, units, topics } = useCurriculumHierarchy();

  const handleConfirm = async () => {
    try {
      await onConfirm(reason || undefined);
      setSubmitSuccess(true);
      setReason('');
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onHide();
      }, 2000);
    } catch {
      // Error handling is done in parent
    }
  };

  const handleCancel = () => {
    setReason('');
    setSubmitSuccess(false);
    onHide();
  };

  if (!question) return null;

  // Get metadata
  const currentQuestionType = questionTypes.find(qt => qt.code === question.type);
  const typeMetadata = currentQuestionType ? {
    name: currentQuestionType.name,
    description: currentQuestionType.description
  } : { name: question.type, description: '' };

  const difficulty = difficulties.find(d => d.difficultyId === question.difficulty_fk);
  const difficultyName = difficulty?.level || 'N/A';

  // Get taxonomy path
  const topic = topics.find(t => t.topic_id === question.topic_fk);
  const unit = topic ? units.find(u => u.unit_id === topic.unit_fk) : null;
  const subject = unit ? subjects.find(s => s.subject_id === unit.subject_fk) : null;
  
  const taxonomyPath = (subject && unit && topic)
    ? `${subject.name} → ${unit.name} → ${topic.name}`
    : 'N/A';

  const getDifficultyBadgeVariant = (difficulty: string) => {
    const lower = difficulty.toLowerCase();
    if (lower.includes('fácil') || lower.includes('facil') || lower === 'bajo') return 'success';
    if (lower.includes('medio') || lower.includes('intermedio')) return 'warning';
    if (lower.includes('difícil') || lower.includes('dificil') || lower === 'alto') return 'danger';
    return 'secondary';
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'TF': return 'success';
      case 'SS': return 'primary';
      case 'SM': return 'danger';
      case 'D': return 'dark';
      case 'verdadero_falso': return 'success';
      case 'seleccion_unica': return 'primary';
      case 'seleccion_multiple': return 'danger';
      case 'desarrollo': return 'dark';
      default: return 'secondary';
    }
  };

  return (
    <Modal show={show} onHide={handleCancel} backdrop={isSubmitting ? 'static' : true} size="lg">
      <Modal.Header closeButton={!isSubmitting && !submitSuccess}>
        <Modal.Title>
          {submitSuccess ? '✅ Pregunta Retirada' : '⚠️ Confirmar Retiro de Pregunta'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {submitSuccess ? (
          <Alert variant="success">
            <Alert.Heading>¡Pregunta retirada exitosamente!</Alert.Heading>
            <p>
              La pregunta ID <strong>{question.question_id}</strong> ha sido marcada como inactiva.
            </p>
            <hr />
            <p className="mb-0">
              <small>
                Esta ventana se cerrará automáticamente en unos segundos...
              </small>
            </p>
          </Alert>
        ) : (
          <>
            <Alert variant="warning">
              <Alert.Heading>¿Estás seguro de retirar esta pregunta?</Alert.Heading>
              <p>
                Esta acción marcará la pregunta como <strong>inactiva</strong> y dejará de aparecer 
                en las listas y búsquedas para componer nuevas evaluaciones.
              </p>
            </Alert>

            {/* Question details - same format as ViewQuestionModal */}
            <Card className="mb-3">
              <Card.Header>
                <strong>📋 Detalle de la pregunta</strong>
                <Badge bg="secondary" className="ms-2">ID: {question.question_id}</Badge>
                <Badge bg="info" className="ms-2">v{question.version}</Badge>
              </Card.Header>
              <Card.Body>
                {/* Question text */}
                <div className="mb-3">
                  <strong>Enunciado:</strong>
                  <div className="mt-2 p-3 bg-light border rounded">
                    {question.enunciado}
                  </div>
                </div>

                {/* Metadata */}
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>Tipo:</strong>
                    <Badge 
                      bg={getTypeBadgeVariant(question.type)} 
                      className="ms-2"
                      style={{ fontSize: '0.9rem', padding: '0.4em 0.8em' }}
                    >
                      {typeMetadata.name}
                    </Badge>
                  </div>
                  <div className="col-md-6">
                    <strong>Dificultad:</strong>
                    <Badge 
                      bg={getDifficultyBadgeVariant(difficultyName)} 
                      className="ms-2"
                      style={{ fontSize: '0.9rem', padding: '0.4em 0.8em' }}
                    >
                      {difficultyName}
                    </Badge>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-12">
                    <strong>Taxonomía:</strong>
                    <div className="text-muted">
                      {taxonomyPath}
                    </div>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-12">
                    <strong>Opciones:</strong> {question.options.length} alternativas
                  </div>
                </div>
              </Card.Body>
            </Card>

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
          </>
        )}
      </Modal.Body>

      {!submitSuccess && (
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
      )}
    </Modal>
  );
}
