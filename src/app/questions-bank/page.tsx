"use client"

import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';

// Datos de ejemplo
const sampleQuestions = [
  {
    id: 1,
    question: '¿Cuál es la capital de Chile?',
    type: 'multiple-choice',
    category: 'Geografía',
    difficulty: 'Fácil',
    options: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta'],
    correctAnswer: 'Santiago'
  }
];

export default function QuestionsBankPage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <NavigationBar />
      
      <Container className="mt-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1>Banco de Preguntas</h1>
            <p className="text-muted">Gestiona todas tus preguntas desde aquí</p>
          </Col>
          <Col xs="auto">
            <Button variant="primary">
              ➕ Nueva Pregunta
            </Button>
          </Col>
        </Row>

        {/* Filtros */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Buscar preguntas..."
                type="text"
              />
              <Button variant="outline-secondary">
                🔍
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* Lista de Preguntas */}
        <Row>
          {sampleQuestions.map((question) => (
            <Col key={question.id} xs={12} className="mb-3">
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card.Title className="h5">{question.question}</Card.Title>
                    </Col>
                    <Col md={4} className="text-end">
                      <div className="mb-2">
                        <Badge bg="primary" className="me-2">
                          {question.category}
                        </Badge>
                        <Badge bg={question.difficulty === 'Fácil' ? 'success' : 'warning'}>
                          {question.difficulty}
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </PageWrapper>
    </ProtectedRoute>
  );
}
