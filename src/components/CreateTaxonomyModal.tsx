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
import { useAuth } from '@/contexts/AuthContext';
import { TaxonomyType, ValidationError, Subject, Unit } from '@/types/taxonomy';

interface CreateTaxonomyModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export default function CreateTaxonomyModal({ show, onHide, onSuccess }: CreateTaxonomyModalProps) {
  const { user } = useAuth();
  const [taxonomyType, setTaxonomyType] = useState<TaxonomyType>('subject');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    subject_fk: '',
    unit_fk: '',
    description: '',
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
    setFormData({ name: '', code: '', subject_fk: '', unit_fk: '', description: '' });
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
    setFormData({ name: '', code: '', subject_fk: '', unit_fk: '', description: '' });
    setErrors([]);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);

    // Obtener userId del contexto de autenticación
    const userId = user?.id;
    
    if (!userId) {
      setErrors([{ field: 'general', message: 'Usuario no autenticado' }]);
      return;
    }

    try {
      if (taxonomyType === 'subject') {
        await createSubject(formData.name, formData.code, userId);
      } else if (taxonomyType === 'unit') {
        await createUnit(formData.name, formData.subject_fk, userId, formData.description);
      } else {
        await createTopic(formData.name, formData.unit_fk, userId);
      }

      setSuccessMessage(`✅ ${getTaxonomyLabel(taxonomyType)} creado exitosamente: "${formData.name}"`);
      setTimeout(() => {
        onSuccess();
        handleHide();
      }, 1500);
    } catch (error) {
      setErrors([
        {
          field: 'general',
          message: error instanceof Error ? error.message : 'Error desconocido'
        }
      ]);
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

  const getTaxonomyIcon = (type: TaxonomyType): string => {
    switch (type) {
      case 'subject':
        return '📚';
      case 'unit':
        return '📂';
      case 'topic':
        return '📄';
    }
  };

  const getErrorForField = (field: string): string | null => {
    const error = errors.find((e) => e.field === field);
    return error ? error.message : null;
  };

  return (
    <Modal show={show} onHide={handleHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.3rem' }}>{getTaxonomyIcon(taxonomyType)}</span>
            <span>Crear {getTaxonomyLabel(taxonomyType)}</span>
          </span>
        </Modal.Title>
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
              className="d-flex align-items-center gap-2"
            >
              <span style={{ fontSize: '1.2rem' }}>📚</span>
              <span>Asignatura</span>
            </Button>
            <Button
              variant={taxonomyType === 'unit' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeChange('unit')}
              className="d-flex align-items-center gap-2"
            >
              <span style={{ fontSize: '1.2rem' }}>📂</span>
              <span>Unidad</span>
            </Button>
            <Button
              variant={taxonomyType === 'topic' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeChange('topic')}
              className="d-flex align-items-center gap-2"
            >
              <span style={{ fontSize: '1.2rem' }}>📄</span>
              <span>Tema</span>
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

              <Form.Group className="mb-3">
                <Form.Label>Descripción (Opcional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Descripción de la unidad..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>
            </>
          )}

          {/* TOPIC FORM */}
          {taxonomyType === 'topic' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>1. Asignatura *</Form.Label>
                <Form.Select
                  value={formData.subject_fk}
                  onChange={(e) => {
                    setFormData({ ...formData, subject_fk: e.target.value, unit_fk: '' });
                  }}
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
                <Form.Label>2. Unidad Padre *</Form.Label>
                <Form.Select
                  value={formData.unit_fk}
                  onChange={(e) => setFormData({ ...formData, unit_fk: e.target.value })}
                  isInvalid={!!getErrorForField('unit_fk')}
                  disabled={!formData.subject_fk}
                >
                  <option value="">
                    {formData.subject_fk ? '-- Selecciona una unidad --' : '-- Primero selecciona una asignatura --'}
                  </option>
                  {units
                    .filter((unit) => unit.subject_fk === formData.subject_fk)
                    .map((unit) => (
                      <option key={unit.unit_id} value={unit.unit_id}>
                        {unit.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{getErrorForField('unit_fk')}</Form.Control.Feedback>
                {formData.subject_fk && units.filter((u) => u.subject_fk === formData.subject_fk).length === 0 && (
                  <Form.Text className="text-warning d-block mt-2">
                    ⚠️ No hay unidades disponibles para esta asignatura.{' '}
                    <a
                      href="#"
                      className="text-primary fw-bold"
                      onClick={(e) => {
                        e.preventDefault();
                        // Switch to Unit form with subject already selected
                        setTaxonomyType('unit');
                        setFormData({
                          ...formData,
                          name: '',
                          code: '',
                          unit_fk: '',
                        });
                        setErrors([]);
                      }}
                    >
                      Crear una unidad ahora →
                    </a>
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>3. Nombre del Tema *</Form.Label>
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
              ❌ Cancelar
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
