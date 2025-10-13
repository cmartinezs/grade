# CU-BP-03: Clonar Ítem - Guía de Usuario

## 📋 ¿Qué es Clonar una Pregunta?

**Clonar** permite crear una **copia completamente independiente** de una pregunta existente. El clon es un ítem nuevo con su propio ID único y versión 1, sin ningún vínculo con la pregunta original.

### Diferencia entre Clonar y Versionar

| Característica | **Clonar** 📋 | **Versionar** 🔄 |
|----------------|---------------|------------------|
| **Cuándo usar** | Quiero reutilizar una pregunta como punto de partida para crear algo nuevo | Quiero actualizar/mejorar una pregunta existente manteniendo su historial |
| **Resultado** | Pregunta completamente nueva e independiente | Nueva versión de la misma pregunta |
| **ID** | Nuevo ID único | Nuevo ID pero vinculado al original |
| **Versión** | Siempre 1 | Se incrementa (v2, v3, v4...) |
| **Relación** | Sin vínculo con el original | Parte del historial de versiones |
| **Ejemplo** | "Esta pregunta de fracciones me gusta, voy a hacer una similar sobre decimales" | "Esta pregunta tiene un error, voy a corregirla" |

## 🎯 ¿Cuándo usar Clonar?

### ✅ Casos de uso recomendados:

1. **Crear variaciones de una pregunta**
   - Tienes una pregunta sobre suma y quieres hacer otra sobre resta
   - Cambiar números o contexto manteniendo la estructura

2. **Reutilizar estructura de pregunta**
   - Te gusta cómo está redactada una pregunta
   - Quieres usarla como plantilla para otro tema

3. **Adaptar a otro contexto**
   - Clonar pregunta de Matemáticas para adaptarla a Física
   - Cambiar tema manteniendo tipo de pregunta

4. **Crear banco de preguntas más rápido**
   - Partir de preguntas existentes bien formuladas
   - Modificar solo lo necesario

### ❌ NO usar Clonar si:

- Quieres **corregir un error** → Usa "Editar" o "Crear Nueva Versión"
- Quieres **actualizar contenido** manteniendo historial → Usa "Crear Nueva Versión"
- Quieres **mejorar la redacción** → Usa "Editar" si es reciente o "Crear Nueva Versión"

## 📖 Guía Paso a Paso

### Paso 1: Buscar la pregunta a clonar

1. Ve al **Banco de Preguntas**
2. Usa los filtros o búsqueda para encontrar la pregunta
3. Localiza la pregunta que quieres clonar

![Buscar pregunta](screenshot_search.png)

### Paso 2: Abrir el menú de acciones

1. En la tarjeta de la pregunta, haz clic en el botón **"👁️ Ver Detalle ▼"**
2. Se desplegará un menú con opciones
3. Selecciona **"📋 Clonar Pregunta"**

```
Opciones disponibles:
├── 🔄 Crear Nueva Versión
├── ✏️ Editar
├── 📋 Clonar Pregunta    ← Esta opción
├── 📊 Ver Estadísticas
└── 🗑️ Eliminar
```

### Paso 3: Revisar información del modal

Al abrir el modal verás:

```
┌─────────────────────────────────────────────┐
│ 📋 Clonar Pregunta                      [X] │
├─────────────────────────────────────────────┤
│                                             │
│ ℹ️ Clonando pregunta:                       │
│    ID Original: q-1    v2                   │
│                                             │
│ El clon será un ítem completamente nuevo    │
│ e independiente con su propio ID único,     │
│ versión 1, y sin vínculo con la pregunta    │
│ original.                                   │
└─────────────────────────────────────────────┘
```

**Esta información te indica:**
- ID de la pregunta que estás clonando
- Versión actual de esa pregunta
- Que crearás un ítem completamente nuevo

### Paso 4: Editar el contenido clonado

El formulario viene pre-llenado con los datos del original. **Puedes modificar cualquier campo:**

#### 4.1 Tipo de Pregunta
```
┌─────────────────────────────────────────────┐
│ Tipo de Pregunta *                          │
│ [Selección Única ▼]                         │
│ Pregunta con múltiples opciones, solo una  │
│ correcta                                    │
└─────────────────────────────────────────────┘
```
- ✅ Puedes cambiar el tipo sin restricciones
- Las opciones se ajustarán automáticamente al nuevo tipo

