'use client'

import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import LoadingLink from '@/components/LoadingLink';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <PageWrapper>
      <NavigationBar />

      {/* Hero Section */}
      <div className="bg-primary text-white">
        <Container className="py-5">
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-4">
                Revoluciona tus 
                <span className="text-warning"> Evaluaciones</span>
              </h1>
              <p className="lead mb-4">
                GRADE es la plataforma que transforma la forma en que docentes y coordinadores 
                crean, gestionan y aplican evaluaciones. Automatiza procesos, ahorra tiempo 
                y mejora la calidad educativa.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                {!isAuthenticated ? (
                  <>
                    <LoadingLink 
                      href="/auth/register" 
                      className="btn btn-warning btn-lg px-4"
                      loadingMessage="Preparando registro..."
                    >
                      🚀 Comenzar Gratis
                    </LoadingLink>
                    <LoadingLink 
                      href="/features" 
                      className="btn btn-outline-light btn-lg px-4"
                      loadingMessage="Cargando características..."
                    >
                      📋 Ver Características
                    </LoadingLink>
                  </>
                ) : (
                  <>
                    <LoadingLink 
                      href="/questions" 
                      className="btn btn-warning btn-lg px-4"
                      loadingMessage="Accediendo al dashboard..."
                    >
                      📚 Ir al Dashboard
                    </LoadingLink>
                    <LoadingLink 
                      href="/questions/create" 
                      className="btn btn-outline-light btn-lg px-4"
                      loadingMessage="Cargando editor..."
                    >
                      ➕ Crear Pregunta
                    </LoadingLink>
                  </>
                )}
              </div>
              <div className="mt-4">
                <small className="opacity-75">
                  ⭐ Más de 500 docentes confían en GRADE • 🎓 Avalado por instituciones educacionales
                </small>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="position-relative">
                <div className="bg-white rounded shadow-lg p-4 text-dark">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle p-2 me-3">
                      <span className="text-white">📊</span>
                    </div>
                    <div>
                      <h6 className="mb-0">Dashboard de Evaluaciones</h6>
                      <small className="text-muted">Vista en tiempo real</small>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="h4 text-primary mb-0">847</div>
                      <small>Preguntas</small>
                    </div>
                    <div className="col-4">
                      <div className="h4 text-success mb-0">23</div>
                      <small>Evaluaciones</small>
                    </div>
                    <div className="col-4">
                      <div className="h4 text-warning mb-0">156</div>
                      <small>Estudiantes</small>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <Row>
          <Col lg={12} className="text-center mb-5">
            <Badge bg="primary" className="mb-3 px-3 py-2">¿Por qué GRADE?</Badge>
            <h2 className="display-5 fw-bold">Todo lo que necesitas en una plataforma</h2>
            <p className="lead text-muted">Características diseñadas específicamente para educadores</p>
          </Col>
        </Row>
        
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <span className="feature-icon">🏗️</span>
                </div>
                <h5 className="fw-bold">Creación Inteligente</h5>
                <p className="text-muted mb-0">
                  Crea preguntas con IA asistida, templates inteligentes y 
                  sugerencias automáticas basadas en tu contenido.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="text-success mb-3">
                  <span className="feature-icon">📊</span>
                </div>
                <h5 className="fw-bold">Analytics Avanzado</h5>
                <p className="text-muted mb-0">
                  Reportes detallados de rendimiento, análisis de dificultad 
                  y estadísticas que mejoran tus evaluaciones.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <span className="feature-icon">�</span>
                </div>
                <h5 className="fw-bold">Automatización Total</h5>
                <p className="text-muted mb-0">
                  Genera evaluaciones automáticamente, califica al instante 
                  y distribuye resultados sin esfuerzo manual.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <span className="feature-icon">👥</span>
                </div>
                <h5 className="fw-bold">Colaboración Fluida</h5>
                <p className="text-muted mb-0">
                  Comparte bancos de preguntas, colabora con colegas y 
                  construye una biblioteca institucional.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <span className="feature-icon">�</span>
                </div>
                <h5 className="fw-bold">Seguridad Garantizada</h5>
                <p className="text-muted mb-0">
                  Protección de datos avanzada, backup automático y 
                  cumplimiento con estándares educacionales.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <span className="feature-icon">🔒</span>
                </div>
                <h5 className="fw-bold">Rapidez Extrema</h5>
                <p className="text-muted mb-0">
                  Crea una evaluación completa en menos de 5 minutos. 
                  La velocidad que tu institución necesita.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Stats Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="text-center">
            <Col lg={3} md={6} className="mb-4">
              <div className="h2 fw-bold text-primary mb-1">2,500+</div>
              <p className="text-muted mb-0">Preguntas creadas</p>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="h2 fw-bold text-success mb-1">500+</div>
              <p className="text-muted mb-0">Docentes activos</p>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="h2 fw-bold text-info mb-1">1,200+</div>
              <p className="text-muted mb-0">Evaluaciones aplicadas</p>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="h2 fw-bold text-warning mb-1">98%</div>
              <p className="text-muted mb-0">Satisfacción docente</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Testimonials Section */}
      <Container className="py-5">
        <Row>
          <Col lg={12} className="text-center mb-5">
            <Badge bg="success" className="mb-3 px-3 py-2">Testimonios</Badge>
            <h2 className="display-5 fw-bold">Lo que dicen nuestros usuarios</h2>
          </Col>
        </Row>
        
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="text-warning mb-3">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="mb-4">
                  &ldquo;GRADE revolucionó mi forma de evaluar. Lo que antes me tomaba horas 
                  ahora lo hago en minutos. Mis estudiantes también están más motivados.&rdquo;
                </p>
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle p-2 me-3">
                    <span className="text-white">👩‍🏫</span>
                  </div>
                  <div>
                    <div className="fw-bold">María González</div>
                    <small className="text-muted">Profesora de Matemáticas, Liceo Técnico</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="text-warning mb-3">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="mb-4">
                  &ldquo;Como coordinador académico, GRADE me permite tener visibilidad completa 
                  de las evaluaciones institucionales. Los reportes son increíbles.&rdquo;
                </p>
                <div className="d-flex align-items-center">
                  <div className="bg-success rounded-circle p-2 me-3">
                    <span className="text-white">👨‍💼</span>
                  </div>
                  <div>
                    <div className="fw-bold">Carlos Mendoza</div>
                    <small className="text-muted">Coordinador Académico, Universidad Central</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="text-warning mb-3">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="mb-4">
                  &ldquo;La facilidad de uso es impresionante. En 2 semanas ya tenía 
                  mi banco completo de preguntas. No puedo imaginar trabajar sin GRADE.&rdquo;
                </p>
                <div className="d-flex align-items-center">
                  <div className="bg-info rounded-circle p-2 me-3">
                    <span className="text-white">👩‍🔬</span>
                  </div>
                  <div>
                    <div className="fw-bold">Ana Silva</div>
                    <small className="text-muted">Profesora de Ciencias, Colegio San José</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <div className="position-relative cta-section text-white">
        <Container className="py-5 text-center position-relative">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="display-4 fw-bold mb-4 text-white cta-title">
                ¿Listo para transformar tus evaluaciones?
              </h2>
              <p className="lead mb-4 text-white cta-text">
                Únete a cientos de docentes que ya están revolucionando 
                la educación con GRADE. Comienza gratis hoy mismo.
              </p>
              {!isAuthenticated ? (
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <LoadingLink 
                    href="/auth/register" 
                    className="btn btn-warning btn-lg px-5"
                    loadingMessage="Iniciando tu experiencia GRADE..."
                  >
                    🚀 Comenzar Gratis Ahora
                  </LoadingLink>
                  <LoadingLink 
                    href="/pricing" 
                    className="btn btn-outline-light btn-lg px-4"
                    loadingMessage="Cargando planes..."
                  >
                    💰 Ver Precios
                  </LoadingLink>
                </div>
              ) : (
                <LoadingLink 
                  href="/questions" 
                  className="btn btn-warning btn-lg px-5"
                  loadingMessage="Accediendo a tu dashboard..."
                >
                  📚 Continuar en Dashboard
                </LoadingLink>
              )}
              <div className="mt-4">
                <small className="text-white cta-small-text">
                  ✅ Sin compromiso • ✅ Cancelación en cualquier momento • ✅ Soporte 24/7
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PageWrapper>
  );
}
