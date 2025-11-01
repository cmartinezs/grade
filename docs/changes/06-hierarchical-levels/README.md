# 🎓 Niveles Educacionales Jerárquicos

## Resumen

Se ha implementado una estructura jerárquica para los niveles educacionales, introduciendo el concepto de "Categorías" (super niveles) que agrupan múltiples niveles específicos.

**Ejemplo:**
- **Categoría:** Enseñanza Básica
  - 1° Básico
  - 2° Básico
  - ...
  - 8° Básico
- **Categoría:** Enseñanza Media
  - 1° Medio
  - 2° Medio
  - 3° Medio
  - 4° Medio

---

## ✨ Cambios Realizados

### 1. Tipos Actualizados (`src/types/level.ts`)

#### Nuevo campo `category` en interfaces:
```typescript
export interface EducationalLevel {
  id: string;
  name: string;
  code: string;
  description: string;
  category?: string; // ← NUEVO: Super nivel
  courseCount?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Nuevos tipos para gestión de categorías:
```typescript
export interface LevelsByCategory {
  category: string;
  levels: EducationalLevel[];
}

export interface CategoryStats {
  category: string;
  totalLevels: number;
  activeLevels: number;
  inactiveLevels: number;
  totalCourses: number;
}

export const EDUCATION_CATEGORIES = [
  'Enseñanza Básica',
  'Enseñanza Media',
];
```

---

## 🛠️ Nuevas Utilidades (`src/lib/levelUtils.ts`)

Funciones helper para trabajar con niveles jerárquicos:

### `groupLevelsByCategory(levels)`
Agrupa niveles por categoría con orden alfabético dentro de cada grupo.

```typescript
const grouped = groupLevelsByCategory(levels);
// Resultado: [
//   { category: 'Enseñanza Básica', levels: [...] },
//   { category: 'Enseñanza Media', levels: [...] }
// ]
```

### `getLevelsByCategory(levels, category)`
Obtiene solo los niveles de una categoría específica.

```typescript
const basicLevels = getLevelsByCategory(levels, 'Enseñanza Básica');
```

### `getAvailableCategories(levels)`
Extrae todas las categorías únicas disponibles.

```typescript
const categories = getAvailableCategories(levels);
// Resultado: ['Enseñanza Básica', 'Enseñanza Media']
```

### `calculateCategoryStats(levels)`
Calcula estadísticas (total, activos, cursos) para una categoría.

```typescript
const stats = calculateCategoryStats(basicLevels);
// Resultado: {
//   category: 'Enseñanza Básica',
//   totalLevels: 8,
//   activeLevels: 7,
//   inactiveLevels: 1,
//   totalCourses: 25
// }
```

### `sortLevelsInCategory(levels)`
Ordena niveles dentro de una categoría (por número ordinal y alfabético).

```typescript
const sorted = sortLevelsInCategory(levels);
// Ordena: 1° Básico, 2° Básico, ..., 8° Básico
```

---

## 🎨 Nuevo Componente (`src/components/LevelsByCategory.tsx`)

Componente visual para mostrar niveles agrupados jerárquicamente.

### Características:
✅ Visualización jerárquica por categoría  
✅ Indicador de estado (Activo/Inactivo)  
✅ Contador de cursos por nivel  
✅ Grid responsive (auto-columns)  
✅ Callback onClick opcional  
✅ Estilos Bootstrap integrados  

### Uso:
```tsx
import { LevelsByCategory } from '@/components/LevelsByCategory';

<LevelsByCategory 
  levels={levels}
  onSelectLevel={(level) => console.log(level)}
/>
```

### Estructura Visual:
```
📚 Enseñanza Básica [8]
  ┌─────────────────┬─────────────────┬─────────────────┐
  │ 1° Básico       │ 2° Básico       │ 3° Básico       │
  │ LEVEL_1B        │ LEVEL_2B        │ LEVEL_3B        │
  │ ✓ Activo        │ ✓ Activo        │ ✓ Activo        │
  │ 5 cursos        │ 4 cursos        │ 6 cursos        │
  └─────────────────┴─────────────────┴─────────────────┘

📚 Enseñanza Media [4]
  ┌─────────────────┬─────────────────┐
  │ 1° Medio        │ 2° Medio        │
  │ LEVEL_1M        │ LEVEL_2M        │
  │ ✓ Activo        │ ✗ Inactivo      │
  │ 3 cursos        │ 0 cursos        │
  └─────────────────┴─────────────────┘
```

---

## 📊 Impacto en Dashboards y Vistas

### Dashboard (v04-dashboard-refactor)
Ahora puede mostrar:
- Estadísticas **por categoría** además de totales
- Distribución de niveles dentro de cada categoría
- Cursos distribuidos por categoría

### Gestión de Niveles
Interfaz mejorada para:
- Crear niveles especificando categoría
- Filtrar niveles por categoría
- Ver estructura jerárquica

---

## 🔄 Compatibilidad hacia Atrás

✅ **Campo `category` es opcional** - Niveles existentes funcionan sin cambios  
✅ **Constante predefinida `CHILEAN_EDUCATION_LEVELS`** - Ya incluye categorías  
✅ **Funciones util son independientes** - No interfieren con código existente  

---

## 📝 Ejemplos de Uso

### En formularios de creación de niveles:
```tsx
const createLevelInput = {
  name: '1° Básico',
  code: 'LEVEL_1B',
  description: 'Primer año de educación básica',
  category: 'Enseñanza Básica', // ← NUEVO
  isActive: true,
};
```

### Filtrar por categoría:
```tsx
const basicLevels = getLevelsByCategory(allLevels, 'Enseñanza Básica');
const mediaLevels = getLevelsByCategory(allLevels, 'Enseñanza Media');
```

### Mostrar estadísticas por categoría:
```tsx
const stats = getCategoryStatistics(allLevels);
stats.forEach(category => {
  console.log(`${category.category}: ${category.activeLevels}/${category.totalLevels} activos`);
});
```

---

## 🎯 Próximas Mejoras

- [ ] CRUD completo para categorías de niveles
- [ ] Vista de gestión de categorías
- [ ] Reordenamiento de niveles dentro de categorías
- [ ] Validaciones de pertenencia a categoría
- [ ] Dashboard con estadísticas por categoría
- [ ] Filtros avanzados por categoría

---

## 📦 Archivos Modificados

- `src/types/level.ts` - Tipos actualizados
- `src/lib/levelUtils.ts` - ✨ NUEVO: Utilidades para niveles jerárquicos
- `src/components/LevelsByCategory.tsx` - ✨ NUEVO: Componente visual

---

**Estado:** ✅ Implementado y testeado  
**Build:** ✅ Exitoso (0 errores)  
**Fecha:** 1 de Noviembre 2025
