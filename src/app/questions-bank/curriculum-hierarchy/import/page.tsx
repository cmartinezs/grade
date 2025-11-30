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
import {
  parseCSVRowToObject,
  validateHeaders,
  validateRowByType,
  collectCodesAndFindDuplicates,
  generateDuplicateErrors,
  collectReferencesToValidate,
  validateReferences,
  validateAgainstExistingCodes,
  validateLevelExists,
  countEntitiesByType,
  buildSubjectMaps,
  buildUnitMaps,
  buildLevelMaps,
  buildExistingCodesSet,
  findSubjectId,
  findUnitId,
  findLevelByCodeOrName,
  normalizeCode,
  getEntityType,
  PROGRESS,
  type EntityMaps,
} from './csvUtils';

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
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [encodingWarning, setEncodingWarning] = useState<string | null>(null);

  /**
   * Lee un archivo de texto intentando diferentes codificaciones
   * Prioriza UTF-8, luego intenta Windows-1252/Latin-1 si detecta problemas
   */
  const readFileWithEncoding = async (file: File): Promise<string> => {
    // Primero intentamos leer como UTF-8
    let text = await file.text();
    
    // Remover BOM si existe (común en archivos de Excel)
    if (text.charCodeAt(0) === 0xFEFF) {
      text = text.substring(1);
    }
    
    // Detectar si hay caracteres corruptos típicos de UTF-8 mal interpretado
    // Estos patrones ocurren cuando UTF-8 se lee como Latin-1
    const corruptPatterns = [
      /Ã¡/g,  // á
      /Ã©/g,  // é
      /Ã­/g,  // í
      /Ã³/g,  // ó
      /Ãº/g,  // ú
      /Ã±/g,  // ñ
      /Ã/g,   // otros caracteres
    ];
    
    const hasCorruptChars = corruptPatterns.some(pattern => pattern.test(text));
    
    if (hasCorruptChars) {
      console.warn('Detectados caracteres potencialmente corruptos, intentando re-codificación...');
      setEncodingWarning('Se detectó un problema de codificación. Se intentó corregir automáticamente.');
      // El archivo probablemente fue guardado en Latin-1 pero con caracteres UTF-8
      // Intentamos leer como Latin-1 (Windows-1252)
      try {
        const arrayBuffer = await file.arrayBuffer();
        const decoder = new TextDecoder('windows-1252');
        text = decoder.decode(arrayBuffer);
        
        // Remover BOM si existe
        if (text.charCodeAt(0) === 0xFEFF) {
          text = text.substring(1);
        }
      } catch {
        console.warn('No se pudo re-codificar, usando texto original');
      }
    } else {
      setEncodingWarning(null);
    }
    
    // Detectar caracteres de reemplazo (�) que indican problemas de codificación
    if (text.includes('\uFFFD')) {
      console.warn('Se detectaron caracteres de reemplazo (�), el archivo puede tener problemas de codificación');
      setEncodingWarning('⚠️ Se detectaron caracteres con problemas de codificación. Verifica que el archivo esté guardado como UTF-8.');
    }
    
    return text;
  };

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
      ['asignatura', 'Matemática', 'MAT', 'BAS', '', '', 'Asignatura de matemáticas'],
      ['unidad', 'Números', 'MAT-NUM', '', 'MAT', '', 'Operaciones con números'],
      ['tema', 'Suma', 'MAT-NUM-SUM', '', 'MAT', 'MAT-NUM', 'Operaciones de adición'],
      ['tema', 'Resta', 'MAT-NUM-RES', '', 'MAT', 'MAT-NUM', 'Operaciones de sustracción'],
      ['unidad', 'Geometría', 'MAT-GEO', '', 'MAT', '', 'Figuras geométricas'],
      ['tema', 'Triángulos', 'MAT-GEO-TRI', '', 'MAT', 'MAT-GEO', 'Propiedades de triángulos'],
      ['asignatura', 'Lenguaje', 'LEN', 'BAS', '', '', 'Lenguaje y comunicación'],
      ['unidad', 'Comprensión Lectora', 'LEN-COM', '', 'LEN', '', 'Estrategias de lectura'],
      ['tema', 'Textos Narrativos', 'LEN-COM-NAR', '', 'LEN', 'LEN-COM', 'Cuentos y novelas']
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
    // Validar tipo de archivo
    if (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
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
      // Leer archivo
      setUploadProgress(1);
      const text = await readFileWithEncoding(file);
      const lines = text.split('\n').filter(line => line.trim());
      const totalDataLines = lines.length - 1;
      
      setUploadProgress(2);
      
      if (lines.length === 0) {
        setValidationErrors(['El archivo está vacío']);
        setValidationStatus('invalid');
        setUploadMessage({ type: 'error', text: 'El archivo está vacío' });
        return;
      }
      
      // Validar encabezados usando utilidad
      setUploadProgress(3);
      setValidationMessage('Validando encabezados...');
      
      const errors: string[] = validateHeaders(lines[0]);
      
      if (errors.length > 0) {
        setUploadProgress(100);
        setValidationMessage('');
        await new Promise(resolve => setTimeout(resolve, 300));
        setValidationErrors(errors);
        setValidationStatus('invalid');
        setUploadMessage({ type: 'error', text: `Se encontraron ${errors.length} error(es) en el formato del archivo` });
        return;
      }
      
      // Validar filas de datos - preparación completa
      setUploadProgress(PROGRESS.PREP_PERCENT);
      setValidationMessage(`Validando registros (0 de ${totalDataLines})...`);
      
      // Recolectar códigos y detectar duplicados internos usando utilidad
      const { subjectCodes, unitCodes, duplicates } = collectCodesAndFindDuplicates(lines);
      errors.push(...generateDuplicateErrors(duplicates));
      
      // Recolectar referencias para validar integridad referencial usando utilidad
      const referencesToValidate = collectReferencesToValidate(lines);
      
      // Validar estructura de cada fila usando utilidades
      for (let i = 1; i < lines.length; i++) {
        const row = parseCSVRowToObject(lines[i]);
        errors.push(...validateRowByType(row, i + 1));
        
        // Actualizar progreso proporcional
        const currentRecord = i;
        const progress = PROGRESS.PREP_PERCENT + Math.round((currentRecord / totalDataLines) * PROGRESS.VALIDATION_PERCENT);
        setUploadProgress(progress);
        
        if (i % 5 === 0 || i === totalDataLines) {
          setValidationMessage(`Validando registros (${currentRecord} de ${totalDataLines})...`);
          await new Promise(resolve => setTimeout(resolve, 1));
        }
      }
      
      // Validación de registros completa (95%)
      setUploadProgress(PROGRESS.PREP_PERCENT + PROGRESS.VALIDATION_PERCENT);
      setValidationMessage('Verificando códigos existentes...');
      
      // Validar contra elementos existentes en el sistema
      const hasCodesInFile = subjectCodes.size > 0 || unitCodes.size > 0;
      if (duplicates.length === 0 && hasCodesInFile) {
        setUploadProgress(96);
        setImportStatus('Verificando códigos existentes...');
        
        try {
          // Cargar elementos existentes y construir mapas usando utilidades
          const existingSubjectsData = await fetchAllSubjects();
          const existingUnitsData = await fetchAllUnits();
          const educationalLevels = await fetchEducationalLevelsFromDataConnect();
          
          const { levelByCodeMap, levelByNameMap } = buildLevelMaps(educationalLevels);
          
          // Crear sets de códigos existentes
          const existingCodes = {
            subjects: buildExistingCodesSet(existingSubjectsData.subjects),
            units: buildExistingCodesSet(existingUnitsData.units),
            topics: buildExistingCodesSet(topics)
          };
          
          // Verificar cada fila contra códigos existentes y niveles
          for (let i = 1; i < lines.length; i++) {
            const row = parseCSVRowToObject(lines[i]);
            
            // Validar nivel educativo
            const levelError = validateLevelExists(row, i + 1, levelByCodeMap, levelByNameMap);
            if (levelError) errors.push(levelError);
            
            // Validar códigos duplicados contra BD
            const codeError = validateAgainstExistingCodes(row, i + 1, existingCodes);
            if (codeError) errors.push(codeError);
          }
          
          // Validar integridad referencial usando utilidad
          errors.push(...validateReferences(
            referencesToValidate,
            subjectCodes,
            unitCodes,
            existingCodes.subjects,
            existingCodes.units
          ));
        } catch (fetchError) {
          console.warn('No se pudieron cargar elementos existentes para validar duplicados:', fetchError);
        }
      }
      
      // Completar el progreso al 100% ANTES de cambiar el estado
      setUploadProgress(100);
      await new Promise(resolve => setTimeout(resolve, 400)); // Esperar a que la barra llegue al 100%
      setValidationMessage('Validación completada');
      await new Promise(resolve => setTimeout(resolve, 500)); // Mostrar mensaje de completado
      setValidationMessage('');
      
      if (errors.length > 0) {
        setValidationErrors(errors);
        setValidationStatus('invalid');
        setUploadMessage({ 
          type: 'error', 
          text: `Se encontraron ${errors.length} error(es) de validación. Revisa los detalles abajo.` 
        });
      } else {
        const counts = countEntitiesByType(lines);
        setParsedData({ subjects: counts.subjects, units: counts.units, topics: counts.topics });
        setValidationStatus('valid');
        setUploadMessage({ 
          type: 'success', 
          text: `✅ Archivo válido: ${counts.subjects} asignatura(s), ${counts.units} unidad(es), ${counts.topics} tema(s)` 
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
    // Resetear el valor del input para permitir re-seleccionar el mismo archivo
    e.target.value = '';
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
      // Leer archivo con manejo de codificación
      const text = await readFileWithEncoding(selectedFile);
      const lines = text.split('\n').filter(line => line.trim());
      const dataLines = lines.slice(1); // Saltar header
      
      // Cargar elementos existentes primero
      setImportStatus('Cargando elementos existentes...');
      setImportProgress(2);
      
      // Cargar y construir mapas de asignaturas existentes
      const existingSubjectsData = await fetchAllSubjects();
      const subjectMaps = buildSubjectMaps(existingSubjectsData.subjects);
      const { subjectIdMap, subjectByCodeMap, subjectIdToName } = subjectMaps;
      console.log(`Asignaturas existentes cargadas: ${subjectIdMap.size}`);
      
      // Cargar y construir mapas de unidades existentes
      const existingUnitsData = await fetchAllUnits();
      const unitMaps = buildUnitMaps(existingUnitsData.units, subjectIdToName);
      const { unitIdMap, unitByCodeMap } = unitMaps;
      console.log(`Unidades existentes cargadas: ${unitIdMap.size}`);
      
      // Cargar niveles educativos existentes
      setImportStatus('Cargando niveles educativos...');
      setImportProgress(5);
      
      const educationalLevels = await fetchEducationalLevelsFromDataConnect();
      const levelMaps = buildLevelMaps(educationalLevels);
      console.log('Niveles educativos cargados:', educationalLevels);
      
      // Crear objeto de mapas combinados para las funciones de búsqueda
      const entityMaps: EntityMaps = {
        ...subjectMaps,
        ...unitMaps,
        ...levelMaps
      };
      
      let created = 0;
      const total = dataLines.length;
      
      // Fase 1: Crear asignaturas (solo las que no existen)
      setImportStatus('Procesando asignaturas...');
      for (let i = 0; i < dataLines.length; i++) {
        const row = parseCSVRowToObject(dataLines[i]);
        
        if (getEntityType(row.tipo) === 'asignatura') {
          try {
            // Verificar si ya existe
            if (subjectIdMap.has(row.nombre)) {
              console.log(`Asignatura "${row.nombre}" ya existe, usando ID existente`);
              created++;
              setImportProgress(5 + (created / total) * 30);
              continue;
            }
            
            // Buscar nivel educativo por código o nombre
            const levelId = findLevelByCodeOrName(row.nivelEducativo, entityMaps.levelByCodeMap, entityMaps.levelByNameMap);
            
            if (!levelId) {
              throw new Error(`Nivel educativo "${row.nivelEducativo}" no encontrado. Revisa los niveles disponibles en el sistema.`);
            }
            
            const subjectId = await createNewSubject(
              row.nombre,
              row.codigo,
              levelId,
              user.id
            );
            
            // Actualizar todos los mapas necesarios
            subjectIdMap.set(row.nombre, subjectId);
            subjectByCodeMap.set(normalizeCode(row.codigo), subjectId);
            subjectIdToName.set(subjectId, row.nombre);
            
            created++;
            setImportProgress(5 + (created / total) * 30);
          } catch (error) {
            console.error(`Error creando asignatura "${row.nombre}":`, error);
            throw new Error(`Error creando asignatura "${row.nombre}": ${error}`);
          }
        }
      }
      
      // Fase 2: Crear unidades (solo las que no existen)
      setImportStatus('Procesando unidades...');
      for (let i = 0; i < dataLines.length; i++) {
        const row = parseCSVRowToObject(dataLines[i]);
        
        if (getEntityType(row.tipo) === 'unidad') {
          try {
            // Buscar asignatura por código o nombre
            const subjectId = findSubjectId(row.asignaturaPadre, entityMaps);
            
            // Obtener el nombre real de la asignatura para la clave
            const subjectName = subjectIdToName.get(subjectId);
            if (!subjectName) {
              throw new Error(`No se pudo obtener el nombre de la asignatura con ID "${subjectId}"`);
            }
            
            const unitKey = `${subjectName}|${row.nombre}`;
            
            // Verificar si ya existe
            if (unitIdMap.has(unitKey)) {
              console.log(`Unidad "${row.nombre}" en asignatura "${row.asignaturaPadre}" ya existe, usando ID existente`);
              created++;
              setImportProgress(35 + (created / total) * 30);
              continue;
            }
            
            const unitId = await createNewUnit(
              row.nombre,
              row.codigo,
              subjectId,
              user.id,
              row.descripcion || undefined
            );
            
            unitIdMap.set(unitKey, unitId);
            unitByCodeMap.set(normalizeCode(row.codigo), unitId);
            created++;
            setImportProgress(35 + (created / total) * 30);
          } catch (error) {
            console.error(`Error creando unidad "${row.nombre}":`, error);
            throw new Error(`Error creando unidad "${row.nombre}": ${error}`);
          }
        }
      }
      
      // Fase 3: Crear temas
      setImportStatus('Creando temas...');
      for (let i = 0; i < dataLines.length; i++) {
        const row = parseCSVRowToObject(dataLines[i]);
        
        if (getEntityType(row.tipo) === 'tema') {
          try {
            // Buscar asignatura por código o nombre para obtener el nombre
            let subjectIdForKey: string | undefined;
            try {
              subjectIdForKey = findSubjectId(row.asignaturaPadre, entityMaps);
            } catch {
              // Si no se encuentra, usar el valor como nombre directamente
            }
            const subjectNameForKey = subjectIdForKey ? subjectIdToName.get(subjectIdForKey) : row.asignaturaPadre;
            
            // Buscar unidad por código o nombre
            const unitId = findUnitId(row.unidadPadre, subjectNameForKey || '', entityMaps);
            
            await createNewTopic(
              row.nombre,
              row.codigo,
              unitId,
              user.id
            );
            
            created++;
            setImportProgress(65 + (created / total) * 30);
          } catch (error) {
            console.error(`Error creando tema "${row.nombre}":`, error);
            throw new Error(`Error creando tema "${row.nombre}": ${error}`);
          }
        }
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
                          <td>Código único por tipo</td>
                          <td><Badge bg="warning">Obligatorio</Badge> Único por tipo (ej: MAT, LEN, MAT-NUM)</td>
                        </tr>
                        <tr>
                          <td><code>nivel_educativo</code></td>
                          <td>Nivel educacional</td>
                          <td>Obligatorio para asignaturas. Usa <strong>código</strong> (recomendado) o nombre (ej: BAS, Básica)</td>
                        </tr>
                        <tr>
                          <td><code>asignatura_padre</code></td>
                          <td>Asignatura a la que pertenece</td>
                          <td>Para unidades y temas. Usa <strong>código</strong> (recomendado) o nombre (ej: MAT, Matemática)</td>
                        </tr>
                        <tr>
                          <td><code>unidad_padre</code></td>
                          <td>Unidad a la que pertenece</td>
                          <td>Solo para temas. Usa <strong>código</strong> (recomendado) o nombre de la unidad</td>
                        </tr>
                        <tr>
                          <td><code>descripcion</code></td>
                          <td>Descripción opcional</td>
                          <td>Texto libre (opcional)</td>
                        </tr>
                      </tbody>
                    </Table>

                    <h6 className="mt-3">⚠️ Validaciones:</h6>
                    <ul className="mb-3">
                      <li><strong>Tamaño máximo:</strong> 2 MB</li>
                      <li><strong>Formato:</strong> CSV con separador punto y coma (;)</li>
                      <li><strong>Codificación:</strong> UTF-8 (recomendado con BOM)</li>
                      <li><strong>Códigos únicos por tipo:</strong> No puede haber dos asignaturas con el mismo código, ni dos unidades con el mismo código, ni dos temas con el mismo código. Sin embargo, una asignatura y una unidad <em>sí pueden</em> tener el mismo código.</li>
                      <li><strong>Códigos existentes:</strong> Se valida contra los elementos ya existentes en el sistema</li>
                    </ul>

                    <h6 className="mt-3">💡 Consejos:</h6>
                    <ul className="mb-3">
                      <li>Define primero las <strong>asignaturas</strong>, luego las <strong>unidades</strong> y finalmente los <strong>temas</strong></li>
                      <li>El campo <code>codigo</code> es <strong>obligatorio para todos</strong> y debe ser único dentro de su tipo</li>
                      <li><strong>Recomendado:</strong> Usa códigos en lugar de nombres en <code>nivel_educativo</code>, <code>asignatura_padre</code> y <code>unidad_padre</code> (más preciso)</li>
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
                    {validationMessage && (
                      <p className="text-muted small mb-2">{validationMessage}</p>
                    )}
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

                {/* Encoding Warning */}
                {encodingWarning && (
                  <Alert variant="warning" className="mb-4">
                    <h6 className="mb-2">⚠️ Advertencia de codificación</h6>
                    <p className="mb-2">{encodingWarning}</p>
                    <small className="text-muted">
                      <strong>Recomendación:</strong> Guarda el archivo CSV como &quot;UTF-8 con BOM&quot; desde tu editor.
                      En LibreOffice: Guardar como → CSV → Editar configuración de filtros → Juego de caracteres: Unicode (UTF-8).
                    </small>
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
