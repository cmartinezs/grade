import { Accordion, Badge } from 'react-bootstrap';
import { Unit } from '@/types/curriculumHierarchy';
import {
  getTopicsByUnit,
  searchTopicsByUnit,
} from '@/lib/curriculumHierarchyStore';
import { CurriculumHierarchyItemProps } from '../types';
import { CurriculumHierarchyTopicItem } from './CurriculumHierarchyTopicItem';

interface CurriculumHierarchyUnitItemProps extends CurriculumHierarchyItemProps {
  unit: Unit;
}

export function CurriculumHierarchyUnitItem({
  unit,
  onEdit,
  onDelete,
  searchTerm,
}: CurriculumHierarchyUnitItemProps) {
  // Obtener topics de manera sincrónica del caché
  const topics = searchTerm
    ? searchTopicsByUnit(unit.unit_id, searchTerm)
    : getTopicsByUnit(unit.unit_id);

  return (
    <Accordion.Item eventKey={unit.unit_id}>
      <Accordion.Header>
        <div className="d-flex justify-content-between align-items-center w-100 pe-3">
          <span className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.1rem' }}>📂</span>
            <span>{unit.name}</span>
          </span>
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="info">{topics.length} tema(s)</Badge>
            <span
              className="btn btn-sm btn-outline-info"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit('unit', unit.unit_id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit('unit', unit.unit_id);
                }
              }}
            >
              ✏️ Editar
            </span>
            <span
              className="btn btn-sm btn-outline-danger"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete('unit', unit.unit_id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete('unit', unit.unit_id);
                }
              }}
            >
              🗑️ Eliminar
            </span>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {topics.length === 0 ? (
          <p className="text-muted mb-0">No hay temas en esta unidad.</p>
        ) : (
          <ul className="list-unstyled">
            {topics.map((topic) => (
              <CurriculumHierarchyTopicItem
                key={topic.topic_id}
                topic={topic}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </ul>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}
