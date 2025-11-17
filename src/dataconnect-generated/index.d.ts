import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Course_Key {
  courseId: UUIDString;
  __typename?: 'Course_Key';
}

export interface CreateCourseData {
  course_insert: Course_Key;
}

export interface CreateCourseVariables {
  courseId: UUIDString;
  name: string;
  code: string;
  section?: string | null;
  institutionName: string;
  levelId: UUIDString;
  userId: UUIDString;
  createdBy: UUIDString;
}

export interface CreateDifficultyData {
  difficulty_insert: Difficulty_Key;
}

export interface CreateDifficultyVariables {
  difficultyId: UUIDString;
  level: string;
  weight: number;
  description?: string | null;
}

export interface CreateEducationalLevelData {
  educationalLevel_insert: EducationalLevel_Key;
}

export interface CreateEducationalLevelVariables {
  levelId: UUIDString;
  categoryId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  createdBy: UUIDString;
}

export interface CreateLevelCategoryData {
  levelCategory_insert: LevelCategory_Key;
}

export interface CreateLevelCategoryVariables {
  categoryId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  createdBy: UUIDString;
}

export interface CreateQuestionData {
  question_insert: Question_Key;
}

export interface CreateQuestionOptionData {
  questionOption_insert: QuestionOption_Key;
}

export interface CreateQuestionOptionVariables {
  questionOptionId: UUIDString;
  text: string;
  isCorrect: boolean;
  position: number;
  score?: number | null;
  questionId: UUIDString;
}

export interface CreateQuestionTypeData {
  questionType_insert: QuestionType_Key;
}

export interface CreateQuestionTypeVariables {
  questionTypeId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  minOptions: number;
  maxOptions: number;
  correctOptions: number;
  active: boolean;
}

export interface CreateQuestionVariables {
  questionId: UUIDString;
  text: string;
  topicId: UUIDString;
  difficultyId: UUIDString;
  questionTypeId: UUIDString;
  taxonomyId: UUIDString;
  userId: UUIDString;
  isPublic: boolean;
  allowPartialScore: boolean;
  firebaseId: string;
}

export interface CreateQuestionVersionData {
  question_insert: Question_Key;
}

export interface CreateQuestionVersionVariables {
  questionId: UUIDString;
  text: string;
  topicId: UUIDString;
  difficultyId: UUIDString;
  questionTypeId: UUIDString;
  taxonomyId: UUIDString;
  userId: UUIDString;
  isPublic: boolean;
  allowPartialScore: boolean;
  version: number;
  originalQuestionId: UUIDString;
  firebaseId: string;
}

export interface CreateSubjectData {
  subject_insert: Subject_Key;
}

export interface CreateSubjectVariables {
  subjectId: UUIDString;
  name: string;
  code: string;
  levelId: UUIDString;
  createdBy: UUIDString;
}

export interface CreateTaxonomyData {
  taxonomy_insert: Taxonomy_Key;
}

export interface CreateTaxonomyVariables {
  taxonomyId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  level: number;
  createdBy: UUIDString;
}

export interface CreateTopicData {
  topic_insert: Topic_Key;
}

export interface CreateTopicVariables {
  topicId: UUIDString;
  name: string;
  unitId: UUIDString;
  createdBy: UUIDString;
}

export interface CreateUnitData {
  unit_insert: Unit_Key;
}

export interface CreateUnitVariables {
  unitId: UUIDString;
  name: string;
  description?: string | null;
  subjectId: UUIDString;
  createdBy: UUIDString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  userId: UUIDString;
  firebaseId: string;
  name: string;
  email: string;
  role: string;
  createdBy: UUIDString;
}

export interface DeactivateCourseData {
  course_update?: Course_Key | null;
}

export interface DeactivateCourseVariables {
  courseId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}

export interface DeactivateDifficultyData {
  difficulty_update?: Difficulty_Key | null;
}

export interface DeactivateDifficultyVariables {
  difficultyId: UUIDString;
}

export interface DeactivateEducationalLevelData {
  educationalLevel_update?: EducationalLevel_Key | null;
}

export interface DeactivateEducationalLevelVariables {
  levelId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}

export interface DeactivateLevelCategoryData {
  levelCategory_update?: LevelCategory_Key | null;
}

export interface DeactivateLevelCategoryVariables {
  categoryId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}

export interface DeactivateQuestionData {
  question_update?: Question_Key | null;
}

export interface DeactivateQuestionTypeData {
  questionType_update?: QuestionType_Key | null;
}

export interface DeactivateQuestionTypeVariables {
  questionTypeId: UUIDString;
}

export interface DeactivateQuestionVariables {
  questionId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}

export interface DeactivateSubjectData {
  subject_update?: Subject_Key | null;
}

export interface DeactivateSubjectVariables {
  subjectId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}

export interface DeactivateTaxonomyData {
  taxonomy_update?: Taxonomy_Key | null;
}

export interface DeactivateTaxonomyVariables {
  taxonomyId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}

export interface DeactivateTopicData {
  topic_update?: Topic_Key | null;
}

export interface DeactivateTopicVariables {
  topicId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}

export interface DeactivateUnitData {
  unit_update?: Unit_Key | null;
}

export interface DeactivateUnitVariables {
  unitId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}

export interface DeleteQuestionOptionData {
  questionOption_delete?: QuestionOption_Key | null;
}

export interface DeleteQuestionOptionVariables {
  questionOptionId: UUIDString;
}

export interface Difficulty_Key {
  difficultyId: UUIDString;
  __typename?: 'Difficulty_Key';
}

export interface EducationalLevel_Key {
  levelId: UUIDString;
  __typename?: 'EducationalLevel_Key';
}

export interface GetCourseData {
  courses: ({
    courseId: UUIDString;
    name: string;
    code: string;
    section?: string | null;
    institutionName: string;
    levelId: UUIDString;
    userId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & Course_Key)[];
}

export interface GetCourseVariables {
  courseId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}

export interface GetCoursesByLevelData {
  courses: ({
    courseId: UUIDString;
    name: string;
    code: string;
    section?: string | null;
    institutionName: string;
    levelId: UUIDString;
    userId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
  } & Course_Key)[];
}

export interface GetCoursesByLevelVariables {
  userId: UUIDString;
  levelId: UUIDString;
  firebaseId: string;
}

export interface GetCoursesByUserData {
  courses: ({
    courseId: UUIDString;
    name: string;
    code: string;
    section?: string | null;
    institutionName: string;
    levelId: UUIDString;
    userId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
  } & Course_Key)[];
}

export interface GetCoursesByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}

export interface GetDifficultyData {
  difficulty?: {
    difficultyId: UUIDString;
    level: string;
    weight: number;
    description?: string | null;
    active: boolean;
  } & Difficulty_Key;
}

export interface GetDifficultyVariables {
  difficultyId: UUIDString;
}

