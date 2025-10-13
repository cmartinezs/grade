"use client";

import { Container, Row, Col, Badge, Card } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import LoadingLink from '@/components/LoadingLink';
import { useAuth } from '@/contexts/AuthContext';

export default function PublicHome() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: '🧭',
      title: 'Organización por Categorías',
      description: 'Agrupa y filtra preguntas por asignatura, nivel y etiquetas.'
    },
    {
      icon: '🔁',
      title: 'Importación y Exportación',
      description: 'Importa desde Excel/CSV y exporta en formatos compatibles con LMS.'
    },
    {
      icon: '🤝',
      title: 'Colaboración',
      description: 'Trabaja en conjunto con coautores y revisiones por pares.'
    },
    {
      icon: '⚙️',
      title: 'Generador de Evaluaciones',
      description: 'Crea exámenes automáticos a partir de criterios y plantillas.'
    },
    {
      icon: '🔒',
      title: 'Control de Acceso',
      description: 'Permisos por roles y seguridad en los datos institucionales.'
    },
    {
      icon: '📈',
      title: 'Estadísticas',
      description: 'Métricas sobre desempeño y uso para mejorar la calidad de las pruebas.'
    }
  ];

  return (
    <PageWrapper>
      <NavigationBar />

      {/* Hero */}
      <div className="bg-primary text-white">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-3">
                Revoluciona las
                <span className="text-warning"> evaluaciones</span>
              </h1>
              <p className="lead mb-4">
                GRADE es la plataforma que facilita la creación, organización y aplicación de evaluaciones.
                Ahorra tiempo y mejora la calidad educativa con herramientas diseñadas para docentes.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                {!isAuthenticated ? (
                  <>
                    <LoadingLink href="/auth/register" className="btn btn-warning btn-lg px-4" loadingMessage="Preparando registro...">
                      🚀 Comenzar Gratis
                    </LoadingLink>
                    <LoadingLink href="/public/features" className="btn btn-outline-light btn-lg px-4" loadingMessage="Cargando características...">
                      📋 Ver Características
                    </LoadingLink>
                  </>
                ) : (
                  <>
                    <LoadingLink href="/questions-bank" className="btn btn-warning btn-lg px-4" loadingMessage="Accediendo al dashboard...">
                      📚 Ir al Dashboard
                    </LoadingLink>
                    <LoadingLink href="/questions-bank/create" className="btn btn-outline-light btn-lg px-4" loadingMessage="Cargando editor...">
                      ➕ Crear Pregunta
                    </LoadingLink>
                  </>
                )}
              </div>

              <div className="mt-4">
                <small className="opacity-75">⭐ Más de 500 docentes confían en GRADE • 🎓 Avalado por instituciones</small>
              </div>
            </Col>

            <Col lg={6} className="text-center mt-4 mt-lg-0">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="mb-0">Dashboard de Evaluaciones</h6>
                      <small className="text-muted">Vista en tiempo real</small>
                    </div>
                    <div className="fs-3">📊</div>
                  </div>

                  <Row className="text-center">
                    <Col>
                      <div className="h4 text-primary mb-0">847</div>
                      <small>Preguntas</small>
                    </Col>
                    <Col>
                      <div className="h4 text-success mb-0">23</div>
                      <small>Evaluaciones</small>
                    </Col>
                    <Col>
                      <div className="h4 text-warning mb-0">156</div>
                      <small>Estudiantes</small>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features */}
      <Container className="py-5">
        <Row className="text-center mb-4">
          <Col>
            <Badge bg="primary" className="mb-2 px-3 py-2">¿Por qué GRADE?</Badge>
            <h2 className="display-5 fw-bold">Todo lo que necesitas en una plataforma</h2>
            <p className="lead text-muted">Herramientas pensadas para docentes y coordinadores.</p>
          </Col>
        </Row>

        <Row className="g-4">
          {features.map((f, idx) => (
            <Col key={idx} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="fs-1 mb-3">{f.icon}</div>
                  <Card.Title className="h5">{f.title}</Card.Title>
                  <Card.Text className="text-muted">{f.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Testimonials + CTA */}
      <div className="bg-light py-5">
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h3>Lo que dicen los docentes</h3>
              <p className="text-muted">Historias reales de mejoras en eficiencia y calidad de evaluaciones.</p>
            </Col>
          </Row>

          <Row className="g-4 mb-4">
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <p className="mb-3">“GRADE nos permitió reducir el tiempo de preparación de exámenes en 70%.”</p>
                  <div className="text-muted">— María López, Coordinadora Académica</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <p className="mb-3">“La colaboración entre docentes y las estadísticas son una diferencia clave.”</p>
                  <div className="text-muted">— Carlos Peña, Profesor de Matemáticas</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <p className="mb-3">“Fácil de usar y con opciones de exportación a nuestro LMS.”</p>
                  <div className="text-muted">— Ana Torres, Jefa de Tecnología Educativa</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className="text-center">
              <h4 className="mb-3">¿Listo para mejorar tus evaluaciones?</h4>
              <div className="d-flex justify-content-center gap-3">
                <LoadingLink href="/auth/register" className="btn btn-warning btn-lg" loadingMessage="Preparando registro...">🚀 Crear cuenta</LoadingLink>
                <LoadingLink href="/public/features" className="btn btn-outline-secondary btn-lg" loadingMessage="Cargando características...">📋 Ver características</LoadingLink>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PageWrapper>
  );
}
