# 🗄️ Data Connect - Quick Reference

**Referencia rápida de comandos, ejemplos y patrones comunes.**

---

## 🚀 Comandos Firebase CLI

### Autenticación y Setup

```bash
# Autenticarse con Firebase
firebase login

# Listar proyectos
firebase projects:list

# Usar proyecto específico
firebase use --add
```

### Generación de Código

```bash
# Generar SDK TypeScript desde queries y mutations
firebase dataconnect:sql:generate

# O desde el root del proyecto
firebase generate
```

### Validación y Preview

```bash
# Validar schema
firebase dataconnect:sql:validate

# Validar con verbose (ver detalles)
firebase dataconnect:sql:validate --verbose

# Listar servicios actuales
firebase dataconnect:sql:list --project=PROJECT_ID
```

### Deploy a Producción

```bash
# Deploy completo (esquema + conectores)
firebase dataconnect:sql:deploy --project=PROJECT_ID

# Deploy solo esquema DDL
firebase deploy --only dataconnect:schemas --project=PROJECT_ID

# Deploy solo conectores (queries/mutations)
firebase deploy --only dataconnect:connectors --project=PROJECT_ID

# Deploy completo de la aplicación
firebase deploy --project=PROJECT_ID

# Deploy con mensaje
firebase deploy --project=PROJECT_ID --message "Add new subject queries"
```

---

## 📊 Schema GraphQL

### Tipos Básicos

```graphql
# Declarar tabla
type Subject @table(name: "subjects", key: "subjectId") {
  subjectId: UUID! @col(name: "subject_id")
  name: String!
  code: String! @unique
  active: Boolean! @default(value: true)
  createdAt: Timestamp! @default(expr: "request.time")
  createdBy: UUID!
  updatedAt: Timestamp
  deletedAt: Timestamp
}
```

### Decoradores

| Decorador | Uso |
|-----------|-----|
| `@table(name, key)` | Mapea tipo a tabla |
| `@col(name)` | Mapea campo a columna |
| `@unique` | Restricción única |
| `@default(value:)` | Valor por defecto |
| `@default(expr:)` | Expresión (ej. `request.time`) |

### Tipos Soportados

| Tipo | SQL | Ejemplo |
|------|-----|---------|
| `String` | TEXT | `name: String!` |
| `Int` | INTEGER | `score: Int` |
| `Float` | DECIMAL | `rating: Float` |
| `Boolean` | BOOLEAN | `active: Boolean!` |
| `UUID` | UUID | `userId: UUID!` |
| `Timestamp` | TIMESTAMPTZ | `createdAt: Timestamp!` |

---

## 🔍 Queries (Ejemplos Comunes)

### Obtener un registro

```graphql
query GetUserByEmail($email: String!) @auth(level: USER) {
  users(where: {email: {eq: $email}}) {
    userId
    name
    email
    role
  }
}
```

### Listar registros

```graphql
query ListSubjects @auth(level: USER) {
  subjects(where: {active: {eq: true}}) {
    subjectId
    name
    code
  }
}
```

### Búsqueda con filtros

```graphql
query SearchSubjects($search: String!) @auth(level: USER) {
  subjects(where: {
    OR: [
      {name: {contains: $search}},
      {code: {startsWith: $search}}
    ]
  }) {
    subjectId
    name
    code
  }
}
```

### Filtros Disponibles

```graphql
eq              # Igual
neq             # No igual
gt              # Mayor que
gte             # Mayor o igual
lt              # Menor que
lte             # Menor o igual
contains        # Contiene (texto)
startsWith      # Comienza con
in              # En lista
notIn           # No en lista
```

---

## ✏️ Mutations (Ejemplos Comunes)

### Crear registro

```graphql
mutation CreateSubject(
  $subjectId: UUID!
  $name: String!
  $code: String!
  $createdBy: UUID!
) @auth(level: USER) {
  subject_insert(data: {
    subjectId: $subjectId
    name: $name
    code: $code
    createdBy: $createdBy
    active: true
  })
}
```

### Actualizar registro

```graphql
mutation UpdateSubject(
  $subjectId: UUID!
  $name: String
  $updatedBy: UUID!
  $updatedAt: Timestamp!
) @auth(level: USER) {
  subject_update(
    key: {subjectId: $subjectId}
    data: {
      name: $name
      updatedBy: $updatedBy
      updatedAt: $updatedAt
    }
  )
}
```

### Soft Delete (Desactivar)

