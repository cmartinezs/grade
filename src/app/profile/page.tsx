'use client'

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <NavigationBar />
        
        <Container className="mt-4">
          <Row>
            <Col>
              <h1>Mi Perfil</h1>
              <p className="text-muted">Gestiona tu información personal y preferencias</p>
              
              <Card>
                <Card.Body>
                  <h5>👤 Información Personal</h5>
                  <p>Aquí podrás editar tu información personal, cambiar tu contraseña y configurar tus preferencias.</p>
                  <Button variant="primary">✏️ Editar Perfil</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}