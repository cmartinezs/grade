'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageWrapper from '@/components/PageWrapper';
import { CourseBulkGeneratorForm } from '@/components/CourseBulkGeneratorForm';

export default function BulkGeneratePage() {
  const [coursesCreated, setCoursesCreated] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = (count: number) => {
    setCoursesCreated(count);
    setShowSuccess(true);
  };

  const handleCreateMore = () => {
    setShowSuccess(false);
    setCoursesCreated(0);
  };

  return (
    <ProtectedRoute>
      <PageWrapper>
        <Container fluid className="py-5">
          <Row className="mb-5">
            <Col lg={10} className="mx-auto">
              <div className="mb-5">
                <h1 className="mb-2">
                  <span style={{ fontSize: '2.5rem' }}>⚡</span> Generación Masiva de Cursos
                </h1>
                <p className="text-muted mb-0">
                  Crea múltiples cursos de una sola vez combinando niveles educacionales y secciones de letras
                </p>
              </div>

              <Card className="shadow-sm border-0">
                <Card.Body className="p-5">
                  {!showSuccess ? (
                    <>
                      <div className="mb-5">
                        <h4 className="mb-3">📋 Configurar Generación</h4>
                        <p className="text-muted">
                          Completa los campos para generar los cursos. Por ejemplo:
                          si seleccionas 3 niveles y 2 letras, se crearán 6 cursos
                          (3 niveles × 2 letras = 6).
                        </p>
                      </div>

                      <CourseBulkGeneratorForm
                        onSuccess={handleSuccess}
                        showSummary={true}
                      />
                    </>
                  ) : (
                    <div className="text-center py-5">
                      <div className="mb-4">
                        <span style={{ fontSize: '4rem' }}>✅</span>
                      </div>
                      <h3 className="mb-3">¡Éxito!</h3>
                      <p className="text-muted mb-4">
                        Se han creado <strong>{coursesCreated}</strong> cursos exitosamente
                      </p>

                      <div className="d-flex gap-3 justify-content-center">
                        <Button
                          variant="primary"
                          size="lg"
                          href="/evaluation-management/courses"
                        >
                          Ver Cursos Creados →
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="lg"
                          onClick={handleCreateMore}
                        >
                          Generar Más Cursos
                        </Button>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* Información adicional */}
              <Card className="mt-5 bg-light border-0">
                <Card.Body>
                  <h5 className="mb-3">💡 Cómo funciona</h5>
                  <ul className="mb-0">
                    <li>
                      <strong>Institución:</strong> Nombre de la escuela o colegio
                    </li>
                    <li>
                      <strong>Letras:</strong> Cantidad de secciones (A, B, C...). Máximo 26
                    </li>
                    <li>
                      <strong>Niveles:</strong> Selecciona uno o más niveles educacionales
                    </li>
                    <li>
                      Los cursos se nombrarán automáticamente (ej: &quot;4° Medio A&quot;, &quot;4° Medio B&quot;)
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}
