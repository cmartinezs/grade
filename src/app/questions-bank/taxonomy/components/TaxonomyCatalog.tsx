import { Card, Accordion } from 'react-bootstrap';
import { Subject } from '@/types/taxonomy';
import { TaxonomyContextProps } from '../types';
import { TaxonomySubjectItem } from './TaxonomySubjectItem';

interface TaxonomyCatalogProps extends TaxonomyContextProps {
  subjects: Subject[];
  searchTerm: string;
  onCreateClick: () => void;
}

export function TaxonomyCatalog({
  subjects,
  searchTerm,
  onCreateClick,
  onEdit,
  onDelete,
}: TaxonomyCatalogProps) {
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
                <TaxonomySubjectItem
                  subject={subject}
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
