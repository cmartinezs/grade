# 🐛 Troubleshooting & FAQ

Solución de problemas comunes y preguntas frecuentes.

## 🔴 Errores Comunes

### Error: "Cannot find module '@/components/MasterDataTable'"

**Causa**: Ruta de importación incorrecta.

**Solución**:
```typescript
// ❌ Incorrecto
import MasterDataTable from '../../../components/MasterDataTable';

// ✅ Correcto
import MasterDataTable from '@/components/MasterDataTable';
```

Verifica que `tsconfig.json` tenga:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### Error: "Type 'X' is not assignable to type 'Y'"

**Causa**: TypeScript strict typing.

**Solución**: Asegúrate que:
1. El componente sea genérico con `<T>`
2. Los tipos de props coincidan
3. Las funciones retornen el tipo esperado

```typescript
// ❌ Incorrecto
const actions: ActionButton[] = [{ label: 'Edit' }]; // Falta onClick

// ✅ Correcto
const actions: ActionButton<MyEntity>[] = [
  {
    label: 'Edit',
    icon: 'pencil',
    onClick: (item) => handleEdit(item),
  },
];
```

---

### Error: "Hydration mismatch"

**Causa**: Diferencia entre render servidor y cliente.

**Solución**: Envuelve componentes con estado en `'use client'`:

```typescript
'use client'; // Agregar esto al inicio

import { useState } from 'react';

export default function MyComponent() {
  const [state, setState] = useState(null);
  // ...
}
```

---

### Error: "localStorage is not defined"

**Causa**: localStorage no existe en servidor (SSR).

**Solución**: Usa useEffect o 'use client':

```typescript
// ❌ Incorrecto
const data = JSON.parse(localStorage.getItem('key') || '[]');

// ✅ Correcto (opción 1: useEffect)
useEffect(() => {
  const data = JSON.parse(localStorage.getItem('key') || '[]');
  setItems(data);
}, []);

// ✅ Correcto (opción 2: 'use client')
'use client';
const data = JSON.parse(localStorage.getItem('key') || '[]');
```

---

### Error: "Cannot destructure undefined"

**Causa**: Props no está recibiendo el valor esperado.

**Solución**: Añade valores por defecto:

```typescript
// ❌ Incorrecto
interface Props {
  items: Item[];
  onSearch: (text: string) => void;
}

export default function MyComponent({ items, onSearch }: Props) {
  return items.map(...); // Error si items es undefined
}

// ✅ Correcto
interface Props {
  items?: Item[];
  onSearch?: (text: string) => void;
}

export default function MyComponent({
  items = [],
  onSearch = () => {},
}: Props) {
  return items.map(...);
}
```

---

## 🟡 Advertencias (Warnings)

### Warning: "Each child in a list should have a key prop"

**Causa**: Arrays sin keys únicas.

**Solución**:
```typescript
// ❌ Incorrecto
items.map((item) => <div>{item.name}</div>)

// ✅ Correcto
items.map((item) => <div key={item.id}>{item.name}</div>)

// ✅ Si no tienes id, usa índice (NO RECOMENDADO)
items.map((item, index) => <div key={index}>{item.name}</div>)
```

---

### Warning: "React Hook ... is not called at the top level"

**Causa**: Hooks llamados condicionalmente o dentro de funciones.

**Solución**:
```typescript
// ❌ Incorrecto
if (condition) {
  useState(0); // Malo
}

// ✅ Correcto
const [value, setValue] = useState(0); // Arriba
if (condition) {
  // Usar value/setValue aquí
}
```

---

## 🔵 Problemas de Funcionalidad

### Búsqueda no funciona

**Checklist**:
1. ✅ ¿El store implementa searchText en options?
   ```typescript
   getPaginatedItems(page, size, { searchText: 'algo' })
   ```

2. ✅ ¿Se llama loadData al cambiar el texto?
   ```typescript
   <MasterDataTable
     onSearch={(text) => loadData(1, text)} // ← Necesario
   />
   ```

