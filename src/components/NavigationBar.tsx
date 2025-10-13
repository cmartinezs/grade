'use client'

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function NavigationBar() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Redirigir a home o login si es necesario
    window.location.href = '/';
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
            <Nav.Link as={Link} href="/">
              Inicio
            </Nav.Link>
            
            {/* Enlaces públicos */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} href="/about">
                  Acerca de
                </Nav.Link>
                <Nav.Link as={Link} href="/features">
                  Características
                </Nav.Link>
                <Nav.Link as={Link} href="/pricing">
                  Precios
                </Nav.Link>
              </>
            )}
            
            {/* Enlaces privados - Solo para usuarios autenticados */}
            {isAuthenticated && (
              <>
                <NavDropdown title="Preguntas" id="questions-dropdown">
                  <NavDropdown.Item as={Link} href="/questions">
                    Ver Todas
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/questions/create">
                    Crear Nueva
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} href="/questions/import">
                    Importar Preguntas
                  </NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link as={Link} href="/categories">
                  Categorías
                </Nav.Link>
                
                <NavDropdown title="Evaluaciones" id="evaluations-dropdown">
                  <NavDropdown.Item as={Link} href="/evaluations">
                    Mis Evaluaciones
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/evaluations/create">
                    Crear Evaluación
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          
          <Nav>
            {!isAuthenticated ? (
              // Botones para usuarios no autenticados
              <>
                <Nav.Link as={Link} href="/auth/login">
                  Iniciar Sesión
                </Nav.Link>
                <Link href="/auth/register" className="btn btn-outline-light btn-sm ms-2">
                  Registrarse
                </Link>
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
                      <small className="text-muted">{user.institution}</small>
                    </>
                  )}
                </NavDropdown.Header>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} href="/profile">
                  Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/settings">
                  Configuración
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/billing">
                  Facturación
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}