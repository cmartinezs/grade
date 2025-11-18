"use client"

import { useState } from 'react';
import { Row, Col, Card, Button, Badge, Form, InputGroup, Dropdown, ButtonGroup } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateQuestionModal from './components/CreateQuestionModal';
import ViewQuestionModal from './components/ViewQuestionModal';
import EditQuestionModal from './components/EditQuestionModal';
import CloneQuestionModal from './components/CloneQuestionModal';
import RetireQuestionModal from './components/RetireQuestionModal';
import ReactivateQuestionModal from './components/ReactivateQuestionModal';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import { questionStore } from '@/lib/questionStore';
import type { QuestionType, DifficultyLevel } from '@/types/question';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { useQuestions } from '@/hooks/useQuestions';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';

export default function QuestionsBankPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [showRetireModal, setShowRetireModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'edit' | 'version'>('version');
  const [isRetiring, setIsRetiring] = useState(false);
  const [isReactivating, setIsReactivating] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<QuestionType | ''>('');
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | ''>('');
  const [filterSubject, setFilterSubject] = useState('');
  const [showInactive, setShowInactive] = useState(true);

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
    setSelectedQuestionId(questionId);
    setShowRetireModal(true);
  };

  const handleConfirmRetire = async (reason?: string): Promise<void> => {
    if (!selectedQuestionId) return;

    setIsRetiring(true);
    try {
      await questionStore.retireQuestion(selectedQuestionId, 'current-user@example.com', reason);
      loadQuestions();
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error al retirar pregunta: ${error.message}`);
      }
      throw error;
    } finally {
      setIsRetiring(false);
    }
  };

  const handleReactivateQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setShowReactivateModal(true);
  };

  const handleConfirmReactivate = async (reason?: string): Promise<void> => {
    if (!selectedQuestionId) return;

    setIsReactivating(true);
    try {
      await questionStore.reactivateQuestion(selectedQuestionId, 'current-user@example.com', reason);
      loadQuestions();
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error al reactivar pregunta: ${error.message}`);
      }
      throw error;
    } finally {
      setIsReactivating(false);
    }
  };

  const getTypeColor = (type: QuestionType) => {
    const colors: Record<QuestionType, string> = {
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

        {/* Filtros */}
        <Card className="mb-4">
          <Card.Body>
            <Row className="align-items-end">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Buscar</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Buscar en enunciados y opciones..."
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant="outline-secondary">
                      🔍
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={2}>
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
                  placeholder="Busca un tipo de pregunta..."
                />
              </Col>
              <Col md={2}>
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
                  placeholder="Busca un nivel de dificultad..."
                />
              </Col>
              <Col md={3}>
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
                  placeholder="Busca una asignatura..."
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Check
                  type="checkbox"
                  id="show-inactive"
                  label="Mostrar preguntas inactivas"
                  checked={showInactive}
                  onChange={(e) => setShowInactive(e.target.checked)}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={1}>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setSearchText('');
                    setFilterType('');
                    setFilterDifficulty('');
                    setFilterSubject('');
                  }}
                  title="Limpiar filtros"
                >
                  🔄
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Lista de Preguntas */}
        {questions.length === 0 ? (
          <Card>
            <Card.Body className="text-center py-5">
              <h4 className="text-muted">No se encontraron preguntas</h4>
              <p className="text-muted">
                {searchText || filterType || filterDifficulty || filterSubject
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Comienza creando tu primera pregunta'}
              </p>
              <span
                className="btn btn-sm btn-outline-success"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowCreateModal(true)}
              >
                ➕ Crear Primera Pregunta
              </span>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {questions.map((question) => (
              <Col key={question.question_id} xs={12} className="mb-3">
                <Card className={!question.active ? 'card-inactive' : ''}>
                  <Card.Body>
                    <Row>
                      <Col md={9}>
                        <div className="d-flex align-items-center mb-2">
                          <Badge bg={getTypeColor(question.type)} className="me-2">
                            {questionTypes.find(qt => qt.code === question.type)?.name || question.type}
                          </Badge>
                          <Badge bg={getDifficultyColor(question.difficulty_fk)} className="me-2">
                            {difficulties.find(d => d.difficultyId === question.difficulty_fk)?.level}
                          </Badge>
                          {(() => {
                            const versionCount = questionStore.getQuestionVersionHistory(question.question_id).length;
                            if (versionCount > 1) {
                              return (
                                <Badge bg="info" className="me-2">
                                  v{question.version} ({versionCount})
                                </Badge>
                              );
                            }
                          })()}
                          {question.topic_name && (
                            <span className="badge bg-light text-dark">
                              {question.topic_name}
                            </span>
                          )}
                        </div>
                        
                        <Card.Title className="h6 mb-2">
                          {question.enunciado.length > 150 
                            ? `${question.enunciado.substring(0, 150)}...` 
                            : question.enunciado}
                        </Card.Title>
                        
                        <div className="small text-muted">
                          {question.options.length > 0 && (
                            <span className="me-3">
                              📝 {question.options.length} {question.options.length === 1 ? 'alternativa' : 'alternativas'}
                            </span>
                          )}
                          <span className="me-3">
                            🕒 {new Date(question.updated_at).toLocaleDateString()}
                          </span>
                          <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                            ID: {question.question_id.substring(0, 8)}...
                          </span>
                        </div>
                      </Col>
                      <Col md={3} className="text-end d-flex align-items-start justify-content-end gap-2" style={{ position: 'relative', zIndex: 2 }}>
                        {!question.active && (
                          <span 
                            className="text-warning" 
                            style={{ fontSize: '1.5rem', lineHeight: 1 }}
                            title="Pregunta inactiva"
                          >
                            ⚠️
                          </span>
                        )}
                        <Dropdown as={ButtonGroup}>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewQuestion(question.question_id)}
                          >
                            👁️ Ver Detalle
                          </Button>
                          <Dropdown.Toggle split variant="outline-primary" size="sm" />
                          <Dropdown.Menu style={{ position: 'absolute', zIndex: 1055 }}>
                            <Dropdown.Item onClick={() => handleCreateVersion(question.question_id)}>
                              🔄 Crear Nueva Versión
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleEditQuestion(question.question_id)}>
                              ✏️ Editar
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCloneQuestion(question.question_id)}>
                              📋 Clonar Pregunta
                            </Dropdown.Item>
                            <Dropdown.Item>📊 Ver Estadísticas</Dropdown.Item>
                            <Dropdown.Divider />
                            {question.active ? (
                              <Dropdown.Item 
                                className="text-warning"
                                onClick={() => handleRetireQuestion(question.question_id)}
                              >
                                ⚠️ Retirar Pregunta
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item 
                                className="text-success"
                                onClick={() => handleReactivateQuestion(question.question_id)}
                              >
                                ✅ Reactivar Pregunta
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
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
        question={selectedQuestionId ? questionStore.getQuestionWithDetails(selectedQuestionId) : null}
        isSubmitting={isRetiring}
      />

      {/* Reactivate Question Modal */}
      <ReactivateQuestionModal
        show={showReactivateModal}
        onHide={() => setShowReactivateModal(false)}
        onConfirm={handleConfirmReactivate}
        question={selectedQuestionId ? questionStore.getQuestionWithDetails(selectedQuestionId) : null}
        isSubmitting={isReactivating}
      />
    </ProtectedRoute>
  );
}
