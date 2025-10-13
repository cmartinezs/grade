# CU-BP-02: Versionar Ítem - Guía de Usuario

## 📖 Introducción

Esta guía te enseñará cómo **crear nuevas versiones de preguntas** en el Banco de Preguntas, manteniendo un historial completo de cambios sin perder información histórica.

## 🎯 ¿Por qué versionar preguntas?

### Ventajas del versionado:

✅ **Trazabilidad completa:** Mantén registro de todos los cambios
✅ **Sin pérdida de datos:** Las versiones anteriores nunca se eliminan
✅ **Evaluaciones intactas:** Las evaluaciones usan la versión específica que tenían
✅ **Mejora continua:** Perfecciona preguntas sin afectar históricos
✅ **Auditoría:** Sabes quién modificó qué y cuándo

### Casos de uso comunes:

- 📝 Mejorar la redacción del enunciado
- ✏️ Corregir errores en las alternativas
- 🎯 Ajustar nivel de dificultad
- 📚 Reasignar a otra unidad o tema
- 🔄 Cambiar tipo de pregunta (ej: única → múltiple)

## 🚀 Cómo Crear una Nueva Versión

### Método 1: Desde Ver Detalle (Recomendado)

1. **Navega al Banco de Preguntas**
   - Ve al menú lateral → "Banco de Preguntas"

2. **Encuentra la pregunta**
   - Usa la búsqueda o filtros
   - Localiza la pregunta que quieres versionar

3. **Abre los detalles**
   - Haz clic en el botón **"👁️ Ver Detalle"**
   
   ![Modal de detalle mostrando pregunta completa]

4. **Revisa la información**
   - Verifica el contenido actual
   - Mira el historial de versiones (si existe)
   - Identifica qué quieres cambiar

5. **Inicia el versionado**
   - Haz clic en **"🔄 Crear Nueva Versión"** (botón verde)
   
6. **Edita los campos deseados**
   - Modifica el enunciado
   - Ajusta las alternativas
   - Cambia taxonomía o dificultad
   
7. **Guarda la nueva versión**
   - Clic en **"💾 Crear Nueva Versión"**
   - Verás confirmación con el nuevo número de versión

### Método 2: Desde Menú Desplegable (Rápido)

1. En la tarjeta de la pregunta, haz clic en el **menú desplegable** (⋮)
2. Selecciona **"🔄 Crear Nueva Versión"**
3. Se abre directamente el editor con los datos pre-cargados
4. Realiza tus cambios y guarda

## 🔍 Entendiendo el Historial de Versiones

### Badges de versión

- **v1, v2, v3...**: Número de versión actual
- **⚠️ Versión Antigua**: Indica que existe una versión más reciente
- **Actual**: Marca la versión más reciente en el historial

### Ver historial completo

1. Abre el modal de detalle de cualquier pregunta
2. Si tiene múltiples versiones, verás:
   ```
   📚 Historial de Versiones (5)
   ```
3. Haz clic en **"▼ Mostrar"**
4. Verás listado de todas las versiones:
   - Número de versión
   - Fecha de creación
   - Autor
   - Badge "Actual" en la más reciente

### Navegar entre versiones

- Desde el historial, haz clic en **"👁️ Ver"** en cualquier versión
- El modal cambia para mostrar esa versión específica
- Puedes crear una nueva versión desde cualquier versión histórica

## 📝 Campos que puedes Modificar

Al crear una nueva versión, puedes cambiar:

### ✏️ Enunciado
- Texto completo de la pregunta
- Mejora redacción, corrige errores

### 🎯 Tipo de Pregunta
- Verdadero/Falso
- Selección Única
- Selección Múltiple
- Desarrollo

⚠️ **Nota:** Al cambiar el tipo, las opciones se ajustarán automáticamente

### 📚 Taxonomía
- Asignatura
- Unidad
- Tema

### 🎲 Dificultad
- Bajo
- Medio
- Alto

### ✅ Alternativas (excepto Desarrollo)
- Texto de cada opción
- Marcar correctas/incorrectas
- Agregar o eliminar alternativas
- Cambiar orden

## ⚠️ Advertencias y Validaciones

### Validaciones obligatorias:

❌ **No puedes guardar si:**
- Falta el enunciado
- No seleccionaste tema
- No hay alternativas (si no es Desarrollo)
- No marcaste respuestas correctas
- La asignatura no tiene unidades
- La unidad no tiene temas

✅ **Sistema valida:**
- Cardinalidad de opciones según tipo
- Al menos una opción correcta
- Taxonomía existente y vigente
- Todos los campos obligatorios

## 🎨 Ejemplos Prácticos

### Ejemplo 1: Mejorar redacción

**Versión 1 (original):**
```
Pregunta: Cuanto es 2+2?
Opciones:
  ✅ 4
  ❌ 3
  ❌ 5
```

