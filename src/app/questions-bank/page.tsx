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
import { getDifficultyColorRgb, getDifficultyEmoji } from '@/lib/difficultyUtils';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleConfirmRetire = async (): Promise<void> => {
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

  const handleConfirmReactivate = async (): Promise<void> => {
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

  // Color dinámico basado en weight - ahora usa la utilidad centralizada
  const getDifficultyBgStyle = (weight: number | undefined) => ({
    backgroundColor: getDifficultyColorRgb(weight),
    color: (weight ?? 0) > 0.6 ? 'white' : 'black'
  });

  return (
    <ProtectedRoute>
      <div className="p-4">
        {/* Header mejorado */}
        <div 
          className="mb-4 p-4 rounded-3" 
          style={{ 
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}
        >
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <h2 className="mb-1 d-flex align-items-center gap-2 text-white">
                <span style={{ fontSize: '1.5rem' }}>📚</span>
                Banco de Preguntas
              </h2>
              <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Gestiona y organiza todas tus preguntas desde aquí
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Badge 
                bg="light" 
                text="dark"
                className="px-3 py-2 d-flex align-items-center gap-1"
                style={{ fontSize: '0.9rem', borderRadius: '20px' }}
              >
                <span className="fw-bold">{questions.length}</span>
                <span className="fw-normal">preguntas</span>
              </Badge>
            </div>
          </div>
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
            <Card className="sticky-top border-0 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden', top: '1rem' }}>
              <Card.Header 
                className="text-white py-3"
                style={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  borderBottom: 'none'
                }}
              >
                <h5 className="mb-0 d-flex align-items-center gap-2">
                  <span>🔍</span> Filtros
                </h5>
              </Card.Header>
              <Card.Body className="p-3">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium small text-muted mb-1">Buscar</Form.Label>
                  <Form.Control
                    placeholder="Buscar en preguntas..."
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <AutocompleteSelect
                  label="Tipo"
                  value={filterType}
                  onChange={(value) => setFilterType(value as QuestionType | '')}
                  options={[
                    { id: '', name: 'Todos los tipos' },
                    ...questionTypes.map(qt => ({
                      id: qt.code,
                      name: qt.name,
                      description: qt.description
                    }))
                  ]}
                  placeholder="Seleccionar tipo..."
                />

                <div className="mb-3">
                  <AutocompleteSelect
                    label="Dificultad"
                    value={filterDifficulty}
                    onChange={(value) => setFilterDifficulty(value as DifficultyLevel | '')}
                    options={[
                      { id: '', name: 'Todas las dificultades' },
                      ...difficulties.map(d => ({
                        id: d.difficultyId,
                        name: d.level,
                        description: d.description
                      }))
                    ]}
                    placeholder="Seleccionar dificultad..."
                  />
                </div>

                <AutocompleteSelect
                  label="Asignatura"
                  value={filterSubject}
                  onChange={(value) => setFilterSubject(String(value))}
                  options={[
                    { id: '', name: 'Todas las asignaturas' },
                    ...subjects.map(s => ({
                      id: s.subject_id,
                      name: s.name,
                      description: s.code
                    }))
                  ]}
                  placeholder="Seleccionar asignatura..."
                />

                <div 
                  className="mt-3 p-2 rounded d-flex align-items-center"
                  style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                >
                  <Form.Check
                    type="switch"
                    id="show-inactive"
                    label="Mostrar inactivas"
                    checked={showInactive}
                    onChange={(e) => setShowInactive(e.target.checked)}
                    className="m-0"
                  />
                </div>

                <hr className="my-3" style={{ opacity: 0.1 }} />

                <div className="d-grid gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setSearchText('');
                      setFilterType('');
                      setFilterDifficulty('');
                      setFilterSubject('');
                    }}
                    style={{ borderRadius: '8px' }}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <span>🔄</span> Limpiar Filtros
                  </Button>

                  <Button
                    variant="success"
                    onClick={() => router.push('/questions-bank/create')}
                    style={{ borderRadius: '8px' }}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <span>➕</span> Nueva Pregunta
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Grid de Preguntas - Derecha */}
          <Col lg={9}>
            {questions.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-5">
                  <div className="mb-4">
                    <span style={{ fontSize: '4rem', opacity: 0.5 }}>📝</span>
                  </div>
                  <h4 className="text-muted mb-3">No se encontraron preguntas</h4>
                  <p className="text-muted mb-4">
                    {searchText || filterType || filterDifficulty || filterSubject
                      ? 'Intenta ajustar los filtros de búsqueda'
                      : 'Comienza creando tu primera pregunta'}
                  </p>
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => router.push('/questions-bank/create')}
                  >
                    ➕ Crear Primera Pregunta
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row className="g-3">
                {questions.map((question) => {
                  const questionTypeInfo = questionTypes.find(qt => qt.code === question.type);
                  const difficultyInfo = difficulties.find(d => d.difficultyId === question.difficulty_fk);
                  const versionCount = questionStore.getQuestionVersionHistory(question.question_id).length;
                  
                  return (
                    <Col key={question.question_id} xl={4} lg={6} md={6} xs={12}>
                      <Card 
                        className={`h-100 question-card border-0 shadow-sm ${!question.active ? 'card-inactive opacity-75' : ''}`}
                        style={{ 
                          cursor: 'pointer',
                          transition: 'all 0.2s ease-in-out',
                          borderRadius: '12px',
                          overflow: 'hidden'
                        }}
                        onClick={() => handleViewQuestion(question.question_id)}
                        onMouseEnter={(e) => {
                          if (question.active) {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '';
                        }}
                      >
                        {/* Header con tipo y dificultad */}
                        <div 
                          className="px-3 py-2 d-flex justify-content-between align-items-center"
                          style={{ 
                            background: question.type === 'TF'
                              ? 'linear-gradient(135deg, #475569 0%, #64748b 100%)' // Gris - V/F
                              : question.type === 'SS'
                              ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' // Azul - Selección Simple
                              : question.type.startsWith('MC')
                              ? 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)' // Violeta - Selección Múltiple
                              : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', // Default gris oscuro
                            borderBottom: '1px solid rgba(0,0,0,0.05)'
                          }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <span 
                              className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '28px', height: '28px', fontSize: '0.85rem' }}
                            >
                              {question.type === 'TF' ? '✓✗' : 
                               question.type === 'SS' ? '○' :
                               question.type.startsWith('MC') ? '☑' : '?'}
                            </span>
                            <span className="text-white fw-medium" style={{ fontSize: '0.85rem' }}>
                              {questionTypeInfo?.name || question.type}
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            {versionCount > 1 && (
                              <Badge 
                                bg="light" 
                                text="dark"
                                className="opacity-90"
                                style={{ fontSize: '0.7rem' }}
                              >
                                v{question.version}
                              </Badge>
                            )}
                            {!question.active && (
                              <Badge 
                                bg="warning" 
                                text="dark"
                                style={{ fontSize: '0.7rem' }}
                              >
                                Inactiva
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Card.Body className="d-flex flex-column p-3">
                          {/* Badges de dificultad y asignatura */}
                          <div className="d-flex flex-wrap gap-2 mb-3">
                            <Badge 
                              className="d-flex align-items-center gap-1 px-2 py-1"
                              style={{ 
                                fontSize: '0.75rem', 
                                fontWeight: 500,
                                ...getDifficultyBgStyle(difficultyInfo?.weight)
                              }}
                            >
                              {getDifficultyEmoji(difficultyInfo?.weight)}
                              {difficultyInfo?.level || 'Desconocido'}
                            </Badge>
                            {question.subject_name && (
                              <Badge 
                                bg="light" 
                                text="dark"
                                className="d-flex align-items-center gap-1 px-2 py-1 border"
                                style={{ fontSize: '0.75rem', fontWeight: 500 }}
                              >
                                📚 {question.subject_name}
                              </Badge>
                            )}
                          </div>
                          
                          {/* Enunciado */}
                          <div 
                            className="flex-grow-1 mb-3" 
                            style={{ 
                              fontSize: '0.95rem',
                              lineHeight: '1.5',
                              color: '#333',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical'
                            }}
                          >
                            {question.enunciado}
                          </div>
                          
                          {/* Separador sutil */}
                          <hr className="my-2" style={{ opacity: 0.1 }} />

                          {/* Info inferior mejorada */}
                          <div className="d-flex justify-content-between align-items-center text-muted mb-2" style={{ fontSize: '0.8rem' }}>
                            <div className="d-flex align-items-center gap-3">
                              <span className="d-flex align-items-center gap-1" title="Opciones de respuesta">
                                <span style={{ opacity: 0.7 }}>📝</span>
                                <strong>{question.options.length}</strong>
                                <span className="d-none d-sm-inline">opciones</span>
                              </span>
                            </div>
                            <span 
                              className="d-flex align-items-center gap-1"
                              title={`Actualizada: ${new Date(question.updated_at).toLocaleString()}`}
                            >
                              <span style={{ opacity: 0.7 }}>🕐</span>
                              {new Date(question.updated_at).toLocaleDateString('es-CL', { 
                                day: '2-digit', 
                                month: 'short' 
                              })}
                            </span>
                          </div>

                          {/* Botones de acción mejorados */}
                          <div className="d-flex gap-2 mt-auto pt-2" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="primary"
                              size="sm"
                              className="flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewQuestion(question.question_id);
                              }}
                              style={{ borderRadius: '8px' }}
                            >
                              <span>👁️</span>
                              <span className="d-none d-lg-inline">Ver</span>
                            </Button>
                            <Dropdown as={ButtonGroup} size="sm">
                              <Dropdown.Toggle 
                                variant="outline-secondary" 
                                size="sm"
                                className="d-flex align-items-center justify-content-center"
                                style={{ borderRadius: '8px', minWidth: '40px' }}
                              >
                                <span style={{ fontSize: '1.1rem' }}>⋯</span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu align="end" style={{ borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                <Dropdown.Header className="text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                                  Acciones
                                </Dropdown.Header>
                                <Dropdown.Item 
                                  className="d-flex align-items-center gap-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCreateVersion(question.question_id);
                                  }}
                                >
                                  <span>🔄</span> Crear Nueva Versión
                                </Dropdown.Item>
                                <Dropdown.Item 
                                  className="d-flex align-items-center gap-2 text-muted"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditQuestion(question.question_id);
                                  }}
                                  disabled
                                >
                                  <span>✏️</span> Editar <small>(pronto)</small>
                                </Dropdown.Item>
                                <Dropdown.Item 
                                  className="d-flex align-items-center gap-2 text-muted"
                                  disabled
                                >
                                  <span>📋</span> Clonar <small>(pronto)</small>
                                </Dropdown.Item>
                                <Dropdown.Item 
                                  className="d-flex align-items-center gap-2"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span>📊</span> Ver Estadísticas
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                {question.active ? (
                                  <Dropdown.Item 
                                    className="d-flex align-items-center gap-2 text-warning"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRetireQuestion(question.question_id);
                                    }}
                                  >
                                    <span>⚠️</span> Retirar Pregunta
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item 
                                    className="d-flex align-items-center gap-2 text-success"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReactivateQuestion(question.question_id);
                                    }}
                                  >
                                    <span>✅</span> Reactivar Pregunta
                                  </Dropdown.Item>
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
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
