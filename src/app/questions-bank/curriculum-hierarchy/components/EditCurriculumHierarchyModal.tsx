"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, InputGroup } from 'react-bootstrap';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import {
  updateSubject,
  updateUnit,
  updateTopic,
  getAllSubjects,
  getAllUnits,
  getAllTopics,
  getSubjectById,
  getUnitById,
  getTopicById,
} from '@/lib/curriculumHierarchyStore';
import { educationalLevelStore, levelStore } from '@/lib/levelStore';
import { useAuth } from '@/contexts/AuthContext';
import { CurriculumHierarchyType, ValidationError, Subject, Unit, Topic } from '@/types/curriculumHierarchy';
import { EducationalLevel } from '@/types/level';

// Conectores a omitir en la generación del código
const CONNECTORS = ['de', 'del', 'la', 'las', 'el', 'los', 'y', 'e', 'o', 'u', 'a', 'en', 'con', 'para', 'por'];

/**
 * Normaliza un texto removiendo acentos y caracteres especiales
 */
const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remueve acentos
    .replace(/[^a-zA-Z0-9\s-]/g, ''); // Solo letras, números, espacios y guiones
};

/**
 * Genera el prefijo del código basado en el nombre de la asignatura
 */
const generateCodePrefix = (name: string): string => {
  if (!name || name.trim() === '') return '';
  
  const normalized = normalizeText(name.trim());
  const words = normalized.split(/\s+/).filter(word => word.length > 0);
  
  const significantWords = words.filter(
    word => !CONNECTORS.includes(word.toLowerCase())
  );
  
  const wordsToUse = significantWords.length > 0 ? significantWords : words;
  const codeParts = wordsToUse.map(word => word.substring(0, 3).toUpperCase());
  
  return codeParts.join('-');
};

/**
 * Genera un código único con sufijo numérico auto-incremental
 * - Comienza en 100
 * - Si ya existe un código con el mismo prefijo, incrementa
 * - Ejemplo: MAT-100, MAT-101, MAT-102...
 * - currentCode: código actual de la asignatura (para excluirlo del conteo)
 */
