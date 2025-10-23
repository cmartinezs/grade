import { Button } from 'react-bootstrap';
import { Topic } from '@/types/taxonomy';
import { TaxonomyContextProps } from '../types';

interface TaxonomyTopicItemProps extends TaxonomyContextProps {
  topic: Topic;
}

export function TaxonomyTopicItem({
  topic,
  onEdit,
  onDelete,
}: TaxonomyTopicItemProps) {
  return (
    <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
      <span className="d-flex align-items-center gap-2">
        <span style={{ fontSize: '1rem' }}>📄</span>
        <span>{topic.name}</span>
      </span>
      <div className="d-flex gap-2">
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() => onEdit('topic', topic.topic_id)}
        >
          ✏️ Editar
        </Button>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => onDelete('topic', topic.topic_id)}
        >
          🗑️ Eliminar
        </Button>
      </div>
    </li>
  );
}
