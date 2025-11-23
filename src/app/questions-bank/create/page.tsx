'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useHelpContent } from '@/contexts/HelpContext';
import {
  QuestionType,
  DifficultyLevel,
  CreateQuestionInput,
  CreateQuestionOptionInput,
  QuestionValidationError,
  DuplicateDetectionResult,
} from '@/types/question';
import { questionStore } from '@/lib/questionStore';
import { useAuth } from '@/contexts/AuthContext';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import { createNewQuestion, mapQuestionTypeCodeToId } from '@/lib/questionConnect';
import { getUserByEmail } from '@/dataconnect-generated';
import QuestionFormFields from '../components/shared/QuestionFormFields';
import { QuestionCreateHelp } from './QuestionCreateHelp';

export default function CreateQuestionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { questionTypes } = useQuestionTypes();
  const { difficulties } = useDifficulties();
  const { taxonomies } = useTaxonomies();
  const { setHelpContent } = useHelpContent();
  
  // Form state
  const [questionType, setQuestionType] = useState<QuestionType>('' as QuestionType);
  const [enunciado, setEnunciado] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedTaxonomy, setSelectedTaxonomy] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('' as DifficultyLevel);
  const [options, setOptions] = useState<CreateQuestionOptionInput[]>([
    { text: '', is_correct: false, position: 1 },
    { text: '', is_correct: false, position: 2 },
  ]);

  // UI state
  const [validationErrors, setValidationErrors] = useState<QuestionValidationError[]>([]);
  const [duplicateWarning, setDuplicateWarning] = useState<DuplicateDetectionResult | null>(null);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdQuestionId, setCreatedQuestionId] = useState('');

  // Definir el contenido de ayuda cuando la página carga
  useEffect(() => {
    setHelpContent({
      title: '➕ Nueva Pregunta',
      children: <QuestionCreateHelp />,
    });

    // Limpiar cuando el componente se desmonta
    return () => setHelpContent(null);
  }, [setHelpContent]);

  // Update options when question type changes
  useEffect(() => {
    if (questionTypes.length === 0 || !questionType) return;
    
    const currentQuestionType = questionTypes.find(qt => qt.code === questionType);
    if (!currentQuestionType) return;
    
    const minOptions = currentQuestionType.minOptions || 0;
    
    if (minOptions === 0) {
      setOptions([]);
    } else {
      setOptions((prevOptions) => {
        if (prevOptions.length < minOptions) {
          const newOptions = [...prevOptions];
          while (newOptions.length < minOptions) {
            newOptions.push({
              text: '',
              is_correct: false,
              position: newOptions.length + 1,
            });
          }
          return newOptions;
        }
        return prevOptions;
      });
    }
  }, [questionType, questionTypes]);

  const handleAddOption = () => {
    setOptions([
      ...options,
      { text: '', is_correct: false, position: options.length + 1 },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    newOptions.forEach((opt, i) => {
      opt.position = i + 1;
    });
    setOptions(newOptions);
  };

  const handleOptionTextChange = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleOptionCorrectChange = (index: number, isCorrect: boolean) => {
    const newOptions = [...options];
    const currentQuestionType = questionTypes.find(qt => qt.code === questionType);
    const correctOptions = currentQuestionType?.correctOptions || 1;
    
    if (correctOptions === 1) {
      newOptions.forEach((opt, i) => {
        opt.is_correct = i === index ? isCorrect : false;
      });
    } else {
      newOptions[index].is_correct = isCorrect;
    }
    
    setOptions(newOptions);
  };

  const checkForDuplicates = () => {
    if (enunciado.trim() && selectedTopic) {
      const result = questionStore.detectDuplicates(enunciado, selectedTopic, questionType);
      if (result.isDuplicate) {
        setDuplicateWarning(result);
        setShowDuplicateWarning(true);
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent, forceSave = false) => {
    e.preventDefault();
    setValidationErrors([]);
    setIsSubmitting(true);

    try {
      if (!forceSave && !showDuplicateWarning) {
        const hasDuplicates = checkForDuplicates();
        if (hasDuplicates) {
          setIsSubmitting(false);
          return;
        }
      }

      const input: CreateQuestionInput = {
        type: questionType,
        enunciado: enunciado.trim(),
        topic_fk: selectedTopic,
        difficulty_fk: difficulty,
        options: questionType === 'desarrollo' ? [] : options,
        learning_outcome_fk: selectedTaxonomy || null,
      };

      if (!user?.firebaseUid || !user?.email) {
        throw new Error('Usuario no autenticado');
      }

      const userResult = await getUserByEmail({ email: user.email });
      const userData = userResult.data?.users?.[0];
      
      if (!userData?.userId) {
        throw new Error('Usuario no encontrado en Data Connect');
      }

      const questionTypeId = mapQuestionTypeCodeToId(questionType, questionTypes);
      
      if (!questionTypeId) {
        throw new Error(`Tipo de pregunta no encontrado: ${questionType}`);
      }
      
      const difficultyExists = difficulties.find(d => d.difficultyId === difficulty);
      if (!difficultyExists) {
        throw new Error(`Dificultad no encontrada: ${difficulty}`);
      }

      let taxonomyId = selectedTaxonomy;
      if (!taxonomyId && taxonomies.length > 0) {
        taxonomyId = taxonomies[0].taxonomyId;
      }
      
      if (!taxonomyId) {
        throw new Error('No hay taxonomías disponibles');
      }

      const createdQuestion = await createNewQuestion(
        input,
        questionTypeId,
        difficulty,
        taxonomyId,
        userData.userId,
        user.firebaseUid
      );
      
      const newQuestionId = createdQuestion.questionId;
      
      console.log('✅ Pregunta creada en Data Connect:', newQuestionId);
      
      setSubmitSuccess(true);
      setCreatedQuestionId(newQuestionId);
      
      setTimeout(() => {
        router.push('/questions-bank');
      }, 2000);

    } catch (error) {
      if (error instanceof Error) {
        const errorMsg = error.message;
        if (errorMsg.startsWith('Validation errors:')) {
          const errors: QuestionValidationError[] = [];
          const parts = errorMsg.split('Validation errors:')[1].split(',');
          parts.forEach(part => {
            const [field, message] = part.split(':').map(s => s.trim());
            if (field && message) {
              errors.push({ field, message });
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

  const handleForceSave = (e: React.FormEvent) => {
    setShowDuplicateWarning(false);
    handleSubmit(e, true);
  };

  const handleCancelDuplicate = () => {
    setShowDuplicateWarning(false);
    setDuplicateWarning(null);
  };

  const getErrorsForField = (field: string) => {
    return validationErrors.filter(e => e.field === field);
  };

  return (
    <ProtectedRoute>
      <Container fluid className="py-4">
        {submitSuccess && (
          <Row className="mb-4">
            <Col>
              <Alert variant="success">
                <Alert.Heading>✅ Pregunta creada exitosamente!</Alert.Heading>
                <p>ID de la pregunta: <strong>{createdQuestionId}</strong></p>
                <p className="mb-0">Redirigiendo al banco de preguntas...</p>
              </Alert>
            </Col>
          </Row>
        )}

        {getErrorsForField('general').length > 0 && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger" dismissible onClose={() => setValidationErrors([])}>
                {getErrorsForField('general').map((err, i) => (
                  <div key={i}>❌ {err.message}</div>
                ))}
              </Alert>
            </Col>
          </Row>
        )}

        {showDuplicateWarning && duplicateWarning && (
          <Row className="mb-4">
            <Col>
              <Alert variant="warning">
                <Alert.Heading>⚠️ Posible Duplicado Detectado</Alert.Heading>
                <p>Se encontraron {duplicateWarning.similarQuestions.length} pregunta(s) similar(es):</p>
                <ul className="mb-3">
                  {duplicateWarning.similarQuestions.slice(0, 3).map((q) => (
                    <li key={q.question_id}>
                      <small>{q.enunciado.substring(0, 100)}...</small>
                    </li>
                  ))}
                </ul>
                <div className="d-flex gap-2">
                  <Button variant="warning" size="sm" onClick={handleForceSave}>
                    Continuar de Todas Formas
                  </Button>
                  <Button variant="outline-secondary" size="sm" onClick={handleCancelDuplicate}>
                    Cancelar
                  </Button>
                </div>
              </Alert>
            </Col>
          </Row>
        )}

        <Row>
          {/* Formulario principal */}
          <Col>
            <Card className="border-primary border-2">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">➕ Nueva Pregunta</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e) => handleSubmit(e, false)}>
                  <QuestionFormFields
                    questionType={questionType}
                    onQuestionTypeChange={setQuestionType}
                    enunciado={enunciado}
                    onEnunciadoChange={setEnunciado}
                    selectedSubject={selectedSubject}
                    selectedUnit={selectedUnit}
                    selectedTopic={selectedTopic}
                    onSubjectChange={(value) => {
                      setSelectedSubject(value);
                      setSelectedUnit('');
                      setSelectedTopic('');
                    }}
                    onUnitChange={(value) => {
                      setSelectedUnit(value);
                      setSelectedTopic('');
                    }}
                    onTopicChange={setSelectedTopic}
                    selectedTaxonomy={selectedTaxonomy}
                    onTaxonomyChange={setSelectedTaxonomy}
                    difficulty={difficulty}
                    onDifficultyChange={setDifficulty}
                    options={options}
                    onOptionTextChange={handleOptionTextChange}
                    onOptionCorrectChange={handleOptionCorrectChange}
                    onAddOption={handleAddOption}
                    onRemoveOption={handleRemoveOption}
                    getErrorsForField={getErrorsForField}
                    disabled={isSubmitting || submitSuccess}
                    showDifficultyAsRadio={false}
                  />

                  {questionType === 'desarrollo' && (
                    <Alert variant="info" className="mt-3">
                      <strong>Nota:</strong> Las preguntas de desarrollo no requieren alternativas predefinidas.
                      Se pueden agregar criterios de corrección y rúbricas en una versión futura.
                    </Alert>
                  )}

                  <div className="d-flex gap-2 justify-content-end mt-4">
                    <Button
                      variant="outline-secondary"
                      onClick={() => router.push('/questions-bank')}
                      disabled={isSubmitting}
                    >
                      ❌ Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting || showDuplicateWarning || !selectedTopic || submitSuccess}
                      title={
                        !selectedTopic
                          ? 'Debes seleccionar un tema para continuar'
                          : ''
                      }
                    >
                      {isSubmitting ? '⏳ Guardando...' : '💾 Guardar Pregunta'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ProtectedRoute>
  );
}
