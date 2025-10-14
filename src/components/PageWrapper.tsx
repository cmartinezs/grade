'use client'

import { ReactNode } from 'react';
import Footer from './Footer';

interface PageWrapperProps {
  children: ReactNode;
  isPublic?: boolean;
}

export default function PageWrapper({ children, isPublic = false }: PageWrapperProps) {
  return (
    <div className={`page-container ${isPublic ? 'public-page' : ''}`}>
      <div className="page-content">
        {children}
      </div>
      {isPublic && <Footer />}
    </div>
  );
}