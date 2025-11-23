# Implementación del Panel de Ayuda Genérico

## Resumen de Cambios

Se implementó el **sistema de ayuda genérico (HelpContext)** en la página de creación de preguntas, siguiendo el mismo patrón usado en `/questions-bank/curriculum-hierarchy`.

## Archivos Creados

### 1. `/src/app/questions-bank/create/QuestionCreateHelp.tsx`
Componente de presentación que contiene el contenido de ayuda:
- 📋 Datos Requeridos (tipo, enunciado, jerarquía, dificultad, taxonomía, opciones)
- 💡 Consejos de Creación (claridad, gramática, coherencia, verificación)
- ✨ Funciones Especiales (detección de duplicados, validación, opciones dinámicas)

## Archivos Modificados

### 2. `/src/app/questions-bank/create/page.tsx`
**Imports agregados:**
```tsx
import { useHelpContent } from '@/contexts/HelpContext';
import { QuestionCreateHelp } from './QuestionCreateHelp';
```

**Hook agregado:**
```tsx
const { setHelpContent } = useHelpContent();
```

**useEffect agregado:**
```tsx
useEffect(() => {
  setHelpContent({
    title: '➕ Nueva Pregunta',
    children: <QuestionCreateHelp />,
  });
  return () => setHelpContent(null);
}, [setHelpContent]);
```

**Layout simplificado:**
- **Antes:** Dos columnas (4/12 con Card de info + 8/12 con formulario)
- **Después:** Una columna full-width con formulario
- **Ayuda:** Ahora aparece en el sidebar genérico de la aplicación

## Beneficios

### ✅ Consistencia
- Sigue el mismo patrón que curriculum hierarchy
- Usa el sistema centralizado de ayuda (HelpContext)
- Experiencia de usuario unificada

### ✅ Mejor UX
- **Más espacio para el formulario:** Full-width en vez de 8/12
- Sidebar de ayuda puede mostrarse/ocultarse
- No interfiere con el contenido principal
- Usuario controla la visibilidad

### ✅ Arquitectura
- **Separación de responsabilidades:** Página = lógica, Help = presentación
- **Context API:** Estado centralizado
- **Lifecycle management:** Limpieza automática al desmontar
- **Reutilizable:** Patrón aplicable a otras páginas

## Patrón de Implementación

Para aplicar este patrón a otras páginas:

```tsx
// 1. Crear componente Help
export function YourPageHelp() {
  return (
    <>
      <p className="text-muted mb-3">Descripción...</p>
      {/* Contenido estructurado */}
    </>
  );
}

// 2. En la página
import { useHelpContent } from '@/contexts/HelpContext';
import { YourPageHelp } from './YourPageHelp';

export default function YourPage() {
  const { setHelpContent } = useHelpContent();
  
  useEffect(() => {
    setHelpContent({
      title: 'Título',
      children: <YourPageHelp />,
    });
    return () => setHelpContent(null);
  }, [setHelpContent]);
  
  // resto de la página...
}
```

## Testing

- [x] Sin errores TypeScript/ESLint
- [x] Layout responsive mantenido
- [x] Contenido de ayuda completo y claro
- [x] Limpieza correcta al desmontar
- [ ] Verificar que el sidebar muestre el contenido correctamente (testing manual)
- [ ] Verificar que el formulario use el espacio completo (testing manual)

## Referencias

- `/src/app/questions-bank/curriculum-hierarchy/page.tsx` - Implementación de referencia
- `/src/app/questions-bank/curriculum-hierarchy/CurriculumHierarchyHelp.tsx` - Ejemplo de componente Help
- `/src/contexts/HelpContext.tsx` - Definición del contexto
- `/docs/HELP_COMPONENT_STANDARDIZATION.md` - Documentación completa
