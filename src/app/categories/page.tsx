'use client'

import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';

// Datos de ejemplo
const sampleCategories = [
  {
    id: 1,
    name: 'Matemáticas',
    description: 'Preguntas relacionadas con álgebra, geometría, cálculo y estadística',
    questionCount: 45,
    color: 'primary'
  },
  {
    id: 2,
    name: 'Historia',
    description: 'Historia universal, de Chile y América Latina',
    questionCount: 32,
    color: 'success'
  },
  {
    id: 3,
    name: 'Biología',
    description: 'Ciencias naturales, anatomía, ecología y genética',
    questionCount: 28,
    color: 'info'
  },
  {
    id: 4,
    name: 'Geografía',
    description: 'Geografía física, política y económica',
    questionCount: 22,
    color: 'warning'
  },
  {
    id: 5,
    name: 'Lenguaje',
    description: 'Comprensión lectora, gramática y literatura',
    questionCount: 38,
    color: 'danger'
  },
  {
    id: 6,
    name: 'Física',
    description: 'Mecánica, termodinámica, óptica y electromagnetismo',
    questionCount: 19,
    color: 'secondary'
  }
];

export default function CategoriesPage() {
  const totalQuestions = sampleCategories.reduce((sum, cat) => sum + cat.questionCount, 0);

  return (
    <PageWrapper>
      <NavigationBar />
      
      <Container className="mt-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1>Categorías</h1>
            <p className="text-muted">
              Organiza tus preguntas por materias y temas. Total: {totalQuestions} preguntas
            </p>
          </Col>
          <Col xs="auto">
            <Button variant="primary">
              ➕ Nueva Categoría
            </Button>
          </Col>
        </Row>

        {/* Búsqueda */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Buscar categorías..."
                type="text"
              />
              <Button variant="outline-secondary">
                🔍
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* Grid de Categorías */}
        <Row>
          {sampleCategories.map((category) => (
            <Col key={category.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title">{category.name}</h5>
                    <Badge bg={category.color}>
                      {category.questionCount} preguntas
                    </Badge>
                  </div>
                  
                  <p className="card-text text-muted">
                    {category.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Button variant="outline-primary" size="sm" className="me-2">
                      👁️ Ver Preguntas
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      ✏️ Editar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Estadísticas */}
        <Row className="mt-5">
          <Col>
            <Card className="bg-light">
              <Card.Body>
                <h5>Estadísticas de Categorías</h5>
                <Row>
                  <Col md={3} className="text-center">
                    <h3 className="text-primary">{sampleCategories.length}</h3>
                    <p className="mb-0">Categorías Totales</p>
                  </Col>
                  <Col md={3} className="text-center">
                    <h3 className="text-success">{totalQuestions}</h3>
                    <p className="mb-0">Preguntas Totales</p>
                  </Col>
                  <Col md={3} className="text-center">
                    <h3 className="text-info">
                      {Math.round(totalQuestions / sampleCategories.length)}
                    </h3>
                    <p className="mb-0">Promedio por Categoría</p>
                  </Col>
                  <Col md={3} className="text-center">
                    <h3 className="text-warning">
                      {Math.max(...sampleCategories.map(c => c.questionCount))}
                    </h3>
                    <p className="mb-0">Máx. en una Categoría</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Acciones Rápidas */}
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <h6>Acciones Rápidas</h6>
                <Button variant="outline-primary" className="me-2">
                  📤 Exportar Categorías
                </Button>
                <Button variant="outline-success" className="me-2">
                  📥 Importar Categorías
                </Button>
                <Button variant="outline-info">
                  📊 Ver Reporte Detallado
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
}