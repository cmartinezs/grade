'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeRedirect() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Si el usuario está autenticado, redirigir al dashboard
    if (isAuthenticated) {
      router.replace('/dashboard');
    } else {
      // Si no está autenticado, redirigir a la página pública
      router.replace('/public');
    }
  }, [router, isAuthenticated]);

  return null;
}
