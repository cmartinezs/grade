# Creación Automática de Cuentas de Estudiantes

## Descripción General

Cuando se crea un nuevo estudiante a través del sistema, automáticamente se genera una cuenta de acceso completa que incluye:

1. **Registro en Firebase Authentication**: Usuario con credenciales de acceso
2. **Registro en Data Connect (tabla `students`)**: Datos académicos del estudiante
3. **Registro en Data Connect (tabla `users`)**: Datos de la cuenta de usuario

## Flujo de Creación

### 1. Entrada de Datos (EnrollStudentModal)

El administrador/coordinador ingresa:
- Nombre
- Apellido  
- Email (formato válido)
- RUT/ID (mínimo 6 caracteres - requisito de Firebase Authentication)

### 2. Validaciones Previas

Antes de crear cualquier registro, se valida:

```typescript
// Validación en Frontend (EnrollStudentModal)
- RUT/ID: Mínimo 6 caracteres
- Email: Formato válido (regex)

// Validación en Backend (studentDataConnect)
function validateFirebaseAuthRequirements(email, password):
  - Email: Formato válido
  - Password (RUT/ID): Mínimo 6 caracteres
  
// Si alguna validación falla, se muestra error y NO se crea nada
```

### 3. Proceso Automático (Orden Transaccional)

### 3. Proceso Automático (Orden Transaccional)

**IMPORTANTE**: El orden de creación cambió para evitar datos huérfanos:

```typescript
// studentDataConnect.ts - createStudentInDataConnect()

// PASO 0: Validar requisitos de Firebase Authentication
const validation = validateFirebaseAuthRequirements(email, identifier);
if (!validation.valid) throw new Error(validation.error);

// PASO 1: Crear usuario en Firebase Authentication PRIMERO
// Si esto falla, NO se crea nada en Data Connect
const userCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  identifier  // RUT como contraseña (min 6 chars)
);

// PASO 2: Crear estudiante en Data Connect
try {
  await createStudent({
    studentId: UUID,
    firstName,
    lastName,
    identifier,
    email,
    createdBy: userId,
    firebaseId: firebaseUid
  });
} catch (error) {
  // ROLLBACK: Eliminar usuario de Auth si falla
  await userCredential.user.delete();
  throw error;
}

// PASO 3: Crear registro User en Data Connect
try {
  await createNewUser({
    name: `${firstName} ${lastName}`,
    email,
    role: UserRole.ESTUDIANTE
  }, studentFirebaseUid);
} catch (error) {
  // ROLLBACK: Eliminar usuario de Auth si falla
  await userCredential.user.delete();
  // TODO: También eliminar estudiante de Data Connect
  throw error;
}
```

**Ventajas de este orden:**
1. ✅ No se crean estudiantes sin cuenta de acceso
2. ✅ No se crean registros en Data Connect si falla Auth
3. ✅ Rollback automático si falla cualquier paso
4. ✅ Mensajes de error claros y específicos

### 3. Credenciales Generadas

**Email**: El ingresado por el administrador  
**Contraseña inicial**: El RUT/ID ingresado (mínimo 6 caracteres)  
**Rol**: `ESTUDIANTE`

### 4. Mensajes de Error Específicos

El sistema proporciona mensajes claros según el tipo de error:

- `auth/weak-password`: "La contraseña debe tener al menos 6 caracteres. El RUT/ID ingresado es muy corto."
- `auth/email-already-in-use`: "El email ya está registrado en el sistema"
- `auth/invalid-email`: "El formato del email no es válido"
- Validación previa: "El RUT/ID debe tener al menos 6 caracteres (requerimiento de Firebase Authentication)"

## Detalles Técnicos

### Base de Datos

#### Tabla `students`
```graphql
type Student @table(name: "students", key: "studentId") {
  studentId: UUID!
  firstName: String!
  lastName: String!
  identifier: String!  # RUT/ID único
  email: String!
  createdAt: Timestamp!
  createdBy: UUID!
  firebaseId: String!
  # ...
}
```

#### Tabla `users`
```graphql
type User @table(name: "users", key: "userId") {
  userId: UUID!
  firebaseId: String!
  name: String!
  email: String!
  role: String!  # "ESTUDIANTE"
  createdAt: Timestamp!
  createdBy: UUID!
  # ...
}
```

### Manejo de Errores

El sistema implementa un enfoque **transaccional con rollback automático**:

#### Escenario 1: Validación Falla
**Acción**: Se muestra error al usuario  
**Estado**: ❌ No se crea nada  
**Ejemplo**: "El RUT/ID debe tener al menos 6 caracteres"

#### Escenario 2: Firebase Auth Falla (Paso 1)
**Acción**: Se muestra error específico  
**Estado**: ❌ No se crea nada en Data Connect  
**Ejemplos**: 
- Email duplicado: "El email ya está registrado en el sistema"
- Contraseña débil: "La contraseña debe tener al menos 6 caracteres"

#### Escenario 3: Creación de Student Falla (Paso 2)
**Acción**: Rollback automático  
**Estado**: 
- ❌ Se elimina usuario de Firebase Auth
- ❌ No se crea registro User en Data Connect  
**Mensaje**: "Error al crear estudiante en Data-Connect"

#### Escenario 4: Creación de User Falla (Paso 3)
**Acción**: Rollback automático  
**Estado**: 
- ❌ Se elimina usuario de Firebase Auth
- ⚠️ Estudiante queda en Data Connect (TODO: implementar eliminación)  
**Mensaje**: "Error al crear registro de usuario en Data-Connect"

