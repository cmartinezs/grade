"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Card, Button, Badge, Form, Dropdown, ButtonGroup, Alert } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateQuestionModal from './components/CreateQuestionModal';
import ViewQuestionModal from './components/ViewQuestionModal';
import EditQuestionModal from './components/EditQuestionModal';
import CloneQuestionModal from './components/CloneQuestionModal';
import RetireQuestionModal from './components/RetireQuestionModal';
import ReactivateQuestionModal from './components/ReactivateQuestionModal';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import { questionStore } from '@/lib/questionStore';
import { deactivateExistingQuestion, reactivateExistingQuestion } from '@/lib/questionConnect';
import { getUserByEmail } from '@/dataconnect-generated';
import type { QuestionType, DifficultyLevel, QuestionWithDetails } from '@/types/question';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { useQuestions } from '@/hooks/useQuestions';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useAuth } from '@/contexts/AuthContext';

export default function QuestionsBankPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [showRetireModal, setShowRetireModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionWithDetails | null>(null);
  const [editMode, setEditMode] = useState<'edit' | 'version'>('version');
  const [isRetiring, setIsRetiring] = useState(false);
  const [isReactivating, setIsReactivating] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<QuestionType | ''>('');
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | ''>('');
  const [filterSubject, setFilterSubject] = useState('');
  const [showInactive, setShowInactive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load subjects from Data Connect
  const { subjects: allSubjects } = useCurriculumHierarchy();
  const subjects = allSubjects.filter((s) => s.active && !s.deleted_at);

  // Load difficulties from Data Connect
  const { difficulties } = useDifficulties();
  
  // Load question types from Data Connect
  const { questionTypes } = useQuestionTypes();

  // Load questions with current filters from Data Connect (with fallback to local store)
  const { questions, refetch } = useQuestions({
    searchText,
    type: filterType,
    difficulty_fk: filterDifficulty,
    subject_fk: filterSubject,
    includeInactive: showInactive,
  });

  const loadQuestions = () => {
    refetch();
  };

  const handleCreateSuccess = () => {
    loadQuestions();
  };

  const handleViewQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setShowViewModal(true);
  };

  const handleCreateVersion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setEditMode('version');
    setShowEditModal(true);
  };

  const handleEditQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setEditMode('edit');
    setShowEditModal(true);
  };

  const handleCloneQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setShowCloneModal(true);
  };

  const handleVersionSuccess = () => {
    loadQuestions();
  };

  const handleCloneSuccess = () => {
    loadQuestions();
  };

  const handleRetireQuestion = (questionId: string) => {
    const question = questions.find(q => q.question_id === questionId);
    setSelectedQuestionId(questionId);
    setSelectedQuestion(question || null);
    setShowRetireModal(true);
  };

  const handleConfirmRetire = async (reason?: string): Promise<void> => {
    if (!selectedQuestionId || !user?.firebaseUid || !user?.email) {
      setError('Usuario no autenticado');
      return;
    }

    setIsRetiring(true);
    setError(null);
    try {
      // Obtener userId desde Data Connect
      const userResult = await getUserByEmail({ email: user.email });
      const userData = userResult.data?.users?.[0];
      
      if (!userData?.userId) {
        throw new Error('Usuario no encontrado en Data Connect');
      }

      // Desactivar pregunta en DataConnect
      await deactivateExistingQuestion(
        selectedQuestionId,
        userData.userId,
        user.firebaseUid
      );
      
      loadQuestions();
      setSuccessMessage('✅ Pregunta retirada exitosamente');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error al retirar pregunta: ${error.message}`);
      } else {
        setError('Error desconocido al retirar pregunta');
      }
      throw error;
    } finally {
      setIsRetiring(false);
    }
  };

  const handleReactivateQuestion = (questionId: string) => {
    const question = questions.find(q => q.question_id === questionId);
    setSelectedQuestionId(questionId);
    setSelectedQuestion(question || null);
    setShowReactivateModal(true);
  };

  const handleConfirmReactivate = async (reason?: string): Promise<void> => {
    if (!selectedQuestionId || !user?.firebaseUid || !user?.email) {
      setError('Usuario no autenticado');
      return;
    }

    setIsReactivating(true);
    setError(null);
    try {
      // Obtener userId desde Data Connect
      const userResult = await getUserByEmail({ email: user.email });
      const userData = userResult.data?.users?.[0];
      
      if (!userData?.userId) {
        throw new Error('Usuario no encontrado en Data Connect');
      }

      // Reactivar pregunta en DataConnect
      await reactivateExistingQuestion(
        selectedQuestionId,
        userData.userId,
        user.firebaseUid
      );
      
      loadQuestions();
      setSuccessMessage('✅ Pregunta reactivada exitosamente');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error al reactivar pregunta: ${error.message}`);
      } else {
        setError('Error desconocido al reactivar pregunta');
      }
      throw error;
    } finally {
      setIsReactivating(false);
    }
  };

  const getTypeColor = (type: QuestionType) => {
    const colors: Record<QuestionType, string> = {
      // Nuevos códigos
      TF: 'secondary',
      SS: 'primary',
      SM: 'info',
      D: 'warning',
      // Códigos legacy
      verdadero_falso: 'secondary',
      seleccion_unica: 'primary',
      seleccion_multiple: 'info',
      desarrollo: 'warning',
    };
    return colors[type] || 'secondary';
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    const colors: Record<DifficultyLevel, string> = {
      bajo: 'success',
      medio: 'warning',
      alto: 'danger',
    };
    return colors[difficulty];
  };

  return (
    <ProtectedRoute>
      <div className="p-4">
        <div className="mb-4">
          <h2 className="mb-3">Banco de Preguntas</h2>
          <p className="text-muted">
            Gestiona todas tus preguntas desde aquí
            <Badge bg="secondary" className="ms-2">{questions.length} preguntas</Badge>
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)} className="mb-3">
            {successMessage}
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-3">
            <strong>Error:</strong> {error}
          </Alert>
        )}

        <Row>
          {/* Sidebar de Filtros - Izquierda */}
          <Col lg={3} className="mb-4">
            <Card className="sticky-top">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">🔍 Filtros</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Buscar</Form.Label>
                  <Form.Control
                    placeholder="Buscar..."
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Form.Group>

                <AutocompleteSelect
                  label="Tipo"
                  value={filterType}
                  onChange={(value) => setFilterType(value as QuestionType | '')}
                  options={[
                    { id: '', name: 'Todos' },
                    ...questionTypes.map(qt => ({
                      id: qt.code,
                      name: qt.name,
                      description: qt.description
                    }))
                  ]}
                  placeholder="Tipo..."
                />

                <div className="mb-3">
                  <AutocompleteSelect
                    label="Dificultad"
                    value={filterDifficulty}
                    onChange={(value) => setFilterDifficulty(value as DifficultyLevel | '')}
                    options={[
                      { id: '', name: 'Todas' },
                      ...difficulties.map(d => ({
                        id: d.difficultyId,
                        name: d.level,
                        description: d.description
                      }))
                    ]}
                    placeholder="Dificultad..."
                  />
                </div>

                <AutocompleteSelect
                  label="Asignatura"
                  value={filterSubject}
                  onChange={(value) => setFilterSubject(String(value))}
                  options={[
                    { id: '', name: 'Todas' },
                    ...subjects.map(s => ({
                      id: s.subject_id,
                      name: s.name,
                      description: s.code
                    }))
                  ]}
                  placeholder="Asignatura..."
                />

                <Form.Check
                  type="checkbox"
                  id="show-inactive"
                  label="Mostrar inactivas"
                  checked={showInactive}
                  onChange={(e) => setShowInactive(e.target.checked)}
                  className="mt-3"
                />

                <Button
                  variant="outline-secondary"
                  className="w-100 mt-3"
                  onClick={() => {
                    setSearchText('');
                    setFilterType('');
                    setFilterDifficulty('');
                    setFilterSubject('');
                  }}
                >
                  🔄 Limpiar Filtros
                </Button>

                <Button
                  variant="success"
                  className="w-100 mt-2"
                  onClick={() => router.push('/questions-bank/create')}
                >
                  ➕ Nueva Pregunta
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Grid de Preguntas - Derecha */}
          <Col lg={9}>
            {questions.length === 0 ? (
              <Card>
                <Card.Body className="text-center py-5">
                  <h4 className="text-muted">No se encontraron preguntas</h4>
                  <p className="text-muted">
                    {searchText || filterType || filterDifficulty || filterSubject
                      ? 'Intenta ajustar los filtros de búsqueda'
                      : 'Comienza creando tu primera pregunta'}
                  </p>
                  <Button
                    variant="outline-success"
                    onClick={() => router.push('/questions-bank/create')}
                  >
                    ➕ Crear Primera Pregunta
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row>
                {questions.map((question) => (
                  <Col key={question.question_id} lg={4} md={6} xs={12} className="mb-3">
                    <Card 
                      className={`h-100 ${!question.active ? 'card-inactive' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleViewQuestion(question.question_id)}
                    >
                      <Card.Body className="d-flex flex-column">
                        {/* Badges superiores */}
                        <div className="d-flex flex-wrap gap-1 mb-2">
                          <Badge bg={getTypeColor(question.type)} style={{ fontSize: '0.7rem' }}>
                            {questionTypes.find(qt => qt.code === question.type)?.name || question.type}
                          </Badge>
                          <Badge bg={getDifficultyColor(question.difficulty_fk)} style={{ fontSize: '0.7rem' }}>
                            {difficulties.find(d => d.difficultyId === question.difficulty_fk)?.level}
                          </Badge>
                          {(() => {
                            const versionCount = questionStore.getQuestionVersionHistory(question.question_id).length;
                            if (versionCount > 1) {
                              return (
                                <Badge bg="info" style={{ fontSize: '0.7rem' }}>
                                  v{question.version}
                                </Badge>
                              );
                            }
                          })()}
                          {!question.active && (
                            <Badge bg="warning" style={{ fontSize: '0.7rem' }}>
                              ⚠️ Inactiva
                            </Badge>
                          )}
                        </div>
                        
                        {/* Enunciado */}
                        <Card.Text 
                          className="mb-2 flex-grow-1" 
                          style={{ 
                            fontSize: '0.9rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {question.enunciado}
                        </Card.Text>
                        
                        {/* Info inferior */}
                        <div className="small text-muted d-flex justify-content-between align-items-center mt-auto">
                          <span>
                            📝 {question.options.length}
                          </span>
                          <span style={{ fontSize: '0.7rem' }}>
                            {new Date(question.updated_at).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Botones de acción */}
                        <div className="d-flex gap-1 mt-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="flex-grow-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewQuestion(question.question_id);
                            }}
                            style={{ fontSize: '0.75rem' }}
                          >
                            👁️
                          </Button>
                          <Dropdown as={ButtonGroup} size="sm">
                            <Dropdown.Toggle 
                              variant="outline-secondary" 
                              size="sm"
                              style={{ fontSize: '0.75rem' }}
                            >
                              ⋮
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={(e) => {
                                e.stopPropagation();
                                handleCreateVersion(question.question_id);
                              }}>
                                🔄 Crear Nueva Versión
                              </Dropdown.Item>
                              <Dropdown.Item 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditQuestion(question.question_id);
                                }}
                                disabled
                                className="text-muted"
                              >
                                ✏️ Editar (proximamente)
                              </Dropdown.Item>
                              <Dropdown.Item 
                                disabled
                                className="text-muted"
                              >
                                📋 Clonar Pregunta (proximamente)
                              </Dropdown.Item>
                              <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                                📊 Ver Estadísticas
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              {question.active ? (
                                <Dropdown.Item 
                                  className="text-warning"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRetireQuestion(question.question_id);
                                  }}
                                >
                                  ⚠️ Retirar Pregunta
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item 
                                  className="text-success"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReactivateQuestion(question.question_id);
                                  }}
                                >
                                  ✅ Reactivar Pregunta
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </div>

      {/* Create Question Modal */}
      <CreateQuestionModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
        initialType={filterType || undefined}
        initialEnunciado={searchText || undefined}
        initialDifficulty={filterDifficulty || undefined}
        initialSubject={filterSubject || undefined}
      />

      {/* View Question Modal */}
      <ViewQuestionModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        questionId={selectedQuestionId}
        onCreateVersion={handleCreateVersion}
        onEdit={handleEditQuestion}
      />

      {/* Edit/Version Question Modal */}
      <EditQuestionModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSuccess={handleVersionSuccess}
        questionId={selectedQuestionId}
        mode={editMode}
      />

      {/* Clone Question Modal */}
      <CloneQuestionModal
        show={showCloneModal}
        onHide={() => setShowCloneModal(false)}
        onSuccess={handleCloneSuccess}
        questionId={selectedQuestionId}
      />

      {/* Retire Question Modal */}
      <RetireQuestionModal
        show={showRetireModal}
        onHide={() => setShowRetireModal(false)}
        onConfirm={handleConfirmRetire}
        question={selectedQuestion}
        isSubmitting={isRetiring}
      />

      {/* Reactivate Question Modal */}
      <ReactivateQuestionModal
        show={showReactivateModal}
        onHide={() => setShowReactivateModal(false)}
        onConfirm={handleConfirmReactivate}
        question={selectedQuestion}
        isSubmitting={isReactivating}
      />
    </ProtectedRoute>
  );
}
