# 📊 03 - Firestore Structure

**Tiempo: 10 min | Estructura de datos y seguridad**

## Estructura de Datos

### Colección: users

```typescript
// Documento: /users/{uid}
{
  firstName: string;              // Nombre
  lastName: string;               // Apellido
  email: string;                  // Email (coincide con Firebase Auth)
  role: string;                   // 'student' | 'teacher' | 'admin'
  institution?: string;           // Institución (opcional)
  createdAt: timestamp;           // Fecha de creación
  updatedAt: timestamp;           // Última actualización
}
```

### Ejemplo JSON

```json
{
  "users": {
    "abc123xyz": {
      "firstName": "María",
      "lastName": "González López",
      "email": "maria@example.com",
      "role": "teacher",
      "institution": "Universidad Nacional",
      "createdAt": "2024-11-02T10:00:00Z",
      "updatedAt": "2024-11-02T10:00:00Z"
    },
    "def456uvw": {
      "firstName": "Carlos",
      "lastName": "Rodríguez",
      "email": "carlos@example.com",
      "role": "student",
      "institution": "Instituto Técnico",
      "createdAt": "2024-11-01T15:30:00Z",
      "updatedAt": "2024-11-01T15:30:00Z"
    }
  }
}
```

---

## Reglas de Seguridad de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Solo el usuario puede leer su propio documento
    match /users/{uid} {
      allow read: if request.auth.uid == uid;
      allow update: if request.auth.uid == uid;
      allow create: if request.auth.uid == uid;
      allow delete: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Colecciones derivadas del usuario
    match /users/{uid}/saved_questions/{document=**} {
      allow read, write: if request.auth.uid == uid;
    }
    
    match /users/{uid}/courses/{document=**} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

---

**Próximo: 04_IMPLEMENTATION_SUMMARY.md para ver los cambios técnicos** ✅
