"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Offcanvas, Button, Collapse } from 'react-bootstrap';
import { useHelpContent } from '@/contexts/HelpContext';
import HelpSidebar from './HelpSidebar';

interface SidebarItem {
  label: string;
  href?: string;
  icon?: string;
  children?: SidebarItem[];
  isSection?: boolean;  // Para secciones/grupos
}

interface SidebarLayoutProps {
  children: ReactNode;
  items: SidebarItem[];
  sidebarTitle?: string;  // Título del sidebar
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
  
  // Solo abrir por defecto si este item o alguno de sus hijos está activo
  const [isOpen, setIsOpen] = useState(isActive || hasActiveChild);

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren && !item.href) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (item.href && onNavigate) {
      onNavigate();
    }
  };

  // Si es una sección (grupo), mostrarlo diferente
  if (item.isSection && hasChildren) {
    return (
      <div className="sidebar-section">
        <div className="sidebar-section-label">{item.label}</div>
        <div className="sidebar-section-items">
          {item.children?.map((child, idx) => (
            <SidebarMenuItem key={idx} item={child} level={0} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    );
  }

  const baseClasses = 'd-flex align-items-center justify-content-between text-decoration-none sidebar-menu-item';
  const levelPadding = level > 0 ? 'sidebar-menu-item-nested' : '';
  
  let stateClasses = '';
  if (isActive) {
    stateClasses = 'sidebar-menu-item-active';
  } else if (hasActiveChild) {
    stateClasses = 'sidebar-menu-item-parent-active';
  } else {
    stateClasses = 'sidebar-menu-item-default';
  }

  const ItemContent = (
    <>
      <span className="sidebar-menu-item-content">
        {item.icon && <span className="sidebar-menu-icon">{item.icon}</span>}
        <span className="sidebar-menu-label">{item.label}</span>
      </span>
      {hasChildren && (
        <span className={`sidebar-menu-arrow ${isOpen ? 'open' : ''}`}>
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
        >
          {ItemContent}
        </Link>
      ) : (
        <div
          className={`${baseClasses} ${levelPadding} ${stateClasses} ${hasChildren ? 'cursor-pointer' : ''}`}
          onClick={handleClick}
        >
          {ItemContent}
        </div>
      )}

      {hasChildren && (
        <Collapse in={isOpen}>
          <div className="sidebar-submenu">
            {item.children?.map((child, idx) => (
              <SidebarMenuItem key={idx} item={child} level={level + 1} onNavigate={onNavigate} />
            ))}
          </div>
        </Collapse>
      )}
    </>
  );
}

export default function SidebarLayout({ items, children, sidebarTitle }: SidebarLayoutProps) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { helpContent } = useHelpContent();

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
      <aside className="sidebar-layout-sidebar d-none d-lg-block">
        <div className="sidebar-header">
          <h5 className="sidebar-header-title">
            {sidebarTitle || 'Navegación'}
          </h5>
        </div>
        <nav className="sidebar-nav">
          {items.map((item, idx) => (
            <SidebarMenuItem
              key={idx}
              item={item}
            />
          ))}
        </nav>
        <div className="sidebar-footer">
          <small className="text-muted">Versión 2.0</small>
        </div>
      </aside>

      {/* Mobile offcanvas */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{sidebarTitle || 'Navegación'}</Offcanvas.Title>
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

      {/* Sidebar derecho de ayuda - overlay */}
      {helpContent && (
        <HelpSidebar
          isOpen={showHelp}
          onToggle={() => setShowHelp(!showHelp)}
          title={helpContent.title}
        >
          {helpContent.children}
        </HelpSidebar>
      )}

      {/* Main content */}
      <main className="sidebar-layout-main">
        {children}
      </main>
    </div>
  );
}
