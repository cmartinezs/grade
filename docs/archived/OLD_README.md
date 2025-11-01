# 📚 Documentación - Grade Web App

Bienvenido a la documentación del proyecto **Grade Web App**. Esta carpeta contiene guías, referencias y cambios importantes del proyecto.

## 📖 Índice de Documentación

### 🎯 Comienza aquí

- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - ⚡ Guía rápida de referencia
  - Comandos esenciales
  - Crear nuevo módulo CRUD
  - Ejemplos de código
  - Soluciones comunes (FAQ)

- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - 🗂️ Estructura del proyecto
  - Árbol de carpetas visual
  - Ubicaciones de archivos importantes
  - Flujo de datos
  - Rutas disponibles

- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - 🐛 Solución de problemas
  - Errores comunes y soluciones
  - Debugging avanzado
  - FAQ detallado
  - Mejores prácticas

### 🎨 Componentes Reutilizables

- **[MASTER_DATA_TABLE.md](./MASTER_DATA_TABLE.md)** - Componente genérico para listar datos
  - Guía completa de uso
  - Ejemplos de integración
  - API reference
  - Patrones recomendados

### 🏛️ Arquitectura

- **[ARCHITECTURE_PATTERNS.md](./ARCHITECTURE_PATTERNS.md)** - Patrones arquitectónicos utilizados
  - Store Pattern
  - Mode-Based Design
  - Generic Components
  - Render Functions
  - Dynamic Props
  - Modal Wrappers

### 👥 Contribuir

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guía de contribución
  - Cómo agregar nuevas features
  - Checklist de desarrollo
  - Templates de componentes
  - Workflow de Git
  - Preguntas frecuentes

### 📝 Historial de Cambios

- **[CHANGES.md](./CHANGES.md)** - Resumen de cambios recientes
  - Componentes creados
  - Refactorizaciones realizadas
  - Estadísticas de mejora
  - Próximos pasos sugeridos

## 🏗️ Estructura del Proyecto

```
src/
├── app/                          # Next.js app router
│   ├── evaluation-management/   # Gestión de evaluaciones
│   ├── questions-bank/          # Banco de preguntas
│   ├── public/                  # Páginas públicas
│   ├── auth/                    # Autenticación
│   └── ...
├── components/                  # React components
│   ├── MasterDataTable.tsx      # ⭐ Tabla genérica reutilizable
│   ├── CourseForm.tsx           # Formulario unificado de cursos
│   ├── AutocompleteSelect.tsx   # Select con autocompletar
│   └── ...
├── lib/                         # Stores y utilidades
│   ├── courseStore.ts           # Store de cursos
│   ├── levelStore.ts            # Store de niveles
│   ├── questionStore.ts         # Store de preguntas
│   └── ...
└── types/                       # TypeScript type definitions
    ├── course.ts
    ├── level.ts
    ├── question.ts
    └── ...
```

## 🚀 Cómo Empezar

### Crear una Nueva Lista (CRUD)

1. Crea el store en `src/lib/` con método `getPaginated*()`
2. Define tipos en `src/types/`
3. Usa `MasterDataTable` en tu página
4. Define `ColumnConfig<T>[]` y `ActionButton<T>[]`
5. ¡Listo! Tu lista funciona con búsqueda y paginación

Ver ejemplo completo en [MASTER_DATA_TABLE.md](./MASTER_DATA_TABLE.md)

### Agregar Búsqueda a un Store

El método `getPaginated*` debe soportar `searchText`:

```typescript
getPaginatedItems(page, pageSize, options?: { searchText?: string }) {
  let items = this.getAllItems();
  
  if (options?.searchText) {
    const term = options.searchText.toLowerCase();
    items = items.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }
  
  // Paginar...
  return { items, total, totalPages };
}
```

## 📊 Estadísticas del Proyecto

### Componentes Principales

| Componente | Líneas | Propósito |
|-----------|--------|----------|
| MasterDataTable | ~390 | Tabla genérica reutilizable ⭐ |
| CourseForm | ~260 | Formulario unificado (create/edit) |
| AutocompleteSelect | ~300 | Select con filtrado |
| CreateCourseModal | ~80 | Modal para crear cursos |
| EditCourseModal | ~80 | Modal para editar cursos |

### Optimizaciones Realizadas

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Duplicación en listas | 506 líneas | ~100 líneas | ↓ 80% |
| Líneas en levels page | 222 | 173 | ↓ 22% |
| Líneas en courses page | 284 | 166 | ↓ 42% |
| Build time | 3.1s | 3.2s | ≈ Same |

## 🎯 Próximos Pasos

### A Corto Plazo
- [ ] Aplicar MasterDataTable a Gestión de Preguntas
- [ ] Aplicar MasterDataTable a Gestión de Taxonomías
- [ ] Crear store para Evaluaciones

### A Mediano Plazo
- [ ] Agregar ordenamiento por columnas
- [ ] Agregar bulk actions (select múltiples)
- [ ] Agregar export a CSV

### A Largo Plazo
- [ ] Sistema de permisos/roles
- [ ] Tests automatizados
- [ ] Internacionalización (i18n)

## 🔗 Enlaces Útiles

- **Componentes**: `src/components/`
- **Stores**: `src/lib/`
- **Tipos**: `src/types/`
- **Páginas**: `src/app/`

## 💡 Tips y Mejores Prácticas

### Crear un MasterDataTable

✅ **DO:**
```tsx
// Definir columnas fuera del componente si es posible
const columns = useMemo(() => [...], []);

// Usar render functions para lógica compleja
render: (value) => <Badge>{value}</Badge>

// Acciones dinámicas para comportamientos condicionales
icon: (item) => item.active ? '✅' : '❌'
```

❌ **DON'T:**
```tsx
// Crear inline sin memoización
columns={[...]} // ❌ Se recrea en cada render

// Valores estáticos en render functions
render: () => <Badge>Siempre igual</Badge>

// Duplicar búsqueda en cada página
```

### Implementar Búsqueda

✅ Filtra por:
- Nombre
- Código/ID
- Descripción
- Status

❌ No filtres por:
- Fechas (usar filtros separados)
- Relaciones (usar multi-select)
- Valores complejos

## 🆘 Troubleshooting

### "MasterDataTable no renderiza columnas"
- Verifica que `columns` esté definido
- Verifica que `items` no sea undefined

### "Búsqueda no funciona"
- Asegúrate que el store soporta `searchText`
- Verifica que el método filtra correctamente

### "Build toma mucho tiempo"
- Ejecuta `npm run build` de nuevo
- Revisa si hay imports cíclicos

## 📞 Contacto

Para preguntas sobre la documentación, revisa primero los archivos en `docs/`.

---

**Última actualización**: 2025-11-01
**Versión**: 1.0.0
