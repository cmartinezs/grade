import { CurriculumHierarchyType } from '@/types/curriculumHierarchy';

export interface ModalElement {
  type: CurriculumHierarchyType;
  id: string;
}

export interface CurriculumHierarchyContextProps {
  onEdit: (type: CurriculumHierarchyType, id: string) => void;
  onDelete: (type: CurriculumHierarchyType, id: string) => void;
}

export interface CurriculumHierarchyItemProps extends CurriculumHierarchyContextProps {
  searchTerm: string;
}
