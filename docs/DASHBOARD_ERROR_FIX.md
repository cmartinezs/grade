# 🔧 Solución a Errores Aleatorios de DataConnect en Dashboard

## 📋 Problema Identificado

Se presentaban errores aleatorios al cargar el dashboard, especialmente al iniciar sesión:

```
DataConnect error while performing request: [{"message":"SQL execution failed","path":["users"]}]
DataConnect error while performing request: [{"message":"SQL execution failed","path":["difficulties"]}]
DataConnect error while performing request: [{"message":"SQL execution failed","path":["units"]}]
```

## 🔍 Causa Raíz

La query original `GetDashboardStats` tenía dos problemas principales:

1. **Restricción de autenticación incorrecta**: Usaba `@auth(expr: "firebaseId == auth.uid")` para todas las tablas, incluyendo datos del sistema (taxonomías, dificultades, tipos de pregunta) que no deberían requerir autenticación específica de usuario.

2. **Race condition en la autenticación**: Al iniciar sesión, el token de Firebase puede no estar completamente sincronizado con DataConnect, causando fallos intermitentes.

## ✅ Solución Implementada

### 1. Separación de Queries

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

### 2. Mecanismo de Reintentos con Backoff Exponencial

Se implementó una función `retryWithBackoff` que:
- Reintenta automáticamente hasta 3 veces
- Usa backoff exponencial (500ms, 1000ms, 2000ms)
- Registra los intentos en la consola para debugging

```typescript
const retryWithBackoff = async <T,>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 500
): Promise<T> => {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};
```

### 3. Manejo de Errores Granular

- Los datos del sistema se cargan con retry obligatorio
- Las preguntas del usuario se intentan cargar con retry, pero si fallan, el dashboard continúa sin ellas
- Se muestra un estado de loading durante la carga
- Se muestra un mensaje de error si falla completamente

### 4. UI Mejorada

Se agregaron indicadores visuales:

**Loading State**
```tsx
{loading && (
  <Alert variant="info">
    <div className="d-flex align-items-center">
      <div className="spinner-border spinner-border-sm me-2" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <span>Cargando datos del dashboard...</span>
    </div>
  </Alert>
)}
```

**Error State**
```tsx
{error && (
  <Alert variant="danger" dismissible onClose={() => setError(null)}>
    <Alert.Heading>Error al cargar datos</Alert.Heading>
    <p>{error}</p>
  </Alert>
)}
```

## 🎯 Beneficios

1. **Mayor Resiliencia**: Los errores temporales de red o sincronización se recuperan automáticamente
2. **Mejor UX**: El usuario ve un indicador de carga y mensajes de error claros
3. **Degradación Elegante**: Si fallan las preguntas, el resto del dashboard funciona
4. **Debugging Mejorado**: Los logs de console ayudan a identificar problemas
5. **Autenticación Correcta**: Cada query usa el nivel de autenticación apropiado

## 🧪 Cómo Probar

1. Cierra sesión completamente
2. Inicia sesión nuevamente
3. Navega al dashboard inmediatamente
4. Verifica que los datos se cargan correctamente sin errores
5. Si hay problemas de red, deberías ver los reintentos en la consola

## 📝 Archivos Modificados

- `/dataconnect/example/queries.gql` - Queries separadas
- `/src/app/dashboard/page.tsx` - Lógica de carga con reintentos y UI mejorada
- `/src/dataconnect-generated/*` - SDK regenerado automáticamente

## 🔄 Regeneración del SDK

Cada vez que modificas las queries GraphQL, ejecuta:

```bash
npx firebase dataconnect:sdk:generate
```

## 🚀 Próximas Mejoras Sugeridas

1. Implementar caché local para reducir llamadas a DataConnect
2. Agregar un botón de "Reintentar" en el mensaje de error
3. Implementar refresh automático periódico
4. Agregar telemetría para monitorear la tasa de errores en producción