export interface GetEducationalLevelData {
  educationalLevel?: {
    levelId: UUIDString;
    categoryId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    active: boolean;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & EducationalLevel_Key;
}

export interface GetEducationalLevelVariables {
  levelId: UUIDString;
}

export interface GetLevelCategoryData {
  levelCategory?: {
    categoryId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    active: boolean;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & LevelCategory_Key;
}

export interface GetLevelCategoryVariables {
  categoryId: UUIDString;
}

export interface GetLevelsByCategoryData {
  educationalLevels: ({
    levelId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    active: boolean;
    createdAt: TimestampString;
  } & EducationalLevel_Key)[];
}

export interface GetLevelsByCategoryVariables {
  categoryId: UUIDString;
}

export interface GetQuestionData {
  questions: ({
    questionId: UUIDString;
    text: string;
    active: boolean;
    version: number;
    originalQuestionId?: UUIDString | null;
    topicId: UUIDString;
    difficultyId: UUIDString;
    questionTypeId: UUIDString;
    taxonomyId: UUIDString;
    userId: UUIDString;
    allowPartialScore: boolean;
    isPublic: boolean;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & Question_Key)[];
}

export interface GetQuestionOptionsData {
  questionOptions: ({
    questionOptionId: UUIDString;
    text: string;
    isCorrect: boolean;
    position: number;
    score?: number | null;
    questionId: UUIDString;
  } & QuestionOption_Key)[];
}

export interface GetQuestionOptionsVariables {
  questionId: UUIDString;
}

export interface GetQuestionTypeByCodeData {
  questionTypes: ({
    questionTypeId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    minOptions: number;
    maxOptions: number;
    correctOptions: number;
    active: boolean;
  } & QuestionType_Key)[];
}

export interface GetQuestionTypeByCodeVariables {
  code: string;
}

export interface GetQuestionTypeData {
  questionType?: {
    questionTypeId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    minOptions: number;
    maxOptions: number;
    correctOptions: number;
    active: boolean;
  } & QuestionType_Key;
}

export interface GetQuestionTypeVariables {
  questionTypeId: UUIDString;
}

export interface GetQuestionVariables {
  questionId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}

export interface GetSubjectData {
  subject?: {
    subjectId: UUIDString;
    name: string;
    code: string;
    active: boolean;
    levelId: UUIDString;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & Subject_Key;
}

export interface GetSubjectVariables {
  subjectId: UUIDString;
}

export interface GetTaxonomyByCodeData {
  taxonomies: ({
    taxonomyId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    level: number;
    active: boolean;
    createdAt: TimestampString;
  } & Taxonomy_Key)[];
}

export interface GetTaxonomyByCodeVariables {
  code: string;
}

export interface GetTaxonomyData {
  taxonomy?: {
    taxonomyId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    level: number;
    active: boolean;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & Taxonomy_Key;
}

export interface GetTaxonomyVariables {
  taxonomyId: UUIDString;
}

export interface GetTopicData {
  topic?: {
    topicId: UUIDString;
    name: string;
    unitId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & Topic_Key;
}

export interface GetTopicVariables {
  topicId: UUIDString;
}

export interface GetUnitData {
  unit?: {
    unitId: UUIDString;
    name: string;
    subjectId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & Unit_Key;
}

export interface GetUnitVariables {
  unitId: UUIDString;
}

export interface GetUserByEmailData {
  users: ({
    userId: UUIDString;
    name: string;
    email: string;
    role: string;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
  } & User_Key)[];
}

export interface GetUserByEmailVariables {
  email: string;
}

export interface LevelCategory_Key {
  categoryId: UUIDString;
  __typename?: 'LevelCategory_Key';
}

export interface ListCoursesData {
  courses: ({
    courseId: UUIDString;
    name: string;
    code: string;
    section?: string | null;
    institutionName: string;
    levelId: UUIDString;
    userId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
  } & Course_Key)[];
}

export interface ListCoursesVariables {
  userId: UUIDString;
  firebaseId: string;
}

export interface ListDifficultiesData {
  difficulties: ({
    difficultyId: UUIDString;
    level: string;
    weight: number;
    description?: string | null;
    active: boolean;
  } & Difficulty_Key)[];
}

export interface ListEducationalLevelsData {
  educationalLevels: ({
    levelId: UUIDString;
    categoryId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    active: boolean;
    createdAt: TimestampString;
  } & EducationalLevel_Key)[];
}

export interface ListLevelCategoriesData {
  levelCategories: ({
    categoryId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    active: boolean;
    createdAt: TimestampString;
  } & LevelCategory_Key)[];
}

export interface ListPublicQuestionsByDifficultyData {
  questions: ({
    questionId: UUIDString;
    text: string;
    active: boolean;
    version: number;
    topicId: UUIDString;
    difficultyId: UUIDString;
    questionTypeId: UUIDString;
    taxonomyId: UUIDString;
    userId: UUIDString;
    allowPartialScore: boolean;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & Question_Key)[];
}

export interface ListPublicQuestionsByDifficultyVariables {
  difficultyId: UUIDString;
}

export interface ListPublicQuestionsByTypeData {
  questions: ({
    questionId: UUIDString;
    text: string;
    active: boolean;
    version: number;
    topicId: UUIDString;
    difficultyId: UUIDString;
    questionTypeId: UUIDString;
    taxonomyId: UUIDString;
    userId: UUIDString;
    allowPartialScore: boolean;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & Question_Key)[];
}

export interface ListPublicQuestionsByTypeVariables {
  questionTypeId: UUIDString;
}

export interface ListPublicQuestionsData {
  questions: ({
    questionId: UUIDString;
    text: string;
    active: boolean;
    version: number;
    topicId: UUIDString;
    difficultyId: UUIDString;
    questionTypeId: UUIDString;
    taxonomyId: UUIDString;
    userId: UUIDString;
    allowPartialScore: boolean;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & Question_Key)[];
}

export interface ListQuestionTypesData {
  questionTypes: ({
    questionTypeId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    minOptions: number;
    maxOptions: number;
    correctOptions: number;
    active: boolean;
  } & QuestionType_Key)[];
}

export interface ListQuestionsByUserData {
  questions: ({
    questionId: UUIDString;
    text: string;
    active: boolean;
    version: number;
    originalQuestionId?: UUIDString | null;
    topicId: UUIDString;
    difficultyId: UUIDString;
    questionTypeId: UUIDString;
    taxonomyId: UUIDString;
    userId: UUIDString;
    allowPartialScore: boolean;
    isPublic: boolean;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & Question_Key)[];
}

export interface ListQuestionsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}

export interface ListSubjectsData {
  subjects: ({
    subjectId: UUIDString;
    name: string;
    code: string;
    levelId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
  } & Subject_Key)[];
}

export interface ListTaxonomiesByLevelData {
  taxonomies: ({
    taxonomyId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    level: number;
    active: boolean;
    createdAt: TimestampString;
  } & Taxonomy_Key)[];
}

export interface ListTaxonomiesData {
  taxonomies: ({
    taxonomyId: UUIDString;
    code: string;
    name: string;
    description?: string | null;
    level: number;
    active: boolean;
    createdAt: TimestampString;
  } & Taxonomy_Key)[];
}

export interface ListTopicsData {
  topics: ({
    topicId: UUIDString;
    name: string;
    unitId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
  } & Topic_Key)[];
}

export interface ListUnitsData {
  units: ({
    unitId: UUIDString;
    name: string;
    subjectId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
  } & Unit_Key)[];
}

export interface QuestionOption_Key {
  questionOptionId: UUIDString;
  __typename?: 'QuestionOption_Key';
}

export interface QuestionType_Key {
  questionTypeId: UUIDString;
  __typename?: 'QuestionType_Key';
}

export interface Question_Key {
  questionId: UUIDString;
  __typename?: 'Question_Key';
}

export interface ReactivateCourseData {
  course_update?: Course_Key | null;
}

export interface ReactivateCourseVariables {
  courseId: UUIDString;
  firebaseId: string;
}

export interface ReactivateDifficultyData {
  difficulty_update?: Difficulty_Key | null;
}

export interface ReactivateDifficultyVariables {
  difficultyId: UUIDString;
}

export interface ReactivateEducationalLevelData {
  educationalLevel_update?: EducationalLevel_Key | null;
}

export interface ReactivateEducationalLevelVariables {
  levelId: UUIDString;
  firebaseId: string;
}

export interface ReactivateLevelCategoryData {
  levelCategory_update?: LevelCategory_Key | null;
}

export interface ReactivateLevelCategoryVariables {
  categoryId: UUIDString;
  firebaseId: string;
}

export interface ReactivateQuestionData {
  question_update?: Question_Key | null;
}

export interface ReactivateQuestionTypeData {
  questionType_update?: QuestionType_Key | null;
}

export interface ReactivateQuestionTypeVariables {
  questionTypeId: UUIDString;
}

export interface ReactivateQuestionVariables {
  questionId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}

export interface ReactivateSubjectData {
  subject_update?: Subject_Key | null;
}

export interface ReactivateSubjectVariables {
  subjectId: UUIDString;
  firebaseId: string;
}

export interface ReactivateTaxonomyData {
  taxonomy_update?: Taxonomy_Key | null;
}

export interface ReactivateTaxonomyVariables {
  taxonomyId: UUIDString;
  firebaseId: string;
}

export interface ReactivateTopicData {
  topic_update?: Topic_Key | null;
}

export interface ReactivateTopicVariables {
  topicId: UUIDString;
  firebaseId: string;
}

export interface ReactivateUnitData {
  unit_update?: Unit_Key | null;
}

export interface ReactivateUnitVariables {
  unitId: UUIDString;
  firebaseId: string;
}

export interface Subject_Key {
  subjectId: UUIDString;
  __typename?: 'Subject_Key';
}

export interface Taxonomy_Key {
  taxonomyId: UUIDString;
  __typename?: 'Taxonomy_Key';
}

export interface Topic_Key {
  topicId: UUIDString;
  __typename?: 'Topic_Key';
}

export interface Unit_Key {
  unitId: UUIDString;
  __typename?: 'Unit_Key';
}

export interface UpdateCourseData {
  course_update?: Course_Key | null;
}

export interface UpdateCourseVariables {
  courseId: UUIDString;
  name: string;
  code: string;
  section?: string | null;
  institutionName: string;
  levelId: UUIDString;
  userId: UUIDString;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface UpdateEducationalLevelData {
  educationalLevel_update?: EducationalLevel_Key | null;
}

export interface UpdateEducationalLevelVariables {
  levelId: UUIDString;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  categoryId?: UUIDString | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface UpdateLevelCategoryData {
  levelCategory_update?: LevelCategory_Key | null;
}

export interface UpdateLevelCategoryVariables {
  categoryId: UUIDString;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface UpdateQuestionData {
  question_update?: Question_Key | null;
}

export interface UpdateQuestionOptionData {
  questionOption_update?: QuestionOption_Key | null;
}

export interface UpdateQuestionOptionVariables {
  questionOptionId: UUIDString;
  text?: string | null;
  isCorrect?: boolean | null;
  position?: number | null;
  score?: number | null;
}

export interface UpdateQuestionTypeData {
  questionType_update?: QuestionType_Key | null;
}

export interface UpdateQuestionTypeVariables {
  questionTypeId: UUIDString;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  minOptions?: number | null;
  maxOptions?: number | null;
  correctOptions?: number | null;
}

export interface UpdateQuestionVariables {
  questionId: UUIDString;
  text?: string | null;
  topicId?: UUIDString | null;
  difficultyId?: UUIDString | null;
  questionTypeId?: UUIDString | null;
  isPublic?: boolean | null;
  allowPartialScore?: boolean | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface UpdateSubjectData {
  subject_update?: Subject_Key | null;
}

export interface UpdateSubjectVariables {
  subjectId: UUIDString;
  name?: string | null;
  code?: string | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface UpdateTaxonomyData {
  taxonomy_update?: Taxonomy_Key | null;
}

export interface UpdateTaxonomyVariables {
  taxonomyId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  level: number;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface UpdateTopicData {
  topic_update?: Topic_Key | null;
}

export interface UpdateTopicVariables {
  topicId: UUIDString;
  unitId: UUIDString;
  name: string;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface UpdateUnitData {
  unit_update?: Unit_Key | null;
}

export interface UpdateUnitVariables {
  unitId: UUIDString;
  name: string;
  description?: string | null;
  subjectId: UUIDString;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  userId: UUIDString;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface User_Key {
  userId: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface CreateSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
  operationName: string;
}
export const createSubjectRef: CreateSubjectRef;

export function createSubject(vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;
export function createSubject(dc: DataConnect, vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;

interface UpdateSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
  operationName: string;
}
export const updateSubjectRef: UpdateSubjectRef;

export function updateSubject(vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;
export function updateSubject(dc: DataConnect, vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;

interface DeactivateSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateSubjectVariables): MutationRef<DeactivateSubjectData, DeactivateSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateSubjectVariables): MutationRef<DeactivateSubjectData, DeactivateSubjectVariables>;
  operationName: string;
}
export const deactivateSubjectRef: DeactivateSubjectRef;

export function deactivateSubject(vars: DeactivateSubjectVariables): MutationPromise<DeactivateSubjectData, DeactivateSubjectVariables>;
export function deactivateSubject(dc: DataConnect, vars: DeactivateSubjectVariables): MutationPromise<DeactivateSubjectData, DeactivateSubjectVariables>;

interface ReactivateSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateSubjectVariables): MutationRef<ReactivateSubjectData, ReactivateSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateSubjectVariables): MutationRef<ReactivateSubjectData, ReactivateSubjectVariables>;
  operationName: string;
}
export const reactivateSubjectRef: ReactivateSubjectRef;

export function reactivateSubject(vars: ReactivateSubjectVariables): MutationPromise<ReactivateSubjectData, ReactivateSubjectVariables>;
export function reactivateSubject(dc: DataConnect, vars: ReactivateSubjectVariables): MutationPromise<ReactivateSubjectData, ReactivateSubjectVariables>;

interface CreateUnitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUnitVariables): MutationRef<CreateUnitData, CreateUnitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUnitVariables): MutationRef<CreateUnitData, CreateUnitVariables>;
  operationName: string;
}
export const createUnitRef: CreateUnitRef;

export function createUnit(vars: CreateUnitVariables): MutationPromise<CreateUnitData, CreateUnitVariables>;
export function createUnit(dc: DataConnect, vars: CreateUnitVariables): MutationPromise<CreateUnitData, CreateUnitVariables>;

interface UpdateUnitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUnitVariables): MutationRef<UpdateUnitData, UpdateUnitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUnitVariables): MutationRef<UpdateUnitData, UpdateUnitVariables>;
  operationName: string;
}
export const updateUnitRef: UpdateUnitRef;

export function updateUnit(vars: UpdateUnitVariables): MutationPromise<UpdateUnitData, UpdateUnitVariables>;
export function updateUnit(dc: DataConnect, vars: UpdateUnitVariables): MutationPromise<UpdateUnitData, UpdateUnitVariables>;

interface DeactivateUnitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateUnitVariables): MutationRef<DeactivateUnitData, DeactivateUnitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateUnitVariables): MutationRef<DeactivateUnitData, DeactivateUnitVariables>;
  operationName: string;
}
export const deactivateUnitRef: DeactivateUnitRef;

export function deactivateUnit(vars: DeactivateUnitVariables): MutationPromise<DeactivateUnitData, DeactivateUnitVariables>;
export function deactivateUnit(dc: DataConnect, vars: DeactivateUnitVariables): MutationPromise<DeactivateUnitData, DeactivateUnitVariables>;

interface ReactivateUnitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateUnitVariables): MutationRef<ReactivateUnitData, ReactivateUnitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateUnitVariables): MutationRef<ReactivateUnitData, ReactivateUnitVariables>;
  operationName: string;
}
export const reactivateUnitRef: ReactivateUnitRef;

export function reactivateUnit(vars: ReactivateUnitVariables): MutationPromise<ReactivateUnitData, ReactivateUnitVariables>;
export function reactivateUnit(dc: DataConnect, vars: ReactivateUnitVariables): MutationPromise<ReactivateUnitData, ReactivateUnitVariables>;

interface CreateTopicRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTopicVariables): MutationRef<CreateTopicData, CreateTopicVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTopicVariables): MutationRef<CreateTopicData, CreateTopicVariables>;
  operationName: string;
}
export const createTopicRef: CreateTopicRef;

