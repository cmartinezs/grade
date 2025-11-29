"use client";

import { useState, useEffect, useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import AutocompleteSelect from "@/components/shared/AutocompleteSelect";
import { Subject, Unit } from "@/types/curriculumHierarchy";

// Conectores a omitir en la generación del código
const CONNECTORS = ['de', 'del', 'la', 'las', 'el', 'los', 'y', 'e', 'o', 'u', 'a', 'en', 'con', 'para', 'por'];

/**
 * Normaliza un texto removiendo acentos y caracteres especiales
 */
const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s-]/g, '');
};

/**
 * Genera el prefijo del código basado en el nombre
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
 * Genera un código único para la unidad con sufijo numérico auto-incremental
 * Formato: [PREFIJO_ASIGNATURA]-[PREFIJO_UNIDAD]-[NUMERO]
 * Ejemplo: MAT-ALG-100, MAT-GEO-100
 */
const generateUnitCode = (
  unitName: string, 
  subjectCode: string,
  existingCodes: string[]
): string => {
  const unitPrefix = generateCodePrefix(unitName);
  if (!unitPrefix) return '';
  
  // Extraer el prefijo de la asignatura (sin el número)
  const subjectPrefixMatch = subjectCode.match(/^(.+)-\d+$/);
  const subjectPrefix = subjectPrefixMatch ? subjectPrefixMatch[1] : subjectCode;
  
  // Crear el prefijo completo: ASIGNATURA-UNIDAD
  const fullPrefix = subjectPrefix ? `${subjectPrefix}-${unitPrefix}` : unitPrefix;
  
  // Buscar códigos existentes con el mismo prefijo
  const matchingCodes = existingCodes.filter(code => 
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

interface UnitFormProps {
  name: string;
  code: string;
  description: string;
  subject_fk: string;
  subjects: Subject[];
  existingCodes?: string[];
  onNameChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  getError: (field: string) => string | undefined;
  isAutoCodeEnabled?: boolean;
  onAutoCodeToggle?: (enabled: boolean) => void;
}

export default function UnitForm({
  name,
  code,
  description,
  subject_fk,
  subjects,
  existingCodes = [],
  onNameChange,
  onCodeChange,
  onDescriptionChange,
  onSubjectChange,
  getError,
  isAutoCodeEnabled = true,
  onAutoCodeToggle,
}: UnitFormProps) {
  const [autoCode, setAutoCode] = useState(isAutoCodeEnabled);
  
  // Refs para mantener referencias estables
  const onCodeChangeRef = useRef(onCodeChange);
  onCodeChangeRef.current = onCodeChange;
  
  const existingCodesRef = useRef(existingCodes);
  existingCodesRef.current = existingCodes;

  // Obtener el código de la asignatura seleccionada
  const selectedSubject = subjects.find(s => s.subject_id === subject_fk);
  const subjectCode = selectedSubject?.code || '';

  // Sincronizar estado interno con prop externa
  useEffect(() => {
    setAutoCode(isAutoCodeEnabled);
  }, [isAutoCodeEnabled]);

  // Autogenerar código cuando cambia el nombre o la asignatura
  useEffect(() => {
    if (autoCode && subject_fk) {
      const generatedCode = generateUnitCode(name, subjectCode, existingCodesRef.current);
      onCodeChangeRef.current(generatedCode);
    }
  }, [name, autoCode, subject_fk, subjectCode]);

  const handleAutoCodeToggle = () => {
    const newValue = !autoCode;
    setAutoCode(newValue);
    onAutoCodeToggle?.(newValue);
    
    if (newValue && subject_fk) {
      const generatedCode = generateUnitCode(name, subjectCode, existingCodes);
      onCodeChange(generatedCode);
    }
  };

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
          onChange={(e) => onNameChange(e.target.value)}
          isInvalid={!!getError("name")}
        />
        <Form.Control.Feedback type="invalid">
          {getError("name")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Código Único <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={autoCode ? "Se genera automáticamente" : "Ej: MAT-ALG-100"}
            value={code}
            onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
            isInvalid={!!getError("code")}
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
              id="auto-code-switch-unit"
              checked={autoCode}
              onChange={handleAutoCodeToggle}
              label=""
              style={{ marginBottom: 0 }}
            />
            <small className="ms-1">{autoCode ? '🔒 Auto' : '✏️ Manual'}</small>
          </InputGroup.Text>
        </InputGroup>
        <Form.Control.Feedback type="invalid" style={{ display: getError('code') ? 'block' : 'none' }}>
          {getError("code")}
        </Form.Control.Feedback>
        <Form.Text>
          {autoCode 
            ? 'El código se genera automáticamente basado en la asignatura y el nombre. Desactiva el switch para editar manualmente.'
            : 'Ingresa un código único manualmente. Activa el switch para autogenerar.'
          }
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
