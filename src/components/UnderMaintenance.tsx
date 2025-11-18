import { Container, Row, Col, Card } from 'react-bootstrap';

interface UnderMaintenanceProps {
  title?: string;
  message?: string;
  estimatedTime?: string;
}

export default function UnderMaintenance({
  title = "Estamos mejorando esta sección",
  message = "Nuestro equipo está trabajando en nuevas funcionalidades para brindarte una mejor experiencia. Esta página estará disponible muy pronto.",
  estimatedTime
}: UnderMaintenanceProps) {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8} xl={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5 text-center">
              <div className="mb-4">
                <div className="text-primary" style={{ fontSize: '4rem', opacity: 0.8 }}>
                  🔧
                </div>
              </div>
              
              <h2 className="fw-bold mb-3 text-dark">{title}</h2>
              
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                {message}
              </p>

              {estimatedTime && (
                <div className="alert alert-info border-0 bg-light d-inline-block">
                  <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🚀</span>
                  <span className="fw-semibold">Disponible: {estimatedTime}</span>
                </div>
              )}

              <div className="mt-5 pt-4 border-top">
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                  Gracias por tu paciencia mientras trabajamos en mejorar tu experiencia
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
