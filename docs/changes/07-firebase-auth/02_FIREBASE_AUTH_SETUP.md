# 🔐 02 - Firebase Authentication Setup

**Tiempo: 15 min | Guía paso a paso completa**

## 1. Configurar Variables de Entorno

### Paso 1.1: Obtener credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto
3. Ve a **⚙️ Configuración del proyecto** (esquina superior derecha)
4. En la pestaña **General**, busca la sección "Tus apps"
5. Haz clic en el ícono de web `</>`
6. Copia la configuración JSON que aparece

### Paso 1.2: Actualizar .env.local

El archivo `.env.local` ya está creado. Reemplaza los valores:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aquí
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_id_proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### Paso 1.3: Reinicia el servidor

```bash
# Si está corriendo, presiona Ctrl+C para detener
npm run dev
```

---

## 2. Habilitar Métodos de Autenticación en Firebase

1. Ve a **Autenticación** en Firebase Console
2. Haz clic en **Comenzar**
3. En **Métodos de acceso**, habilita **Email/Contraseña**
4. Asegúrate de que **Email/Contraseña** esté habilitado

---

## 3. Crear la Colección de Usuarios en Firestore

La aplicación espera una colección `users` con la siguiente estructura:

```typescript
// Documento: /users/{uid}
{
  firstName: string;
  lastName: string;
  email: string;
  role: string; // 'student', 'teacher', 'admin'
  institution?: string;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### Opción A: Crear usuarios manualmente (Testing)

1. Ve a **Firestore Database** en Firebase Console
2. Crea una colección llamada `users`
3. Añade un documento con el siguiente contenido:

```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "role": "teacher",
  "institution": "Mi Instituto",
  "createdAt": "2024-11-02T12:00:00Z",
  "updatedAt": "2024-11-02T12:00:00Z"
}
```

**Importante:** El ID del documento DEBE ser el UID del usuario en Firebase Auth.

### Opción B: Registro automático al crear cuenta

Cuando un usuario se registra, se crea automáticamente en Firestore.

---

## 4. Crear Usuarios de Prueba en Firebase Auth

### Opción A: Desde Firebase Console

1. Ve a **Autenticación** → **Usuarios**
2. Haz clic en **Crear usuario**
3. Ingresa email y contraseña

### Opción B: Usando la App

1. Ve a `http://localhost:3000/auth/register`
2. Completa el formulario de registro
3. Se creará automáticamente en Firebase Auth y Firestore

---

## 5. Probar la Integración

### Test de Login

```bash
# 1. Inicia la aplicación
npm run dev

# 2. Ve a http://localhost:3000/auth/login

# 3. Ingresa credenciales:
Email: juan@example.com
Contraseña: tu_contraseña_aquí

# 4. Deberías ser redirigido al dashboard
```

### Test de Registro

```bash
# 1. Ve a http://localhost:3000/auth/register

# 2. Completa el formulario

# 3. Verifica en Firebase Console:
# - Autenticación → Usuarios (debe haber un nuevo usuario)
# - Firestore → users (debe haber un nuevo documento)
```

---

## 6. Estructura de Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot find module 'firebase/auth'` | Firebase no instalado | `npm install firebase` |
| `FirebaseError: (auth/user-not-found)` | Email no existe en Firebase Auth | Crea el usuario primero o regístrate |
| `FirebaseError: (auth/wrong-password)` | Contraseña incorrecta | Verifica la contraseña |
| `User profile not found in Firestore` | Documento no existe en Firestore | Crea el usuario en Firestore manualmente |
| `NEXT_PUBLIC_FIREBASE_API_KEY is undefined` | Variables de entorno no cargadas | Reinicia el servidor |

---

**Próximo: 03_FIRESTORE_STRUCTURE.md para entender la estructura de datos** ✅
