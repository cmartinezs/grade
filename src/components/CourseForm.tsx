'use client'

import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { courseStore } from '@/lib/courseStore';
import { levelStore } from '@/lib/levelStore';
import { CourseValidationError } from '@/types/course';
import AutocompleteSelect, { AutocompleteOption } from '@/components/AutocompleteSelect';
import FreeTextAutocomplete from '@/components/FreeTextAutocomplete';

interface CourseFormProps {
  mode: 'create' | 'edit';
  courseId?: string;
  onSubmitSuccess?: (courseId: string) => void;
  isSubmitting?: boolean;
  onSubmit?: (data: { name: string; code: string; levelId: string; institution: string; active: boolean }) => Promise<void>;
}

export default function CourseForm({
  mode,
  courseId,
  onSubmitSuccess,
  isSubmitting: externalIsSubmitting = false,
  onSubmit: externalOnSubmit
}: CourseFormProps) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [levelId, setLevelId] = useState('');
  const [institution, setInstitution] = useState('');
  const [active, setActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdCourseId, setCreatedCourseId] = useState('');
  const [validationErrors, setValidationErrors] = useState<CourseValidationError[]>([]);
  const [levelOptions, setLevelOptions] = useState<AutocompleteOption[]>([]);
  const [institutionOptions, setInstitutionOptions] = useState<AutocompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(mode === 'edit');

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load levels
        const allLevels = levelStore.getAllLevels();
        
        const levelOpts: AutocompleteOption[] = allLevels.map(lvl => ({
          id: lvl.id,
          name: lvl.name,
          description: lvl.description
        }));
        setLevelOptions(levelOpts);

        // Load institutions
        const institutions = courseStore.getInstitutions();
        const instOpts: AutocompleteOption[] = institutions.map((inst) => ({
          id: inst,
          name: inst
        }));
        setInstitutionOptions(instOpts);

        // Load course data if editing
        if (mode === 'edit' && courseId) {
          const loadedCourse = courseStore.getCourse(courseId);
          if (loadedCourse) {
            setName(loadedCourse.name);
            setCode(loadedCourse.code);
            setLevelId(loadedCourse.levelId);
            setInstitution(loadedCourse.institution);
            setActive(loadedCourse.active);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [mode, courseId]);

  const resetForm = () => {
    if (mode === 'create') {
      setName('');
      setCode('');
      setLevelId('');
      setInstitution('');
      setActive(true);
    }
    setValidationErrors([]);
    setSubmitSuccess(false);
    setCreatedCourseId('');
  };

  const getErrorsForField = (field: string): CourseValidationError[] => {
    return validationErrors.filter(e => e.field === field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setValidationErrors([]);
    setIsSubmitting(true);

    try {
      if (externalOnSubmit) {
        // Use external submit handler (for modal integration)
        await externalOnSubmit({
          name: name.trim(),
          code: code.trim(),
          levelId,
          institution: institution.trim(),
          active
        });
      } else if (mode === 'create') {
        // Create mode
        const newCourse = await courseStore.createCourse(
          {
            name: name.trim(),
            code: code.trim(),
            levelId,
            institution: institution.trim(),
            active
          },
          user?.id || 'anonymous'
        );

        setSubmitSuccess(true);
        setCreatedCourseId(newCourse.course_id);
        resetForm();
        onSubmitSuccess?.(newCourse.course_id);
      } else if (mode === 'edit' && courseId) {
        // Edit mode
        await courseStore.updateCourse(
          courseId,
          {
            name: name.trim(),
            code: code.trim(),
            levelId,
            institution: institution.trim(),
            active
          },
          user?.id || 'anonymous'
        );

        setSubmitSuccess(true);
        setCreatedCourseId(courseId);
        onSubmitSuccess?.(courseId);
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMsg = error.message;
        if (errorMsg.startsWith('Validation errors:')) {
          const errors: CourseValidationError[] = [];
          const parts = errorMsg.split('Validation errors:')[1].split(',');
          parts.forEach(part => {
            const [field, message] = part.trim().split(':');
            if (field && message) {
              errors.push({ field: field.trim(), message: message.trim() });
            }
          });
          setValidationErrors(errors);
        } else {
          setValidationErrors([{ field: 'general', message: errorMsg }]);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalIsSubmitting = isSubmitting || externalIsSubmitting;
  const isDisabled = isLoading || finalIsSubmitting;

  return (
    <Form onSubmit={handleSubmit}>
      {/* General errors */}
      {getErrorsForField('general').length > 0 && (
        <Alert variant="danger">
          {getErrorsForField('general').map((err, idx) => (
            <div key={idx}>{err.message}</div>
          ))}
        </Alert>
      )}

      {/* Course Name */}
      <Form.Group className="mb-3">
        <Form.Label>
          Nombre del Curso <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: 5° Básico A, 1° Medio B, 8° Básico C"
          disabled={isDisabled}
          isInvalid={getErrorsForField('name').length > 0}
        />
        {getErrorsForField('name').map((err, idx) => (
          <Form.Control.Feedback key={idx} type="invalid">
            {err.message}
          </Form.Control.Feedback>
        ))}
      </Form.Group>

      {/* Course Code */}
      <Form.Group className="mb-3">
        <Form.Label>
          Código del Curso <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Ej: 5B-A, 1M-B, 8B-C"
          disabled={isDisabled}
          isInvalid={getErrorsForField('code').length > 0}
        />
        <Form.Text className="text-muted">
          El código debe ser único. Se convertirá automáticamente a mayúsculas.
        </Form.Text>
        {getErrorsForField('code').map((err, idx) => (
          <Form.Control.Feedback key={idx} type="invalid">
            {err.message}
          </Form.Control.Feedback>
        ))}
      </Form.Group>

      {/* Academic Level - Using AutocompleteSelect Component */}
      <AutocompleteSelect
        value={levelId}
        onChange={(value) => setLevelId(String(value))}
        options={levelOptions}
        label="Nivel Académico"
        required
        placeholder="Escribe para buscar o selecciona un nivel..."
        isInvalid={getErrorsForField('levelId').length > 0}
        errorMessage={getErrorsForField('levelId')[0]?.message}
        warningMessage={levelOptions.length === 0 ? "⚠️ No hay niveles académicos disponibles. Para poder crear un curso, primero debes crear o cargar los niveles. Ve a Gestión de Niveles para agregar niveles." : undefined}
        disabled={isDisabled}
      />

      {/* Institution - Using FreeTextAutocomplete Component (free text field with suggestions) */}
      <FreeTextAutocomplete
        value={institution}
        onChange={(value) => setInstitution(value)}
        options={institutionOptions}
        label="Institución"
        required
        placeholder="Escribe para buscar o selecciona una institución..."
        isInvalid={getErrorsForField('institution').length > 0}
        errorMessage={getErrorsForField('institution')[0]?.message}
        disabled={isDisabled}
      />

      {/* Active Status */}
      <Form.Group className="mb-4">
        <Form.Switch
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          id="course-active"
          label="Curso Activo"
          disabled={isDisabled}
        />
        <Form.Text className="text-muted d-block mt-2">
          Por defecto, los cursos nuevos se crean en estado activo.
        </Form.Text>
      </Form.Group>

      {/* Success Message */}
      {submitSuccess && (
        <Alert variant="success" className="mb-3">
          <Alert.Heading>✅ {mode === 'create' ? 'Curso Creado' : 'Curso Actualizado'}</Alert.Heading>
          <p>ID del curso: <strong>{createdCourseId}</strong></p>
          <hr />
          <p className="mb-0">
            <small>
              {mode === 'create'
                ? 'El curso ya está disponible en el catálogo.'
                : 'Los cambios han sido guardados exitosamente.'}
            </small>
          </p>
        </Alert>
      )}

      {/* Submit Button */}
      {!submitSuccess && (
        <Button
          variant="primary"
          type="submit"
          disabled={isDisabled}
          className="w-100"
        >
          {finalIsSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              {mode === 'create' ? 'Creando...' : 'Actualizando...'}
            </>
          ) : mode === 'create' ? (
            '➕ Crear Curso'
          ) : (
            '✏️ Actualizar Curso'
          )}
        </Button>
      )}
    </Form>
  );
}
