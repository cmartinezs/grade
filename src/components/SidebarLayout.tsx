"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Offcanvas, Button } from 'react-bootstrap';

interface SidebarItem {
  label: string;
  href?: string;
  children?: SidebarItem[];
}

interface SidebarLayoutProps {
  children: ReactNode;
  items: SidebarItem[];
}

export default function SidebarLayout({ children, items }: SidebarLayoutProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const SidebarContent = (
    <div className="p-3">
      <h5>Menú</h5>
      <ul className="list-unstyled">
        {items.map((it, idx) => (
          <li key={idx} className="mb-2">
            {it.href ? (
              <Link href={it.href} className="d-block py-2">
                {it.label}
              </Link>
            ) : (
              <div className="fw-bold py-2">{it.label}</div>
            )}

            {it.children && (
              <ul className="list-unstyled ps-3">
                {it.children.map((c, j) => (
                  <li key={j} className="py-1">
                    <Link href={c.href || '#'} className="text-muted small">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="d-flex">
      {/* Toggle button visible on small screens */}
      <div className="d-md-none p-2 border-bottom w-100">
        <Button variant="outline-primary" size="sm" onClick={handleShow}>
          ☰ Menú
        </Button>
      </div>

      {/* Offcanvas for small screens (hidden on md+) */}
      <div className="d-md-none">
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {SidebarContent}
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      {/* Fixed sidebar for md+ */}
      <aside className="bg-white border-end d-none d-md-block" style={{ width: 260, minHeight: '100vh' }}>
        {SidebarContent}
      </aside>

      <main className="flex-grow-1">
        {children}
      </main>
    </div>
  );
}