#### 4.2 Enunciado
```
┌─────────────────────────────────────────────┐
│ Enunciado de la Pregunta *                  │
│ ┌─────────────────────────────────────────┐ │
│ │ ¿Cuál es la solución de 2x + 5 = 13?   │ │
│ │                                         │ │
│ │                                         │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```
- ✅ Modifica el texto de la pregunta
- ✅ Es el campo más importante para diferenciar el clon

#### 4.3 Taxonomía
```
┌─────────────────────────────────────────────┐
│ Taxonomía (Tema) *                          │
├─────────────┬─────────────┬─────────────────┤
│ Asignatura  │ Unidad      │ Tema *          │
│ [Matemáticas▼] │ [Álgebra▼]  │ [Ecuaciones▼]  │
└─────────────┴─────────────┴─────────────────┘
```
- ✅ Puedes cambiar a otra asignatura
- ✅ Útil para adaptar pregunta a otro contexto
- ⚠️ Debes seleccionar tema (campo obligatorio)

#### 4.4 Dificultad
```
┌─────────────────────────────────────────────┐
│ Dificultad *                                │
│ [Medio ▼]                                   │
└─────────────────────────────────────────────┘
```
- ✅ Cambia si el clon tendrá diferente dificultad

#### 4.5 Alternativas
```
┌─────────────────────────────────────────────┐
│ Alternativas *          Mínimo 2 opciones   │
├─────────────────────────────────────────────┤
│ [1] x = 4          [✓] Correcta      [🗑️]  │
│ [2] x = 3          [ ] Correcta      [🗑️]  │
│ [3] x = 5          [ ] Correcta      [🗑️]  │
│ [4] x = 6          [ ] Correcta      [🗑️]  │
│                                             │
│ [➕ Agregar Opción]                          │
└─────────────────────────────────────────────┘
```

**Acciones disponibles:**
- ✏️ Editar texto de cada opción
- ☑️ Marcar/desmarcar como correcta
- ➕ Agregar nuevas opciones
- 🗑️ Eliminar opciones (mínimo 2 para selección única/múltiple)

**Reglas según tipo:**
- **Verdadero/Falso**: 2 opciones fijas, 1 correcta
- **Selección Única**: Mínimo 2 opciones, exactamente 1 correcta
- **Selección Múltiple**: Mínimo 2 opciones, al menos 1 correcta
- **Desarrollo**: Sin opciones

### Paso 5: Revisar resumen

Antes de guardar, verás un resumen:

```
┌─────────────────────────────────────────────┐
│ Resumen del clon:                           │
│ • Tipo: Selección Única                     │
│ • Dificultad: Medio                         │
│ • Alternativas: 4                           │
│ • Estado: [Activo] [Versión 1]              │
└─────────────────────────────────────────────┘
```

### Paso 6: Guardar el clon

1. Revisa que toda la información es correcta
2. Haz clic en **"📋 Clonar Pregunta"**
3. El sistema validará todos los campos

**Posibles resultados:**

#### ✅ Éxito
```
┌─────────────────────────────────────────────┐
│ ✅ Pregunta Clonada                     [X] │
├─────────────────────────────────────────────┤
│ ✅ ¡Pregunta clonada exitosamente!          │
│                                             │
│ Se ha creado un nuevo ítem independiente    │
│ con ID: q-15                                │
│                                             │
│ El nuevo ítem tiene versión 1 y no tiene    │
│ relación con la pregunta original.          │
│                                             │
│ [Cerrar]                                    │
└─────────────────────────────────────────────┘
```
- El modal se cerrará automáticamente en 2 segundos
- La lista se actualizará mostrando el nuevo ítem

#### ❌ Error - Datos incompletos
```
┌─────────────────────────────────────────────┐
│ ⚠️ El enunciado es obligatorio              │
│ ⚠️ Debe marcar exactamente una opción como  │
│    correcta                                 │
└─────────────────────────────────────────────┘
```
- Corrige los errores marcados en rojo
- El botón estará deshabilitado hasta corregir

