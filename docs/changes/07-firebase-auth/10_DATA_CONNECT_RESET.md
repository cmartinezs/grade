# 🔄 Data Connect - Empezar de Cero

**Actualizado:** 2025-11-02 | **Estado:** Reset completo

## 🧹 Limpieza Realizada

- ✅ Eliminado directorio `dataconnect/`
- ✅ Eliminadas referencias en `firebase.json`
- ✅ Limpiado `dataconnect:codegen` y queries de ejemplo

## 🎯 Plan de Implementación Correcto

### Fase 1: Configuración Inicial (Firebase Console)

1. **Habilitar Email/Password en Auth**
   - Firebase Console → Authentication → Sign-in method
   - Activar "Email/Password"

2. **Crear colección users en Firestore**
   - Firebase Console → Firestore Database
   - Crear colección `users` con documento de ejemplo

3. **Copiar reglas de seguridad**
   - Ver: `docs/changes/07-firebase-auth/03_FIRESTORE_STRUCTURE.md`

### Fase 2: Actualizar AuthContext

En lugar de usar Data Connect de una vez, primero:
- Completar Firebase Auth básico
- Usar Firestore Admin SDK en el backend
- Luego opcional: migrar a Data Connect

### Fase 3: Data Connect (Cuando esté estable)

Una vez que Auth + Firestore funcionen:
- `firebase init dataconnect` (cuando sea necesario)
- Definir schema GraphQL
- Crear queries y mutations
- Generar tipos TypeScript

## 📋 Orden Correcto

```
1. Firebase Auth ✅ (Ya hecho)
2. Firestore Schema ✅ (Documentado)
3. Completar Login/Register en Frontend
4. Testing en http://localhost:3000/auth/register
5. Data Connect (opcional después)
```

## ✅ Lo que ya está listo

- ✅ Firebase Auth integrado
- ✅ Credenciales en `.env.local`
- ✅ AuthContext con métodos reales
- ✅ Documentación completa

## ⏳ Próximo Paso

**Leer:** `docs/changes/07-firebase-auth/02_FIREBASE_AUTH_SETUP.md`

**Hacer:** 
1. Habilitar Email/Password en Firebase Console
2. Crear colección `users` en Firestore
3. Probar login/register

---

**No es necesario Data Connect ahora** - Firestore + Admin SDK es suficiente para empezar.
