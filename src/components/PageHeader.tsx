'use client';

import { ReactNode } from 'react';
import { Row, Col } from 'react-bootstrap';

interface PageHeaderProps {
  icon?: string | ReactNode;
  title: string;
  description?: string | ReactNode;
}

/**
 * PageHeader Component
 * 
 * Componente genérico reutilizable para encabezados de página.
 * Proporciona una estructura consistente con icon, título y descripción.
 * 
 * @param icon - Emoji, componente o ReactNode para mostrar antes del título
 * @param title - Texto del título principal
 * @param description - Descripción o contenido adicional (puede incluir badges, etc)
 * 
 * @example
 * // Simple
 * <PageHeader 
 *   icon="📋"
 *   title="Gestión de Categorías"
 *   description="Administra las categorías de niveles educacionales"
 * />
 * 
 * // Con badge en descripción
 * <PageHeader 
 *   icon="📋"
 *   title="Gestión de Categorías"
 *   description={
 *     <>
 *       Administra las categorías de niveles educacionales
 *       <Badge bg="secondary" className="ms-2">10 elementos</Badge>
 *     </>
 *   }
 * />
 */
export default function PageHeader({ icon, title, description }: PageHeaderProps) {
  return (
    <Row className="mb-4">
      <Col>
        <div className="d-flex align-items-center gap-3">
          {icon && (
            <span style={{ fontSize: '1.5em', lineHeight: '1' }}>
              {icon}
            </span>
          )}
          <div>
            <h1 className="h3 mb-0">{title}</h1>
          </div>
          {description && (
            <div className="text-muted">
              {description}
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
}
