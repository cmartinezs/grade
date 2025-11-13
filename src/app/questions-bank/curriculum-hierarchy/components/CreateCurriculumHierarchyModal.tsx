"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import {
  createSubject,
  createUnit,
  createTopic,
  getAllSubjects,
  getAllUnits,
} from '@/lib/curriculumHierarchyStore';
import { levelCategoryStore, educationalLevelStore } from '@/lib/levelStore';
import { useAuth } from '@/contexts/AuthContext';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import { CurriculumHierarchyType, ValidationError, Subject, Unit } from '@/types/curriculumHierarchy';
import { LevelCategory, EducationalLevel } from '@/types/level';

interface CreateCurriculumHierarchyModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export default function CreateCurriculumHierarchyModal({ show, onHide, onSuccess }: CreateCurriculumHierarchyModalProps) {
  const { user } = useAuth();
  const [CurriculumHierarchyType, setCurriculumHierarchyType] = useState<CurriculumHierarchyType>('subject');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    subject_fk: '',
    unit_fk: '',
    description: '',
    category_fk: '',
    level_fk: '',
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [categories, setCategories] = useState<LevelCategory[]>([]);
  const [levels, setLevels] = useState<EducationalLevel[]>([]);
  const [filteredLevels, setFilteredLevels] = useState<EducationalLevel[]>([]);

  // Load subjects, units, categories and levels when modal opens
  useEffect(() => {
    if (show) {
      setSubjects(getAllSubjects());
      setUnits(getAllUnits());
      setCategories(levelCategoryStore.getAllCategories());
      setLevels(educationalLevelStore.getAllLevels());
    }
  }, [show]);

  // Filter levels when category changes
  useEffect(() => {
    if (formData.category_fk) {
      const filtered = levels.filter(level => level.categoryId === formData.category_fk);
      setFilteredLevels(filtered);
    } else {
      setFilteredLevels([]);
    }
  }, [formData.category_fk, levels]);

  // Reset form when modal is closed or opened
  const resetForm = () => {
    setCurriculumHierarchyType('subject');
    setFormData({ name: '', code: '', subject_fk: '', unit_fk: '', description: '', category_fk: '', level_fk: '' });
    setErrors([]);
    setSuccessMessage(null);
  };

  // Reset when modal visibility changes
  const handleHide = () => {
    resetForm();
    onHide();
  };

