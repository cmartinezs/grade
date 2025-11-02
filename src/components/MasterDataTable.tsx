'use client';

import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Table,
  Form,
  InputGroup,
  Pagination,
  Spinner,
} from 'react-bootstrap';

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
  createButtonLabel?: string;
  createButtonIcon?: string;

  // Stat cards
  statCards?: StatCard[];

  // Empty state
  emptyMessage?: string;
  emptyIcon?: string;
  emptyActionLabel?: string;
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
    statCards = [],
    emptyMessage = 'No hay elementos',
    emptyIcon = '📭',
    emptyActionLabel = 'Crear Elemento',
  } = props;

  const hasResults = items.length > 0;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="d-flex align-items-baseline gap-3">
                <h1 className="mb-0">
                  {icon} {title}
                </h1>
                {description && (
                  <p className="text-muted mb-0">
                    {description}
                    <Badge bg="secondary" className="ms-2">
                      {totalItems} elemento{totalItems !== 1 ? 's' : ''}
                    </Badge>
                  </p>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stat Cards */}
      {statCards.length > 0 && (
        <Row className="mb-4">
          {statCards.map((stat, idx) => (
            <Col md={12 / Math.min(statCards.length, 4)} key={idx} className="mb-3">
              <Card className={`bg-light`}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1">{stat.label}</p>
                      <h3 className="mb-0">{stat.value}</h3>
                    </div>
                    <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Data Table Card */}
      <Row>
        <Col>
          <Card>
            {/* Header with Search */}
            {!hideSearch && (
              <Card.Header className="bg-light">
                <Row className="align-items-center">
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
                    <Button
                      onClick={onCreateClick}
                      variant="primary"
                      size="sm"
                      className="d-flex align-items-center gap-2 ms-auto"
                    >
                      <span>{createButtonIcon}</span>
                      <span>{createButtonLabel}</span>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
            )}

            {/* Table Body */}
            <Card.Body className="p-0">
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </Spinner>
                </div>
              ) : hasResults ? (
                <>
                  <Table hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        {columns.map((col) => (
                          <th
                            key={String(col.key)}
                            style={{ width: col.width }}
                            className={col.sortable ? 'cursor-pointer' : ''}
                          >
                            {col.label}
                          </th>
                        ))}
                        {actions.length > 0 && <th>Acciones</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => {
                        const itemKey = (item as T & { id?: string; course_id?: string }).id || (item as T & { id?: string; course_id?: string }).course_id || idx;
                        return (
                        <tr key={itemKey}>
                          {columns.map((col) => {
                            const value = item[col.key];
                            const rendered = col.render
                              ? col.render(value, item)
                              : value;

                            return (
                              <td key={String(col.key)}>
                                {rendered as React.ReactNode}
                              </td>
                            );
                          })}
                          {actions.length > 0 && (
                            <td>
                              <div className="d-flex gap-2">
                                {actions.map((action, actionIdx) => {
                                  const show = action.show
                                    ? action.show(item)
                                    : true;

                                  if (!show) return null;

                                  const icon = typeof action.icon === 'function' ? action.icon(item) : action.icon;
                                  const label = typeof action.label === 'function' ? action.label(item) : action.label;
                                  const variant = typeof action.variant === 'function' ? action.variant(item) : (action.variant || 'outline-secondary');
                                  const title = typeof action.title === 'function' ? action.title(item) : (action.title || label);

                                  return (
                                    <Button
                                      key={actionIdx}
                                      variant={variant as 'outline-secondary' | 'outline-primary' | 'outline-danger' | 'outline-warning' | 'outline-success' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'light' | 'dark'}
                                      size="sm"
                                      onClick={() => action.onClick(item)}
                                      title={title}
                                      disabled={isLoading}
                                    >
                                      {icon}
                                    </Button>
                                  );
                                })}
                              </div>
                            </td>
                          )}
                        </tr>
                        );
                      })}
                    </tbody>
                  </Table>

                  {/* Pagination */}
                  {totalPages >= 1 && (
                    <div className="d-flex justify-content-between align-items-center py-3 px-3">
                      <div></div>
                      <Pagination className="mb-0">
                        {totalPages > 1 && (
                          <>
                            <Pagination.First
                              onClick={() => onPageChange(1)}
                              disabled={isFirstPage || isLoading}
                            />
                            <Pagination.Prev
                              onClick={() => onPageChange(currentPage - 1)}
                              disabled={isFirstPage || isLoading}
                            />
                          </>
                        )}

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                          (page) => (
                            <Pagination.Item
                              key={page}
                              active={page === currentPage}
                              onClick={() => totalPages > 1 && onPageChange(page)}
                              disabled={isLoading || totalPages === 1}
                            >
                              {page}
                            </Pagination.Item>
                          )
                        )}

                        {totalPages > 1 && (
                          <>
                            <Pagination.Next
                              onClick={() => onPageChange(currentPage + 1)}
                              disabled={isLastPage || isLoading}
                            />
                            <Pagination.Last
                              onClick={() => onPageChange(totalPages)}
                              disabled={isLastPage || isLoading}
                            />
                          </>
                        )}
                      </Pagination>
                      <div className="text-muted small">
                        {isLoading ? (
                          <Spinner animation="border" size="sm" className="me-2" />
                        ) : (
                          `Mostrando ${(currentPage - 1) * props.pageSize + 1}-${Math.min(currentPage * props.pageSize, totalItems)} de ${totalItems}`
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-5">
                  <p style={{ fontSize: '3rem' }} className="mb-3">
                    {emptyIcon}
                  </p>
                  <h5 className="text-muted">{emptyMessage}</h5>
                  {!searchText && (
                    <Button
                      variant="outline-primary"
                      onClick={onCreateClick}
                      className="mt-3"
                      disabled={isLoading}
                    >
                      {createButtonIcon} {emptyActionLabel}
                    </Button>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
