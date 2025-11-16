"use client";

import { Form, Row, Col } from 'react-bootstrap';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import { LevelCategory, EducationalLevel } from '@/types/level';

interface SubjectFormProps {
  name: string;
  code: string;
  category_fk: string;
  level_fk: string;
  categories: LevelCategory[];
  filteredLevels: EducationalLevel[];
  onNameChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  getError: (field: string) => string | undefined;
}

export default function SubjectForm({
  name,
  code,
  category_fk,
  level_fk,
  categories,
  filteredLevels,
  onNameChange,
  onCodeChange,
  onCategoryChange,
  onLevelChange,
  getError,
}: SubjectFormProps) {
  return (
    <>
      <Row className="g-2 mb-0">
        <Col md={6}>
            <AutocompleteSelect
            label='Categoría de Nivel'
              value={category_fk}
              onChange={(value) => onCategoryChange(String(value))}
              options={categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                description: cat.description
              }))}
              placeholder="Busca una categoría..."
              isInvalid={!!getError('category_fk')}
              errorMessage={getError('category_fk')}
              warningMessage={categories.length === 0 ? "⚠️ No hay categorías disponibles. Crea una categoría primero." : undefined}
              required
            />
        </Col>
        <Col md={6}>
            <AutocompleteSelect
            label='Nivel Educacional'
              value={level_fk}
              onChange={(value) => onLevelChange(String(value))}
              options={filteredLevels.map(level => ({
                id: level.id,
                name: level.name,
                description: level.description
              }))}
              placeholder={category_fk ? "Busca un nivel..." : "Selecciona categoría primero"}
              disabled={!category_fk}
              isInvalid={!!getError('level_fk')}
              errorMessage={getError('level_fk')}
              warningMessage={category_fk && filteredLevels.length === 0 ? "⚠️ No hay niveles disponibles para esta categoría. Selecciona otra categoría." : undefined}
              required
            />
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Nombre de la Asignatura <span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Matemáticas"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          isInvalid={!!getError('name')}
        />
        <Form.Control.Feedback type="invalid">{getError('name')}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Código Único <span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: MAT-101"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          isInvalid={!!getError('code')}
        />
        <Form.Control.Feedback type="invalid">{getError('code')}</Form.Control.Feedback>
        <Form.Text>El código debe ser único globalmente (ej: MAT-101, ESP-202)</Form.Text>
      </Form.Group>
    </>
  );
}