export function createTopic(vars: CreateTopicVariables): MutationPromise<CreateTopicData, CreateTopicVariables>;
export function createTopic(dc: DataConnect, vars: CreateTopicVariables): MutationPromise<CreateTopicData, CreateTopicVariables>;

interface UpdateTopicRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTopicVariables): MutationRef<UpdateTopicData, UpdateTopicVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTopicVariables): MutationRef<UpdateTopicData, UpdateTopicVariables>;
  operationName: string;
}
export const updateTopicRef: UpdateTopicRef;

export function updateTopic(vars: UpdateTopicVariables): MutationPromise<UpdateTopicData, UpdateTopicVariables>;
export function updateTopic(dc: DataConnect, vars: UpdateTopicVariables): MutationPromise<UpdateTopicData, UpdateTopicVariables>;

interface DeactivateTopicRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateTopicVariables): MutationRef<DeactivateTopicData, DeactivateTopicVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateTopicVariables): MutationRef<DeactivateTopicData, DeactivateTopicVariables>;
  operationName: string;
}
export const deactivateTopicRef: DeactivateTopicRef;

export function deactivateTopic(vars: DeactivateTopicVariables): MutationPromise<DeactivateTopicData, DeactivateTopicVariables>;
export function deactivateTopic(dc: DataConnect, vars: DeactivateTopicVariables): MutationPromise<DeactivateTopicData, DeactivateTopicVariables>;

