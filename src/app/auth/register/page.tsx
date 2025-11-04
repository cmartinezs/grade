'use client'

import { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, ProgressBar, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, ROLE_OPTIONS } from '@/types/role';

export default function RegisterPage() {
  const { isAuthenticated, register } = useAuth();
  const router = useRouter();
  const { isLoading } = useLoading();

  // Redirigir a dashboard si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    role: UserRole.DOCENTE,
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validación de nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Por favor, ingresa tu nombre';
    }

    // Validación de apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Por favor, ingresa tu apellido';
    }

    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, ingresa tu email';
    }

    // Validación de confirmación de email
    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Por favor, confirma tu email';
    }

    // Validación de coincidencia de emails
    if (formData.email.trim() && formData.confirmEmail.trim() && formData.email !== formData.confirmEmail) {
      newErrors.email = 'Los emails no coinciden';
      newErrors.confirmEmail = 'Los emails no coinciden';
    }

    // Validación de contraseña
    if (!formData.password.trim()) {
      newErrors.password = 'Por favor, ingresa una contraseña';
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    // Validación de confirmación de contraseña
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Por favor, confirma tu contraseña';
    }

    // Validación de coincidencia de contraseñas
    if (formData.password.trim() && formData.confirmPassword.trim() && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validación de términos
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      if (result.success) {
        // Redirigir al dashboard después de un breve delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      } else {
        // Si es error de email en uso, solo marcar el campo sin mensaje (el error aparece en el submit alert)
        if (result.errorCode === 'auth/email-already-in-use') {
          setErrors({ 
            submit: result.error || 'Error en el registro. Inténtalo nuevamente.',
            email: '' // Solo marcar el campo en rojo, sin mensaje
          });
        } else {
          setErrors({ submit: result.error || 'Error en el registro. Inténtalo nuevamente.' });
        }
      }
      
    } catch (error) {
      console.error('Error en registro:', error);
      setErrors({ submit: 'Error del servidor. Inténtalo más tarde.' });
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

              {errors.submit && (
                <Alert variant="danger" className="mb-3">
                  {errors.submit}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Fila 0: Nombre y Apellido */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Tu nombre"
                        value={formData.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                      />
                      {errors.firstName && (
                        <Form.Control.Feedback type="invalid" className="d-block">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Tu apellido"
                        value={formData.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                      />
                      {errors.lastName && (
                        <Form.Control.Feedback type="invalid" className="d-block">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Fila 1: Email y Confirmación de Email */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      {errors.email && (
                        <Form.Control.Feedback type="invalid" className="d-block">
                          {errors.email}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Email <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="confirmEmail"
                        placeholder="Repite tu email"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmEmail}
                      />
                      {errors.confirmEmail && (
                        <Form.Control.Feedback type="invalid" className="d-block">
                          {errors.confirmEmail}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Fila 2: Rol */}
                <Form.Group className="mb-3">
                  <Form.Label>Rol <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    isInvalid={!!errors.role}
                  >
                    {ROLE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {option.description}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.role && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors.role}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Fila 3: Contraseñas */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Mínimo 8 caracteres"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      {errors.password && (
                        <Form.Control.Feedback type="invalid" className="d-block">
                          {errors.password}
                        </Form.Control.Feedback>
                      )}
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
                      <Form.Label>Confirmar Contraseña <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Repite tu contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      {errors.confirmPassword && (
                        <Form.Control.Feedback type="invalid" className="d-block">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    name="acceptTerms"
                    id="acceptTerms"
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
                  />
                  {errors.acceptTerms && (
                    <div className="text-danger small d-block mt-2">
                      {errors.acceptTerms}
                    </div>
                  )}
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