'use client'

import { ReactNode } from 'react';
import Footer from './Footer';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="page-container">
      <div className="page-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}