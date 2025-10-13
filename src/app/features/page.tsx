'use client'

import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';

export default function FeaturesPage() {
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
      icon: "📊",
      title: "Generación Automática de Exámenes",
      description: "Crea evaluaciones basadas en criterios específicos y balance de dificultad",
      category: "Evaluaciones"
    },
    {
      icon: "📈",
      title: "Estadísticas y Analytics",
      description: "Reportes detallados de uso, rendimiento y análisis de preguntas",
      category: "Analytics"
    },
    {
      icon: "👥",
      title: "Colaboración en Equipo",
      description: "Trabajo colaborativo entre profesores, revisión por pares y permisos granulares",
      category: "Colaboración"
    },
    {
      icon: "📤",
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
      icon: "📱",
      title: "Acceso Multiplataforma",
      description: "Funciona perfectamente en computadoras, tablets y móviles",
      category: "Accesibilidad"
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

  const categories = [...new Set(features.map(f => f.category))];

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

        {/* Características por Categoría */}
        {categories.map(category => (
          <div key={category} className="mb-5">
            <h3 className="mb-4">
              <Badge bg="primary" className="me-2">{category}</Badge>
            </h3>
            
            <Row>
              {features
                .filter(feature => feature.category === category)
                .map((feature, index) => (
                  <Col key={index} md={6} lg={4} className="mb-4">
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Body>
                        <div className="text-center mb-3">
                          <span style={{ fontSize: '3rem' }}>{feature.icon}</span>
                        </div>
                        <Card.Title className="h5 text-center">
                          {feature.title}
                        </Card.Title>
                        <Card.Text className="text-muted text-center">
                          {feature.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ))}

        {/* Próximamente */}
        <Row className="mt-5">
          <Col>
            <Card className="bg-gradient" style={{ background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' }}>
              <Card.Body className="text-white text-center py-5">
                <h3>🚀 Próximamente</h3>
                <p className="lead">
                  Estamos trabajando en funcionalidades aún más avanzadas
                </p>
                <Row className="mt-4">
                  <Col md={3}>
                    <h5>🤖 IA Generativa</h5>
                    <p>Generación automática de preguntas usando inteligencia artificial</p>
                  </Col>
                  <Col md={3}>
                    <h5>📊 Dashboard Avanzado</h5>
                    <p>Métricas en tiempo real y visualizaciones interactivas</p>
                  </Col>
                  <Col md={3}>
                    <h5>🔌 API Completa</h5>
                    <p>Integración con sistemas LMS y plataformas educativas</p>
                  </Col>
                  <Col md={3}>
                    <h5>📚 Biblioteca Pública</h5>
                    <p>Compartir y acceder a preguntas de la comunidad educativa</p>
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