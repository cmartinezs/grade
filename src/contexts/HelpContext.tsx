'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface HelpContextType {
  helpContent: {
    title: string;
    children: ReactNode;
  } | null;
  setHelpContent: (content: { title: string; children: ReactNode } | null) => void;
}

const HelpContext = createContext<HelpContextType | undefined>(undefined);

export function HelpProvider({ children }: { children: ReactNode }) {
  const [helpContent, setHelpContent] = useState<{
    title: string;
    children: ReactNode;
  } | null>(null);

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
