'use client'

import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';

export default function PricingPage() {
  const plans = [
    {
      name: "Básico",
      price: "Gratis",
      period: "para siempre",
      description: "Perfect para profesores individuales",
      features: [
        "Hasta 100 preguntas",
        "5 categorías",
        "Exportación básica",
        "Soporte por email",
        "1 usuario"
      ],
      limitations: [
        "Sin colaboración",
        "Sin estadísticas avanzadas"
      ],
      buttonText: "Comenzar Gratis",
      buttonVariant: "outline-primary",
      popular: false
    },
    {
      name: "Profesional",
      price: "$19",
      period: "/mes",
      description: "Ideal para instituciones pequeñas",
      features: [
        "Hasta 5,000 preguntas",
        "Categorías ilimitadas",
        "Colaboración hasta 5 usuarios",
        "Estadísticas avanzadas",
        "Exportación completa",
        "Backup automático",
        "Soporte prioritario",
        "Plantillas personalizadas"
      ],
      limitations: [],
      buttonText: "Prueba 14 días gratis",
      buttonVariant: "primary",
      popular: true
    },
    {
      name: "Institucional",
      price: "$49",
      period: "/mes",
      description: "Para universidades y colegios grandes",
      features: [
        "Preguntas ilimitadas",
        "Usuarios ilimitados",
        "API completa",
        "Integración LMS",
        "SSO (Single Sign-On)",
        "Reportes personalizados",
        "Soporte 24/7",
        "Consultor dedicado",
        "Branding personalizado",
        "SLA garantizado"
      ],
      limitations: [],
      buttonText: "Contactar Ventas",
      buttonVariant: "success",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "¿Puedo cambiar de plan en cualquier momento?",
      answer: "Sí, puedes actualizar o degradar tu plan cuando lo desees. Los cambios se aplicarán en el siguiente ciclo de facturación."
    },
    {
      question: "¿Hay descuentos para instituciones educativas?",
      answer: "Ofrecemos descuentos especiales del 20-50% para instituciones educativas sin fines de lucro. Contáctanos para más información."
    },
    {
      question: "¿Qué incluye el período de prueba?",
      answer: "La prueba gratuita de 14 días incluye acceso completo al plan Profesional sin restricciones."
    },
    {
      question: "¿Mis datos están seguros?",
      answer: "Sí, utilizamos cifrado de grado militar y realizamos backups diarios. Cumplimos con GDPR y estándares internacionales de seguridad."
    }
  ];

  return (
    <>
      <NavigationBar />
      
      <Container className="mt-5">
        {/* Hero Section */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h1 className="display-4 mb-4">Precios Simples y Transparentes</h1>
              <p className="lead">
                Elige el plan que mejor se adapte a tus necesidades. Todos incluyen soporte y actualizaciones.
              </p>
            </div>
          </Col>
        </Row>

        {/* Planes */}
        <Row className="mb-5">
          {plans.map((plan, index) => (
            <Col key={index} lg={4} className="mb-4">
              <Card className={`h-100 ${plan.popular ? 'border-primary shadow' : ''} position-relative`}>
                {plan.popular && (
                  <div className="position-absolute top-0 start-50 translate-middle">
                    <Badge bg="primary" className="px-3 py-2">
                      🌟 Más Popular
                    </Badge>
                  </div>
                )}
                
                <Card.Body className="text-center">
                  <h3 className="card-title">{plan.name}</h3>
                  <div className="my-4">
                    <span className="display-4 fw-bold">{plan.price}</span>
                    <span className="text-muted">{plan.period}</span>
                  </div>
                  <p className="text-muted">{plan.description}</p>
                  
                  <Button 
                    variant={plan.buttonVariant} 
                    size="lg" 
                    className="w-100 mb-4"
                  >
                    {plan.buttonText}
                  </Button>
                </Card.Body>
                
                <ListGroup variant="flush">
                  {plan.features.map((feature, idx) => (
                    <ListGroup.Item key={idx} className="border-0 py-2">
                      <span className="text-success me-2">✓</span>
                      {feature}
                    </ListGroup.Item>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <ListGroup.Item key={idx} className="border-0 py-2 text-muted">
                      <span className="text-danger me-2">✗</span>
                      {limitation}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Garantía */}
        <Row className="mb-5">
          <Col>
            <Card className="bg-light">
              <Card.Body className="text-center py-4">
                <h4>🛡️ Garantía de Satisfacción de 30 Días</h4>
                <p className="mb-0">
                  Si no estás completamente satisfecho con nuestro servicio, 
                  te devolvemos el 100% de tu dinero, sin preguntas.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Comparación Detallada */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-center mb-4">📋 Comparación Detallada</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>Funcionalidad</th>
                    <th className="text-center">Básico</th>
                    <th className="text-center">Profesional</th>
                    <th className="text-center">Institucional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Número de preguntas</td>
                    <td className="text-center">100</td>
                    <td className="text-center">5,000</td>
                    <td className="text-center">Ilimitado</td>
                  </tr>
                  <tr>
                    <td>Usuarios simultáneos</td>
                    <td className="text-center">1</td>
                    <td className="text-center">5</td>
                    <td className="text-center">Ilimitado</td>
                  </tr>
                  <tr>
                    <td>Almacenamiento</td>
                    <td className="text-center">500 MB</td>
                    <td className="text-center">10 GB</td>
                    <td className="text-center">Ilimitado</td>
                  </tr>
                  <tr>
                    <td>Soporte técnico</td>
                    <td className="text-center">Email</td>
                    <td className="text-center">Email + Chat</td>
                    <td className="text-center">24/7 Dedicado</td>
                  </tr>
                  <tr>
                    <td>API Access</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">Básico</td>
                    <td className="text-center">Completo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>

        {/* FAQ */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-center mb-4">❓ Preguntas Frecuentes</h3>
            {faqs.map((faq, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title className="h6">{faq.question}</Card.Title>
                  <Card.Text className="text-muted mb-0">
                    {faq.answer}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>

        {/* CTA Final */}
        <Row>
          <Col>
            <Card className="bg-primary text-white text-center">
              <Card.Body className="py-5">
                <h3>¿Listo para comenzar?</h3>
                <p className="lead">
                  Únete a más de 1,000 instituciones que ya confían en nosotros
                </p>
                <Button variant="light" size="lg" className="me-3">
                  Comenzar Prueba Gratuita
                </Button>
                <Button variant="outline-light" size="lg">
                  Agendar Demo
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}