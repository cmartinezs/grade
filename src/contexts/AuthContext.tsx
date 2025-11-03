'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLoading } from './LoadingContext';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getUserByEmail, createNewUser } from '@/lib/userDataConnect';

// Tipos
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  institution?: string;
  firebaseUid?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
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

  // Restaurar usuario desde localStorage al cargar
  useEffect(() => {
    const restoreUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error restoring user from localStorage:', error);
        localStorage.removeItem('user');
      }
    };

    restoreUserFromStorage();
  }, []);

  // Verificar si hay un usuario autenticado al cargar
  useEffect(() => {
    const checkAuth = () => {
      // Monitorear cambios de autenticación en Firebase
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        try {
          if (firebaseUser) {
            // Obtener datos del usuario desde Data Connect
            const userData = await getUserByEmail(firebaseUser.email || '');
            
            if (userData) {
              const user: User = {
                id: userData.userId,
                firstName: userData.name.split(' ')[0] || '',
                lastName: userData.name.split(' ').slice(1).join(' ') || '',
                email: userData.email,
                role: userData.role,
                institution: undefined,
                firebaseUid: firebaseUser.uid
              };
              setUser(user);
              // Persistir en localStorage
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('authToken', await firebaseUser.getIdToken());
              document.cookie = 'authenticated=true; path=/; max-age=86400';
            } else {
              // Usuario en Firebase pero no en Data Connect
              console.warn('User not found in Data Connect');
            }
          } else {
            // No hay usuario autenticado
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
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
      
      // Obtener datos del usuario desde Data Connect
      const userData = await getUserByEmail(firebaseUser.email || '');
      
      if (!userData) {
        console.error('User profile not found in Data Connect');
        return false;
      }
      
      const user: User = {
        id: userData.userId,
        firstName: userData.name.split(' ')[0] || '',
        lastName: userData.name.split(' ').slice(1).join(' ') || '',
        email: userData.email,
        role: userData.role,
        institution: undefined,
        firebaseUid: firebaseUser.uid
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', await firebaseUser.getIdToken());
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
      
      // Generar UUID para el usuario (será su propio creador)
      const userId = crypto.randomUUID?.() || `uuid-${Date.now()}`;
      
      // Guardar datos del usuario en Data Connect
      const fullName = `${userData.firstName} ${userData.lastName}`;
      const userDataConnectUser = await createNewUser({
        name: fullName,
        email: userData.email,
        role: userData.role
      }, userId); // El usuario es su propio creador
      
      if (!userDataConnectUser) {
        console.error('Failed to create user in Data Connect');
        // Eliminar usuario de Firebase si falla Data Connect
        await firebaseUser.delete();
        return false;
      }
      
      // Crear objeto de usuario local
      const user: User = {
        id: userDataConnectUser.userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        institution: userData.institution,
        firebaseUid: firebaseUser.uid
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', await firebaseUser.getIdToken());
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
      
      // Limpiar datos locales (niveles, categorías, cursos)
      localStorage.removeItem('levels');
      localStorage.removeItem('categories');
      localStorage.removeItem('courses');
      
      // Limpiar estado del modal Chile Data Loader
      localStorage.removeItem('chile_loader_modal_dismissed');
      localStorage.removeItem('chile_loader_modal_dismissed_user');
      
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
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

  // Función para refrescar datos del usuario desde Data Connect
  const refreshUser = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userData = await getUserByEmail(currentUser.email || '');
        
        if (userData) {
          const updatedUser: User = {
            id: userData.userId,
            firstName: userData.name.split(' ')[0] || '',
            lastName: userData.name.split(' ').slice(1).join(' ') || '',
            email: userData.email,
            role: userData.role,
            institution: undefined,
            firebaseUid: currentUser.uid
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isInitializing,
    login,
    register,
    logout,
    refreshUser
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
