/**
 * QuestionFormFields - Componente reutilizable para formularios de preguntas
 * 
 * Este componente contiene los campos comunes que se usan en:
 * - CreateQuestionModal
 * - EditQuestionModal
 * - CloneQuestionModal
 * - (cualquier otro modal que maneje preguntas)
 * 
 * Campos incluidos:
 * - Tipo de Pregunta
 * - Enunciado
 * - Taxonomía (Asignatura/Unidad/Tema)
 * - Dificultad
 * - Alternativas
 */

'use client';

import { useEffect } from 'react';
import { Form, Row, Col, Badge, Alert, Button } from 'react-bootstrap';
import {
  QuestionType,
  DifficultyLevel,
  CreateQuestionOptionInput,
  QuestionValidationError,
} from '@/types/question';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useDifficulties } from '@/hooks/useDifficulties';
import type { Subject, Unit, Topic } from '@/types/curriculumHierarchy';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';

interface QuestionFormFieldsProps {
  // Question Type
  questionType: QuestionType;
  onQuestionTypeChange: (type: QuestionType) => void;
  
  // Enunciado
  enunciado: string;
  onEnunciadoChange: (value: string) => void;
  
  // CurriculumHierarchy
  selectedSubject: string;
  selectedUnit: string;
  selectedTopic: string;
  onSubjectChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  
  // Taxonomy
  selectedTaxonomy: string;
  onTaxonomyChange: (value: string) => void;
  
  // Difficulty
  difficulty: DifficultyLevel;
  onDifficultyChange: (value: DifficultyLevel) => void;
  
  // Options
  options: CreateQuestionOptionInput[];
  onOptionTextChange: (index: number, text: string) => void;
  onOptionCorrectChange: (index: number, isCorrect: boolean) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  
  // Validation
  getErrorsForField: (field: string) => QuestionValidationError[];
  
  // UI State
  disabled?: boolean;
  showDifficultyAsRadio?: boolean; // Some modals use radio, others use select
}

