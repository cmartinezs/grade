# CU-BP-01: Crear Ítem en Banco de Preguntas - Guía de Uso

## 🎯 Funcionalidad Implementada

Se ha implementado completamente el caso de uso **CU-BP-01: Crear ítem nuevo en el Banco de Preguntas** con todas las precondiciones, postcondiciones, reglas de negocio y flujos especificados.

## 📁 Archivos Creados

### 1. Tipos y Modelos
- **`src/types/question.ts`**: Definiciones TypeScript para preguntas, opciones, y DTOs

### 2. Lógica de Negocio
- **`src/lib/questionStore.ts`**: Store con localStorage que implementa todas las reglas de negocio:
  - Validación completa (RN-1 a RN-6)
  - Creación con trazabilidad (RN-5)
  - Detección de duplicados
  - Búsqueda y filtrado
  - CRUD completo

### 3. Componentes UI
- **`src/components/CreateQuestionModal.tsx`**: Modal para crear preguntas con:
  - Formulario interactivo
  - Validación en tiempo real
  - Detección de duplicados
  - Auto-configuración según tipo
  - Selector jerárquico de taxonomía

### 4. Páginas Actualizadas
- **`src/app/questions-bank/page.tsx`**: Página del banco actualizada con:
  - Listado de preguntas con detalles
  - Filtros múltiples
  - Búsqueda textual
  - Integración con modal de creación

### 5. Documentación
- **`docs/CU-BP-01-IMPLEMENTATION.md`**: Documentación técnica completa

## 🚀 Cómo Usar

### Iniciar la Aplicación

