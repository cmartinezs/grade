"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Badge, Card, ListGroup, Alert } from 'react-bootstrap';
import { QuestionWithDetails, QuestionOption, QuestionType, DifficultyLevel } from '@/types/question';
import { fetchQuestionById, mapQuestionTypeIdToCode } from '@/lib/questionConnect';
import { useAuth } from '@/contexts/AuthContext';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { getUserByEmail } from '@/dataconnect-generated';

interface ViewQuestionModalProps {
  show: boolean;
  onHide: () => void;
  questionId: string | null;
  onCreateVersion?: (questionId: string) => void;
  onEdit?: (questionId: string) => void;
}

export default function ViewQuestionModal({
  show,
  onHide,
  questionId,
  onCreateVersion,
  onEdit,
}: ViewQuestionModalProps) {
  const { user } = useAuth();
  const { questionTypes } = useQuestionTypes();
  const [question, setQuestion] = useState<QuestionWithDetails | null>(null);
  const [versionHistory, setVersionHistory] = useState<QuestionWithDetails[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestion = async () => {
      if (!show || !questionId || !user?.firebaseUid || !user?.email) {
        setQuestion(null);
        setVersionHistory([]);
        setShowHistory(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Obtener userId desde Data Connect
        const userResult = await getUserByEmail({ email: user.email });
        const userData = userResult.data?.users?.[0];
        
        if (!userData?.userId) {
          throw new Error('Usuario no encontrado en Data Connect');
        }

        // Cargar pregunta desde Data Connect
        const dcQuestion = await fetchQuestionById(questionId, userData.userId, user.firebaseUid);
        
        if (!dcQuestion) {
          throw new Error('Pregunta no encontrada');
        }

        // Transformar a formato local
        const questionData: QuestionWithDetails = {
          question_id: dcQuestion.questionId,
          type: mapQuestionTypeIdToCode(dcQuestion.questionTypeId, questionTypes) as QuestionType,
          enunciado: dcQuestion.text,
          version: dcQuestion.version,
          active: dcQuestion.active,
          original_version_fk: dcQuestion.originalQuestionId || null,
          topic_fk: dcQuestion.topicId,
          difficulty_fk: dcQuestion.difficultyId as DifficultyLevel,
          learning_outcome_fk: dcQuestion.taxonomyId,
          author_fk: dcQuestion.userId,
          created_at: new Date(),
          updated_at: new Date(),
          updated_by: dcQuestion.userId,
          deleted_at: null,
          deleted_by: null,
          options: (dcQuestion.options || []).map(opt => ({
            question_option_id: opt.questionOptionId,
            question_fk: opt.questionId,
            text: opt.text,
            is_correct: opt.isCorrect,
            position: opt.position,
            partial_score: opt.score,
            created_at: new Date(),
            created_by: dcQuestion.userId,
            updated_at: new Date(),
            updated_by: dcQuestion.userId,
          })),
        };

        setQuestion(questionData);
        
        // TODO: Implementar carga de historial de versiones desde Data Connect
        setVersionHistory([questionData]);
      } catch (err) {
        console.error('Error loading question:', err);
        setError(err instanceof Error ? err.message : 'Error cargando pregunta');
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [show, questionId, user?.firebaseUid, user?.email, questionTypes]);

  if (loading) {
    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Body className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">{error}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  if (!question) {
    return null;
  }

  const currentQuestionType = questionTypes.find(qt => qt.code === question.type);
  const typeMetadata = currentQuestionType ? {
    name: currentQuestionType.name,
    description: currentQuestionType.description
  } : { name: question.type, description: '' };
  const hasMultipleVersions = versionHistory.length > 1;
  const isLatestVersion = versionHistory.length > 0 && versionHistory[0].question_id === question.question_id;

  const getOptionIcon = (option: QuestionOption) => {
    return option.is_correct ? '✅' : '❌';
  };

  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'bajo': return 'success';
      case 'medio': return 'warning';
      case 'alto': return 'danger';
      default: return 'secondary';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'verdadero_falso': return 'info';
      case 'seleccion_unica': return 'primary';
      case 'seleccion_multiple': return 'warning';
      case 'desarrollo': return 'secondary';
      default: return 'light';
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          📋 Detalle de Pregunta
          <Badge bg="secondary" className="ms-2">ID: {question.question_id}</Badge>
          <Badge bg="info" className="ms-2">v{question.version}</Badge>
          {!isLatestVersion && (
            <Badge bg="warning" className="ms-2">⚠️ Versión Antigua</Badge>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Version warning */}
        {!isLatestVersion && (
          <Alert variant="warning" className="d-flex justify-content-between align-items-center">
            <div>
              <strong>⚠️ Atención:</strong> Esta no es la versión más reciente de la pregunta.
              <br />
              <small>Existe una versión v{versionHistory[0].version} más actualizada.</small>
            </div>
            <Button
              variant="warning"
              size="sm"
              onClick={() => {
                setQuestion(versionHistory[0]);
              }}
            >
              📄 Ver Última Versión
            </Button>
          </Alert>
        )}

        {/* Question metadata */}
        <Card className="mb-3">
          <Card.Header>
            <strong>Metadatos</strong>
          </Card.Header>
          <Card.Body>
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>Tipo:</strong>
                <Badge bg={getTypeBadgeVariant(question.type)} className="ms-2">
                  {typeMetadata.name}
                </Badge>
              </div>
              <div className="col-md-6">
                <strong>Dificultad:</strong>
                <Badge bg={getDifficultyBadgeVariant(question.difficulty_fk)} className="ms-2">
                  {question.difficulty_fk.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-12">
                <strong>Taxonomía:</strong>
                <div className="text-muted">
                  {question.subject_name} → {question.unit_name} → {question.topic_name}
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <strong>Autor:</strong> {question.author_fk}
              </div>
              <div className="col-md-6">
                <strong>Creada:</strong> {new Date(question.created_at).toLocaleDateString()}
              </div>
            </div>

            {question.updated_at.getTime() !== question.created_at.getTime() && (
              <div className="row">
                <div className="col-md-12">
                  <strong>Última actualización:</strong> {new Date(question.updated_at).toLocaleDateString()} por {question.updated_by}
                </div>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Question content */}
        <Card className="mb-3">
          <Card.Header>
            <strong>Enunciado</strong>
          </Card.Header>
          <Card.Body>
            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
              {question.enunciado}
            </p>
          </Card.Body>
        </Card>

        {/* Options (if not desarrollo) */}
        {question.type !== 'desarrollo' && question.options.length > 0 && (
          <Card className="mb-3">
            <Card.Header>
              <strong>Alternativas</strong>
            </Card.Header>
            <ListGroup variant="flush">
              {question.options.map((option, index) => (
                <ListGroup.Item key={option.question_option_id}>
                  <div className="d-flex align-items-start">
                    <span className="me-2">{getOptionIcon(option)}</span>
                    <div className="flex-grow-1">
                      <strong>{index + 1}.</strong> {option.text}
                      {option.partial_score !== null && (
                        <Badge bg="secondary" className="ms-2">
                          {option.partial_score}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}

        {/* Version history */}
        {hasMultipleVersions && (
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>📚 Historial de Versiones ({versionHistory.length})</strong>
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? '▲ Ocultar' : '▼ Mostrar'}
              </Button>
            </Card.Header>
            {showHistory && (
              <ListGroup variant="flush">
                {versionHistory.map((version) => (
                  <ListGroup.Item
                    key={version.question_id}
                    active={version.question_id === question.question_id}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Badge bg="info" className="me-2">v{version.version}</Badge>
                        <small className="text-muted">
                          {new Date(version.created_at).toLocaleDateString()} por {version.author_fk}
                        </small>
                        {version.question_id === versionHistory[0].question_id && (
                          <Badge bg="success" className="ms-2">Actual</Badge>
                        )}
                      </div>
                      {version.question_id !== question.question_id && (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => setQuestion(version)}
                        >
                          👁️ Ver
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          ❌ Cerrar
        </Button>
        {/* Only show Edit and Create Version buttons for the latest version */}
        {isLatestVersion && onEdit && (
          <Button
            variant="warning"
            onClick={() => {
              onEdit(question.question_id);
              onHide();
            }}
          >
            ✏️ Editar
          </Button>
        )}
        {isLatestVersion && onCreateVersion && (
          <Button
            variant="success"
            onClick={() => {
              onCreateVersion(question.question_id);
              onHide();
            }}
          >
            🔄 Crear Nueva Versión
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
