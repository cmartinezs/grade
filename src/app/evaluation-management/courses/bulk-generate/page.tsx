'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageWrapper from '@/components/PageWrapper';
import { CourseBulkGeneratorForm } from '@/app/evaluation-management/courses/bulk-generate/CourseBulkGeneratorForm';
import { BulkGenerateHelp } from '@/app/evaluation-management/courses/bulk-generate/BulkGenerateHelp';
import { useRouter } from 'next/navigation';
import { useHelpContent } from '@/contexts/HelpContext';

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
        <Container fluid className="py-4" style={{ position: 'relative' }}>
          {showSuccess && (
            <Row className="mb-4">
              <Col>
                <Alert variant="success" dismissible>
                  ✅ Se crearon <strong>{coursesCreated}</strong> cursos exitosamente. Redirigiendo...
                </Alert>
              </Col>
            </Row>
          )}

          {/* Contenido principal */}
          <Row>
            <Col lg={12}>
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
