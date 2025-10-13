"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {
  createSubject,
  createUnit,
  createTopic,
  getAllSubjects,
  getAllUnits,
} from '@/lib/taxonomyStore';
import { TaxonomyType, ValidationError, Subject, Unit } from '@/types/taxonomy';

interface CreateTaxonomyModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export default function CreateTaxonomyModal({ show, onHide, onSuccess }: CreateTaxonomyModalProps) {
  const [taxonomyType, setTaxonomyType] = useState<TaxonomyType>('subject');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    subject_fk: '',
    unit_fk: '',
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

  // Load subjects and units when modal opens
  useEffect(() => {
    if (show) {
      setSubjects(getAllSubjects());
      setUnits(getAllUnits());
    }
  }, [show]);

  // Reset form when modal is closed or opened
  const resetForm = () => {
    setTaxonomyType('subject');
    setFormData({ name: '', code: '', subject_fk: '', unit_fk: '' });
    setErrors([]);
    setSuccessMessage(null);
  };

  // Reset when modal visibility changes
  const handleHide = () => {
    resetForm();
    onHide();
  };

  const handleTypeChange = (type: TaxonomyType) => {
    setTaxonomyType(type);
    setFormData({ name: '', code: '', subject_fk: '', unit_fk: '' });
    setErrors([]);
    setSuccessMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);

    const userId = 'admin@example.com'; // Mock user ID

    let result;

    if (taxonomyType === 'subject') {
      result = createSubject({ name: formData.name, code: formData.code }, userId);
    } else if (taxonomyType === 'unit') {
      result = createUnit({ name: formData.name, subject_fk: formData.subject_fk }, userId);
    } else {
      result = createTopic({ name: formData.name, unit_fk: formData.unit_fk }, userId);
    }

    if (result.success) {
      setSuccessMessage(`✅ ${getTaxonomyLabel(taxonomyType)} creado exitosamente: "${formData.name}"`);
      setTimeout(() => {
        onSuccess();
        handleHide();
      }, 1500);
    } else {
      setErrors(result.errors || []);
    }
  };

  const getTaxonomyLabel = (type: TaxonomyType): string => {
    switch (type) {
      case 'subject':
        return 'Asignatura';
      case 'unit':
        return 'Unidad';
      case 'topic':
        return 'Tema';
    }
  };

  const getErrorForField = (field: string): string | null => {
    const error = errors.find((e) => e.field === field);
    return error ? error.message : null;
  };

  return (
    <Modal show={show} onHide={handleHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Crear Elemento de Taxonomía Curricular</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Type Selector */}
        <Form.Group className="mb-4">
          <Form.Label>
            <strong>1. Selecciona el tipo de elemento:</strong>
          </Form.Label>
          <div className="d-flex gap-2">
            <Button
              variant={taxonomyType === 'subject' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeChange('subject')}
            >
              Asignatura
            </Button>
            <Button
              variant={taxonomyType === 'unit' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeChange('unit')}
            >
              Unidad
            </Button>
            <Button
              variant={taxonomyType === 'topic' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeChange('topic')}
            >
              Tema
            </Button>
          </div>
        </Form.Group>

        {/* Success Message */}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        {/* Error Messages */}
        {errors.length > 0 && (
          <Alert variant="danger">
            <strong>❌ Errores de validación:</strong>
            <ul className="mb-0 mt-2">
              {errors.map((error, idx) => (
                <li key={idx}>{error.message}</li>
              ))}
            </ul>
          </Alert>
        )}

        {/* Form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>2. Completa la información:</strong>
            </Form.Label>
          </Form.Group>

          {/* SUBJECT FORM */}
          {taxonomyType === 'subject' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de la Asignatura *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Matemáticas"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  isInvalid={!!getErrorForField('name')}
                />
                <Form.Control.Feedback type="invalid">{getErrorForField('name')}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Código Único *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: MAT-101"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  isInvalid={!!getErrorForField('code')}
                />
                <Form.Control.Feedback type="invalid">{getErrorForField('code')}</Form.Control.Feedback>
                <Form.Text>El código debe ser único globalmente.</Form.Text>
              </Form.Group>
            </>
          )}

          {/* UNIT FORM */}
          {taxonomyType === 'unit' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Asignatura Padre *</Form.Label>
                <Form.Select
                  value={formData.subject_fk}
                  onChange={(e) => setFormData({ ...formData, subject_fk: e.target.value })}
                  isInvalid={!!getErrorForField('subject_fk')}
                >
                  <option value="">-- Selecciona una asignatura --</option>
                  {subjects.map((subject) => (
                    <option key={subject.subject_id} value={subject.subject_id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{getErrorForField('subject_fk')}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nombre de la Unidad *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Álgebra Básica"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  isInvalid={!!getErrorForField('name')}
                />
                <Form.Control.Feedback type="invalid">{getErrorForField('name')}</Form.Control.Feedback>
                <Form.Text>El nombre debe ser único dentro de la asignatura seleccionada.</Form.Text>
              </Form.Group>
            </>
          )}

          {/* TOPIC FORM */}
          {taxonomyType === 'topic' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Unidad Padre *</Form.Label>
                <Form.Select
                  value={formData.unit_fk}
                  onChange={(e) => setFormData({ ...formData, unit_fk: e.target.value })}
                  isInvalid={!!getErrorForField('unit_fk')}
                >
                  <option value="">-- Selecciona una unidad --</option>
                  {units.map((unit) => {
                    const parentSubject = subjects.find((s) => s.subject_id === unit.subject_fk);
                    return (
                      <option key={unit.unit_id} value={unit.unit_id}>
                        {unit.name} (de {parentSubject?.name || 'N/A'})
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{getErrorForField('unit_fk')}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nombre del Tema *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Ecuaciones lineales"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  isInvalid={!!getErrorForField('name')}
                />
                <Form.Control.Feedback type="invalid">{getErrorForField('name')}</Form.Control.Feedback>
                <Form.Text>El nombre debe ser único dentro de la unidad seleccionada.</Form.Text>
              </Form.Group>
            </>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={handleHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              💾 Guardar {getTaxonomyLabel(taxonomyType)}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
