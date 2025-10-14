"use client"

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Dropdown, ButtonGroup } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateQuestionModal from '@/components/CreateQuestionModal';
import ViewQuestionModal from '@/components/ViewQuestionModal';
import EditQuestionModal from '@/components/EditQuestionModal';
import CloneQuestionModal from '@/components/CloneQuestionModal';
import RetireQuestionModal from '@/components/RetireQuestionModal';
import ReactivateQuestionModal from '@/components/ReactivateQuestionModal';
import { questionStore, QUESTION_TYPE_RULES } from '@/lib/questionStore';
import { QuestionWithDetails, QuestionType, DifficultyLevel } from '@/types/question';
import { getAllSubjects } from '@/lib/taxonomyStore';

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
  const [questions, setQuestions] = useState<QuestionWithDetails[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<QuestionType | ''>('');
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | ''>('');
  const [filterSubject, setFilterSubject] = useState('');
  const [showInactive, setShowInactive] = useState(true);

  const subjects = getAllSubjects().filter(s => s.active && !s.deleted_at);
  const difficultyLevels = questionStore.getDifficultyLevels();

  useEffect(() => {
    const filters: {
      type?: QuestionType;
      difficulty_fk?: DifficultyLevel;
      subject_fk?: string;
      includeInactive?: boolean;
    } = {
      includeInactive: showInactive
    };
    
    if (filterType) filters.type = filterType;
    if (filterDifficulty) filters.difficulty_fk = filterDifficulty;
    if (filterSubject) filters.subject_fk = filterSubject;

    const results = questionStore.searchQuestionsGrouped(searchText, filters);
    
    setQuestions(results);
  }, [searchText, filterType, filterDifficulty, filterSubject, showInactive]);

  const loadQuestions = () => {
    const filters: {
      type?: QuestionType;
      difficulty_fk?: DifficultyLevel;
      subject_fk?: string;
      includeInactive?: boolean;
    } = {
      includeInactive: showInactive
    };
    
    if (filterType) filters.type = filterType;
    if (filterDifficulty) filters.difficulty_fk = filterDifficulty;
    if (filterSubject) filters.subject_fk = filterSubject;

    const results = questionStore.searchQuestionsGrouped(searchText, filters);
    setQuestions(results);
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

  const handleConfirmRetire = async (reason?: string) => {
    if (!selectedQuestionId) return;

    setIsRetiring(true);
    try {
      await questionStore.retireQuestion(selectedQuestionId, 'current-user@example.com', reason);
      setShowRetireModal(false);
      setSelectedQuestionId(null);
      loadQuestions();
      alert('Pregunta retirada exitosamente');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error al retirar pregunta: ${error.message}`);
      }
    } finally {
      setIsRetiring(false);
    }
  };

  const handleReactivateQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setShowReactivateModal(true);
  };

  const handleConfirmReactivate = async (reason?: string) => {
    if (!selectedQuestionId) return;

    setIsReactivating(true);
    try {
      await questionStore.reactivateQuestion(selectedQuestionId, 'current-user@example.com', reason);
      setShowReactivateModal(false);
      setSelectedQuestionId(null);
      loadQuestions();
      alert('Pregunta reactivada exitosamente');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error al reactivar pregunta: ${error.message}`);
      }
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
      <Container className="mt-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1>Banco de Preguntas</h1>
            <p className="text-muted">
              Gestiona todas tus preguntas desde aquí
              <Badge bg="secondary" className="ms-2">{questions.length} preguntas</Badge>
            </p>
          </Col>
          <Col xs="auto">
            <span
              className="btn btn-sm btn-outline-success"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowCreateModal(true)}
            >
              ➕ Nueva Pregunta
            </span>
          </Col>
        </Row>

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
                <Form.Group>
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as QuestionType | '')}
                  >
                    <option value="">Todos</option>
                    {Object.values(QUESTION_TYPE_RULES).map((rule) => (
                      <option key={rule.type} value={rule.type}>
                        {rule.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Dificultad</Form.Label>
                  <Form.Select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value as DifficultyLevel | '')}
                  >
                    <option value="">Todas</option>
                    {difficultyLevels.map((level) => (
                      <option key={level.difficulty_id} value={level.difficulty_id}>
                        {level.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Asignatura</Form.Label>
                  <Form.Select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {subjects.map((subject) => (
                      <option key={subject.subject_id} value={subject.subject_id}>
                        {subject.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
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
                        <div className="mb-2">
                          <Badge bg={getTypeColor(question.type)} className="me-2">
                            {QUESTION_TYPE_RULES[question.type].name}
                          </Badge>
                          {!question.active && (
                            <Badge bg="warning" text="dark" className="me-2">
                              ⚠️ INACTIVA
                            </Badge>
                          )}
                          <Badge bg={getDifficultyColor(question.difficulty_fk)} className="me-2">
                            {difficultyLevels.find(d => d.difficulty_id === question.difficulty_fk)?.name}
                          </Badge>
                          {(() => {
                            const versionCount = questionStore.getQuestionVersionHistory(question.question_id).length;
                            if (versionCount > 1) {
                              return (
                                <Badge bg="info" className="me-2">
                                  🔄 v{question.version} ({versionCount} versiones)
                                </Badge>
                              );
                            } else {
                              return (
                                <Badge bg="secondary" className="me-2">
                                  v{question.version}
                                </Badge>
                              );
                            }
                          })()}
                          {question.subject_name && (
                            <Badge bg="light" text="dark" className="me-2">
                              📚 {question.subject_name}
                            </Badge>
                          )}
                          {question.unit_name && (
                            <Badge bg="light" text="dark" className="me-2">
                              📖 {question.unit_name}
                            </Badge>
                          )}
                          {question.topic_name && (
                            <Badge bg="light" text="dark">
                              📝 {question.topic_name}
                            </Badge>
                          )}
                        </div>
                        <Card.Title className="h5 mb-3">{question.enunciado}</Card.Title>
                        {question.options.length > 0 && (
                          <div className="small text-muted">
                            {question.options.map((opt) => (
                              <div key={opt.question_option_id} className="mb-1">
                                {opt.is_correct ? '✅' : '❌'} {opt.position}. {opt.text}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-2 small text-muted">
                          <span>ID: {question.original_version_fk || question.question_id}</span>
                          <span className="ms-3">Última versión: v{question.version}</span>
                          <span className="ms-3">Autor: {question.author_fk}</span>
                          <span className="ms-3">
                            Actualizado: {new Date(question.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </Col>
                      <Col md={3} className="text-end" style={{ position: 'relative', zIndex: 2 }}>
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
                            <Dropdown.Item 
                              className="text-warning"
                              onClick={() => handleRetireQuestion(question.question_id)}
                              disabled={!question.active}
                            >
                              ⚠️ Retirar Pregunta
                            </Dropdown.Item>
                            <Dropdown.Item 
                              className="text-success"
                              onClick={() => handleReactivateQuestion(question.question_id)}
                              disabled={question.active}
                            >
                              ✅ Reactivar Pregunta
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger">🗑️ Eliminar</Dropdown.Item>
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
      </Container>

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
