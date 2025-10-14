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
  
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname;
  const hasActiveChild = item.children?.some(
    (child) => child.href === pathname || child.children?.some((subChild) => subChild.href === pathname)
  );
  
  // Only open by default if this item or any of its children are active
  const [isOpen, setIsOpen] = useState(isActive || hasActiveChild);

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

export default function SidebarLayout({ items, children }: SidebarLayoutProps) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <div className="sidebar-layout-container">
      {/* Mobile menu button - only visible on small screens */}
      <div className="d-lg-none p-3">
        <Button
          variant="outline-secondary"
          onClick={() => setShowOffcanvas(true)}
        >
          ☰ Menú
        </Button>
      </div>

      {/* Desktop sidebar - hidden on small screens */}
      <aside className="sidebar-layout-sidebar d-none d-lg-block bg-white border-end">
        <div className="p-3">
          <h5 className="mb-3">Navegación</h5>
          {items.map((item, idx) => (
            <SidebarMenuItem
              key={idx}
              item={item}
            />
          ))}
        </div>
      </aside>

      {/* Mobile offcanvas */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navegación</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {items.map((item, idx) => (
            <SidebarMenuItem
              key={idx}
              item={item}
              onNavigate={() => setShowOffcanvas(false)}
            />
          ))}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main content */}
      <main className="sidebar-layout-main">
        {children}
      </main>
    </div>
  );
}
