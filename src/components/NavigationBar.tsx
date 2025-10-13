'use client'

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLoading } from '@/contexts/LoadingContext';
import LoadingLink from './LoadingLink';

export default function NavigationBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { setLoading, setLoadingMessage } = useLoading();

  const handleLogout = () => {
    setLoading(true);
    setLoadingMessage('Cerrando sesión...');
    logout();
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} href="/">
          📚 Grade Question Bank
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuthenticated && (
              <Nav.Link as={LoadingLink} href="/" loadingMessage="Cargando inicio..." showSpinner={false}>
                🏠 Inicio
              </Nav.Link>
            )}
            
            {/* Enlaces públicos */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={LoadingLink} href="/public/about" loadingMessage="Cargando información..." showSpinner={false}>
                  ℹ️ Acerca de
                </Nav.Link>
                <Nav.Link as={LoadingLink} href="/public/features" loadingMessage="Cargando características..." showSpinner={false}>
                  ✨ Características
                </Nav.Link>
                <Nav.Link as={LoadingLink} href="/public/pricing" loadingMessage="Cargando precios..." showSpinner={false}>
                  💰 Precios
                </Nav.Link>
              </>
            )}
            
            {/* Enlaces privados - Solo tres menús cuando autenticado */}
            {isAuthenticated && (
              <>
                <NavDropdown title="📊 Dashboard" id="dashboard-dropdown">
                  <NavDropdown.Item as={Link} href="/dashboard">
                    Ir al Dashboard
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="📚 Question Bank" id="questionbank-dropdown">
                  <NavDropdown.Item as={Link} href="/questions-bank">
                    Banco de Preguntas
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="📝 Evaluation Management" id="evaluation-dropdown">
                  <NavDropdown.Item as={Link} href="/evaluation-management">
                    Gestión de Evaluaciones
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          
          <Nav>
                        {!isAuthenticated ? (
              // Botones para usuarios no autenticados
              <>
                <LoadingLink href="/auth/login" className="btn btn-light btn-sm" loadingMessage="Cargando login..." showSpinner={false}>
                  🔑 Iniciar Sesión
                </LoadingLink>
                <LoadingLink href="/auth/register" className="btn btn-outline-light btn-sm ms-2" loadingMessage="Cargando registro..." showSpinner={false}>
                  🚀 Registrarse
                </LoadingLink>
              </>
            ) : (
              // Menú para usuarios autenticados
              <NavDropdown 
                title={`👤 ${user?.firstName || 'Usuario'}`} 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Header>
                  <strong>{user?.firstName} {user?.lastName}</strong>
                  <br />
                  <small className="text-muted">{user?.email}</small>
                  {user?.institution && (
                    <>
                      <br />
                      <small className="text-muted">🏫 {user.institution}</small>
                    </>
                  )}
                </NavDropdown.Header>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} href="/profile">
                  👤 Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/settings">
                  ⚙️ Configuración
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/billing">
                  💳 Facturación
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  🚪 Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}