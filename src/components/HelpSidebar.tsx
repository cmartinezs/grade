'use client';

import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import './HelpSidebar.css';

interface HelpSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  title?: string;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export default function HelpSidebar({ isOpen, onToggle, title, children, header, footer }: HelpSidebarProps) {
  return (
    <>
      {/* Sidebar derecho overlay */}
      <div className={`help-sidebar-overlay ${isOpen ? 'open' : 'closed'}`}>
        <div className="help-sidebar-content">
          <Card className="border-success border-2" style={{ flex: '0 0 auto' }}>
            {/* Header - Si se proporciona header personalizado, usarlo; si no, usar title */}
            {header ? (
              <Card.Header className="bg-success text-white">
                {header}
              </Card.Header>
            ) : title ? (
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">{title}</h5>
              </Card.Header>
            ) : null}

            {/* Body - Contenido principal */}
            {children && (
              <Card.Body>
                {children}
              </Card.Body>
            )}

            {/* Footer - Contenido adicional al final */}
            {footer && (
              <Card.Footer className="bg-light">
                {footer}
              </Card.Footer>
            )}
          </Card>
        </div>
      </div>

      {/* Pestaña para abrir/cerrar ayuda */}
      <button
        onClick={onToggle}
        className={`help-sidebar-button ${isOpen ? 'open' : 'closed'}`}
      >
        <span className="help-sidebar-button-text">AYUDA</span>
        <span className="help-sidebar-button-indicator">{isOpen ? '>>' : '<<'}</span>
      </button>

      {/* Backdrop oscuro cuando está abierto */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="help-sidebar-backdrop"
        />
      )}
    </>
  );
}
