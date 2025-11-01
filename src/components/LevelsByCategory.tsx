/**
 * Component for displaying educational levels grouped by category
 * Parametric entity view with hierarchical structure
 */

'use client';

import React from 'react';
import { EducationalLevel, LevelCategory } from '@/types/level';
import { groupLevelsByCategory } from '@/lib/levelUtils';

interface LevelsByCategoryProps {
  levels: EducationalLevel[];
  categories: LevelCategory[];
  onSelectLevel?: (level: EducationalLevel) => void;
  onSelectCategory?: (category: LevelCategory) => void;
}

/**
 * Displays educational levels organized hierarchically by category
 * Supports parametric entities with father_id relationships
 */
export const LevelsByCategory: React.FC<LevelsByCategoryProps> = ({
  levels,
  categories,
  onSelectLevel,
  onSelectCategory,
}) => {
  const groupedLevels = groupLevelsByCategory(levels, categories);

  if (groupedLevels.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        <p>No hay categorías o niveles educacionales disponibles</p>
      </div>
    );
  }

  return (
    <div className="levels-by-category">
      {groupedLevels.map((group) => (
        <div key={group.category.id} className="category-section mb-4">
          {/* Category Header */}
          <div 
            className="category-header mb-3 p-3 bg-light rounded cursor-pointer"
            onClick={() => onSelectCategory?.(group.category)}
            role="button"
            tabIndex={0}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <h5 className="mb-2">
                  <span className="category-icon">📚</span>
                  {group.category.name}
                  <span className="badge bg-primary ms-2">
                    {group.levels.length} niveles
                  </span>
                </h5>
                {group.category.description && (
                  <p className="mb-0 small text-secondary">
                    {group.category.description}
                  </p>
                )}
                <small className="text-muted d-block mt-1">
                  Código: {group.category.code}
                </small>
              </div>
              <div className="text-end ms-2">
                {group.category.isActive ? (
                  <span className="badge bg-success" title="Categoría Activa">
                    ✓ Activa
                  </span>
                ) : (
                  <span className="badge bg-secondary" title="Categoría Inactiva">
                    ✗ Inactiva
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Levels in Category */}
          {group.levels.length > 0 ? (
            <div className="levels-grid ps-3">
              {group.levels.map((level) => (
                <div
                  key={level.id}
                  className={`level-item card p-3 cursor-pointer ${
                    !level.isActive ? 'opacity-50' : ''
                  }`}
                  style={{
                    cursor: onSelectLevel ? 'pointer' : 'default',
                    backgroundColor: !level.isActive ? '#f8f9fa' : 'white',
                    borderColor: level.isActive ? '#dee2e6' : '#e9ecef',
                    borderLeft: '3px solid #0d6efd',
                  }}
                  onClick={() => onSelectLevel?.(level)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{level.name}</h6>
                      <small className="text-muted d-block">{level.code}</small>
                      {level.description && (
                        <p className="mb-0 mt-2 small text-secondary">
                          {level.description}
                        </p>
                      )}
                    </div>
                    <div className="text-end ms-2">
                      {level.isActive ? (
                        <span
                          className="badge bg-success"
                          title="Nivel Activo"
                        >
                          ✓
                        </span>
                      ) : (
                        <span
                          className="badge bg-secondary"
                          title="Nivel Inactivo"
                        >
                          ✗
                        </span>
                      )}
                    </div>
                  </div>
                  {level.courseCount !== undefined && level.courseCount > 0 && (
                    <small className="text-muted d-block mt-2">
                      📖 {level.courseCount} curso{level.courseCount !== 1 ? 's' : ''}
                    </small>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info small mb-0">
              No hay niveles en esta categoría
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LevelsByCategory;

/**
 * CSS for this component can be added to globals.css or a dedicated module
 * 
 * .levels-by-category {
 *   padding: 0;
 * }
 * 
 * .category-section {
 *   border-left: 4px solid #0d6efd;
 *   padding-left: 0;
 * }
 * 
 * .category-header {
 *   border: 1px solid #dee2e6;
 *   cursor: pointer;
 *   transition: all 0.2s ease;
 * }
 * 
 * .category-header:hover {
 *   background-color: #e7f1ff !important;
 *   border-color: #0d6efd;
 *   box-shadow: 0 2px 8px rgba(13, 110, 253, 0.1);
 * }
 * 
 * .levels-grid {
 *   display: grid;
 *   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
 *   gap: 1rem;
 * }
 * 
 * .level-item {
 *   transition: all 0.2s ease;
 *   border: 1px solid #dee2e6;
 *   border-radius: 0.5rem;
 * }
 * 
 * .level-item:hover {
 *   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
 *   border-color: #0d6efd;
 *   transform: translateY(-2px);
 * }
 * 
 * .level-item h6 {
 *   color: #212529;
 *   font-weight: 600;
 * }
 * 
 * .level-item small {
 *   font-size: 0.85rem;
 * }
 * 
 * @media (max-width: 768px) {
 *   .levels-grid {
 *     grid-template-columns: 1fr;
 *   }
 * }
 */
