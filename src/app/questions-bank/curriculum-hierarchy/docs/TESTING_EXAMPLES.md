# Testing Examples

## Hook Testing

### useTaxonomyData
```typescript
import { renderHook, act } from '@testing-library/react';
import { useTaxonomyData } from './hooks/useTaxonomyData';

describe('useTaxonomyData', () => {
  it('loads subjects on mount', () => {
    const { result } = renderHook(() => useTaxonomyData());
    expect(result.current.subjects).toBeDefined();
  });

  it('updates search term', () => {
    const { result } = renderHook(() => useTaxonomyData());
    act(() => result.current.setSearchTerm('test'));
    expect(result.current.searchTerm).toBe('test');
  });
});
```

### useTaxonomyModals
```typescript
describe('useTaxonomyModals', () => {
  it('handles edit correctly', () => {
    const { result } = renderHook(() => useTaxonomyModals());
    
    act(() => result.current.handleEdit('subject', 'id-1'));
    expect(result.current.showEditModal).toBe(true);
    expect(result.current.editElement).toEqual({
      type: 'subject',
      id: 'id-1'
    });
  });
});
```

## Component Testing

### TaxonomyHeader
```typescript
import { render, screen } from '@testing-library/react';
import { TaxonomyHeader } from './components/TaxonomyHeader';

describe('TaxonomyHeader', () => {
  it('renders title', () => {
    render(<TaxonomyHeader />);
    expect(screen.getByText('Taxonomía Curricular')).toBeInTheDocument();
  });
});
```

### TaxonomySearchBar
```typescript
describe('TaxonomySearchBar', () => {
  it('calls onSearchChange on input', async () => {
    const onSearchChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TaxonomySearchBar
        searchTerm=""
        onSearchChange={onSearchChange}
        onClearSearch={() => {}}
        resultsCount={0}
      />
    );
    
    const input = getByPlaceholderText('Buscar por asignatura...');
    await userEvent.type(input, 'math');
    expect(onSearchChange).toHaveBeenCalledWith('math');
  });
});
```

## Tips

- Use `renderHook` para aislar hooks
- Use `act()` para actualizar estado
- Mock funciones de store en `beforeEach()`
- Mantén tests pequeños y enfocados
