'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { levelStore } from '@/lib/levelStore';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    isActive: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    // Validar campos obligatorios
    if (!formData.name || !formData.code) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    try {
      levelStore.createCategory({
        name: formData.name.trim(),
        code: formData.code.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive,
      });

      setSubmitted(true);

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/evaluation-management/categories');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear categoría');
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-2">➕ Nueva Categoría de Nivel</h1>
          <p className="text-muted">Crea una nueva categoría para clasificar niveles educacionales</p>
        </Col>
      </Row>

      {submitted && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" dismissible>
              ✅ Categoría creada exitosamente. Redirigiendo...
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
                    Nombre de la Categoría <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Enseñanza Básica"
                    required
                  />
                  <Form.Text className="text-muted">
                    Nombre descriptivo de la categoría
                  </Form.Text>
                </Form.Group>

                {/* Código */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Código de la Categoría <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Ej: CAT_BASIC"
                    required
                  />
                  <Form.Text className="text-muted">
                    Código único para identificar la categoría (letras mayúsculas y guiones)
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
                    placeholder="Describe la categoría..."
                  />
                  <Form.Text className="text-muted">
                    Descripción detallada de la categoría
                  </Form.Text>
                </Form.Group>

                {/* Estado Activo */}
                <Form.Group className="mb-4">
                  <Form.Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    id="isActive"
                    label="Categoría Activa"
                  />
                  <Form.Text className="text-muted d-block mt-2">
                    Marca para activar la categoría
                  </Form.Text>
                </Form.Group>

                {/* Botones */}
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit">
                    ✅ Crear Categoría
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => router.push('/evaluation-management/categories')}
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
