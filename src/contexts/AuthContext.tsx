'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLoading } from './LoadingContext';
import { auth, db } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
  isInitializing: boolean;
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
  const [isInitializing, setIsInitializing] = useState(true);
  const { setLoading, setLoadingMessage } = useLoading();
  // Verificar si hay un usuario autenticado al cargar
  useEffect(() => {
    const checkAuth = () => {
      // Monitorear cambios de autenticación en Firebase
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        try {
          if (firebaseUser) {
            // Obtener datos adicionales del usuario desde Firestore
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              const user: User = {
                id: firebaseUser.uid,
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: firebaseUser.email || '',
                role: userData.role || 'student',
                institution: userData.institution
              };
              setUser(user);
              localStorage.setItem('user', JSON.stringify(user));
              document.cookie = 'authenticated=true; path=/; max-age=86400';
            }
          } else {
            // No hay usuario autenticado
            setUser(null);
            localStorage.removeItem('user');
            document.cookie = 'authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          setUser(null);
        } finally {
          setIsInitializing(false);
        }
      });
      
      return unsubscribe;
    };
    
    const unsubscribe = checkAuth();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setLoadingMessage('Iniciando sesión...');
      
      // Autenticar con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Obtener datos adicionales del usuario desde Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        console.error('User profile not found in Firestore');
        return false;
      }
      
      const userData = userDocSnap.data();
      const user: User = {
        id: firebaseUser.uid,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: firebaseUser.email || email,
        role: userData.role || 'student',
        institution: userData.institution
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
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
      
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      
      const firebaseUser = userCredential.user;
      
      // Guardar datos adicionales en Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(userDocRef, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        institution: userData.institution || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      // Crear objeto de usuario local
      const user: User = {
        id: firebaseUser.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        institution: userData.institution
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
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
  const logout = async () => {
    try {
      setLoading(true);
      setLoadingMessage('Cerrando sesión...');
      
      // Cerrar sesión en Firebase
      await signOut(auth);
      
      setUser(null);
      localStorage.removeItem('user');
      // Limpiar cookie del middleware
      document.cookie = 'authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Redirigir a la página pública
      setTimeout(() => {
        setLoading(false);
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
    }
  };
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isInitializing,
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
