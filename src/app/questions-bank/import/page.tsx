'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Alert, Table, Badge, Row, Col } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useHelpContent } from '@/contexts/HelpContext';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import { QuestionImportHelp } from './QuestionImportHelp';

export default function ImportQuestionPage() {
  const { setHelpContent } = useHelpContent();
  const { questionTypes } = useQuestionTypes();
  const { difficulties } = useDifficulties();
  const { taxonomies } = useTaxonomies();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Configurar contenido de ayuda
  useEffect(() => {
    setHelpContent({
      title: '📥 Ayuda: Importar Preguntas',
      children: <QuestionImportHelp />,
    });

    // Limpiar cuando el componente se desmonta
    return () => setHelpContent(null);
  }, [setHelpContent]);

  // Función para generar y descargar la plantilla CSV
  const handleDownloadTemplate = () => {
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
    ];

    const exampleRow = [
      'SS (o Selección Única)',
      '¿Cuál es la capital de Chile?',
      'Historia (o código/ID)',
      'Geografía de Chile (o código/ID)',
      'Ciudades principales (o código/ID)',
      'bajo (o Bajo)',
      'Conocimiento (o código/ID)',
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
    ];

    const csvContent = [
      headers.join(';'),
      exampleRow.map(cell => `"${cell}"`).join(';')
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'plantilla_importacion_preguntas.csv';
    link.click();
    
    setDownloadMessage({ 
      type: 'success', 
      text: '✅ Plantilla descargada. Complétala con tus preguntas y súbela nuevamente.' 
    });
  };

  const validateAndSetFile = (file: File) => {
    if (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
      setUploadMessage({ type: 'error', text: 'Por favor selecciona un archivo CSV válido' });
      return;
    }
    setSelectedFile(file);
    setUploadMessage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setUploadMessage({ type: 'error', text: 'Por favor selecciona un archivo' });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadMessage({ type: 'success', text: 'Archivo importado correctamente' });
      setSelectedFile(null);
    } catch {
      setUploadMessage({ type: 'error', text: 'Error al importar el archivo' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h2 className="mb-3">📥 Importar Preguntas desde CSV</h2>
        
        <Row>
          <Col lg={6}>
            <Card className="mb-4 h-100">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">1️⃣ Descargar Plantilla</h5>
              </Card.Header>
              <Card.Body>
                {downloadMessage && (
                  <Alert 
                    variant={downloadMessage.type === 'success' ? 'success' : 'danger'} 
                    dismissible
                    onClose={() => setDownloadMessage(null)}
                    className="mb-3"
                  >
                    {downloadMessage.text}
                  </Alert>
                )}

                <p className="mb-3">
                  Descarga la plantilla CSV con el formato correcto. La primera fila contiene un ejemplo que puedes eliminar.
                </p>
                
                <Button
                  variant="success"
                  onClick={handleDownloadTemplate}
                >
                  📄 Descargar Plantilla CSV
                </Button>
                
                <Button
                  variant="link"
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="ms-3"
                >
                  {showInstructions ? '▼' : '▶'} Ver formato y valores permitidos
                </Button>

                {showInstructions && (
                  <Alert variant="info" className="mt-3">
                    <h6>📋 Columnas de la plantilla:</h6>
                    <Table size="sm" bordered className="mt-2 bg-white">
                      <thead>
                        <tr>
                          <th>Columna</th>
                          <th>Descripción</th>
                          <th>Valores Permitidos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>tipo_pregunta</code></td>
                          <td>Tipo de pregunta</td>
                          <td>
                            {questionTypes.map((type) => (
                              <span key={type.questionTypeId}>
                                <Badge bg="secondary">{type.code}</Badge> = {type.name}<br />
                              </span>
                            ))}
                            <small className="text-muted">También acepta nombres completos</small>
                          </td>
                        </tr>
                        <tr>
                          <td><code>enunciado</code></td>
                          <td>Texto de la pregunta</td>
                          <td>Texto libre (obligatorio)</td>
                        </tr>
                        <tr>
                          <td><code>asignatura</code></td>
                          <td>Materia o asignatura</td>
                          <td>Nombre, código o ID de asignatura</td>
                        </tr>
                        <tr>
                          <td><code>unidad</code></td>
                          <td>Unidad temática</td>
                          <td>Nombre, código o ID de unidad</td>
                        </tr>
                        <tr>
                          <td><code>tema</code></td>
                          <td>Tema específico (obligatorio)</td>
                          <td>Nombre, código o ID de tema</td>
                        </tr>
                        <tr>
                          <td><code>dificultad</code></td>
                          <td>Nivel de dificultad</td>
                          <td>
                            {difficulties.map((diff, idx) => (
                              <span key={diff.difficultyId}>
                                <Badge bg={idx === 0 ? 'success' : idx === 1 ? 'warning' : 'danger'}>
                                  {diff.level}
                                </Badge>{idx < difficulties.length - 1 ? ' ' : ''}
                              </span>
                            ))}<br />
                            <small className="text-muted">También acepta ID</small>
                          </td>
                        </tr>
                        <tr>
                          <td><code>taxonomia</code></td>
                          <td>Nivel taxonómico</td>
                          <td>
                            Nombre, código o ID de taxonomía<br />
                            <small className="text-muted">
                              Ej: {taxonomies.slice(0, 3).map(t => t.name).join(', ')}
                              {taxonomies.length > 3 ? '...' : ''}
                            </small>
                          </td>
                        </tr>
                        <tr>
                          <td><code>opcion_N</code></td>
                          <td>Texto de la opción N</td>
                          <td>Texto libre (dejar vacío si no aplica)</td>
                        </tr>
                        <tr>
                          <td><code>opcion_N_correcta</code></td>
                          <td>¿Es correcta?</td>
                          <td>
                            <Badge bg="success">SI</Badge> o{' '}
                            <Badge bg="danger">NO</Badge><br />
                            <small className="text-muted">También: 1/0, true/false, sí/no</small>
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <h6 className="mt-3">💡 Consejos:</h6>
                    <ul className="mb-0">
                      <li>Puedes usar <strong>nombres</strong> (ej: &quot;Matemática&quot;) o <strong>IDs</strong> (ej: &quot;uuid-123...&quot;)</li>
                      <li>Si usas nombres, el sistema buscará coincidencias automáticamente</li>
                      <li>Las columnas de opciones 3, 4 y 5 son opcionales</li>
                      <li>Para Verdadero/Falso solo completa opciones 1 y 2</li>
                      <li>Para Desarrollo no es necesario completar opciones</li>
                    </ul>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="h-100">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">2️⃣ Subir Archivo Completado</h5>
              </Card.Header>
              <Card.Body>
                {uploadMessage && (
                  <Alert 
                    variant={uploadMessage.type === 'success' ? 'success' : 'danger'} 
                    dismissible
                    onClose={() => setUploadMessage(null)}
                  >
                    {uploadMessage.text}
                  </Alert>
                )}

                <p className="mb-3">
                  Una vez completada la plantilla, sube el archivo CSV aquí para importar las preguntas.
                </p>

                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleClick}
                  className={`border rounded p-5 text-center mb-4 ${
                    isDragging 
                      ? 'border-primary bg-primary bg-opacity-10' 
                      : 'border-secondary border-2 border-dashed'
                  } ${
                    isLoading ? 'opacity-50' : 'cursor-pointer'
                  }`}
                  style={{
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input
                    id="fileInput"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    disabled={isLoading}
                    style={{ display: 'none' }}
                  />
                  
                  {selectedFile ? (
                    <>
                      <div className="mb-3">
                        <span style={{ fontSize: '3rem' }}>📄</span>
                      </div>
                      <h5 className="mb-2">✅ Archivo seleccionado</h5>
                      <p className="mb-1">
                        <strong>{selectedFile.name}</strong>
                      </p>
                      <p className="text-muted mb-0">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <p className="text-muted small mt-2">
                        Haz clic para seleccionar otro archivo
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mb-3">
                        <span style={{ fontSize: '3rem' }}>{isDragging ? '📂' : '📁'}</span>
                      </div>
                      <h5 className="mb-2">
                        {isDragging ? '¡Suelta el archivo aquí!' : 'Arrastra tu archivo CSV aquí'}
                      </h5>
                      <p className="text-muted mb-0">
                        o haz clic para seleccionar
                      </p>
                    </>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    onClick={handleImport}
                    disabled={!selectedFile || isLoading}
                  >
                    {isLoading ? '⏳ Importando...' : '📥 Importar Preguntas'}
                  </Button>
                  
                  <Button
                    variant="outline-secondary"
                    href="/questions-bank"
                  >
                    ← Volver al Banco
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </ProtectedRoute>
  );
}
