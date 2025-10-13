'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import { useAuth } from '@/contexts/AuthContext';

export default function PublicAbout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirigir a dashboard si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <PageWrapper>
      <NavigationBar />
      
      <Container className="mt-5">
        {/* Hero Section */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h1 className="display-4 mb-4">Acerca de Grade Question Bank</h1>
              <p className="lead">
                La solución más completa para la gestión de bancos de preguntas académicas
              </p>
            </div>
          </Col>
        </Row>

        {/* Misión y Visión */}
        <Row className="mb-5">
          <Col md={6}>
            <Card className="h-100">
              <Card.Body>
                <h3 className="text-primary">🎯 Nuestra Misión</h3>
                <p>
                  Facilitar el proceso de creación y gestión de evaluaciones académicas 
                  mediante una plataforma intuitiva que permite a educadores organizar, 
                  categorizar y generar exámenes de manera eficiente.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100">
              <Card.Body>
                <h3 className="text-success">🚀 Nuestra Visión</h3>
                <p>
                  Ser la plataforma líder en gestión de bancos de preguntas, 
                  transformando la manera en que los educadores crean y administran 
                  evaluaciones, haciendo el proceso más rápido y efectivo.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Historia */}
        <Row className="mb-5">
          <Col>
            <Card>
              <Card.Body>
                <h3 className="text-info">📖 Nuestra Historia</h3>
                <p>
                  Grade Question Bank nació de la necesidad observada en instituciones 
                  educativas de contar con una herramienta especializada para la gestión 
                  de preguntas y evaluaciones. Desarrollado por educadores para educadores, 
                  nuestro sistema ha evolucionado para convertirse en una solución integral.
                </p>
                <p>
                  Desde su lanzamiento, hemos ayudado a cientos de instituciones a 
                  optimizar sus procesos de evaluación, ahorrando tiempo y mejorando 
                  la calidad de los exámenes.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Valores */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-center mb-4">💎 Nuestros Valores</h3>
          </Col>
        </Row>
        
        <Row>
          <Col md={3} className="text-center mb-4">
            <div className="p-4">
              <div className="mb-3">
                <i className="bi bi-lightbulb display-1 text-warning"></i>
              </div>
              <h5>Innovación</h5>
              <p>Mejora continua en nuestras funcionalidades</p>
            </div>
          </Col>
          
          <Col md={3} className="text-center mb-4">
            <div className="p-4">
              <div className="mb-3">
                <i className="bi bi-people display-1 text-primary"></i>
              </div>
              <h5>Colaboración</h5>
              <p>Trabajo en equipo entre educadores</p>
            </div>
          </Col>
          
          <Col md={3} className="text-center mb-4">
            <div className="p-4">
              <div className="mb-3">
                <i className="bi bi-shield-check display-1 text-success"></i>
              </div>
              <h5>Confiabilidad</h5>
              <p>Sistema estable y seguro para tus datos</p>
            </div>
          </Col>
          
          <Col md={3} className="text-center mb-4">
            <div className="p-4">
              <div className="mb-3">
                <i className="bi bi-heart display-1 text-danger"></i>
              </div>
              <h5>Pasión por Educar</h5>
              <p>Compromiso con la excelencia educativa</p>
            </div>
          </Col>
        </Row>

        {/* Equipo */}
        <Row className="mt-5">
          <Col>
            <Card className="bg-light">
              <Card.Body className="text-center">
                <h3>👥 Nuestro Equipo</h3>
                <p>
                  Somos un equipo multidisciplinario de desarrolladores, diseñadores 
                  y especialistas en educación, trabajando juntos para crear la mejor 
                  experiencia posible para nuestros usuarios.
                </p>
                <p className="text-muted">
                  <strong>¿Interesado en unirte a nuestro equipo?</strong><br />
                  Estamos siempre buscando talento apasionado por la educación y la tecnología.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
}