export default function QuestionFormFields({
  questionType,
  onQuestionTypeChange,
  enunciado,
  onEnunciadoChange,
  selectedSubject,
  selectedUnit,
  selectedTopic,
  onSubjectChange,
  onUnitChange,
  onTopicChange,
  selectedTaxonomy,
  onTaxonomyChange,
  difficulty,
  onDifficultyChange,
  options,
  onOptionTextChange,
  onOptionCorrectChange,
  onAddOption,
  onRemoveOption,
  getErrorsForField,
  disabled = false,
}: QuestionFormFieldsProps) {
  
  // Load CurriculumHierarchy data from Data Connect
  const { subjects: allSubjects, units: allUnits, topics: allTopics } = useCurriculumHierarchy();
  
  // Load Taxonomies data from Data Connect
  const { taxonomies } = useTaxonomies();
  
  // Load Question Types from Data Connect
  const { questionTypes } = useQuestionTypes();
  
  // Load Difficulties from Data Connect
  const { difficulties } = useDifficulties();
  
  // Filter active items
  const subjects: Subject[] = allSubjects.filter((s) => s.active && !s.deleted_at);
  const units: Unit[] = selectedSubject
    ? allUnits.filter((u) => u.subject_fk === selectedSubject && u.active && !u.deleted_at)
    : [];
  const topics: Topic[] = selectedUnit
    ? allTopics.filter((t) => t.unit_fk === selectedUnit && t.active && !t.deleted_at)
    : [];
  
  // Filter active taxonomies
  const activeTaxonomies = taxonomies.filter((t) => t.active);

  // Filter active difficulties from Data Connect
  const activeDifficulties = difficulties.filter(d => d.active);

  // Check for missing CurriculumHierarchy levels
  const hasNoUnits = selectedSubject && units.length === 0;
  const hasNoTopics = selectedUnit && topics.length === 0;

  // Get rules for the current question type from Data Connect
  const currentQuestionType = questionTypes.find(qt => qt.code === questionType);
  const rules = currentQuestionType ? {
    minOptions: currentQuestionType.minOptions || 0,
    maxOptions: currentQuestionType.maxOptions || 0,
    correctOptions: currentQuestionType.correctOptions || 1,
  } : {
    minOptions: 2,
    maxOptions: 0,
    correctOptions: 1,
  };

  // Auto-generate minimum options when question type changes
  useEffect(() => {
    if (!currentQuestionType) {
      // Clear all options if no question type selected
      if (options.length > 0) {
        // Remove all options
        for (let i = options.length - 1; i >= 0; i--) {
          onRemoveOption(i);
        }
      }
      return;
    }

    if (rules.minOptions === 0) {
      // Clear all options if question type doesn't require options (like 'desarrollo')
      if (options.length > 0) {
        for (let i = options.length - 1; i >= 0; i--) {
          onRemoveOption(i);
        }
      }
      return;
    }

    const currentCount = options.length;
    
    if (currentCount < rules.minOptions) {
      // Need to add more options to meet minimum
      const optionsToAdd = rules.minOptions - currentCount;
      for (let i = 0; i < optionsToAdd; i++) {
        onAddOption();
      }
    } else if (rules.maxOptions > 0 && currentCount > rules.maxOptions) {
      // Need to remove options to meet maximum (only if maxOptions is not unlimited)
      const optionsToRemove = currentCount - rules.maxOptions;
      for (let i = 0; i < optionsToRemove; i++) {
        onRemoveOption(currentCount - 1 - i);
      }
    }
  }, [questionType, currentQuestionType, rules.minOptions, rules.maxOptions, options.length, onAddOption, onRemoveOption]);

  // Separate effect to set Verdadero/Falso texts for TF (Verdadero/Falso) type
  useEffect(() => {
    if (questionType === 'TF' && options.length === 2) {
      // Only set texts if they are not already set correctly
      if (options[0].text !== 'Verdadero') {
        onOptionTextChange(0, 'Verdadero');
      }
      if (options[1].text !== 'Falso') {
        onOptionTextChange(1, 'Falso');
      }
    }
  }, [questionType, options.length, options, onOptionTextChange]);

  return (
    <>
      {/* 1. CurriculumHierarchy Selection */}
      <Row>
        <Col md={4}>
          <AutocompleteSelect
            label="Asignatura"
            value={selectedSubject}
            onChange={(value) => onSubjectChange(String(value))}
            options={subjects.map(s => ({
              id: s.subject_id,
              name: s.name,
              description: s.code
            }))}
            placeholder="Busca una asignatura..."
            disabled={disabled}
            warningMessage={subjects.length === 0 ? "⚠️ No hay asignaturas disponibles" : undefined}
            required
          />
        </Col>
        <Col md={4}>
          <AutocompleteSelect
            label="Unidad"
            value={selectedUnit}
            onChange={(value) => onUnitChange(String(value))}
            options={units.map(u => ({
              id: u.unit_id,
              name: u.name,
              description: u.description
            }))}
            placeholder={!selectedSubject ? "Selecciona una asignatura primero..." : "Busca una unidad..."}
            disabled={!selectedSubject || disabled}
            warningMessage={hasNoUnits ? "⚠️ No hay unidades para esta asignatura" : undefined}
            required
          />
        </Col>
        <Col md={4}>
          <AutocompleteSelect
            label="Tema"
            value={selectedTopic}
            onChange={(value) => onTopicChange(String(value))}
            options={topics.map(t => ({
              id: t.topic_id,
              name: t.name,
              description: t.description
            }))}
            placeholder={!selectedUnit ? "Selecciona una unidad primero..." : "Busca un tema..."}
            disabled={!selectedUnit || disabled}
            isInvalid={getErrorsForField('topic_fk').length > 0}
            errorMessage={getErrorsForField('topic_fk')[0]?.message}
            warningMessage={hasNoTopics ? "⚠️ No hay temas para esta unidad" : undefined}
            required
          />
        </Col>
      </Row>

      {/* 2. Question Statement */}
      <Form.Group className="mb-4">
        <Form.Label>
          Enunciado de la Pregunta <span style={{ color: 'red' }}>*</span>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={enunciado}
          onChange={(e) => onEnunciadoChange(e.target.value)}
          placeholder="Escribe el texto de la pregunta..."
          isInvalid={getErrorsForField('enunciado').length > 0}
          disabled={disabled}
        />
        {getErrorsForField('enunciado').map((err, i) => (
          <Form.Control.Feedback key={i} type="invalid">
            {err.message}
          </Form.Control.Feedback>
        ))}
      </Form.Group>

      {/* 3. Taxonomy Selection */}
      <AutocompleteSelect
        label="Nivel de Taxonomía"
        value={selectedTaxonomy}
        onChange={(value) => onTaxonomyChange(String(value))}
        options={activeTaxonomies.map(t => ({
          id: t.taxonomyId,
          name: t.name,
          description: `Nivel ${t.level}: ${t.description || ''}`
        }))}
        placeholder="Busca un nivel de taxonomía..."
        disabled={disabled}
        isInvalid={getErrorsForField('taxonomy_fk').length > 0}
        errorMessage={getErrorsForField('taxonomy_fk')[0]?.message}
        warningMessage={activeTaxonomies.length === 0 ? "⚠️ No hay taxonomías disponibles" : undefined}
        required
      />

      {/* 4. Difficulty */}
      <AutocompleteSelect
        label="Nivel de dificultad"
        value={difficulty}
        onChange={(value) => onDifficultyChange(value as DifficultyLevel)}
        options={activeDifficulties.map(d => ({
          id: d.difficultyId,
          name: d.level,
          description: d.description
        }))}
        placeholder="Busca un nivel de dificultad..."
        disabled={disabled}
        isInvalid={getErrorsForField('difficulty_fk').length > 0}
        errorMessage={getErrorsForField('difficulty_fk')[0]?.message}
        required
      />

      {/* 5. Question Type */}
      <AutocompleteSelect
        label="Tipo de pregunta"
        value={questionType}
        onChange={(value) => onQuestionTypeChange(String(value) as QuestionType)}
        options={questionTypes
          .filter(qt => qt.active)
          .map(qt => ({
            id: qt.code,
            name: qt.name,
            description: qt.description
          }))}
        placeholder="Busca un tipo de pregunta..."
        disabled={disabled || questionTypes.length === 0}
        isInvalid={getErrorsForField('type').length > 0}
        errorMessage={getErrorsForField('type')[0]?.message}
        warningMessage={questionTypes.length === 0 ? "⚠️ Cargando tipos de pregunta..." : undefined}
        required
      />

      {/* 6. Options */}
      <div className="mb-4">
        {!currentQuestionType && (
          <Alert variant="info" className="mb-0">
            <strong>Alternativas: </strong><small>Selecciona un tipo de pregunta para configurar las alternativas</small>
          </Alert>
        )}
      </div>

      {/* 6.1. Options fields (if question type selected and minOptions > 0) */}
      {currentQuestionType && rules.minOptions > 0 && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Label className="mb-0">
              Alternativas <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <div className="d-flex gap-2">
              {questionType === 'TF' ? (
                <Badge bg="primary">
                  ✓ Opciones fijas: Verdadero / Falso
                </Badge>
              ) : (
                <>
                  <Badge bg="secondary">
                    {rules.minOptions === rules.maxOptions && rules.maxOptions > 0
                      ? `Exactamente ${rules.minOptions} opciones`
                      : rules.maxOptions === 0
                      ? `Mínimo ${rules.minOptions} opciones`
                      : `Entre ${rules.minOptions} y ${rules.maxOptions} opciones`}
                  </Badge>
                  <Badge bg="info">
                    Debe marcar {rules.correctOptions} {rules.correctOptions === 1 ? 'opción correcta' : 'opciones correctas'}
                  </Badge>
                </>
              )}
            </div>
          </div>

          {questionType === 'TF' && (
            <Alert variant="info" className="mb-3">
              <small>
                <strong>📌 Nota:</strong> Para preguntas de Verdadero/Falso, las alternativas están predefinidas. 
                Solo marca cuál es la respuesta correcta.
              </small>
            </Alert>
          )}

          {/* Mensaje cuando se alcanza el máximo de opciones correctas */}
          {questionType && rules.correctOptions > 0 && 
           options.filter(opt => opt.is_correct).length >= rules.correctOptions && (
            <Alert variant="success" className="mb-3">
              <small>
                <strong>✅ Máximo alcanzado:</strong> Ya has marcado {rules.correctOptions} {rules.correctOptions === 1 ? 'opción correcta' : 'opciones correctas'}. 
                Para marcar otra, primero desmarca una de las seleccionadas.
              </small>
            </Alert>
          )}

          {getErrorsForField('options').length > 0 && (
            <Alert variant="danger">
              {getErrorsForField('options').map((err, i) => (
                <div key={i}>{err.message}</div>
              ))}
            </Alert>
          )}

          {options.map((option, index) => (
            <div key={index} className="p-3 mb-2 border rounded">
              <Row className="align-items-center">
                <Col xs={1}>
                  <Badge bg="light" text="dark">
                    {option.position}
                  </Badge>
                </Col>
                <Col xs={7}>
                  <Form.Control
                    type="text"
                    value={option.text}
                    onChange={(e) => onOptionTextChange(index, e.target.value)}
                    placeholder={`Texto de la opción ${option.position}`}
                    isInvalid={getErrorsForField(`options[${index}].text`).length > 0}
                    disabled={disabled}
                    readOnly={questionType === 'TF'}
                    style={questionType === 'TF' ? { backgroundColor: '#e9ecef', cursor: 'not-allowed' } : {}}
                  />
                  {getErrorsForField(`options[${index}].text`).map((err, i) => (
                    <Form.Control.Feedback key={i} type="invalid">
                      {err.message}
                    </Form.Control.Feedback>
                  ))}
                </Col>
                <Col xs={3}>
                  <div 
                    title={
                      !option.is_correct && 
                      options.filter(opt => opt.is_correct).length >= rules.correctOptions
                        ? `Ya has marcado el máximo de ${rules.correctOptions} ${rules.correctOptions === 1 ? 'opción correcta' : 'opciones correctas'}`
                        : ''
                    }
                  >
                    <Form.Check
                      type="switch"
                      label="Correcta"
                      checked={option.is_correct}
                      onChange={(e) => onOptionCorrectChange(index, e.target.checked)}
                      disabled={
                        disabled || 
                        (!option.is_correct && 
                         options.filter(opt => opt.is_correct).length >= rules.correctOptions)
                      }
                    />
                  </div>
                </Col>
                <Col xs={1}>
                  {!(rules.minOptions === rules.maxOptions) && 
                   options.length > rules.minOptions && 
                   questionType !== 'TF' && 
                   !option.is_correct && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onRemoveOption(index)}
                      disabled={disabled}
                      title="Eliminar opción"
                    >
                      🗑️
                    </Button>
                  )}
                  {!(rules.minOptions === rules.maxOptions) && 
                   options.length > rules.minOptions && 
                   questionType !== 'TF' && 
                   option.is_correct && (
                    <span 
                      className="d-inline-block" 
                      style={{ opacity: 0.3, cursor: 'not-allowed' }}
                      title="No puedes eliminar una opción marcada como correcta. Primero desmárcala."
                    >
                      🔒
                    </span>
                  )}
                </Col>
              </Row>
            </div>
          ))}

          {/* Add option button (if allowed) */}
          {questionType !== 'TF' && !(rules.minOptions === rules.maxOptions) && (rules.maxOptions === 0 || options.length < rules.maxOptions) && (
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={onAddOption}
              disabled={disabled}
            >
              ➕ Agregar Opción
            </Button>
          )}
        </div>
      )}
    </>
  );
}
