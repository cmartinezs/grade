import { TaxonomyType } from '@/types/taxonomy';

export interface ModalElement {
  type: TaxonomyType;
  id: string;
}

export interface TaxonomyContextProps {
  onEdit: (type: TaxonomyType, id: string) => void;
  onDelete: (type: TaxonomyType, id: string) => void;
}

export interface TaxonomyItemProps extends TaxonomyContextProps {
  searchTerm: string;
}
