import { Form, InputGroup, Button } from 'react-bootstrap';

interface TaxonomySearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  resultsCount: number;
}

export function TaxonomySearchBar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  resultsCount,
}: TaxonomySearchBarProps) {
  return (
    <>
      <InputGroup size="lg">
        <InputGroup.Text>
          <span>🔍</span>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Buscar por asignatura, unidad o tema..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <Button variant="outline-secondary" onClick={onClearSearch}>
            ✕ Limpiar
          </Button>
        )}
      </InputGroup>
      {searchTerm && (
        <small className="text-muted d-block mt-1">
          {resultsCount === 0
            ? '❌ No se encontraron resultados'
            : `✓ ${resultsCount} asignatura(s) encontrada(s)`}
        </small>
      )}
    </>
  );
}