```bash
# Instalar dependencias (si es necesario)
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Crear una Pregunta

1. **Acceder al Banco de Preguntas**
   - Ir a la página "Banco de Preguntas" desde el menú
   - Clic en el botón "➕ Nueva Pregunta"

2. **Seleccionar Tipo de Pregunta**
   - **Verdadero/Falso**: 2 opciones fijas, 1 correcta
   - **Selección Única**: Múltiples opciones, 1 correcta
   - **Selección Múltiple**: Múltiples opciones, 1+ correctas
   - **Desarrollo**: Sin opciones (respuesta abierta)

3. **Ingresar Enunciado**
   - Escribir el texto de la pregunta en el área de texto
   - Campo obligatorio (*)

4. **Seleccionar Taxonomía** (jerárquico)
   - Seleccionar **Asignatura**
   - Seleccionar **Unidad** (se filtra por asignatura)
   - Seleccionar **Tema** (se filtra por unidad) - obligatorio (*)

5. **Seleccionar Dificultad**
   - Bajo, Medio o Alto
   - Campo obligatorio (*)

6. **Configurar Alternativas** (excepto Desarrollo)
   
   **Para Verdadero/Falso:**
   - Opciones predefinidas: "Verdadero" y "Falso"
   - Marcar una con radio button
   
   **Para Selección Única:**
   - Agregar opciones (mínimo 2)
   - Marcar 1 correcta con radio button
   - Botón "+ Agregar Opción" para más opciones
   
   **Para Selección Múltiple:**
   - Agregar opciones (mínimo 2)
   - Marcar 1 o más correctas con checkboxes
   - Botón "+ Agregar Opción" para más opciones

7. **Revisar Advertencia de Duplicados** (si aplica)
   - Si el sistema detecta preguntas similares, mostrará advertencia
   - Puedes:
     - "Continuar de Todas Formas" para crear igual
     - "Cancelar" para revisar las existentes

8. **Guardar**
   - Clic en "Guardar Pregunta"
   - Sistema valida y crea la pregunta
   - Muestra confirmación con ID de la pregunta
   - Opciones:
     - "Ver Pregunta": Ver en el listado
     - "Crear Otra": Resetea el formulario

### Buscar y Filtrar Preguntas

En la página principal del Banco de Preguntas:

1. **Búsqueda Textual**
   - Escribir en el campo "Buscar"
   - Busca en enunciados y opciones

2. **Filtrar por Tipo**
   - Seleccionar tipo en dropdown
   - Verdadero/Falso, Selección Única, Selección Múltiple, Desarrollo

3. **Filtrar por Dificultad**
   - Seleccionar nivel en dropdown
   - Bajo, Medio, Alto

4. **Filtrar por Asignatura**
   - Seleccionar asignatura
   - Filtra automáticamente por unidades y temas relacionados

5. **Limpiar Filtros**
   - Clic en botón 🔄 para resetear todos los filtros

### Visualizar Preguntas

Cada pregunta en el listado muestra:

- **Badges superiores**:
  - Tipo de pregunta (coloreado)
  - Dificultad (verde=bajo, amarillo=medio, rojo=alto)
  - Asignatura, Unidad, Tema

- **Contenido**:
  - Enunciado completo
  - Lista de opciones con indicadores ✅❌

- **Metadatos**:
  - ID único
  - Versión
  - Autor
  - Fecha de creación

- **Acciones** (dropdown):
  - Ver Detalle
  - Editar (próximamente)
  - Duplicar (próximamente)
  - Ver Estadísticas (próximamente)
  - Eliminar (próximamente)

## ✅ Reglas de Negocio Implementadas

### RN-1: Campos Obligatorios
- ✅ Enunciado
- ✅ Tipo de pregunta
- ✅ Tema (taxonomía)
- ✅ Dificultad

### RN-2: Validación de Opciones por Tipo

| Tipo | Mín. Opciones | Máx. Opciones | Correctas |
|------|---------------|---------------|-----------|
| Verdadero/Falso | 2 | 2 | Exactamente 1 |
| Selección Única | 2 | ilimitado | Exactamente 1 |
| Selección Múltiple | 2 | ilimitado | Al menos 1 |
| Desarrollo | 0 | 0 | N/A |

### RN-3: Metadatos Vigentes
- ✅ Tema debe existir en catálogo activo
- ✅ Dificultad debe ser válida
- ✅ Validación contra taxonomías

### RN-4: Estado Inicial
- ✅ Todas las preguntas se crean en estado **activo**

### RN-5: Trazabilidad
- ✅ Autor registrado
- ✅ Fecha de creación
- ✅ Versión 1 inicial
- ✅ Fecha de última modificación

### RN-6: Posiciones de Alternativas
- ✅ Únicas y consecutivas (1, 2, 3, ...)
- ✅ Sin saltos

### RN-7: Indexación
- ✅ Inmediata (en localStorage)
- ✅ Búsqueda funcional de inmediato

## 📊 Almacenamiento

### LocalStorage
El sistema usa **localStorage** para persistencia:

- `questions_bank_questions`: Array de preguntas
- `questions_bank_options`: Array de opciones
- `questions_bank_counters`: Contadores de IDs

### Datos de Ejemplo
Al iniciar por primera vez, se carga 1 pregunta de ejemplo para demostración.

### Persistencia
- Las preguntas persisten entre recargas de página
- Se puede limpiar desde DevTools → Application → Local Storage

## 🎨 Características de UI/UX

### Modal de Creación
- ✅ Validación en tiempo real
- ✅ Mensajes de error contextuales
- ✅ Auto-configuración de opciones según tipo
- ✅ Cascada de selectores (Asignatura → Unidad → Tema)
- ✅ Detección de duplicados con advertencia
- ✅ Confirmación de éxito con acciones rápidas
- ✅ Diseño responsive

### Página de Listado
- ✅ Vista en cards con información completa
- ✅ Badges coloreados por categoría
- ✅ Filtros combinables
- ✅ Búsqueda instantánea
- ✅ Estado vacío amigable
- ✅ Contador de preguntas
- ✅ Menú de acciones por pregunta

## 🔍 Detección de Duplicados

El sistema detecta automáticamente preguntas similares usando:

```
Score de Similitud:
- Mismo tema: +30 puntos
- Mismo tipo: +20 puntos  
- Palabras coincidentes: hasta +50 puntos

