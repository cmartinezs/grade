'use client';

import React from 'react';
import { Form } from 'react-bootstrap';

export interface CategoryFormData {
  name: string;
  code: string;
  description: string;
  isActive: boolean;
}

interface CategoryFormFieldsProps {
  formData: CategoryFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (isActive: boolean) => void;
}

export default function CategoryFormFields({
  formData,
  onChange,
  onSwitchChange,
}: CategoryFormFieldsProps) {
  return (
    <>
      {/* Nombre */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">
          Nombre de la Categoría <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Ej: Educación Primaria"
          value={formData.name}
          onChange={onChange}
          required
        />
        <Form.Text className="text-muted">
          Nombre descriptivo de la categoría
        </Form.Text>
      </Form.Group>

      {/* Código */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">
          Código de la Categoría <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="code"
          placeholder="Ej: PRIM, SEC"
          value={formData.code}
          onChange={onChange}
          required
        />
        <Form.Text className="text-muted">
          Código único para identificar la categoría
        </Form.Text>
      </Form.Group>

      {/* Descripción */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={3}
          placeholder="Describe la categoría y su propósito"
          value={formData.description}
          onChange={onChange}
        />
        <Form.Text className="text-muted">
          Descripción detallada de la categoría
        </Form.Text>
      </Form.Group>

      {/* Estado Activo */}
      <Form.Group className="mb-4">
        <Form.Switch
          checked={formData.isActive}
          onChange={(e) => onSwitchChange(e.target.checked)}
          id="isActive"
          label="Categoría Activa"
        />
        <Form.Text className="text-muted d-block mt-2">
          Marca para activar la categoría
        </Form.Text>
      </Form.Group>
    </>
  );
}