3. ✅ ¿El store filtra correctamente?
   ```typescript
   const search = options?.searchText?.toLowerCase() || '';
   filtered.filter(item =>
     item.name.toLowerCase().includes(search) ||
     item.code.toLowerCase().includes(search)
   )
   ```

4. ✅ ¿Hay datos en el store?
   ```typescript
   // En consola DevTools
   myStore.getPaginatedItems(1, 10, { searchText: 'test' })
   ```

---

### Paginación no funciona

**Checklist**:
1. ✅ ¿MasterDataTable recibe totalPages?
   ```typescript
   <MasterDataTable
     totalPages={totalPages} // ← Necesario
     currentPage={currentPage}
   />
   ```

2. ✅ ¿Se actualiza el estado al cambiar página?
   ```typescript
   onPageChange={(page) => loadData(page, searchText)}
   ```

3. ✅ ¿El store retorna el total correcto?
   ```typescript
   return {
     data,
     total: filtered.length, // ← Correcto
     pages: Math.ceil(filtered.length / size),
   };
   ```

---

### Modal no se cierra

**Checklist**:
1. ✅ ¿onSuccess() llama a onHide()?
   ```typescript
   onSuccess={() => {
     setShowModal(false); // ← Necesario
     loadData();
   }}
   ```

2. ✅ ¿El botón cerrar tiene onClick?
   ```typescript
   <Button variant="secondary" onClick={onHide}>
     Cancelar
   </Button>
   ```

3. ✅ ¿El estado del modal está correcto?
   ```typescript
   <Modal show={showModal} onHide={() => setShowModal(false)}>
     {/* ... */}
   </Modal>
   ```

---

### Los datos no se guardan

**Checklist**:
1. ✅ ¿El store usa localStorage?
   ```typescript
   class Store {
     private items: Item[] = this.loadFromStorage();
     
     private loadFromStorage() {
       return JSON.parse(localStorage.getItem('items') || '[]');
     }
     
     private saveToStorage() {
       localStorage.setItem('items', JSON.stringify(this.items));
     }
     
     create(input: CreateInput): Item {
       const item = { ...input, id: Date.now().toString() };
       this.items.push(item);
       this.saveToStorage(); // ← IMPORTANTE
       return item;
     }
   }
   ```

2. ✅ ¿Se llama saveToStorage en create/update/delete?

3. ✅ ¿El formato JSON es válido?
   ```typescript
   // En consola DevTools
   JSON.parse(localStorage.getItem('items'))
   ```

---

## 📚 Debugging Avanzado

### Verificar estado del componente

```typescript
import { useEffect, useState } from 'react';

export default function DebugComponent() {
  const [state, setState] = useState(null);

  useEffect(() => {
    console.log('Estado actual:', state);
    console.log('Timestamp:', new Date().toISOString());
  }, [state]);

  return <div>{/* ... */}</div>;
}
```

### Verificar props recibidas

```typescript
interface Props {
  items: Item[];
  onSearch: (text: string) => void;
}

export default function MyComponent(props: Props) {
  console.log('Props recibidas:', props);
  const { items, onSearch } = props;
  return <div>{/* ... */}</div>;
}
```

### Verificar store data

```typescript
// En consola del navegador (F12)
import { myStore } from '@/lib/myStore';

// Ver todos los items
console.log(myStore.getAll());

// Ver paginado
console.log(myStore.getPaginatedItems(1, 10));

// Ver con búsqueda
console.log(myStore.getPaginatedItems(1, 10, { searchText: 'test' }));

// Ver localStorage directo
console.log(JSON.parse(localStorage.getItem('items')));
```

### React DevTools

1. Instala **React Developer Tools** en Chrome/Firefox
2. Abre DevTools (F12)
3. Abre pestaña **Components**
4. Inspecciona componentes y sus props/state
5. Modifica state en tiempo real para testear

---

## 🟢 Mejores Prácticas

### 1. Siempre Valida Datos

