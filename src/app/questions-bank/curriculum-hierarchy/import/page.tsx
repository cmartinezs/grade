'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Alert, Table, Badge, Row, Col } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useHelpContent } from '@/contexts/HelpContext';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { CurriculumImportHelp } from './CurriculumImportHelp';

export default function ImportCurriculumPage() {
  const { setHelpContent } = useHelpContent();
  const { subjects, units, topics } = useCurriculumHierarchy();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Configurar contenido de ayuda
  useEffect(() => {
    setHelpContent({
      title: '📥 Ayuda: Importar Jerarquía',
      children: <CurriculumImportHelp />,
    });

    return () => setHelpContent(null);
  }, [setHelpContent]);

  // Función para generar y descargar la plantilla CSV
  const handleDownloadTemplate = () => {
    const headers = [
      'tipo',
      'nombre',
      'codigo',
      'nivel_educativo',
      'asignatura_padre',
      'unidad_padre',
      'descripcion'
    ];

    const exampleRows = [
      ['asignatura', 'Matemática', 'MAT', 'Básica', '', '', 'Asignatura de matemáticas'],
      ['unidad', 'Números', '', '', 'Matemática', '', 'Operaciones con números'],
      ['tema', 'Suma', '', '', 'Matemática', 'Números', 'Operaciones de adición'],
      ['tema', 'Resta', '', '', 'Matemática', 'Números', 'Operaciones de sustracción'],
      ['unidad', 'Geometría', '', '', 'Matemática', '', 'Figuras geométricas'],
      ['tema', 'Triángulos', '', '', 'Matemática', 'Geometría', 'Propiedades de triángulos'],
      ['asignatura', 'Lenguaje', 'LEN', 'Básica', '', '', 'Lenguaje y comunicación'],
      ['unidad', 'Comprensión Lectora', '', '', 'Lenguaje', '', 'Estrategias de lectura'],
      ['tema', 'Textos Narrativos', '', '', 'Lenguaje', 'Comprensión Lectora', 'Cuentos y novelas']
    ];

    const csvContent = [
      headers.join(';'),
      ...exampleRows.map(row => row.map(cell => `"${cell}"`).join(';'))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'plantilla_jerarquia_curricular.csv';
    link.click();
    
    setDownloadMessage({ 
      type: 'success', 
      text: '✅ Plantilla descargada. Complétala con tu jerarquía curricular y súbela nuevamente.' 
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
      setUploadMessage({ type: 'success', text: 'Jerarquía curricular importada correctamente' });
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
        <h2 className="mb-3">📥 Importar Jerarquía Curricular desde CSV</h2>
        
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
                  Descarga la plantilla CSV con el formato correcto. Incluye ejemplos de asignaturas, unidades y temas que puedes modificar.
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
                          <td><code>tipo</code></td>
                          <td>Tipo de elemento</td>
                          <td>
                            <Badge bg="primary">asignatura</Badge>{' '}
                            <Badge bg="info">unidad</Badge>{' '}
                            <Badge bg="success">tema</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td><code>nombre</code></td>
                          <td>Nombre del elemento</td>
                          <td><Badge bg="warning">Obligatorio</Badge></td>
                        </tr>
                        <tr>
                          <td><code>codigo</code></td>
                          <td>Código único</td>
                          <td>Solo para asignaturas (ej: MAT, LEN)</td>
                        </tr>
                        <tr>
                          <td><code>nivel_educativo</code></td>
                          <td>Nivel educacional</td>
                          <td>Solo para asignaturas (ej: Básica, Media)</td>
                        </tr>
                        <tr>
                          <td><code>asignatura_padre</code></td>
                          <td>Asignatura a la que pertenece</td>
                          <td>Para unidades y temas (nombre de la asignatura)</td>
                        </tr>
                        <tr>
                          <td><code>unidad_padre</code></td>
                          <td>Unidad a la que pertenece</td>
                          <td>Solo para temas (nombre de la unidad)</td>
                        </tr>
                        <tr>
                          <td><code>descripcion</code></td>
                          <td>Descripción opcional</td>
                          <td>Texto libre (opcional)</td>
                        </tr>
                      </tbody>
                    </Table>

                    <h6 className="mt-3">💡 Consejos:</h6>
                    <ul className="mb-3">
                      <li>Define primero las <strong>asignaturas</strong>, luego las <strong>unidades</strong> y finalmente los <strong>temas</strong></li>
                      <li>Los códigos de asignatura deben ser <strong>únicos</strong></li>
                      <li>Usa nombres exactos en las columnas de referencia (asignatura_padre, unidad_padre)</li>
                      <li>Las descripciones son opcionales pero recomendadas</li>
                    </ul>

                    <Alert variant="success" className="mb-0">
                      <strong>🎯 Estructura jerárquica:</strong><br />
                      Asignatura → Unidad → Tema<br />
                      <small className="text-muted">
                        Ejemplo: Matemática → Números → Suma
                      </small>
                    </Alert>
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
                  Una vez completada la plantilla, sube el archivo CSV aquí para importar la jerarquía curricular.
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

                {/* Stats actuales */}
                <Alert variant="light" className="mb-4">
                  <h6 className="mb-2">📊 Elementos actuales en el sistema:</h6>
                  <ul className="mb-0">
                    <li><strong>{subjects.filter(s => s.active).length}</strong> asignaturas activas</li>
                    <li><strong>{units.filter(u => u.active).length}</strong> unidades activas</li>
                    <li><strong>{topics.filter(t => t.active).length}</strong> temas activos</li>
                  </ul>
                </Alert>

                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    onClick={handleImport}
                    disabled={!selectedFile || isLoading}
                  >
                    {isLoading ? '⏳ Importando...' : '📥 Importar Jerarquía'}
                  </Button>
                  
                  <Button
                    variant="outline-secondary"
                    href="/questions-bank/curriculum-hierarchy"
                  >
                    ← Volver
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
