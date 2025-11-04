/**
 * User Data Connect Service
 * Servicio para operaciones de usuario usando Firebase Data Connect
 */

import { generateUUID } from './uuid';
import { UserRole } from '@/types/role';
import {
  getUserByEmail as dcGetUserByEmail,
  createUser as dcCreateUser,
  updateUser as dcUpdateUser,
} from '../dataconnect-generated';

// Tipos
export interface UserData {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
  updatedBy?: string;
  deletedAt?: string;
}

/**
 * Obtener usuario por email desde Data Connect
 */
export const getUserByEmail = async (email: string): Promise<UserData | null> => {
  try {
    const result = await dcGetUserByEmail({ email });
    const user = result.data.users[0];
    if (!user) return null;
    
    const role = user.role as UserRole;
    
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? undefined,
      updatedBy: user.updatedBy ?? undefined,
      deletedAt: user.deletedAt ?? undefined,
    };
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    return null;
  }
};

/**
 * Crear usuario en Data Connect
 */
export const createNewUser = async (
  userData: {
    name: string;
    email: string;
    role: UserRole;
  },
  firebaseUid: string
): Promise<UserData | null> => {
  try {
    // Generate UUID for userId
    const userId = generateUUID();
    
    const result = await dcCreateUser({
      userId,
      firebaseId: firebaseUid,
      ...userData,
      createdBy: userId
    });
    
    // La respuesta contiene la clave del usuario creado
    if (result.data.user_insert) {
      return {
        userId: result.data.user_insert.userId,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        createdAt: new Date().toISOString()
      };
    }
    return null;
  } catch (error) {
    console.error('Error in createNewUser:', error);
    return null;
  }
};

/**
 * Actualizar usuario en Data Connect
 */
export const updateUserInfo = async (
  userId: string,
  updates: {
    name?: string;
    email?: string;
    role?: string;
    updatedBy: string;
    updatedAt: string;
  }
): Promise<void> => {
  try {
    await dcUpdateUser({
      userId,
      name: updates.name,
      email: updates.email,
      role: updates.role,
      firebaseId: '', // Empty firebaseId for update (not used in mutation)
      updatedBy: updates.updatedBy,
      updatedAt: updates.updatedAt
    });
  } catch (error) {
    console.error('Error in updateUserInfo:', error);
    throw error;
  }
};
