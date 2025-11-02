# Rectificación de userDataConnect.ts

## 📋 Resumen de Cambios

Se rectificó `userDataConnect.ts` para usar las **funciones generadas por el SDK de Data Connect** en lugar de llamadas fetch manuales, siguiendo el mismo patrón usado en `taxonomyDataConnect.ts`.

## 🔄 Patrón Antes (Fetch Manual)

```typescript
// ❌ Antes
import { auth } from '@/lib/firebase';

export const getUserByEmail = async (email: string) => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATACONNECT_ENDPOINT}/query/GetUserByEmail`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ email })
    }
  );
  const data = await response.json();
  return data.data?.user || null;
};
```

## ✅ Patrón Después (SDK Generado)

```typescript
// ✅ Después
import {
  getUserByEmail as dcGetUserByEmail,
  createUser as dcCreateUser,
  updateUser as dcUpdateUser,
} from '../dataconnect-generated';

export const getUserByEmail = async (email: string): Promise<UserData | null> => {
  try {
    const result = await dcGetUserByEmail({ email });
    const user = result.data.user;
    if (!user) return null;
    
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? undefined,
      updatedBy: user.updatedBy ?? undefined,
      deletedAt: user.deletedAt ?? undefined,
    };
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    return null;
  }
};
```

## 📁 Archivos Modificados

### 1. `/src/lib/userDataConnect.ts`
**Cambios:**
- ✅ Importa funciones del SDK generado: `dcGetUserByEmail`, `dcCreateUser`, `dcUpdateUser`
- ✅ Elimina importes de Firebase (`auth`, `fetch` manual)
- ✅ Usa patrón consistente con `taxonomyDataConnect.ts`
- ✅ Renombramiento de funciones para evitar conflictos:
  - `createUser` → `createNewUser`
  - `updateUser` → `updateUserInfo`

### 2. `/src/contexts/AuthContext.tsx`
**Cambios:**
- ✅ Actualiza import: `createNewUser` en lugar de `createUser`
- ✅ Actualiza llamada en `register()`: `await createNewUser(...)` en lugar de `await createUser(...)`

## 📊 Comparativa

| Aspecto | Antes (Fetch) | Después (SDK) |
|---|---|---|
| Gestión de tokens | Manual con `auth.currentUser` | Automática del SDK |
| Endpoints | URLs constructos manual | Configurados en connectorConfig |
| Manejo de errores | Response manual + JSON | Integrado en promise |
| Type safety | Parcial | Completo con tipos generados |
| Headers HTTP | Manuales | Automáticos |
| Mantenibilidad | Difícil (duplica lógica) | Fácil (centralizado) |

## 🏗️ Estructura de Funciones

```typescript
// src/lib/userDataConnect.ts

1. getUserByEmail(email)
   ├── Llama: dcGetUserByEmail({ email })
   ├── Retorna: UserData | null
   └── Mapea campos con null coalescing

2. createNewUser(userData)
   ├── Llama: dcCreateUser(userData)
   ├── Retorna: UserData (datos básicos)
   └── Genera createdAt del cliente

3. updateUserInfo(userId, updates)
   ├── Llama: dcUpdateUser({...})
   ├── No retorna nada (void)
   └── Lanza error si falla
```

## 🔐 Autorización Automática

El SDK de Data Connect maneja automáticamente:
- ✅ Obtención del token de autenticación
- ✅ Inclusión de `auth.uid` en contexto
- ✅ Validación de `@auth` directives en schema
- ✅ Encriptación de comunicación

## 💾 Configuración Requerida

El SDK necesita estar inicializado en `firebase.ts`:

```typescript
// src/lib/firebase.ts
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';

export const dataConnect = getDataConnect();

// Para desarrollo local (opcional)
// connectDataConnectEmulator(dataConnect, 'localhost', 9090);
```

## 🚀 Beneficios

1. **Seguridad**: Tokens manejados automáticamente
2. **Type Safety**: Tipos generados automáticamente
3. **Mantenibilidad**: Un único lugar para conectarse a Data Connect
4. **Performance**: SDK optimizado
5. **Consistencia**: Mismo patrón en toda la app

## 📝 Ejemplo de Uso en AuthContext

```typescript
const { getUserByEmail, createNewUser } = await import('@/lib/userDataConnect');

// En login
const userData = await getUserByEmail(firebaseUser.email);

// En register
const newUser = await createNewUser({
  name: 'Juan Pérez',
  email: 'juan@email.com',
  role: 'teacher'
});
```

## ✅ Testing

Para verificar que todo funciona:

```bash
# 1. Compilar TypeScript
npm run build

# 2. Ejecutar tests
npm test -- userDataConnect

# 3. Verificar login/register en navegador
# - Crear cuenta
# - Iniciar sesión
# - Verificar localStorage contiene datos de usuario
```

## 🐛 Troubleshooting

### "Cannot find name 'getUserByEmail'"
**Causa**: Imports no están actualizados
**Solución**: Verificar que `userDataConnect.ts` está importado correctamente

### "SDK functions not generated"
**Causa**: `firebase dataconnect:sdk:generate` no fue ejecutado
**Solución**: Ejecutar `firebase dataconnect:sdk:generate`

### "Type mismatch in UserData"
**Causa**: Campos nullable no mapeados correctamente
**Solución**: Usar null coalescing (`user.updatedAt ?? undefined`)

## 📚 Referencias

- [userDataConnect.ts](/src/lib/userDataConnect.ts) - Implementación
- [taxonomyDataConnect.ts](/src/lib/taxonomyDataConnect.ts) - Patrón base
- [AuthContext.tsx](/src/contexts/AuthContext.tsx) - Uso
- [dataconnect-generated](/src/dataconnect-generated) - SDK generado
