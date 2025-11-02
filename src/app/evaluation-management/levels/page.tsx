'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/MasterDataTable';
import { Badge } from 'react-bootstrap';
import { levelStore } from '@/lib/levelStore';
import { EducationalLevel } from '@/types/level';

const PAGE_SIZE = 10;

export default function LevelsPage() {
  const router = useRouter();
  const [levels, setLevels] = useState<EducationalLevel[]>([]);
  const [totalLevels, setTotalLevels] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load levels when page or search changes
  useEffect(() => {
    setIsLoading(true);
    const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
      includeInactive: true,
      searchText,
    });
    setLevels(result.levels);
    setTotalLevels(result.total);
    setTotalPages(result.totalPages);
    setIsLoading(false);
  }, [currentPage, searchText]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleToggleStatus = (level: EducationalLevel) => {
    try {
      levelStore.updateLevel(level.id, {
        name: level.name,
        code: level.code,
        description: level.description,
        isActive: !level.isActive,
      });
      // Reload current page
      const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
        includeInactive: true,
        searchText,
      });
      setLevels(result.levels);
      setTotalLevels(result.total);
      setTotalPages(result.totalPages);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleDeleteLevel = (level: EducationalLevel) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este nivel?')) {
      try {
        levelStore.deleteLevel(level.id);
        // Reload current page
        const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
          includeInactive: true,
          searchText,
        });
        setLevels(result.levels);
        setTotalLevels(result.total);
        setTotalPages(result.totalPages);
      } catch (error) {
        alert(`Error al eliminar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  };

  const handleEditLevel = (level: EducationalLevel) => {
    router.push(`/evaluation-management/levels/edit?id=${level.id}`);
  };

  const columns: ColumnConfig<EducationalLevel>[] = [
    {
      key: 'code',
      label: 'Código',
      render: (value) => <code>{String(value)}</code>,
    },
    {
      key: 'name',
      label: 'Nombre',
      render: (value) => <span className="fw-bold">{String(value)}</span>,
    },
    {
      key: 'description',
      label: 'Descripción',
    },
    {
      key: 'courseCount',
      label: 'Cursos',
      render: (value) => <Badge bg="info">{String(value || 0)}</Badge>,
      width: '80px',
    },
    {
      key: 'isActive',
      label: 'Estado',
      render: (value) => (
        <Badge bg={value ? 'success' : 'secondary'}>
          {value ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
      width: '100px',
    },
  ];

  const actions: ActionButton<EducationalLevel>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: handleEditLevel,
      variant: 'outline-primary',
      title: 'Editar nivel',
    },
    {
      icon: (level) => (level.isActive ? '🔒' : '🔓'),
      label: (level) => (level.isActive ? 'Desactivar' : 'Activar'),
      onClick: handleToggleStatus,
      variant: (level) => (level.isActive ? 'outline-warning' : 'outline-success'),
      title: (level) => (level.isActive ? 'Desactivar' : 'Activar'),
    },
    {
      icon: '🗑️',
      label: 'Eliminar',
      onClick: handleDeleteLevel,
      variant: 'outline-danger',
      title: 'Eliminar nivel',
    },
  ];

  return (
    <MasterDataTable<EducationalLevel>
      items={levels}
      totalItems={totalLevels}
      totalPages={totalPages}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      isLoading={isLoading}
      title="Gestión de Niveles Educacionales"
      description="Administra los niveles educacionales del sistema"
      icon="📊"
      columns={columns}
      actions={actions}
      searchText={searchText}
      onSearchChange={setSearchText}
      onPageChange={setCurrentPage}
      onCreateClick={() => router.push('/evaluation-management/levels/create')}
      createButtonLabel="Nuevo Nivel"
      createButtonIcon="➕"
      emptyMessage="No hay niveles creados aún"
      emptyIcon="📭"
      emptyActionLabel="Crear Primer Nivel"
    />
  );
}
