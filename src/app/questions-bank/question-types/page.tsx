'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Modal,
  Alert,
  Spinner,
} from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';

interface QuestionType {
  id: string;
  code: string;
  name: string;
  description?: string;
  createdAt?: string;
  createdBy?: string;
}

export default function QuestionTypesPage() {
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ code: '', name: '', description: '' });

  // Load question types on mount
  useEffect(() => {
    loadQuestionTypes();
  }, []);

  const loadQuestionTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Replace with Data Connect query when ready
      // const response = await fetch('/api/question-types');
      // const data = await response.json();
      // setQuestionTypes(data);

      // Placeholder data for now
      setQuestionTypes([
        {
          id: '1',
          code: 'MC',
          name: 'Opción Múltiple',
          description: 'Pregunta con múltiples opciones de respuesta',
        },
        {
          id: '2',
          code: 'VF',
          name: 'Verdadero/Falso',
          description: 'Pregunta de verdadero o falso',
        },
        {
          id: '3',
          code: 'SA',
          name: 'Respuesta Corta',
          description: 'Pregunta que requiere una respuesta corta',
        },
      ]);
    } catch (err) {
      setError('Error al cargar los tipos de preguntas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (type?: QuestionType) => {
    if (type) {
      setEditingId(type.id);
      setFormData({
        code: type.code,
        name: type.name,
        description: type.description || '',
      });
    } else {
      setEditingId(null);
      setFormData({ code: '', name: '', description: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ code: '', name: '', description: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Replace with Data Connect mutation
      if (editingId) {
        // UPDATE mutation
        setQuestionTypes(
          questionTypes.map((qt) =>
            qt.id === editingId
              ? { ...qt, ...formData }
              : qt
          )
        );
      } else {
        // CREATE mutation
        const newType: QuestionType = {
          id: Date.now().toString(),
          ...formData,
        };
        setQuestionTypes([...questionTypes, newType]);
      }
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar el tipo de pregunta');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este tipo de pregunta?')) {
      try {
        // TODO: Replace with Data Connect mutation
        setQuestionTypes(questionTypes.filter((qt) => qt.id !== id));
      } catch (err) {
        setError('Error al eliminar el tipo de pregunta');
        console.error(err);
      }
    }
  };

  return (
    <ProtectedRoute>
      <Container className="mt-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h2>Gestión de Tipos de Preguntas</h2>
            <p className="text-muted">
              Administre los tipos de preguntas disponibles en el sistema
            </p>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Row className="mb-3">
            <Col>
              <Alert variant="danger" onClose={() => setError(null)} dismissible>
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {/* Create Button */}
        <Row className="mb-3">
          <Col>
            <Button
              variant="primary"
              onClick={() => handleOpenModal()}
            >
              ➕ Crear Nuevo Tipo de Pregunta
            </Button>
          </Col>
        </Row>

        {/* Question Types Table */}
        <Row>
          <Col>
            <Card>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                  </div>
                ) : questionTypes.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">
                      No hay tipos de preguntas registrados
                    </p>
                  </div>
                ) : (
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th style={{ width: '150px' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionTypes.map((type) => (
                        <tr key={type.id}>
                          <td>
                            <code>{type.code}</code>
                          </td>
                          <td>{type.name}</td>
                          <td>{type.description || '—'}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleOpenModal(type)}
                              className="me-2"
                            >
                              ✏️
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(type.id)}
                            >
                              🗑️
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Create/Edit Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId
                ? 'Editar Tipo de Pregunta'
                : 'Crear Nuevo Tipo de Pregunta'}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>
                  Código <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: MC"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  required
                />
                <Form.Text className="text-muted">
                  Código único corto para identificar el tipo (máx 10 caracteres)
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Nombre <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: Opción Múltiple"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Descripción del tipo de pregunta"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingId ? 'Guardar Cambios' : 'Crear'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </ProtectedRoute>
  );
}
