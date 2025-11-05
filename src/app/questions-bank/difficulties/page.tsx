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

interface Difficulty {
  id: string;
  code: string;
  name: string;
  description?: string;
  level?: number;
  createdAt?: string;
  createdBy?: string;
}

export default function DifficultiesPage() {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    level: 1,
  });

  // Load difficulties on mount
  useEffect(() => {
    loadDifficulties();
  }, []);

  const loadDifficulties = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Replace with Data Connect query when ready
      // const response = await fetch('/api/difficulties');
      // const data = await response.json();
      // setDifficulties(data);

      // Placeholder data for now
      setDifficulties([
        {
          id: '1',
          code: 'EASY',
          name: 'Fácil',
          description: 'Pregunta de dificultad baja',
          level: 1,
        },
        {
          id: '2',
          code: 'MEDIUM',
          name: 'Medio',
          description: 'Pregunta de dificultad media',
          level: 2,
        },
        {
          id: '3',
          code: 'HARD',
          name: 'Difícil',
          description: 'Pregunta de dificultad alta',
          level: 3,
        },
        {
          id: '4',
          code: 'EXPERT',
          name: 'Experto',
          description: 'Pregunta de dificultad muy alta',
          level: 4,
        },
      ]);
    } catch (err) {
      setError('Error al cargar los niveles de dificultad');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (difficulty?: Difficulty) => {
    if (difficulty) {
      setEditingId(difficulty.id);
      setFormData({
        code: difficulty.code,
        name: difficulty.name,
        description: difficulty.description || '',
        level: difficulty.level || 1,
      });
    } else {
      setEditingId(null);
      setFormData({ code: '', name: '', description: '', level: 1 });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ code: '', name: '', description: '', level: 1 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Replace with Data Connect mutation
      if (editingId) {
        // UPDATE mutation
        setDifficulties(
          difficulties.map((d) =>
            d.id === editingId ? { ...d, ...formData } : d
          )
        );
      } else {
        // CREATE mutation
        const newDifficulty: Difficulty = {
          id: Date.now().toString(),
          ...formData,
        };
        setDifficulties([...difficulties, newDifficulty]);
      }
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar el nivel de dificultad');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este nivel de dificultad?')) {
      try {
        // TODO: Replace with Data Connect mutation
        setDifficulties(difficulties.filter((d) => d.id !== id));
      } catch (err) {
        setError('Error al eliminar el nivel de dificultad');
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
            <h2>Gestión de Niveles de Dificultad</h2>
            <p className="text-muted">
              Administre los niveles de dificultad disponibles en el sistema
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
              ➕ Crear Nuevo Nivel de Dificultad
            </Button>
          </Col>
        </Row>

        {/* Difficulties Table */}
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
                ) : difficulties.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">
                      No hay niveles de dificultad registrados
                    </p>
                  </div>
                ) : (
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Nivel</th>
                        <th>Descripción</th>
                        <th style={{ width: '150px' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {difficulties
                        .sort((a, b) => (a.level || 0) - (b.level || 0))
                        .map((difficulty) => (
                          <tr key={difficulty.id}>
                            <td>
                              <code>{difficulty.code}</code>
                            </td>
                            <td>{difficulty.name}</td>
                            <td>
                              <span className="badge bg-info">
                                {difficulty.level || '—'}
                              </span>
                            </td>
                            <td>{difficulty.description || '—'}</td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleOpenModal(difficulty)}
                                className="me-2"
                              >
                                ✏️
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(difficulty.id)}
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
                ? 'Editar Nivel de Dificultad'
                : 'Crear Nuevo Nivel de Dificultad'}
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
                  placeholder="ej: EASY"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  required
                />
                <Form.Text className="text-muted">
                  Código único para identificar el nivel (máx 10 caracteres)
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Nombre <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: Fácil"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nivel</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      level: parseInt(e.target.value) || 1,
                    })
                  }
                />
                <Form.Text className="text-muted">
                  Número que ordena los niveles (1 = más fácil, 4 = más difícil)
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Descripción del nivel de dificultad"
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
