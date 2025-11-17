'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageWrapper from '@/components/PageWrapper';
import { CourseBulkGeneratorForm } from '@/app/evaluation-management/courses/bulk-generate/CourseBulkGeneratorForm';
import { BulkGenerateHelp } from '@/app/evaluation-management/courses/bulk-generate/BulkGenerateHelp';
import { useRouter } from 'next/navigation';
import { useHelpContent } from '@/contexts/HelpContext';
import PageHeader from '@/components/PageHeader';

export default function BulkGeneratePage() {
  const router = useRouter();
  const [coursesCreated, setCoursesCreated] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { setHelpContent } = useHelpContent();

  // Definir el contenido de ayuda cuando la página carga
  useEffect(() => {
    setHelpContent({
      title: 'ℹ️ Generación Masiva',
      children: <BulkGenerateHelp />,
    });

    // Limpiar cuando el componente se desmonta
    return () => setHelpContent(null);
  }, [setHelpContent]);

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
          {/* Alerta de éxito */}
          {showSuccess && (
            <Row className="mb-4">
              <Col>
                <Alert variant="success" dismissible>
                  ✅ Se crearon <strong>{coursesCreated}</strong> cursos exitosamente. Redirigiendo...
                </Alert>
              </Col>
            </Row>
          )}

      <PageHeader
        icon="⚡"
        title="Generación Masiva de Cursos"
        description="Crea múltiples cursos de manera rápida y sencilla"
      />

          {/* Formulario en Card */}
          <Row>
            <Col lg={12}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-primary text-white py-3">
                  <h5 className="mb-0">⚙️ Configuración</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <CourseBulkGeneratorForm
                    onSuccess={handleSuccess}
                    showSummary={false}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}
