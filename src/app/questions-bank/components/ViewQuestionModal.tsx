"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Badge, Card, ListGroup, Alert } from 'react-bootstrap';
import { QuestionWithDetails, QuestionOption, QuestionType, DifficultyLevel } from '@/types/question';
import { fetchQuestionById, mapQuestionTypeIdToCode } from '@/lib/questionConnect';
import { useAuth } from '@/contexts/AuthContext';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { getUserByEmail, getUserById } from '@/dataconnect-generated';

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
  const { difficulties } = useDifficulties();
  const { subjects, units, topics } = useCurriculumHierarchy();
  const [question, setQuestion] = useState<QuestionWithDetails | null>(null);
  const [versionHistory, setVersionHistory] = useState<QuestionWithDetails[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [authorEmail, setAuthorEmail] = useState<string>('');
  const [difficultyName, setDifficultyName] = useState<string>('');
  const [taxonomyPath, setTaxonomyPath] = useState<string>('');
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
        
        // Cargar metadatos adicionales
        // Obtener nombre de dificultad
        const difficulty = difficulties.find(d => d.difficultyId === questionData.difficulty_fk);
        setDifficultyName(difficulty?.level || 'N/A');

        // Obtener ruta de taxonomía (asignatura → unidad → tema)
        const topic = topics.find(t => t.topic_id === questionData.topic_fk);
        const unit = topic ? units.find(u => u.unit_id === topic.unit_fk) : null;
        const subject = unit ? subjects.find(s => s.subject_id === unit.subject_fk) : null;
        
        if (subject && unit && topic) {
          setTaxonomyPath(`${subject.name} → ${unit.name} → ${topic.name}`);
        } else {
          setTaxonomyPath('N/A');
        }

        // Obtener email del autor (puede ser diferente al usuario actual)
        try {
          const authorResult = await getUserById({ userId: questionData.author_fk });
          const authorData = authorResult.data?.users?.[0];
          if (authorData?.name && authorData?.email) {
            setAuthorEmail(`${authorData.name} (${authorData.email})`);
          } else if (authorData?.email) {
            setAuthorEmail(authorData.email);
          } else {
            setAuthorEmail('Usuario desconocido');
          }
        } catch (authorError) {
          console.warn('No se pudo obtener información del autor:', authorError);
          setAuthorEmail('Usuario desconocido');
        }
        
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
  }, [show, questionId, user?.firebaseUid, user?.email, questionTypes, difficulties, subjects, units, topics]);

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

  const getDifficultyBadgeVariant = (difficultyCode: string) => {
    // Usar códigos del sistema: EASY, MEDIUM, HARD
    const upper = difficultyCode.toUpperCase();
    if (upper === 'EASY') return 'success';
    if (upper === 'MEDIUM') return 'warning';
    if (upper === 'HARD') return 'danger';
    // Fallback para nombres en español
    const lower = difficultyCode.toLowerCase();
    if (lower.includes('fácil') || lower.includes('facil')) return 'success';
    if (lower.includes('medio') || lower.includes('intermedio')) return 'warning';
    if (lower.includes('difícil') || lower.includes('dificil')) return 'danger';
    return 'secondary';
  };

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
              <div className="col-md-6">
                <strong>Autor:</strong> {authorEmail}
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

        {/* Options */}
        {question.options.length > 0 && (
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
            disabled
            title="Edición temporalmente deshabilitada"
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
