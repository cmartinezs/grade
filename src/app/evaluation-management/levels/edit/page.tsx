'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { levelStore } from '@/lib/levelStore';
import LevelFormFields from '@/components/LevelFormFields';

function EditLevelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelIdParam = searchParams.get('id');
  
  // Parse and validate ID once
  const levelIdNumber = levelIdParam ? parseInt(levelIdParam, 10) : null;
  const isValidId = levelIdNumber !== null && !isNaN(levelIdNumber);

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
    if (!isValidId) {
      setError('ID de nivel no válido');
      setLoading(false);
      return;
    }

    const level = levelStore.getLevelById(levelIdNumber);
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
  }, [isValidId, levelIdNumber]);

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
    
    if (!isValidId) {
      setError('ID de nivel no válido');
      return;
    }

    // Validar campos obligatorios
    if (!formData.name || !formData.code) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    try {
      levelStore.updateLevel(levelIdNumber, {
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
    <Container fluid className="py-4">
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
        {/* Información a la izquierda */}
        <Col lg={4} className="mb-4">
          <Card className="h-100 border-info border-2">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">ℹ️ Información</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">
                Edita los datos del nivel <strong>{formData.name}</strong>
              </p>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-2">📋 Datos Requeridos</h6>
                <div className="small">
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
                  <li>Mantén la nomenclatura consistente</li>
                  <li>Los cambios se aplican inmediatamente</li>
                  <li>Puedes desactivar el nivel si es necesario</li>
                  <li>Los cursos asociados se mantienen intactos</li>
                </ul>
              </div>

              <div className="alert alert-info small mb-0">
                <strong>✨ Tip:</strong> Los cambios se guardan después de confirmar
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulario a la derecha */}
        <Col lg={8}>
          <Card className="border-info border-2">
            <Card.Header className="bg-info text-white">
              <h4 className="mb-0">✏️ Editar Nivel</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <LevelFormFields
                  formData={formData}
                  onChange={handleChange}
                  onSwitchChange={(isActive) =>
                    setFormData({ ...formData, isActive })
                  }
                  showPredefined={false}
                />

                {/* Botones */}
                <div className="d-flex gap-2">
                  <Button variant="info" type="submit" size="lg">
                    ✅ Guardar Cambios
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

export default function EditLevelPage() {
  return (
    <Suspense fallback={<Container className="py-4"><p>Cargando...</p></Container>}>
      <EditLevelContent />
    </Suspense>
  );
}
