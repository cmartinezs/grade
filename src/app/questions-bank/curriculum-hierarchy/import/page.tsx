'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Alert, Table, Badge, Row, Col, ProgressBar } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useHelpContent } from '@/contexts/HelpContext';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { useAuth } from '@/contexts/AuthContext';
import { createNewSubject, createNewUnit, createNewTopic, fetchAllSubjects, fetchAllUnits } from '@/lib/curriculumHierarchyDataConnect';
import { fetchEducationalLevelsFromDataConnect } from '@/lib/levelDataConnect';
import { CurriculumImportHelp } from './CurriculumImportHelp';

export default function ImportCurriculumPage() {
  const { setHelpContent } = useHelpContent();
  const { user } = useAuth();
  const { subjects, units, topics } = useCurriculumHierarchy();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [parsedData, setParsedData] = useState<{subjects: number; units: number; topics: number} | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState<string>('');

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

  const validateAndSetFile = async (file: File) => {
    if (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
      setUploadMessage({ type: 'error', text: 'Por favor selecciona un archivo CSV válido' });
      return;
    }
    
    setSelectedFile(file);
    setUploadMessage(null);
    setValidationErrors([]);
    setValidationStatus('validating');
    setUploadProgress(0);
    
    // Pequeño delay para que se vea el estado inicial
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      // Simular lectura del archivo
      setUploadProgress(10);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      setUploadProgress(20);
      await new Promise(resolve => setTimeout(resolve, 150));
      
      if (lines.length === 0) {
        setValidationErrors(['El archivo está vacío']);
        setValidationStatus('invalid');
        setUploadMessage({ type: 'error', text: 'El archivo está vacío' });
        return;
      }
      
      // Validar encabezados
      setUploadProgress(30);
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const headers = lines[0].split(';').map(h => h.trim().replace(/"/g, ''));
      const expectedHeaders = ['tipo', 'nombre', 'codigo', 'nivel_educativo', 'asignatura_padre', 'unidad_padre', 'descripcion'];
      const errors: string[] = [];
      
      // Verificar que los headers sean exactamente los esperados
      if (headers.length !== expectedHeaders.length) {
        errors.push(`Se esperan ${expectedHeaders.length} columnas, pero se encontraron ${headers.length}`);
      }
      
      expectedHeaders.forEach((expected, idx) => {
        if (headers[idx] !== expected) {
          errors.push(`Columna ${idx + 1}: se esperaba "${expected}" pero se encontró "${headers[idx] || '(vacío)'}"}`);
        }
      });
      
      // Verificar columnas extra
      if (headers.length > expectedHeaders.length) {
        const extraHeaders = headers.slice(expectedHeaders.length);
        errors.push(`Columnas extra no permitidas: ${extraHeaders.join(', ')}`);
      }
      
      setUploadProgress(40);
      await new Promise(resolve => setTimeout(resolve, 150));
      
      if (errors.length > 0) {
        setValidationErrors(errors);
        setValidationStatus('invalid');
        setUploadMessage({ type: 'error', text: `Se encontraron ${errors.length} error(es) en el formato del archivo` });
        return;
      }
      
      // Validar filas de datos
      setUploadProgress(50);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      let subjectsCount = 0;
      let unitsCount = 0;
      let topicsCount = 0;
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const values = line.split(';').map(v => v.trim().replace(/^"|"$/g, ''));
        
        if (values.length !== expectedHeaders.length) {
          errors.push(`Fila ${i + 1}: número incorrecto de columnas (${values.length} en lugar de ${expectedHeaders.length})`);
          continue;
        }
        
        const [tipo, nombre, codigo, nivelEducativo, asignaturaPadre, unidadPadre] = values;
        
        // Validar tipo
        if (!['asignatura', 'unidad', 'tema'].includes(tipo.toLowerCase())) {
          errors.push(`Fila ${i + 1}: tipo "${tipo}" no válido. Debe ser: asignatura, unidad o tema`);
          continue;
        }
        
        // Validar nombre (obligatorio para todos)
        if (!nombre) {
          errors.push(`Fila ${i + 1}: el campo "nombre" es obligatorio`);
        }
        
        // Validaciones específicas por tipo
        const tipoLower = tipo.toLowerCase();
        
        if (tipoLower === 'asignatura') {
          subjectsCount++;
          if (!codigo) {
            errors.push(`Fila ${i + 1}: el campo "codigo" es obligatorio para asignaturas`);
          }
          if (!nivelEducativo) {
            errors.push(`Fila ${i + 1}: el campo "nivel_educativo" es obligatorio para asignaturas`);
          }
          if (asignaturaPadre || unidadPadre) {
            errors.push(`Fila ${i + 1}: las asignaturas no deben tener "asignatura_padre" ni "unidad_padre"`);
          }
        } else if (tipoLower === 'unidad') {
          unitsCount++;
          if (!asignaturaPadre) {
            errors.push(`Fila ${i + 1}: el campo "asignatura_padre" es obligatorio para unidades`);
          }
          if (codigo || nivelEducativo) {
            errors.push(`Fila ${i + 1}: las unidades no deben tener "codigo" ni "nivel_educativo"`);
          }
          if (unidadPadre) {
            errors.push(`Fila ${i + 1}: las unidades no deben tener "unidad_padre"`);
          }
        } else if (tipoLower === 'tema') {
          topicsCount++;
          if (!asignaturaPadre) {
            errors.push(`Fila ${i + 1}: el campo "asignatura_padre" es obligatorio para temas`);
          }
          if (!unidadPadre) {
            errors.push(`Fila ${i + 1}: el campo "unidad_padre" es obligatorio para temas`);
          }
          if (codigo || nivelEducativo) {
            errors.push(`Fila ${i + 1}: los temas no deben tener "codigo" ni "nivel_educativo"`);
          }
        }
        
        // Actualizar progreso periódicamente
        if (i % 5 === 0) {
          const progress = 50 + Math.floor((i / (lines.length - 1)) * 30);
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
      
      setUploadProgress(85);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      if (errors.length > 0) {
        setValidationErrors(errors);
        setValidationStatus('invalid');
        setUploadMessage({ 
          type: 'error', 
          text: `Se encontraron ${errors.length} error(es) de validación. Revisa los detalles abajo.` 
        });
      } else {
        setParsedData({ subjects: subjectsCount, units: unitsCount, topics: topicsCount });
        setValidationStatus('valid');
        setUploadMessage({ 
          type: 'success', 
          text: `✅ Archivo válido: ${subjectsCount} asignatura(s), ${unitsCount} unidad(es), ${topicsCount} tema(s)` 
        });
      }
      
      setUploadProgress(100);
      await new Promise(resolve => setTimeout(resolve, 300));
      
    } catch (error) {
      console.error('Error validating file:', error);
      setValidationErrors(['Error al leer el archivo. Verifica que sea un CSV válido con codificación UTF-8']);
      setValidationStatus('invalid');
      setUploadMessage({ type: 'error', text: 'Error al procesar el archivo' });
      setUploadProgress(0);
    }
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
    
    if (validationStatus !== 'valid') {
      setUploadMessage({ type: 'error', text: 'El archivo debe ser válido antes de importar' });
      return;
    }
    
    if (!user?.id) {
      setUploadMessage({ type: 'error', text: 'Debes estar autenticado para importar' });
      return;
    }

    setIsLoading(true);
    setImportProgress(0);
    setImportStatus('Iniciando importación...');
    
    try {
      // Leer archivo nuevamente
      const text = await selectedFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      const dataLines = lines.slice(1); // Saltar header
      
      // Mapas para almacenar IDs (por nombre)
      const subjectIdMap = new Map<string, string>();
      const unitIdMap = new Map<string, string>(); // key: "asignatura|unidad"
      
      // Cargar elementos existentes primero
      setImportStatus('Cargando elementos existentes...');
      setImportProgress(2);
      
      // Cargar asignaturas existentes
      const existingSubjectsData = await fetchAllSubjects();
      existingSubjectsData.subjects.forEach(subject => {
        if (subject.active) {
          subjectIdMap.set(subject.name, subject.subjectId);
        }
      });
      console.log(`Asignaturas existentes cargadas: ${subjectIdMap.size}`);
      
      // Crear un mapa inverso: subjectId -> subjectName
      const subjectIdToName = new Map<string, string>();
      existingSubjectsData.subjects.forEach(subject => {
        if (subject.active) {
          subjectIdToName.set(subject.subjectId, subject.name);
        }
      });
      
      // Cargar unidades existentes
      const existingUnitsData = await fetchAllUnits();
      existingUnitsData.units.forEach(unit => {
        if (unit.active) {
          const subjectName = subjectIdToName.get(unit.subjectId);
          if (subjectName) {
            unitIdMap.set(`${subjectName}|${unit.name}`, unit.unitId);
          }
        }
      });
      console.log(`Unidades existentes cargadas: ${unitIdMap.size}`);
      
      // Cargar niveles educativos existentes
      setImportStatus('Cargando niveles educativos...');
      setImportProgress(5);
      
      const educationalLevels = await fetchEducationalLevelsFromDataConnect();
      console.log('Niveles educativos cargados:', educationalLevels);
      
      // Crear un mapa de niveles por nombre (case-insensitive)
      const levelMap = new Map<string, string>();
      educationalLevels.forEach((level: { name: string; levelId: string }) => {
        levelMap.set(level.name.toLowerCase(), level.levelId);
      });
      
      let created = 0;
      const total = dataLines.length;
      
      // Fase 1: Crear asignaturas (solo las que no existen)
      setImportStatus('Procesando asignaturas...');
      for (let i = 0; i < dataLines.length; i++) {
        const values = dataLines[i].split(';').map(v => v.trim().replace(/^"|"$/g, ''));
        const [tipo, nombre, codigo, nivelEducativo] = values;
        
        if (tipo.toLowerCase() === 'asignatura') {
          try {
            // Verificar si ya existe
            if (subjectIdMap.has(nombre)) {
              console.log(`Asignatura "${nombre}" ya existe, usando ID existente`);
              created++;
              setImportProgress(5 + (created / total) * 30);
              continue;
            }
            
            // Buscar nivel educativo por nombre
            const levelId = levelMap.get(nivelEducativo.toLowerCase());
            
            if (!levelId) {
              throw new Error(`Nivel educativo "${nivelEducativo}" no encontrado. Niveles disponibles: ${Array.from(levelMap.keys()).join(', ')}`);
            }
            
            const subjectId = await createNewSubject(
              nombre,
              codigo,
              levelId,
              user.id
            );
            
            subjectIdMap.set(nombre, subjectId);
            created++;
            setImportProgress(5 + (created / total) * 30);
          } catch (error) {
            console.error(`Error creando asignatura "${nombre}":`, error);
            throw new Error(`Error creando asignatura "${nombre}": ${error}`);
          }
        }
      }
      
      // Fase 2: Crear unidades (solo las que no existen)
      setImportStatus('Procesando unidades...');
      for (let i = 0; i < dataLines.length; i++) {
        const values = dataLines[i].split(';').map(v => v.trim().replace(/^"|"$/g, ''));
        const [tipo, nombre, , , asignaturaPadre, , descripcion] = values;
        
        if (tipo.toLowerCase() === 'unidad') {
          try {
            const unitKey = `${asignaturaPadre}|${nombre}`;
            
            // Verificar si ya existe
            if (unitIdMap.has(unitKey)) {
              console.log(`Unidad "${nombre}" en asignatura "${asignaturaPadre}" ya existe, usando ID existente`);
              created++;
              setImportProgress(35 + (created / total) * 30);
              continue;
            }
            
            const subjectId = subjectIdMap.get(asignaturaPadre);
            if (!subjectId) {
              throw new Error(`Asignatura "${asignaturaPadre}" no encontrada`);
            }
            
            const unitId = await createNewUnit(
              nombre,
              subjectId,
              user.id,
              descripcion || undefined
            );
            
            unitIdMap.set(unitKey, unitId);
            created++;
            setImportProgress(35 + (created / total) * 30);
          } catch (error) {
            console.error(`Error creando unidad "${nombre}":`, error);
            throw new Error(`Error creando unidad "${nombre}": ${error}`);
          }
        }
      }
      
      // Fase 3: Crear temas
      setImportStatus('Creando temas...');
      for (let i = 0; i < dataLines.length; i++) {
        const values = dataLines[i].split(';').map(v => v.trim().replace(/^"|"$/g, ''));
        const [tipo, nombre, , , asignaturaPadre, unidadPadre] = values;
        
        if (tipo.toLowerCase() === 'tema') {
          try {
            const unitId = unitIdMap.get(`${asignaturaPadre}|${unidadPadre}`);
            if (!unitId) {
              throw new Error(`Unidad "${unidadPadre}" en asignatura "${asignaturaPadre}" no encontrada`);
            }
            
            await createNewTopic(
              nombre,
              unitId,
              user.id
            );
            
            created++;
            setImportProgress(65 + (created / total) * 30);
          } catch (error) {
            console.error(`Error creando tema "${nombre}":`, error);
            throw new Error(`Error creando tema "${nombre}": ${error}`);
          }
        }
      }
      
      setImportProgress(95);
      setImportStatus('Finalizando...');
      
      setImportProgress(100);
      setImportStatus('Completado');
      
      setUploadMessage({ 
        type: 'success', 
        text: `✅ Jerarquía curricular importada: ${created} elementos creados` 
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

                {/* Progress Bar */}
                {validationStatus === 'validating' && (
                  <div className="mb-4">
                    <h6 className="mb-2">📊 Validando archivo...</h6>
                    <ProgressBar 
                      now={uploadProgress} 
                      label={`${uploadProgress}%`}
                      animated
                      striped
                      variant="info"
                    />
                  </div>
                )}

                {/* Validation Results */}
                {validationStatus === 'valid' && parsedData && (
                  <Alert variant="success" className="mb-4">
                    <h6 className="mb-2">✅ Archivo validado correctamente</h6>
                    <ul className="mb-0">
                      <li><strong>{parsedData.subjects}</strong> asignatura(s)</li>
                      <li><strong>{parsedData.units}</strong> unidad(es)</li>
                      <li><strong>{parsedData.topics}</strong> tema(s)</li>
                    </ul>
                  </Alert>
                )}

                {/* Validation Errors */}
                {validationStatus === 'invalid' && validationErrors.length > 0 && (
                  <Alert variant="danger" className="mb-4">
                    <h6 className="mb-2">❌ Errores de validación ({validationErrors.length})</h6>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      <ul className="mb-0">
                        {validationErrors.map((error, idx) => (
                          <li key={idx}><small>{error}</small></li>
                        ))}
                      </ul>
                    </div>
                  </Alert>
                )}

                {/* Import Progress */}
                {isLoading && (
                  <div className="mb-4">
                    <h6 className="mb-2">⚙️ {importStatus}</h6>
                    <ProgressBar 
                      now={importProgress} 
                      label={`${importProgress}%`}
                      animated
                      striped
                      variant="success"
                    />
                  </div>
                )}

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
                    disabled={!selectedFile || isLoading || validationStatus !== 'valid'}
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
