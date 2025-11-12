'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { levelStore } from '@/lib/levelStore';
import CategoryFormFields from '@/app/evaluation-management/categories/CategoryFormFields';

function EditCategoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryIdParam = searchParams.get('id');

  // Validate ID (now as string)
  const categoryId = categoryIdParam ? categoryIdParam : null;
  const isValidId = categoryId !== null && categoryId.length > 0;

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
      setError('ID de categoría no válido');
      setLoading(false);
      return;
    }

    const category = levelStore.getCategoryById(categoryId);
    if (!category) {
      setError('Categoría no encontrada');
      setLoading(false);
      return;
    }

    setFormData({
      name: category.name,
      code: category.code,
      description: category.description,
      isActive: category.isActive,
    });
    setLoading(false);
  }, [isValidId, categoryId]);

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
    
    if (!isValidId) {
      setError('ID de categoría no válido');
      return;
    }

    // Validar campos obligatorios
    if (!formData.name || !formData.code) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    try {
      levelStore.updateCategory(categoryId, {
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
      setError(err instanceof Error ? err.message : 'Error al actualizar categoría');
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <p className="text-muted">Cargando categoría...</p>
        </div>
      </Container>
    );
  }

  if (error && !submitted) {
    return (
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="mb-2">✏️ Editar Categoría</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={8} className="mx-auto">
            <Alert variant="danger">
              ❌ {error}
            </Alert>
            <Button
              variant="outline-secondary"
              onClick={() => router.push('/evaluation-management/categories')}
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
              ✅ Categoría actualizada exitosamente. Redirigiendo...
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
                Edita los datos de la categoría <strong>{formData.name}</strong>
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
                    <span className="text-muted">Identificador único (ej: PRIM, SEC)</span>
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-2">💡 Consejos</h6>
                <ul className="small mb-0">
                  <li>Mantén nombres claros y consistentes</li>
                  <li>Los cambios se aplican inmediatamente</li>
                  <li>Puedes desactivar la categoría si es necesario</li>
                  <li>Los niveles asociados se mantienen intactos</li>
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
          <Card className="border-primary border-2">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">✏️ Editar Categoría</h4>
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
                    ✅ Guardar Cambios
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
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

export default function EditCategoryPage() {
  return (
    <Suspense fallback={<Container className="py-4"><p>Cargando...</p></Container>}>
      <EditCategoryContent />
    </Suspense>
  );
}