Umbral: ≥60 puntos → Advertencia de duplicado
```

Si se detecta duplicado:
- Muestra lista de preguntas similares
- Usuario decide si continuar o cancelar
- No bloquea la creación (advertencia, no error)

## 🧪 Testing

### Escenarios de Prueba Manual

1. **Crear Verdadero/Falso**
   ```
   - Tipo: Verdadero/Falso
   - Enunciado: "La capital de Chile es Santiago"
   - Tema: Geografía
   - Dificultad: Bajo
   - Marcar: Verdadero como correcta
   ✅ Debería crear exitosamente
   ```

2. **Crear Selección Única**
   ```
   - Tipo: Selección Única
   - Enunciado: "¿Cuánto es 2+2?"
   - Opciones: 3, 4, 5, 6
   - Correcta: 4
   ✅ Debería crear con 4 opciones
   ```

3. **Crear Selección Múltiple**
   ```
   - Tipo: Selección Múltiple
   - Enunciado: "Selecciona números pares"
   - Opciones: 1, 2, 3, 4, 5
   - Correctas: 2 y 4
   ✅ Debería permitir múltiples correctas
   ```

4. **Validación: Sin enunciado**
   ```
   - Dejar enunciado vacío
   - Intentar guardar
   ❌ Debería mostrar error: "El enunciado es obligatorio"
   ```

5. **Validación: Sin tema**
   ```
   - No seleccionar tema
   - Intentar guardar
   ❌ Debería mostrar error: "El tema es obligatorio"
   ```

6. **Detección de duplicados**
   ```
   - Crear pregunta con enunciado similar a una existente
   - En mismo tema
   ⚠️ Debería mostrar advertencia con similares
   ```

7. **Búsqueda**
   ```
   - Buscar "capital"
   ✅ Debería filtrar preguntas con "capital" en texto
   ```

8. **Filtros combinados**
   ```
   - Filtrar por tipo: Selección Única
   - Y dificultad: Medio
   ✅ Debería mostrar solo preguntas que cumplan ambos
   ```

## 🐛 Solución de Problemas

### La página no carga
- Verificar que el servidor de desarrollo esté corriendo
- Verificar en consola del navegador si hay errores
- Intentar `npm run dev` nuevamente

### No se guardan las preguntas
- Verificar que localStorage esté habilitado en el navegador
- Abrir DevTools → Application → Local Storage
- Verificar que no esté en modo incógnito (localStorage limitado)

### No aparecen las taxonomías
- Verificar que el store de taxonomías tenga datos
- Ir a "Gestión de Taxonomías" y crear al menos una Asignatura → Unidad → Tema

### El modal no se cierra
- Hacer clic en "Cancelar" o en la X
- Si está bloqueado, recargar la página

### Errores de validación
- Leer mensaje de error específico
- Verificar que todos los campos obligatorios (*) estén completos
- Verificar que haya al menos una opción correcta (excepto Desarrollo)

## 📈 Próximos Pasos

Funcionalidades que se pueden agregar:

1. **Editar pregunta existente**
2. **Eliminar pregunta** (soft delete)
3. **Duplicar pregunta**
4. **Ver detalles completos** (modal de vista)
5. **Historial de versiones**
6. **Exportar/Importar** (CSV, JSON)
7. **Estadísticas de uso** en evaluaciones
8. **Tags/etiquetas adicionales**
9. **Comentarios colaborativos**
10. **Migración a base de datos** (PostgreSQL)

## 📞 Soporte

Si encuentras problemas o tienes preguntas:

1. Revisa la documentación técnica: `docs/CU-BP-01-IMPLEMENTATION.md`
2. Verifica los errores en consola del navegador
3. Revisa el código en `src/lib/questionStore.ts` para lógica de negocio
4. Contacta al equipo de desarrollo

---

✨ **¡Banco de Preguntas listo para usar!** ✨
