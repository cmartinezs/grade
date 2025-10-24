'use client'

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLoading } from '@/contexts/LoadingContext';
import LoadingLink from './LoadingLink';
import './NavigationBar.css';

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
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="navbar-elegant">
      <Container>
        <Navbar.Brand as={Link} href="/" className="brand-logo">
          <div className="brand-container">
            <div className="brand-icon">📚</div>
            <div className="brand-content">
              <div className="brand-title">GRADE</div>
              <div className="brand-subtitle">Generación y Registro Automatizado De Evaluaciones</div>
            </div>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links">
            {!isAuthenticated && (
              <Nav.Link as={LoadingLink} href="/" loadingMessage="Cargando inicio..." showSpinner={false} className="nav-link-item">
                🏠 Inicio
              </Nav.Link>
            )}

            {/* Enlaces públicos - Solo cuando no autenticado */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={LoadingLink} href="/public/about" loadingMessage="Cargando información..." showSpinner={false} className="nav-link-item">
                  ℹ️ Acerca de
                </Nav.Link>
                <Nav.Link as={LoadingLink} href="/public/features" loadingMessage="Cargando características..." showSpinner={false} className="nav-link-item">
                  ✨ Características
                </Nav.Link>
                <Nav.Link as={LoadingLink} href="/public/pricing" loadingMessage="Cargando precios..." showSpinner={false} className="nav-link-item">
                  💰 Precios
                </Nav.Link>
              </>
            )}

            {/* Enlaces directos a funcionalidades - Sin desplegar */}
            {isAuthenticated && (
              <>
                <Nav.Link as={LoadingLink} href="/dashboard" loadingMessage="Cargando dashboard..." showSpinner={false} className="nav-link-item">
                  📊 Panel de Control
                </Nav.Link>

                <Nav.Link as={LoadingLink} href="/questions-bank" loadingMessage="Cargando banco de preguntas..." showSpinner={false} className="nav-link-item">
                  📚 Banco de Preguntas
                </Nav.Link>

                <Nav.Link as={LoadingLink} href="/evaluation-management" loadingMessage="Cargando gestión de evaluaciones..." showSpinner={false} className="nav-link-item">
                  📝 Evaluaciones
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {!isAuthenticated ? (
              // Botones para usuarios no autenticados
              <div className="auth-buttons">
                <LoadingLink href="/auth/login" className="btn btn-light btn-sm" loadingMessage="Cargando login..." showSpinner={false}>
                  🔑 Iniciar Sesión
                </LoadingLink>
                <LoadingLink href="/auth/register" className="btn btn-outline-light btn-sm ms-2" loadingMessage="Cargando registro..." showSpinner={false}>
                  🚀 Registrarse
                </LoadingLink>
              </div>
            ) : (
              // Menú para usuarios autenticados
              <NavDropdown
                title={
                  <span className="user-menu-title">
                    👤 <span className="user-name">{user?.firstName || 'Usuario'}</span>
                  </span>
                }
                id="user-dropdown"
                align="end"
                className="user-dropdown"
              >
                <NavDropdown.Header className="user-dropdown-header">
                  <div className="user-info">
                    <strong>{user?.firstName} {user?.lastName}</strong>
                    <small>{user?.email}</small>
                    {user?.institution && (
                      <small className="institution">🏫 {user.institution}</small>
                    )}
                  </div>
                </NavDropdown.Header>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} href="/profile" className="dropdown-item-with-icon">
                  👤 Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/settings" className="dropdown-item-with-icon">
                  ⚙️ Configuración
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/billing" className="dropdown-item-with-icon">
                  💳 Facturación
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="dropdown-item-logout">
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