const generateSubjectCode = (name: string, existingCodes: string[], currentCode?: string): string => {
  const prefix = generateCodePrefix(name);
  if (!prefix) return '';
  
  // Filtrar el código actual para no contarlo
  const codesToCheck = currentCode 
    ? existingCodes.filter(code => code.toUpperCase() !== currentCode.toUpperCase())
    : existingCodes;
  
  // Encontrar todos los códigos que comienzan con el mismo prefijo
  const matchingCodes = codesToCheck.filter(code => 
    code.toUpperCase().startsWith(prefix + '-')
  );
  
  // Extraer los números de los códigos existentes
  const existingNumbers = matchingCodes
    .map(code => {
      const match = code.match(new RegExp(`^${prefix}-(\\d+)$`, 'i'));
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((num): num is number => num !== null);
  
  // Calcular el siguiente número (empezando en 100)
  const nextNumber = existingNumbers.length > 0 
    ? Math.max(...existingNumbers) + 1 
    : 100;
  
  return `${prefix}-${nextNumber}`;
};

/**
 * Genera un código único para la unidad con sufijo numérico auto-incremental
 * Formato: [PREFIJO_ASIGNATURA]-[PREFIJO_UNIDAD]-[NUMERO]
 */
const generateUnitCode = (
  unitName: string, 
  subjectCode: string,
  existingCodes: string[],
  currentCode?: string
): string => {
  const unitPrefix = generateCodePrefix(unitName);
  if (!unitPrefix) return '';
  
  // Extraer el prefijo de la asignatura (sin el número)
  const subjectPrefixMatch = subjectCode.match(/^(.+)-\d+$/);
  const subjectPrefix = subjectPrefixMatch ? subjectPrefixMatch[1] : subjectCode;
  
  // Crear el prefijo completo: ASIGNATURA-UNIDAD
  const fullPrefix = subjectPrefix ? `${subjectPrefix}-${unitPrefix}` : unitPrefix;
  
  // Filtrar el código actual para no contarlo
  const codesToCheck = currentCode 
    ? existingCodes.filter(code => code.toUpperCase() !== currentCode.toUpperCase())
    : existingCodes;
  
  // Buscar códigos existentes con el mismo prefijo
  const matchingCodes = codesToCheck.filter(code => 
    code.toUpperCase().startsWith(fullPrefix.toUpperCase() + '-')
  );
  
  // Extraer los números
  const existingNumbers = matchingCodes
    .map(code => {
      const match = code.match(new RegExp(`^${fullPrefix}-(\\d+)$`, 'i'));
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((num): num is number => num !== null);
  
  const nextNumber = existingNumbers.length > 0 
    ? Math.max(...existingNumbers) + 1 
    : 100;
  
  return `${fullPrefix}-${nextNumber}`;
};

/**
 * Genera un código único para el tema con sufijo numérico auto-incremental
 * Formato: [PREFIJO_UNIDAD]-[PREFIJO_TEMA]-[NUMERO]
 */
const generateTopicCode = (
  topicName: string, 
  unitCode: string,
  existingCodes: string[],
  currentCode?: string
): string => {
  const topicPrefix = generateCodePrefix(topicName);
  if (!topicPrefix) return '';
  
  // Extraer el prefijo de la unidad (sin el número)
  const unitPrefixMatch = unitCode.match(/^(.+)-\d+$/);
  const unitPrefix = unitPrefixMatch ? unitPrefixMatch[1] : unitCode;
  
  // Crear el prefijo completo: UNIDAD-TEMA
  const fullPrefix = unitPrefix ? `${unitPrefix}-${topicPrefix}` : topicPrefix;
  
  // Filtrar el código actual para no contarlo
  const codesToCheck = currentCode 
    ? existingCodes.filter(code => code.toUpperCase() !== currentCode.toUpperCase())
    : existingCodes;
  
  // Buscar códigos existentes con el mismo prefijo
  const matchingCodes = codesToCheck.filter(code => 
    code.toUpperCase().startsWith(fullPrefix.toUpperCase() + '-')
  );
  
  // Extraer los números
  const existingNumbers = matchingCodes
    .map(code => {
      const match = code.match(new RegExp(`^${fullPrefix}-(\\d+)$`, 'i'));
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((num): num is number => num !== null);
  
  const nextNumber = existingNumbers.length > 0 
    ? Math.max(...existingNumbers) + 1 
    : 100;
  
  return `${fullPrefix}-${nextNumber}`;
};

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
  const [topics, setTopics] = useState<Topic[]>([]);
  const [levels, setLevels] = useState<EducationalLevel[]>([]);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(false);
  const [autoCode, setAutoCode] = useState(false); // Por defecto deshabilitado en edición
  const [autoCodeUnit, setAutoCodeUnit] = useState(false); // Para unidades
  const [autoCodeTopic, setAutoCodeTopic] = useState(false); // Para temas

  // Load data when modal opens
  useEffect(() => {
    if (show && elementId) {
      setLoading(true);
      setErrors([]);
      setSuccessMessage(null);

      // Load subjects, units and levels
      setSubjects(getAllSubjects());
      setUnits(getAllUnits());
      setTopics(getAllTopics());
      setLevels(educationalLevelStore.getAllLevels());

      // Load element data based on type
      if (elementType === 'subject') {
        const subject = getSubjectById(elementId);
        if (subject) {
          setCurrentSubject(subject);
          setFormData({
            name: subject.name,
            code: subject.code,
            subject_fk: '',
            unit_fk: '',
            description: subject.description || '',
          });
          setAutoCode(false); // Por defecto deshabilitado en edición
        }
      } else if (elementType === 'unit') {
        const unit = getUnitById(elementId);
        if (unit) {
          setCurrentUnit(unit);
          setFormData({
            name: unit.name,
            code: unit.code,
            subject_fk: unit.subject_fk,
            unit_fk: '',
            description: unit.description || '',
          });
          setAutoCodeUnit(false); // Por defecto deshabilitado en edición
        }
      } else if (elementType === 'topic') {
        const topic = getTopicById(elementId);
        if (topic) {
          setCurrentTopic(topic);
          // Get the unit to find the subject
          const unit = getUnitById(topic.unit_fk);
          setFormData({
            name: topic.name,
            code: topic.code,
            subject_fk: unit ? unit.subject_fk : '',
            unit_fk: topic.unit_fk,
            description: topic.description || '',
          });
          setAutoCodeTopic(false); // Por defecto deshabilitado en edición
        }
      }

      setLoading(false);
    }
  }, [show, elementId, elementType]);

  // Autogenerar código cuando cambia el nombre y está habilitado
  useEffect(() => {
    if (autoCode && elementType === 'subject') {
      const existingCodes = subjects.map(s => s.code);
      const currentCode = currentSubject?.code;
      const generatedCode = generateSubjectCode(formData.name, existingCodes, currentCode);
      setFormData(prev => ({ ...prev, code: generatedCode }));
    }
  }, [formData.name, autoCode, elementType, subjects, currentSubject]);

  // Autogenerar código de unidad cuando cambia el nombre o la asignatura
  useEffect(() => {
    if (autoCodeUnit && elementType === 'unit' && formData.subject_fk) {
      const selectedSubject = subjects.find(s => s.subject_id === formData.subject_fk);
      const subjectCode = selectedSubject?.code || '';
      const existingCodes = units.map(u => u.code);
      const currentCode = currentUnit?.code;
      const generatedCode = generateUnitCode(formData.name, subjectCode, existingCodes, currentCode);
      setFormData(prev => ({ ...prev, code: generatedCode }));
    }
  }, [formData.name, formData.subject_fk, autoCodeUnit, elementType, subjects, units, currentUnit]);

  // Autogenerar código de tema cuando cambia el nombre o la unidad
  useEffect(() => {
    if (autoCodeTopic && elementType === 'topic' && formData.unit_fk) {
      const selectedUnit = units.find(u => u.unit_id === formData.unit_fk);
      const unitCode = selectedUnit?.code || '';
      const existingCodes = topics.map(t => t.code);
      const currentCode = currentTopic?.code;
      const generatedCode = generateTopicCode(formData.name, unitCode, existingCodes, currentCode);
      setFormData(prev => ({ ...prev, code: generatedCode }));
    }
  }, [formData.name, formData.unit_fk, autoCodeTopic, elementType, units, topics, currentTopic]);

  const handleAutoCodeToggle = () => {
    const newValue = !autoCode;
    setAutoCode(newValue);
    
    // Si se vuelve a habilitar, regenerar el código
    if (newValue) {
      const existingCodes = subjects.map(s => s.code);
      const currentCode = currentSubject?.code;
      const generatedCode = generateSubjectCode(formData.name, existingCodes, currentCode);
      setFormData(prev => ({ ...prev, code: generatedCode }));
    }
  };

  const handleAutoCodeUnitToggle = () => {
    const newValue = !autoCodeUnit;
    setAutoCodeUnit(newValue);
    
    // Si se vuelve a habilitar, regenerar el código
    if (newValue && formData.subject_fk) {
      const selectedSubject = subjects.find(s => s.subject_id === formData.subject_fk);
      const subjectCode = selectedSubject?.code || '';
      const existingCodes = units.map(u => u.code);
      const currentCode = currentUnit?.code;
      const generatedCode = generateUnitCode(formData.name, subjectCode, existingCodes, currentCode);
      setFormData(prev => ({ ...prev, code: generatedCode }));
    }
  };

  const handleAutoCodeTopicToggle = () => {
    const newValue = !autoCodeTopic;
    setAutoCodeTopic(newValue);
    
    // Si se vuelve a habilitar, regenerar el código
    if (newValue && formData.unit_fk) {
      const selectedUnit = units.find(u => u.unit_id === formData.unit_fk);
      const unitCode = selectedUnit?.code || '';
      const existingCodes = topics.map(t => t.code);
      const currentCode = currentTopic?.code;
      const generatedCode = generateTopicCode(formData.name, unitCode, existingCodes, currentCode);
      setFormData(prev => ({ ...prev, code: generatedCode }));
    }
  };

  const handleHide = () => {
    setFormData({ name: '', code: '', subject_fk: '', unit_fk: '', description: '' });
    setErrors([]);
    setSuccessMessage(null);
    setAutoCode(false);
    setAutoCodeUnit(false);
    setAutoCodeTopic(false);
    onHide();
  };

  const getLevelName = (levelId: string): string => {
    const level = levels.find((l) => l.id === levelId);
    return level ? level.name : 'N/A';
  };

  const getLevelWithCategory = (levelId: string): { level: string; category: string } => {
    const level = levels.find((l) => l.id === levelId);
    if (!level) {
      return { level: 'N/A', category: 'N/A' };
    }
    const category = levelStore.getCategoryById(level.categoryId);
    return {
      level: level.name,
      category: category ? category.name : 'N/A',
    };
  };

  const validateForm = (): ValidationError[] => {
    const newErrors: ValidationError[] = [];

    if (elementType === 'subject') {
      if (!formData.name || formData.name.trim() === '') {
        newErrors.push({ field: 'name', message: 'El nombre de la asignatura es obligatorio' });
      }
      if (!formData.code || formData.code.trim() === '') {
        newErrors.push({ field: 'code', message: 'El código de la asignatura es obligatorio' });
      }
    } else if (elementType === 'unit') {
      if (!formData.subject_fk || formData.subject_fk === '') {
        newErrors.push({ field: 'subject_fk', message: 'Debes seleccionar una asignatura padre' });
      }
      if (!formData.name || formData.name.trim() === '') {
        newErrors.push({ field: 'name', message: 'El nombre de la unidad es obligatorio' });
      }
      if (!formData.code || formData.code.trim() === '') {
        newErrors.push({ field: 'code', message: 'El código de la unidad es obligatorio' });
      }
    } else if (elementType === 'topic') {
      if (!formData.subject_fk || formData.subject_fk === '') {
        newErrors.push({ field: 'subject_fk', message: 'Debes seleccionar una asignatura' });
      }
      if (!formData.unit_fk || formData.unit_fk === '') {
        newErrors.push({ field: 'unit_fk', message: 'Debes seleccionar una unidad padre' });
      }
      if (!formData.name || formData.name.trim() === '') {
        newErrors.push({ field: 'name', message: 'El nombre del tema es obligatorio' });
      }
      if (!formData.code || formData.code.trim() === '') {
        newErrors.push({ field: 'code', message: 'El código del tema es obligatorio' });
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);

    const newErrors = validateForm();
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Obtener userId del contexto de autenticación
      const userId = user?.id;
      const firebaseId = user?.firebaseUid; // Usar email como firebaseId o user.uid si está disponible
      
      if (!userId || !firebaseId) {
        setErrors([{ field: 'general', message: 'Usuario no autenticado' }]);
        return;
      }

      if (elementType === 'subject') {
        await updateSubject(elementId, { name: formData.name, code: formData.code, description: formData.description }, userId, firebaseId);
      } else if (elementType === 'unit') {
        await updateUnit(
          elementId,
          { name: formData.name, subject_fk: formData.subject_fk, description: formData.description },
          userId,
          formData.subject_fk,
          firebaseId
        );
      } else {
        await updateTopic(
          elementId,
          { name: formData.name, unit_fk: formData.unit_fk },
          userId,
          formData.unit_fk,
          firebaseId
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

            {/* General Error Messages */}
            {errors.some(e => e.field === 'general') && (
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
              {/* Subject Info Header */}
              {elementType === 'subject' && currentSubject && (
                <div className="bg-light p-3 rounded mb-4 border-start border-4 border-info">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="mb-1">
                        <small className="text-muted">Categoría</small>
                      </p>
                      <p className="mb-0">
                        <strong>{getLevelWithCategory(currentSubject.level_fk).category}</strong>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1">
                        <small className="text-muted">Nivel Educacional</small>
                      </p>
                      <p className="mb-0">
                        <strong>{getLevelWithCategory(currentSubject.level_fk).level}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBJECT FORM */}
              {elementType === 'subject' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de la Asignatura <span style={{ color: 'red' }}>*</span></Form.Label>
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
                    <Form.Label>Código Único <span style={{ color: 'red' }}>*</span></Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder={autoCode ? "Se genera automáticamente" : "Ej: MAT-101"}
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                        isInvalid={!!getErrorForField('code')}
                        readOnly={autoCode}
                        className={autoCode ? 'bg-light' : ''}
                      />
                      <InputGroup.Text 
                        style={{ cursor: 'pointer' }}
                        onClick={handleAutoCodeToggle}
                        title={autoCode ? 'Habilitar edición manual' : 'Volver a autogenerar'}
                      >
                        <Form.Check
                          type="switch"
                          id="auto-code-switch-edit"
                          checked={autoCode}
                          onChange={handleAutoCodeToggle}
                          label=""
                          style={{ marginBottom: 0 }}
                        />
                        <small className="ms-1">{autoCode ? '🔒 Auto' : '✏️ Manual'}</small>
                      </InputGroup.Text>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid" style={{ display: getErrorForField('code') ? 'block' : 'none' }}>
                      {getErrorForField('code')}
                    </Form.Control.Feedback>
                    <Form.Text>
                      {autoCode 
                        ? 'El código se genera automáticamente basado en el nombre. Desactiva el switch para editar manualmente.'
                        : 'Edita el código manualmente o activa el switch para autogenerar.'
                      }
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Descripción opcional de la asignatura..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      isInvalid={!!getErrorForField('description')}
                    />
                    <Form.Control.Feedback type="invalid">{getErrorForField('description')}</Form.Control.Feedback>
                    <Form.Text>Agrega una descripción para ayudar a identificar la asignatura</Form.Text>
                  </Form.Group>
                </>
              )}

              {/* UNIT FORM */}
              {elementType === 'unit' && (
                <>
                  <Form.Group className="mb-3">
                    <AutocompleteSelect
                      label='Asignatura Padre'
                      value={formData.subject_fk}
                      onChange={(value) => setFormData({ ...formData, subject_fk: String(value) })}
                      options={subjects.map((subject) => ({
                        id: subject.subject_id,
                        name: `${subject.name} (${subject.code})`,
                        description: getLevelName(subject.level_fk),
                      }))}
                      placeholder="Busca una asignatura..."
                      isInvalid={!!getErrorForField('subject_fk')}
                      errorMessage={getErrorForField('subject_fk') || undefined}
                      warningMessage="⚠️ Cambiar la asignatura padre mantendrá todos los temas asociados a esta unidad."
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de la Unidad <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Álgebra Básica"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      isInvalid={!!getErrorForField('name')}
                    />
                    <Form.Control.Feedback type="invalid">{getErrorForField('name')}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Código Único <span style={{ color: 'red' }}>*</span></Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder={autoCodeUnit ? "Se genera automáticamente" : "Ej: MAT-ALG-100"}
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                        isInvalid={!!getErrorForField('code')}
                        readOnly={autoCodeUnit}
                        className={autoCodeUnit ? 'bg-light' : ''}
                      />
                      <InputGroup.Text 
                        style={{ cursor: 'pointer' }}
                        onClick={handleAutoCodeUnitToggle}
                        title={autoCodeUnit ? 'Habilitar edición manual' : 'Volver a autogenerar'}
                      >
                        <Form.Check
                          type="switch"
                          id="auto-code-switch-unit-edit"
                          checked={autoCodeUnit}
                          onChange={handleAutoCodeUnitToggle}
                          label=""
                          style={{ marginBottom: 0 }}
                        />
                        <small className="ms-1">{autoCodeUnit ? '🔒 Auto' : '✏️ Manual'}</small>
                      </InputGroup.Text>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid" style={{ display: getErrorForField('code') ? 'block' : 'none' }}>
                      {getErrorForField('code')}
                    </Form.Control.Feedback>
                    <Form.Text>
                      {autoCodeUnit 
                        ? 'El código se genera automáticamente basado en la asignatura y el nombre. Desactiva el switch para editar manualmente.'
                        : 'Edita el código manualmente o activa el switch para autogenerar.'
                      }
                    </Form.Text>
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
                    <Form.Label>1. Asignatura <span style={{ color: 'red' }}>*</span></Form.Label>
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
                          {subject.name} ({subject.code}) - {getLevelName(subject.level_fk)}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{getErrorForField('subject_fk')}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>2. Unidad Padre <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            {unit.name} ({unit.code})
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{getErrorForField('unit_fk')}</Form.Control.Feedback>
                    <Form.Text className="text-warning">
                      ⚠️ Cambiar la unidad padre mantendrá todas las preguntas asociadas a este tema.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>3. Nombre del Tema <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Ecuaciones lineales"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      isInvalid={!!getErrorForField('name')}
                    />
                    <Form.Control.Feedback type="invalid">{getErrorForField('name')}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>4. Código Único <span style={{ color: 'red' }}>*</span></Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder={autoCodeTopic ? "Se genera automáticamente" : "Ej: MAT-ALG-ECU-100"}
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                        isInvalid={!!getErrorForField('code')}
                        readOnly={autoCodeTopic}
                        className={autoCodeTopic ? 'bg-light' : ''}
                      />
                      <InputGroup.Text 
                        style={{ cursor: 'pointer' }}
                        onClick={handleAutoCodeTopicToggle}
                        title={autoCodeTopic ? 'Habilitar edición manual' : 'Volver a autogenerar'}
                      >
                        <Form.Check
                          type="switch"
                          id="auto-code-switch-topic-edit"
                          checked={autoCodeTopic}
                          onChange={handleAutoCodeTopicToggle}
                          label=""
                          style={{ marginBottom: 0 }}
                        />
                        <small className="ms-1">{autoCodeTopic ? '🔒 Auto' : '✏️ Manual'}</small>
                      </InputGroup.Text>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid" style={{ display: getErrorForField('code') ? 'block' : 'none' }}>
                      {getErrorForField('code')}
                    </Form.Control.Feedback>
                    <Form.Text>
                      {autoCodeTopic 
                        ? 'El código se genera automáticamente basado en la unidad y el nombre. Desactiva el switch para editar manualmente.'
                        : 'Edita el código manualmente o activa el switch para autogenerar.'
                      }
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>5. Descripción (Opcional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Descripción del tema..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
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