interface ReactivateTopicRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateTopicVariables): MutationRef<ReactivateTopicData, ReactivateTopicVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateTopicVariables): MutationRef<ReactivateTopicData, ReactivateTopicVariables>;
  operationName: string;
}
export const reactivateTopicRef: ReactivateTopicRef;

export function reactivateTopic(vars: ReactivateTopicVariables): MutationPromise<ReactivateTopicData, ReactivateTopicVariables>;
export function reactivateTopic(dc: DataConnect, vars: ReactivateTopicVariables): MutationPromise<ReactivateTopicData, ReactivateTopicVariables>;

interface CreateLevelCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLevelCategoryVariables): MutationRef<CreateLevelCategoryData, CreateLevelCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLevelCategoryVariables): MutationRef<CreateLevelCategoryData, CreateLevelCategoryVariables>;
  operationName: string;
}
export const createLevelCategoryRef: CreateLevelCategoryRef;

export function createLevelCategory(vars: CreateLevelCategoryVariables): MutationPromise<CreateLevelCategoryData, CreateLevelCategoryVariables>;
export function createLevelCategory(dc: DataConnect, vars: CreateLevelCategoryVariables): MutationPromise<CreateLevelCategoryData, CreateLevelCategoryVariables>;

interface UpdateLevelCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLevelCategoryVariables): MutationRef<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLevelCategoryVariables): MutationRef<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;
  operationName: string;
}
export const updateLevelCategoryRef: UpdateLevelCategoryRef;

export function updateLevelCategory(vars: UpdateLevelCategoryVariables): MutationPromise<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;
export function updateLevelCategory(dc: DataConnect, vars: UpdateLevelCategoryVariables): MutationPromise<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;

interface DeactivateLevelCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateLevelCategoryVariables): MutationRef<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateLevelCategoryVariables): MutationRef<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;
  operationName: string;
}
export const deactivateLevelCategoryRef: DeactivateLevelCategoryRef;

export function deactivateLevelCategory(vars: DeactivateLevelCategoryVariables): MutationPromise<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;
export function deactivateLevelCategory(dc: DataConnect, vars: DeactivateLevelCategoryVariables): MutationPromise<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;

interface ReactivateLevelCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateLevelCategoryVariables): MutationRef<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateLevelCategoryVariables): MutationRef<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;
  operationName: string;
}
export const reactivateLevelCategoryRef: ReactivateLevelCategoryRef;

export function reactivateLevelCategory(vars: ReactivateLevelCategoryVariables): MutationPromise<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;
export function reactivateLevelCategory(dc: DataConnect, vars: ReactivateLevelCategoryVariables): MutationPromise<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;

interface CreateEducationalLevelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEducationalLevelVariables): MutationRef<CreateEducationalLevelData, CreateEducationalLevelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateEducationalLevelVariables): MutationRef<CreateEducationalLevelData, CreateEducationalLevelVariables>;
  operationName: string;
}
export const createEducationalLevelRef: CreateEducationalLevelRef;

export function createEducationalLevel(vars: CreateEducationalLevelVariables): MutationPromise<CreateEducationalLevelData, CreateEducationalLevelVariables>;
export function createEducationalLevel(dc: DataConnect, vars: CreateEducationalLevelVariables): MutationPromise<CreateEducationalLevelData, CreateEducationalLevelVariables>;

interface UpdateEducationalLevelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEducationalLevelVariables): MutationRef<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEducationalLevelVariables): MutationRef<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;
  operationName: string;
}
export const updateEducationalLevelRef: UpdateEducationalLevelRef;

