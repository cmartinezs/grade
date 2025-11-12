'use client'

import Link from 'next/link';
import { useLoading } from '@/contexts/LoadingContext';
import { ReactNode } from 'react';

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  loadingMessage?: string;
  className?: string;
  onClick?: () => void;
  showSpinner?: boolean;
}

export default function LoadingLink({ 
  href, 
  children, 
  loadingMessage = 'Navegando...', 
  className = '',
  onClick
  , showSpinner = true
}: LoadingLinkProps) {
  const { setLoading, setLoadingMessage } = useLoading();

  const handleClick = () => {
    // Solo mostrar loading para navegación entre páginas diferentes
    if (showSpinner && window.location.pathname !== href) {
      setLoading(true);
      setLoadingMessage(loadingMessage);
      
      // El loading se quitará automáticamente cuando la nueva página cargue
      // o después de un timeout como fallback
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link 
      href={href} 
      className={className} 
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}