#### ❌ Error - Metadato inválido
```
┌─────────────────────────────────────────────┐
│ ⚠️ El tema seleccionado no existe o no está │
│    vigente                                  │
└─────────────────────────────────────────────┘
```
- Selecciona un tema válido del catálogo

### Paso 7: Verificar el clon creado

Después de clonar, busca el nuevo ítem en la lista:

```
┌─────────────────────────────────────────────┐
│ [Selección Única] [Medio] [v1]              │
│ 📚 Matemáticas  📖 Álgebra  📝 Ecuaciones    │
│                                             │
│ ¿Cuál es la solución de 3x + 2 = 11?       │
│                                             │
│ ✅ 1. x = 3                                  │
│ ❌ 2. x = 4                                  │
│ ❌ 3. x = 5                                  │
│ ❌ 4. x = 6                                  │
│                                             │
│ ID: q-15  Última versión: v1                │
│ Autor: docente@example.com                  │
│ Actualizado: 13/10/2025                     │
└─────────────────────────────────────────────┘
```

**Verifica que:**
- ✅ Tiene un ID diferente al original (ej: original q-1, clon q-15)
- ✅ Versión es 1
- ✅ Autor es tu usuario (no el autor original)
- ✅ Los cambios que hiciste se guardaron correctamente

## ⚠️ Consideraciones Importantes

### El clon es independiente

```
Pregunta Original (q-1)          Pregunta Clonada (q-15)
        │                                 │
        ├─ v1                             └─ v1 (nueva familia)
        ├─ v2                             
        └─ v3                             
        
    SIN RELACIÓN                    
```

**Esto significa:**
- ✅ Puedes editar el clon sin afectar el original
- ✅ Puedes crear versiones del clon independientemente
- ✅ Puedes eliminar uno sin afectar el otro
- ✅ Estadísticas se calculan por separado

### El autor del clon eres tú

- El clon te pertenece
- No importa quién creó la pregunta original
- Tu nombre aparece como autor
- Tienes todos los permisos sobre el clon

### No hay historial compartido

```
❌ INCORRECTO:
Original: v1 → v2 → v3
Clon:                └─ v4  ← NO, el clon no es v4

✅ CORRECTO:
Original: v1 → v2 → v3
Clon:     v1 (nueva familia independiente)
```

## 💡 Ejemplos Prácticos

### Ejemplo 1: Crear variación numérica

**Original:**
```
¿Cuánto es 15% de 200?
a) 30 ✓
b) 25
c) 35
d) 40
```

**Pasos:**
1. Clonar la pregunta
2. Cambiar: "¿Cuánto es 20% de 150?"
3. Cambiar opciones:
   - a) 30 ✓ (20% de 150 = 30)
   - b) 25
   - c) 35
   - d) 40
4. Guardar

**Resultado:** Pregunta nueva con ID único, misma estructura, diferentes valores.

### Ejemplo 2: Adaptar a otro tema

**Original (Matemáticas):**
```
¿Qué propiedad se aplica: 2 × (3 + 4) = 2 × 3 + 2 × 4?
a) Distributiva ✓
b) Asociativa
c) Conmutativa
```

**Pasos:**
1. Clonar la pregunta
2. Cambiar taxonomía a Física
3. Cambiar tema a "Leyes de Newton"
4. Modificar enunciado: "¿Qué ley explica por qué..."
5. Adaptar opciones
6. Guardar

**Resultado:** Pregunta adaptada a otra asignatura.

### Ejemplo 3: Cambiar tipo de pregunta

**Original (Verdadero/Falso):**
```
La fotosíntesis ocurre en las mitocondrias.
a) Verdadero
b) Falso ✓
```

**Pasos:**
1. Clonar la pregunta
2. Cambiar tipo a "Selección Única"
3. Modificar enunciado: "¿Dónde ocurre la fotosíntesis?"
4. Agregar opciones:
   - a) Mitocondrias
   - b) Cloroplastos ✓
   - c) Núcleo
   - d) Ribosomas
5. Guardar

**Resultado:** Pregunta con formato diferente sobre el mismo tema.

## ❓ Preguntas Frecuentes

