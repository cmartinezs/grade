'use client'

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <NavigationBar />

      {/* Main Content */}
      <Container className="mt-5">
        {/* Hero Section */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h1 className="display-4 mb-4">Banco de Preguntas para Evaluaciones</h1>
              <p className="lead">
                Organiza, gestiona y crea evaluaciones de manera eficiente con nuestro sistema de banco de preguntas.
              </p>
              <Button variant="primary" size="lg" className="me-3">
                Comenzar Ahora
              </Button>
              <Button variant="outline-secondary" size="lg">
                Ver Demo
              </Button>
            </div>
          </Col>
        </Row>

        {/* Features Cards */}
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <i className="bi bi-question-circle display-1 text-primary"></i>
                </div>
                <Card.Title>Gestión de Preguntas</Card.Title>
                <Card.Text>
                  Crea, organiza y administra preguntas de diferentes tipos: opción múltiple, 
                  verdadero/falso, respuesta corta y más.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <i className="bi bi-tags display-1 text-success"></i>
                </div>
                <Card.Title>Categorías y Etiquetas</Card.Title>
                <Card.Text>
                  Organiza tus preguntas por materias, temas, dificultad y cualquier 
                  categorización personalizada que necesites.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <i className="bi bi-clipboard-check display-1 text-info"></i>
                </div>
                <Card.Title>Crear Evaluaciones</Card.Title>
                <Card.Text>
                  Genera exámenes automáticamente seleccionando preguntas por categoría, 
                  dificultad y otros criterios.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats Row */}
        <Row className="bg-light p-4 rounded mb-5">
          <Col md={3} className="text-center">
            <h3 className="text-primary">1000+</h3>
            <p className="mb-0">Preguntas</p>
          </Col>
          <Col md={3} className="text-center">
            <h3 className="text-success">50+</h3>
            <p className="mb-0">Categorías</p>
          </Col>
          <Col md={3} className="text-center">
            <h3 className="text-info">100+</h3>
            <p className="mb-0">Evaluaciones</p>
          </Col>
          <Col md={3} className="text-center">
            <h3 className="text-warning">500+</h3>
            <p className="mb-0">Usuarios</p>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
}
