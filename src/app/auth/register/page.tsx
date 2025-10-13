'use client'

import { useState } from 'react';
import { Card, Form, Button, Alert, ProgressBar, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    roles: {
      docente: true,
      coordinador: true
    },
    acceptTerms: false
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'danger'>('success');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();
  const { isLoading, setLoading, setLoadingMessage } = useLoading();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    
    if (name === 'docente' || name === 'coordinador') {
      setFormData({
        ...formData,
        roles: {
          ...formData.roles,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }

    // Calcular fuerza de contraseña
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'danger';
    if (passwordStrength < 75) return 'warning';
    return 'success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Muy débil';
    if (passwordStrength < 50) return 'Débil';
    if (passwordStrength < 75) return 'Moderada';
    return 'Fuerte';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.email !== formData.confirmEmail) {
      setAlertType('danger');
      setAlertMessage('Los emails no coinciden');
      setShowAlert(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlertType('danger');
      setAlertMessage('Las contraseñas no coinciden');
      setShowAlert(true);
      return;
    }

    if (!formData.roles.docente && !formData.roles.coordinador) {
      setAlertType('danger');
      setAlertMessage('Debes seleccionar al menos un rol');
      setShowAlert(true);
      return;
    }

    if (!formData.acceptTerms) {
      setAlertType('danger');
      setAlertMessage('Debes aceptar los términos y condiciones');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    setLoadingMessage('Creando tu cuenta...');
    
    try {
      // Simular delay de registro
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAlertType('success');
      setAlertMessage('¡Registro exitoso! Redirigiendo al login...');
      setShowAlert(true);
      
      // Cambiar mensaje de loading
      setLoadingMessage('Redirigiendo...');
      
      // Redirigir al login después de un breve delay
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
      
    } catch (error) {
      console.error('Error en registro:', error);
      setAlertType('danger');
      setAlertMessage('Error del servidor. Inténtalo más tarde.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container d-flex flex-column flex-lg-row position-relative">
      {/* Sección izquierda - Formulario de registro */}
      <div className="register-form-container d-flex align-items-center justify-content-center">
        <div className="register-form-wrapper">
          {/* Logo y enlace de vuelta */}
          <div className="text-center mb-4">
            <Link href="/" className="text-decoration-none">
              <h1 className="text-primary">📚 Grade Question Bank</h1>
            </Link>
            <Link href="/" className="text-decoration-none text-muted">
              <small>← Volver al inicio</small>
            </Link>
          </div>
          
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <h2>Crear Cuenta</h2>
                <p className="text-muted mb-0">Solo toma 1 minuto. Completa tu perfil después.</p>
              </div>

              {showAlert && (
                <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
                  {alertMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Fila 1: Email y Confirmación de Email */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="confirmEmail"
                        placeholder="Repite tu email"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Fila 2: Roles */}
                <Form.Group className="mb-3">
                  <Form.Label>Rol(es) *</Form.Label>
                  <div className="mt-2">
                    <Row>
                      <Col md={6}>
                        <Form.Check
                          type="checkbox"
                          name="docente"
                          id="docente"
                          label="Docente"
                          checked={formData.roles.docente}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Check
                          type="checkbox"
                          name="coordinador"
                          id="coordinador"
                          label="Coordinador"
                          checked={formData.roles.coordinador}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <small className="text-muted">Puedes seleccionar ambos roles si aplica</small>
                  </div>
                </Form.Group>

                {/* Fila 3: Contraseñas */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña *</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Mínimo 8 caracteres"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      {formData.password && (
                        <div className="mt-1">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <small className="text-muted">Fuerza:</small>
                            <small className={`text-${getPasswordStrengthColor()}`}>
                              {getPasswordStrengthText()}
                            </small>
                          </div>
                          <ProgressBar 
                            variant={getPasswordStrengthColor()} 
                            now={passwordStrength} 
                            style={{ height: '3px' }}
                          />
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Confirmar Contraseña *</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Repite tu contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    label={
                      <small>
                        Acepto los{' '}
                        <Link href="/terms" className="text-decoration-none">
                          términos y condiciones
                        </Link>
                        {' '}y la{' '}
                        <Link href="/privacy" className="text-decoration-none">
                          política de privacidad
                        </Link>
                      </small>
                    }
                    required
                  />
                </Form.Group>

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
                      Creando cuenta...
                    </>
                  ) : (
                    'Crear Cuenta'
                  )}
                </Button>
              </Form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-0">
                  ¿Ya tienes cuenta?{' '}
                  <Link href="/auth/login" className="text-decoration-none">
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Sección derecha - Imagen y texto promocional */}
      <div className="promo-section d-none d-lg-flex align-items-center justify-content-center text-white position-relative">
        <div className="text-center">
          <div className="promo-content">
            🎯
          </div>
          <h2 className="mb-4">Registro Rápido y Sencillo</h2>
          <p className="lead mb-0 promo-text">
            Solo necesitas email, contraseña y tu rol. Podrás completar 
            tu perfil con más detalles después de crear tu cuenta.
          </p>
        </div>
      </div>
      
      {/* Footer absoluto para páginas de auth */}
      <div className="auth-footer-mobile position-absolute bottom-0 w-100 bg-light border-top py-2 d-block d-lg-none">
        <div className="container">
          <div className="text-center">
            <small className="text-muted">
              © 2005 - 2025 {' '}
              <a 
                href="https://www.wanku.cl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-muted"
              >
                Wanku SpA
              </a>
            </small>
          </div>
        </div>
      </div>
      
      {/* Footer para desktop en la sección morada */}
      <div className="auth-footer-desktop d-none d-lg-block position-absolute bottom-0 w-100 py-2">
        <div className="container">
          <div className="text-center text-white-50">
            <small>
              © 2005 - 2025 {' '}
              <a 
                href="https://www.wanku.cl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-white-50"
              >
                Wanku SpA
              </a>
              . Todos los derechos reservados.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}