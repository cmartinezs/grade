# 🚀 01 - Quick Start - Firebase Auth Integration

**Tiempo: 5 min | Lee esto primero si necesitas empezar RÁPIDO**

## 📋 Checklist Rápido

```bash
# 1. Obtener credenciales de Firebase Console
# Firebase Console → Configuración → Aplicaciones Web → Copiar config JSON

# 2. Configurar .env.local
nano .env.local
# Pega: NEXT_PUBLIC_FIREBASE_API_KEY=...
# Etc.

# 3. Guardar y reiniciar
Ctrl+C  # Detener servidor si está corriendo
npm run dev

# 4. Probar
# Ve a http://localhost:3000/auth/register
# Crea una cuenta
# Verifica en Firebase Console → Autenticación → Usuarios

# 5. Probar login
# Ve a http://localhost:3000/auth/login
# Usa las credenciales que creaste

# 6. Verificar en Firestore
# Firebase Console → Firestore Database → Colección users
# Deberías ver tu usuario con firstName, lastName, etc.
```

---

## 🔑 Cómo Obtener las Credenciales

### En Firebase Console:

```
1. firebase.google.com/console
2. Selecciona tu proyecto
3. Engranaje (⚙️) arriba a la derecha → "Configuración del proyecto"
4. Pestaña "General"
5. Desplázate a "Tus aplicaciones"
6. Haz clic en el ícono web </> 
7. Copia la configuración (el objeto JSON con apiKey, etc.)
```

### Mapeo de variables:

```
Firebase Console          →  .env.local
apiKey                    →  NEXT_PUBLIC_FIREBASE_API_KEY
authDomain                →  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
projectId                 →  NEXT_PUBLIC_FIREBASE_PROJECT_ID
storageBucket             →  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
messagingSenderId         →  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
appId                     →  NEXT_PUBLIC_FIREBASE_APP_ID
```

---

## 📱 URLs de Desarrollo

```
Login:              http://localhost:3000/auth/login
Register:           http://localhost:3000/auth/register
Dashboard:          http://localhost:3000/dashboard (requiere auth)
Questions Bank:     http://localhost:3000/questions-bank (requiere auth)
```

---

## 🧪 Pruebas Rápidas

### Test 1: Crear usuario por registro

```bash
1. npm run dev
2. Ve a http://localhost:3000/auth/register
3. Llena el formulario y crea cuenta
4. Verifica en Firebase Console
```

### Test 2: Login

```bash
1. Logout 
2. Ve a http://localhost:3000/auth/login
3. Usa las credenciales que creaste
```

### Test 3: Verificar sincronización

```bash
1. Abre dos pestañas
2. En una: Haz login
3. En la otra: Recarga (F5)
4. ✅ Ambas deben estar autenticadas
```

---

## 🐛 Troubleshooting Rápido

| Error | Solución |
|-------|----------|
| "Cannot find module 'firebase'" | `npm install firebase && npm run dev` |
| "NEXT_PUBLIC_FIREBASE_API_KEY is undefined" | Verifica .env.local, reinicia servidor |
| "FirebaseError: (auth/user-not-found)" | Crea el usuario con register |
| "User profile not found in Firestore" | Crea documento en Firestore /users/{uid} |
| "Port 3000 is in use" | `npm run dev -- -p 3001` |

---

**¡Listo! Ahora sigue a 02_FIREBASE_AUTH_SETUP.md para configuración detallada** 🎉