  const handleTypeChange = (type: CurriculumHierarchyType) => {
    setCurriculumHierarchyType(type);
    setFormData({ name: '', code: '', subject_fk: '', unit_fk: '', description: '', category_fk: '', level_fk: '' });
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

    // Validaciones según el tipo
    const newErrors: ValidationError[] = [];

    if (CurriculumHierarchyType === 'subject') {
      // Validaciones para Asignatura
      if (!formData.name || formData.name.trim() === '') {
        newErrors.push({ field: 'name', message: 'El nombre de la asignatura es obligatorio' });
      }
      if (!formData.code || formData.code.trim() === '') {
        newErrors.push({ field: 'code', message: 'El código de la asignatura es obligatorio' });
      }
      if (!formData.category_fk || formData.category_fk === '') {
        newErrors.push({ field: 'category_fk', message: 'Debes seleccionar una categoría de nivel' });
      }
      if (!formData.level_fk || formData.level_fk === '') {
        newErrors.push({ field: 'level_fk', message: 'Debes seleccionar un nivel educacional' });
      }
    } else if (CurriculumHierarchyType === 'unit') {
      // Validaciones para Unidad
      if (!formData.subject_fk || formData.subject_fk === '') {
        newErrors.push({ field: 'subject_fk', message: 'Debes seleccionar una asignatura padre' });
      }
      if (!formData.name || formData.name.trim() === '') {
        newErrors.push({ field: 'name', message: 'El nombre de la unidad es obligatorio' });
      }
    } else if (CurriculumHierarchyType === 'topic') {
      // Validaciones para Tema
      if (!formData.subject_fk || formData.subject_fk === '') {
        newErrors.push({ field: 'subject_fk', message: 'Debes seleccionar una asignatura' });
      }
      if (!formData.unit_fk || formData.unit_fk === '') {
        newErrors.push({ field: 'unit_fk', message: 'Debes seleccionar una unidad padre' });
      }
      if (!formData.name || formData.name.trim() === '') {
        newErrors.push({ field: 'name', message: 'El nombre del tema es obligatorio' });
      }
    }

    // Si hay errores de validación, mostrarlos y no continuar
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (CurriculumHierarchyType === 'subject') {
        await createSubject(formData.name, formData.code, formData.level_fk, userId);
      } else if (CurriculumHierarchyType === 'unit') {
        await createUnit(formData.name, formData.subject_fk, userId, formData.description);
      } else {
        await createTopic(formData.name, formData.unit_fk, userId);
      }

      setSuccessMessage(`✅ ${getCurriculumHierarchyLabel(CurriculumHierarchyType)} creado exitosamente: "${formData.name}"`);
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

  const getErrorForField = (field: string): string | undefined => {
    const error = errors.find((e) => e.field === field);
    return error ? error.message : undefined;
  };

  return (
    <Modal show={show} onHide={handleHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.3rem' }}>{getCurriculumHierarchyIcon(CurriculumHierarchyType)}</span>
            <span>Crear {getCurriculumHierarchyLabel(CurriculumHierarchyType)}</span>
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
              variant={CurriculumHierarchyType === 'subject' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeChange('subject')}
              className="d-flex align-items-center gap-2"
            >
              <span style={{ fontSize: '1.2rem' }}>📚</span>
              <span>Asignatura</span>
            </Button>
            <Button
              variant={CurriculumHierarchyType === 'unit' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeChange('unit')}
              className="d-flex align-items-center gap-2"
            >
              <span style={{ fontSize: '1.2rem' }}>📂</span>
              <span>Unidad</span>
            </Button>
            <Button
              variant={CurriculumHierarchyType === 'topic' ? 'primary' : 'outline-primary'}
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
        {errors.length > 0 && errors.some(e => e.field === 'general') && (
          <Alert variant="danger">
            <strong>❌ Error:</strong>
            <ul className="mb-0 mt-2">
              {errors
                .filter(error => error.field === 'general')
                .map((error, idx) => (
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
          {CurriculumHierarchyType === 'subject' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de la Asignatura *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Matemáticas"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value.trim();
                    setFormData({ ...formData, name });
                  }}
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
                  onChange={(e) => {
                    const code = e.target.value.trim();
                    setFormData({ ...formData, code });
                    // Validar que no sea vacío
                    if (code === '') {
                      // El error se mostrará al hacer submit
                    }
                  }}
                  isInvalid={!!getErrorForField('code')}
                />
                <Form.Control.Feedback type="invalid">{getErrorForField('code')}</Form.Control.Feedback>
                <Form.Text>El código debe ser único globalmente (ej: MAT-101, ESP-202)</Form.Text>
              </Form.Group>

              <Row className="g-2 mb-3">
                <Col md={6}>
                  <AutocompleteSelect
                    label="Categoría de Nivel"
                    value={formData.category_fk}
                    onChange={(value) => {
                      setFormData({ ...formData, category_fk: String(value), level_fk: '' });
                      setFilteredLevels([]);
                    }}
                    options={categories.map(cat => ({
                      id: cat.id,
                      name: cat.name,
                      description: cat.description
                    }))}
                    placeholder="Busca una categoría..."
                    isInvalid={!!getErrorForField('category_fk')}
                    errorMessage={getErrorForField('category_fk')}
                    warningMessage={categories.length === 0 ? "⚠️ No hay categorías disponibles. Crea una categoría primero." : undefined}
                    required
                  />
                </Col>
                <Col md={6}>
                  <AutocompleteSelect
                    label="Nivel Educacional"
                    value={formData.level_fk}
                    onChange={(value) => setFormData({ ...formData, level_fk: String(value) })}
                    options={filteredLevels.map(level => ({
                      id: level.id,
                      name: level.name,
                      description: level.description
                    }))}
                    placeholder={formData.category_fk ? "Busca un nivel..." : "Selecciona categoría primero"}
                    disabled={!formData.category_fk}
                    isInvalid={!!getErrorForField('level_fk')}
                    errorMessage={getErrorForField('level_fk')}
                    warningMessage={formData.category_fk && filteredLevels.length === 0 ? "⚠️ No hay niveles disponibles para esta categoría. Selecciona otra categoría." : undefined}
                    required
                  />
                </Col>
              </Row>
            </>
          )}

          {/* UNIT FORM */}
          {CurriculumHierarchyType === 'unit' && (
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
                  onChange={(e) => {
                    const name = e.target.value.trim();
                    setFormData({ ...formData, name });
                  }}
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
          {CurriculumHierarchyType === 'topic' && (
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
                        setCurriculumHierarchyType('unit');
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
                  onChange={(e) => {
                    const name = e.target.value.trim();
                    setFormData({ ...formData, name });
                  }}
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
              💾 Guardar {getCurriculumHierarchyLabel(CurriculumHierarchyType)}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
