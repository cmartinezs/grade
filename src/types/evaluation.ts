/**
 * Estados de una evaluación en el sistema.
 * Los valores coinciden con los almacenados en la base de datos.
 */
export enum EvaluationState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  APPLIED = 'APPLIED',
  GRADED = 'GRADED',
  ARCHIVED = 'ARCHIVED',
}

/**
 * Información de visualización para cada estado de evaluación.
 */
export interface EvaluationStateInfo {
  label: string;
  variant: string;
  icon: string;
}

/**
 * Mapa de estados con su información de visualización.
 */
export const EVALUATION_STATE_INFO: Record<EvaluationState, EvaluationStateInfo> = {
  [EvaluationState.DRAFT]: { 
    label: 'Borrador', 
    variant: 'secondary', 
    icon: '📝' 
  },
  [EvaluationState.PUBLISHED]: { 
    label: 'Publicada', 
    variant: 'primary', 
    icon: '📢' 
  },
  [EvaluationState.APPLIED]: { 
    label: 'Aplicada', 
    variant: 'info', 
    icon: '✅' 
  },
  [EvaluationState.GRADED]: { 
    label: 'Calificada', 
    variant: 'success', 
    icon: '🏆' 
  },
  [EvaluationState.ARCHIVED]: { 
    label: 'Archivada', 
    variant: 'dark', 
    icon: '📦' 
  },
};

/**
 * Escalas de calificación disponibles.
 */
export enum GradeScale {
  SCALE_1_7 = '1-7',
  SCALE_0_100 = '0-100',
  SCALE_1_10 = '1-10',
  SCALE_A_F = 'A-F',
}

/**
 * Información de visualización para cada escala de calificación.
 */
export interface GradeScaleInfo {
  name: string;
  description: string;
}

/**
 * Mapa de escalas con su información de visualización.
 */
export const GRADE_SCALE_INFO: Record<GradeScale, GradeScaleInfo> = {
  [GradeScale.SCALE_1_7]: { 
    name: 'Escala 1.0 - 7.0', 
    description: 'Escala chilena tradicional' 
  },
  [GradeScale.SCALE_0_100]: { 
    name: 'Escala 0 - 100', 
    description: 'Escala porcentual' 
  },
  [GradeScale.SCALE_1_10]: { 
    name: 'Escala 1 - 10', 
    description: 'Escala decimal' 
  },
  [GradeScale.SCALE_A_F]: { 
    name: 'Escala A - F', 
    description: 'Escala de letras' 
  },
};

/**
 * Helper para obtener la info de estado de forma segura.
 */
export function getEvaluationStateInfo(state: string): EvaluationStateInfo {
  return EVALUATION_STATE_INFO[state as EvaluationState] || EVALUATION_STATE_INFO[EvaluationState.DRAFT];
}

/**
 * Helper para obtener la info de escala de forma segura.
 */
export function getGradeScaleInfo(scale: string): GradeScaleInfo {
  return GRADE_SCALE_INFO[scale as GradeScale] || { name: scale, description: '' };
}

/**
 * Helper para verificar si una evaluación está en borrador.
 */
export function isEvaluationDraft(state: string): boolean {
  return state === EvaluationState.DRAFT;
}

/**
 * Helper para verificar si una evaluación está publicada.
 */
export function isEvaluationPublished(state: string): boolean {
  return state === EvaluationState.PUBLISHED;
}

/**
 * Helper para verificar si una evaluación puede ser editada.
 */
export function canEditEvaluation(state: string): boolean {
  return state === EvaluationState.DRAFT;
}

/**
 * Helper para verificar si una evaluación puede ser asignada a un curso.
 */
export function canAssignToCourse(state: string): boolean {
  return state === EvaluationState.PUBLISHED || 
         state === EvaluationState.APPLIED || 
         state === EvaluationState.GRADED;
}