```graphql
mutation DeactivateSubject(
  $subjectId: UUID!
  $deletedAt: Timestamp!
  $deletedBy: UUID!
) @auth(level: USER) {
  subject_update(
    key: {subjectId: $subjectId}
    data: {
      active: false
      deletedAt: $deletedAt
      deletedBy: $deletedBy
    }
  )
}
```

### Reactivar (Undo Soft Delete)

```graphql
mutation ReactivateSubject(
  $subjectId: UUID!
) @auth(level: USER) {
  subject_update(
    key: {subjectId: $subjectId}
    data: {
      active: true
      deletedAt: null
      deletedBy: null
    }
  )
}
```

---

## 🔐 Autenticación en Queries/Mutations

```graphql
# Sin restricción (público)
query PublicData { ... }

# Usuario autenticado requerido
@auth(level: USER)

# Admin solo
@auth(expr: "auth.token.role == 'ADMIN'")

# Owner o Admin
@auth(expr: "auth.uid == $userId || auth.token.role == 'ADMIN'")

# Expresión compleja
@auth(expr: "auth.token.role == 'TEACHER' && resource.institutionId == auth.institutionId")
```

---

## 💻 Usar en TypeScript

### Setup Básico

```typescript
import { initializeDataConnect, executeQuery } from 'firebase/data-connect';
import { GetUserByEmail } from '@/dataconnect-generated/queries';
import { GetUserByEmailData, GetUserByEmailVariables } from '@/dataconnect-generated/types';

const dataConnect = initializeDataConnect({
  connector: userConnector
});
```

### Query Tipada

```typescript
async function getUserByEmail(email: string): Promise<User | null> {
  const result = await executeQuery<GetUserByEmailData, GetUserByEmailVariables>(
    dataConnect,
    GetUserByEmail,
    { email }
  );
  
  return result.data?.users?.[0] ?? null;
}
```

### Mutation Tipada

```typescript
import { CreateSubject } from '@/dataconnect-generated/mutations';
import { CreateSubjectData, CreateSubjectVariables } from '@/dataconnect-generated/types';

async function createSubject(data: CreateSubjectVariables) {
  const result = await executeQuery<CreateSubjectData, CreateSubjectVariables>(
    dataConnect,
    CreateSubject,
    data
  );
  
  return result.data;
}
```

---

## 📁 Estructura de Directorios

```
dataconnect/
├── dataconnect.yaml          # Configuración principal
├── DDL.sql                   # Schema PostgreSQL
├── schema/
│   └── schema.gql           # Tipos GraphQL
└── example/
    ├── connector.yaml       # Config del connector
    ├── queries.gql          # Queries (lecturas)
    └── mutations.gql        # Mutations (escrituras)

src/
├── dataconnect-generated/    # Código auto-generado (no editar)
│   ├── types.ts
│   ├── queries.ts
│   └── mutations.ts
└── lib/
    ├── userDataConnect.ts    # Wrapper funciones usuario
    ├── levelDataConnect.ts   # Wrapper funciones niveles
    └── taxonomyDataConnect.ts # Wrapper funciones taxonomía
```

---

## 🔄 Workflow Típico

```bash
# 1. Editar schema, queries, mutations
# vim dataconnect/schema/schema.gql
# vim dataconnect/example/queries.gql
# vim dataconnect/example/mutations.gql

# 2. Generar código TypeScript
firebase generate

# 3. Instalar dependencias nuevas si hay
npm install

# 4. Testear localmente
npm run dev

# 5. Build
npm run build

# 6. Deploy
firebase deploy --project=staging
firebase deploy --project=production
```

---

## 📝 Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_DATACONNECT_ENDPOINT=https://region-project-id-service.firebaseio.com
```

---

## 🐛 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot connect to Cloud SQL` | IP no autorizada | Añadir IP: `gcloud sql instances patch ... --authorized-networks=IP` |
| `Schema validation failed` | Schema mismatch | Ejecutar `firebase dataconnect:sql:validate --verbose` |
| `Unauthorized` | No autenticado | Verificar `@auth` en query |
| `Variables not provided` | Parámetros faltantes | Incluir variables en `executeQuery` |
| `Type mismatch` | Tipo incorrecto | Verificar tipos en variables |

---

## 🔗 Enlaces Útiles

- [Guía Técnica Completa](./DATACONNECT_TECHNICAL_GUIDE.md)
- [Firebase Data Connect Docs](https://firebase.google.com/docs/data-connect)
- [GraphQL Spec](https://graphql.org/learn/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

**Última actualización:** Noviembre 2024
