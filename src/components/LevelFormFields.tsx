'use client';

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { levelStore } from '@/lib/levelStore';
import AutocompleteSelect, { AutocompleteOption } from '@/components/AutocompleteSelect';

export interface LevelFormData {
  name: string;
  code: string;
  description: string;
  categoryId: number | '';
  isActive: boolean;
}

interface LevelFormFieldsProps {
  formData: LevelFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSwitchChange: (isActive: boolean) => void;
}

export default function LevelFormFields({
  formData,
  onChange,
  onSwitchChange,
}: LevelFormFieldsProps) {
  const [categoryOptions, setCategoryOptions] = useState<AutocompleteOption[]>([]);

  useEffect(() => {
    const cats = levelStore.getAllCategories();
    
    const opts: AutocompleteOption[] = cats.map((cat) => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
    }));
    setCategoryOptions(opts);
  }, []);

  const handleCategoryChange = (value: string | number) => {
    // Create a synthetic event for consistency with other onChange handlers
    const syntheticEvent = {
      target: {
        name: 'categoryId',
        value: String(value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(syntheticEvent);
  };

  return (
    <>
      {/* Categoría Padre - Autocompletable */}
      <AutocompleteSelect
        value={formData.categoryId}
        onChange={handleCategoryChange}
        options={categoryOptions}
        label="Categoría"
        required
        placeholder="Escribe para buscar o selecciona una categoría..."
      />
      <Form.Text className="text-muted d-block mb-3">
        La categoría define el grupo al que pertenece este nivel
      </Form.Text>

      {/* Nombre */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">
          Nombre del Nivel <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Ej: 1° Básico, 1° Medio, etc."
          value={formData.name}
          onChange={onChange}
          required
        />
        <Form.Text className="text-muted">
          Nombre descriptivo del nivel educacional
        </Form.Text>
      </Form.Group>

      {/* Código */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">
          Código del Nivel <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="code"
          placeholder="Ej: LEVEL_1B, LEVEL_1M, etc."
          value={formData.code}
          onChange={onChange}
          required
        />
        <Form.Text className="text-muted">
          Código único para identificar el nivel (sin espacios)
        </Form.Text>
      </Form.Group>

      {/* Descripción */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={3}
          placeholder="Describe el propósito y características de este nivel"
          value={formData.description}
          onChange={onChange}
        />
        <Form.Text className="text-muted">
          Descripción opcional del nivel
        </Form.Text>
      </Form.Group>

      {/* Estado Activo */}
      <Form.Group className="mb-4">
        <Form.Switch
          checked={formData.isActive}
          onChange={(e) => onSwitchChange(e.target.checked)}
          id="isActive"
          label="Nivel Activo"
        />
        <Form.Text className="text-muted d-block mt-2">
          Marca esta opción para activar el nivel inmediatamente
        </Form.Text>
      </Form.Group>
    </>
  );
}
