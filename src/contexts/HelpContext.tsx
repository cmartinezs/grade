'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Estructura del contenido de ayuda que se muestra en el sidebar
 */
export type HelpContentType = {
  title?: string;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
} | null;

interface HelpContextType {
  helpContent: HelpContentType;
  setHelpContent: (content: HelpContentType) => void;
}

const HelpContext = createContext<HelpContextType | undefined>(undefined);

export function HelpProvider({ children }: { children: ReactNode }) {
  const [helpContent, setHelpContent] = useState<HelpContentType>(null);

  return (
    <HelpContext.Provider value={{ helpContent, setHelpContent }}>
      {children}
    </HelpContext.Provider>
  );
}

export function useHelpContent() {
  const context = useContext(HelpContext);
  if (!context) {
    throw new Error('useHelpContent debe usarse dentro de HelpProvider');
  }
  return context;
}