export function updateEducationalLevel(vars: UpdateEducationalLevelVariables): MutationPromise<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;
export function updateEducationalLevel(dc: DataConnect, vars: UpdateEducationalLevelVariables): MutationPromise<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;

interface DeactivateEducationalLevelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateEducationalLevelVariables): MutationRef<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateEducationalLevelVariables): MutationRef<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;
  operationName: string;
}
export const deactivateEducationalLevelRef: DeactivateEducationalLevelRef;

export function deactivateEducationalLevel(vars: DeactivateEducationalLevelVariables): MutationPromise<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;
export function deactivateEducationalLevel(dc: DataConnect, vars: DeactivateEducationalLevelVariables): MutationPromise<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;

interface ReactivateEducationalLevelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateEducationalLevelVariables): MutationRef<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateEducationalLevelVariables): MutationRef<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;
  operationName: string;
}
export const reactivateEducationalLevelRef: ReactivateEducationalLevelRef;

export function reactivateEducationalLevel(vars: ReactivateEducationalLevelVariables): MutationPromise<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;
export function reactivateEducationalLevel(dc: DataConnect, vars: ReactivateEducationalLevelVariables): MutationPromise<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;

interface CreateCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCourseVariables): MutationRef<CreateCourseData, CreateCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCourseVariables): MutationRef<CreateCourseData, CreateCourseVariables>;
  operationName: string;
}
export const createCourseRef: CreateCourseRef;

export function createCourse(vars: CreateCourseVariables): MutationPromise<CreateCourseData, CreateCourseVariables>;
export function createCourse(dc: DataConnect, vars: CreateCourseVariables): MutationPromise<CreateCourseData, CreateCourseVariables>;

interface UpdateCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseVariables): MutationRef<UpdateCourseData, UpdateCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCourseVariables): MutationRef<UpdateCourseData, UpdateCourseVariables>;
  operationName: string;
}
export const updateCourseRef: UpdateCourseRef;

export function updateCourse(vars: UpdateCourseVariables): MutationPromise<UpdateCourseData, UpdateCourseVariables>;
export function updateCourse(dc: DataConnect, vars: UpdateCourseVariables): MutationPromise<UpdateCourseData, UpdateCourseVariables>;

interface DeactivateCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateCourseVariables): MutationRef<DeactivateCourseData, DeactivateCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateCourseVariables): MutationRef<DeactivateCourseData, DeactivateCourseVariables>;
  operationName: string;
}
export const deactivateCourseRef: DeactivateCourseRef;

export function deactivateCourse(vars: DeactivateCourseVariables): MutationPromise<DeactivateCourseData, DeactivateCourseVariables>;
export function deactivateCourse(dc: DataConnect, vars: DeactivateCourseVariables): MutationPromise<DeactivateCourseData, DeactivateCourseVariables>;

interface ReactivateCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateCourseVariables): MutationRef<ReactivateCourseData, ReactivateCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateCourseVariables): MutationRef<ReactivateCourseData, ReactivateCourseVariables>;
  operationName: string;
}
export const reactivateCourseRef: ReactivateCourseRef;

export function reactivateCourse(vars: ReactivateCourseVariables): MutationPromise<ReactivateCourseData, ReactivateCourseVariables>;
export function reactivateCourse(dc: DataConnect, vars: ReactivateCourseVariables): MutationPromise<ReactivateCourseData, ReactivateCourseVariables>;

interface CreateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
  operationName: string;
}
export const createQuestionRef: CreateQuestionRef;

export function createQuestion(vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;
export function createQuestion(dc: DataConnect, vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface CreateQuestionVersionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVersionVariables): MutationRef<CreateQuestionVersionData, CreateQuestionVersionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionVersionVariables): MutationRef<CreateQuestionVersionData, CreateQuestionVersionVariables>;
  operationName: string;
}
export const createQuestionVersionRef: CreateQuestionVersionRef;

export function createQuestionVersion(vars: CreateQuestionVersionVariables): MutationPromise<CreateQuestionVersionData, CreateQuestionVersionVariables>;
export function createQuestionVersion(dc: DataConnect, vars: CreateQuestionVersionVariables): MutationPromise<CreateQuestionVersionData, CreateQuestionVersionVariables>;

interface UpdateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionVariables): MutationRef<UpdateQuestionData, UpdateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuestionVariables): MutationRef<UpdateQuestionData, UpdateQuestionVariables>;
  operationName: string;
}
export const updateQuestionRef: UpdateQuestionRef;

export function updateQuestion(vars: UpdateQuestionVariables): MutationPromise<UpdateQuestionData, UpdateQuestionVariables>;
export function updateQuestion(dc: DataConnect, vars: UpdateQuestionVariables): MutationPromise<UpdateQuestionData, UpdateQuestionVariables>;

interface DeactivateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateQuestionVariables): MutationRef<DeactivateQuestionData, DeactivateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateQuestionVariables): MutationRef<DeactivateQuestionData, DeactivateQuestionVariables>;
  operationName: string;
}
export const deactivateQuestionRef: DeactivateQuestionRef;

export function deactivateQuestion(vars: DeactivateQuestionVariables): MutationPromise<DeactivateQuestionData, DeactivateQuestionVariables>;
export function deactivateQuestion(dc: DataConnect, vars: DeactivateQuestionVariables): MutationPromise<DeactivateQuestionData, DeactivateQuestionVariables>;

interface ReactivateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateQuestionVariables): MutationRef<ReactivateQuestionData, ReactivateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateQuestionVariables): MutationRef<ReactivateQuestionData, ReactivateQuestionVariables>;
  operationName: string;
}
export const reactivateQuestionRef: ReactivateQuestionRef;

export function reactivateQuestion(vars: ReactivateQuestionVariables): MutationPromise<ReactivateQuestionData, ReactivateQuestionVariables>;
export function reactivateQuestion(dc: DataConnect, vars: ReactivateQuestionVariables): MutationPromise<ReactivateQuestionData, ReactivateQuestionVariables>;

interface CreateQuestionOptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionOptionVariables): MutationRef<CreateQuestionOptionData, CreateQuestionOptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionOptionVariables): MutationRef<CreateQuestionOptionData, CreateQuestionOptionVariables>;
  operationName: string;
}
export const createQuestionOptionRef: CreateQuestionOptionRef;

export function createQuestionOption(vars: CreateQuestionOptionVariables): MutationPromise<CreateQuestionOptionData, CreateQuestionOptionVariables>;
export function createQuestionOption(dc: DataConnect, vars: CreateQuestionOptionVariables): MutationPromise<CreateQuestionOptionData, CreateQuestionOptionVariables>;

interface UpdateQuestionOptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionOptionVariables): MutationRef<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuestionOptionVariables): MutationRef<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;
  operationName: string;
}
export const updateQuestionOptionRef: UpdateQuestionOptionRef;

export function updateQuestionOption(vars: UpdateQuestionOptionVariables): MutationPromise<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;
export function updateQuestionOption(dc: DataConnect, vars: UpdateQuestionOptionVariables): MutationPromise<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;

