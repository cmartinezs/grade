# Fix: Carga Completa de Taxonomía en EditQuestionModal

## 🐛 Problema Identificado

Al abrir el modal de "Crear Nueva Versión", solo se cargaba la asignatura pero no la unidad ni el tema original de la pregunta.

### Causa Raíz

Los `useEffect` que resetean la unidad y el tema cuando cambia la asignatura se ejecutaban **después** de cargar los datos iniciales, causando que se borraran los valores correctos.

```typescript
// ❌ ANTES - Estos useEffect se ejecutaban y borraban los valores
useEffect(() => {
  setSelectedUnit('');
  setSelectedTopic('');
}, [selectedSubject]);

useEffect(() => {
  setSelectedTopic('');
}, [selectedUnit]);
```

### Comportamiento Erróneo

**Secuencia de eventos:**
1. Modal se abre con `questionId`
2. Se carga la pregunta y se setea `selectedSubject` 
3. Se setea `selectedUnit`
4. ⚠️ El `useEffect` detecta cambio en `selectedSubject` → resetea `selectedUnit` y `selectedTopic`
5. Se setea `selectedTopic`
6. ⚠️ El `useEffect` detecta cambio en `selectedUnit` → resetea `selectedTopic`

**Resultado:** Solo queda `selectedSubject`, los demás campos se borran.

## ✅ Solución Implementada

### 1. Flag de Carga Inicial

Agregamos un estado para indicar cuando estamos cargando datos iniciales:

```typescript
const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
```

### 2. Orden Correcto de Carga

Reordenamos la carga para establecer la jerarquía completa **antes** de habilitar los efectos:

```typescript
useEffect(() => {
  if (show && questionId) {
    setIsLoadingQuestion(true); // 🔒 Bloquear efectos de reset
    
    const question = questionStore.getQuestionWithDetails(questionId);
    if (question) {
      // 1️⃣ Cargar jerarquía de taxonomía PRIMERO
      const allTopics = getAllTopics();
      const allUnits = getAllUnits();
      const topic = allTopics.find(t => t.topic_id === question.topic_fk);
      
      if (topic) {
        const unit = allUnits.find(u => u.unit_id === topic.unit_fk);
        if (unit) {
          // Establecer en orden correcto: Subject → Unit → Topic
          setSelectedSubject(unit.subject_fk);
          setSelectedUnit(topic.unit_fk);
          setSelectedTopic(question.topic_fk);
        }
      }
      
      // 2️⃣ Luego cargar otros datos del formulario
      setQuestionType(question.type);
      setEnunciado(question.enunciado);
      setDifficulty(question.difficulty_fk);
      setOptions(/* ... */);
    }
    
    // 3️⃣ Pequeño delay para asegurar que el estado se estableció
    setTimeout(() => setIsLoadingQuestion(false), 100); // 🔓 Desbloquear efectos
  }
}, [show, questionId]);
```

### 3. Efectos Condicionales

Modificamos los `useEffect` de reset para que **solo se ejecuten después de la carga inicial**:

```typescript
// ✅ DESPUÉS - Solo resetean si no estamos cargando
useEffect(() => {
  if (!isLoadingQuestion && originalQuestion) {
    setSelectedUnit('');
    setSelectedTopic('');
  }
}, [selectedSubject, isLoadingQuestion, originalQuestion]);

useEffect(() => {
  if (!isLoadingQuestion && originalQuestion) {
    setSelectedTopic('');
  }
}, [selectedUnit, isLoadingQuestion, originalQuestion]);
```

### 4. Reset Completo

Aseguramos que `resetForm()` también reinicie el flag:

```typescript
const resetForm = () => {
  setOriginalQuestion(null);
  setIsLoadingQuestion(false); // ✅ Reiniciar flag
  // ... resto de resets
};
```

## 📊 Flujo Corregido

### Secuencia Nueva (Correcta)

