import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';

interface EducationalLevel {
  id: string;
  name: string;
  code: string;
}

interface CurriculumHierarchySearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  resultsCount: number;
  educationalLevels?: EducationalLevel[];
  selectedLevelId?: string;
  onLevelChange?: (levelId: string) => void;
}

export function CurriculumHierarchySearchBar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  resultsCount,
  educationalLevels = [],
  selectedLevelId = '',
  onLevelChange,
}: CurriculumHierarchySearchBarProps) {
  const hasFilters = searchTerm || selectedLevelId;
  
  const handleClearAll = () => {
    onClearSearch();
    if (onLevelChange) {
      onLevelChange('');
    }
  };

  return (
    <>
      <Row className="g-2">
        <Col md={6}>
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
          </InputGroup>
        </Col>
        <Col md={4}>
          <InputGroup size="lg">
            <InputGroup.Text>
              <span>🎓</span>
            </InputGroup.Text>
            <Form.Select
              value={selectedLevelId}
              onChange={(e) => onLevelChange?.(e.target.value)}
              aria-label="Filtrar por nivel educacional"
            >
              <option value="">Todos los niveles</option>
              {educationalLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
        <Col md={2}>
          {hasFilters && (
            <Button 
              variant="outline-secondary" 
              size="lg" 
              onClick={handleClearAll}
              className="w-100"
            >
              ✕ Limpiar
            </Button>
          )}
        </Col>
      </Row>
      {hasFilters && (
        <small className="text-muted d-block mt-2">
          {resultsCount === 0
            ? '❌ No se encontraron resultados'
            : `✓ ${resultsCount} asignatura(s) encontrada(s)`}
        </small>
      )}
    </>
  );
}
