'use client'

import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'danger'>('success');
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        setAlertType('success');
        setAlertMessage('¡Login exitoso! Redirigiendo...');
        setShowAlert(true);
        
        // Redirigir al dashboard después de un breve delay
        setTimeout(() => {
          router.push('/questions');
        }, 1500);
      } else {
        setAlertType('danger');
        setAlertMessage('Error en las credenciales. Inténtalo nuevamente.');
        setShowAlert(true);
      }
      
    } catch (error) {
      console.error('Error en login:', error);
      setAlertType('danger');
      setAlertMessage('Error del servidor. Inténtalo más tarde.');
      setShowAlert(true);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 120px)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            {/* Logo y enlace de vuelta */}
            <div className="text-center mb-4">
              <Link href="/" className="text-decoration-none">
                <h1 className="text-primary">📚 Grade Question Bank</h1>
              </Link>
              <Link href="/" className="text-decoration-none text-muted">
                <small>← Volver al inicio</small>
              </Link>
            </div>
            
            <Card className="shadow">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2>Iniciar Sesión</h2>
                  <p className="text-muted">Accede a tu cuenta</p>
                </div>

                {showAlert && (
                  <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Tu contraseña"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Recordarme"
                      id="remember"
                    />
                    <Link href="/auth/forgot-password" className="text-decoration-none">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Iniciando sesión...
                      </>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </Button>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-0">
                    ¿No tienes cuenta?{' '}
                    <Link href="/auth/register" className="text-decoration-none">
                      Regístrate aquí
                    </Link>
                  </p>
                </div>

                {/* Demo credentials */}
                <Card className="mt-4 bg-light">
                  <Card.Body className="py-3">
                    <small className="text-muted">
                      <strong>Demo:</strong> Usa cualquier email/contraseña para probar
                    </small>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}