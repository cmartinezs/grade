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

import { Form, Card, Row, Col, Badge, Alert, Button } from 'react-bootstrap';
import {
  QuestionType,
  DifficultyLevel,
  CreateQuestionOptionInput,
  QuestionValidationError,
} from '@/types/question';
import { QUESTION_TYPE_RULES } from '@/lib/questionStore';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
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
  
  // Filter active items
  const subjects: Subject[] = allSubjects.filter((s) => s.active && !s.deleted_at);
  const units: Unit[] = selectedSubject
    ? allUnits.filter((u) => u.subject_fk === selectedSubject && u.active && !u.deleted_at)
    : [];
  const topics: Topic[] = selectedUnit
    ? allTopics.filter((t) => t.unit_fk === selectedUnit && t.active && !t.deleted_at)
    : [];

  // Get difficulty levels from store
  const difficultyLevels = [
    { difficulty_id: 'bajo' as DifficultyLevel, name: 'Bajo', description: 'Nivel de dificultad básico', active: true },
    { difficulty_id: 'medio' as DifficultyLevel, name: 'Medio', description: 'Nivel de dificultad intermedio', active: true },
    { difficulty_id: 'alto' as DifficultyLevel, name: 'Alto', description: 'Nivel de dificultad avanzado', active: true },
  ];

  // Check for missing CurriculumHierarchy levels
  const selectedSubjectData = subjects.find(s => s.subject_id === selectedSubject);
  const selectedUnitData = units.find(u => u.unit_id === selectedUnit);
  const hasNoUnits = selectedSubject && units.length === 0;
  const hasNoTopics = selectedUnit && topics.length === 0;

  const rules = QUESTION_TYPE_RULES[questionType];

  return (
    <>
      {/* Question Type */}
      <Card className="mb-3">
        <Card.Header>
          <strong>Tipo de Pregunta *</strong>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Select
              value={questionType}
              onChange={(e) => onQuestionTypeChange(e.target.value as QuestionType)}
              isInvalid={getErrorsForField('type').length > 0}
              disabled={disabled}
            >
              {Object.values(QUESTION_TYPE_RULES).map((rule) => (
                <option key={rule.type} value={rule.type}>
                  {rule.name}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-muted">{rules.description}</Form.Text>
            {getErrorsForField('type').map((err, i) => (
              <Form.Control.Feedback key={i} type="invalid" style={{ display: 'block' }}>
                {err.message}
              </Form.Control.Feedback>
            ))}
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Question Statement */}
      <Card className="mb-3">
        <Card.Header>
          <strong>Enunciado de la Pregunta *</strong>
        </Card.Header>
        <Card.Body>
          <Form.Group>
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
        </Card.Body>
      </Card>

      {/* CurriculumHierarchy Selection */}
      <Card className="mb-3">
        <Card.Header>
          <strong>Jerarquía Curricular *</strong>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-2">
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
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
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
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
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
              </Form.Group>
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
        </Card.Body>
      </Card>

      {/* Difficulty */}
      <Card className="mb-3">
        <Card.Header>
          <strong>Dificultad *</strong>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            {showDifficultyAsRadio ? (
              <div className="d-flex gap-2">
                {difficultyLevels.map((level) => (
                  <Form.Check
                    key={level.difficulty_id}
                    type="radio"
                    id={`difficulty-${level.difficulty_id}`}
                    label={level.name}
                    name="difficulty"
                    value={level.difficulty_id}
                    checked={difficulty === level.difficulty_id}
                    onChange={(e) => onDifficultyChange(e.target.value as DifficultyLevel)}
                    disabled={disabled}
                  />
                ))}
              </div>
            ) : (
              <Form.Select
                value={difficulty}
                onChange={(e) => onDifficultyChange(e.target.value as DifficultyLevel)}
                isInvalid={getErrorsForField('difficulty_fk').length > 0}
                disabled={disabled}
              >
                {difficultyLevels.map((level) => (
                  <option key={level.difficulty_id} value={level.difficulty_id}>
                    {level.name}
                  </option>
                ))}
              </Form.Select>
            )}
            {getErrorsForField('difficulty_fk').map((err, i) => (
              <div key={i} className="text-danger small mt-1">
                {err.message}
              </div>
            ))}
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Options (if not desarrollo) */}
      {questionType !== 'desarrollo' && (
        <Card className="mb-3">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <strong>Alternativas *</strong>
            <Badge bg="secondary">
              {rules.minOptions === rules.maxOptions
                ? `Exactamente ${rules.minOptions} opciones`
                : `Mínimo ${rules.minOptions} opciones`}
            </Badge>
          </Card.Header>
          <Card.Body>
            {getErrorsForField('options').length > 0 && (
              <Alert variant="danger">
                {getErrorsForField('options').map((err, i) => (
                  <div key={i}>{err.message}</div>
                ))}
              </Alert>
            )}

            {options.map((option, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
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
                </Card.Body>
              </Card>
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
          </Card.Body>
        </Card>
      )}
    </>
  );
}
