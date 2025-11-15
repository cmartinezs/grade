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

import { Form, Row, Col, Badge, Alert, Button } from 'react-bootstrap';
import {
  QuestionType,
  DifficultyLevel,
  CreateQuestionOptionInput,
  QuestionValidationError,
} from '@/types/question';
import { QUESTION_TYPE_RULES } from '@/lib/questionStore';
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
  showDifficultyAsRadio = false,
}: QuestionFormFieldsProps) {
  
  // Load CurriculumHierarchy data from Data Connect
  const { subjects: allSubjects, units: allUnits, topics: allTopics } = useCurriculumHierarchy();
  
  // Load Taxonomies data from Data Connect
  const { taxonomies } = useTaxonomies();
  
  // Load Question Types from Data Connect
  const { questionTypes } = useQuestionTypes();
  
  // Load Difficulties from Data Connect
  const { difficulties } = useDifficulties();
  
  // Helper function to validate and convert question type code to QuestionType
  const validateQuestionType = (code: string | number): QuestionType => {
    const codeStr = String(code);
    const validTypes: QuestionType[] = ['verdadero_falso', 'seleccion_unica', 'seleccion_multiple', 'desarrollo'];
    
    if (validTypes.includes(codeStr as QuestionType)) {
      return codeStr as QuestionType;
    }
    
    // If code doesn't match, try to find the question type by matching with the fetched types
    const matchingType = questionTypes.find(qt => qt.code === codeStr);
    if (matchingType) {
      // Try to extract the type from the name if possible
      const name = matchingType.name.toLowerCase();
      if (name.includes('verdadero') || name.includes('falso')) return 'verdadero_falso';
      if (name.includes('múltiple')) return 'seleccion_multiple';
      if (name.includes('selección') || name.includes('seleccion')) return 'seleccion_unica';
      if (name.includes('desarrollo') || name.includes('abierta')) return 'desarrollo';
    }
    
    // Default fallback
    return 'seleccion_unica';
  };
  
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
  const selectedSubjectData = subjects.find(s => s.subject_id === selectedSubject);
  const selectedUnitData = units.find(u => u.unit_id === selectedUnit);
  const hasNoUnits = selectedSubject && units.length === 0;
  const hasNoTopics = selectedUnit && topics.length === 0;

  // Get rules for the current question type
  const rules = QUESTION_TYPE_RULES[questionType] || QUESTION_TYPE_RULES.seleccion_unica;

  return (
    <>
      {/* 1. CurriculumHierarchy Selection */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">Jerarquía Curricular *</h6>
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

        {/* Warning: No units for selected subject */}
        {hasNoUnits && (
          <Alert variant="warning" className="mb-0 mt-2">
            <div className="d-flex align-items-start">
              <span className="me-2">⚠️</span>
              <div>
                <strong>La asignatura &ldquo;{selectedSubjectData?.name}&rdquo; no tiene unidades.</strong>
                <p className="mb-0 mt-1 small">
                  Para poder crear una pregunta, primero debes crear al menos una unidad para esta asignatura.
                  Ve a <strong>Gestión de Taxonomías</strong> para agregar unidades.
                </p>
              </div>
            </div>
          </Alert>
        )}

        {/* Warning: No topics for selected unit */}
        {hasNoTopics && (
          <Alert variant="warning" className="mb-0 mt-2">
            <div className="d-flex align-items-start">
              <span className="me-2">⚠️</span>
              <div>
                <strong>La unidad &ldquo;{selectedUnitData?.name}&rdquo; no tiene temas.</strong>
                <p className="mb-0 mt-1 small">
                  Para poder crear una pregunta, primero debes crear al menos un tema para esta unidad.
                  Ve a <strong>Gestión de Taxonomías</strong> para agregar temas.
                </p>
              </div>
            </div>
          </Alert>
        )}
      </div>

      {/* 2. Taxonomy Selection */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">Taxonomía (Bloom) *</h6>
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
      </div>

      {/* 3. Question Type */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">Tipo de Pregunta *</h6>
        <AutocompleteSelect
          label="Tipo"
          value={questionType}
          onChange={(value) => onQuestionTypeChange(validateQuestionType(value))}
          options={questionTypes.map(qt => ({
            id: qt.code,
            name: qt.name,
            description: qt.description
          }))}
          placeholder="Busca un tipo de pregunta..."
          disabled={disabled}
          isInvalid={getErrorsForField('type').length > 0}
          errorMessage={getErrorsForField('type')[0]?.message}
          required
        />
      </div>

      {/* 4. Difficulty */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">Dificultad *</h6>
        {showDifficultyAsRadio ? (
          <div className="d-flex gap-2">
            {activeDifficulties.map((level) => (
              <Form.Check
                key={level.difficultyId}
                type="radio"
                id={`difficulty-${level.difficultyId}`}
                label={level.level}
                name="difficulty"
                value={level.difficultyId}
                checked={difficulty === level.difficultyId}
                onChange={(e) => onDifficultyChange(e.target.value as DifficultyLevel)}
                disabled={disabled}
              />
            ))}
          </div>
        ) : (
          <AutocompleteSelect
            label="Nivel"
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
        )}
      </div>

      {/* 5. Question Statement */}
      <Form.Group className="mb-3">
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

      {/* 6. Options (if not desarrollo) */}
      {questionType !== 'desarrollo' && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Label className="mb-0">
              Alternativas <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Badge bg="secondary">
              {rules.minOptions === rules.maxOptions
                ? `Exactamente ${rules.minOptions} opciones`
                : `Mínimo ${rules.minOptions} opciones`}
            </Badge>
          </div>

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
                    readOnly={questionType === 'verdadero_falso'}
                  />
                  {getErrorsForField(`options[${index}].text`).map((err, i) => (
                    <Form.Control.Feedback key={i} type="invalid">
                      {err.message}
                    </Form.Control.Feedback>
                  ))}
                </Col>
                <Col xs={3}>
                  <Form.Check
                    type="checkbox"
                    label="Correcta"
                    checked={option.is_correct}
                    onChange={(e) => onOptionCorrectChange(index, e.target.checked)}
                    disabled={disabled}
                  />
                </Col>
                <Col xs={1}>
                  {questionType !== 'verdadero_falso' && options.length > rules.minOptions && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onRemoveOption(index)}
                      disabled={disabled}
                    >
                      🗑️
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          ))}

          {/* Add option button (if allowed) */}
          {questionType !== 'verdadero_falso' && (!rules.maxOptions || options.length < rules.maxOptions) && (
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={onAddOption}
              disabled={disabled}
            >
              ➕ Agregar Opción
            </Button>
          )}

          {rules.exactlyOneCorrect && (
            <Form.Text className="text-info d-block mt-2">
              ℹ️ Debe marcar exactamente una opción como correcta
            </Form.Text>
          )}
          {rules.atLeastOneCorrect && !rules.exactlyOneCorrect && (
            <Form.Text className="text-info d-block mt-2">
              ℹ️ Debe marcar al menos una opción como correcta
            </Form.Text>
          )}
        </div>
      )}
    </>
  );
}
