'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { levelStore } from '@/lib/levelStore';

function EditLevelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelId = searchParams.get('id');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    isActive: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!levelId) {
      setError('ID de nivel no especificado');
      setLoading(false);
      return;
    }

    const level = levelStore.getLevelById(levelId);
    if (!level) {
      setError('Nivel no encontrado');
      setLoading(false);
      return;
    }

    setFormData({
      name: level.name,
      code: level.code,
      description: level.description,
      isActive: level.isActive,
    });
    setLoading(false);
  }, [levelId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!levelId) {
      setError('ID de nivel no especificado');
      return;
    }

    // Validar campos obligatorios
    if (!formData.name || !formData.code) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    try {
      levelStore.updateLevel(levelId, {
        name: formData.name,
        code: formData.code,
        description: formData.description,
        isActive: formData.isActive,
      });

      setSubmitted(true);

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/evaluation-management/levels');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar nivel');
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <p className="text-muted">Cargando nivel...</p>
        </div>
      </Container>
    );
  }

  if (error && !submitted) {
    return (
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="mb-2">✏️ Editar Nivel Educacional</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={8} className="mx-auto">
            <Alert variant="danger">
              ❌ {error}
            </Alert>
            <Button
              variant="outline-secondary"
              onClick={() => router.push('/evaluation-management/levels')}
            >
              ← Volver
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-2">✏️ Editar Nivel Educacional</h1>
          <p className="text-muted">Modifica los datos del nivel: <strong>{formData.name}</strong></p>
        </Col>
      </Row>

      {submitted && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" dismissible>
              ✅ Nivel actualizado exitosamente. Redirigiendo...
            </Alert>
          </Col>
        </Row>
      )}

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              ❌ {error}
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={8} className="mx-auto">
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Nombre */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Nombre del Nivel <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Nombre del nivel educacional
                  </Form.Text>
                </Form.Group>

                {/* Código */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Código del Nivel <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Código único para identificar el nivel
                  </Form.Text>
                </Form.Group>

                {/* Descripción */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Descripción del nivel
                  </Form.Text>
                </Form.Group>

                {/* Estado Activo */}
                <Form.Group className="mb-4">
                  <Form.Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    id="isActive"
                    label="Nivel Activo"
                  />
                  <Form.Text className="text-muted d-block mt-2">
                    Marca para activar el nivel
                  </Form.Text>
                </Form.Group>

                {/* Botones */}
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit">
                    ✅ Guardar Cambios
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => router.push('/evaluation-management/levels')}
                  >
                    ❌ Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default function EditLevelPage() {
  return (
    <Suspense fallback={<Container className="py-4"><p>Cargando...</p></Container>}>
      <EditLevelContent />
    </Suspense>
  );
}
