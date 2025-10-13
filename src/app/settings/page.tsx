'use client'

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <NavigationBar />
        
        <Container className="mt-4">
          <Row>
            <Col>
              <h1>Configuración</h1>
              <p className="text-muted">Ajusta las preferencias de tu cuenta</p>
              
              <Card>
                <Card.Body>
                  <h5>⚙️ Configuración General</h5>
                  <p>Personaliza tu experiencia en Grade Question Bank.</p>
                  <Button variant="primary">💾 Guardar Cambios</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}