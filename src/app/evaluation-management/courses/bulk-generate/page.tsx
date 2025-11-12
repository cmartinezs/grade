'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageWrapper from '@/components/PageWrapper';
import { CourseBulkGeneratorForm } from '@/app/evaluation-management/courses/bulk-generate/CourseBulkGeneratorForm';
import { useRouter } from 'next/navigation';

export default function BulkGeneratePage() {
  const router = useRouter();
  const [coursesCreated, setCoursesCreated] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = (count: number) => {
    setCoursesCreated(count);
    setShowSuccess(true);
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      router.push('/evaluation-management/courses');
    }, 2000);
  };

  return (
    <ProtectedRoute>
      <PageWrapper>
        <Container fluid className="py-4">
          {showSuccess && (
            <Row className="mb-4">
              <Col>
                <Alert variant="success" dismissible>
                  ✅ Se crearon <strong>{coursesCreated}</strong> cursos exitosamente. Redirigiendo...
                </Alert>
              </Col>
            </Row>
          )}

          <Row>
            {/* Información y reglas a la izquierda */}
            <Col lg={4} className="mb-4">
              <Card className="h-100 border-success border-2">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">ℹ️ Generación Masiva</h5>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted mb-4">
                    Crea múltiples cursos de una sola vez combinando niveles educacionales y secciones de letras.
                  </p>
                  
                  <div className="mb-4">
                    <h6 className="fw-bold mb-2">📋 Cómo Funciona</h6>
                    <div className="small">
                      <p className="mb-2">
                        <strong>Institución:</strong>
                        <br />
                        <span className="text-muted">Nombre de tu escuela o colegio</span>
                      </p>
                      <p className="mb-2">
                        <strong>Letras:</strong>
                        <br />
                        <span className="text-muted">Número de secciones (A, B, C... máx 26)</span>
                      </p>
                      <p>
                        <strong>Niveles:</strong>
                        <br />
                        <span className="text-muted">Selecciona uno o más niveles educacionales</span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold mb-2">🧮 Cálculo</h6>
                    <ul className="small mb-0">
                      <li>3 niveles × 2 letras = 6 cursos</li>
                      <li>8 niveles × 5 letras = 40 cursos</li>
                      <li>Los nombres se generan automáticamente</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold mb-2">✨ Ejemplos de Nombres</h6>
                    <div className="small text-muted bg-light p-2 rounded">
                      <p className="mb-1">&quot;4° Medio A&quot;</p>
                      <p className="mb-1">&quot;1° Básico B&quot;</p>
                      <p className="mb-0">&quot;2° Medio C&quot;</p>
                    </div>
                  </div>

                  <div className="alert alert-info small mb-0">
                    <strong>⚡ Tip:</strong> Puedes crear más cursos en cualquier momento
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Formulario a la derecha */}
            <Col lg={8}>
              <Card className="border-success border-2">
                <Card.Header className="bg-success text-white">
                  <h4 className="mb-0">⚡ Generar Cursos</h4>
                </Card.Header>
                <Card.Body>
                  {!showSuccess ? (
                    <CourseBulkGeneratorForm
                      onSuccess={handleSuccess}
                      showSummary={false}
                      compact={true}
                    />
                  ) : null}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}