### ¿Puedo clonar mis propias preguntas?
✅ Sí, puedes clonar cualquier pregunta a la que tengas acceso.

### ¿Puedo clonar preguntas de otros docentes?
✅ Sí (según permisos del sistema). El clon será tuyo.

### ¿El original se modifica al clonar?
❌ No, el original permanece intacto. Son ítems completamente separados.

### ¿Puedo clonar una versión específica?
✅ Sí, clonas la pregunta que seleccionaste (cualquier versión).

### ¿El clon aparece en el historial del original?
❌ No, el clon no tiene ninguna relación visible con el original.

### ¿Puedo clonar un clon?
✅ Sí, sin limitaciones. Cada clon es independiente.

### ¿Se copia también la información de uso?
❌ No, el clon empieza desde cero (sin estadísticas, sin evaluaciones asociadas).

### ¿Puedo cancelar después de clonar?
❌ Una vez guardado, el clon ya existe. Pero puedes eliminarlo si lo deseas.

### ¿Hay límite de clones?
❌ No, puedes clonar cuantas veces necesites.

### ¿Se notifica al autor original?
❌ No, no hay notificaciones. El clon es independiente.

## 🚀 Consejos y Mejores Prácticas

### ✅ Buenas prácticas:

1. **Modifica siempre el enunciado**
   - No dejes el texto idéntico al original
   - Personaliza para evitar confusiones

2. **Cambia valores/contexto**
   - Si clonas pregunta con números, cámbialos
   - Si clonas caso práctico, adapta el contexto

3. **Verifica metadatos**
   - Confirma que tema/dificultad son correctos
   - El clon puede tener diferente dificultad

4. **Revisa bien las opciones**
   - Asegúrate que respuestas correctas sean las adecuadas
   - Reordena si es necesario

5. **Aprovecha para mejorar**
   - Si el original tiene redacción mejorable, corrígela en el clon
   - Es una oportunidad de optimizar

### ⚠️ Evita:

1. **Clonar sin modificar**
   - Si es idéntico, genera confusión
   - Mejor usa "Crear Nueva Versión" si quieres mantener vínculo

2. **Clonar para corregir errores**
   - Para eso existe "Editar" o "Crear Nueva Versión"
   - El clon no reemplaza al original

3. **Clonar en cadena sin control**
   - Puede inflar innecesariamente el banco
   - Cada clon suma al total de ítems

## 📊 Comparación de Opciones

Cuando tienes una pregunta y quieres hacer algo con ella:

```
┌─────────────────────────────────────────────────────────────────┐
│                 ¿QUÉ QUIERES HACER?                             │
├─────────────────┬───────────────┬───────────────┬───────────────┤
│                 │ EDITAR        │ VERSIONAR     │ CLONAR        │
├─────────────────┼───────────────┼───────────────┼───────────────┤
│ Corregir error  │ ✅ SÍ         │ ✅ SÍ         │ ❌ NO         │
│ Mejorar texto   │ ✅ SÍ         │ ✅ SÍ         │ ❌ NO         │
│ Actualizar datos│ ✅ SÍ         │ ✅ SÍ         │ ❌ NO         │
│ Crear similar   │ ❌ NO         │ ❌ NO         │ ✅ SÍ         │
│ Reutilizar como │ ❌ NO         │ ❌ NO         │ ✅ SÍ         │
│ plantilla       │               │               │               │
│ Adaptar a otro  │ ❌ NO         │ ❌ NO         │ ✅ SÍ         │
│ contexto        │               │               │               │
└─────────────────┴───────────────┴───────────────┴───────────────┘
```

## 📝 Resumen

**Clonar una pregunta:**
- ✅ Crea ítem completamente nuevo e independiente
- ✅ ID único, versión 1, sin vínculo al original
- ✅ Tú eres el autor del clon
- ✅ Puedes modificar todo antes de guardar
- ✅ Útil para reutilizar estructura y crear variaciones
- ❌ NO para corregir errores en el original
- ❌ NO mantiene historial compartido

**Úsalo cuando:** Quieras partir de una pregunta existente para crear algo nuevo y diferente.

---

¿Necesitas ayuda? Contacta al administrador del sistema.
