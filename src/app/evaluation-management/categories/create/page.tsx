'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { levelStore } from '@/lib/levelStore';
import { useAuth } from '@/contexts/AuthContext';
import CategoryFormFields from '@/components/CategoryFormFields';

export default function CreateCategoryPage() {
  const router = useRouter();
  const { user } = useAuth();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar campos obligatorios
    if (!formData.name || !formData.code) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    try {
      await levelStore.createCategory({
        name: formData.name.trim(),
        code: formData.code.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive,
        userId: user?.id,
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
    <Container fluid className="py-4">
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
        {/* Información a la izquierda */}
        <Col lg={4} className="mb-4">
          <Card className="h-100 border-primary border-2">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">ℹ️ Información</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">
                Las categorías permiten clasificar y organizar los niveles educacionales en grupos lógicos.
              </p>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-2">📋 Datos Requeridos</h6>
                <div className="small">
                  <p className="mb-2">
                    <strong>Nombre:</strong>
                    <br />
                    <span className="text-muted">Nombre descriptivo de la categoría</span>
                  </p>
                  <p>
                    <strong>Código:</strong>
                    <br />
                    <span className="text-muted">Identificador único (ej: CAT_BASIC)</span>
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-2">💡 Consejos</h6>
                <ul className="small mb-0">
                  <li>Usa códigos en mayúsculas con guiones</li>
                  <li>Incluye una descripción clara</li>
                  <li>Marca como activa al crear</li>
                  <li>Agrupa niveles relacionados</li>
                </ul>
              </div>

              <div className="alert alert-info small mb-0">
                <strong>✨ Tip:</strong> Las categorías ayudan a mantener organizado el sistema de niveles
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulario a la derecha */}
        <Col lg={8}>
          <Card className="border-primary border-2">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">➕ Nueva Categoría</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <CategoryFormFields
                  formData={formData}
                  onChange={handleChange}
                  onSwitchChange={(isActive) =>
                    setFormData({ ...formData, isActive })
                  }
                />

                {/* Botones */}
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    ✅ Crear Categoría
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => router.push('/evaluation-management/categories')}
                    size="lg"
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
