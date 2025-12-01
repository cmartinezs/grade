/**
 * User Role Enumeration and Utilities
 * Define los roles disponibles en la aplicación
 */

export enum UserRole {
  DOCENTE = 'DOCENTE',
  COORDINADOR = 'COORDINADOR',
  ADMIN = 'ADMIN',
  ESTUDIANTE = 'ESTUDIANTE'
}

/**
 * Opciones de roles para select/dropdown en formularios
 */
export const ROLE_OPTIONS = [
  {
    value: UserRole.DOCENTE,
    label: 'Docente',
    description: 'Acceso para crear y gestionar preguntas'
  },
  {
    value: UserRole.COORDINADOR,
    label: 'Coordinador',
    description: 'Acceso para coordinar y revisar contenido'
  }
] as const;

/**
 * Obtener la etiqueta de un rol
 */
export const getRoleLabel = (role: UserRole): string => {
  const option = ROLE_OPTIONS.find(opt => opt.value === role);
  return option?.label || role;
};

/**
 * Obtener la descripción de un rol
 */
export const getRoleDescription = (role: UserRole): string => {
  const option = ROLE_OPTIONS.find(opt => opt.value === role);
  return option?.description || '';
};

/**
 * Validar si un valor es un rol válido
 */
export const isValidRole = (role: unknown): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole);
};
