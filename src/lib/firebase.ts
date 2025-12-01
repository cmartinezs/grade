import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicializar Firebase App principal
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// App secundaria para crear usuarios sin afectar la sesión actual
let secondaryApp: any = null;

export function getSecondaryApp() {
  if (!secondaryApp) {
    try {
      secondaryApp = initializeApp(firebaseConfig, 'Secondary');
    } catch (error: any) {
      // Si ya existe, obtenerla
      if (error.code === 'app/duplicate-app') {
        secondaryApp = getApp('Secondary');
      } else {
        throw error;
      }
    }
  }
  return secondaryApp;
}

// Obtener referencias de los servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth secundario para crear usuarios sin desloguear al usuario actual
export function getSecondaryAuth() {
  return getAuth(getSecondaryApp());
}

export default app;
