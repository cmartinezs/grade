"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Offcanvas, Button, Collapse } from 'react-bootstrap';

interface SidebarItem {
  label: string;
  href?: string;
  icon?: string;
  children?: SidebarItem[];
}

interface SidebarLayoutProps {
  children: ReactNode;
  items: SidebarItem[];
}

function SidebarMenuItem({
  item,
  level = 0,
  onNavigate,
}: {
  item: SidebarItem;
  level?: number;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname;
  const hasActiveChild = item.children?.some(
    (child) => child.href === pathname || child.children?.some((subChild) => subChild.href === pathname)
  );

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren && !item.href) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (item.href && onNavigate) {
      onNavigate();
    }
  };

  const baseClasses = 'd-flex align-items-center justify-content-between text-decoration-none rounded px-3 py-2 mb-1 transition-all';
  const levelPadding = level > 0 ? `ps-${3 + level * 2}` : '';
  
  let stateClasses = '';
  if (isActive) {
    stateClasses = 'bg-primary text-white fw-semibold';
  } else if (hasActiveChild) {
    stateClasses = 'bg-light text-primary fw-semibold';
  } else {
    stateClasses = 'text-dark hover-bg-light';
  }

  const ItemContent = (
    <>
      <span className="d-flex align-items-center gap-2">
        {item.icon && <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>}
        <span style={{ fontSize: level > 0 ? '0.9rem' : '0.95rem' }}>{item.label}</span>
      </span>
      {hasChildren && (
        <span style={{ fontSize: '0.8rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          ▶
        </span>
      )}
    </>
  );

  return (
    <>
      {item.href ? (
        <Link
          href={item.href}
          className={`${baseClasses} ${levelPadding} ${stateClasses}`}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          {ItemContent}
        </Link>
      ) : (
        <div
          className={`${baseClasses} ${levelPadding} ${stateClasses}`}
          onClick={handleClick}
          style={{ cursor: hasChildren ? 'pointer' : 'default' }}
        >
          {ItemContent}
        </div>
      )}

      {hasChildren && (
        <Collapse in={isOpen}>
          <div>
            {item.children?.map((child, idx) => (
              <SidebarMenuItem key={idx} item={child} level={level + 1} onNavigate={onNavigate} />
            ))}
          </div>
        </Collapse>
      )}
    </>
  );
}

export default function SidebarLayout({ children, items }: SidebarLayoutProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const SidebarContent = (
    <div className="p-3">
      <style jsx global>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa !important;
        }
        .transition-all {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
      <nav>
        {items.map((item, idx) => (
          <SidebarMenuItem key={idx} item={item} onNavigate={handleClose} />
        ))}
      </nav>
    </div>
  );

  return (
    <div className="d-flex">
      {/* Toggle button visible on small screens */}
      <div className="d-md-none p-2 border-bottom w-100 bg-white">
        <Button variant="outline-primary" size="sm" onClick={handleShow}>
          ☰ Menú
        </Button>
      </div>

      {/* Offcanvas for small screens (hidden on md+) */}
      <div className="d-md-none">
        <Offcanvas show={show} onHide={handleClose} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <strong>Menú de Navegación</strong>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">{SidebarContent}</Offcanvas.Body>
        </Offcanvas>
      </div>

      {/* Fixed sidebar for md+ */}
      <aside
        className="bg-white border-end d-none d-md-block shadow-sm"
        style={{ width: 280, minHeight: '100vh', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}
      >
        {SidebarContent}
      </aside>

      <main className="flex-grow-1" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {children}
      </main>
    </div>
  );
}
