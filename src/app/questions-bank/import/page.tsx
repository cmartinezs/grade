'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Alert, Table, Badge, Row, Col, ProgressBar } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useHelpContent } from '@/contexts/HelpContext';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { useAuth } from '@/contexts/AuthContext';
import { createQuestion, createQuestionOption } from '@/dataconnect-generated';
import { generateUUID } from '@/lib/uuid';
import { QuestionImportHelp } from './QuestionImportHelp';
import {
  parseQuestionRowToObject,
  validateQuestionHeaders,
  validateQuestionRow,
  buildTopicMaps,
  buildDifficultyMaps,
  buildTaxonomyMaps,
  buildQuestionTypeMaps,
  type QuestionEntityMaps,
  QUESTION_PROGRESS,
} from './questionCsvUtils';

export default function ImportQuestionsPage() {
  const { setHelpContent } = useHelpContent();
  const { user } = useAuth();
  const { questionTypes } = useQuestionTypes();
  const { difficulties } = useDifficulties();
  const { taxonomies } = useTaxonomies();
  const { topics } = useCurriculumHierarchy();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [parsedData, setParsedData] = useState<{ totalQuestions: number; totalOptions: number } | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [encodingWarning, setEncodingWarning] = useState<string | null>(null);

  /**
   * Lee un archivo de texto intentando diferentes codificaciones
   * Prioriza UTF-8, luego intenta Windows-1252/Latin-1 si detecta problemas
   */
  const readFileWithEncoding = async (file: File): Promise<string> => {
    let text = await file.text();
    
    // Remover BOM si existe (común en archivos de Excel)
    if (text.charCodeAt(0) === 0xFEFF) {
      text = text.substring(1);
    }
    
    // Detectar si hay caracteres corruptos típicos de UTF-8 mal interpretado
    const corruptPatterns = [
      /Ã¡/g, /Ã©/g, /Ã­/g, /Ã³/g, /Ãº/g, /Ã±/g, /Ã/g,
    ];
    
    const hasCorruptChars = corruptPatterns.some(pattern => pattern.test(text));
    
    if (hasCorruptChars) {
      console.warn('Detectados caracteres potencialmente corruptos, intentando re-codificación...');
      setEncodingWarning('Se detectó un problema de codificación. Se intentó corregir automáticamente.');
      try {
        const arrayBuffer = await file.arrayBuffer();
        const decoder = new TextDecoder('windows-1252');
        text = decoder.decode(arrayBuffer);
        if (text.charCodeAt(0) === 0xFEFF) {
          text = text.substring(1);
        }
      } catch {
        console.warn('No se pudo re-codificar, usando texto original');
      }
    } else {
      setEncodingWarning(null);
    }
    
    return text;
  };

  /**
   * Construye los mapas de entidades para validación
   */
  const buildEntityMaps = (): QuestionEntityMaps => {
    // Mapas de topics
    const topicMaps = buildTopicMaps(topics.map(t => ({
      topicId: t.topic_id,
      code: t.code,
      name: t.name,
      active: t.active
    })));
    
    // Mapas de difficulties
    const difficultyMaps = buildDifficultyMaps(difficulties.map(d => ({
      difficultyId: d.difficultyId,
      code: d.code,
      level: d.level,
      active: d.active ?? true
    })));
    
    // Mapas de taxonomies
    const taxonomyMaps = buildTaxonomyMaps(taxonomies.map(t => ({
      taxonomyId: t.taxonomyId,
      code: t.code,
      name: t.name,
      active: t.active ?? true
    })));
    
    // Mapas de question types
    const questionTypeMaps = buildQuestionTypeMaps(questionTypes.map(qt => ({
      questionTypeId: qt.questionTypeId,
      code: qt.code,
      name: qt.name,
      minOptions: qt.minOptions,
      maxOptions: qt.maxOptions,
      correctOptions: qt.correctOptions,
      active: qt.active ?? true
    })));
    
    return {
      ...topicMaps,
      ...difficultyMaps,
      ...taxonomyMaps,
      ...questionTypeMaps,
    };
  };

  /**
   * Valida el archivo CSV antes de importar
   */
  const validateAndSetFile = async (file: File) => {
    // Validar tipo de archivo
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
      setUploadMessage({ type: 'error', text: 'Por favor selecciona un archivo CSV válido' });
      return;
    }
    
    // Validar tamaño del archivo (máximo 2MB)
    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setUploadMessage({ 
        type: 'error', 
        text: `El archivo es demasiado grande (${fileSizeMB} MB). El tamaño máximo permitido es ${maxSizeMB} MB.` 
      });
      return;
    }

    setSelectedFile(file);
    setUploadMessage(null);
    setValidationErrors([]);
    setValidationStatus('validating');
    setUploadProgress(0);
    setValidationMessage('Leyendo archivo...');

    try {
      setUploadProgress(1);
      const text = await readFileWithEncoding(file);
      const lines = text.split(/\r?\n/).filter(line => line.trim());

      setUploadProgress(2);

      if (lines.length < 2) {
        setValidationErrors(['El archivo está vacío o solo tiene encabezados']);
        setValidationStatus('invalid');
        setValidationMessage('');
        setUploadProgress(0);
        return;
      }

      setUploadProgress(3);
      setValidationMessage('Validando encabezados...');

      // Validar encabezados
      const headerErrors = validateQuestionHeaders(lines[0]);
      if (headerErrors.length > 0) {
        setUploadProgress(100);
        setValidationMessage('');
        await new Promise(resolve => setTimeout(resolve, 300));
        setValidationErrors(headerErrors);
        setValidationStatus('invalid');
        setUploadMessage({ type: 'error', text: `Se encontraron ${headerErrors.length} error(es) en el formato del archivo` });
        return;
      }

      setUploadProgress(QUESTION_PROGRESS.PREP_PERCENT);
      setValidationMessage('Construyendo mapas de entidades...');

      // Construir mapas de entidades
      const entityMaps = buildEntityMaps();
      
      const dataLines = lines.slice(1);
      const totalRows = dataLines.length;
      const allErrors: string[] = [];
      let totalOptions = 0;

      // Validar cada fila
      setValidationMessage('Validando datos de las preguntas...');
      const validationPercent = QUESTION_PROGRESS.VALIDATION_PERCENT;
      
      for (let i = 0; i < dataLines.length; i++) {
        const line = dataLines[i];
        if (!line.trim()) continue;
        
        const rowNumber = i + 2; // +1 por header, +1 por base-1
        const parsedRow = parseQuestionRowToObject(line);
        const result = validateQuestionRow(parsedRow, rowNumber, entityMaps);
        
        if (!result.isValid) {
          allErrors.push(...result.errors);
        } else {
          totalOptions += parsedRow.opciones.length;
        }
        
        // Actualizar progreso cada 10 filas o al final
        if (i % 10 === 0 || i === dataLines.length - 1) {
          const progress = 15 + ((i + 1) / totalRows) * validationPercent;
          setUploadProgress(Math.min(progress, 95));
          setValidationMessage(`Validando fila ${i + 1} de ${totalRows}...`);
        }
      }

      // Limitar errores mostrados
      const MAX_ERRORS = 20;
      if (allErrors.length > MAX_ERRORS) {
        const truncated = allErrors.slice(0, MAX_ERRORS);
        truncated.push(`... y ${allErrors.length - MAX_ERRORS} errores más`);
        setValidationErrors(truncated);
      } else {
        setValidationErrors(allErrors);
      }

      // Completar el progreso al 100% ANTES de cambiar el estado
      setUploadProgress(100);
      await new Promise(resolve => setTimeout(resolve, 400)); // Esperar a que la barra llegue al 100%
      setValidationMessage('Validación completada');
      await new Promise(resolve => setTimeout(resolve, 500)); // Mostrar mensaje de completado
      setValidationMessage('');
      
      if (allErrors.length > 0) {
        setValidationStatus('invalid');
        setUploadMessage({ 
          type: 'error', 
          text: `Se encontraron ${allErrors.length} error(es) de validación. Revisa los detalles abajo.` 
        });
      } else {
        setValidationStatus('valid');
        setParsedData({
          totalQuestions: totalRows,
          totalOptions
        });
        setUploadMessage({ 
          type: 'success', 
          text: `✅ Archivo válido: ${totalRows} pregunta(s) con ${totalOptions} opción(es) listas para importar` 
        });
      }
    } catch (error) {
      console.error('Error validating file:', error);
      setValidationErrors(['Error al leer el archivo. Verifica que sea un CSV válido con codificación UTF-8']);
      setValidationStatus('invalid');
      setUploadMessage({ type: 'error', text: 'Error al procesar el archivo' });
      setUploadProgress(0);
      setValidationMessage('');
    }
  };

  // Configurar contenido de ayuda
  useEffect(() => {
    setHelpContent({
      title: 'Importar Preguntas',
      children: <QuestionImportHelp />,
    });
    return () => setHelpContent(null);
  }, [setHelpContent]);

  /**
   * Genera plantilla CSV de ejemplo
   */
  const downloadTemplate = () => {
    try {
      const headers = [
        'tipo_pregunta',
        'enunciado',
        'asignatura',
        'unidad',
        'tema',
        'dificultad',
        'taxonomia',
        'opcion_1',
        'opcion_1_correcta',
        'opcion_2',
        'opcion_2_correcta',
        'opcion_3',
        'opcion_3_correcta',
        'opcion_4',
        'opcion_4_correcta',
        'opcion_5',
        'opcion_5_correcta'
      ].join(';');

      // Ejemplo con valores reales si existen
      const exampleTopic = topics.find(t => t.active)?.name || 'Tema Ejemplo';
      const exampleDifficulty = difficulties.find(d => d.active)?.level || 'Fácil';
      const exampleTaxonomy = taxonomies.find(t => t.active)?.name || 'Recordar';
      const exampleQuestionType = questionTypes.find(qt => qt.active)?.code || 'MC4';

      const exampleRow = [
        exampleQuestionType,
        '¿Cuál es la capital de Chile?',
        'Geografía',
        'Unidad 1',
        exampleTopic,
        exampleDifficulty,
        exampleTaxonomy,
        'Santiago',
        'SI',
        'Valparaíso',
        'NO',
        'Concepción',
        'NO',
        'Temuco',
        'NO',
        '',
        ''
      ].join(';');

      const csvContent = '\uFEFF' + headers + '\n' + exampleRow;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'plantilla_preguntas.csv';
      link.click();
      URL.revokeObjectURL(url);

      setDownloadMessage({ type: 'success', text: 'Plantilla descargada exitosamente' });
      setTimeout(() => setDownloadMessage(null), 3000);
    } catch {
      setDownloadMessage({ type: 'error', text: 'Error al descargar la plantilla' });
    }
  };

  /**
   * Maneja el proceso de importación
   */
  const handleImport = async () => {
    if (!selectedFile || !user) {
      setUploadMessage({ type: 'error', text: 'Por favor selecciona un archivo' });
      return;
    }

    if (validationStatus !== 'valid') {
      setUploadMessage({ type: 'error', text: 'El archivo debe ser validado correctamente antes de importar' });
      return;
    }

    setIsLoading(true);
    setImportProgress(0);
    setImportStatus('Iniciando importación...');
    setUploadMessage(null);

    try {
      const text = await readFileWithEncoding(selectedFile);
      const lines = text.split(/\r?\n/).filter(line => line.trim());
      const dataLines = lines.slice(1); // Quitar header

      setImportStatus('Construyendo mapas de entidades...');
      setImportProgress(5);

      // Construir mapas de entidades
      const entityMaps = buildEntityMaps();

      let questionsCreated = 0;
      let optionsCreated = 0;
      const totalQuestions = dataLines.length;

      // Procesar cada pregunta
      for (let i = 0; i < dataLines.length; i++) {
        const line = dataLines[i];
        if (!line.trim()) continue;

        const rowNumber = i + 2;
        const parsedRow = parseQuestionRowToObject(line);
        
        // Re-validar para obtener los IDs resueltos
        const validation = validateQuestionRow(parsedRow, rowNumber, entityMaps);
        
        if (!validation.isValid || !validation.resolvedIds) {
          throw new Error(`Error en fila ${rowNumber}: ${validation.errors.join(', ')}`);
        }

        const { topicId, difficultyId, taxonomyId, questionTypeId } = validation.resolvedIds;

        setImportStatus(`Creando pregunta ${i + 1} de ${totalQuestions}...`);

        // Crear la pregunta
        const questionId = generateUUID();
        
        await createQuestion({
          questionId,
          text: parsedRow.enunciado,
          topicId,
          difficultyId,
          questionTypeId,
          taxonomyId,
          userId: user.id,
          isPublic: false,
          allowPartialScore: false,
          firebaseId: user.firebaseUid,
        });

        questionsCreated++;

        // Crear las opciones de la pregunta
        for (let optIdx = 0; optIdx < parsedRow.opciones.length; optIdx++) {
          const opcion = parsedRow.opciones[optIdx];
          const questionOptionId = generateUUID();

          await createQuestionOption({
            questionOptionId,
            text: opcion.texto,
            isCorrect: opcion.correcta,
            position: optIdx + 1,
            score: opcion.correcta ? 1.0 : 0.0,
            questionId,
          });

          optionsCreated++;
        }

        // Actualizar progreso
        const progress = 5 + ((i + 1) / totalQuestions) * 90;
        setImportProgress(Math.min(progress, 95));
      }

      setImportProgress(95);
      setImportStatus('Finalizando...');
      await new Promise(resolve => setTimeout(resolve, 300));

      setImportProgress(100);
      await new Promise(resolve => setTimeout(resolve, 400)); // Esperar a que la barra llegue al 100%
      setImportStatus('¡Completado!');
      await new Promise(resolve => setTimeout(resolve, 500)); // Mostrar mensaje de completado

      setUploadMessage({
        type: 'success',
        text: `✅ Importación exitosa: ${questionsCreated} preguntas y ${optionsCreated} opciones creadas`
      });

      // Limpiar estados
      setTimeout(() => {
        setSelectedFile(null);
        setValidationStatus('idle');
        setParsedData(null);
        setUploadProgress(0);
        setImportProgress(0);
        setImportStatus('');
      }, 2000);

    } catch (error) {
      console.error('Error importing:', error);
      setUploadMessage({
        type: 'error',
        text: `Error al importar: ${error instanceof Error ? error.message : 'Error desconocido'}`
      });
      setImportProgress(0);
      setImportStatus('');
    } finally {
      setIsLoading(false);
    }
  };

  // Manejadores de drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.csv')) {
        validateAndSetFile(file);
      } else {
        setUploadMessage({ type: 'error', text: 'Por favor selecciona un archivo CSV' });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
    // Resetear el valor del input para permitir re-seleccionar el mismo archivo
    e.target.value = '';
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h2 className="mb-3">📥 Importar Preguntas desde CSV</h2>

        <Row>
          {/* Panel Principal */}
          <Col lg={8}>
            {/* Zona de carga */}
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>📤 Subir Archivo CSV</span>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={downloadTemplate}
                >
                  📄 Descargar Plantilla
                </Button>
              </Card.Header>
              <Card.Body>
                {downloadMessage && (
                  <Alert variant={downloadMessage.type} className="mb-3">
                    {downloadMessage.text}
                  </Alert>
                )}

                <div
                  className={`border-2 border-dashed rounded p-5 text-center mb-3 ${
                    isDragging ? 'border-primary bg-light' : 'border-secondary'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{ cursor: 'pointer' }}
                  onClick={handleClick}
                >
                  <input
                    type="file"
                    id="fileInput"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="d-none"
                  />
                  {selectedFile ? (
                    <div>
                      <Badge bg="success" className="mb-2">Archivo seleccionado</Badge>
                      <p className="mb-0 fw-bold">{selectedFile.name}</p>
                      <small className="text-muted">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </small>
                    </div>
                  ) : (
                    <div>
                      <div className="display-6 mb-2">📁</div>
                      <p className="mb-1">Arrastra un archivo CSV aquí</p>
                      <small className="text-muted">o haz clic para seleccionar</small>
                    </div>
                  )}
                </div>

                {/* Advertencia de codificación */}
                {encodingWarning && (
                  <Alert variant="warning" className="mb-3">
                    <small>⚠️ {encodingWarning}</small>
                  </Alert>
                )}

                {/* Progreso de validación */}
                {validationStatus === 'validating' && (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small>Validando archivo...</small>
                      <small>{uploadProgress.toFixed(0)}%</small>
                    </div>
                    <ProgressBar 
                      now={uploadProgress} 
                      animated 
                      variant="info"
                    />
                    {validationMessage && (
                      <small className="text-muted d-block mt-1">{validationMessage}</small>
                    )}
                  </div>
                )}

                {/* Estado de validación */}
                {validationStatus === 'valid' && parsedData && (
                  <Alert variant="success" className="mb-3">
                    <strong>✅ Archivo válido</strong>
                    <div className="mt-2">
                      <Badge bg="primary" className="me-2">
                        {parsedData.totalQuestions} preguntas
                      </Badge>
                      <Badge bg="secondary">
                        {parsedData.totalOptions} opciones
                      </Badge>
                    </div>
                  </Alert>
                )}

                {/* Errores de validación */}
                {validationErrors.length > 0 && (
                  <Alert variant="danger" className="mb-3">
                    <strong>❌ Errores de validación ({validationErrors.length})</strong>
                    <div className="mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      <ul className="mb-0 ps-3">
                        {validationErrors.map((error, idx) => (
                          <li key={idx}><small>{error}</small></li>
                        ))}
                      </ul>
                    </div>
                  </Alert>
                )}

                {/* Progreso de importación */}
                {isLoading && (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small>{importStatus}</small>
                      <small>{importProgress.toFixed(0)}%</small>
                    </div>
                    <ProgressBar 
                      now={importProgress} 
                      animated={importProgress < 100}
                      variant={importProgress === 100 ? 'success' : 'primary'}
                    />
                  </div>
                )}

                {/* Mensaje de resultado */}
                {uploadMessage && (
                  <Alert variant={uploadMessage.type} className="mb-3">
                    {uploadMessage.text}
                  </Alert>
                )}

                {/* Botón de importar */}
                <Button
                  variant="primary"
                  onClick={handleImport}
                  disabled={isLoading || validationStatus !== 'valid'}
                  className="w-100"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Importando...
                    </>
                  ) : (
                    '📥 Importar Preguntas'
                  )}
                </Button>
              </Card.Body>
            </Card>

            {/* Instrucciones */}
            <Card>
              <Card.Header 
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowInstructions(!showInstructions)}
              >
                <span>📋 Instrucciones de Uso</span>
                <Badge bg="secondary">
                  {showInstructions ? '▼' : '▶'}
                </Badge>
              </Card.Header>
              {showInstructions && (
                <Card.Body>
                  <h6>Formato del archivo CSV</h6>
                  <ul>
                    <li>Use punto y coma (;) como separador</li>
                    <li>La primera fila debe contener los encabezados</li>
                    <li>Codificación UTF-8 recomendada</li>
                  </ul>

                  <h6>Columnas requeridas</h6>
                  <Table size="sm" bordered>
                    <thead>
                      <tr>
                        <th>Columna</th>
                        <th>Descripción</th>
                        <th>Obligatorio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>tipo_pregunta</code></td>
                        <td>Código o nombre del tipo de pregunta</td>
                        <td><Badge bg="warning">Sí</Badge></td>
                      </tr>
                      <tr>
                        <td><code>enunciado</code></td>
                        <td>Texto de la pregunta</td>
                        <td><Badge bg="warning">Sí</Badge></td>
                      </tr>
                      <tr>
                        <td><code>asignatura</code></td>
                        <td>Asignatura (informativo)</td>
                        <td><Badge bg="secondary">No</Badge></td>
                      </tr>
                      <tr>
                        <td><code>unidad</code></td>
                        <td>Unidad (informativo)</td>
                        <td><Badge bg="secondary">No</Badge></td>
                      </tr>
                      <tr>
                        <td><code>tema</code></td>
                        <td>Código o nombre del tema</td>
                        <td><Badge bg="warning">Sí</Badge></td>
                      </tr>
                      <tr>
                        <td><code>dificultad</code></td>
                        <td>Código o nivel de dificultad</td>
                        <td><Badge bg="warning">Sí</Badge></td>
                      </tr>
                      <tr>
                        <td><code>taxonomia</code></td>
                        <td>Código o nombre de taxonomía</td>
                        <td><Badge bg="warning">Sí</Badge></td>
                      </tr>
                      <tr>
                        <td><code>opcion_N</code></td>
                        <td>Texto de la opción N (1-5)</td>
                        <td><Badge bg="secondary">Según tipo</Badge></td>
                      </tr>
                      <tr>
                        <td><code>opcion_N_correcta</code></td>
                        <td>SI/NO si la opción es correcta</td>
                        <td><Badge bg="secondary">Según tipo</Badge></td>
                      </tr>
                    </tbody>
                  </Table>

                  <h6>Valores para opciones correctas</h6>
                  <p>
                    <Badge bg="success" className="me-1">SI</Badge>
                    <Badge bg="success" className="me-1">SÍ</Badge>
                    <Badge bg="success" className="me-1">YES</Badge>
                    <Badge bg="success" className="me-1">TRUE</Badge>
                    <Badge bg="success" className="me-2">1</Badge>
                    o
                    <Badge bg="danger" className="ms-2 me-1">NO</Badge>
                    <Badge bg="danger" className="me-1">FALSE</Badge>
                    <Badge bg="danger">0</Badge>
                  </p>
                </Card.Body>
              )}
            </Card>
          </Col>

          {/* Panel Lateral - Datos del sistema */}
          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header>📊 Datos Disponibles</Card.Header>
              <Card.Body>
                <p><strong>{questionTypes.filter(qt => qt.active).length}</strong> tipos de pregunta activos</p>
                <p><strong>{difficulties.filter(d => d.active).length}</strong> niveles de dificultad activos</p>
                <p><strong>{topics.filter(t => t.active).length}</strong> temas activos</p>
                <p><strong>{taxonomies.filter(t => t.active).length}</strong> taxonomías activas</p>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>🏷️ Tipos de Pregunta</Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-1">
                  {questionTypes.filter(qt => qt.active).map(qt => (
                    <Badge key={qt.questionTypeId} bg="primary" title={qt.name}>
                      {qt.code}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>📈 Niveles de Dificultad</Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-1">
                  {difficulties.filter(d => d.active).map((d, idx) => (
                    <Badge 
                      key={d.difficultyId} 
                      bg={idx === 0 ? 'success' : idx === 1 ? 'warning' : 'danger'}
                    >
                      {d.level}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>🎯 Taxonomías</Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-1">
                  {taxonomies.filter(t => t.active).slice(0, 10).map(t => (
                    <Badge key={t.taxonomyId} bg="secondary" title={t.code}>
                      {t.name}
                    </Badge>
                  ))}
                  {taxonomies.filter(t => t.active).length > 10 && (
                    <Badge bg="light" text="dark">
                      +{taxonomies.filter(t => t.active).length - 10} más
                    </Badge>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </ProtectedRoute>
  );
}
