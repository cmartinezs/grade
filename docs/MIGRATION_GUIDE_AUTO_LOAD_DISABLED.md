# 🔄 Guía de Migración: De Auto-Load a Carga Manual

## Contexto

Anteriormente, la aplicación cargaba datos automáticamente en localStorage:
- 15 cursos de ejemplo
- 2 categorías
- 12 niveles educacionales

**Ahora**: Todo es manual. El usuario decide qué cargar.

## Pasos de Migración para Usuarios Existentes

### Paso 1: Verificar Estado Actual

Abre Developer Tools (F12) y ejecuta:

```javascript
// Ver qué datos hay en localStorage
console.log('Categorías:', JSON.parse(localStorage.getItem('parametric_level_categories') || '[]'));
console.log('Niveles:', JSON.parse(localStorage.getItem('parametric_educational_levels') || '[]'));
console.log('Cursos:', JSON.parse(localStorage.getItem('evaluation_management_courses') || '[]'));
```

### Paso 2: Decidir sobre los Datos Antiguos

**Opción A: Mantener datos antiguos** ✅ (Recomendado)
```javascript
// Los datos antiguos se mantienen automáticamente
// Nada que hacer
```

**Opción B: Limpiar y empezar de cero** 🗑️
```javascript
// Limpiar localStorage
localStorage.removeItem('parametric_level_categories');
localStorage.removeItem('parametric_educational_levels');
localStorage.removeItem('evaluation_management_courses');

// Recargar la aplicación
location.reload();
```

### Paso 3: Cargar Nueva Configuración de Chile (Opcional)

Si limpiaste todo en el Paso 2:

1. Ve a `/evaluation-management/categories`
2. Verás el modal automático
3. Clica "✅ Cargar Configuración"
4. Se cargan 2 categorías + 12 niveles

Si NO limpiaste:

1. Los datos antiguos funcionan normalmente
2. Puedes agregar los nuevos manualmente si quieres

### Paso 4: Verificar que Todo Funciona

```javascript
// Verificar que los datos están en localStorage
const categorías = JSON.parse(localStorage.getItem('parametric_level_categories') || '[]');
const niveles = JSON.parse(localStorage.getItem('parametric_educational_levels') || '[]');
const cursos = JSON.parse(localStorage.getItem('evaluation_management_courses') || '[]');

console.log('Categorías cargadas:', categorías.length);
console.log('Niveles cargados:', niveles.length);
console.log('Cursos cargados:', cursos.length);

// Debe mostrar > 0 en al menos uno
```

## Escenarios Comunes

### Escenario 1: Usuario Nuevo

```
1. Abre aplicación por primera vez
2. localStorage está vacío
3. Ve modal al acceder a Categorías
4. Carga configuración de Chile
5. ✅ Listo
```

### Escenario 2: Usuario Existente (Sin Cambios)

```
1. Abre aplicación
2. localStorage tiene datos antiguos
3. Continúa usando sin problemas
4. ✅ Listo
```

### Escenario 3: Usuario Existente (Quiere Actualizar)

```
1. Abre aplicación
2. Clipa "Limpiar localStorage" (Paso 2B)
3. Ve modal al acceder a Categorías
4. Carga configuración nueva de Chile
5. ✅ Actualizado
```

### Escenario 4: Usuario Existente (Quiere Mezclar)

```
1. Abre aplicación
2. Mantiene datos antiguos (Paso 2A)
3. Puede cargar Chile además
4. ✅ Combinado
```

## Validación de Datos

### Validación Automática

La aplicación valida:

```typescript
// No duplica códigos
if (existingLevel.code === newLevel.code) {
  console.warn('Nivel ya existe, saltando...');
  return;
}

// No duplica IDs
if (existingLevel.id === newLevel.id) {
  console.warn('ID duplicado, saltando...');
  return;
}
```

### Validación Manual (Opcional)

```javascript
// Verificar integridad de categorías
const categorías = JSON.parse(localStorage.getItem('parametric_level_categories') || '[]');
const categoríasID = new Set();
let problemas = [];

categorías.forEach((cat, idx) => {
  if (categoríasID.has(cat.id)) {
    problemas.push(`Categoría ${idx} tiene ID duplicado: ${cat.id}`);
  }
  categoríasID.add(cat.id);
});

if (problemas.length > 0) {
  console.error('Problemas encontrados:', problemas);
} else {
  console.log('✅ Sin problemas en categorías');
}
```

## Preguntas Frecuentes

### P: ¿Se perderán mis datos?
**R:** No. Los datos en localStorage se mantienen intactos. Solo se desactivó la carga automática de datos por defecto.

### P: ¿Puedo volver a la carga automática?
**R:** Sí, pero no se recomienda. El control manual es mejor para Data-Connect. Contacta al desarrollador si es necesario.

### P: ¿Qué pasa con los cursos por defecto?
**R:** Ya no se cargan. Puedes:
- Crear cursos manualmente
- O esperar a que se implemente la carga de cursos desde JSON

### P: ¿Los datos se sincronizan con la nube?
**R:** Actualmente localStorage. En el futuro, Data-Connect (base de datos remota).

### P: ¿Puedo tener múltiples configuraciones?
**R:** Actualmente solo Chile. Próximamente se agregarán más países.

## Troubleshooting

### Problema: No veo el modal de carga

**Solución:**
```javascript
// Verificar que localStorage esté vacío
const hasCategories = localStorage.getItem('parametric_level_categories');
console.log('¿Hay categorías?', hasCategories ? 'Sí' : 'No');

// Si dice "Sí", el modal no aparecerá
// Limpiar para que aparezca:
localStorage.removeItem('parametric_level_categories');
location.reload();
```

### Problema: Datos no persisten

**Solución:**
```javascript
// Verificar que localStorage esté habilitado
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('✅ localStorage habilitado');
} catch (e) {
  console.error('❌ localStorage deshabilitado:', e);
}
```

### Problema: Datos duplicados

**Solución:**
```javascript
// Limpiar datos problemáticos
localStorage.removeItem('parametric_level_categories');
localStorage.removeItem('parametric_educational_levels');

// Y cargar nuevamente desde el modal
```

## Rollback (Si es necesario)

Si necesitas volver al comportamiento anterior:

1. Contacta al desarrollador
2. Se reactivarán las cargas automáticas
3. O se implementará una opción de "resetear a datos por defecto"

## Transición a Data-Connect

**Próximamente:**

```
localStorage (actual)
        ↓
    [TRANSITORIO]
        ↓
Data-Connect / Base de Datos (futuro)
```

Cuando se implemente Data-Connect:

1. Los datos se guardarán en la nube
2. localStorage será solo caché
3. Sincronización automática

---

**Versión**: 1.0
**Última Actualización**: 2025-11-03
**Estado**: Activo
