'use client';

import React from 'react';
import Link from 'next/link';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  InputGroup,
} from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import DataTableContent from './DataTableContent';
import PaginationControl from './PaginationControl';

/**
 * Column configuration for the data table
 */
export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  width?: string;
  sortable?: boolean;
}

/**
 * Stat card to display in header
 */
export interface StatCard {
  label: string;
  value: number | string;
  icon: string;
  variant?: string; // Bootstrap color: 'success', 'warning', 'info', 'danger', etc.
}

/**
 * Action button configuration
 */
export interface ActionButton<T> {
  label: string | ((item: T) => string);
  icon: string | ((item: T) => string);
  onClick: (item: T) => void;
  variant?: string | ((item: T) => string);
  title?: string | ((item: T) => string);
  show?: (item: T) => boolean;
}

/**
 * Props for MasterDataTable component
 */
export interface MasterDataTableProps<T> {
  // Data
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  isLoading?: boolean;

  // Configuration
  title: string;
  description?: string;
  icon?: string;

  // Search/Filter
  searchText: string;
  onSearchChange: (text: string) => void;
  onPageChange: (page: number) => void;
  searchPlaceholder?: string;
  hideSearch?: boolean;

  // Table configuration
  columns: ColumnConfig<T>[];
  actions?: ActionButton<T>[];

  // Callbacks
  onCreateClick: () => void;
  onSortChange?: (column: keyof T, direction: 'asc' | 'desc') => void;
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  createButtonLabel?: string;
  createButtonIcon?: string;
  
  // Preload button (opcional)
  onPreloadClick?: () => void;
  preloadButtonLabel?: string;
  preloadButtonIcon?: string;

  // Stat cards
  statCards?: StatCard[];

  // Empty state
  emptyMessage?: string;
  emptyIcon?: string;
  emptyActionLabel?: string;
  emptyActionHref?: string;
}

/**
 * MasterDataTable Component
 *
 * A reusable, generic data table component for displaying paginated lists
 * with search, filtering, and action buttons.
 *
 * Usage:
 * ```tsx
 * <MasterDataTable<EducationalLevel>
 *   items={levels}
 *   totalItems={totalLevels}
 *   totalPages={totalPages}
 *   currentPage={currentPage}
 *   pageSize={PAGE_SIZE}
 *   title="Gestión de Niveles"
 *   columns={[
 *     { key: 'name', label: 'Nombre' },
 *     { key: 'code', label: 'Código' },
 *   ]}
 *   searchText={searchText}
 *   onSearchChange={setSearchText}
 *   onPageChange={setCurrentPage}
 *   onCreateClick={() => setShowModal(true)}
 *   actions={[
 *     {
 *       icon: '🔓',
 *       label: 'Toggle',
 *       onClick: (item) => handleToggle(item),
 *     }
 *   ]}
 * />
 * ```
 */
export default function MasterDataTable<T>(
  props: MasterDataTableProps<T>
) {
  const {
    items,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    isLoading = false,
    title,
    description,
    icon = '📊',
    searchText,
    onSearchChange,
    onPageChange,
    searchPlaceholder = 'Buscar en todas las columnas...',
    hideSearch = false,
    columns,
    actions = [],
    onCreateClick,
    createButtonLabel = 'Crear',
    createButtonIcon = '➕',
    onPreloadClick,
    preloadButtonLabel = '📥 Pre-carga',
    preloadButtonIcon,
    emptyMessage = 'No hay elementos',
    emptyIcon = '📭',
    emptyActionLabel = 'Crear Elemento',
    emptyActionHref,
    onSortChange,
    sortColumn,
    sortDirection = 'asc',
  } = props;

  const hasResults = items.length > 0;

  return (
    <Container fluid>
      {/* Header */}
      <PageHeader
        icon={icon}
        title={title}
        description={
          description ? (
            <>
              {description}
              <Badge bg="secondary" className="ms-2">
                {totalItems} elemento{totalItems !== 1 ? 's' : ''}
              </Badge>
            </>
          ) : (
            <Badge bg="secondary">
              {totalItems} elemento{totalItems !== 1 ? 's' : ''}
            </Badge>
          )
        }
      />

      {/* Data Table Card */}
      <Card>
        {/* Header with Search */}
        {!hideSearch && (
          <Card.Header className="bg-light">
            <Row className="align-items-center g-0">
              <Col md={4}>
                <InputGroup>
                  <InputGroup.Text>🔍</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                    disabled={isLoading}
                  />
                  {searchText && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => onSearchChange('')}
                      disabled={isLoading}
                    >
                      ✕
                    </Button>
                  )}
                </InputGroup>
              </Col>
              <Col md={4}></Col>
              <Col md={4} className="text-end">
                <div className="d-flex align-items-center gap-2 justify-content-end">
                  {hasResults && (
                    <Button
                      onClick={onCreateClick}
                      variant="primary"
                      className="d-flex align-items-center gap-2"
                    >
                      <span>{createButtonIcon}</span>
                      <span>{createButtonLabel}</span>
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Card.Header>
        )}

        {/* Table Body */}
        <Card.Body className="p-0">
          <DataTableContent<T>
            items={items}
            columns={columns}
            actions={actions}
            isLoading={isLoading}
            currentPage={currentPage}
            pageSize={pageSize}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSortChange={onSortChange}
            emptyMessage={emptyMessage}
            emptyIcon={emptyIcon}
          />

          {/* Empty State with Actions */}
          {!isLoading && !hasResults && (
            <div className="text-center py-5">
              <div className="mt-4 d-flex gap-2 justify-content-center">
                {/* Botón Precarga - solo si no hay búsqueda y no hay datos */}
                {!searchText && totalItems === 0 && onPreloadClick && (
                  <Button
                    variant="info"
                    onClick={onPreloadClick}
                    disabled={isLoading}
                    className="d-flex align-items-center gap-2"
                  >
                    {preloadButtonIcon || '📥'} {preloadButtonLabel}
                  </Button>
                )}

                {/* Botón Crear - siempre que no haya búsqueda */}
                {!searchText && (
                  <Button
                    variant="outline-primary"
                    onClick={onCreateClick}
                    disabled={isLoading}
                    className="d-flex align-items-center gap-2"
                  >
                    {createButtonIcon} {createButtonLabel}
                  </Button>
                )}

                {/* Botón Generación Masiva - solo si no hay cursos y no hay búsqueda */}
                {!searchText && totalItems === 0 && emptyActionHref && (
                  <Link
                    href={emptyActionHref}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      variant="outline-success"
                      disabled={isLoading}
                      className="d-flex align-items-center gap-2"
                    >
                      ⚡ {emptyActionLabel}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </Card.Body>
        <Card.Footer className="bg-light text-center">
          {totalPages >= 1 && (
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              isLoading={isLoading}
              onPageChange={onPageChange}
            />
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}
