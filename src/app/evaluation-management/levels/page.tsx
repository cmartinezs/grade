'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/MasterDataTable';
import { Badge } from 'react-bootstrap';
import ChileDataLoaderModal from '@/components/ChileDataLoaderModal';
import { useChileLoaderModalState } from '@/hooks/useChileLoaderModalState';
import { useAuth } from '@/contexts/AuthContext';
import { levelStore } from '@/lib/levelStore';
import { EducationalLevel } from '@/types/level';

const PAGE_SIZE = 10;

export default function LevelsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { isDismissed, dismiss, isLoading: isChileLoaderLoading } = useChileLoaderModalState();
  const [levels, setLevels] = useState<EducationalLevel[]>([]);
  const [totalLevels, setTotalLevels] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChileLoader, setShowChileLoader] = useState(false);

  // Load levels when page or search changes
  useEffect(() => {
    const loadLevelsData = async () => {
      setIsLoading(true);
      try {
        // First load from Data-Connect if not already loaded
        await levelStore.loadLevels();
        
        // Then get paginated results from cache
        const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
          includeInactive: true,
          searchText,
        });
        setLevels(result.levels);
        setTotalLevels(result.total);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error('Error loading levels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLevelsData();
  }, [currentPage, searchText]);

  // Check if there are levels and show loader if empty (only once on mount)
  useEffect(() => {
    // No mostrar nada mientras se carga el estado del localStorage
    if (isChileLoaderLoading) {
      return;
    }

    const checkAndShowLoader = async () => {
      try {
        // Load from Data-Connect
        await levelStore.loadLevels();
        
        // Check if we have levels
        const allLevels = levelStore.getAllLevels();
        if (allLevels.length === 0) {
          if (!isDismissed) {
            setShowChileLoader(true);
          }
        } else {
          setShowChileLoader(false);
        }
      } catch (error) {
        console.error('Error checking levels:', error);
      }
    };

    if (isDismissed) {
      // Si fue cerrado, no mostrar modal
      setShowChileLoader(false);
      return;
    }

    checkAndShowLoader();
  }, [isDismissed, isChileLoaderLoading]);

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
        userId: user?.id,
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

  const handleDeleteLevel = async (level: EducationalLevel) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este nivel?')) {
      try {
        await levelStore.deleteLevel(level.id, user?.id);
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

  const handleChileDataLoaded = () => {
    // Recargar niveles después de cargar datos de Chile
    const result = levelStore.getPaginatedLevels(1, PAGE_SIZE, {
      includeInactive: true,
      searchText: '',
    });
    setLevels(result.levels);
    setTotalLevels(result.total);
    setTotalPages(result.totalPages);
    setCurrentPage(1);
    setSearchText('');
  };

  const handleChileLoaderClose = () => {
    setShowChileLoader(false);
    dismiss(); // Marcar como cerrado en localStorage
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
    <>
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
        onPreloadData={() => setShowChileLoader(true)}
        showPreloadButton={true}
        emptyMessage="No hay niveles creados aún"
        emptyIcon="📭"
        emptyActionLabel="Crear Primer Nivel"
      />
      
      <ChileDataLoaderModal
        show={showChileLoader}
        onHide={handleChileLoaderClose}
        onSuccess={handleChileDataLoaded}
        title="📍 Cargar Niveles de Chile"
        description="No se encontraron niveles educacionales. ¿Deseas cargar los niveles del sistema educativo chileno?"
      />
    </>
  );
}
