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
            <Nav.Link as={LoadingLink} href="/" loadingMessage="Cargando inicio...">
              🏠 Inicio
            </Nav.Link>
            
            {/* Enlaces públicos */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={LoadingLink} href="/about" loadingMessage="Cargando información...">
                  ℹ️ Acerca de
                </Nav.Link>
                <Nav.Link as={LoadingLink} href="/features" loadingMessage="Cargando características...">
                  ✨ Características
                </Nav.Link>
                <Nav.Link as={LoadingLink} href="/pricing" loadingMessage="Cargando precios...">
                  💰 Precios
                </Nav.Link>
              </>
            )}
            
            {/* Enlaces privados - Solo para usuarios autenticados */}
            {isAuthenticated && (
              <>
                <NavDropdown title="❓ Preguntas" id="questions-dropdown">
                  <NavDropdown.Item as={Link} href="/questions">
                    📋 Ver Todas
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/questions/create">
                    ➕ Crear Nueva
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} href="/questions/import">
                    📥 Importar Preguntas
                  </NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link as={LoadingLink} href="/categories" loadingMessage="Cargando categorías...">
                  🏷️ Categorías
                </Nav.Link>
                
                <NavDropdown title="📊 Evaluaciones" id="evaluations-dropdown">
                  <NavDropdown.Item as={Link} href="/evaluations">
                    📝 Mis Evaluaciones
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/evaluations/create">
                    ➕ Crear Evaluación
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          
          <Nav>
                        {!isAuthenticated ? (
              // Botones para usuarios no autenticados
              <>
                <LoadingLink href="/auth/login" className="btn btn-light btn-sm" loadingMessage="Cargando login...">
                  🔑 Iniciar Sesión
                </LoadingLink>
                <LoadingLink href="/auth/register" className="btn btn-outline-light btn-sm ms-2" loadingMessage="Cargando registro...">
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