'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/MasterDataTable';
import { Badge } from 'react-bootstrap';
import { levelStore } from '@/lib/levelStore';
import { LevelCategory } from '@/types/level';

const PAGE_SIZE = 10;

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<LevelCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<LevelCategory[]>([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load all categories on mount
  useEffect(() => {
    const allCategories = levelStore.getAllCategories();
    setCategories(allCategories);
    setTotalCategories(allCategories.length);
  }, []);

  // Filter and paginate categories
  useEffect(() => {
    setIsLoading(true);
    
    // Filter by search text
    const filtered = categories.filter(cat =>
      cat.name.toLowerCase().includes(searchText.toLowerCase()) ||
      cat.code.toLowerCase().includes(searchText.toLowerCase())
    );
    
    setTotalCategories(filtered.length);
    
    // Paginate
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginatedCategories = filtered.slice(startIndex, startIndex + PAGE_SIZE);
    
    setFilteredCategories(paginatedCategories);
    setIsLoading(false);
  }, [categories, currentPage, searchText]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const handleEditCategory = (category: LevelCategory) => {
    router.push(`/evaluation-management/categories/edit?id=${category.id}`);
  };

  const handleToggleStatus = (category: LevelCategory) => {
    try {
      levelStore.updateCategory(category.id, {
        name: category.name,
        code: category.code,
        description: category.description,
        categoryId: category.categoryId ?? undefined,
        isActive: !category.isActive,
      });

      // Reload data
      const result = levelStore.getAllCategories();
      setCategories(result);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleDeleteCategory = (category: LevelCategory) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar esta categoría?`)) {
      try {
        levelStore.deleteCategory(category.id);
        
        // Reload data
        const result = levelStore.getAllCategories();
        setCategories(result);
      } catch (error) {
        alert(`Error al eliminar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  };

  const columns: ColumnConfig<LevelCategory>[] = [
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
      key: 'id',
      label: 'Niveles',
      width: '80px',
      render: (categoryId) => {
        const levels = levelStore.getLevelsByCategory(categoryId as number);
        return <Badge bg="info">{String(levels.length || 0)}</Badge>;
      },
    },
    {
      key: 'isActive',
      label: 'Estado',
      render: (value) => (
        <Badge bg={value ? 'success' : 'secondary'}>
          {value ? 'Activa' : 'Inactiva'}
        </Badge>
      ),
      width: '100px',
    },
  ];

  const actions: ActionButton<LevelCategory>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: handleEditCategory,
      variant: 'outline-primary',
      title: 'Editar categoría',
    },
    {
      icon: (category) => (category.isActive ? '🔒' : '🔓'),
      label: (category) => (category.isActive ? 'Desactivar' : 'Activar'),
      onClick: handleToggleStatus,
      variant: (category) => (category.isActive ? 'outline-warning' : 'outline-success'),
      title: (category) => (category.isActive ? 'Desactivar' : 'Activar'),
    },
    {
      icon: '🗑️',
      label: 'Eliminar',
      onClick: handleDeleteCategory,
      variant: 'outline-danger',
      title: 'Eliminar categoría',
    },
  ];

  return (
    <MasterDataTable<LevelCategory>
      title="📂 Gestión de Categorías de Niveles"
      description="Administra las categorías de niveles educacionales"
      columns={columns}
      items={filteredCategories}
      totalItems={totalCategories}
      totalPages={Math.ceil(totalCategories / PAGE_SIZE)}
      pageSize={PAGE_SIZE}
      currentPage={currentPage}
      isLoading={isLoading}
      searchText={searchText}
      onSearchChange={setSearchText}
      onPageChange={setCurrentPage}
      searchPlaceholder="Buscar por código, nombre..."
      onCreateClick={() => router.push('/evaluation-management/categories/create')}
      createButtonLabel="Nueva Categoría"
      createButtonIcon="➕"
      actions={actions}
    />
  );
}
