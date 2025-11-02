# Guía de Autenticación - Grade Web App

## 📋 Descripción General

El sistema de autenticación está integrado con:
- **Firebase Authentication** - Gestión de credenciales y sesiones
- **Firestore** - Almacenamiento de datos de usuario
- **localStorage** - Persistencia de sesión en el navegador
- **Cookies** - Middleware de autenticación

## 🔐 Flujo de Autenticación

### Login

```typescript
import { useAuth } from '@/contexts/AuthContext';

export function LoginComponent() {
  const { login, isAuthenticated } = useAuth();
  
  const handleLogin = async () => {
    const success = await login('usuario@email.com', 'password123');
    if (success) {
      // Usuario autenticado, redirigir a dashboard
      window.location.href = '/dashboard';
    }
  };
  
  return <button onClick={handleLogin}>Iniciar Sesión</button>;
}
```

**Qué ocurre al login:**
1. ✅ Autenticación en Firebase Auth
2. ✅ Obtención de datos de Firestore
3. ✅ Almacenamiento en localStorage (`user`, `authToken`)
4. ✅ Configuración de cookie de sesión
5. ✅ Estado actualizado en AuthContext

### Register

```typescript
const { register } = useAuth();

const success = await register({
  firstName: 'Juan',
  lastName: 'Pérez',
  email: 'juan@email.com',
  password: 'secure_password',
  role: 'teacher',
  institution: 'Colegio ABC'
});
```

**Qué ocurre al registro:**
1. ✅ Creación de usuario en Firebase Auth
2. ✅ Guardado de datos en Firestore
3. ✅ Almacenamiento en localStorage
4. ✅ Cookie de sesión establecida

### Logout

```typescript
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  // Redirección automática a home
};
```

## 💾 Persistencia de Sesión

### localStorage

Se almacenan dos elementos:

```javascript
// 1. Datos del usuario
{
  id: "firebase-uid",
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan@email.com",
  role: "teacher",
  institution: "Colegio ABC",
  firebaseUid: "firebase-uid"
}

// 2. Token de autenticación
localStorage.setItem('authToken', firebaseUser.getIdToken());
```

### Restauración automática

Al cargar la aplicación, el AuthContext automáticamente:
1. ✅ Lee `localStorage.getItem('user')`
2. ✅ Restaura el estado del usuario
3. ✅ Monitorea cambios en Firebase Auth

```typescript
// Esto ocurre automáticamente en AuthProvider
useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }
}, []);
```

## 🔄 Refrescar Datos del Usuario

Si necesitas actualizar los datos del usuario desde Firestore:

```typescript
const { user, refreshUser } = useAuth();

const handleUpdateProfile = async () => {
  // Actualizar en Firestore...
  await updateUserProfile();
  
  // Refrescar contexto desde Firestore
  await refreshUser();
};
```

## 🎯 Uso en Componentes

### Obtener usuario actual

```typescript
'use client'
import { useAuth } from '@/contexts/AuthContext';

export function UserProfile() {
  const { user, isAuthenticated, isInitializing } = useAuth();
  
  if (isInitializing) return <div>Cargando...</div>;
  if (!isAuthenticated) return <div>No autenticado</div>;
  
  return (
    <div>
      <h1>Hola, {user?.firstName}</h1>
      <p>Email: {user?.email}</p>
      <p>Rol: {user?.role}</p>
    </div>
  );
}
```

### Proteger rutas

```typescript
'use client'
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isInitializing]);
  
  if (isInitializing) return <div>Cargando...</div>;
  if (!isAuthenticated) return null;
  
  return <>{children}</>;
}
```

## 📦 Estructura de Datos

### User Interface

```typescript
interface User {
  id: string;                    // Firebase UID
  firstName: string;
  lastName: string;
  email: string;
  role: string;                  // 'admin', 'teacher', 'student'
  institution?: string;
  firebaseUid?: string;          // Referencia a Firebase Auth
}
```

## 🔄 Relación con Firebase Data Connect

Para futuras integraciones con Firebase Data Connect:

```typescript
// GetUserByEmail query
query GetUserByEmail($email: String!) @auth(level: USER) {
  user(key: { email: $email }) {
    userId
    name
    email
    role
    createdAt
    updatedAt
    updatedBy
    deletedAt
  }
}
```

Los datos de usuario se pueden sincronizar entre:
- **Firebase Auth** - Credenciales y sesión
- **Firestore** - Datos de usuario (actual)
- **Firebase Data Connect** - Base de datos PostgreSQL (futuro)

## ⚙️ Configuración

### AuthContext Provider

Envuelve tu aplicación con el provider:

```typescript
// app/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <LoadingProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
```

## 🛡️ Middleware

Verifica autenticación en rutas protegidas:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authenticated = request.cookies.get('authenticated');
  
  if (!authenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*']
};
```

## 📊 Estados de Autenticación

| Estado | Descripción |
|---|---|
| `isInitializing: true` | Cargando datos iniciales |
| `isAuthenticated: false` | Usuario no autenticado |
| `isAuthenticated: true` | Usuario autenticado |
| `user: null` | Sin datos de usuario |
| `user: {...}` | Datos de usuario disponibles |

## 🚀 Próximos Pasos

1. ✅ Autenticación básica con Firebase
2. ✅ Persistencia en localStorage
3. ⏳ Sincronización con Firebase Data Connect
4. ⏳ Roles y permisos granulares
5. ⏳ Multi-factor authentication (MFA)
6. ⏳ OAuth integrations

## 📝 Notas

- Los tokens se refreshan automáticamente en `onAuthStateChanged`
- localStorage se limpia al logout
- Las cookies se configuran con max-age de 24 horas
- El usuario se restaura automáticamente al recargar la página
