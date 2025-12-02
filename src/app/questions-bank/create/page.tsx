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
  QuestionWithDetails,
} from '@/types/question';
import { questionStore } from '@/lib/questionStore';
import { useAuth } from '@/contexts/AuthContext';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import { useQuestions } from '@/hooks/useQuestions';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
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
  const { topics } = useCurriculumHierarchy();
  const { setHelpContent } = useHelpContent();
  
  // Cargar todas las preguntas para detectar duplicados
  const { questions: allQuestions } = useQuestions({
    searchText: '',
    includeInactive: true,
  });
  
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
  const [allowPartialScore, setAllowPartialScore] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  // UI state
  const [validationErrors, setValidationErrors] = useState<QuestionValidationError[]>([]);
  const [duplicateWarning, setDuplicateWarning] = useState<DuplicateDetectionResult | null>(null);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdQuestionId, setCreatedQuestionId] = useState('');
  const [similarQuestions, setSimilarQuestions] = useState<DuplicateDetectionResult | null>(null);

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

  // Detectar preguntas similares en tiempo real
  useEffect(() => {
    const timer = setTimeout(() => {
      // Requerir al menos enunciado con más de 10 caracteres
      if (enunciado.trim().length < 10 || allQuestions.length === 0) {
        setSimilarQuestions(null);
        return;
      }

      console.log('🔍 Buscando similares con filtros:', { 
        enunciadoLength: enunciado.trim().length,
        questionType: questionType || 'no seleccionado',
        selectedTopic: selectedTopic || 'no seleccionado',
        selectedUnit: selectedUnit || 'no seleccionado', 
        selectedSubject: selectedSubject || 'no seleccionado',
        difficulty: difficulty || 'no seleccionado',
        selectedTaxonomy: selectedTaxonomy || 'no seleccionado',
        totalQuestions: allQuestions.length 
      });
      
      // Función local de detección usando TODOS los campos seleccionados
      const detectSimilarQuestions = (): DuplicateDetectionResult => {
        const similarQuestions: QuestionWithDetails[] = [];
        const enunciadoLower = enunciado.toLowerCase().trim();
        const enunciadoWords = enunciadoLower.split(/\s+/).filter(w => w.length > 3);
        const optionsTexts = options.map(opt => opt.text).filter(t => t.trim().length > 0);
        const optionsLower = optionsTexts.map(t => t.toLowerCase().trim());
        const optionsWords = optionsLower.flatMap(opt => opt.split(/\s+/).filter(w => w.length > 3));

        for (const question of allQuestions) {
          // Aplicar filtros de coincidencia exacta (AND lógico)
          let matchesFilters = true;

          // Si hay tipo seleccionado, debe coincidir
          if (questionType && question.type !== questionType) {
            matchesFilters = false;
          }

          // Si hay tema seleccionado, debe coincidir
          if (selectedTopic && question.topic_fk !== selectedTopic) {
            matchesFilters = false;
          }

          // Si hay dificultad seleccionada, debe coincidir
          if (difficulty && question.difficulty_fk !== difficulty) {
            matchesFilters = false;
          }

          // Si hay taxonomía seleccionada, debe coincidir
          if (selectedTaxonomy && question.learning_outcome_fk !== selectedTaxonomy) {
            matchesFilters = false;
          }

          // Si no pasa los filtros de coincidencia exacta, saltar esta pregunta
          if (!matchesFilters) {
            continue;
          }

          // Calcular score de similitud en contenido
          let score = 0;

          // Similitud en enunciado: hasta 60 puntos
          const qEnunciadoLower = question.enunciado.toLowerCase();
          const matchingEnunciadoWords = enunciadoWords.filter(word => 
            word.length > 3 && qEnunciadoLower.includes(word)
          ).length;
          const textSimilarity = enunciadoWords.length > 0 
            ? (matchingEnunciadoWords / enunciadoWords.length) * 60 
            : 0;
          score += textSimilarity;

          // Similitud en opciones: hasta 40 puntos
          if (optionsWords.length > 0 && question.options && question.options.length > 0) {
            const qOptionsLower = question.options.map(opt => opt.text.toLowerCase());
            const qOptionsWords = qOptionsLower.flatMap(opt => opt.split(/\s+/).filter(w => w.length > 3));
            
            const matchingOptionsWords = optionsWords.filter(word => 
              qOptionsWords.some(qWord => qWord.includes(word) || word.includes(qWord))
            ).length;
            
            const optionsSimilarity = optionsWords.length > 0
              ? (matchingOptionsWords / optionsWords.length) * 40
              : 0;
            score += optionsSimilarity;
          }

          // Umbral de similitud: 30 puntos (más bajo porque ya filtramos por coincidencias exactas)
          if (score >= 30) {
            similarQuestions.push(question);
          }
        }

        // Ordenar por score de similitud (mayor primero)
        similarQuestions.sort((a, b) => {
          const scoreA = calculateDetailedScore(a);
          const scoreB = calculateDetailedScore(b);
          return scoreB - scoreA;
        });

        function calculateDetailedScore(q: QuestionWithDetails): number {
          let s = 0;
          const qEnunciadoLower = q.enunciado.toLowerCase();
          const matchingWords = enunciadoWords.filter(w => qEnunciadoLower.includes(w)).length;
          s += enunciadoWords.length > 0 ? (matchingWords / enunciadoWords.length) * 100 : 0;
          return s;
        }

        return {
          isDuplicate: similarQuestions.length > 0,
          similarQuestions,
          similarityScore: similarQuestions.length > 0 ? 70 : 0,
        };
      };

      const result = detectSimilarQuestions();
      console.log('✅ Resultado búsqueda:', result);
      setSimilarQuestions(result);
    }, 500);

    return () => clearTimeout(timer);
  }, [enunciado, questionType, selectedTopic, selectedUnit, selectedSubject, difficulty, selectedTaxonomy, options, allQuestions]);

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
      const optionsTexts = options.map(opt => opt.text).filter(t => t.trim().length > 0);
      const result = questionStore.detectDuplicates(enunciado, selectedTopic, questionType, optionsTexts);
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
        options: options,
        learning_outcome_fk: selectedTaxonomy || null,
        allowPartialScore: allowPartialScore,
        isPublic: isPublic,
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
          {/* Formulario principal - 2 columnas */}
          <Col lg={8}>
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
                    allowPartialScore={allowPartialScore}
                    onAllowPartialScoreChange={setAllowPartialScore}
                    isPublic={isPublic}
                    onIsPublicChange={setIsPublic}
                    options={options}
                    onOptionTextChange={handleOptionTextChange}
                    onOptionCorrectChange={handleOptionCorrectChange}
                    onAddOption={handleAddOption}
                    onRemoveOption={handleRemoveOption}
                    getErrorsForField={getErrorsForField}
                    disabled={isSubmitting || submitSuccess}
                    showDifficultyAsRadio={false}
                  />

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

          {/* Columna de preguntas similares */}
          <Col lg={4}>
            <Card className="border-warning border-2 sticky-top">
              <Card.Header className="bg-warning text-dark">
                <h5 className="mb-1">🔍 Preguntas Similares</h5>
                {(questionType || selectedTopic || difficulty || selectedTaxonomy) && (
                  <div className="mt-2" style={{ fontSize: '0.7rem' }}>
                    <div className="fw-bold mb-1">Filtros activos:</div>
                    <div className="d-flex flex-wrap gap-1">
                      {questionType && (
                        <span className="badge bg-secondary">
                          Tipo: {questionTypes.find(qt => qt.code === questionType)?.name || questionType}
                        </span>
                      )}
                      {selectedTopic && (
                        <span className="badge bg-secondary">
                          Tema: {topics.find(t => t.topic_id === selectedTopic)?.name || 'N/A'}
                        </span>
                      )}
                      {difficulty && (
                        <span className="badge bg-secondary">
                          Dificultad: {difficulties.find(d => d.difficultyId === difficulty)?.level || difficulty}
                        </span>
                      )}
                      {selectedTaxonomy && (
                        <span className="badge bg-secondary">
                          Taxonomía: {taxonomies.find(t => t.taxonomyId === selectedTaxonomy)?.name || 'N/A'}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Card.Header>
              <Card.Body style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
                {enunciado.trim().length < 10 ? (
                  <div className="text-center text-muted py-4">
                    <p className="mb-2">
                      💡 <strong>Escribe al menos 10 caracteres</strong>
                    </p>
                    <p className="mb-0">
                      <small>
                        La búsqueda de similares se activará automáticamente.<br />
                        Los campos seleccionados (tipo, tema, dificultad, taxonomía) se usarán como filtros.
                      </small>
                    </p>
                  </div>
                ) : similarQuestions === null ? (
                  <div className="text-center text-muted py-4">
                    <p className="mb-0">
                      <small>
                        ⏳ Buscando preguntas similares...
                      </small>
                    </p>
                  </div>
                ) : similarQuestions.isDuplicate ? (
                  <>
                    <Alert variant="warning" className="mb-3 py-2">
                      <div className="d-flex align-items-center">
                        <strong className="me-2">⚠️</strong>
                        <div>
                          <strong>{similarQuestions.similarQuestions.length}</strong> pregunta(s) similar(es)
                        </div>
                      </div>
                    </Alert>
                    {similarQuestions.similarQuestions.map((q) => (
                      <Card key={q.question_id} className="mb-3 shadow-sm border-0" style={{ borderLeft: '4px solid #ffc107' }}>
                        <Card.Body className="p-3">
                          {/* Header con badges */}
                          <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                            <div className="d-flex gap-1">
                              <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>
                                {questionTypes.find(qt => qt.code === q.type)?.name || q.type}
                              </span>
                              <span className="badge bg-primary" style={{ fontSize: '0.7rem' }}>
                                {difficulties.find(d => d.difficultyId === q.difficulty_fk)?.level || 'N/A'}
                              </span>
                              <span className="badge bg-info" style={{ fontSize: '0.7rem' }}>
                                v{q.version}
                              </span>
                            </div>
                            {!q.active && (
                              <span className="badge bg-warning" style={{ fontSize: '0.7rem' }}>
                                Inactiva
                              </span>
                            )}
                          </div>

                          {/* Enunciado */}
                          <div className="mb-3">
                            <div className="d-flex align-items-start">
                              <span className="text-primary me-2" style={{ fontSize: '1.2rem' }}>📝</span>
                              <div className="flex-grow-1">
                                <p className="mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                                  {q.enunciado}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Opciones */}
                          {q.options && q.options.length > 0 && (
                            <div className="mt-3 pt-2 border-top">
                              <div className="d-flex align-items-center mb-2">
                                <span className="text-secondary me-2" style={{ fontSize: '0.9rem' }}>📋</span>
                                <small className="text-muted fw-bold">Alternativas:</small>
                              </div>
                              <div className="ps-3">
                                {q.options.slice(0, 3).map((opt, optIdx) => (
                                  <div key={optIdx} className="d-flex align-items-start mb-2">
                                    <span className="me-2" style={{ fontSize: '0.9rem' }}>
                                      {opt.is_correct ? '✅' : '⭕'}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                                      {opt.text.length > 80 ? opt.text.substring(0, 80) + '...' : opt.text}
                                    </span>
                                  </div>
                                ))}
                                {q.options.length > 3 && (
                                  <div className="text-muted" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                                    + {q.options.length - 3} alternativa(s) más
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Footer con ID */}
                          <div className="mt-3 pt-2 border-top">
                            <small className="text-muted d-flex align-items-center" style={{ fontSize: '0.7rem' }}>
                              <span className="me-1">🔑</span>
                              ID: <code className="ms-1">{q.question_id.substring(0, 8)}...</code>
                            </small>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </>
                ) : (
                  <div className="text-center text-success py-4">
                    <h5>✅ No hay duplicados</h5>
                    <p className="text-muted mb-0">
                      <small>No se encontraron preguntas similares</small>
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ProtectedRoute>
  );
}
