/**
 * Educational Levels Store
 * Manages educational levels with localStorage persistence
 */

import { EducationalLevel, CreateLevelInput, EditLevelInput, CHILEAN_EDUCATION_LEVELS } from '@/types/level';
import { courseStore } from './courseStore';

const LEVELS_STORAGE_KEY = 'evaluation_management_levels';
const LEVEL_COUNTER_KEY = 'evaluation_management_level_counter';

// Default levels based on Chilean education system
const DEFAULT_LEVELS: Omit<EducationalLevel, 'id' | 'createdAt' | 'updatedAt'>[] = CHILEAN_EDUCATION_LEVELS.map(level => ({
  name: level.name,
  code: level.code,
  description: `Nivel educacional: ${level.name}`,
  isActive: true,
}));

class LevelStore {
  // Initialize with default levels if empty
  private initializeDefaultLevels(): void {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(LEVELS_STORAGE_KEY);
    if (stored) return; // Already initialized
    
    const currentDate = new Date();
    
    const levels: EducationalLevel[] = DEFAULT_LEVELS.map((level, index) => ({
      ...level,
      id: `level-${index + 1}`,
      createdAt: currentDate,
      updatedAt: currentDate,
    }));
    
    localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));
    localStorage.setItem(LEVEL_COUNTER_KEY, DEFAULT_LEVELS.length.toString());
    
    console.log(`[LEVEL] ${DEFAULT_LEVELS.length} niveles de base inicializados`);
  }

  // Load levels from localStorage
  private loadLevels(): EducationalLevel[] {
    if (typeof window === 'undefined') return [];
    
    // Initialize default levels if needed
    this.initializeDefaultLevels();
    
    const stored = localStorage.getItem(LEVELS_STORAGE_KEY);
    if (!stored) return [];
    
    const levels = JSON.parse(stored);
    return levels.map((l: EducationalLevel) => ({
      ...l,
      createdAt: new Date(l.createdAt),
      updatedAt: new Date(l.updatedAt),
    }));
  }

  // Get all levels
  getAllLevels(): EducationalLevel[] {
    return this.loadLevels().filter(level => level.isActive);
  }

  // Get all levels including inactive
  getAllLevelsIncludeInactive(): EducationalLevel[] {
    return this.loadLevels();
  }

  // Get level by ID
  getLevelById(id: string): EducationalLevel | null {
    const levels = this.loadLevels();
    return levels.find(level => level.id === id) || null;
  }

  // Get level by name
  getLevelByName(name: string): EducationalLevel | null {
    const levels = this.loadLevels();
    return levels.find(level => level.name === name) || null;
  }

  // Get course count for a level
  getCourseCoundByLevel(levelName: string): number {
    const result = courseStore.getPaginatedCourses(1, 1000, {
      level: levelName,
      includeInactive: false,
    });
    return result.total;
  }

  // Create a new level
  createLevel(input: CreateLevelInput): EducationalLevel {
    const levels = this.loadLevels();
    
    // Check if code already exists
    if (levels.some(l => l.code === input.code)) {
      throw new Error(`El código "${input.code}" ya existe`);
    }

    const counter = parseInt(localStorage.getItem(LEVEL_COUNTER_KEY) || '0');
    const newLevel: EducationalLevel = {
      id: `level-${counter + 1}`,
      name: input.name,
      code: input.code,
      description: input.description,
      isActive: input.isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    levels.push(newLevel);
    localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));
    localStorage.setItem(LEVEL_COUNTER_KEY, (counter + 1).toString());

    console.log(`[LEVEL] Nivel creado: ${newLevel.name} (${newLevel.code})`);
    return newLevel;
  }

  // Update a level
  updateLevel(id: string, input: EditLevelInput): EducationalLevel {
    const levels = this.loadLevels();
    const index = levels.findIndex(l => l.id === id);

    if (index === -1) {
      throw new Error(`Nivel con ID ${id} no encontrado`);
    }

    const level = levels[index];
    
    // Check if new code already exists (and is different from current)
    if (input.code !== level.code && levels.some(l => l.code === input.code)) {
      throw new Error(`El código "${input.code}" ya existe`);
    }

    const updatedLevel: EducationalLevel = {
      ...level,
      name: input.name,
      code: input.code,
      description: input.description,
      isActive: input.isActive,
      updatedAt: new Date(),
    };

    levels[index] = updatedLevel;
    localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));

    console.log(`[LEVEL] Nivel actualizado: ${updatedLevel.name} (${updatedLevel.code})`);
    return updatedLevel;
  }

  // Delete a level
  deleteLevel(id: string): void {
    const levels = this.loadLevels();
    const index = levels.findIndex(l => l.id === id);

    if (index === -1) {
      throw new Error(`Nivel con ID ${id} no encontrado`);
    }

    const level = levels[index];
    levels.splice(index, 1);
    localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));

    console.log(`[LEVEL] Nivel eliminado: ${level.name}`);
  }

  // Get paginated levels
  getPaginatedLevels(
    page: number = 1,
    pageSize: number = 10,
    options?: { includeInactive?: boolean; searchText?: string }
  ): { levels: EducationalLevel[]; total: number; totalPages: number } {
    let allLevels = options?.includeInactive
      ? this.getAllLevelsIncludeInactive()
      : this.getAllLevels();

    // Apply search filter if provided
    if (options?.searchText) {
      const searchTerm = options.searchText.toLowerCase().trim();
      allLevels = allLevels.filter(level =>
        level.name.toLowerCase().includes(searchTerm) ||
        level.code.toLowerCase().includes(searchTerm) ||
        level.description.toLowerCase().includes(searchTerm)
      );
    }

    const total = allLevels.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const levels = allLevels.slice(startIndex, startIndex + pageSize);

    // Add course count to each level
    return {
      levels: levels.map(level => ({
        ...level,
        courseCount: this.getCourseCoundByLevel(level.name),
      })),
      total,
      totalPages,
    };
  }
}

// Export singleton instance
export const levelStore = new LevelStore();
