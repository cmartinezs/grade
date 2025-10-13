'use client'

import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="d-flex flex-column" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="flex-grow-1">
        {children}
      </div>
    </div>
  );
}