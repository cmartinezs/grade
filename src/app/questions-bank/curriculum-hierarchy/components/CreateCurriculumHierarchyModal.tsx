"use client";

import { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {
  createSubject,
  createUnit,
  createTopic,
  loadSubjectsAsync,
  loadUnitsAsync,
} from '@/lib/curriculumHierarchyStore';
import { levelStore } from '@/lib/levelStore';
import { useAuth } from '@/contexts/AuthContext';
import SubjectForm from './forms/SubjectForm';
import UnitForm from './forms/UnitForm';
import TopicForm from './forms/TopicForm';
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
      // Load subjects and units asynchronously to ensure data is loaded before rendering
      (async () => {
        try {
          const loadedSubjects = await loadSubjectsAsync();
          setSubjects(loadedSubjects);
          
          const loadedUnits = await loadUnitsAsync();
          setUnits(loadedUnits);
        } catch (error) {
          console.error('Error loading subjects/units:', error);
          setSubjects([]);
          setUnits([]);
        }
      })();
      
      // Load categories and levels asynchronously
      (async () => {
        try {
          await levelStore.loadAll();
          
          const loadedCategories = levelStore.getAllCategories();
          setCategories(loadedCategories);
          
          const loadedLevels = levelStore.getAllLevels();
          setLevels(loadedLevels);
        } catch (error) {
          console.error('Error loading categories/levels:', error);
          setCategories([]);
          setLevels([]);
        }
      })();
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

  const validateForm = (): ValidationError[] => {
    const newErrors: ValidationError[] = [];

    if (CurriculumHierarchyType === 'subject') {
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
      if (!formData.subject_fk || formData.subject_fk === '') {
        newErrors.push({ field: 'subject_fk', message: 'Debes seleccionar una asignatura padre' });
      }
      if (!formData.name || formData.name.trim() === '') {
        newErrors.push({ field: 'name', message: 'El nombre de la unidad es obligatorio' });
      }
    } else if (CurriculumHierarchyType === 'topic') {
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

    return newErrors;
  };

  const handleSaveItem = async (userId: string): Promise<void> => {
    if (CurriculumHierarchyType === 'subject') {
      await createSubject(formData.name.trim(), formData.code.trim(), formData.level_fk, userId);
    } else if (CurriculumHierarchyType === 'unit') {
      await createUnit(formData.name.trim(), formData.subject_fk, userId, formData.description.trim());
    } else {
      // Verificar que unit_fk no esté vacío
      if (!formData.unit_fk) {
        throw new Error('El ID de la unidad es requerido');
      }
      
      await createTopic(formData.name.trim(), formData.unit_fk, userId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);

    const userId = user?.id;
    if (!userId) {
      setErrors([{ field: 'general', message: 'Usuario no autenticado' }]);
      return;
    }

    const newErrors = validateForm();
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await handleSaveItem(userId);
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

  // Renderizar opciones de temas filtradas (optimizado con useMemo)
  const filteredUnits = useMemo(() => {
    const filtered = units.filter((unit) => unit.subject_fk === formData.subject_fk);
    return filtered;
  }, [units, formData.subject_fk]);
  
  // Solo necesario para debugging:
  // useEffect(() => {
  //   if (CurriculumHierarchyType === 'topic' && formData.subject_fk && filteredUnits.length > 0) {
  //     console.log('🔍 Filtered units:', filteredUnits.length);
  //   }
  // }, [formData.subject_fk, CurriculumHierarchyType]); // Solo cuando cambia subject_fk o el tipo

  // Renderizar botones de tipo
  const renderTypeButtons = () => (
    <div className="d-flex gap-2">
      {(['subject', 'unit', 'topic'] as const).map((type) => (
        <Button
          key={type}
          variant={CurriculumHierarchyType === type ? 'primary' : 'outline-primary'}
          onClick={() => handleTypeChange(type)}
          className="d-flex align-items-center gap-2"
        >
          <span style={{ fontSize: '1.2rem' }}>{getCurriculumHierarchyIcon(type)}</span>
          <span>{getCurriculumHierarchyLabel(type)}</span>
        </Button>
      ))}
    </div>
  );

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
          {renderTypeButtons()}
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
            <SubjectForm
              name={formData.name}
              code={formData.code}
              category_fk={formData.category_fk}
              level_fk={formData.level_fk}
              categories={categories}
              filteredLevels={filteredLevels}
              onNameChange={(name) => setFormData({ ...formData, name })}
              onCodeChange={(code) => setFormData({ ...formData, code })}
              onCategoryChange={(value) => {
                setFormData({ ...formData, category_fk: value, level_fk: '' });
                setFilteredLevels([]);
              }}
              onLevelChange={(value) => setFormData({ ...formData, level_fk: value })}
              getError={getErrorForField}
            />
          )}

          {/* UNIT FORM */}
          {CurriculumHierarchyType === 'unit' && (
            <UnitForm
              name={formData.name}
              description={formData.description}
              subject_fk={formData.subject_fk}
              subjects={subjects}
              onNameChange={(name) => setFormData({ ...formData, name })}
              onDescriptionChange={(description) => setFormData({ ...formData, description })}
              onSubjectChange={(value) => setFormData({ ...formData, subject_fk: value })}
              getError={getErrorForField}
            />
          )}

          {/* TOPIC FORM */}
          {CurriculumHierarchyType === 'topic' && (
            <TopicForm
              name={formData.name}
              subject_fk={formData.subject_fk}
              unit_fk={formData.unit_fk}
              subjects={subjects}
              filteredUnits={filteredUnits}
              onNameChange={(name) => setFormData({ ...formData, name })}
              onSubjectChange={(value) => setFormData({ ...formData, subject_fk: value, unit_fk: '' })}
              onUnitChange={(value) => {
                console.log('🔄 CreateModal - onUnitChange called:', {
                  newValue: value,
                  valueType: typeof value,
                  currentFormData: formData
                });
                setFormData({ ...formData, unit_fk: value });
              }}
              getError={getErrorForField}
            />
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
