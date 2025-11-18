'use client';

import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { ColumnConfig, ActionButton } from './MasterDataTable';

/**
 * Props for DataTableContent component
 */
export interface DataTableContentProps<T> {
  items: T[];
  columns: ColumnConfig<T>[];
  actions?: ActionButton<T>[];
  isLoading?: boolean;
  currentPage: number;
  pageSize: number;
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (column: keyof T, direction: 'asc' | 'desc') => void;
  emptyMessage?: string;
  emptyIcon?: string;
}

/**
 * DataTableContent Component
 *
 * Reusable table component that displays paginated data with sorting and action buttons.
 * Extracted from MasterDataTable for reusability in different contexts.
 *
 * Features:
 * - Row numbering based on pagination
 * - Sortable column headers (if enabled)
 * - Custom cell rendering
 * - Action buttons per row
 * - Empty state handling
 * - Loading state
 */
export default function DataTableContent<T>(props: DataTableContentProps<T>) {
  const {
    items,
    columns,
    actions = [],
    isLoading = false,
    currentPage,
    pageSize,
    sortColumn,
    sortDirection,
    onSortChange,
    emptyMessage = 'No hay datos disponibles',
    emptyIcon = '📋',
  } = props;

  const hasResults = items.length > 0;

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="text-center py-5">
        <p style={{ fontSize: '3rem' }} className="mb-3">
          {emptyIcon}
        </p>
        <h5 className="text-muted">{emptyMessage}</h5>
      </div>
    );
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <Table hover className="mb-0" style={{ marginBottom: '0' }}>
        <thead className="bg-light">
          <tr>
            <th
              style={{
                width: '60px',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                textAlign: 'center',
              }}
            >
              #
            </th>
            {columns.map((col) => {
              const isSorted = sortColumn === col.key;
              const handleSort = () => {
                if (!col.sortable || !onSortChange) return;

                const newDirection =
                  isSorted && sortDirection === 'asc' ? 'desc' : 'asc';
                onSortChange(col.key, newDirection);
              };

              return (
                <th
                  key={String(col.key)}
                  style={{
                    width: col.width,
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                  }}
                  className={
                    col.sortable ? 'cursor-pointer user-select-none' : ''
                  }
                  onClick={handleSort}
                  role={col.sortable ? 'button' : undefined}
                  title={col.sortable ? 'Click para ordenar' : undefined}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <span style={{ fontSize: '0.85rem', minWidth: '1rem' }}>
                        {isSorted ? (
                          sortDirection === 'asc' ? '↑' : '↓'
                        ) : (
                          <span style={{ opacity: 0.4 }}>⇅</span>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
            {actions.length > 0 && (
              <th style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const itemKey =
              (item as T & { id?: string; course_id?: string }).id ||
              (item as T & { id?: string; course_id?: string }).course_id ||
              idx;
            const rowNumber =
              (currentPage - 1) * pageSize + idx + 1;

            return (
              <tr key={itemKey} style={{ verticalAlign: 'middle' }}>
                <td
                  style={{
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#6c757d',
                    width: '60px',
                  }}
                >
                  {rowNumber}
                </td>
                {columns.map((col) => {
                  const value = item[col.key];
                  const rendered = col.render ? col.render(value, item) : value;

                  return (
                    <td
                      key={String(col.key)}
                      style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                    >
                      {rendered as React.ReactNode}
                    </td>
                  );
                })}
                {actions.length > 0 && (
                  <td style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                    <div className="d-flex gap-2">
                      {actions.map((action, actionIdx) => {
                        // Soportar tanto 'show' como 'hidden'
                        const show = action.show ? action.show(item) : true;
                        const hidden = (action as ActionButton<T> & { hidden?: (item: T) => boolean }).hidden 
                          ? (action as ActionButton<T> & { hidden?: (item: T) => boolean }).hidden!(item) 
                          : false;

                        if (!show || hidden) return null;

                        const icon =
                          typeof action.icon === 'function'
                            ? action.icon(item)
                            : action.icon;
                        const label =
                          typeof action.label === 'function'
                            ? action.label(item)
                            : action.label;
                        const variant =
                          typeof action.variant === 'function'
                            ? action.variant(item)
                            : action.variant || 'outline-secondary';
                        const title =
                          typeof action.title === 'function'
                            ? action.title(item)
                            : action.title || label;

                        return (
                          <Button
                            key={actionIdx}
                            variant={
                              variant as
                                | 'outline-secondary'
                                | 'outline-primary'
                                | 'outline-danger'
                                | 'outline-warning'
                                | 'outline-success'
                                | 'primary'
                                | 'secondary'
                                | 'danger'
                                | 'warning'
                                | 'success'
                                | 'info'
                                | 'light'
                                | 'dark'
                            }
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
    </div>
  );
}
