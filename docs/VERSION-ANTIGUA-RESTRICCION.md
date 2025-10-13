# Restricción de Acciones en Versiones Antiguas

## Descripción

Las versiones antiguas de preguntas **no pueden ser editadas ni usadas como base para crear nuevas versiones**. Solo la **versión más reciente** permite estas acciones.

## Reglas de Negocio

### RN-1: Solo la última versión es editable
- **Regla**: No se puede editar una versión que no sea la más reciente
- **Razón**: Mantener la integridad del historial y evitar ramificaciones confusas
- **Implementación**: El botón "✏️ Editar" solo aparece en la versión actual

### RN-2: Solo desde la última versión se puede versionar
- **Regla**: Solo se puede crear una nueva versión desde la versión más reciente
- **Razón**: Las versiones deben ser lineales y secuenciales (v1 → v2 → v3)
- **Implementación**: El botón "🔄 Crear Nueva Versión" solo aparece en la versión actual

### RN-3: Versiones antiguas son de solo lectura
- **Regla**: Las versiones anteriores solo pueden visualizarse, no modificarse
- **Razón**: Preservar el historial de cambios intacto para auditoría
- **Implementación**: Modal muestra alerta y solo botón "Cerrar" para versiones antiguas

## Implementación Técnica

### ViewQuestionModal.tsx

#### Identificación de Versión Actual

```typescript
const isLatestVersion = versionHistory.length > 0 && 
  versionHistory[0].question_id === question.question_id;
```

**Lógica**:
1. `versionHistory[0]` es la versión más reciente (ordenado DESC por version number)
2. Compara el `question_id` actual con el de la primera posición
3. Si coinciden → es la versión actual
4. Si no coinciden → es una versión antigua

#### Renderizado Condicional de Botones

```typescript
{isLatestVersion && onEdit && (
  <Button variant="warning" onClick={() => onEdit(question.question_id)}>
    ✏️ Editar
  </Button>
)}

{isLatestVersion && onCreateVersion && (
  <Button variant="success" onClick={() => onCreateVersion(question.question_id)}>
    🔄 Crear Nueva Versión
  </Button>
)}
```

**Comportamiento**:
- **Versión actual**: Muestra ambos botones (Editar y Crear Versión)
- **Versión antigua**: No muestra ninguno de los dos botones
- **Siempre disponible**: Botón "❌ Cerrar"

#### Alerta de Versión Antigua

```typescript
{!isLatestVersion && (
  <Alert variant="warning" className="d-flex justify-content-between align-items-center">
    <div>
      <strong>⚠️ Atención:</strong> Esta no es la versión más reciente de la pregunta.
      <br />
      <small>Existe una versión v{versionHistory[0].version} más actualizada.</small>
    </div>
    <Button
      variant="warning"
      size="sm"
      onClick={() => setQuestion(versionHistory[0])}
    >
      📄 Ver Última Versión
    </Button>
  </Alert>
)}
```

**Elementos**:
1. **Icono de advertencia**: ⚠️ para llamar la atención
2. **Mensaje claro**: Indica que no es la versión actual
3. **Información adicional**: Número de la versión más reciente
4. **Acción rápida**: Botón para ir directamente a la última versión

## Flujo de Usuario

### Caso 1: Usuario ve versión actual (v3)

```
┌─────────────────────────────────────────┐
│ 📋 Detalle de Pregunta [v3] [Actual]   │
├─────────────────────────────────────────┤
│                                         │
│ [Contenido de la pregunta v3]          │
│                                         │
│ [Historial: v1, v2, v3]                 │
│                                         │
├─────────────────────────────────────────┤
│ [❌ Cerrar] [✏️ Editar] [🔄 Nueva Ver.] │
└─────────────────────────────────────────┘
```

**Acciones disponibles**:
- ✅ Cerrar modal
- ✅ Editar pregunta
- ✅ Crear nueva versión (v4)

### Caso 2: Usuario navega a versión antigua (v1)

```
┌─────────────────────────────────────────┐
│ 📋 Detalle de Pregunta [v1] [⚠️ Antigua]│
├─────────────────────────────────────────┤
│ ⚠️ Esta no es la versión más reciente   │
│ Existe una versión v3 más actualizada.  │
│                  [📄 Ver Última Versión]│
├─────────────────────────────────────────┤
│ [Contenido de la pregunta v1]          │
│                                         │
│ [Historial: v1, v2, v3]                 │
│                                         │
├─────────────────────────────────────────┤
│                         [❌ Cerrar]      │
└─────────────────────────────────────────┘
```

**Acciones disponibles**:
- ✅ Cerrar modal
- ✅ Ver última versión (navega a v3)
- ❌ Editar pregunta (botón oculto)
- ❌ Crear nueva versión (botón oculto)