#### Escenario 5: Éxito Completo
**Estado**: 
- ✅ Usuario en Firebase Auth
- ✅ Registro en tabla `students`
- ✅ Registro en tabla `users`  
**Mensaje**: "✅ Estudiante [Nombre] creado exitosamente..."

Esta estrategia **previene datos huérfanos** y asegura consistencia entre Firebase Auth y Data Connect.

### Roles de Usuario

```typescript
// src/types/role.ts
export enum UserRole {
  DOCENTE = 'DOCENTE',
  COORDINADOR = 'COORDINADOR',
  ADMIN = 'ADMIN',
  ESTUDIANTE = 'ESTUDIANTE'  // Nuevo rol agregado
}
```

## Interfaz de Usuario

### Mensaje Informativo

Al crear un nuevo estudiante, se muestra un panel informativo:

```
ℹ️ Creación automática de cuenta:
• Se creará automáticamente una cuenta de acceso para el estudiante
• Email: El que ingresaste arriba
• Contraseña inicial: El RUT/ID ingresado
• Rol: Estudiante
• El estudiante podrá iniciar sesión y cambiar su contraseña
```

### Mensaje de Éxito

Después de crear el estudiante exitosamente:

```
✅ Estudiante [Nombre Apellido] creado exitosamente.
📧 Cuenta de acceso creada con email: [email]
🔑 Contraseña inicial: [RUT/ID]
```

El modal se cierra automáticamente después de 3 segundos para permitir que el usuario lea la información.

## Seguridad

### Requisitos de Firebase Authentication

**Contraseña (RUT/ID)**:
- ✅ Mínimo 6 caracteres (validado en frontend y backend)
- ⚠️ Temporal: Se usa el RUT/ID como contraseña inicial
- 🔄 Debe cambiarse: El estudiante debería cambiar su contraseña en el primer inicio de sesión

**Email**:
- ✅ Formato válido (validado con regex)
- ✅ Único en el sistema (validado por Firebase Auth)

### Validaciones Implementadas

#### Frontend (EnrollStudentModal.tsx)
```typescript
// Validación de longitud mínima
if (newStudent.identifier.trim().length < 6) {
  setError('El RUT/ID debe tener al menos 6 caracteres...');
  return;
}

// Validación de formato de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(newStudent.email)) {
  setError('El email no tiene un formato válido');
  return;
}
```

#### Backend (studentDataConnect.ts)
```typescript
function validateFirebaseAuthRequirements(email: string, password: string) {
  // Validar formato email
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'El email no tiene un formato válido' };
  }
  
  // Validar longitud mínima de contraseña
  if (password.length < 6) {
    return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres...' };
  }
  
  return { valid: true };
}
```

### Recomendaciones

1. ✅ **Validación en frontend y backend**: Ya implementado
2. 🔄 **Cambio de contraseña obligatorio** en el primer inicio de sesión
3. 📧 **Enviar email de bienvenida** con instrucciones para cambiar contraseña
4. ⚠️ **Validar formato del RUT chileno**: Si aplica para el contexto (ej: 12.345.678-9)
5. 🔒 **Política de contraseñas más estricta**: Considerar complejidad adicional
6. 📝 **Implementar soft-delete de estudiantes**: Para rollback completo en caso de error

## Archivos Modificados

### Funcionalidad Principal
- `src/lib/studentDataConnect.ts`: Lógica de creación integrada
- `src/lib/userDataConnect.ts`: Función `createNewUser` reutilizada
- `src/types/role.ts`: Agregado rol `ESTUDIANTE`

### Interfaz de Usuario  
- `src/app/evaluation-management/courses/[id]/EnrollStudentModal.tsx`: 
  - Mensaje informativo actualizado
  - Mensaje de éxito mejorado
  - Delay de cierre aumentado

### Schema
- `dataconnect/schema/schema.gql`: Tabla `students` y `users`
- `dataconnect/example/mutations.gql`: Mutaciones `CreateStudent` y `CreateUser`

## Pruebas Recomendadas

### Caso de Éxito
1. Crear estudiante con datos válidos
2. Verificar registro en tabla `students`
3. Verificar registro en Firebase Auth
4. Verificar registro en tabla `users`
5. Intentar login con email y RUT/ID

### Casos de Error
1. Email duplicado: Verificar que el estudiante se cree sin cuenta Auth
2. RUT/ID duplicado: Debe fallar la creación del estudiante
3. Email inválido: Validación de frontend debe prevenir

### Casos Límite
1. Email muy largo
2. RUT/ID con caracteres especiales
3. Nombres con caracteres Unicode/acentos

## Mejoras Futuras

1. ✅ **Validación de longitud mínima**: Ya implementado (6 caracteres)
2. 🔄 **Email de bienvenida automático**: Enviar credenciales por correo
3. 🔄 **Cambio de contraseña obligatorio**: Forzar en primer login
4. 🔄 **Generación de contraseña aleatoria**: Más seguro que usar RUT/ID
5. 📝 **Logs de auditoría**: Registrar creación de cuentas
6. 🔄 **Soft-delete con rollback**: Eliminar estudiante si falla creación de User
7. ✅ **Validación de RUT chileno**: Formato 12.345.678-9 (opcional según contexto)
8. 🔄 **Reactivación de cuentas**: Si un estudiante se elimina y se recrea
9. 🔄 **Verificación de email**: Enviar link de verificación antes de permitir acceso

## Referencias

- [Firebase Authentication - createUserWithEmailAndPassword](https://firebase.google.com/docs/auth/web/password-auth)
- [Firebase Data Connect - Mutations](https://firebase.google.com/docs/data-connect/gql-mutations)
- `docs/AUTH_GUIDE.md`: Guía general de autenticación
- `docs/UUID_ARCHITECTURE.md`: Sistema de identificadores únicos
