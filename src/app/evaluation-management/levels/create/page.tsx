'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { levelStore } from '@/lib/levelStore';
import { CHILEAN_EDUCATION_LEVELS } from '@/types/level';

export default function CreateLevelPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
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

  const handleSelectPredefined = (levelName: string) => {
    const predefined = CHILEAN_EDUCATION_LEVELS.find(l => l.name === levelName);
    if (predefined) {
      setFormData({
        name: predefined.name,
        code: predefined.code,
        description: `Nivel educacional: ${predefined.name}`,
        isActive: true,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar campos obligatorios
    if (!formData.name || !formData.code) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    try {
      levelStore.createLevel({
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
      setError(err instanceof Error ? err.message : 'Error al crear nivel');
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-2">➕ Crear Nuevo Nivel Educacional</h1>
          <p className="text-muted">Completa el formulario para crear un nuevo nivel</p>
        </Col>
      </Row>

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
        <Col lg={8} className="mx-auto">
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Selector de Niveles Predefinidos */}
                <Form.Group className="mb-4 p-3 bg-light rounded">
                  <Form.Label className="fw-bold mb-3">
                    📚 Usar Nivel Predefinido (Chile)
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {CHILEAN_EDUCATION_LEVELS.map((level) => (
                      <Button
                        key={level.code}
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleSelectPredefined(level.name)}
                        className="mb-2"
                      >
                        {level.name}
                      </Button>
                    ))}
                  </div>
                  <Form.Text className="text-muted d-block mt-2">
                    Haz clic en un nivel para autocompletar el formulario
                  </Form.Text>
                </Form.Group>

                <hr className="my-4" />

                {/* Nombre */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Nombre del Nivel <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Ej: 1° Básico, 1° Medio, etc."
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Nombre descriptivo del nivel educacional
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
                    placeholder="Ej: LEVEL_1B, LEVEL_1M, etc."
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Código único para identificar el nivel (sin espacios)
                  </Form.Text>
                </Form.Group>

                {/* Descripción */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    placeholder="Describe el propósito y características de este nivel"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Descripción opcional del nivel
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
                    Marca esta opción para activar el nivel inmediatamente
                  </Form.Text>
                </Form.Group>

                {/* Botones */}
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit">
                    ✅ Crear Nivel
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

      {/* Info Box */}
      <Row className="mt-4">
        <Col lg={8} className="mx-auto">
          <Card className="bg-light border-0">
            <Card.Body>
              <h6 className="mb-3">💡 Información:</h6>
              <ul className="mb-0">
                <li>Los niveles predefinidos corresponden al sistema educacional chileno</li>
                <li>Usa códigos descriptivos y consistentes (Ej: LEVEL_1B, LEVEL_1M, etc.)</li>
                <li>Los niveles activos estarán disponibles para asignar a cursos</li>
                <li>Puedes editar o desactivar los niveles después de crearlos</li>
                <li>Los niveles coinciden automáticamente con los cursos asignados</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
