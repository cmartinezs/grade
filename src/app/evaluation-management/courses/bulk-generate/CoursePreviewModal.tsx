'use client';

import React, { useState } from 'react';
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

  // Calcular paginación
  const totalPages = Math.ceil(courses.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedCourses = courses.slice(start, start + PAGE_SIZE);

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

  // Acciones para cada fila
  const actions = [
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
        setSelectAll(newSelected.size === courses.length);
      },
      variant: (item: CourseToCreate) => {
        const itemIdx = courses.indexOf(item);
        return selectedCourses.has(String(itemIdx))
          ? 'outline-success'
          : 'outline-secondary';
      },
    },
  ];

  // Manejar "Seleccionar todos"
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedCourses(
        new Set(courses.map((_, idx) => String(idx)))
      );
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

      if (result.success) {
        onSuccess?.(result.coursesCreated);
        setTimeout(() => {
          onConfirm();
        }, 1500);
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

        {/* CONTENIDO PRINCIPAL */}
        {!isGenerating && courses.length === 0 ? (
          <Alert variant="warning" className="mb-0">
            📭 No hay cursos para generar. Por favor revisa tu selección.
          </Alert>
        ) : !isGenerating && (
          <>
            {/* Información General */}
            <div className="mb-4 p-3 bg-light rounded">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-2">
                    <strong>Institución:</strong> {institution}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-2">
                    <strong>Seleccionados:</strong>{' '}
                    <Badge
                      bg={
                        selectedCount === totalCount
                          ? 'success'
                          : selectedCount > 0
                            ? 'warning'
                            : 'secondary'
                      }
                    >
                      {selectedCount} de {totalCount}
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
        {totalPages > 1 && !isGenerating && (
        <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={PAGE_SIZE}
            totalItems={totalCount}
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
                  disabled={isGenerating || selectedCount === 0}
                >
                  💾 Guardar {selectedCount > 0 ? `(${selectedCount})` : ''}
                </Button>
              </div>
      </Modal.Footer>
    </Modal>
  );
}
