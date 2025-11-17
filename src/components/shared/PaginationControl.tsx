'use client';

import React from 'react';
import { Pagination, Spinner } from 'react-bootstrap';

/**
 * Props for PaginationControl component
 */
export interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

/**
 * PaginationControl Component
 *
 * Reusable pagination component that displays page navigation and item count info.
 * Extracted from MasterDataTable for reusability in different contexts.
 *
 * Features:
 * - First/Previous/Next/Last page navigation
 * - Direct page number selection
 * - Item count display (e.g., "Showing 1-20 of 100")
 * - Loading state support
 * - Disabled state for first and last pages
 */
export default function PaginationControl(
  props: PaginationControlProps
) {
  const {
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    isLoading = false,
    onPageChange,
  } = props;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="d-flex justify-content-between align-items-center">
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

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => totalPages > 1 && onPageChange(page)}
            disabled={isLoading || totalPages === 1}
          >
            {page}
          </Pagination.Item>
        ))}

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
          <Spinner animation="border" className="me-2" />
        ) : (
          `Mostrando ${(currentPage - 1) * pageSize + 1}-${Math.min(
            currentPage * pageSize,
            totalItems
          )} de ${totalItems}`
        )}
      </div>
    </div>
  );
}
