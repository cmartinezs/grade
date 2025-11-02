# Migración de Firestore a Firebase Data Connect

## 📋 Resumen

Se ha actualizado el sistema de autenticación para usar **Firebase Data Connect** en lugar de Firestore. Esto permite una integración más consistente con la base de datos PostgreSQL.

## 🔄 Cambios Principales

### Antes (Firestore)
```typescript
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Obtener usuario
const userDocRef = doc(db, 'users', firebaseUser.uid);
const userDocSnap = await getDoc(userDocRef);
const userData = userDocSnap.data();
```

### Después (Data Connect)
```typescript
import { getUserByEmail, createUser } from '@/lib/userDataConnect';

// Obtener usuario
const userData = await getUserByEmail(firebaseUser.email);
```

## 📁 Archivos Modificados

### 1. `/src/contexts/AuthContext.tsx`
**Cambios:**
- ✅ Reemplazó importes de Firestore con `userDataConnect`
- ✅ `onAuthStateChanged` ahora llama `getUserByEmail()`
- ✅ `login()` obtiene datos desde Data Connect
- ✅ `register()` crea usuario en Data Connect
- ✅ `refreshUser()` sincroniza desde Data Connect
- ✅ Mantiene persistencia en localStorage

**Flujo:**
```
Firebase Auth → Data Connect Query → localStorage → Context
```

### 2. `/src/lib/userDataConnect.ts` (Nuevo)
**Funciones:**
- `getUserByEmail(email)` - Obtener usuario por email
- `getUserById(userId)` - Obtener usuario por ID (placeholder)
- `createUser(userData)` - Crear nuevo usuario
- `updateUser(userId, updates)` - Actualizar usuario

**Nota:** Requiere `NEXT_PUBLIC_DATACONNECT_ENDPOINT` configurado

### 3. `/dataconnect/example/mutations.gql`
**Adiciones:**
- ✅ `CreateUser` mutation
- ✅ `UpdateUser` mutation
- ✅ Ambas con autorización basada en roles

### 4. `/dataconnect/example/queries.gql`
**Ya existente:**
- ✅ `GetUserByEmail` query

## 🔐 Flujo de Autenticación (Actualizado)

### Login Flow
```
1. signInWithEmailAndPassword(Firebase Auth)
   ↓
2. getUserByEmail(Data Connect Query)
   ↓
3. Crear objeto User local
   ↓
4. Guardar en localStorage
   ↓
5. Actualizar AuthContext
   ↓
6. Redirigir a dashboard
```

### Register Flow
```
1. createUserWithEmailAndPassword(Firebase Auth)
   ↓
2. createUser(Data Connect Mutation)
   ↓
3. Validar creación en Data Connect
   ↓
4. Crear objeto User local
   ↓
5. Guardar en localStorage
   ↓
6. Actualizar AuthContext
   ↓
7. Redirigir a dashboard
```

## 🗂️ Estructura de Datos

### User en Firebase Auth
```
- uid: string
- email: string
- password: hash
```

### User en Data Connect (PostgreSQL)
```
- userId: UUID
- name: String
- email: String
- role: String
- createdAt: Timestamp
- updatedAt: Timestamp
- updatedBy: UUID
- deletedAt: Timestamp
```

### User en localStorage
```json
{
  "id": "uuid-from-dataconnect",
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@email.com",
  "role": "teacher",
  "institution": "Colegio ABC",
  "firebaseUid": "firebase-uid"
}
```

## 🔌 Llamadas a API Data Connect

```typescript
// Ejemplo: Obtener usuario por email
POST /query/GetUserByEmail
Headers:
  Authorization: Bearer {idToken}
  Content-Type: application/json

Body:
{
  "email": "usuario@email.com"
}

Response:
{
  "data": {
    "user": {
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Juan Pérez",
      "email": "usuario@email.com",
      "role": "teacher",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

## ⚙️ Configuración Requerida

### `.env.local`
```
NEXT_PUBLIC_DATACONNECT_ENDPOINT=https://your-dataconnect-endpoint.com
```

## 📊 Comparativa: Firestore vs Data Connect

| Aspecto | Firestore | Data Connect |
|---|---|---|
| Base de datos | NoSQL (JSON) | PostgreSQL (Relacional) |
| Consultas | Firestore SDK | GraphQL SDL |
| Escalabilidad | Buena | Excelente |
| Costos | Por documento | Por query |
| Sincronización | Real-time | Manual |
| Control de permisos | Firestore Rules | @auth directives |

## 🔄 Sincronización de Datos

### Cómo mantener sincronización:
1. **Login/Register** - Datos frescos de Data Connect
2. **Refrescar manualmente** - `useAuth().refreshUser()`
3. **localStorage** - Recupera sesión al recargar
4. **onAuthStateChanged** - Monitorea cambios en Firebase

### Cuándo sincronizar:
```typescript
// En componentes
const { refreshUser } = useAuth();

// Después de actualizar perfil
await updateUser(userId, newData);
await refreshUser(); // Sincronizar contexto
```

## 🛡️ Seguridad

### Autorización en Data Connect
```graphql
mutation UpdateUser(...) @auth(expr: "$updatedBy == auth.uid || auth.token.role == 'ADMIN'") {
  ...
}
```

**Garantías:**
- ✅ Solo el dueño o ADMIN pueden actualizar
- ✅ `auth.uid` extraído desde token JWT
- ✅ Validación en servidor
- ✅ No expuesto al cliente

## 📝 Variables de Entorno

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx

# Data Connect
NEXT_PUBLIC_DATACONNECT_ENDPOINT=https://dataconnect.googleapis.com

# Opcional
NEXT_PUBLIC_DATACONNECT_API_VERSION=v1beta
```

## 🚀 Próximos Pasos

1. ✅ Autenticación con Data Connect
2. ✅ Persistencia en localStorage
3. ⏳ Queries adicionales en Data Connect
4. ⏳ Mutations para perfil de usuario
5. ⏳ Testing exhaustivo

## 📚 Referencias

- [Firebase Data Connect Docs](https://firebase.google.com/docs/dataconnect)
- [GraphQL SDL Reference](https://firebase.google.com/docs/dataconnect/sdl)
- [Auth in Data Connect](https://firebase.google.com/docs/dataconnect/auth)

## ⚠️ Notas Importantes

1. **Requisito**: `firebase dataconnect:sdk:generate` debe ejecutarse para sincronizar tipos
2. **Endpoint**: Debe estar configurado correctamente en `.env.local`
3. **Tokens**: Se obtienen automáticamente de Firebase Auth
4. **Fallback**: Si Data Connect falla, el usuario se marca como no autenticado

## 🐛 Troubleshooting

### "User not found in Data Connect"
**Causa**: Usuario existe en Firebase Auth pero no en PostgreSQL
**Solución**: Ejecutar mutation `CreateUser` manualmente o sincronizar datos

### "No authentication token available"
**Causa**: Usuario no autenticado
**Solución**: Redirigir a login

### "Data Connect endpoint not configured"
**Causa**: Variable de entorno no definida
**Solución**: Agregar `NEXT_PUBLIC_DATACONNECT_ENDPOINT` a `.env.local`
