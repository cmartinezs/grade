# Help Component Standardization - Question Creation

## Objective
Replace the static info Card in `/questions-bank/create` with the **generic help sidebar** using HelpContext, following the same pattern used in curriculum hierarchy management (`/questions-bank/curriculum-hierarchy`).

## Changes Made

### 1. Created New Help Component
**File:** `/src/app/questions-bank/create/QuestionCreateHelp.tsx`

- **Pattern:** Presentational component for HelpContext sidebar (same as `CurriculumHierarchyHelp`)
- **Type:** Pure component returning JSX content
- **No Props:** Self-contained, stateless component

**Content Sections:**
1. **📋 Datos Requeridos** - Detailed explanation of all required fields:
   - Tipo de Pregunta
   - Enunciado
   - Jerarquía Curricular (Asignatura → Unidad → Tema)
   - Dificultad
   - Taxonomía de Bloom
   - Opciones de Respuesta

2. **💡 Consejos de Creación** - Best practices:
   - Claridad en enunciados
   - Revisión gramatical
   - Coherencia en alternativas
   - Verificación de respuestas correctas
   - Selección de jerarquía específica
   - Advertencia sobre duplicados

3. **✨ Alert Info** - Duplicate detection feature explanation

### 2. Updated Create Page
**File:** `/src/app/questions-bank/create/page.tsx`

**Changes:**
- Added import: `import { useHelpContent } from '@/contexts/HelpContext';`
- Added import: `import { QuestionCreateHelp } from './QuestionCreateHelp';`
- Added hook: `const { setHelpContent } = useHelpContent();`
- Added useEffect to set help content on mount:
  ```tsx
  useEffect(() => {
    setHelpContent({
      title: '➕ Nueva Pregunta',
      children: <QuestionCreateHelp />,
    });
    return () => setHelpContent(null);
  }, [setHelpContent]);
  ```
- Removed entire left column (4/12) with static Card
- Changed form column from `<Col lg={8}>` to `<Col>` (full width)

**Before (Old Structure):**
- Two-column layout (4/12 info + 8/12 form)
- Static Card with blue border and header
- Fixed height with `h-100`
- Non-collapsible content in page
- ~60 lines of inline JSX

**After (New Structure):**
- Single column layout (full width form)
- Help content in generic sidebar (controlled by HelpContext)
- Dynamic help panel (can be shown/hidden)
- Consistent with curriculum hierarchy pattern
- Clean page component (~10 lines for help setup)

## Benefits

### 1. **UI Consistency**
- Follows the **exact same HelpContext pattern** as curriculum hierarchy management
- Centralized help system across the application
- Same visual style and interaction pattern (generic sidebar)

### 2. **Better UX**
- **More space for the form** - Full width instead of 8/12 columns
- Help panel can be toggled on/off by the user
- Sidebar doesn't interfere with main content
- Users can focus on the form when they don't need help

### 3. **Maintainability**
- Help content isolated in dedicated presentational component
- Uses centralized HelpContext system
- Easier to update and maintain
- Can be reused or extended easily

### 4. **Architecture**
- **Separation of concerns:** Page handles logic, help component handles presentation
- **Context-based:** Uses React Context API for state management
- **Lifecycle management:** Help content cleaned up on unmount
- **Consistent pattern:** Same as other pages in the app

### 5. **Content Improvements**
- More detailed explanations for each field
- Organized sections with clear icons (📋, 💡, ✨)
- Enhanced tips and best practices
- Better formatting with spacing and structure

## Technical Details

### Component Type
- **Pure Presentational Component:** Returns JSX content only
- **No Props:** Self-contained, stateless
- **Export:** Named export `QuestionCreateHelp`

### HelpContext Integration
```tsx
// 1. Import the context hook
import { useHelpContent } from '@/contexts/HelpContext';

// 2. Get the setter
const { setHelpContent } = useHelpContent();

// 3. Set help content on mount
useEffect(() => {
  setHelpContent({
    title: '➕ Nueva Pregunta',
    children: <QuestionCreateHelp />,
  });
  return () => setHelpContent(null);
}, [setHelpContent]);
```

### Layout Changes
- **Before:** Two columns (4/12 + 8/12)
- **After:** Single column (full width)
- **Sidebar:** Managed by main layout (not in page)

### Styling
- Uses react-bootstrap components (Alert, headings)
- Consistent with existing design system
- Responsive layout maintained
- Help content styled by sidebar container

## Testing Checklist
- [ ] Component renders without errors
- [ ] Accordion expands/collapses correctly
- [ ] Content is readable and well-formatted
- [ ] Layout remains responsive on different screen sizes
- [ ] No TypeScript/ESLint errors
- [ ] Visual consistency with curriculum hierarchy help

## Files Modified
1. ✅ `/src/app/questions-bank/create/QuestionCreateHelp.tsx` (NEW)
2. ✅ `/src/app/questions-bank/create/page.tsx` (MODIFIED)
3. ✅ `/docs/HELP_COMPONENT_STANDARDIZATION.md` (UPDATED)

## Migration Pattern
This pattern can be applied to other pages needing contextual help:

### Step-by-Step Guide:
1. **Create Help Component:** `*Help.tsx` in same directory as page
   ```tsx
   export function YourPageHelp() {
     return (
       <>
         <p className="text-muted mb-3">Description...</p>
         <div className="mb-3">
           <h6 className="fw-bold mb-2">📋 Section Title</h6>
           {/* Content */}
         </div>
       </>
     );
   }
   ```

2. **Import HelpContext in Page:**
   ```tsx
   import { useHelpContent } from '@/contexts/HelpContext';
   import { YourPageHelp } from './YourPageHelp';
   ```

3. **Add useEffect:**
   ```tsx
   const { setHelpContent } = useHelpContent();
   
   useEffect(() => {
     setHelpContent({
       title: '📋 Your Page Title',
       children: <YourPageHelp />,
     });
     return () => setHelpContent(null);
   }, [setHelpContent]);
   ```

4. **Remove Local Help Components:**
   - Delete static Cards/Accordions with help
   - Expand form to full width if needed

## Related Components
- `/src/app/questions-bank/curriculum-hierarchy/page.tsx` - Reference implementation (list page)
- `/src/app/questions-bank/curriculum-hierarchy/CurriculumHierarchyHelp.tsx` - Help component example
- `/src/contexts/HelpContext.tsx` - Context definition
- Main layout component - Renders the help sidebar

## HelpContext System

### How It Works:
1. **Provider:** `<HelpProvider>` wraps the app (usually in main layout)
2. **State:** Context holds current help content (`title`, `children`, `header`, `footer`)
3. **Setter:** Pages call `setHelpContent()` to update sidebar
4. **Cleanup:** Return function clears help on unmount
5. **Rendering:** Main layout component reads context and displays in sidebar

### Advantages:
- ✅ **Centralized:** One sidebar for entire app
- ✅ **Dynamic:** Content changes per page automatically
- ✅ **Clean:** Pages only define content, not presentation
- ✅ **Consistent:** All help looks and behaves the same
- ✅ **Flexible:** Can show/hide, resize, or move sidebar

## Notes
- Help content is set when page mounts and cleared on unmount
- Users can toggle help sidebar visibility (if implemented in layout)
- All original content preserved and enhanced
- Form now has full width for better usability
- No functionality changes, only architectural improvement
