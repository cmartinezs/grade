'use client'

import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import Link from 'next/link';
import NavigationBar from '@/components/NavigationBar';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    role: '',
    acceptTerms: false
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

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
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!formData.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      setShowAlert(true);
      console.log('Datos de registro:', formData);
      
      // Aquí iría la lógica real de registro
      
    } catch (error) {
      console.error('Error en registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />
      
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2>Crear Cuenta</h2>
                  <p className="text-muted">Únete a Grade Question Bank</p>
                </div>

                {showAlert && (
                  <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    <strong>¡Registro exitoso!</strong> Tu cuenta ha sido creada.
                    <br /><small>En una implementación real, recibirías un email de confirmación.</small>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="Tu nombre"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Apellido *</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Tu apellido"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

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

                  <Form.Group className="mb-3">
                    <Form.Label>Institución</Form.Label>
                    <Form.Control
                      type="text"
                      name="institution"
                      placeholder="Universidad, Colegio, etc."
                      value={formData.institution}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Rol *</Form.Label>
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona tu rol</option>
                      <option value="teacher">Profesor</option>
                      <option value="coordinator">Coordinador Académico</option>
                      <option value="director">Director</option>
                      <option value="admin">Administrador</option>
                      <option value="student">Estudiante</option>
                      <option value="other">Otro</option>
                    </Form.Select>
                  </Form.Group>

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
                      <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Fuerza de contraseña:</small>
                          <small className={`text-${getPasswordStrengthColor()}`}>
                            {getPasswordStrengthText()}
                          </small>
                        </div>
                        <ProgressBar 
                          variant={getPasswordStrengthColor()} 
                          now={passwordStrength} 
                          style={{ height: '4px' }}
                        />
                      </div>
                    )}
                  </Form.Group>

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

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      label={
                        <span>
                          Acepto los{' '}
                          <Link href="/terms" className="text-decoration-none">
                            términos y condiciones
                          </Link>
                          {' '}y la{' '}
                          <Link href="/privacy" className="text-decoration-none">
                            política de privacidad
                          </Link>
                        </span>
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
          </Col>
        </Row>

        {/* Beneficios de crear cuenta */}
        <Row className="mt-4">
          <Col>
            <Card className="bg-primary text-white">
              <Card.Body className="text-center py-4">
                <h4>¿Por qué crear una cuenta?</h4>
                <Row className="mt-3">
                  <Col md={3}>
                    <div>
                      <span className="display-6">☁️</span>
                      <h6 className="mt-2">Sincronización</h6>
                      <small>Accede a tus preguntas desde cualquier dispositivo</small>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div>
                      <span className="display-6">👥</span>
                      <h6 className="mt-2">Colaboración</h6>
                      <small>Trabaja en equipo con otros profesores</small>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div>
                      <span className="display-6">🔒</span>
                      <h6 className="mt-2">Seguridad</h6>
                      <small>Tus datos protegidos con cifrado avanzado</small>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div>
                      <span className="display-6">📊</span>
                      <h6 className="mt-2">Estadísticas</h6>
                      <small>Reportes detallados de uso y rendimiento</small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Plan incluido */}
        <Row className="mt-4">
          <Col>
            <Card className="bg-light">
              <Card.Body className="text-center py-4">
                <h5>🎉 ¡Tu cuenta incluye:</h5>
                <Row className="mt-3">
                  <Col md={3}>
                    <span className="text-success">✓ 100 preguntas gratuitas</span>
                  </Col>
                  <Col md={3}>
                    <span className="text-success">✓ 5 categorías</span>
                  </Col>
                  <Col md={3}>
                    <span className="text-success">✓ Exportación básica</span>
                  </Col>
                  <Col md={3}>
                    <span className="text-success">✓ Soporte por email</span>
                  </Col>
                </Row>
                <p className="mt-2 mb-0">
                  <Link href="/pricing" className="text-decoration-none">
                    Ver planes avanzados →
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}