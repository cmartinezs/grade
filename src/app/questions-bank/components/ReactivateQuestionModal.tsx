'use client'

import { useState } from 'react';
import { Modal, Button, Form, Alert, Card, Badge } from 'react-bootstrap';
import { QuestionWithDetails } from '@/types/question';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { getDifficultyColorRgb, getDifficultyEmoji } from '@/lib/difficultyUtils';

interface ReactivateQuestionModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: (reason?: string) => Promise<void>;
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
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { questionTypes } = useQuestionTypes();
  const { difficulties } = useDifficulties();
  const { subjects, units, topics } = useCurriculumHierarchy();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onConfirm(reason.trim() || undefined);
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

  const handleClose = () => {
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

  const getDifficultyBadgeStyle = (weight: number | undefined) => ({
    backgroundColor: getDifficultyColorRgb(weight),
    color: (weight ?? 0) > 0.6 ? 'white' : 'black',
    fontSize: '0.9rem',
    padding: '0.4em 0.8em'
  });

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'TF': return 'secondary';  // Verdadero/Falso - Gris
      case 'SS': return 'primary';    // Selección Simple - Azul
      case 'MC2':                     // Selección Múltiple 2
      case 'MC3':                     // Selección Múltiple 3
      case 'MC4':                     // Selección Múltiple 4
      case 'MC5': return 'info';      // Selección Múltiple 5 - Violeta/Info
      default: return 'secondary';
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop={isSubmitting ? 'static' : true}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!isSubmitting && !submitSuccess}>
          <Modal.Title>
            {submitSuccess ? '✅ Pregunta Reactivada' : '✅ Reactivar Pregunta'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {submitSuccess ? (
            <Alert variant="success">
              <Alert.Heading>¡Pregunta reactivada exitosamente!</Alert.Heading>
              <p>
                La pregunta ID <strong>{question.question_id}</strong> ha sido reactivada y ya está disponible para su uso.
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
              <Alert variant="success">
                <Alert.Heading>Confirmación de Reactivación</Alert.Heading>
                <p>
                  Esta acción reactivará la pregunta y volverá a estar disponible para búsquedas y selección en evaluaciones.
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
                        className="ms-2"
                        style={getDifficultyBadgeStyle(difficulty?.weight)}
                      >
                        {getDifficultyEmoji(difficulty?.weight)} {difficultyName}
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

              <Alert variant="info" className="mb-3">
                <small>
                  ℹ️ La pregunta volverá a su estado activo y podrá ser utilizada nuevamente en evaluaciones.
                  Esta acción quedará registrada en el historial.
                </small>
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
            </>
          )}
        </Modal.Body>

        {!submitSuccess && (
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              ❌ Cancelar
            </Button>
            <Button 
              variant="success" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Reactivando...' : '✅ Confirmar Reactivación'}
            </Button>
          </Modal.Footer>
        )}
      </Form>
    </Modal>
  );
}
