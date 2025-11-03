/**
 * Hook para manejar el estado del modal de Chile Data Loader
 * Recuerda si el usuario cerró el modal durante la sesión actual
 * Se resetea al hacer logout (cambiar de usuario)
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const STORAGE_KEY = 'chile_loader_modal_dismissed';
const STORAGE_USER_KEY = 'chile_loader_modal_dismissed_user';

// Función helper para leer localStorage de forma segura
function getFromLocalStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`Failed to read from localStorage (${key}):`, e);
    return null;
  }
}

// Función helper para escribir localStorage de forma segura
function setInLocalStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`Failed to write to localStorage (${key}):`, e);
  }
}

// Función helper para remover de localStorage
function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`Failed to remove from localStorage (${key}):`, e);
  }
}

export function useChileLoaderModalState() {
  const { user, isInitializing } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Leer estado inicial del localStorage - se ejecuta siempre que Auth cambia
  useEffect(() => {
    // Esperar a que Auth se haya inicializado antes de hacer nada
    if (isInitializing) {
      console.log('[useChileLoaderModalState] Still initializing auth, waiting...');
      return;
    }

    setIsLoading(true);
    
    // Usar el email del usuario autenticado, o null si no está autenticado
    const currentUserId = user?.email || null;
    const storedUserId = getFromLocalStorage(STORAGE_USER_KEY);
    
    console.log('[useChileLoaderModalState] Auth state check:', {
      currentUserId,
      storedUserId,
    });

    // Usuario cambió (logout o login con diferente usuario)
    if (storedUserId && storedUserId !== currentUserId) {
      console.log('[useChileLoaderModalState] User changed from', storedUserId, 'to', currentUserId);
      // Limpiar estado anterior
      removeFromLocalStorage(STORAGE_KEY);
      
      // Si hay nuevo usuario, guardar su ID
      if (currentUserId) {
        setInLocalStorage(STORAGE_USER_KEY, currentUserId);
        setIsDismissed(false); // Mostrar modal para nuevo usuario
      } else {
        // Usuario deslogueado
        removeFromLocalStorage(STORAGE_USER_KEY);
        setIsDismissed(false);
      }
    } 
    // Primera vez para este usuario (no hay storedUserId)
    else if (!storedUserId && currentUserId) {
      console.log('[useChileLoaderModalState] First time for user:', currentUserId);
      setInLocalStorage(STORAGE_USER_KEY, currentUserId);
      setIsDismissed(false);
    }
    // Mismo usuario - cargar estado guardado
    else if (storedUserId === currentUserId && currentUserId) {
      console.log('[useChileLoaderModalState] Same user, loading saved state');
      const saved = getFromLocalStorage(STORAGE_KEY);
      const isDismissedValue = saved === 'true';
      console.log('[useChileLoaderModalState] Loaded state:', isDismissedValue);
      setIsDismissed(isDismissedValue);
    }

    setIsLoading(false);
  }, [isInitializing, user?.email]);

  // Marcar como cerrado
  const dismiss = () => {
    console.log('[useChileLoaderModalState] Dismissing modal');
    setIsDismissed(true);
    setInLocalStorage(STORAGE_KEY, 'true');
  };

  // Resetear (para testing o casos especiales)
  const reset = () => {
    console.log('[useChileLoaderModalState] Resetting state');
    setIsDismissed(false);
    removeFromLocalStorage(STORAGE_KEY);
  };

  return {
    isDismissed,
    dismiss,
    reset,
    isLoading,
  };
}