**Crear v2 con mejor redacción:**
```
Pregunta: ¿Cuál es el resultado de la operación 2 + 2?
Opciones:
  ✅ 4
  ❌ 3
  ❌ 5
```

**Resultado:**
- v1 queda intacta
- v2 es la nueva versión activa
- Historial muestra ambas

### Ejemplo 2: Cambiar tipo de pregunta

**Versión 1 (Selección Única):**
```
¿Cuál lenguaje es de programación?
  ✅ Python
  ❌ HTML
  ❌ CSS
```

**Crear v2 como Selección Múltiple:**
```
¿Cuáles son lenguajes de programación?
  ✅ Python
  ❌ HTML
  ❌ CSS
  ✅ JavaScript
```

### Ejemplo 3: Ajustar dificultad

**Escenario:** Pregunta muy difícil para estudiantes

**Acción:**
1. Crear nueva versión
2. Cambiar dificultad de "Alto" a "Medio"
3. Simplificar enunciado
4. Agregar pista en la redacción

**Resultado:** 
- v1 mantiene nivel "Alto" (para evaluaciones pasadas)
- v2 tiene nivel "Medio" (para nuevas evaluaciones)

## 📊 Información de Trazabilidad

Cada versión registra:

- **ID único:** Identificador de la versión específica
- **Número de versión:** v1, v2, v3...
- **Autor:** Quién creó esta versión
- **Fecha de creación:** Cuándo se creó
- **Última actualización:** Si hubo modificaciones menores

**Ejemplo de metadata:**
```
ID: q-42
Versión: v3
Autor: profesor.matematicas@colegio.cl
Creada: 15 de marzo, 2025
Actualizada: 15 de marzo, 2025 por profesor.matematicas@colegio.cl
```

## 🔐 Buenas Prácticas

### ✅ DO (Hacer)

1. **Revisa antes de versionar**
   - Abre el detalle completo
   - Lee la versión actual
   - Identifica claramente qué cambiar

2. **Versiona con propósito**
   - Cambios significativos que mejoran la pregunta
   - Correcciones de errores
   - Ajustes de dificultad

3. **Mantén coherencia**
   - Respeta el estilo del banco de preguntas
   - Usa formato consistente

4. **Verifica después**
   - Confirma que la nueva versión está correcta
   - Revisa el historial

### ❌ DON'T (No hacer)

1. **No versiones por cambios mínimos**
   - No crear v2 solo por una coma
   - No versionar por espacios en blanco

2. **No cambies todo a la vez**
   - Mantén la esencia de la pregunta
   - Si cambias radicalmente, mejor crea pregunta nueva

3. **No pierdas el contexto**
   - Mantén relación con el tema asignado
   - No cambies de asignatura sin razón

## ❓ Preguntas Frecuentes

### ¿Puedo eliminar una versión antigua?

No directamente. Las versiones se mantienen para trazabilidad. Solo puedes hacer soft-delete de la pregunta completa (todas sus versiones).

### ¿Qué pasa con las evaluaciones que usan la versión antigua?

Nada. Las evaluaciones mantienen referencia al `question_id` específico de la versión que usaron. Tus evaluaciones pasadas no se ven afectadas.

### ¿Puedo versionar desde una versión que no es la actual?

Sí. Puedes navegar al historial, ver una versión antigua, y crear una nueva versión basada en ella. El sistema automáticamente calculará el número correcto (siguiente al máximo).

### ¿Cuál es el límite de versiones?

No hay límite. Puedes crear tantas versiones como necesites.

### ¿Cómo sé cuál es la versión más reciente?

En el listado, todas las versiones se muestran. En el modal de detalle:
- Badge con número de versión más alto
- Alerta si estás viendo versión antigua
- Badge "Actual" en el historial

### ¿Puedo editar directamente sin versionar?

En la implementación actual, NO. Toda edición crea nueva versión (RN-1: inmutabilidad). Esto garantiza trazabilidad completa.

## 🎯 Tips Avanzados

### Tip 1: Versionado en lote

Si necesitas versionar muchas preguntas similares:
1. Abre primera pregunta
2. Crea versión con cambios
3. Repite con filtros activos (mismo tema, dificultad)
4. Filtros se mantienen al crear nueva pregunta

### Tip 2: Comparación manual

Aunque no hay vista diff automática aún, puedes:
1. Abre versión antigua en una pestaña
2. Abre versión nueva en otra pestaña
3. Compara lado a lado

### Tip 3: Documentación externa

Para cambios muy significativos:
- Anota en tu sistema de gestión por qué versionaste
- Coordina con equipo docente
- Comunica cambios importantes

## 📞 Soporte

¿Problemas con el versionado?

- Revisa esta guía
- Consulta documentación técnica (CU-BP-02-IMPLEMENTATION.md)
- Contacta al administrador del sistema

---

**Última actualización:** 13 de octubre, 2025  
**Versión de la guía:** 1.0
