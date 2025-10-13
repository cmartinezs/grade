'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Cargando...');

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    loadingMessage,
    setLoadingMessage,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      
      {/* Loading Overlay */}
      {isLoading && (
        <div 
          className="loading-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            backdropFilter: 'blur(2px)'
          }}
        >
          <div 
            className="loading-content bg-white rounded p-4 shadow text-center"
            style={{ minWidth: '200px' }}
          >
            <Spinner animation="border" variant="primary" className="mb-3" />
            <div className="text-muted">{loadingMessage}</div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};