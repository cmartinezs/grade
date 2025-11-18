import { Card, Accordion } from 'react-bootstrap';
import { Subject } from '@/types/curriculumHierarchy';
import { CurriculumHierarchyContextProps } from '../types';
import { CurriculumHierarchySubjectItem } from './CurriculumHierarchySubjectItem';

interface CurriculumHierarchyCatalogProps extends CurriculumHierarchyContextProps {
  subjects: Subject[];
  searchTerm: string;
  levelsLoaded: boolean;
  onCreateClick: () => void;
}

export function CurriculumHierarchyCatalog({
  subjects,
  searchTerm,
  levelsLoaded,
  onCreateClick,
  onEdit,
  onDelete,
}: CurriculumHierarchyCatalogProps) {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <strong>Catálogo Jerárquico</strong>
        <span
          className="btn btn-sm btn-outline-success"
          style={{ cursor: 'pointer' }}
          onClick={onCreateClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCreateClick();
            }
          }}
        >
          ➕ Crear Elemento
        </span>
      </Card.Header>
      <Card.Body>
        {subjects.length === 0 ? (
          <p className="text-muted">No hay asignaturas creadas aún.</p>
        ) : (
          <Accordion>
            {subjects.map((subject) => (
              <div key={subject.subject_id}>
                <CurriculumHierarchySubjectItem
                  subject={subject}
                  levelsLoaded={levelsLoaded}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  searchTerm={searchTerm}
                />
              </div>
            ))}
          </Accordion>
        )}
      </Card.Body>
    </Card>
  );
}
