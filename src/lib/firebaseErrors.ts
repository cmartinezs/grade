/**
 * Firebase Error Handler
 * Traduce errores de Firebase a mensajes claros en español
 */

export const FIREBASE_ERROR_CODES = {
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password',
  INVALID_EMAIL: 'auth/invalid-email',
  USER_DISABLED: 'auth/user-disabled',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  INVALID_PASSWORD: 'auth/invalid-password',
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: 'auth/account-exists-with-different-credential',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  INTERNAL_ERROR: 'auth/internal-error',
} as const;

export const getFirebaseErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    // Auth errors
    [FIREBASE_ERROR_CODES.EMAIL_ALREADY_IN_USE]: 'Este correo electrónico ya está registrado. Intenta iniciar sesión o usa otro correo.',
    [FIREBASE_ERROR_CODES.WEAK_PASSWORD]: 'La contraseña es muy débil. Debe contener mayúsculas, minúsculas, números y caracteres especiales.',
    [FIREBASE_ERROR_CODES.INVALID_EMAIL]: 'El correo electrónico no es válido. Verifica que esté escrito correctamente.',
    [FIREBASE_ERROR_CODES.USER_DISABLED]: 'Esta cuenta ha sido desactivada. Contacta con soporte.',
    [FIREBASE_ERROR_CODES.USER_NOT_FOUND]: 'No existe una cuenta con este correo electrónico.',
    [FIREBASE_ERROR_CODES.WRONG_PASSWORD]: 'La contraseña es incorrecta.',
    [FIREBASE_ERROR_CODES.TOO_MANY_REQUESTS]: 'Demasiados intentos fallidos. Intenta más tarde.',
    [FIREBASE_ERROR_CODES.OPERATION_NOT_ALLOWED]: 'La operación no está permitida. Contacta con soporte.',
    [FIREBASE_ERROR_CODES.INVALID_PASSWORD]: 'La contraseña debe tener al menos 8 caracteres.',
    [FIREBASE_ERROR_CODES.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL]: 'Ya existe una cuenta con este correo usando otro método de autenticación.',
    
    // Network errors
    [FIREBASE_ERROR_CODES.NETWORK_REQUEST_FAILED]: 'Error de conexión. Verifica tu conexión a internet.',
    [FIREBASE_ERROR_CODES.INTERNAL_ERROR]: 'Error interno de autenticación. Intenta más tarde.',
  };

  return errorMessages[errorCode] || 'Error en la autenticación. Por favor, intenta más tarde.';
};

/**
 * Extraer el código de error de un error de Firebase
 */
export const getErrorCode = (error: unknown): string => {
  if (error && typeof error === 'object') {
    if ('code' in error) {
      return error.code as string;
    }
  }
  return 'unknown-error';
};

/**
 * Manejar error de Firebase y retornar un objeto con código y mensaje
 */
export const handleFirebaseError = (error: unknown): { code: string; message: string } => {
  const code = getErrorCode(error);
  const message = getFirebaseErrorMessage(code);
  return { code, message };
};
