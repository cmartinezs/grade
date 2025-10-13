'use client'

import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLoading } from '@/contexts/LoadingContext';
import { useRouter } from 'next/navigation';
import { Container, Card } from 'react-bootstrap';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const { isLoading, setLoading, setLoadingMessage } = useLoading();
  const router = useRouter();

  useEffect(() => {
    // Si estamos cargando la autenticación, no hacer nada aún
    if (isLoading) return;

    // Si no está autenticado, redirigir después de un breve delay
    if (!isAuthenticated) {
      setLoading(true);
      setLoadingMessage('Redirigiendo al login...');
      
      const timer = setTimeout(() => {
        router.push(redirectTo);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, router, redirectTo, setLoading, setLoadingMessage]);

  // Mientras carga la autenticación, mostrar loading
  if (isLoading) {
    return null; // El LoadingContext manejará la UI
  }

  // Si no está autenticado, mostrar fallback o mensaje por defecto
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Container className="mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card className="text-center">
              <Card.Body className="p-5">
                <div className="mb-4">
                  <span style={{ fontSize: '4rem' }}>🔒</span>
                </div>
                <h2>Acceso Restringido</h2>
                <p className="text-muted mb-4">
                  Necesitas iniciar sesión para acceder a esta página.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link href="/auth/login" className="btn btn-primary">
                    🔑 Iniciar Sesión
                  </Link>
                  <Link href="/auth/register" className="btn btn-outline-primary">
                    🚀 Registrarse
                  </Link>
                </div>
                <hr className="my-4" />
                <Link href="/" className="btn btn-link text-decoration-none">
                  ← Volver al inicio
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    );
  }

  // Si está autenticado, mostrar el contenido protegido
  return <>{children}</>;
}