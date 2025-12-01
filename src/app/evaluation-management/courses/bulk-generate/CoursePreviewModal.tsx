'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Modal,
  Button,
  Badge,
  Alert,
  Form,
  ProgressBar,
} from 'react-bootstrap';
import DataTableContent from '@/components/shared/DataTableContent';
import PaginationControl from '@/components/shared/PaginationControl';
import { ColumnConfig } from '@/components/shared/MasterDataTable';
import { CourseToCreate, CourseGenerationOptions } from '@/lib/courseDataLoader';
import { useCourseDataLoader } from '@/hooks/useCourseDataLoader';

interface ProgressState {
  currentStep: string;
  currentIndex: number;
  total: number;
  itemName: string;
  percentage: number;
}

interface CoursePreviewModalProps {
  show: boolean;
  courses: CourseToCreate[];
  generationOptions: CourseGenerationOptions | null;
  institution?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onSuccess?: (coursesCreated: number) => void;
  onError?: (error: string) => void;
}

const PAGE_SIZE = 10;

/**
 * CoursePreviewModal Component
 * 
 * Modal que muestra una vista previa paginada de los cursos a generar
 * y ejecuta la generación con progress bar.
 */
export default function CoursePreviewModal({
  show,
  courses,
  generationOptions,
  institution = '',
  onConfirm,
  onCancel,
  onSuccess,
  onError,
}: CoursePreviewModalProps) {
  const { generateCourses } = useCourseDataLoader();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(
    new Set()
  );
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({
    currentStep: '',
    currentIndex: 0,
    total: 0,
    itemName: '',
    percentage: 0,
  });
  const [generationError, setGenerationError] = useState<string>('');
  const [failedCourses, setFailedCourses] = useState<Map<string, string>>(new Map()); // Map<courseCode, errorMessage>
  const [createdCourses, setCreatedCourses] = useState<Set<number>>(new Set()); // Set de índices de cursos creados exitosamente

  // Resetear estado cuando cambian los cursos (nueva generación)
  useEffect(() => {
    if (show) {
      setCreatedCourses(new Set());
      setFailedCourses(new Map());
      setSelectedCourses(new Set());
      setSelectAll(false);
      setCurrentPage(1);
      setProgress({
        currentStep: '',
        currentIndex: 0,
        total: 0,
        itemName: '',
        percentage: 0,
      });
      setGenerationError('');
    }
  }, [courses.length, show]); // Resetear cuando cambia la cantidad de cursos o se abre el modal

  // Filtrar cursos: mostrar solo los que NO han sido creados exitosamente
  const pendingCourses = useMemo(() => {
    return courses.filter((_, idx) => !createdCourses.has(idx));
  }, [courses, createdCourses]);

  // Calcular paginación sobre los cursos pendientes
  const totalPages = Math.ceil(pendingCourses.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedCourses = pendingCourses.slice(start, start + PAGE_SIZE);

  // Columnas para la tabla
  const columns: ColumnConfig<CourseToCreate>[] = [
    { key: 'code', label: 'Código', sortable: true, width: '300px' },
    { key: 'name', label: 'Nombre', sortable: true },
    {
      key: 'section',
      label: 'Paralelo',
      render: (value) => value || '—',
      width: '100px',
    },
  ];

  // Acciones para cada fila - useMemo para recalcular cuando failedCourses cambie
  const actions = useMemo(() => [
    {
      label: (item: CourseToCreate) => {
        const itemIdx = courses.indexOf(item);
        return selectedCourses.has(String(itemIdx)) ? '✓ Incluir' : '✕ Excluir';
      },
      icon: (item: CourseToCreate) => {
        const itemIdx = courses.indexOf(item);
        return selectedCourses.has(String(itemIdx)) ? '✅' : '⊘';
      },
      onClick: (item: CourseToCreate) => {
        const itemIdx = courses.indexOf(item);
        const newSelected = new Set(selectedCourses);
        if (newSelected.has(String(itemIdx))) {
          newSelected.delete(String(itemIdx));
        } else {
          newSelected.add(String(itemIdx));
        }
        setSelectedCourses(newSelected);
        setSelectAll(newSelected.size === pendingCourses.length);
      },
      variant: (item: CourseToCreate) => {
        const itemIdx = courses.indexOf(item);
        return selectedCourses.has(String(itemIdx))
          ? 'outline-success'
          : 'outline-secondary';
      },
    },
    {
      label: () => 'Ver Error',
      icon: (item: CourseToCreate) => {
        const error = failedCourses.get(item.code);
        console.log('[CoursePreviewModal] Rendering error action for course:', item.code, 'error:', error, 'failedCourses size:', failedCourses.size);
        return error ? '❌' : '';
      },
      onClick: (item: CourseToCreate) => {
        const error = failedCourses.get(item.code);
        if (error) {
          alert(`Error en ${item.code}:\n\n${error}`);
        }
      },
      variant: () => 'outline-danger',
      tooltip: (item: CourseToCreate) => {
        const error = failedCourses.get(item.code);
        return error ? `Error: ${error}` : 'Este curso no tiene errores';
      },
      hidden: (item: CourseToCreate) => !failedCourses.has(item.code),
    },
  ], [selectedCourses, failedCourses, courses, pendingCourses.length]); // Re-calcular cuando cambien las dependencias

  // Manejar "Seleccionar todos"
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      // Seleccionar solo los cursos pendientes (no creados)
      const pendingIndices = pendingCourses.map((course) => String(courses.indexOf(course)));
      setSelectedCourses(new Set(pendingIndices));
    } else {
      setSelectedCourses(new Set());
    }
  };

  // Generar cursos seleccionados
  const handleConfirm = async () => {
    if (!generationOptions) return;
    
    const selectedIndices = Array.from(selectedCourses).map(Number);
    const coursesToSave = selectedIndices.map(idx => courses[idx]);

    if (coursesToSave.length === 0) return;

    // Determinar si se están generando TODOS los cursos PENDIENTES
    const totalPendingCourses = pendingCourses.length;
    const selectedCount = coursesToSave.length;
    const isGeneratingAll = selectedCount === totalPendingCourses;

    setIsGenerating(true);
    setGenerationError('');
    
    try {
      const result = await generateCourses(
        generationOptions,
        (progressUpdate: ProgressState) => {
          setProgress(progressUpdate);
        },
        coursesToSave
      );

      // Guardar información de cursos fallidos
      if (result.failedCourses && result.failedCourses.length > 0) {
        console.log('[CoursePreviewModal] Failed courses received:', result.failedCourses);
        const newFailedCourses = new Map(failedCourses);
        result.failedCourses.forEach(failed => {
          console.log('[CoursePreviewModal] Adding failed course:', failed.courseCode, '→', failed.error);
          newFailedCourses.set(failed.courseCode, failed.error);
        });
        console.log('[CoursePreviewModal] Updated failedCourses Map:', Array.from(newFailedCourses.entries()));
        setFailedCourses(newFailedCourses);
      }

      if (result.success) {
        // Marcar cursos creados exitosamente
        const newCreatedCourses = new Set(createdCourses);
        selectedIndices.forEach(idx => {
          const course = courses[idx];
          // Solo marcar como creado si no está en la lista de fallidos
          if (!result.failedCourses?.find(fc => fc.courseCode === course.code)) {
            newCreatedCourses.add(idx);
          }
        });
        setCreatedCourses(newCreatedCourses);
        
        if (isGeneratingAll && newCreatedCourses.size === courses.length) {
          // TODOS los cursos pendientes generados → Llamar onSuccess → Cerrar modal
          onSuccess?.(result.coursesCreated);
          setTimeout(() => {
            onConfirm();
          }, 1500);
        } else {
          // ALGUNOS cursos generados → Deseleccionar → Mantener modal abierto
          setTimeout(() => {
            // Deseleccionar los cursos que ya fueron generados
            const newSelectedCourses = new Set(selectedCourses);
            selectedIndices.forEach(idx => {
              const course = courses[idx];
              // Solo deseleccionar si no falló
              if (!result.failedCourses?.find(fc => fc.courseCode === course.code)) {
                newSelectedCourses.delete(String(idx));
              }
            });
            setSelectedCourses(newSelectedCourses);
            setSelectAll(false);
            
            // Resetear a la primera página si es necesario
            if (currentPage > 1) {
              setCurrentPage(1);
            }
            
            // Mostrar mensaje de éxito sin cerrar
            const pendingCount = courses.length - newCreatedCourses.size;
            setProgress({
              currentStep: '✅ Cursos creados exitosamente',
              currentIndex: coursesToSave.length,
              total: coursesToSave.length,
              itemName: `${result.coursesCreated} cursos creados. ${pendingCount} pendientes`,
              percentage: 100,
            });
            
            setIsGenerating(false);
          }, 1500);
        }
      } else {
        setGenerationError(result.message || '❌ Error al crear los cursos');
        onError?.(result.message || '❌ Error al crear los cursos');
        setIsGenerating(false);
      }
    } catch (err) {
      const errorMsg = `Error: ${err instanceof Error ? err.message : 'Error desconocido'}`;
      setGenerationError(errorMsg);
      onError?.(errorMsg);
      setIsGenerating(false);
    }
  };

  const selectedCount = selectedCourses.size;
  const totalCount = courses.length;
  const pendingCount = pendingCourses.length;
  const createdCount = createdCourses.size;

  return (
    <Modal show={show} onHide={onCancel} size="xl" backdrop={isGenerating ? 'static' : true}>
      <Modal.Header closeButton={!isGenerating}>
        <Modal.Title>Vista Previa de Cursos</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* PROGRESS BAR DURANTE LA GENERACIÓN */}
        {isGenerating && (
          <div className="text-center py-5">
            <p className="mb-3">
              <span style={{ fontSize: '2rem' }}>{progress.currentStep}</span>
            </p>
            <ProgressBar
              animated
              striped
              variant="success"
              now={progress.percentage}
              label={`${Math.round(progress.percentage)}%`}
              className="mb-3"
              style={{ height: '30px' }}
            />
            <p className="mb-2">
              <strong>
                {progress.currentIndex} de {progress.total}
              </strong>
            </p>
            <p className="text-muted">{progress.itemName}</p>
          </div>
        )}

        {/* ERROR DURANTE LA GENERACIÓN */}
        {generationError && (
          <Alert variant="danger" dismissible onClose={() => setGenerationError('')}>
            {generationError}
          </Alert>
        )}

        {/* MENSAJE DE ÉXITO PARCIAL (cuando modal se mantiene abierto) */}
        {!isGenerating && progress.percentage === 100 && pendingCount > 0 && (
          <Alert variant="success" dismissible onClose={() => setProgress({ ...progress, percentage: 0 })}>
            <Alert.Heading>✅ ¡Éxito Parcial!</Alert.Heading>
            <p className="mb-0">
              {progress.itemName}. Puedes seleccionar más cursos para generar.
            </p>
          </Alert>
        )}

        {/* CONTENIDO PRINCIPAL */}
        {!isGenerating && pendingCourses.length === 0 ? (
          <Alert variant="success" className="mb-0">
            ✅ Todos los cursos han sido creados exitosamente. Total: {totalCount}
          </Alert>
        ) : !isGenerating && (
          <>
            {/* Información General */}
            <div className="mb-4 p-3 bg-light rounded">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-2">
                    <strong>Institución:</strong> {institution}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-2">
                    <strong>Creados:</strong>{' '}
                    <Badge bg="success">{createdCount} de {totalCount}</Badge>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-2">
                    <strong>Seleccionados:</strong>{' '}
                    <Badge
                      bg={
                        selectedCount === pendingCount
                          ? 'success'
                          : selectedCount > 0
                            ? 'warning'
                            : 'secondary'
                      }
                    >
                      {selectedCount} de {pendingCount} pendientes
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkbox Seleccionar Todo y Botones */}
            <div className="d-flex align-items-center justify-content-between mb-3 gap-2">
              <Form.Switch
                id="selectAllSwitch"
                label="Seleccionar todos los cursos"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </div>

            {/* Tabla de Cursos */}
            <DataTableContent<CourseToCreate>
                items={paginatedCourses}
                columns={columns}
                actions={actions}
                currentPage={currentPage}
                pageSize={PAGE_SIZE}
                isLoading={false}
                emptyMessage="No hay cursos en esta página"
                emptyIcon="📋"
              />
          </>
        )}
      </Modal.Body>

      <Modal.Footer style={{display: 'block'}}>
        {totalPages > 1 && !isGenerating && pendingCount > 0 && (
        <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={PAGE_SIZE}
            totalItems={pendingCount}
            isLoading={false}
            onPageChange={setCurrentPage}
        />
        )}
              <div className="d-flex gap-2 text-end justify-content-end mt-3">
                <Button
                  variant="outline-secondary"
                  onClick={onCancel}
                  disabled={isGenerating}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleConfirm}
                  disabled={isGenerating || selectedCount === 0 || pendingCount === 0}
                >
                  💾 Guardar {selectedCount > 0 ? `(${selectedCount})` : ''}
                </Button>
              </div>
      </Modal.Footer>
    </Modal>
  );
}
