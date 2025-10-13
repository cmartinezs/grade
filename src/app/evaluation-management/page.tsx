"use client"

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function EvaluationManagementPage() {
  return (
    <ProtectedRoute>
      <Container className="mt-4">
          <Row>
            <Col>
              <h1>Mis Evaluaciones</h1>
              <p className="text-muted">Gestiona y crea evaluaciones basadas en tus preguntas</p>
              
              <Card>
                <Card.Body>
                  <h5>📝 Evaluaciones Recientes</h5>
                  <p>Aquí verás todas tus evaluaciones creadas y podrás administrarlas.</p>
                  <Button variant="primary">➕ Crear Nueva Evaluación</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    </ProtectedRoute>
  );
}
