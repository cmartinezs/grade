import { Accordion, Badge } from 'react-bootstrap';
import { Subject } from '@/types/curriculumHierarchy';
import {
  getUnitsBySubject,
  searchUnitsBySubject,
} from '@/lib/curriculumHierarchyStore';
import { educationalLevelStore } from '@/lib/levelStore';
import { CurriculumHierarchyItemProps } from '../types';
import { CurriculumHierarchyUnitItem } from './CurriculumHierarchyUnitItem';

interface CurriculumHierarchySubjectItemProps extends CurriculumHierarchyItemProps {
  subject: Subject;
}

export function CurriculumHierarchySubjectItem({
  subject,
  onEdit,
  onDelete,
  searchTerm,
}: CurriculumHierarchySubjectItemProps) {
  // Obtener units de manera sincrónica del caché
  const units = searchTerm
    ? searchUnitsBySubject(subject.subject_id, searchTerm)
    : getUnitsBySubject(subject.subject_id);

  // Obtener nivel educacional
  const level = educationalLevelStore.getLevelById(subject.level_fk);
  const levelName = level ? level.name : 'N/A';

  return (
    <Accordion.Item eventKey={subject.subject_id}>
      <Accordion.Header>
        <div className="d-flex justify-content-between align-items-center w-100 pe-3">
          <span className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.2rem' }}>📚</span>
            <strong>{subject.name}</strong>
            <Badge bg="secondary">{subject.code}</Badge>
            <Badge bg="info">{levelName}</Badge>
          </span>
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="primary">{units.length} unidad(es)</Badge>
            <span
              className="btn btn-sm btn-outline-primary"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit('subject', subject.subject_id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit('subject', subject.subject_id);
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
                onDelete('subject', subject.subject_id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete('subject', subject.subject_id);
                }
              }}
            >
              🗑️ Eliminar
            </span>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {units.length === 0 ? (
          <p className="text-muted mb-0">No hay unidades en esta asignatura.</p>
        ) : (
          <Accordion>
            {units.map((unit) => (
              <div key={unit.unit_id}>
                <CurriculumHierarchyUnitItem
                  unit={unit}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  searchTerm={searchTerm}
                />
              </div>
            ))}
          </Accordion>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}
