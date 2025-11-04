# 🗄️ Firebase Data Connect - Guía Técnica Completa

**Documentación técnica para desarrolladores trabajando con Firebase Data Connect, PostgreSQL y SDK de TypeScript.**

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Configuración Inicial](#configuración-inicial)
3. [Estructura de Esquema](#estructura-de-esquema)
4. [Queries (Lecturas)](#queries-lecturas)
5. [Mutations (Escrituras)](#mutations-escrituras)
6. [SDK y Generación de Código](#sdk-y-generación-de-código)
7. [Deploy a Firebase](#deploy-a-firebase)
8. [Mejores Prácticas](#mejores-prácticas)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Introducción

**Firebase Data Connect** es un servicio que proporciona una API GraphQL tipada para acceder a bases de datos PostgreSQL alojadas en Google Cloud SQL, con autenticación integrada de Firebase.

### Ventajas

- ✅ **API GraphQL tipada** - Seguridad de tipos desde GraphQL a TypeScript
- ✅ **Autenticación Firebase integrada** - Control de acceso basado en roles
- ✅ **Soft delete automático** - Auditoría y recuperación de datos
- ✅ **Generación de SDK** - Código TypeScript auto-generado
- ✅ **PostgreSQL nativo** - Base de datos relacional completa

### Estructura de Directorios

```
dataconnect/
├── .dataconnect/          # Código generado (no editar)
├── dataconnect.yaml       # Configuración principal
├── DDL.sql               # Schema PostgreSQL
├── schema/
│   └── schema.gql        # Tipos y tablas
└── example/
    ├── connector.yaml    # Configuración del connector
    ├── queries.gql       # Queries (lecturas)
    └── mutations.gql     # Mutations (escrituras)
```

---

## ⚙️ Configuración Inicial

### 1. Archivo `dataconnect.yaml`

```yaml
specVersion: "v1"
serviceId: "grade-2c5d1-2-service"
location: "southamerica-west1"
schema:
  source: "./schema"
  datasource:
    postgresql:
      database: "grade-2c5d1-2-database"
      cloudSql:
        instanceId: "grade-2c5d1-2-instance"
        # schemaValidation: "STRICT"     # Requiere coincidencia exacta
        # schemaValidation: "COMPATIBLE" # Permite diferencias menores
connectorDirs: ["./example"]
```

**Parámetros importantes:**
- `serviceId` - Identificador único del servicio Data Connect
- `location` - Región donde se aloja el servicio (ej. `southamerica-west1`)
- `database` - Nombre de la base de datos PostgreSQL en Cloud SQL
- `cloudSql.instanceId` - Identificador de la instancia Cloud SQL
- `connectorDirs` - Directorios que contienen queries y mutations

### 2. Configuración de Variables de Entorno

**Archivo `.env.local`:**

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=grade-2c5d1.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=grade-2c5d1
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=grade-2c5d1.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...

# Data Connect Endpoint
NEXT_PUBLIC_DATACONNECT_ENDPOINT=https://southamerica-west1-grade-2c5d1-2-service.firebaseio.com
```

### 3. Instalación de Firebase CLI

```bash
# Instalar Firebase CLI globalmente
npm install -g firebase-tools

# Verificar instalación
firebase --version

# Autenticarse con Firebase
firebase login

# Listar proyectos disponibles
firebase projects:list
```

---

## 📊 Estructura de Esquema

### Archivo `schema/schema.gql`

El schema define los tipos de datos y sus relaciones con la base de datos PostgreSQL.

#### Decoradores GraphQL

| Decorador | Propósito | Ejemplo |
|-----------|-----------|---------|
| `@table` | Mapea tipo a tabla PostgreSQL | `@table(name: "users", key: "userId")` |
| `@col` | Mapea campo a columna | `@col(name: "user_id")` |
| `@unique` | Define restricción única | `@unique` |
| `@default` | Valor por defecto | `@default(value: true)` |
| `@default(expr:)` | Expresión por defecto | `@default(expr: "request.time")` |

#### Ejemplo: Tipo User

```graphql
type User @table(name: "users", key: "userId") {
  # Identificador único del usuario
  userId: UUID! @col(name: "user_id")
  
  # Identificador de Firebase Auth
  firebaseId: String! @col(name: "firebase_id")
  
  # Datos del usuario
  name: String!
  email: String! @unique
  role: String!
  
  # Auditoría (timestamps)
  createdAt: Timestamp! @col(name: "created_at") @default(expr: "request.time")
  createdBy: UUID! @col(name: "created_by")
  updatedAt: Timestamp @col(name: "updated_at")
  updatedBy: UUID @col(name: "updated_by")
  
  # Soft Delete
  deletedAt: Timestamp @col(name: "deleted_at")
  deletedBy: UUID @col(name: "deleted_by")
}
```

#### Tipos Soportados

```graphql
# Tipos primitivos
String      # Texto
Int         # Número entero
Float       # Número decimal
Boolean     # Verdadero/Falso
UUID        # Identificador único (GUID)
Timestamp   # Fecha y hora

# Modificadores
Field!      # Campo requerido (NOT NULL)
[Field]     # Array/Lista
[Field!]!   # Array requerido de elementos requeridos
```

#### Relaciones entre Tipos

```graphql
type Subject @table(name: "subjects", key: "subjectId") {
  subjectId: UUID! @col(name: "subject_id")
  name: String!
  # ... otros campos
}

type Unit @table(name: "units", key: "unitId") {
  unitId: UUID! @col(name: "unit_id")
  
  # Relación: Una unidad pertenece a una asignatura
  subjectId: UUID! @col(name: "subject_fk")
  
  name: String!
  # ... otros campos
}
```

### DDL SQL (schema/DDL.sql)

Define las tablas físicas en PostgreSQL:

```sql
CREATE TABLE users (
  user_id       UUID PRIMARY KEY,
  firebase_id   TEXT NOT NULL,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  role          TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by    UUID NOT NULL REFERENCES users(user_id),
  updated_at    TIMESTAMPTZ,
  updated_by    UUID REFERENCES users(user_id),
  deleted_at    TIMESTAMPTZ,
  deleted_by    UUID REFERENCES users(user_id)
);

CREATE TABLE subjects (
  subject_id    UUID PRIMARY KEY,
  name          TEXT NOT NULL,
  code          VARCHAR(64) NOT NULL UNIQUE,
  active        BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by    UUID NOT NULL REFERENCES users(user_id),
  updated_at    TIMESTAMPTZ,
  updated_by    UUID REFERENCES users(user_id),
  deleted_at    TIMESTAMPTZ,
  deleted_by    UUID REFERENCES users(user_id)
);

-- Tabla de jerarquía: Asignatura -> Unidades
CREATE TABLE units (
  unit_id       UUID PRIMARY KEY,
  subject_fk    UUID NOT NULL REFERENCES subjects(subject_id),
  name          TEXT NOT NULL,
  active        BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by    UUID NOT NULL REFERENCES users(user_id),
  updated_at    TIMESTAMPTZ,
  updated_by    UUID REFERENCES users(user_id),
  deleted_at    TIMESTAMPTZ,
  deleted_by    UUID REFERENCES users(user_id),
  UNIQUE(subject_fk, name)
);

-- Tabla de jerarquía: Unidad -> Temas
CREATE TABLE topics (
  topic_id      UUID PRIMARY KEY,
  unit_fk       UUID NOT NULL REFERENCES units(unit_id),
  name          TEXT NOT NULL,
  active        BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by    UUID NOT NULL REFERENCES users(user_id),
  updated_at    TIMESTAMPTZ,
  updated_by    UUID REFERENCES users(user_id),
  deleted_at    TIMESTAMPTZ,
  deleted_by    UUID REFERENCES users(user_id),
  UNIQUE(unit_fk, name)
);
```

---

## 🔍 Queries (Lecturas)

### Archivo `example/queries.gql`

Las queries permiten leer datos de la base de datos.

#### Autenticación en Queries

```graphql
# Sin autenticación requerida
query PublicQuery {
  # datos públicos
}

# Requiere usuario autenticado (nivel USER)
query GetUserByEmail($email: String!) @auth(level: USER) {
  # datos para usuarios autenticados
}

# Requiere autorización específica (Admin o Owner)
query AdminQuery @auth(expr: "auth.token.role == 'ADMIN'") {
  # datos solo para admins
}
```

#### Ejemplos Comunes

**1. Obtener usuario por email**

```graphql
query GetUserByEmail($email: String!) @auth(level: USER) {
  users(where: {email: {eq: $email}}) {
    userId
    name
    email
    role
    createdAt
    updatedAt
  }
}
```

**Uso en TypeScript:**

```typescript
import { GetUserByEmailData, GetUserByEmailVariables } from '@/dataconnect-generated/types';
import { initializeDataConnect, executeQuery } from 'firebase/data-connect';

const dataConnect = initializeDataConnect({
  connector: userConnector,
});

async function getUserByEmail(email: string) {
  const result = await executeQuery<GetUserByEmailData, GetUserByEmailVariables>(
    dataConnect,
    GetUserByEmail,
    { email }
  );
  return result.data?.users?.[0];
}
```

**2. Listar todas las asignaturas**

```graphql
query ListSubjects @auth(level: USER) {
  subjects {
    subjectId
    name
    code
    active
    createdAt
  }
}
```

**3. Obtener asignatura con todas sus unidades y temas**

```graphql
query GetSubjectHierarchy($subjectId: UUID!) @auth(level: USER) {
  subject(key: { subjectId: $subjectId }) {
    subjectId
    name
    code
    createdAt
  }
  units(where: { subjectId: {eq: $subjectId}}) {
    unitId
    name
    createdAt
  }
  topics(where: { unitId: {in: $unitIds}}) {
    topicId
    name
    unitId
    createdAt
  }
}
```

**4. Búsqueda con filtros**

```graphql
query SearchSubjects($search: String!) @auth(level: USER) {
  subjects(where: {
    OR: [
      {name: {contains: $search}},
      {code: {contains: $search}}
    ]
  }) {
    subjectId
    name
    code
    active
  }
}
```

#### Operadores de Filtro

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `eq` | Igual | `{email: {eq: "user@example.com"}}` |
| `neq` | No igual | `{active: {neq: false}}` |
| `gt` | Mayor que | `{createdAt: {gt: "2024-01-01"}}` |
| `gte` | Mayor o igual | `{score: {gte: 80}}` |
| `lt` | Menor que | `{createdAt: {lt: "2024-12-31"}}` |
| `lte` | Menor o igual | `{score: {lte: 100}}` |
| `contains` | Contiene (texto) | `{name: {contains: "Math"}}` |
| `startsWith` | Comienza con | `{code: {startsWith: "MAT"}}` |
| `in` | En lista | `{role: {in: ["ADMIN", "TEACHER"]}}` |
| `notIn` | No en lista | `{role: {notIn: ["BANNED"]}}` |

---

## ✏️ Mutations (Escrituras)

### Archivo `example/mutations.gql`

Las mutations permiten crear, actualizar y eliminar datos.

#### Decorador `@auth`

```graphql
# Solo para admins
mutation AdminOnly @auth(expr: "auth.token.role == 'ADMIN'")

# Solo owner del recurso
mutation UserUpdate($userId: UUID!) 
  @auth(expr: "auth.uid == $userId || auth.token.role == 'ADMIN'")
```

#### Ejemplos de CRUD

**1. Crear usuario**

```graphql
mutation CreateUser(
  $userId: UUID!
  $firebaseId: String!
  $name: String!
  $email: String!
  $role: String!
  $createdBy: UUID!
) @auth(level: USER) {
  user_insert(
    data: {
      userId: $userId
      firebaseId: $firebaseId
      name: $name
      email: $email
      role: $role
      createdBy: $createdBy
    }
  )
}
```

**Uso en TypeScript:**

```typescript
import { generateUUID } from '@/lib/uuid';
import { createUser } from '@/lib/userDataConnect';

const newUser = await createUser({
  userId: generateUUID(),
  firebaseId: firebaseUser.uid,
  name: 'John Doe',
  email: firebaseUser.email,
  role: 'teacher',
  createdBy: currentUserId
});
```

**2. Actualizar asignatura**

```graphql
mutation UpdateSubject(
  $subjectId: UUID!
  $name: String
  $code: String
  $updatedBy: UUID!
  $updatedAt: Timestamp!
) @auth(level: USER) {
  subject_update(
    key: { subjectId: $subjectId }
    data: {
      name: $name
      code: $code
      updatedBy: $updatedBy
      updatedAt: $updatedAt
    }
  )
}
```

**3. Soft Delete (Desactivar)**

```graphql
mutation DeactivateSubject(
  $subjectId: UUID!
  $deletedAt: Timestamp!
  $deletedBy: UUID!
) @auth(level: USER) {
  subject_update(
    key: { subjectId: $subjectId }
    data: {
      active: false
      deletedAt: $deletedAt
      deletedBy: $deletedBy
    }
  )
}
```

**4. Soft Delete Undo (Reactivar)**

```graphql
mutation ReactivateSubject($subjectId: UUID!) @auth(level: USER) {
  subject_update(
    key: { subjectId: $subjectId }
    data: {
      active: true
      deletedAt: null
      deletedBy: null
    }
  )
}
```

#### Patrón de Soft Delete

En lugar de eliminar registros permanentemente, los marcamos como eliminados:

```typescript
// Eliminar
await updateSubject({
  subjectId,
  active: false,
  deletedAt: new Date().toISOString(),
  deletedBy: currentUserId,
  updatedBy: currentUserId,
  updatedAt: new Date().toISOString()
});

// Recuperar
await updateSubject({
  subjectId,
  active: true,
  deletedAt: null,
  deletedBy: null,
  updatedBy: currentUserId,
  updatedAt: new Date().toISOString()
});
```

---

## 🔧 SDK y Generación de Código

### Instalación de SDK

```bash
# Instalar dependencias de Data Connect
npm install firebase-admin firebase/data-connect
```

### Generación Automática de Código

**Archivo `example/connector.yaml`:**

```yaml
specVersion: "v1"
connectorId: "grade_connector"
language: "typescript"
output:
  typescript:
    package: "@/dataconnect-generated"
    relativeOutputPath: "."
```

### Generar SDK TypeScript

```bash
# Generar código tipado desde queries y mutations
firebase dataconnect:sql:generate

# O desde el root del proyecto
firebase generate
```

**Salida generada:**

```typescript
// @/dataconnect-generated/types.ts
export interface GetUserByEmailData {
  users: Array<{
    userId: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
}

export interface GetUserByEmailVariables {
  email: string;
}

// @/dataconnect-generated/queries.ts
export const GetUserByEmail = `
  query GetUserByEmail($email: String!) @auth(level: USER) {
    users(where: {email: {eq: $email}}) {
      userId
      name
      email
      role
      createdAt
    }
  }
`;
```

### Usando el SDK Generado

```typescript
import { initializeDataConnect, executeQuery } from 'firebase/data-connect';
import { GetUserByEmail } from '@/dataconnect-generated/queries';
import { GetUserByEmailData, GetUserByEmailVariables } from '@/dataconnect-generated/types';

const dataConnect = initializeDataConnect({
  connector: userConnector
});

async function fetchUser(email: string) {
  try {
    const result = await executeQuery<GetUserByEmailData, GetUserByEmailVariables>(
      dataConnect,
      GetUserByEmail,
      { email }
    );
    
    return result.data?.users?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
```

---

## 🚀 Deploy a Firebase

### 1. Preparar el Deploy

```bash
# Verificar cambios pendientes
firebase dataconnect:sql:list --project=your-project-id

# Validar schema
firebase dataconnect:sql:validate --project=your-project-id
```

### 2. Desplegar Esquema y Queries/Mutations

```bash
# Deploy completo (DDL + Queries + Mutations)
firebase dataconnect:sql:deploy --project=your-project-id

# Deploy solo de DDL
firebase deploy --only dataconnect:schemas --project=your-project-id

# Deploy solo de conectores
firebase deploy --only dataconnect:connectors --project=your-project-id
```

### 3. Verificar Deploy

```bash
# Listar servicios desplegados
firebase dataconnect:sql:list --project=your-project-id

# Ver información del servicio
firebase dataconnect:sql:describe --project=your-project-id
```

### 4. Deploy Completo de Firebase

```bash
# Deploy de toda la aplicación
npm run build
firebase deploy --project=your-project-id

# Deploy solo hosting
firebase deploy --only hosting --project=your-project-id

# Deploy con changelog
firebase deploy --project=your-project-id --message "Add new subjects queries"
```

### Workflow Recomendado

```bash
# 1. Hacer cambios en schema/queries/mutations
# 2. Generar código
firebase generate

# 3. Instalar dependencias si hay nuevas
npm install

# 4. Testear localmente
npm run dev

# 5. Build
npm run build

# 6. Deploy a staging/producción
firebase deploy --project=staging-project
firebase deploy --project=production-project
```

---

## 📚 Mejores Prácticas

### 1. Versionamiento de Cambios

```graphql
# Mantén versiones de queries importantes
query GetUserByEmail_v1($email: String!) @auth(level: USER) {
  users(where: {email: {eq: $email}}) {
    userId
    name
    email
  }
}

# Nueva versión con más campos
query GetUserByEmail_v2($email: String!) @auth(level: USER) {
  users(where: {email: {eq: $email}}) {
    userId
    name
    email
    role
    createdAt
  }
}
```

### 2. Auditoría con createdBy/updatedBy

```typescript
import { getCurrentUserId } from '@/contexts/AuthContext';

async function updateSubject(subjectId: string, name: string) {
  const currentUserId = await getCurrentUserId();
  
  return await updateSubject({
    subjectId,
    name,
    updatedBy: currentUserId,
    updatedAt: new Date().toISOString()
  });
}
```

### 3. Validación de Autorización

```graphql
# Asegurar que solo admins pueden crear usuarios
mutation CreateUser(
  $userId: UUID!
  $email: String!
  $role: String!
  $createdBy: UUID!
) @auth(expr: "auth.token.role == 'ADMIN'") {
  user_insert(data: {...})
}

# O validar que el usuario actual es quien crea
mutation CreateSubject(
  $subjectId: UUID!
  $name: String!
  $createdBy: UUID!
) @auth(expr: "auth.uid == $createdBy || auth.token.role == 'ADMIN'") {
  subject_insert(data: {...})
}
```

### 4. Documentación de Campos

```graphql
# Documentar campos complejos
type Subject @table(name: "subjects", key: "subjectId") {
  """
  Identificador único de la asignatura.
  Generado como UUID al crear.
  Inmutable después de creación.
  """
  subjectId: UUID! @col(name: "subject_id")
  
  """
  Código único de la asignatura.
  Ejemplo: MAT-101, ENG-102
  Usado para referencias rápidas.
  """
  code: String! @unique
}
```

### 5. Separación de Queries por Caso de Uso

```
dataconnect/example/
├── users/
│   ├── queries.gql        # GetUser, ListUsers, etc.
│   └── mutations.gql      # CreateUser, UpdateUser, etc.
├── subjects/
│   ├── queries.gql
│   └── mutations.gql
├── units/
│   ├── queries.gql
│   └── mutations.gql
└── topics/
    ├── queries.gql
    └── mutations.gql
```

---

## 🐛 Troubleshooting

### Problema: "Cannot connect to Cloud SQL"

**Solución:**
```bash
# Verificar conexión
gcloud sql instances describe grade-2c5d1-2-instance

# Verificar IP autorizada
gcloud sql instances describe grade-2c5d1-2-instance --format="value(ipAddresses[0])"

# Añadir IP si es necesario
gcloud sql instances patch grade-2c5d1-2-instance --authorized-networks=YOUR_IP
```

### Problema: "Schema validation failed"

**Solución:**
```bash
# Validar schema
firebase dataconnect:sql:validate

# Comparar con base de datos
firebase dataconnect:sql:validate --verbose

# Forzar compatibilidad en dataconnect.yaml
schemaValidation: "COMPATIBLE"
```

### Problema: "Unauthorized" en queries

**Verificar autenticación:**

```typescript
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;

if (!user) {
  console.error('User not authenticated');
  return;
}

console.log('Auth token:', await user.getIdToken());
```

### Problema: "Variables not provided"

**Solución:**

```typescript
// ❌ Incorrecto
const result = await executeQuery(dc, GetUserByEmail);

// ✅ Correcto
const result = await executeQuery(dc, GetUserByEmail, {
  email: 'user@example.com'
});
```

### Problema: "Type mismatch"

**Verificar tipos:**

```typescript
// Las variables deben coincidir con los tipos esperados
interface GetUserByEmailVariables {
  email: string;  // Debe ser string, no null
}

// ❌ Incorrecto
executeQuery(dc, GetUserByEmail, { email: null });

// ✅ Correcto
executeQuery(dc, GetUserByEmail, { email: 'user@example.com' });
```

---

## 📚 Referencias Adicionales

- [Firebase Data Connect Official Docs](https://firebase.google.com/docs/data-connect)
- [GraphQL Query Language](https://graphql.org/learn/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

---

**Última actualización:** Noviembre 2024  
**Versión:** Data Connect v1, Firebase SDK 11+