interface DeleteQuestionOptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionOptionVariables): MutationRef<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuestionOptionVariables): MutationRef<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;
  operationName: string;
}
export const deleteQuestionOptionRef: DeleteQuestionOptionRef;

export function deleteQuestionOption(vars: DeleteQuestionOptionVariables): MutationPromise<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;
export function deleteQuestionOption(dc: DataConnect, vars: DeleteQuestionOptionVariables): MutationPromise<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;

interface CreateQuestionTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionTypeVariables): MutationRef<CreateQuestionTypeData, CreateQuestionTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionTypeVariables): MutationRef<CreateQuestionTypeData, CreateQuestionTypeVariables>;
  operationName: string;
}
export const createQuestionTypeRef: CreateQuestionTypeRef;

export function createQuestionType(vars: CreateQuestionTypeVariables): MutationPromise<CreateQuestionTypeData, CreateQuestionTypeVariables>;
export function createQuestionType(dc: DataConnect, vars: CreateQuestionTypeVariables): MutationPromise<CreateQuestionTypeData, CreateQuestionTypeVariables>;

interface UpdateQuestionTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionTypeVariables): MutationRef<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuestionTypeVariables): MutationRef<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;
  operationName: string;
}
export const updateQuestionTypeRef: UpdateQuestionTypeRef;

export function updateQuestionType(vars: UpdateQuestionTypeVariables): MutationPromise<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;
export function updateQuestionType(dc: DataConnect, vars: UpdateQuestionTypeVariables): MutationPromise<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;

interface DeactivateQuestionTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateQuestionTypeVariables): MutationRef<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateQuestionTypeVariables): MutationRef<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;
  operationName: string;
}
export const deactivateQuestionTypeRef: DeactivateQuestionTypeRef;

export function deactivateQuestionType(vars: DeactivateQuestionTypeVariables): MutationPromise<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;
export function deactivateQuestionType(dc: DataConnect, vars: DeactivateQuestionTypeVariables): MutationPromise<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;

interface ReactivateQuestionTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateQuestionTypeVariables): MutationRef<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateQuestionTypeVariables): MutationRef<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;
  operationName: string;
}
export const reactivateQuestionTypeRef: ReactivateQuestionTypeRef;

export function reactivateQuestionType(vars: ReactivateQuestionTypeVariables): MutationPromise<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;
export function reactivateQuestionType(dc: DataConnect, vars: ReactivateQuestionTypeVariables): MutationPromise<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;

interface CreateDifficultyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDifficultyVariables): MutationRef<CreateDifficultyData, CreateDifficultyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDifficultyVariables): MutationRef<CreateDifficultyData, CreateDifficultyVariables>;
  operationName: string;
}
export const createDifficultyRef: CreateDifficultyRef;

export function createDifficulty(vars: CreateDifficultyVariables): MutationPromise<CreateDifficultyData, CreateDifficultyVariables>;
export function createDifficulty(dc: DataConnect, vars: CreateDifficultyVariables): MutationPromise<CreateDifficultyData, CreateDifficultyVariables>;

interface DeactivateDifficultyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateDifficultyVariables): MutationRef<DeactivateDifficultyData, DeactivateDifficultyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateDifficultyVariables): MutationRef<DeactivateDifficultyData, DeactivateDifficultyVariables>;
  operationName: string;
}
export const deactivateDifficultyRef: DeactivateDifficultyRef;

export function deactivateDifficulty(vars: DeactivateDifficultyVariables): MutationPromise<DeactivateDifficultyData, DeactivateDifficultyVariables>;
export function deactivateDifficulty(dc: DataConnect, vars: DeactivateDifficultyVariables): MutationPromise<DeactivateDifficultyData, DeactivateDifficultyVariables>;

interface ReactivateDifficultyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateDifficultyVariables): MutationRef<ReactivateDifficultyData, ReactivateDifficultyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateDifficultyVariables): MutationRef<ReactivateDifficultyData, ReactivateDifficultyVariables>;
  operationName: string;
}
export const reactivateDifficultyRef: ReactivateDifficultyRef;

export function reactivateDifficulty(vars: ReactivateDifficultyVariables): MutationPromise<ReactivateDifficultyData, ReactivateDifficultyVariables>;
export function reactivateDifficulty(dc: DataConnect, vars: ReactivateDifficultyVariables): MutationPromise<ReactivateDifficultyData, ReactivateDifficultyVariables>;

interface CreateTaxonomyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTaxonomyVariables): MutationRef<CreateTaxonomyData, CreateTaxonomyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTaxonomyVariables): MutationRef<CreateTaxonomyData, CreateTaxonomyVariables>;
  operationName: string;
}
export const createTaxonomyRef: CreateTaxonomyRef;

export function createTaxonomy(vars: CreateTaxonomyVariables): MutationPromise<CreateTaxonomyData, CreateTaxonomyVariables>;
export function createTaxonomy(dc: DataConnect, vars: CreateTaxonomyVariables): MutationPromise<CreateTaxonomyData, CreateTaxonomyVariables>;

interface UpdateTaxonomyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTaxonomyVariables): MutationRef<UpdateTaxonomyData, UpdateTaxonomyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTaxonomyVariables): MutationRef<UpdateTaxonomyData, UpdateTaxonomyVariables>;
  operationName: string;
}
export const updateTaxonomyRef: UpdateTaxonomyRef;

export function updateTaxonomy(vars: UpdateTaxonomyVariables): MutationPromise<UpdateTaxonomyData, UpdateTaxonomyVariables>;
export function updateTaxonomy(dc: DataConnect, vars: UpdateTaxonomyVariables): MutationPromise<UpdateTaxonomyData, UpdateTaxonomyVariables>;

interface DeactivateTaxonomyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateTaxonomyVariables): MutationRef<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateTaxonomyVariables): MutationRef<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;
  operationName: string;
}
export const deactivateTaxonomyRef: DeactivateTaxonomyRef;

export function deactivateTaxonomy(vars: DeactivateTaxonomyVariables): MutationPromise<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;
export function deactivateTaxonomy(dc: DataConnect, vars: DeactivateTaxonomyVariables): MutationPromise<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;

interface ReactivateTaxonomyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateTaxonomyVariables): MutationRef<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateTaxonomyVariables): MutationRef<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;
  operationName: string;
}
export const reactivateTaxonomyRef: ReactivateTaxonomyRef;

export function reactivateTaxonomy(vars: ReactivateTaxonomyVariables): MutationPromise<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;
export function reactivateTaxonomy(dc: DataConnect, vars: ReactivateTaxonomyVariables): MutationPromise<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;

interface GetUserByEmailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
  operationName: string;
}
export const getUserByEmailRef: GetUserByEmailRef;

export function getUserByEmail(vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;
export function getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface ListSubjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSubjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSubjectsData, undefined>;
  operationName: string;
}
export const listSubjectsRef: ListSubjectsRef;

export function listSubjects(): QueryPromise<ListSubjectsData, undefined>;
export function listSubjects(dc: DataConnect): QueryPromise<ListSubjectsData, undefined>;

