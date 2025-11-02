'use client';

import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { CHILEAN_EDUCATION_LEVELS } from '@/types/level';

export interface LevelFormData {
  name: string;
  code: string;
  description: string;
  isActive: boolean;
}

interface LevelFormFieldsProps {
  formData: LevelFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (isActive: boolean) => void;
  onSelectPredefined?: (levelName: string) => void;
  showPredefined?: boolean;
}

export default function LevelFormFields({
  formData,
  onChange,
  onSwitchChange,
  onSelectPredefined,
  showPredefined = true,
}: LevelFormFieldsProps) {
  return (
    <>
      {/* Selector de Niveles Predefinidos */}
      {showPredefined && onSelectPredefined && (
        <>
          <Form.Group className="mb-4 p-3 bg-light rounded">
            <Form.Label className="fw-bold mb-3">
              📚 Usar Nivel Predefinido (Chile)
            </Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {CHILEAN_EDUCATION_LEVELS.map((level) => (
                <Button
                  key={level.code}
                  variant="outline-info"
                  size="sm"
                  onClick={() => onSelectPredefined(level.name)}
                  className="mb-2"
                >
                  {level.name}
                </Button>
              ))}
            </div>
            <Form.Text className="text-muted d-block mt-2">
              Haz clic en un nivel para autocompletar el formulario
            </Form.Text>
          </Form.Group>

          <hr className="my-4" />
        </>
      )}

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
