'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { levelStore } from '@/lib/levelStore';
import LevelFormFields from '@/components/LevelFormFields';

export default function CreateLevelPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    categoryId: '' as number | '',
    isActive: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
    
    // Validar campos obligatorios
    if (!formData.name || !formData.code || !formData.categoryId) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    try {
      levelStore.createLevel({
        name: formData.name,
        code: formData.code,
        description: formData.description,
        categoryId: Number(formData.categoryId),
        isActive: formData.isActive,
      });

      setSubmitted(true);

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/evaluation-management/levels');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear nivel');
    }
  };

  return (
    <Container fluid className="py-4">
      {submitted && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" dismissible>
              ✅ Nivel creado exitosamente. Redirigiendo...
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
          <Card className="h-100 border-info border-2">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">ℹ️ Información</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">
                Los niveles educacionales representan los diferentes años o etapas del sistema educativo chileno.
              </p>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-2">📋 Datos Requeridos</h6>
                <div className="small">
                  <p className="mb-2">
                    <strong>Categoría:</strong>
                    <br />
                    <span className="text-muted">Grupo educativo (ej: Básico, Medio)</span>
                  </p>
                  <p className="mb-2">
                    <strong>Nombre:</strong>
                    <br />
                    <span className="text-muted">Nombre del nivel (ej: 1° Básico)</span>
                  </p>
                  <p>
                    <strong>Código:</strong>
                    <br />
                    <span className="text-muted">Identificador único (ej: LEVEL_1B)</span>
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-2">💡 Consejos</h6>
                <ul className="small mb-0">
                  <li>Sigue la nomenclatura chilena</li>
                  <li>Usa códigos consistentes</li>
                  <li>Asigna a la categoría correcta</li>
                  <li>Marca como activo al crear</li>
                </ul>
              </div>

              <div className="alert alert-info small mb-0">
                <strong>✨ Tip:</strong> Puedes seleccionar un nivel predefinido abajo
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulario a la derecha */}
        <Col lg={8}>
          <Card className="border-info border-2">
            <Card.Header className="bg-info text-white">
              <h4 className="mb-0">➕ Nuevo Nivel</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <LevelFormFields
                  formData={formData}
                  onChange={handleChange}
                  onSwitchChange={(isActive) =>
                    setFormData({ ...formData, isActive })
                  }
                />

                {/* Botones */}
                <div className="d-flex gap-2">
                  <Button variant="info" type="submit" size="lg">
                    ✅ Crear Nivel
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
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
