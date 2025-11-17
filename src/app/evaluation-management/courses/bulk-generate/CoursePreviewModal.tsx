'use client';

import React, { useState } from 'react';
import {
  Modal,
  Button,
  Badge,
  Alert,
  Spinner,
  Form,
} from 'react-bootstrap';
import DataTableContent from '@/components/shared/DataTableContent';
import PaginationControl from '@/components/shared/PaginationControl';
import { ColumnConfig } from '@/components/shared/MasterDataTable';
import { CourseToCreate } from '@/lib/courseDataLoader';

interface CoursePreviewModalProps {
  show: boolean;
  courses: CourseToCreate[];
  isLoading?: boolean;
  onConfirm: (coursesToSave: CourseToCreate[]) => void;
  onCancel: () => void;
  title?: string;
  institution?: string;
}

const PAGE_SIZE = 10;

/**
 * CoursePreviewModal Component
 * 
 * Modal que muestra una vista previa paginada de los cursos a generar
 * antes de guardarlos en la base de datos.
 */
export default function CoursePreviewModal({
  show,
  courses,
  isLoading = false,
  onConfirm,
  onCancel,
  title = 'Vista Previa de Cursos',
  institution = '',
}: CoursePreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(
    new Set(courses.map((_, idx) => String(idx)))
  );

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

  // Guardar solo los seleccionados
  const handleConfirm = () => {
    const coursesToSave = courses.filter((_, idx) =>
      selectedCourses.has(String(idx))
    );
    onConfirm(coursesToSave);
  };

  const selectedCount = selectedCourses.size;
  const totalCount = courses.length;

  return (
    <Modal show={show} onHide={onCancel} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Generando vista previa...</span>
            </Spinner>
            <p className="mt-3 text-muted">Generando lista de cursos...</p>
          </div>
        ) : courses.length === 0 ? (
          <Alert variant="warning" className="mb-0">
            📭 No hay cursos para generar. Por favor revisa tu selección.
          </Alert>
        ) : (
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
              <Form.Check
                type="checkbox"
                id="selectAllCheckbox"
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
                isLoading={isLoading}
                emptyMessage="No hay cursos en esta página"
                emptyIcon="📋"
              />
          </>
        )}
      </Modal.Body>

      <Modal.Footer style={{display: 'block'}}>
        {totalPages > 1 && (
        <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={PAGE_SIZE}
            totalItems={totalCount}
            isLoading={isLoading}
            onPageChange={setCurrentPage}
        />
        )}
              <div className="d-flex gap-2 text-end justify-content-end mt-3">
                <Button
                  variant="outline-secondary"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleConfirm}
                  disabled={isLoading || selectedCount === 0}
                >
                  ✅ Guardar {selectedCount > 0 ? `(${selectedCount})` : ''}
                </Button>
              </div>
      </Modal.Footer>
    </Modal>
  );
}
