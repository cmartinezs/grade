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
      
      // Calcular total de pasos para el progreso proporcional
      // Total de registros de datos (sin header)
      const totalDataLines = lines.length - 1;
      // Fases: 5% preparación, 90% validación de registros, 5% verificación BD
      const PREP_PERCENT = 5;
      const VALIDATION_PERCENT = 90;
      const DB_CHECK_PERCENT = 5;
      
      setUploadProgress(2);
      
      if (lines.length === 0) {
        setValidationErrors(['El archivo está vacío']);
        setValidationStatus('invalid');
        setUploadMessage({ type: 'error', text: 'El archivo está vacío' });
        return;
      }
      
      // Validar encabezados
      setUploadProgress(3);
      setValidationMessage('Validando encabezados...');
      
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
      
      if (errors.length > 0) {
        setUploadProgress(100);
        setValidationMessage('');
        await new Promise(resolve => setTimeout(resolve, 300));
        setValidationErrors(errors);
        setValidationStatus('invalid');
        setUploadMessage({ type: 'error', text: `Se encontraron ${errors.length} error(es) en el formato del archivo` });
        return;
      }
      
      // Validar filas de datos - preparación completa (5%)
      setUploadProgress(PREP_PERCENT);
      setValidationMessage(`Validando registros (0 de ${totalDataLines})...`);
      
      let subjectsCount = 0;
      let unitsCount = 0;
      let topicsCount = 0;
      
      // Mapas para detectar códigos duplicados dentro del archivo POR TIPO
      // Un código puede repetirse entre tipos diferentes, pero no dentro del mismo tipo
      const subjectCodesInFile = new Map<string, number>(); // código -> número de fila
      const unitCodesInFile = new Map<string, number>();
      const topicCodesInFile = new Map<string, number>();
      
      const duplicateCodes: Array<{code: string, tipo: string, rows: number[]}> = [];
      
      // Primera pasada: recolectar todos los códigos por tipo y detectar duplicados internos
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const values = line.split(';').map(v => v.trim().replace(/^"|"$/g, ''));
        
        if (values.length >= 3) {
          const tipo = values[0]?.toLowerCase();
          const codigo = values[2];
          
          if (codigo && ['asignatura', 'unidad', 'tema'].includes(tipo)) {
            const normalizedCode = codigo.toUpperCase();
            let targetMap: Map<string, number>;
            let tipoLabel: string;
            
            if (tipo === 'asignatura') {
              targetMap = subjectCodesInFile;
              tipoLabel = 'asignatura';
            } else if (tipo === 'unidad') {
              targetMap = unitCodesInFile;
              tipoLabel = 'unidad';
            } else {
              targetMap = topicCodesInFile;
              tipoLabel = 'tema';
            }
            
            if (targetMap.has(normalizedCode)) {
              // Encontrado duplicado del mismo tipo
              const existingEntry = duplicateCodes.find(d => d.code === normalizedCode && d.tipo === tipoLabel);
              if (existingEntry) {
                existingEntry.rows.push(i + 1);
              } else {
                duplicateCodes.push({
                  code: normalizedCode,
                  tipo: tipoLabel,
                  rows: [targetMap.get(normalizedCode)!, i + 1]
                });
              }
            } else {
              targetMap.set(normalizedCode, i + 1);
            }
          }
        }
      }
      
      // Agregar errores por códigos duplicados dentro del archivo (por tipo)
      duplicateCodes.forEach(dup => {
        errors.push(`Código "${dup.code}" duplicado para ${dup.tipo}s en el archivo (filas: ${dup.rows.join(', ')}). Cada código de ${dup.tipo} debe ser único.`);
      });
      
      // Validar integridad referencial: que asignatura_padre y unidad_padre existan en el archivo
      // Recolectar referencias para validar
      const referencesToValidate: Array<{row: number, tipo: string, field: string, code: string}> = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const values = line.split(';').map(v => v.trim().replace(/^"|"$/g, ''));
        
        if (values.length >= 6) {
          const tipo = values[0]?.toLowerCase();
          const asignaturaPadre = values[4];
          const unidadPadre = values[5];
          
          if (tipo === 'unidad' && asignaturaPadre) {
            referencesToValidate.push({
              row: i + 1,
              tipo: 'unidad',
              field: 'asignatura_padre',
              code: asignaturaPadre.toUpperCase()
            });
          }
          
          if (tipo === 'tema') {
            if (asignaturaPadre) {
              referencesToValidate.push({
                row: i + 1,
                tipo: 'tema',
                field: 'asignatura_padre',
                code: asignaturaPadre.toUpperCase()
              });
            }
            if (unidadPadre) {
              referencesToValidate.push({
                row: i + 1,
                tipo: 'tema',
                field: 'unidad_padre',
                code: unidadPadre.toUpperCase()
              });
            }
          }
        }
      }
      
      // Segunda pasada: validar estructura de cada fila
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
        
        // Validar código (obligatorio para todos)
        if (!codigo) {
          errors.push(`Fila ${i + 1}: el campo "codigo" es obligatorio`);
        }
        
        // Validaciones específicas por tipo
        const tipoLower = tipo.toLowerCase();
        
        if (tipoLower === 'asignatura') {
          subjectsCount++;
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
          if (nivelEducativo) {
            errors.push(`Fila ${i + 1}: las unidades no deben tener "nivel_educativo"`);
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
          if (nivelEducativo) {
            errors.push(`Fila ${i + 1}: los temas no deben tener "nivel_educativo"`);
          }
        }
        
        // Actualizar progreso proporcional al registro actual
        // Progreso = 5% (prep) + (registro_actual / total_registros) * 90%
        const currentRecord = i; // i=1 es el primer registro de datos
        const progress = PREP_PERCENT + Math.round((currentRecord / totalDataLines) * VALIDATION_PERCENT);
        setUploadProgress(progress);
        
        // Actualizar mensaje y agregar delay cada ciertos registros para visualización
        if (i % 5 === 0 || i === totalDataLines) {
          setValidationMessage(`Validando registros (${currentRecord} de ${totalDataLines})...`);
          await new Promise(resolve => setTimeout(resolve, 1)); // Mínimo delay para actualizar UI
        }
      }
      
      // Validación de registros completa (95%)
      setUploadProgress(PREP_PERCENT + VALIDATION_PERCENT);
      setValidationMessage('Verificando códigos existentes...');
      
      // Validar códigos contra elementos existentes en el sistema (solo si no hay errores previos de duplicados)
      const hasCodesInFile = subjectCodesInFile.size > 0 || unitCodesInFile.size > 0 || topicCodesInFile.size > 0;
      if (duplicateCodes.length === 0 && hasCodesInFile) {
        setUploadProgress(96);
        setImportStatus('Verificando códigos existentes...');
        
        try {
          // Cargar elementos existentes
          const existingSubjectsData = await fetchAllSubjects();
          const existingUnitsData = await fetchAllUnits();
          
          // Cargar niveles educativos para validar
          const educationalLevels = await fetchEducationalLevelsFromDataConnect();
          const levelByCodeMap = new Map<string, string>();
          const levelByNameMap = new Map<string, string>();
          educationalLevels.forEach((level: { code: string; name: string; levelId: string }) => {
            levelByCodeMap.set(level.code.toUpperCase(), level.levelId);
            levelByNameMap.set(level.name.toUpperCase(), level.levelId);
          });
          
          // Crear sets de códigos existentes (normalizados a mayúsculas)
          const existingSubjectCodes = new Set<string>();
          const existingUnitCodes = new Set<string>();
          const existingTopicCodes = new Set<string>();
          
          existingSubjectsData.subjects.forEach(subject => {
            if (subject.active && subject.code) {
              existingSubjectCodes.add(subject.code.toUpperCase());
            }
          });
          
          existingUnitsData.units.forEach(unit => {
            if (unit.active && unit.code) {
              existingUnitCodes.add(unit.code.toUpperCase());
            }
          });
          
          // Para los temas, necesitamos cargarlos también
          // Usamos los topics del hook useCurriculumHierarchy que ya está disponible
          topics.forEach(topic => {
            if (topic.active && topic.code) {
              existingTopicCodes.add(topic.code.toUpperCase());
            }
          });
          
          // Verificar cada código del archivo contra los existentes (detectar duplicados)
          // y validar que los niveles educativos existan
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const values = line.split(';').map(v => v.trim().replace(/^"|"$/g, ''));
            
            if (values.length >= 4) {
              const [tipo, , codigo, nivelEducativo] = values;
              const tipoLower = tipo?.toLowerCase();
              
              // Validar nivel educativo para asignaturas
              if (tipoLower === 'asignatura' && nivelEducativo) {
                const normalizedLevel = nivelEducativo.toUpperCase();
                const levelExists = levelByCodeMap.has(normalizedLevel) || levelByNameMap.has(normalizedLevel);
                if (!levelExists) {
                  errors.push(`Fila ${i + 1}: El nivel educativo "${nivelEducativo}" no existe en el sistema. Revisa los niveles disponibles en el módulo de configuración.`);
                }
              }
              
              // Validar códigos duplicados
              if (codigo && tipo) {
                const normalizedCode = codigo.toUpperCase();
                
                // Verificar según el tipo
                if (tipoLower === 'asignatura' && existingSubjectCodes.has(normalizedCode)) {
                  errors.push(`Fila ${i + 1}: El código "${codigo}" ya existe en el sistema como asignatura. Usa un código diferente o elimina esta fila si no deseas duplicar.`);
                } else if (tipoLower === 'unidad' && existingUnitCodes.has(normalizedCode)) {
                  errors.push(`Fila ${i + 1}: El código "${codigo}" ya existe en el sistema como unidad. Usa un código diferente o elimina esta fila si no deseas duplicar.`);
                } else if (tipoLower === 'tema' && existingTopicCodes.has(normalizedCode)) {
                  errors.push(`Fila ${i + 1}: El código "${codigo}" ya existe en el sistema como tema. Usa un código diferente o elimina esta fila si no deseas duplicar.`);
                }
              }
            }
          }
          
          // Validar integridad referencial: referencias padre deben existir en archivo O en DataConnect
          for (const ref of referencesToValidate) {
            if (ref.field === 'asignatura_padre') {
              // Buscar primero en el archivo, luego en DataConnect
              const existsInFile = subjectCodesInFile.has(ref.code);
              const existsInDB = existingSubjectCodes.has(ref.code);
              if (!existsInFile && !existsInDB) {
                errors.push(`Fila ${ref.row}: el ${ref.tipo} referencia a asignatura_padre "${ref.code}" que no existe ni en el archivo ni en el sistema.`);
              }
            } else if (ref.field === 'unidad_padre') {
              // Buscar primero en el archivo, luego en DataConnect
              const existsInFile = unitCodesInFile.has(ref.code);
              const existsInDB = existingUnitCodes.has(ref.code);
              if (!existsInFile && !existsInDB) {
                errors.push(`Fila ${ref.row}: el tema referencia a unidad_padre "${ref.code}" que no existe ni en el archivo ni en el sistema.`);
              }
            }
          }
        } catch (fetchError) {
          console.warn('No se pudieron cargar elementos existentes para validar duplicados:', fetchError);
          // Continuar sin esta validación si falla la carga
        }
      }
      
      // Completar el progreso al 100% ANTES de cambiar el estado
      setUploadProgress(100);
      setValidationMessage('Completado');
      await new Promise(resolve => setTimeout(resolve, 300));
      setValidationMessage('');
      
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
      
      // Mapas para almacenar IDs (por nombre)
      const subjectIdMap = new Map<string, string>();
      const unitIdMap = new Map<string, string>(); // key: "asignatura|unidad"
      
      // Cargar elementos existentes primero
      setImportStatus('Cargando elementos existentes...');
      setImportProgress(2);
      
      // Cargar asignaturas existentes
      const existingSubjectsData = await fetchAllSubjects();
      const subjectByCodeMap = new Map<string, string>();
      existingSubjectsData.subjects.forEach(subject => {
        if (subject.active) {
          subjectIdMap.set(subject.name, subject.subjectId);
          // Normalizar código a mayúsculas para búsqueda case-insensitive
          subjectByCodeMap.set(subject.code.toUpperCase(), subject.subjectId);
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
      const unitByCodeMap = new Map<string, string>();
      existingUnitsData.units.forEach(unit => {
        if (unit.active) {
          const subjectName = subjectIdToName.get(unit.subjectId);
          if (subjectName) {
            unitIdMap.set(`${subjectName}|${unit.name}`, unit.unitId);
            // Normalizar código a mayúsculas para búsqueda case-insensitive
            unitByCodeMap.set(unit.code.toUpperCase(), unit.unitId);
          }
        }
      });
      console.log(`Unidades existentes cargadas: ${unitIdMap.size}`);
      
      // Cargar niveles educativos existentes
      setImportStatus('Cargando niveles educativos...');
      setImportProgress(5);
      
      const educationalLevels = await fetchEducationalLevelsFromDataConnect();
      console.log('Niveles educativos cargados:', educationalLevels);
      
      // Crear mapas de niveles por código y nombre (case-insensitive)
      const levelByCodeMap = new Map<string, string>();
      const levelByNameMap = new Map<string, string>();
      educationalLevels.forEach((level: { code: string; name: string; levelId: string }) => {
        levelByCodeMap.set(level.code.toLowerCase(), level.levelId);
        levelByNameMap.set(level.name.toLowerCase(), level.levelId);
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
            
            // Buscar nivel educativo por código o nombre
            let levelId = levelByCodeMap.get(nivelEducativo.toLowerCase());
            if (!levelId) {
              levelId = levelByNameMap.get(nivelEducativo.toLowerCase());
            }
            
            if (!levelId) {
              throw new Error(`Nivel educativo "${nivelEducativo}" no encontrado. Revisa los niveles disponibles en el sistema.`);
            }
            
            const subjectId = await createNewSubject(
              nombre,
              codigo,
              levelId,
              user.id
            );
            
            // Actualizar todos los mapas necesarios
            subjectIdMap.set(nombre, subjectId);
            // Normalizar código a mayúsculas para búsqueda case-insensitive
            subjectByCodeMap.set(codigo.toUpperCase(), subjectId);
            subjectIdToName.set(subjectId, nombre); // ← IMPORTANTE: Agregar al mapa inverso
            
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
        const [tipo, nombre, codigo, , asignaturaPadre, , descripcion] = values;
        
        if (tipo.toLowerCase() === 'unidad') {
          try {
            // Buscar asignatura por código (normalizado a mayúsculas) o nombre
            let subjectId = subjectByCodeMap.get(asignaturaPadre.toUpperCase());
            if (!subjectId) {
              subjectId = subjectIdMap.get(asignaturaPadre);
            }
            if (!subjectId) {
              throw new Error(`Asignatura "${asignaturaPadre}" no encontrada`);
            }
            
            // Obtener el nombre real de la asignatura para la clave
            const subjectName = subjectIdToName.get(subjectId);
            if (!subjectName) {
              throw new Error(`No se pudo obtener el nombre de la asignatura con ID "${subjectId}"`);
            }
            
            const unitKey = `${subjectName}|${nombre}`;
            
            // Verificar si ya existe
            if (unitIdMap.has(unitKey)) {
              console.log(`Unidad "${nombre}" en asignatura "${asignaturaPadre}" ya existe, usando ID existente`);
              created++;
              setImportProgress(35 + (created / total) * 30);
              continue;
            }
            
            const unitId = await createNewUnit(
              nombre,
              codigo,
              subjectId,
              user.id,
              descripcion || undefined
            );
            
            unitIdMap.set(unitKey, unitId);
            // Normalizar código a mayúsculas para búsqueda case-insensitive
            unitByCodeMap.set(codigo.toUpperCase(), unitId);
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
        const [tipo, nombre, codigo, , asignaturaPadre, unidadPadre] = values;
        
        if (tipo.toLowerCase() === 'tema') {
          try {
            // Buscar asignatura por código (normalizado a mayúsculas) o nombre para construir la clave
            let subjectIdForKey = subjectByCodeMap.get(asignaturaPadre.toUpperCase());
            if (!subjectIdForKey) {
              subjectIdForKey = subjectIdMap.get(asignaturaPadre);
            }
            const subjectNameForKey = subjectIdForKey ? subjectIdToName.get(subjectIdForKey) : asignaturaPadre;
            
            // Buscar unidad por código (normalizado a mayúsculas) o nombre
            let unitId = unitByCodeMap.get(unidadPadre.toUpperCase());
            if (!unitId) {
              unitId = unitIdMap.get(`${subjectNameForKey}|${unidadPadre}`);
            }
            
            if (!unitId) {
              throw new Error(`Unidad "${unidadPadre}" en asignatura "${asignaturaPadre}" no encontrada`);
            }
            
            await createNewTopic(
              nombre,
              codigo,
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