## Beneficios

### 1. Integridad del Historial
- Las versiones antiguas permanecen inmutables
- El historial refleja exactamente lo que fue en cada momento
- Auditoría precisa de cambios

### 2. Linealidad de Versiones
- Versiones siguen una secuencia clara: v1 → v2 → v3 → v4
- No hay ramificaciones o versiones paralelas
- Fácil de entender y rastrear

### 3. Claridad para el Usuario
- Alerta visual inmediata de versión antigua
- Botones contextuales (solo los relevantes)
- Acción rápida para ir a versión actual

### 4. Prevención de Errores
- Imposible editar accidentalmente una versión antigua
- Imposible crear ramificaciones desde versiones antiguas
- Guía natural hacia la versión correcta

## Casos de Uso

### CU-1: Consultar historial de cambios

**Given**: Pregunta tiene 3 versiones (v1, v2, v3)  
**When**: Usuario abre v1 desde el historial  
**Then**: 
- Ve alerta de versión antigua
- Ve contenido de v1 (histórico)
- No puede editar
- No puede crear versión desde v1
- Puede navegar a v3 con un clic

### CU-2: Intentar editar versión antigua

**Given**: Usuario está viendo v2 (no es la última)  
**When**: Busca el botón "Editar"  
**Then**: 
- El botón no está visible
- Ve alerta indicando que existe v3
- Debe ir a v3 para poder editar

### CU-3: Crear nueva versión desde versión actual

**Given**: Usuario está viendo v3 (última versión)  
**When**: Hace clic en "🔄 Crear Nueva Versión"  
**Then**: 
- Se abre modal de edición en modo 'version'
- Se pre-cargan datos de v3
- Se creará v4 basada en v3

### CU-4: Intentar versionar desde versión antigua

**Given**: Usuario está viendo v1  
**When**: Busca el botón "Crear Nueva Versión"  
**Then**: 
- El botón no está visible
- Debe navegar a v3 primero
- Desde v3 puede crear v4

## Alternativas Consideradas

### Opción A: Permitir editar cualquier versión ❌
**Rechazada**: Rompería el historial, generaría inconsistencias

### Opción B: Permitir crear versión desde cualquier versión ❌
**Rechazada**: Generaría ramificaciones, difícil de rastrear

### Opción C: Mostrar botones deshabilitados ❌
**Rechazada**: Confunde al usuario (¿por qué está deshabilitado?)

### Opción D: Ocultar botones + alerta + acción rápida ✅
**Seleccionada**: Clara, intuitiva, previene errores, guía al usuario

## Testing

### Test 1: Verificar ocultar botones en versión antigua
```typescript
// Arrange
const question = { question_id: 'q-1', version: 1 };
const versionHistory = [
  { question_id: 'q-3', version: 3 },
  { question_id: 'q-2', version: 2 },
  { question_id: 'q-1', version: 1 },
];

// Act
const isLatestVersion = versionHistory[0].question_id === question.question_id;

// Assert
expect(isLatestVersion).toBe(false);
expect(editButton).not.toBeInTheDocument();
expect(createVersionButton).not.toBeInTheDocument();
```

### Test 2: Verificar mostrar botones en versión actual
```typescript
// Arrange
const question = { question_id: 'q-3', version: 3 };
const versionHistory = [
  { question_id: 'q-3', version: 3 },
  { question_id: 'q-2', version: 2 },
  { question_id: 'q-1', version: 1 },
];

// Act
const isLatestVersion = versionHistory[0].question_id === question.question_id;

// Assert
expect(isLatestVersion).toBe(true);
expect(editButton).toBeInTheDocument();
expect(createVersionButton).toBeInTheDocument();
```

### Test 3: Verificar navegación a última versión
```typescript
// Arrange
const question = { question_id: 'q-1', version: 1 };
const latestVersion = { question_id: 'q-3', version: 3 };

// Act
verUltimaVersionButton.click();

// Assert
expect(currentQuestion).toEqual(latestVersion);
expect(editButton).toBeInTheDocument();
expect(createVersionButton).toBeInTheDocument();
```

## Mejoras Futuras

- [ ] Agregar tooltip explicativo al pasar mouse sobre el área donde estarían los botones
- [ ] Historial de navegación (breadcrumb) entre versiones
- [ ] Comparación visual entre versión actual y versión antigua
- [ ] Logs de auditoría: "Usuario X intentó editar versión antigua Y"

## Referencias

- **CU-BP-02**: Versionar Ítem (reglas de versionado)
- **RN-4**: Versiones ordenadas secuencialmente
- **RN-5**: Trazabilidad mediante original_version_fk
- **Agrupación de Versiones**: `/docs/AGRUPACION-VERSIONES.md`
