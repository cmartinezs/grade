# 🔧 Solución a Errores Aleatorios de DataConnect

## 📋 Problema Identificado

Se presentaban errores aleatorios al cargar datos desde DataConnect, especialmente al iniciar sesión, tanto en el **Dashboard** como en el **Banco de Preguntas**:

```
DataConnect error while performing request: [{"message":"SQL execution failed","path":["users"]}]
DataConnect error while performing request: [{"message":"SQL execution failed","path":["difficulties"]}]
DataConnect error while performing request: [{"message":"SQL execution failed","path":["units"]}]
```

## 🔍 Causa Raíz

Había dos problemas principales:

1. **Restricción de autenticación incorrecta**: La query original `GetDashboardStats` en el dashboard usaba `@auth(expr: "firebaseId == auth.uid")` para todas las tablas, incluyendo datos del sistema (taxonomías, dificultades, tipos de pregunta) que no deberían requerir autenticación específica de usuario.

2. **Race condition en la autenticación**: Al iniciar sesión, el token de Firebase puede no estar completamente sincronizado con DataConnect, causando fallos intermitentes en TODAS las llamadas a DataConnect.

3. **Sin manejo de reintentos**: Las llamadas fallaban inmediatamente sin intentar recuperarse de errores temporales de red o sincronización.

## ✅ Solución Implementada

### 1. Utilidad de Retry Centralizada

Se creó una función reutilizable `retryWithBackoff` en `/src/lib/retryWithBackoff.ts`:

```typescript
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 500,
  context = 'operation'
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      
      if (i >= maxRetries - 1) break;

      const delay = initialDelay * Math.pow(2, i);
      console.log(`[${context}] Retry ${i + 1}/${maxRetries} after ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}
```

### 2. Separación de Queries en Dashboard

Se dividió la query monolítica en dos queries específicas:

**`GetDashboardQuestions`** - Solo preguntas del usuario
```graphql
query GetDashboardQuestions($userId: UUID!, $firebaseId: String!) 
  @auth(expr: "firebaseId == auth.uid") {
  questions(where: { userId: { eq: $userId }, deletedAt: { eq: null } }) {
    questionId
    active
    topicId
    difficultyId
    questionTypeId
    taxonomyId
    isPublic
    createdAt
  }
}
```

**`GetDashboardSystemData`** - Datos del sistema (sin autenticación específica)
```graphql
query GetDashboardSystemData @auth(level: USER) {
  taxonomies(where: { active: { eq: true } }) { ... }
  difficulties(where: { active: { eq: true } }) { ... }
  questionTypes(where: { active: { eq: true } }) { ... }
  subjects(where: { active: { eq: true }, deletedAt: { eq: null } }) { ... }
  units(where: { active: { eq: true }, deletedAt: { eq: null } }) { ... }
  topics(where: { active: { eq: true }, deletedAt: { eq: null } }) { ... }
}
```

### 3. Reintentos en Todos los Hooks

Se agregó `retryWithBackoff` a todos los hooks que llaman a DataConnect:

**`useDifficulties`** ✅
```typescript
const data = await retryWithBackoff(
  () => fetchAllDifficulties(), 
  3, 
  500, 
  'useDifficulties'
);
```

**`useQuestionTypes`** ✅
```typescript
const data = await retryWithBackoff(
  () => fetchAllQuestionTypes(), 
  3, 
  500, 
  'useQuestionTypes'
);
```

**`useCurriculumHierarchy`** ✅
```typescript
const [subjectsData, unitsData, topicsData] = await Promise.all([
  retryWithBackoff(() => fetchAllSubjects(), 3, 500, 'useCurriculumHierarchy.subjects'),
  retryWithBackoff(() => fetchAllUnits(), 3, 500, 'useCurriculumHierarchy.units'),
  retryWithBackoff(() => fetchAllTopics(), 3, 500, 'useCurriculumHierarchy.topics'),
]);
```

**`useQuestions`** ✅
```typescript
const userResult = await retryWithBackoff(
  () => getUserByEmail({ email: user.email }),
  3,
  500,
  'useQuestions.getUserByEmail'
);

