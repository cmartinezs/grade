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
} from '@/lib/curriculumHierarchyStore';
import { useAuth } from '@/contexts/AuthContext';
import { CurriculumHierarchyType, ValidationError, Subject, Unit } from '@/types/curriculumHierarchy';

interface EditCurriculumHierarchyModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  elementType: CurriculumHierarchyType;
  elementId: string;
}

export default function EditCurriculumHierarchyModal({
  show,
  onHide,
  onSuccess,
  elementType,
  elementId,
}: EditCurriculumHierarchyModalProps) {
  const { user } = useAuth();
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
            description: '',
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
            description: unit.description || '',
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
            description: '',
          });
        }
      }

      setLoading(false);
    }
  }, [show, elementId, elementType]);

  const handleHide = () => {
    setFormData({ name: '', code: '', subject_fk: '', unit_fk: '', description: '' });
    setErrors([]);
    setSuccessMessage(null);
    onHide();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);

    try {
      // Obtener userId del contexto de autenticación
      const userId = user?.id;
      
      if (!userId) {
        setErrors([{ field: 'general', message: 'Usuario no autenticado' }]);
        return;
      }

      if (elementType === 'subject') {
        await updateSubject(elementId, { name: formData.name, code: formData.code }, userId);
      } else if (elementType === 'unit') {
        await updateUnit(
          elementId,
          { name: formData.name, subject_fk: formData.subject_fk, description: formData.description },
          userId,
          formData.subject_fk
        );
      } else {
        await updateTopic(
          elementId,
          { name: formData.name, unit_fk: formData.unit_fk },
          userId,
          formData.unit_fk
        );
      }

      setSuccessMessage(`✅ ${getCurriculumHierarchyLabel(elementType)} actualizado exitosamente: "${formData.name}"`);
      setTimeout(() => {
        onSuccess();
        handleHide();
      }, 1500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error updating CurriculumHierarchy:', error);
      setErrors([
        {
          field: 'general',
          message: errorMessage
        }
      ]);
    }
  };

  const getCurriculumHierarchyLabel = (type: CurriculumHierarchyType): string => {
    switch (type) {
      case 'subject':
        return 'Asignatura';
      case 'unit':
        return 'Unidad';
      case 'topic':
        return 'Tema';
    }
  };

  const getCurriculumHierarchyIcon = (type: CurriculumHierarchyType): string => {
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
            <span style={{ fontSize: '1.3rem' }}>{getCurriculumHierarchyIcon(elementType)}</span>
            <span>Editar {getCurriculumHierarchyLabel(elementType)}</span>
          </span>
        </Modal.Title>
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
                  ❌ Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  💾 Actualizar {getCurriculumHierarchyLabel(elementType)}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