interface GetSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSubjectVariables): QueryRef<GetSubjectData, GetSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSubjectVariables): QueryRef<GetSubjectData, GetSubjectVariables>;
  operationName: string;
}
export const getSubjectRef: GetSubjectRef;

export function getSubject(vars: GetSubjectVariables): QueryPromise<GetSubjectData, GetSubjectVariables>;
export function getSubject(dc: DataConnect, vars: GetSubjectVariables): QueryPromise<GetSubjectData, GetSubjectVariables>;

interface ListUnitsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUnitsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUnitsData, undefined>;
  operationName: string;
}
export const listUnitsRef: ListUnitsRef;

export function listUnits(): QueryPromise<ListUnitsData, undefined>;
export function listUnits(dc: DataConnect): QueryPromise<ListUnitsData, undefined>;

interface GetUnitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUnitVariables): QueryRef<GetUnitData, GetUnitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUnitVariables): QueryRef<GetUnitData, GetUnitVariables>;
  operationName: string;
}
export const getUnitRef: GetUnitRef;

export function getUnit(vars: GetUnitVariables): QueryPromise<GetUnitData, GetUnitVariables>;
export function getUnit(dc: DataConnect, vars: GetUnitVariables): QueryPromise<GetUnitData, GetUnitVariables>;

interface ListTopicsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTopicsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTopicsData, undefined>;
  operationName: string;
}
export const listTopicsRef: ListTopicsRef;

export function listTopics(): QueryPromise<ListTopicsData, undefined>;
export function listTopics(dc: DataConnect): QueryPromise<ListTopicsData, undefined>;

interface GetTopicRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTopicVariables): QueryRef<GetTopicData, GetTopicVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTopicVariables): QueryRef<GetTopicData, GetTopicVariables>;
  operationName: string;
}
export const getTopicRef: GetTopicRef;

export function getTopic(vars: GetTopicVariables): QueryPromise<GetTopicData, GetTopicVariables>;
export function getTopic(dc: DataConnect, vars: GetTopicVariables): QueryPromise<GetTopicData, GetTopicVariables>;

interface ListLevelCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLevelCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListLevelCategoriesData, undefined>;
  operationName: string;
}
export const listLevelCategoriesRef: ListLevelCategoriesRef;

export function listLevelCategories(): QueryPromise<ListLevelCategoriesData, undefined>;
export function listLevelCategories(dc: DataConnect): QueryPromise<ListLevelCategoriesData, undefined>;

interface GetLevelCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLevelCategoryVariables): QueryRef<GetLevelCategoryData, GetLevelCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLevelCategoryVariables): QueryRef<GetLevelCategoryData, GetLevelCategoryVariables>;
  operationName: string;
}
export const getLevelCategoryRef: GetLevelCategoryRef;

export function getLevelCategory(vars: GetLevelCategoryVariables): QueryPromise<GetLevelCategoryData, GetLevelCategoryVariables>;
export function getLevelCategory(dc: DataConnect, vars: GetLevelCategoryVariables): QueryPromise<GetLevelCategoryData, GetLevelCategoryVariables>;

interface ListEducationalLevelsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEducationalLevelsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListEducationalLevelsData, undefined>;
  operationName: string;
}
export const listEducationalLevelsRef: ListEducationalLevelsRef;

export function listEducationalLevels(): QueryPromise<ListEducationalLevelsData, undefined>;
export function listEducationalLevels(dc: DataConnect): QueryPromise<ListEducationalLevelsData, undefined>;

interface GetEducationalLevelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEducationalLevelVariables): QueryRef<GetEducationalLevelData, GetEducationalLevelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEducationalLevelVariables): QueryRef<GetEducationalLevelData, GetEducationalLevelVariables>;
  operationName: string;
}
export const getEducationalLevelRef: GetEducationalLevelRef;

export function getEducationalLevel(vars: GetEducationalLevelVariables): QueryPromise<GetEducationalLevelData, GetEducationalLevelVariables>;
export function getEducationalLevel(dc: DataConnect, vars: GetEducationalLevelVariables): QueryPromise<GetEducationalLevelData, GetEducationalLevelVariables>;

interface GetLevelsByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLevelsByCategoryVariables): QueryRef<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLevelsByCategoryVariables): QueryRef<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;
  operationName: string;
}
export const getLevelsByCategoryRef: GetLevelsByCategoryRef;

export function getLevelsByCategory(vars: GetLevelsByCategoryVariables): QueryPromise<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;
export function getLevelsByCategory(dc: DataConnect, vars: GetLevelsByCategoryVariables): QueryPromise<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;

interface ListCoursesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCoursesVariables): QueryRef<ListCoursesData, ListCoursesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCoursesVariables): QueryRef<ListCoursesData, ListCoursesVariables>;
  operationName: string;
}
export const listCoursesRef: ListCoursesRef;

export function listCourses(vars: ListCoursesVariables): QueryPromise<ListCoursesData, ListCoursesVariables>;
export function listCourses(dc: DataConnect, vars: ListCoursesVariables): QueryPromise<ListCoursesData, ListCoursesVariables>;

interface GetCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
  operationName: string;
}
export const getCourseRef: GetCourseRef;

export function getCourse(vars: GetCourseVariables): QueryPromise<GetCourseData, GetCourseVariables>;
export function getCourse(dc: DataConnect, vars: GetCourseVariables): QueryPromise<GetCourseData, GetCourseVariables>;

interface GetCoursesByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesByUserVariables): QueryRef<GetCoursesByUserData, GetCoursesByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCoursesByUserVariables): QueryRef<GetCoursesByUserData, GetCoursesByUserVariables>;
  operationName: string;
}
export const getCoursesByUserRef: GetCoursesByUserRef;

export function getCoursesByUser(vars: GetCoursesByUserVariables): QueryPromise<GetCoursesByUserData, GetCoursesByUserVariables>;
export function getCoursesByUser(dc: DataConnect, vars: GetCoursesByUserVariables): QueryPromise<GetCoursesByUserData, GetCoursesByUserVariables>;

interface GetCoursesByLevelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesByLevelVariables): QueryRef<GetCoursesByLevelData, GetCoursesByLevelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCoursesByLevelVariables): QueryRef<GetCoursesByLevelData, GetCoursesByLevelVariables>;
  operationName: string;
}
export const getCoursesByLevelRef: GetCoursesByLevelRef;

export function getCoursesByLevel(vars: GetCoursesByLevelVariables): QueryPromise<GetCoursesByLevelData, GetCoursesByLevelVariables>;
export function getCoursesByLevel(dc: DataConnect, vars: GetCoursesByLevelVariables): QueryPromise<GetCoursesByLevelData, GetCoursesByLevelVariables>;

interface ListDifficultiesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDifficultiesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDifficultiesData, undefined>;
  operationName: string;
}
export const listDifficultiesRef: ListDifficultiesRef;

export function listDifficulties(): QueryPromise<ListDifficultiesData, undefined>;
export function listDifficulties(dc: DataConnect): QueryPromise<ListDifficultiesData, undefined>;

interface GetDifficultyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDifficultyVariables): QueryRef<GetDifficultyData, GetDifficultyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDifficultyVariables): QueryRef<GetDifficultyData, GetDifficultyVariables>;
  operationName: string;
}
export const getDifficultyRef: GetDifficultyRef;

