# Data Files Reference

## Overview

Los datos de configuración predefinida se encuentran en archivos JSON separados del código, bajo `/public/data/`. Esto permite:

- ✅ Separar datos de la lógica de negocio
- ✅ Facilitar actualizaciones sin recompilar
- ✅ Mejor mantenibilidad y escalabilidad

## Data Files

### `/public/data/level-categories.json`

Contiene las categorías de niveles educacionales (entidades paramétricas padres).

**Estructura:**
```json
[
  {
    "id": 1,
    "code": "CAT_BASIC",
    "name": "Enseñanza Básica",
    "description": "Educación básica (1° a 8° año)",
    "categoryId": null,
    "isActive": true,
    "createdAt": "2025-01-01T00:00:00Z",
    "createdBy": "SYSTEM",
    "updatedAt": "2025-01-01T00:00:00Z",
    "updatedBy": "SYSTEM",
    "deletedAt": null,
    "deletedBy": null
  }
]
```

**Campos:**
- `id` (number): Identificador único
- `code` (string): Código único de la categoría
- `name` (string): Nombre legible
- `description` (string): Descripción detallada
- `categoryId` (number | null): ID de categoría padre (para jerarquía)
- `isActive` (boolean): Estado activo/inactivo
- Audit fields: `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `deletedAt`, `deletedBy`

### `/public/data/education-levels.json`

Contiene los niveles educacionales específicos (entidades paramétricas hijas).

**Estructura:**
```json
[
  {
    "id": 1,
    "code": "LEVEL_1B",
    "name": "1° Básico",
    "description": "Primer año de educación básica",
    "categoryId": 1,
    "isActive": true,
    "createdAt": "2025-01-01T00:00:00Z",
    "createdBy": "SYSTEM",
    "updatedAt": "2025-01-01T00:00:00Z",
    "updatedBy": "SYSTEM",
    "deletedAt": null,
    "deletedBy": null
  }
]
```

**Campos:**
- `id` (number): Identificador único
- `code` (string): Código único del nivel
- `name` (string): Nombre del nivel (ej: "1° Básico")
- `description` (string): Descripción
- `categoryId` (number): ID de la categoría padre (requerido)
- `isActive` (boolean): Estado activo/inactivo
- Audit fields: como en categories

## Carga de Datos

### Data Loader (`src/lib/dataLoader.ts`)

Proporciona funciones para cargar datos de los archivos JSON:

```typescript
// Cargar categorías asincronamente
const categories = await loadLevelCategories();

// Cargar niveles asincronamente
const levels = await loadEducationLevels();
```

### Level Store (`src/lib/levelStore.ts`)

El store usa fallback automático:

1. **Primer inicio**: Si localStorage está vacío, carga datos del fallback
2. **Persistencia**: Los datos se guardan en localStorage
3. **Inicialización**: El fallback contiene los mismos datos que los JSON

```typescript
// Uso transparente
const allCategories = levelStore.getAllCategories();
const allLevels = levelStore.getAllLevels();
```

## Cómo Agregar Nuevos Datos

### Agregar una nueva categoría

1. Editar `/public/data/level-categories.json`
2. Agregar objeto con `id` único (siguiente número secuencial)
3. El store cargará automáticamente en la próxima inicialización

```json
{
  "id": 3,
  "code": "CAT_SPECIAL",
  "name": "Educación Especial",
  "description": "Educación especial y adaptada",
  "categoryId": null,
  "isActive": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "createdBy": "ADMIN",
  "updatedAt": "2025-01-01T00:00:00Z",
  "updatedBy": "ADMIN",
  "deletedAt": null,
  "deletedBy": null
}
```

### Agregar un nuevo nivel

1. Editar `/public/data/education-levels.json`
2. Agregar objeto con `id` único y `categoryId` válido

```json
{
  "id": 13,
  "code": "LEVEL_SPEC_1",
  "name": "1° Especial",
  "description": "Primer año educación especial",
  "categoryId": 3,
  "isActive": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "createdBy": "ADMIN",
  "updatedAt": "2025-01-01T00:00:00Z",
  "updatedBy": "ADMIN",
  "deletedAt": null,
  "deletedBy": null
}
```

## Validación de IDs

⚠️ **IMPORTANTE**: Los IDs deben ser secuenciales y únicos:
- Level Categories: 1, 2, 3, ...
- Education Levels: 1, 2, 3, ..., 12, ...

## Tipos TypeScript

Los tipos están definidos en `src/types/level.ts`:

```typescript
export interface LevelCategory {
  id: number;
  code: string;
  name: string;
  description: string;
  categoryId?: number | null;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
}

export interface EducationalLevel {
  id: number;
  code: string;
  name: string;
  description: string;
  categoryId: number;  // ← Requerido
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
}
```

## Fallback Mechanism

Si los archivos JSON no están disponibles (build o desarrollo), el store usa datos predefinidos en `src/lib/levelStore.ts`:

```typescript
const FALLBACK_CATEGORIES: LevelCategory[] = [
  // Datos hardcodeados para garantizar funcionamiento
];

const FALLBACK_LEVELS: EducationalLevel[] = [
  // Datos hardcodeados para garantizar funcionamiento
];
```

Esto asegura que la aplicación funcione incluso sin los archivos JSON.
