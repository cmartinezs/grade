"use client";

import { Form } from "react-bootstrap";
import AutocompleteSelect from "@/components/shared/AutocompleteSelect";
import { Subject } from "@/types/curriculumHierarchy";

interface UnitFormProps {
  name: string;
  description: string;
  subject_fk: string;
  subjects: Subject[];
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  getError: (field: string) => string | undefined;
}

export default function UnitForm({
  name,
  description,
  subject_fk,
  subjects,
  onNameChange,
  onDescriptionChange,
  onSubjectChange,
  getError,
}: UnitFormProps) {
  return (
    <>
      <AutocompleteSelect
        label="Asignatura Padre"
        value={subject_fk}
        onChange={(value) => onSubjectChange(String(value))}
        options={subjects.map((subject) => ({
          id: subject.subject_id,
          name: subject.name,
          description: subject.code,
        }))}
        placeholder="Busca una asignatura..."
        isInvalid={!!getError("subject_fk")}
        errorMessage={getError("subject_fk")}
        warningMessage={
          subjects.length === 0
            ? "⚠️ No hay asignaturas disponibles. Crea una primero."
            : undefined
        }
        required
      />

      <Form.Group className="mb-3">
        <Form.Label>
          Nombre de la Unidad <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Álgebra Básica"
          value={name}
          onChange={(e) => onNameChange(e.target.value.trim())}
          isInvalid={!!getError("name")}
        />
        <Form.Control.Feedback type="invalid">
          {getError("name")}
        </Form.Control.Feedback>
        <Form.Text>
          El nombre debe ser único dentro de la asignatura seleccionada.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción (Opcional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Descripción de la unidad..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </Form.Group>
    </>
  );
}
