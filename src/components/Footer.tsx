'use client'

import Link from 'next/link';

export default function Footer() {
  const currentYear: number = new Date().getFullYear();
  const startYear: number = 2005;
  
  // Mostrar rango de años solo si el año actual es diferente al inicial
  const yearRange: string = currentYear > startYear ? `${startYear} - ${currentYear}` : startYear.toString();

  return (
    <footer className="bg-light border-top mt-auto py-3">
      <div className="container">
        <div className="text-center">
          <small className="text-muted">
            © {yearRange} {' '}
            <Link 
              href="https://www.wanku.cl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-decoration-none text-muted"
            >
              Wanku SpA
            </Link>
            . Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}