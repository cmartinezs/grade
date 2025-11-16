"use client";

import { Form } from 'react-bootstrap';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import { Subject, Unit } from '@/types/curriculumHierarchy';

interface TopicFormProps {
  name: string;
  subject_fk: string;
  unit_fk: string;
  subjects: Subject[];
  onNameChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  getError: (field: string) => string | undefined;
  getFilteredUnitsBySubject: () => Unit[];
}

export default function TopicForm({
  name,
  subject_fk,
  unit_fk,
  subjects,
  onNameChange,
  onSubjectChange,
  onUnitChange,
  getError,
  getFilteredUnitsBySubject,
}: TopicFormProps) {
  const filteredUnits = getFilteredUnitsBySubject();
  const hasUnitsForSubject = filteredUnits.length > 0;
  const showNoUnitsWarning = subject_fk && !hasUnitsForSubject;

  return (
    <>
        <AutocompleteSelect
            label='Asignatura Padre'
          value={subject_fk}
          onChange={(value) => onSubjectChange(String(value))}
          options={subjects.map(subject => ({
            id: subject.subject_id,
            name: subject.name,
            description: subject.code
          }))}
          placeholder="Busca una asignatura..."
          isInvalid={!!getError('subject_fk')}
          errorMessage={getError('subject_fk')}
          warningMessage={subjects.length === 0 ? "⚠️ No hay asignaturas disponibles. Crea una primero." : undefined}
          required
        />

            <AutocompleteSelect
            label='Unidad Padre'
          value={unit_fk}
          onChange={(value) => onUnitChange(String(value))}
          options={filteredUnits.map(unit => ({
            id: unit.unit_id,
            name: unit.name
          }))}
          placeholder={subject_fk ? "Busca una unidad..." : "Selecciona asignatura primero"}
          disabled={!subject_fk}
          isInvalid={!!getError('unit_fk')}
          errorMessage={getError('unit_fk')}
          warningMessage={showNoUnitsWarning ? "⚠️ No hay unidades disponibles para esta asignatura." : undefined}
          required
        />

      <Form.Group className="mb-3">
        <Form.Label>Nombre del Tema <span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Ecuaciones lineales"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          isInvalid={!!getError('name')}
        />
        <Form.Control.Feedback type="invalid">{getError('name')}</Form.Control.Feedback>
        <Form.Text>El nombre debe ser único dentro de la unidad seleccionada.</Form.Text>
      </Form.Group>
    </>
  );
}
