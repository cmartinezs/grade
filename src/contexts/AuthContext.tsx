'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLoading } from './LoadingContext';

// Tipos
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  institution?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  institution?: string;
  role: string;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { setLoading, setLoadingMessage } = useLoading();

  // Simulamos verificar si hay un usuario autenticado al cargar
  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      setLoadingMessage('Verificando autenticación...');
      
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          // Reestablecer cookie si hay usuario guardado
          document.cookie = 'authenticated=true; path=/; max-age=86400';
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setLoading, setLoadingMessage]);

  const login = async (email: string, _password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setLoadingMessage('Iniciando sesión...');
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Usuario demo para testing
      const mockUser: User = {
        id: '1',
        firstName: 'Demo',
        lastName: 'User',
        email: email,
        role: 'teacher',
        institution: 'Universidad Demo'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Establecer cookie para el middleware
      document.cookie = 'authenticated=true; path=/; max-age=86400'; // 24 horas
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      setLoadingMessage('Creando cuenta...');
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUser: User = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        institution: userData.institution
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Establecer cookie para el middleware
      document.cookie = 'authenticated=true; path=/; max-age=86400'; // 24 horas
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // Limpiar cookie del middleware
    document.cookie = 'authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}