```typescript
// ❌ Malo
const item = JSON.parse(data);

// ✅ Bueno
try {
  const item = JSON.parse(data);
  if (!item.id || !item.name) throw new Error('Datos inválidos');
} catch (error) {
  console.error('Error validando:', error);
  // Mostrar error al usuario
}
```

### 2. Maneja Estados de Carga

```typescript
// ✅ Bueno
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState(null);

const loadData = async () => {
  setLoading(true);
  setError(null);
  try {
    const result = await fetchData();
    setData(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 3. Limpia Efectos

```typescript
// ❌ Malo
useEffect(() => {
  const timer = setInterval(() => loadData(), 5000);
  // No hay cleanup
}, []);

// ✅ Bueno
useEffect(() => {
  const timer = setInterval(() => loadData(), 5000);
  return () => clearInterval(timer); // Cleanup
}, []);
```

### 4. Evita Renderizados Innecesarios

```typescript
// ✅ Bueno: Usar useCallback para funciones
const handleSearch = useCallback((text: string) => {
  loadData(1, text);
}, []);

// ✅ Bueno: Memoizar componentes si es necesario
const MemoChild = memo(ChildComponent);
```

---

## 🤔 Preguntas Frecuentes

### P: ¿Cómo agrego una nueva propiedad a un modelo?

**R:**
1. Actualiza el tipo en `src/types/myentity.ts`
2. Actualiza el store si necesita filtrar/buscar
3. Actualiza el formulario en el modal
4. Actualiza la tabla (columnas)
5. Migra datos en localStorage (si es necesario)

---

### P: ¿Cómo conecto con una API real?

**R:**
En lugar de localStorage, usa fetch en el store:

```typescript
async getPaginatedItems(page: number, size: number = 10) {
  const response = await fetch(
    `/api/items?page=${page}&size=${size}`
  );
  return response.json();
}
```

---

### P: ¿Cómo agriendo autenticación real?

**R:**
Ya existe `AuthContext`. Revisa `/src/contexts/AuthContext.tsx` y actualiza con tu proveedor de autenticación (Auth0, Firebase, etc.).

---

### P: ¿Cómo hago que el sitio sea responsivo?

**R:**
React Bootstrap ya incluye Bootstrap, que es responsivo por defecto:

```typescript
<Container>
  <Row className="g-4">
    <Col xs={12} md={6} lg={4}>
      {/* Contenido */}
    </Col>
  </Row>
</Container>
```

---

### P: ¿Cómo agrego tests?

**R:**
Próximamente se documentará en un archivo `TESTING.md`. Por ahora, revisa la estructura sugerida en `CONTRIBUTING.md`.

---

### P: ¿Dónde coloco mis estilos personalizados?

**R:**
- Usa clases de Bootstrap: `className="mb-3 text-danger"`
- Para estilos adicionales: crea `src/app/custom.css` e importa en `layout.tsx`
- Evita estilos inline cuando sea posible

---

### P: ¿Cómo debugo un componente que no renderiza?

**R:**
1. Abre DevTools (F12)
2. Abre pestaña **Elements** y busca tu componente
3. Si no está: revisa que su padre lo renderice
4. Si está pero está oculto: revisa `display: none` o `visibility: hidden`
5. Usa `console.log()` para ver si la lógica se ejecuta

---

### P: ¿Cómo hago que los modales se vean mejor?

**R:**
```typescript
<Modal show={show} onHide={onHide} centered>
  <Modal.Header closeButton>
    <Modal.Title>Título</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Contenido */}
  </Modal.Body>
  <Modal.Footer>
    {/* Botones */}
  </Modal.Footer>
</Modal>
```

---

## 📞 Soporte

Si encuentras un problema no listado aquí:

1. ✅ Revisa los archivos de documentación
2. ✅ Busca en los logs de la consola del navegador (F12)
3. ✅ Revisa ejemplos existentes (CoursesPage, LevelsPage)
4. ✅ Abre un issue en el repositorio

---

**Última actualización**: 2025-11-01

¿Necesitas más ayuda? Revisa [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) o [CONTRIBUTING.md](./CONTRIBUTING.md)
