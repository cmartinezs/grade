'use client';

import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h2 className="mb-3">Configuración del Banco de Preguntas</h2>
        
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header className="bg-light">
                <h6 className="mb-0">Preferencias Generales</h6>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Preguntas por página</Form.Label>
                  <Form.Select>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Mostrar preguntas retiradas por defecto"
                    defaultChecked={true}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Habilitar búsqueda avanzada"
                    defaultChecked={false}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Header className="bg-light">
                <h6 className="mb-0">Privacidad</h6>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Permitir compartir preguntas"
                    defaultChecked={true}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Permitir descargas"
                    defaultChecked={true}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mt-4">
          <Button variant="primary" className="me-2">
            💾 Guardar Cambios
          </Button>
          <Button variant="outline-secondary" href="/questions-bank">
            ← Volver
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