```
1. Modal se abre → setIsLoadingQuestion(true)
   ↓
2. Buscar question en store
   ↓
3. Encontrar topic → encontrar unit → encontrar subject
   ↓
4. setSelectedSubject(subject_fk)
   ⚡ useEffect bloqueado (isLoadingQuestion === true)
   ↓
5. setSelectedUnit(unit_fk)
   ⚡ useEffect bloqueado (isLoadingQuestion === true)
   ↓
6. setSelectedTopic(topic_fk)
   ⚡ useEffect bloqueado (isLoadingQuestion === true)
   ↓
7. Cargar resto de datos (tipo, enunciado, dificultad, opciones)
   ↓
8. setTimeout → setIsLoadingQuestion(false) después de 100ms
   ✅ useEffects ahora activos para cambios manuales del usuario
```

## 🎯 Resultado

### Antes del Fix
```
Asignatura: ✅ Matemáticas
Unidad:     ❌ (vacío)
Tema:       ❌ (vacío)
```

### Después del Fix
```
Asignatura: ✅ Matemáticas
Unidad:     ✅ Álgebra
Tema:       ✅ Ecuaciones Lineales
```

## 🔍 Testing

### Caso de Prueba 1: Crear Nueva Versión
1. Tener una pregunta existente con taxonomía completa
2. Click en "Ver Detalle"
3. Click en "🔄 Crear Nueva Versión"
4. **Verificar:** Asignatura, Unidad y Tema pre-cargados correctamente

### Caso de Prueba 2: Cambio Manual después de Carga
1. Abrir modal con pregunta existente (taxonomía cargada)
2. Cambiar manualmente la asignatura
3. **Verificar:** Unidad y Tema se resetean (comportamiento esperado)
4. Seleccionar nueva unidad
5. **Verificar:** Tema se resetea (comportamiento esperado)

### Caso de Prueba 3: Cancelar y Reabrir
1. Abrir modal, ver taxonomía cargada
2. Cancelar modal
3. Reabrir mismo modal
4. **Verificar:** Taxonomía cargada nuevamente sin problemas

## 💡 Lecciones Aprendidas

### 1. **Carga Jerárquica**
Cuando tienes datos jerárquicos (Subject → Unit → Topic), carga desde la raíz hasta las hojas en un solo batch antes de habilitar efectos reactivos.

### 2. **Flags de Estado**
Usar flags booleanos (`isLoadingQuestion`) para distinguir entre:
- Carga inicial de datos (no resetear)
- Cambios manuales del usuario (sí resetear)

### 3. **Orden Importa**
El orden de los `setState` puede causar re-renders y activar efectos. Agrupa todos los sets relacionados antes de habilitar efectos.

### 4. **Timeout Estratégico**
Un pequeño `setTimeout(100ms)` asegura que todos los estados se han establecido antes de habilitar efectos reactivos.

## 📝 Archivos Modificados

- ✅ `/src/components/EditQuestionModal.tsx`
  - Agregado: `isLoadingQuestion` state
  - Modificado: `useEffect` de carga inicial
  - Modificado: `useEffect` de reset de unidad/tema
  - Modificado: `resetForm()`

## 🚀 Mejoras Futuras

### Opción 1: Componente Reutilizable
Crear un `<TaxonomySelector>` que maneje toda esta lógica internamente:

```typescript
<TaxonomySelector
  value={{ subject, unit, topic }}
  onChange={(taxonomy) => {
    setSelectedSubject(taxonomy.subject);
    setSelectedUnit(taxonomy.unit);
    setSelectedTopic(taxonomy.topic);
  }}
  isLoading={isLoadingQuestion}
/>
```

### Opción 2: Custom Hook
```typescript
const { 
  subject, unit, topic,
  setSubject, setUnit, setTopic,
  loadTaxonomy 
} = useTaxonomyHierarchy();

// En useEffect:
loadTaxonomy(question.topic_fk);
```

## ✅ Checklist de Verificación

- [x] Taxonomía completa se carga al abrir modal
- [x] Cambios manuales resetean hijos correctamente
- [x] Reset form limpia flag de carga
- [x] No hay errores de TypeScript/ESLint
- [x] Timeout razonable (100ms)
- [x] Documentación actualizada

---

**Fecha:** 13 de octubre, 2025  
**Issue:** Taxonomía incompleta en modal de versionar  
**Fix:** Flag de carga inicial + orden correcto de setState  
**Estado:** ✅ Resuelto y documentado
