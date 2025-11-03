/**
 * Hook para gestionar el estado del modal de generación masiva de cursos
 * Similar a useChileLoaderModalState pero para cursos
 * 
 * Mantiene el estado en localStorage para persistencia entre sesiones
 * El modal se muestra automáticamente si no hay cursos registrados
 */

import { useState, useEffect } from 'react';

const COURSE_BULK_LOADER_DISMISSED_KEY = 'course_bulk_loader_dismissed';

export function useCourseBulkLoaderModalState() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem(COURSE_BULK_LOADER_DISMISSED_KEY);
      setIsDismissed(stored === 'true');
    } catch (error) {
      console.error('Error reading course bulk loader state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(COURSE_BULK_LOADER_DISMISSED_KEY, 'true');
      setIsDismissed(true);
    } catch (error) {
      console.error('Error saving course bulk loader state:', error);
    }
  };

  const reset = () => {
    try {
      localStorage.removeItem(COURSE_BULK_LOADER_DISMISSED_KEY);
      setIsDismissed(false);
    } catch (error) {
      console.error('Error resetting course bulk loader state:', error);
    }
  };

  return {
    isDismissed,
    dismiss,
    reset,
    isLoading,
  };
}