const dcQuestions = await retryWithBackoff(
  () => fetchQuestionsByUser(userData.userId, user.firebaseUid),
  3,
  500,
  'useQuestions.fetchQuestionsByUser'
);
```

**Dashboard** ✅
```typescript
const systemDataResult = await retryWithBackoff(
  () => getDashboardSystemData(),
  3,
  500,
  'dashboard.getDashboardSystemData'
);
```

## 🎯 Beneficios

1. **Mayor Resiliencia**: Los errores temporales de red o sincronización se recuperan automáticamente en TODA la aplicación
2. **Mejor UX**: El usuario ve indicadores de carga y mensajes de error claros
3. **Degradación Elegante**: Si fallan las preguntas en el dashboard, el resto funciona
4. **Debugging Mejorado**: Los logs de console con contexto ayudan a identificar problemas específicos
5. **Autenticación Correcta**: Cada query usa el nivel de autenticación apropiado
6. **Código Reutilizable**: La función `retryWithBackoff` se usa en toda la aplicación
7. **Consistencia**: Todos los hooks siguen el mismo patrón de manejo de errores

## 📍 Componentes Afectados

### Hooks Actualizados
- ✅ `useDifficulties` - Carga niveles de dificultad
- ✅ `useQuestionTypes` - Carga tipos de preguntas
- ✅ `useCurriculumHierarchy` - Carga asignaturas, unidades y temas
- ✅ `useQuestions` - Carga preguntas del usuario

### Páginas Actualizadas
- ✅ `/dashboard` - Dashboard principal
- ✅ `/questions-bank` - Banco de preguntas (usa los hooks actualizados)

### Utilidades Nuevas
- ✅ `/src/lib/retryWithBackoff.ts` - Función centralizada de retry

## 🧪 Cómo Probar

1. Cierra sesión completamente
2. Inicia sesión nuevamente
3. Navega al **Dashboard** inmediatamente
4. Navega al **Banco de Preguntas** inmediatamente
5. Verifica que los datos se cargan correctamente sin errores
6. Si hay problemas de red temporales, deberías ver los reintentos en la consola del navegador

**Ejemplo de logs esperados:**
```
[useDifficulties] Retry 1/3 after 500ms... <error message>
[useQuestionTypes] Retry 1/3 after 500ms... <error message>
[useCurriculumHierarchy.units] Retry 2/3 after 1000ms... <error message>
✅ Cargadas 42 preguntas desde Data Connect
```

## 📝 Archivos Modificados

### Queries GraphQL
- `/dataconnect/example/queries.gql` - Queries separadas (`GetDashboardQuestions` y `GetDashboardSystemData`)

### Hooks
- `/src/hooks/useDifficulties.ts` - Retry en carga y refetch
- `/src/hooks/useQuestionTypes.ts` - Retry en carga y refetch
- `/src/hooks/useCurriculumHierarchy.ts` - Retry en carga paralela de subjects, units, topics
- `/src/hooks/useQuestions.ts` - Retry en getUserByEmail y fetchQuestionsByUser

### Páginas
- `/src/app/dashboard/page.tsx` - Lógica de carga con reintentos, UI mejorada con loading/error states

### Utilidades
- `/src/lib/retryWithBackoff.ts` - Nueva función centralizada de retry con backoff exponencial

### SDK Generado
- `/src/dataconnect-generated/*` - SDK regenerado automáticamente con las nuevas queries

## 🔄 Regeneración del SDK

Cada vez que modificas las queries GraphQL, ejecuta:

```bash
npx firebase dataconnect:sdk:generate
```

## 🚀 Próximas Mejoras Sugeridas

1. ✅ **Implementado**: Retry centralizado en todos los hooks
2. Implementar caché local con Service Worker para reducir llamadas a DataConnect
3. Agregar un botón de "Reintentar" en los mensajes de error
4. Implementar refresh automático periódico en el dashboard
5. Agregar telemetría para monitorear la tasa de errores y reintentos en producción
6. Implementar timeout configurable por tipo de query
7. Agregar offline detection y modo offline con datos cacheados
