'use client'

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
  },
  {
    id: 2,
    question: '¿En qué año se independizó Chile?',
    type: 'multiple-choice',
    category: 'Historia',
    difficulty: 'Medio',
    options: ['1810', '1818', '1820', '1825'],
    correctAnswer: '1818'
  },
  {
    id: 3,
    question: 'Explique brevemente qué es la fotosíntesis',
    type: 'short-answer',
    category: 'Biología',
    difficulty: 'Medio',
    correctAnswer: 'Proceso por el cual las plantas convierten luz solar en energía química'
  }
];

export default function QuestionsPage() {
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
          <Col md={3}>
            <Form.Select>
              <option value="">Todas las categorías</option>
              <option value="geografia">Geografía</option>
              <option value="historia">Historia</option>
              <option value="biologia">Biología</option>
              <option value="matematicas">Matemáticas</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option value="">Todas las dificultades</option>
              <option value="facil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="dificil">Difícil</option>
            </Form.Select>
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
                      
                      {/* Opciones para multiple choice */}
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="mt-2">
                          <small className="text-muted">Opciones:</small>
                          <ul className="mt-1 mb-0">
                            {question.options.map((option, index) => (
                              <li key={index} className={option === question.correctAnswer ? 'text-success fw-bold' : ''}>
                                {option} {option === question.correctAnswer && '✓'}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Respuesta para short answer */}
                      {question.type === 'short-answer' && (
                        <div className="mt-2">
                          <small className="text-muted">Respuesta esperada:</small>
                          <p className="mb-0 text-success">{question.correctAnswer}</p>
                        </div>
                      )}
                    </Col>
                    
                    <Col md={4} className="text-end">
                      <div className="mb-2">
                        <Badge bg="primary" className="me-2">
                          {question.category}
                        </Badge>
                        <Badge 
                          bg={question.difficulty === 'Fácil' ? 'success' : 
                              question.difficulty === 'Medio' ? 'warning' : 'danger'}
                        >
                          {question.difficulty}
                        </Badge>
                      </div>
                      
                      <div>
                        <Button variant="outline-primary" size="sm" className="me-2">
                          ✏️ Editar
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          🗑️ Eliminar
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Paginación */}
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className="page-item disabled">
                  <span className="page-link">Anterior</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">Siguiente</a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
    </ProtectedRoute>
  );
}