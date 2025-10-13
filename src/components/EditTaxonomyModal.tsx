"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {
  updateSubject,
  updateUnit,
  updateTopic,
  getAllSubjects,
  getAllUnits,
  getSubjectById,
  getUnitById,
  getTopicById,
} from '@/lib/taxonomyStore';
import { TaxonomyType, ValidationError, Subject, Unit } from '@/types/taxonomy';

interface EditTaxonomyModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  elementType: TaxonomyType;
  elementId: string;
}

export default function EditTaxonomyModal({
  show,
  onHide,
  onSuccess,
  elementType,
  elementId,
}: EditTaxonomyModalProps) {
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
  const [loading, setLoading] = useState(false);

  // Load data when modal opens
  useEffect(() => {
    if (show && elementId) {
      setLoading(true);
      setErrors([]);
      setSuccessMessage(null);

      // Load subjects and units
      setSubjects(getAllSubjects());
      setUnits(getAllUnits());

      // Load element data based on type
      if (elementType === 'subject') {
        const subject = getSubjectById(elementId);
        if (subject) {
          setFormData({
            name: subject.name,
            code: subject.code,
            subject_fk: '',
            unit_fk: '',
          });
        }
      } else if (elementType === 'unit') {
        const unit = getUnitById(elementId);
        if (unit) {
          setFormData({
            name: unit.name,
            code: '',
            subject_fk: unit.subject_fk,
            unit_fk: '',
          });
        }
      } else if (elementType === 'topic') {
        const topic = getTopicById(elementId);
        if (topic) {
          // Get the unit to find the subject
          const unit = getUnitById(topic.unit_fk);
          setFormData({
            name: topic.name,
            code: '',
            subject_fk: unit ? unit.subject_fk : '',
            unit_fk: topic.unit_fk,
          });
        }
      }

      setLoading(false);
    }
  }, [show, elementId, elementType]);

  const handleHide = () => {
    setFormData({ name: '', code: '', subject_fk: '', unit_fk: '' });
    setErrors([]);
    setSuccessMessage(null);
    onHide();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);

    const userId = 'admin@example.com'; // Mock user ID

    let result;

    if (elementType === 'subject') {
      result = updateSubject(elementId, { name: formData.name, code: formData.code }, userId);
    } else if (elementType === 'unit') {
      result = updateUnit(elementId, { name: formData.name, subject_fk: formData.subject_fk }, userId);
    } else {
      result = updateTopic(elementId, { name: formData.name, unit_fk: formData.unit_fk }, userId);
    }

    if (result.success) {
      setSuccessMessage(`✅ ${getTaxonomyLabel(elementType)} actualizado exitosamente: "${formData.name}"`);
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
        <Modal.Title>Editar {getTaxonomyLabel(elementType)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p className="text-muted">Cargando...</p>
        ) : (
          <>
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
              {/* SUBJECT FORM */}
              {elementType === 'subject' && (
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
              {elementType === 'unit' && (
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
                    <Form.Text className="text-warning">
                      ⚠️ Cambiar la asignatura padre mantendrá todos los temas asociados a esta unidad.
                    </Form.Text>
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
              {elementType === 'topic' && (
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
                        {formData.subject_fk
                          ? '-- Selecciona una unidad --'
                          : '-- Primero selecciona una asignatura --'}
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
                    <Form.Text className="text-warning">
                      ⚠️ Cambiar la unidad padre mantendrá todas las preguntas asociadas a este tema.
                    </Form.Text>
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
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  💾 Actualizar {getTaxonomyLabel(elementType)}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