export function getDifficulty(vars: GetDifficultyVariables): QueryPromise<GetDifficultyData, GetDifficultyVariables>;
export function getDifficulty(dc: DataConnect, vars: GetDifficultyVariables): QueryPromise<GetDifficultyData, GetDifficultyVariables>;

interface ListQuestionTypesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuestionTypesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuestionTypesData, undefined>;
  operationName: string;
}
export const listQuestionTypesRef: ListQuestionTypesRef;

export function listQuestionTypes(): QueryPromise<ListQuestionTypesData, undefined>;
export function listQuestionTypes(dc: DataConnect): QueryPromise<ListQuestionTypesData, undefined>;

interface GetQuestionTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionTypeVariables): QueryRef<GetQuestionTypeData, GetQuestionTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuestionTypeVariables): QueryRef<GetQuestionTypeData, GetQuestionTypeVariables>;
  operationName: string;
}
export const getQuestionTypeRef: GetQuestionTypeRef;

export function getQuestionType(vars: GetQuestionTypeVariables): QueryPromise<GetQuestionTypeData, GetQuestionTypeVariables>;
export function getQuestionType(dc: DataConnect, vars: GetQuestionTypeVariables): QueryPromise<GetQuestionTypeData, GetQuestionTypeVariables>;

interface GetQuestionTypeByCodeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionTypeByCodeVariables): QueryRef<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuestionTypeByCodeVariables): QueryRef<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;
  operationName: string;
}
export const getQuestionTypeByCodeRef: GetQuestionTypeByCodeRef;

export function getQuestionTypeByCode(vars: GetQuestionTypeByCodeVariables): QueryPromise<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;
export function getQuestionTypeByCode(dc: DataConnect, vars: GetQuestionTypeByCodeVariables): QueryPromise<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;

interface ListTaxonomiesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTaxonomiesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTaxonomiesData, undefined>;
  operationName: string;
}
export const listTaxonomiesRef: ListTaxonomiesRef;

export function listTaxonomies(): QueryPromise<ListTaxonomiesData, undefined>;
export function listTaxonomies(dc: DataConnect): QueryPromise<ListTaxonomiesData, undefined>;

interface GetTaxonomyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTaxonomyVariables): QueryRef<GetTaxonomyData, GetTaxonomyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTaxonomyVariables): QueryRef<GetTaxonomyData, GetTaxonomyVariables>;
  operationName: string;
}
export const getTaxonomyRef: GetTaxonomyRef;

export function getTaxonomy(vars: GetTaxonomyVariables): QueryPromise<GetTaxonomyData, GetTaxonomyVariables>;
export function getTaxonomy(dc: DataConnect, vars: GetTaxonomyVariables): QueryPromise<GetTaxonomyData, GetTaxonomyVariables>;

interface GetTaxonomyByCodeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTaxonomyByCodeVariables): QueryRef<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTaxonomyByCodeVariables): QueryRef<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;
  operationName: string;
}
export const getTaxonomyByCodeRef: GetTaxonomyByCodeRef;

export function getTaxonomyByCode(vars: GetTaxonomyByCodeVariables): QueryPromise<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;
export function getTaxonomyByCode(dc: DataConnect, vars: GetTaxonomyByCodeVariables): QueryPromise<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;

interface ListTaxonomiesByLevelRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTaxonomiesByLevelData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTaxonomiesByLevelData, undefined>;
  operationName: string;
}
export const listTaxonomiesByLevelRef: ListTaxonomiesByLevelRef;

export function listTaxonomiesByLevel(): QueryPromise<ListTaxonomiesByLevelData, undefined>;
export function listTaxonomiesByLevel(dc: DataConnect): QueryPromise<ListTaxonomiesByLevelData, undefined>;

interface ListQuestionsByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListQuestionsByUserVariables): QueryRef<ListQuestionsByUserData, ListQuestionsByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListQuestionsByUserVariables): QueryRef<ListQuestionsByUserData, ListQuestionsByUserVariables>;
  operationName: string;
}
export const listQuestionsByUserRef: ListQuestionsByUserRef;

export function listQuestionsByUser(vars: ListQuestionsByUserVariables): QueryPromise<ListQuestionsByUserData, ListQuestionsByUserVariables>;
export function listQuestionsByUser(dc: DataConnect, vars: ListQuestionsByUserVariables): QueryPromise<ListQuestionsByUserData, ListQuestionsByUserVariables>;

interface GetQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionVariables): QueryRef<GetQuestionData, GetQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuestionVariables): QueryRef<GetQuestionData, GetQuestionVariables>;
  operationName: string;
}
export const getQuestionRef: GetQuestionRef;

export function getQuestion(vars: GetQuestionVariables): QueryPromise<GetQuestionData, GetQuestionVariables>;
export function getQuestion(dc: DataConnect, vars: GetQuestionVariables): QueryPromise<GetQuestionData, GetQuestionVariables>;

interface ListPublicQuestionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicQuestionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublicQuestionsData, undefined>;
  operationName: string;
}
export const listPublicQuestionsRef: ListPublicQuestionsRef;

export function listPublicQuestions(): QueryPromise<ListPublicQuestionsData, undefined>;
export function listPublicQuestions(dc: DataConnect): QueryPromise<ListPublicQuestionsData, undefined>;

interface ListPublicQuestionsByDifficultyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPublicQuestionsByDifficultyVariables): QueryRef<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListPublicQuestionsByDifficultyVariables): QueryRef<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;
  operationName: string;
}
export const listPublicQuestionsByDifficultyRef: ListPublicQuestionsByDifficultyRef;

export function listPublicQuestionsByDifficulty(vars: ListPublicQuestionsByDifficultyVariables): QueryPromise<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;
export function listPublicQuestionsByDifficulty(dc: DataConnect, vars: ListPublicQuestionsByDifficultyVariables): QueryPromise<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;

interface ListPublicQuestionsByTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPublicQuestionsByTypeVariables): QueryRef<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListPublicQuestionsByTypeVariables): QueryRef<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;
  operationName: string;
}
export const listPublicQuestionsByTypeRef: ListPublicQuestionsByTypeRef;

export function listPublicQuestionsByType(vars: ListPublicQuestionsByTypeVariables): QueryPromise<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;
export function listPublicQuestionsByType(dc: DataConnect, vars: ListPublicQuestionsByTypeVariables): QueryPromise<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;

interface GetQuestionOptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionOptionsVariables): QueryRef<GetQuestionOptionsData, GetQuestionOptionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuestionOptionsVariables): QueryRef<GetQuestionOptionsData, GetQuestionOptionsVariables>;
  operationName: string;
}
export const getQuestionOptionsRef: GetQuestionOptionsRef;

export function getQuestionOptions(vars: GetQuestionOptionsVariables): QueryPromise<GetQuestionOptionsData, GetQuestionOptionsVariables>;
export function getQuestionOptions(dc: DataConnect, vars: GetQuestionOptionsVariables): QueryPromise<GetQuestionOptionsData, GetQuestionOptionsVariables>;

