'use client'

import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';

export default function PublicFeatures() {
  const features = [
    {
      icon: "📝",
      title: "Múltiples Tipos de Preguntas",
      description: "Opción múltiple, verdadero/falso, respuesta corta, ensayo, matching y más",
      category: "Creación"
    },
    {
      icon: "🏷️",
      title: "Sistema de Categorías Avanzado",
      description: "Organiza por materia, tema, dificultad, competencia y etiquetas personalizadas",
      category: "Organización"
    },
    {
      icon: "🔍",
      title: "Búsqueda Inteligente",
      description: "Encuentra preguntas usando filtros múltiples y búsqueda por texto completo",
      category: "Búsqueda"
    },
    {
      icon: "",
      title: "Importación/Exportación",
      description: "Soporta múltiples formatos: Excel, CSV, QTI, Word y más",
      category: "Integración"
    },
    {
      icon: "🔒",
      title: "Seguridad y Backup",
      description: "Cifrado de datos, backups automáticos y control de acceso robusto",
      category: "Seguridad"
    },
    {
      icon: "⚡",
      title: "Rendimiento Optimizado",
      description: "Búsquedas rápidas incluso con miles de preguntas en el banco",
      category: "Performance"
    },
    {
      icon: "🎨",
      title: "Editor Rich Text",
      description: "Formato de texto, fórmulas matemáticas, imágenes y multimedia",
      category: "Creación"
    },
    {
      icon: "📋",
      title: "Plantillas Personalizables",
      description: "Crea plantillas de exámenes reutilizables con tu branding institucional",
      category: "Personalización"
    }
  ];

  

  return (
    <PageWrapper>
      <NavigationBar />
      
      <Container className="mt-5">
        {/* Hero Section */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h1 className="display-4 mb-4">Características Completas</h1>
              <p className="lead">
                Todo lo que necesitas para gestionar tu banco de preguntas de manera profesional
              </p>
            </div>
          </Col>
        </Row>

        {/* Características: grilla única con badge de categoría */}
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0 position-relative">
                <Badge bg="secondary" className="position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>{feature.category}</Badge>
                <Card.Body className="pt-4 text-center">
                  <div className="mb-3" style={{ fontSize: '2.5rem' }}>{feature.icon}</div>
                  <Card.Title className="h5">{feature.title}</Card.Title>
                  <Card.Text className="text-muted">{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Próximamente (mejor contraste) */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-dark text-center py-5" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
                <h3>🚀 Próximamente</h3>
                <p className="lead text-muted">
                  Estamos trabajando en funcionalidades aún más avanzadas
                </p>
                <Row className="mt-4">
                  <Col md={4} className="mb-3">
                    <h5>🤖 IA Generativa</h5>
                    <p className="text-muted">Generación automática de preguntas usando inteligencia artificial</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <h5>📊 Dashboard Avanzado</h5>
                    <p className="text-muted">Métricas en tiempo real y visualizaciones interactivas</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <h5>🔌 API Completa</h5>
                    <p className="text-muted">Integración con sistemas LMS y plataformas educativas</p>
                  </Col>

                  <Col md={4} className="mb-3">
                    <h5>📚 Biblioteca Pública</h5>
                    <p className="text-muted">Compartir y acceder a preguntas de la comunidad educativa</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <h5>📊 Generación Automática de Exámenes</h5>
                    <p className="text-muted">Crea evaluaciones basadas en criterios y balance de dificultad</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <h5>📈 Estadísticas y Analytics</h5>
                    <p className="text-muted">Reportes detallados de uso, rendimiento y análisis de preguntas</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <h5>👥 Colaboración en Equipo</h5>
                    <p className="text-muted">Trabajo colaborativo entre profesores, revisión por pares y permisos granulares</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <h5>📱 Acceso Multiplataforma</h5>
                    <p className="text-muted">Funciona perfectamente en computadoras, tablets y móviles</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <h5>🎨 Editor Rich Text</h5>
                    <p className="text-muted">Formato de texto rico con soporte para fórmulas e imágenes</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Comparación */}
        <Row className="mt-5">
          <Col>
            <h3 className="text-center mb-4">📊 ¿Por qué elegir Grade Question Bank?</h3>
            <Card>
              <Card.Body>
                <Row className="text-center">
                  <Col md={4}>
                    <h5 className="text-success">✅ Con Nosotros</h5>
                    <ul className="list-unstyled mt-3">
                      <li>✓ Gestión centralizada</li>
                      <li>✓ Colaboración en equipo</li>
                      <li>✓ Búsqueda avanzada</li>
                      <li>✓ Estadísticas detalladas</li>
                      <li>✓ Backup automático</li>
                      <li>✓ Soporte especializado</li>
                    </ul>
                  </Col>
                  
                  <Col md={4}>
                    <h5 className="text-warning">⚠️ Métodos Tradicionales</h5>
                    <ul className="list-unstyled mt-3">
                      <li>⚠️ Archivos dispersos</li>
                      <li>⚠️ Trabajo aislado</li>
                      <li>⚠️ Búsqueda manual</li>
                      <li>⚠️ Sin métricas</li>
                      <li>⚠️ Riesgo de pérdida</li>
                      <li>⚠️ Sin soporte</li>
                    </ul>
                  </Col>
                  
                  <Col md={4}>
                    <h5 className="text-info">📈 Beneficios</h5>
                    <ul className="list-unstyled mt-3">
                      <li>🚀 80% menos tiempo</li>
                      <li>🎯 Mayor precisión</li>
                      <li>👥 Mejor colaboración</li>
                      <li>📊 Decisiones informadas</li>
                      <li>🔒 Total seguridad</li>
                      <li>💡 Innovación constante</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
}
