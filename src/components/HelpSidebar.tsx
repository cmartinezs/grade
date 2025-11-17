'use client';

import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface HelpSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  children: ReactNode;
}

export default function HelpSidebar({ isOpen, onToggle, title, children }: HelpSidebarProps) {
  return (
    <>
      {/* Sidebar derecho overlay */}
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: '75px',
          bottom: 0,
          width: isOpen ? '350px' : '0',
          background: '#fff',
          boxShadow: isOpen ? '-2px 0 8px rgba(0, 0, 0, 0.15)' : 'none',
          transition: 'width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: 1000,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1rem',
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Card className="border-success border-2" style={{ flex: '0 0 auto' }}>
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">{title}</h5>
            </Card.Header>
            <Card.Body className="small">
              {children}
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Pestaña para abrir/cerrar ayuda */}
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          right: isOpen ? '350px' : '0',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40px',
          minHeight: 'auto',
          padding: '8px 4px',
          background: '#28a745',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          transition: 'right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: 1001,
          borderRadius: '8px 0 0 8px',
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        <span
          style={{
            writingMode: 'vertical-lr',
            textOrientation: 'upright',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}
        >
          AYUDA
        </span>
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 'bold',
            lineHeight: '1',
          }}
        >
          {isOpen ? '>>' : '<<'}
        </span>
      </button>

      {/* Backdrop oscuro cuando está abierto */}
      {isOpen && (
        <div
          onClick={onToggle}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 999,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </>
  );
}
