"use client";

import { useState, useEffect, useRef } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import { LevelCategory, EducationalLevel } from '@/types/level';

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
 * - Toma las primeras 3 letras de cada palabra (excepto conectores)
 * - Une con guión
 * - Todo en mayúsculas
 */
const generateCodePrefix = (name: string): string => {
  if (!name || name.trim() === '') return '';
  
  const normalized = normalizeText(name.trim());
  const words = normalized.split(/\s+/).filter(word => word.length > 0);
  
  // Filtrar conectores
  const significantWords = words.filter(
    word => !CONNECTORS.includes(word.toLowerCase())
  );
  
  // Si no quedan palabras después de filtrar, usar las originales
  const wordsToUse = significantWords.length > 0 ? significantWords : words;
  
  // Tomar las primeras 3 letras de cada palabra
  const codeParts = wordsToUse.map(word => word.substring(0, 3).toUpperCase());
  
  return codeParts.join('-');
};

/**
 * Genera un código único con sufijo numérico auto-incremental
 * - Comienza en 100
 * - Si ya existe un código con el mismo prefijo, incrementa
 * - Ejemplo: MAT-100, MAT-101, MAT-102...
 */
const generateSubjectCode = (name: string, existingCodes: string[]): string => {
  const prefix = generateCodePrefix(name);
  if (!prefix) return '';
  
  // Encontrar todos los códigos que comienzan con el mismo prefijo
  const matchingCodes = existingCodes.filter(code => 
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

interface SubjectFormProps {
  name: string;
  code: string;
  description: string;
  category_fk: string;
  level_fk: string;
  categories: LevelCategory[];
  filteredLevels: EducationalLevel[];
  existingCodes?: string[];
  onNameChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  getError: (field: string) => string | undefined;
  isAutoCodeEnabled?: boolean;
  onAutoCodeToggle?: (enabled: boolean) => void;
}

export default function SubjectForm({
  name,
  code,
  description,
  category_fk,
  level_fk,
  categories,
  filteredLevels,
  existingCodes = [],
  onNameChange,
  onCodeChange,
  onDescriptionChange,
  onCategoryChange,
  onLevelChange,
  getError,
  isAutoCodeEnabled = true,
  onAutoCodeToggle,
}: SubjectFormProps) {
  const [autoCode, setAutoCode] = useState(isAutoCodeEnabled);
  
  // Ref para mantener referencia estable de onCodeChange y existingCodes
  const onCodeChangeRef = useRef(onCodeChange);
  onCodeChangeRef.current = onCodeChange;
  
  const existingCodesRef = useRef(existingCodes);
  existingCodesRef.current = existingCodes;

  // Sincronizar estado interno con prop externa
  useEffect(() => {
    setAutoCode(isAutoCodeEnabled);
  }, [isAutoCodeEnabled]);

  // Autogenerar código cuando cambia el nombre y está habilitado
  useEffect(() => {
    if (autoCode) {
      const generatedCode = generateSubjectCode(name, existingCodesRef.current);
      onCodeChangeRef.current(generatedCode);
    }
  }, [name, autoCode]);

  const handleAutoCodeToggle = () => {
    const newValue = !autoCode;
    setAutoCode(newValue);
    onAutoCodeToggle?.(newValue);
    
    // Si se vuelve a habilitar, regenerar el código
    if (newValue) {
      const generatedCode = generateSubjectCode(name, existingCodes);
      onCodeChange(generatedCode);
    }
  };

  return (
    <>
      <Row className="g-2 mb-0">
        <Col md={6}>
            <AutocompleteSelect
            label='Categoría de Nivel'
              value={category_fk}
              onChange={(value) => onCategoryChange(String(value))}
              options={categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                description: cat.description
              }))}
              placeholder="Busca una categoría..."
              isInvalid={!!getError('category_fk')}
              errorMessage={getError('category_fk')}
              warningMessage={categories.length === 0 ? "⚠️ No hay categorías disponibles. Crea una categoría primero." : undefined}
              required
            />
        </Col>
        <Col md={6}>
            <AutocompleteSelect
            label='Nivel Educacional'
              value={level_fk}
              onChange={(value) => onLevelChange(String(value))}
              options={filteredLevels.map(level => ({
                id: level.id,
                name: level.name,
                description: level.description
              }))}
              placeholder={category_fk ? "Busca un nivel..." : "Selecciona categoría primero"}
              disabled={!category_fk}
              isInvalid={!!getError('level_fk')}
              errorMessage={getError('level_fk')}
              warningMessage={category_fk && filteredLevels.length === 0 ? "⚠️ No hay niveles disponibles para esta categoría. Selecciona otra categoría." : undefined}
              required
            />
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Nombre de la Asignatura <span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Matemáticas"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          isInvalid={!!getError('name')}
        />
        <Form.Control.Feedback type="invalid">{getError('name')}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Código Único <span className="text-danger">*</span></Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={autoCode ? "Se genera automáticamente" : "Ej: MAT-101"}
            value={code}
            onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
            isInvalid={!!getError('code')}
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
              id="auto-code-switch"
              checked={autoCode}
              onChange={handleAutoCodeToggle}
              label=""
              style={{ marginBottom: 0 }}
            />
            <small className="ms-1">{autoCode ? '🔒 Auto' : '✏️ Manual'}</small>
          </InputGroup.Text>
        </InputGroup>
        <Form.Control.Feedback type="invalid" style={{ display: getError('code') ? 'block' : 'none' }}>
          {getError('code')}
        </Form.Control.Feedback>
        <Form.Text>
          {autoCode 
            ? 'El código se genera automáticamente basado en el nombre. Desactiva el switch para editar manualmente.'
            : 'Ingresa un código único manualmente. Activa el switch para autogenerar.'
          }
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Descripción opcional de la asignatura..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          isInvalid={!!getError('description')}
        />
        <Form.Control.Feedback type="invalid">{getError('description')}</Form.Control.Feedback>
        <Form.Text>Agrega una descripción para ayudar a identificar la asignatura</Form.Text>
      </Form.Group>
    </>
  );
}
