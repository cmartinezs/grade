import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddQuestionToEvaluationData {
  evaluationQuestion_insert: EvaluationQuestion_Key;
}

export interface AddQuestionToEvaluationVariables {
  evaluationQuestionId: UUIDString;
  evaluationId: UUIDString;
  questionId: UUIDString;
  points: number;
  position: number;
}

export interface AddQuestionToStudentEvaluationData {
  studentEvaluationQuestion_insert: StudentEvaluationQuestion_Key;
}

export interface AddQuestionToStudentEvaluationVariables {
  studentEvaluationQuestionId: UUIDString;
  studentEvaluationId: UUIDString;
  evaluationQuestionId: UUIDString;
  position: number;
}

export interface AssignEvaluationToCourseData {
  courseEvaluation_insert: CourseEvaluation_Key;
}

export interface AssignEvaluationToCourseVariables {
  courseEvaluationId: UUIDString;
  courseId: UUIDString;
  evaluationId: UUIDString;
  scheduledDate: DateString;
  durationMinutes: number;
  createdBy: UUIDString;
  firebaseId: string;
}

export interface CompleteStudentEvaluationData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}

export interface CompleteStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
}

export interface CourseEvaluation_Key {
  courseEvaluationId: UUIDString;
  __typename?: 'CourseEvaluation_Key';
}

export interface CourseStudent_Key {
  courseStudentId: UUIDString;
  __typename?: 'CourseStudent_Key';
}

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
  code: string;
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

export interface CreateEvaluationData {
  evaluation_insert: Evaluation_Key;
}

export interface CreateEvaluationVariables {
  evaluationId: UUIDString;
  title: string;
  gradeScale: string;
  subjectId: UUIDString;
  userId: UUIDString;
  allowQuestionSubset: boolean;
  questionSubsetPercent?: number | null;
  firebaseId: string;
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

export interface CreateStudentData {
  student_insert: Student_Key;
}

export interface CreateStudentEvaluationData {
  studentCourseEvaluation_insert: StudentCourseEvaluation_Key;
}

export interface CreateStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
  courseEvaluationId: UUIDString;
  courseStudentId: UUIDString;
}

export interface CreateStudentVariables {
  studentId: UUIDString;
  firstName: string;
  lastName: string;
  identifier: string;
  email: string;
  createdBy: UUIDString;
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
  description?: string | null;
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
  code: string;
  name: string;
  unitId: UUIDString;
  createdBy: UUIDString;
}

export interface CreateUnitData {
  unit_insert: Unit_Key;
}

export interface CreateUnitVariables {
  unitId: UUIDString;
  code: string;
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

export interface DeactivateEvaluationData {
  evaluation_update?: Evaluation_Key | null;
}

export interface DeactivateEvaluationVariables {
  evaluationId: UUIDString;
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

export interface DeactivateStudentData {
  student_update?: Student_Key | null;
}

export interface DeactivateStudentVariables {
  studentId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
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

export interface EnrollStudentInCourseData {
  courseStudent_insert: CourseStudent_Key;
}

export interface EnrollStudentInCourseVariables {
  courseStudentId: UUIDString;
  courseId: UUIDString;
  studentId: UUIDString;
  enrolledOn: DateString;
  createdBy: UUIDString;
  firebaseId: string;
}

export interface EvaluationQuestion_Key {
  evaluationQuestionId: UUIDString;
  __typename?: 'EvaluationQuestion_Key';
}

export interface Evaluation_Key {
  evaluationId: UUIDString;
  __typename?: 'Evaluation_Key';
}

export interface GetAllCoursesByUserData {
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
  } & Course_Key)[];
}

export interface GetAllCoursesByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}

export interface GetAllEvaluationsByUserData {
  evaluations: ({
    evaluationId: UUIDString;
    title: string;
    allowQuestionSubset: boolean;
    questionSubsetPercent?: number | null;
    gradeScale: string;
    state: string;
    pdfPath?: string | null;
    subjectId: UUIDString;
    userId: UUIDString;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Evaluation_Key)[];
}

export interface GetAllEvaluationsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}

export interface GetAllStudentsByUserData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
    email: string;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Student_Key)[];
}

export interface GetAllStudentsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}

export interface GetCourseByCodeData {
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
  } & Course_Key)[];
}

export interface GetCourseByCodeVariables {
  userId: UUIDString;
  code: string;
  firebaseId: string;
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

export interface GetCourseEvaluationByAccessCodeData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    scheduledDate: DateString;
    durationMinutes: number;
    accessCode?: string | null;
    course: {
      courseId: UUIDString;
      name: string;
      code: string;
      section?: string | null;
      institutionName: string;
      levelId: UUIDString;
    } & Course_Key;
      evaluation: {
        evaluationId: UUIDString;
        title: string;
        gradeScale: string;
        state: string;
        subjectId: UUIDString;
        allowQuestionSubset: boolean;
        questionSubsetPercent?: number | null;
      } & Evaluation_Key;
  } & CourseEvaluation_Key)[];
}

export interface GetCourseEvaluationByAccessCodeVariables {
  accessCode: string;
}

export interface GetCourseEvaluationByIdData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
}

export interface GetCourseEvaluationByIdVariables {
  courseEvaluationId: UUIDString;
}

export interface GetCourseEvaluationsByUserData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
}

export interface GetCourseEvaluationsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}

export interface GetCourseStudentsDetailData {
  courseStudents: ({
    courseStudentId: UUIDString;
    courseId: UUIDString;
    studentId: UUIDString;
    enrolledOn: DateString;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & CourseStudent_Key)[];
}

export interface GetCourseStudentsDetailVariables {
  courseId: UUIDString;
}

export interface GetCourseStudentsWithDetailsData {
  courseStudents: ({
    courseStudentId: UUIDString;
    enrolledOn: DateString;
    student: {
      studentId: UUIDString;
      firstName: string;
      lastName: string;
      identifier: string;
      email: string;
      createdAt: TimestampString;
      createdBy: UUIDString;
      updatedAt?: TimestampString | null;
      updatedBy?: UUIDString | null;
    } & Student_Key;
  } & CourseStudent_Key)[];
}

export interface GetCourseStudentsWithDetailsVariables {
  courseId: UUIDString;
  firebaseId: string;
}

export interface GetCourseVariables {
  courseId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}

export interface GetCoursesByEducationalLevelData {
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
  } & Course_Key)[];
}

export interface GetCoursesByEducationalLevelVariables {
  userId: UUIDString;
  levelId: UUIDString;
  firebaseId: string;
}

export interface GetCoursesByInstitutionData {
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
  } & Course_Key)[];
}

export interface GetCoursesByInstitutionVariables {
  userId: UUIDString;
  institutionName: string;
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

export interface GetCoursesForEvaluationData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    accessCode?: string | null;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
}

export interface GetCoursesForEvaluationVariables {
  evaluationId: UUIDString;
}

export interface GetDashboardQuestionsData {
  questions: ({
    questionId: UUIDString;
    active: boolean;
    topicId: UUIDString;
    difficultyId: UUIDString;
    questionTypeId: UUIDString;
    taxonomyId: UUIDString;
    isPublic: boolean;
    createdAt: TimestampString;
  } & Question_Key)[];
}

export interface GetDashboardQuestionsVariables {
  userId: UUIDString;
  firebaseId: string;
}

export interface GetDashboardSystemDataData {
  taxonomies: ({
    taxonomyId: UUIDString;
    name: string;
    code: string;
    level: number;
  } & Taxonomy_Key)[];
    difficulties: ({
      difficultyId: UUIDString;
      code: string;
      level: string;
      weight: number;
    } & Difficulty_Key)[];
      questionTypes: ({
        questionTypeId: UUIDString;
        name: string;
        code: string;
      } & QuestionType_Key)[];
        subjects: ({
          subjectId: UUIDString;
          code: string;
          name: string;
          levelId: UUIDString;
          description?: string | null;
        } & Subject_Key)[];
          units: ({
            unitId: UUIDString;
            code: string;
            name: string;
            subjectId: UUIDString;
            description?: string | null;
          } & Unit_Key)[];
            topics: ({
              topicId: UUIDString;
              code: string;
              name: string;
              unitId: UUIDString;
              description?: string | null;
            } & Topic_Key)[];
}

export interface GetDifficultyData {
  difficulty?: {
    difficultyId: UUIDString;
    code: string;
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

export interface GetEvaluationByIdData {
  evaluations: ({
    evaluationId: UUIDString;
    title: string;
    gradeScale: string;
    state: string;
    pdfPath?: string | null;
    subjectId: UUIDString;
    userId: UUIDString;
    allowQuestionSubset: boolean;
    questionSubsetPercent?: number | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Evaluation_Key)[];
    evaluationQuestions: ({
      evaluationQuestionId: UUIDString;
      evaluationId: UUIDString;
      questionId: UUIDString;
      points: number;
      position: number;
    } & EvaluationQuestion_Key)[];
}

export interface GetEvaluationByIdVariables {
  userId: UUIDString;
  evaluationId: UUIDString;
  firebaseId: string;
}

export interface GetEvaluationFullDetailData {
  evaluations: ({
    evaluationId: UUIDString;
    title: string;
    allowQuestionSubset: boolean;
    questionSubsetPercent?: number | null;
    gradeScale: string;
    state: string;
    pdfPath?: string | null;
    subjectId: UUIDString;
    userId: UUIDString;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Evaluation_Key)[];
    evaluationQuestions: ({
      evaluationQuestionId: UUIDString;
      evaluationId: UUIDString;
      questionId: UUIDString;
      points: number;
      position: number;
    } & EvaluationQuestion_Key)[];
}

export interface GetEvaluationFullDetailVariables {
  userId: UUIDString;
  evaluationId: UUIDString;
  firebaseId: string;
}

export interface GetEvaluationQuestionsData {
  evaluationQuestions: ({
    evaluationQuestionId: UUIDString;
    evaluationId: UUIDString;
    questionId: UUIDString;
    points: number;
    position: number;
  } & EvaluationQuestion_Key)[];
}

export interface GetEvaluationQuestionsVariables {
  evaluationId: UUIDString;
}

export interface GetEvaluationsByCourseData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
}

export interface GetEvaluationsByCourseVariables {
  userId: UUIDString;
  courseId: UUIDString;
  firebaseId: string;
}

export interface GetEvaluationsByStateData {
  evaluations: ({
    evaluationId: UUIDString;
    title: string;
    allowQuestionSubset: boolean;
    questionSubsetPercent?: number | null;
    gradeScale: string;
    state: string;
    pdfPath?: string | null;
    subjectId: UUIDString;
    userId: UUIDString;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Evaluation_Key)[];
}

export interface GetEvaluationsByStateVariables {
  userId: UUIDString;
  state: string;
  firebaseId: string;
}

export interface GetEvaluationsBySubjectData {
  evaluations: ({
    evaluationId: UUIDString;
    title: string;
    allowQuestionSubset: boolean;
    questionSubsetPercent?: number | null;
    gradeScale: string;
    state: string;
    pdfPath?: string | null;
    subjectId: UUIDString;
    userId: UUIDString;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Evaluation_Key)[];
}

export interface GetEvaluationsBySubjectVariables {
  userId: UUIDString;
  subjectId: UUIDString;
  firebaseId: string;
}

export interface GetEvaluationsForCourseData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
}

export interface GetEvaluationsForCourseVariables {
  courseId: UUIDString;
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
    questionOptions: ({
      questionOptionId: UUIDString;
      text: string;
      isCorrect: boolean;
      position: number;
      score?: number | null;
      questionId: UUIDString;
    } & QuestionOption_Key)[];
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

export interface GetStudentAnswerOptionsData {
  studentAnswerOptions: ({
    studentAnswerOptionId: UUIDString;
    studentEvaluationQuestionId: UUIDString;
    questionOptionId: UUIDString;
  } & StudentAnswerOption_Key)[];
}

export interface GetStudentAnswerOptionsVariables {
  studentEvaluationQuestionId: UUIDString;
}

export interface GetStudentByIdData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
    email: string;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Student_Key)[];
}

export interface GetStudentByIdVariables {
  userId: UUIDString;
  studentId: UUIDString;
  firebaseId: string;
}

export interface GetStudentByIdentifierData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
    email: string;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Student_Key)[];
}

export interface GetStudentByIdentifierVariables {
  userId: UUIDString;
  identifier: string;
  firebaseId: string;
}

export interface GetStudentEvaluationByIdData {
  studentCourseEvaluations: ({
    studentCourseEvaluationId: UUIDString;
    courseEvaluationId: UUIDString;
    courseStudentId: UUIDString;
    totalScore: number;
    grade?: number | null;
    takenOn?: TimestampString | null;
    attemptNo?: number | null;
    state: string;
  } & StudentCourseEvaluation_Key)[];
    studentEvaluationQuestions: ({
      studentEvaluationQuestionId: UUIDString;
      studentEvaluationId: UUIDString;
      evaluationQuestionId: UUIDString;
      position: number;
      scoreObtained?: number | null;
      isCorrect?: boolean | null;
    } & StudentEvaluationQuestion_Key)[];
}

export interface GetStudentEvaluationByIdVariables {
  studentEvaluationId: UUIDString;
}

export interface GetStudentEvaluationFullDetailData {
  studentCourseEvaluations: ({
    studentCourseEvaluationId: UUIDString;
    courseEvaluationId: UUIDString;
    courseStudentId: UUIDString;
    totalScore: number;
    grade?: number | null;
    takenOn?: TimestampString | null;
    attemptNo?: number | null;
    state: string;
  } & StudentCourseEvaluation_Key)[];
    studentEvaluationQuestions: ({
      studentEvaluationQuestionId: UUIDString;
      studentEvaluationId: UUIDString;
      evaluationQuestionId: UUIDString;
      position: number;
      scoreObtained?: number | null;
      isCorrect?: boolean | null;
    } & StudentEvaluationQuestion_Key)[];
}

export interface GetStudentEvaluationFullDetailVariables {
  studentEvaluationId: UUIDString;
}

export interface GetStudentEvaluationQuestionsData {
  studentEvaluationQuestions: ({
    studentEvaluationQuestionId: UUIDString;
    studentEvaluationId: UUIDString;
    evaluationQuestionId: UUIDString;
    position: number;
    scoreObtained?: number | null;
    isCorrect?: boolean | null;
  } & StudentEvaluationQuestion_Key)[];
}

export interface GetStudentEvaluationQuestionsVariables {
  studentEvaluationId: UUIDString;
}

export interface GetStudentEvaluationsByCourseEvaluationData {
  studentCourseEvaluations: ({
    studentCourseEvaluationId: UUIDString;
    courseEvaluationId: UUIDString;
    courseStudentId: UUIDString;
    totalScore: number;
    grade?: number | null;
    takenOn?: TimestampString | null;
    attemptNo?: number | null;
    state: string;
  } & StudentCourseEvaluation_Key)[];
}

export interface GetStudentEvaluationsByCourseEvaluationVariables {
  courseEvaluationId: UUIDString;
}

export interface GetStudentEvaluationsByCourseStudentData {
  studentCourseEvaluations: ({
    studentCourseEvaluationId: UUIDString;
    courseEvaluationId: UUIDString;
    courseStudentId: UUIDString;
    totalScore: number;
    grade?: number | null;
    takenOn?: TimestampString | null;
    attemptNo?: number | null;
    state: string;
  } & StudentCourseEvaluation_Key)[];
}

export interface GetStudentEvaluationsByCourseStudentVariables {
  courseStudentId: UUIDString;
}

export interface GetStudentEvaluationsByFirstNameData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
  } & Student_Key)[];
}

export interface GetStudentEvaluationsByFirstNameVariables {
  firstName: string;
}

export interface GetStudentEvaluationsByIdentifierData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
  } & Student_Key)[];
}

export interface GetStudentEvaluationsByIdentifierVariables {
  identifier: string;
}

export interface GetStudentEvaluationsByLastNameData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
  } & Student_Key)[];
}

export interface GetStudentEvaluationsByLastNameVariables {
  lastName: string;
}

export interface GetStudentEvaluationsByStudentIdData {
  courseStudents: ({
    courseStudentId: UUIDString;
    courseId: UUIDString;
    studentId: UUIDString;
    enrolledOn: DateString;
  } & CourseStudent_Key)[];
}

export interface GetStudentEvaluationsByStudentIdVariables {
  studentId: UUIDString;
}

export interface GetStudentsByCourseData {
  courseStudents: ({
    courseStudentId: UUIDString;
    courseId: UUIDString;
    studentId: UUIDString;
    enrolledOn: DateString;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseStudent_Key)[];
}

export interface GetStudentsByCourseVariables {
  userId: UUIDString;
  courseId: UUIDString;
  firebaseId: string;
}

export interface GetStudentsByFirstNameData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
    email: string;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Student_Key)[];
}

export interface GetStudentsByFirstNameVariables {
  userId: UUIDString;
  firstName: string;
  firebaseId: string;
}

export interface GetStudentsByLastNameData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
    email: string;
    createdAt: TimestampString;
    createdBy: UUIDString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
  } & Student_Key)[];
}

export interface GetStudentsByLastNameVariables {
  userId: UUIDString;
  lastName: string;
  firebaseId: string;
}

export interface GetSubjectData {
  subject?: {
    subjectId: UUIDString;
    name: string;
    code: string;
    description?: string | null;
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
    code: string;
    name: string;
    description?: string | null;
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
    code: string;
    name: string;
    subjectId: UUIDString;
    description?: string | null;
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

export interface GetUserByIdData {
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

export interface GetUserByIdVariables {
  userId: UUIDString;
}

export interface GradeStudentEvaluationData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}

export interface GradeStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
  totalScore: number;
  grade: number;
}

export interface GradeStudentQuestionData {
  studentEvaluationQuestion_update?: StudentEvaluationQuestion_Key | null;
}

export interface GradeStudentQuestionVariables {
  studentEvaluationQuestionId: UUIDString;
  scoreObtained: number;
  isCorrect: boolean;
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
    code: string;
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
    description?: string | null;
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
    code: string;
    name: string;
    description?: string | null;
    unitId: UUIDString;
    active: boolean;
    createdAt: TimestampString;
  } & Topic_Key)[];
}

export interface ListUnitsData {
  units: ({
    unitId: UUIDString;
    code: string;
    name: string;
    subjectId: UUIDString;
    description?: string | null;
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

export interface ReactivateEvaluationData {
  evaluation_update?: Evaluation_Key | null;
}

export interface ReactivateEvaluationVariables {
  evaluationId: UUIDString;
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

export interface ReactivateStudentData {
  student_update?: Student_Key | null;
}

export interface ReactivateStudentVariables {
  studentId: UUIDString;
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

export interface ReenrollStudentInCourseData {
  courseStudent_update?: CourseStudent_Key | null;
}

export interface ReenrollStudentInCourseVariables {
  courseStudentId: UUIDString;
  firebaseId: string;
}

export interface RegisterStudentAnswerData {
  studentAnswerOption_insert: StudentAnswerOption_Key;
}

export interface RegisterStudentAnswerVariables {
  studentAnswerOptionId: UUIDString;
  studentEvaluationQuestionId: UUIDString;
  questionOptionId: UUIDString;
}

export interface RemoveEvaluationFromCourseData {
  courseEvaluation_delete?: CourseEvaluation_Key | null;
}

export interface RemoveEvaluationFromCourseVariables {
  courseEvaluationId: UUIDString;
  firebaseId: string;
}

export interface RemoveQuestionFromEvaluationData {
  evaluationQuestion_delete?: EvaluationQuestion_Key | null;
}

export interface RemoveQuestionFromEvaluationVariables {
  evaluationQuestionId: UUIDString;
}

export interface RemoveQuestionFromStudentEvaluationData {
  studentEvaluationQuestion_delete?: StudentEvaluationQuestion_Key | null;
}

export interface RemoveQuestionFromStudentEvaluationVariables {
  studentEvaluationQuestionId: UUIDString;
}

export interface RemoveStudentAnswerData {
  studentAnswerOption_delete?: StudentAnswerOption_Key | null;
}

export interface RemoveStudentAnswerVariables {
  studentAnswerOptionId: UUIDString;
}

export interface StartStudentEvaluationData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}

export interface StartStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
  takenOn: TimestampString;
  attemptNo: number;
}

export interface StudentAnswerOption_Key {
  studentAnswerOptionId: UUIDString;
  __typename?: 'StudentAnswerOption_Key';
}

export interface StudentCourseEvaluation_Key {
  studentCourseEvaluationId: UUIDString;
  __typename?: 'StudentCourseEvaluation_Key';
}

export interface StudentEvaluationQuestion_Key {
  studentEvaluationQuestionId: UUIDString;
  __typename?: 'StudentEvaluationQuestion_Key';
}

export interface Student_Key {
  studentId: UUIDString;
  __typename?: 'Student_Key';
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

export interface UnenrollStudentFromCourseData {
  courseStudent_update?: CourseStudent_Key | null;
}

export interface UnenrollStudentFromCourseVariables {
  courseStudentId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}

export interface Unit_Key {
  unitId: UUIDString;
  __typename?: 'Unit_Key';
}

export interface UpdateCourseData {
  course_update?: Course_Key | null;
}

export interface UpdateCourseEvaluationAccessCodeData {
  courseEvaluation_update?: CourseEvaluation_Key | null;
}

export interface UpdateCourseEvaluationAccessCodeVariables {
  courseEvaluationId: UUIDString;
  accessCode: string;
  firebaseId: string;
}

export interface UpdateCourseStudentData {
  courseStudent_update?: CourseStudent_Key | null;
}

export interface UpdateCourseStudentVariables {
  courseStudentId: UUIDString;
  enrolledOn?: DateString | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
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

export interface UpdateEvaluationData {
  evaluation_update?: Evaluation_Key | null;
}

export interface UpdateEvaluationQuestionData {
  evaluationQuestion_update?: EvaluationQuestion_Key | null;
}

export interface UpdateEvaluationQuestionVariables {
  evaluationQuestionId: UUIDString;
  points?: number | null;
  position?: number | null;
}

export interface UpdateEvaluationStateData {
  evaluation_update?: Evaluation_Key | null;
}

export interface UpdateEvaluationStateVariables {
  evaluationId: UUIDString;
  state: string;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}

export interface UpdateEvaluationVariables {
  evaluationId: UUIDString;
  title?: string | null;
  gradeScale?: string | null;
  subjectId?: UUIDString | null;
  pdfPath?: string | null;
  allowQuestionSubset?: boolean | null;
  questionSubsetPercent?: number | null;
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

export interface UpdateStudentData {
  student_update?: Student_Key | null;
}

export interface UpdateStudentEvaluationScoreData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}

export interface UpdateStudentEvaluationScoreVariables {
  studentCourseEvaluationId: UUIDString;
  totalScore: number;
}

export interface UpdateStudentEvaluationStateData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}

export interface UpdateStudentEvaluationStateVariables {
  studentCourseEvaluationId: UUIDString;
  state: string;
}

export interface UpdateStudentQuestionPositionData {
  studentEvaluationQuestion_update?: StudentEvaluationQuestion_Key | null;
}

export interface UpdateStudentQuestionPositionVariables {
  studentEvaluationQuestionId: UUIDString;
  position: number;
}

export interface UpdateStudentVariables {
  studentId: UUIDString;
  firstName?: string | null;
  lastName?: string | null;
  identifier?: string | null;
  email?: string | null;
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
  description?: string | null;
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
  code: string;
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
  code: string;
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

interface CreateEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEvaluationVariables): MutationRef<CreateEvaluationData, CreateEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateEvaluationVariables): MutationRef<CreateEvaluationData, CreateEvaluationVariables>;
  operationName: string;
}
export const createEvaluationRef: CreateEvaluationRef;

export function createEvaluation(vars: CreateEvaluationVariables): MutationPromise<CreateEvaluationData, CreateEvaluationVariables>;
export function createEvaluation(dc: DataConnect, vars: CreateEvaluationVariables): MutationPromise<CreateEvaluationData, CreateEvaluationVariables>;

interface UpdateEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEvaluationVariables): MutationRef<UpdateEvaluationData, UpdateEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEvaluationVariables): MutationRef<UpdateEvaluationData, UpdateEvaluationVariables>;
  operationName: string;
}
export const updateEvaluationRef: UpdateEvaluationRef;

export function updateEvaluation(vars: UpdateEvaluationVariables): MutationPromise<UpdateEvaluationData, UpdateEvaluationVariables>;
export function updateEvaluation(dc: DataConnect, vars: UpdateEvaluationVariables): MutationPromise<UpdateEvaluationData, UpdateEvaluationVariables>;

interface UpdateEvaluationStateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEvaluationStateVariables): MutationRef<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEvaluationStateVariables): MutationRef<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;
  operationName: string;
}
export const updateEvaluationStateRef: UpdateEvaluationStateRef;

export function updateEvaluationState(vars: UpdateEvaluationStateVariables): MutationPromise<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;
export function updateEvaluationState(dc: DataConnect, vars: UpdateEvaluationStateVariables): MutationPromise<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;

interface DeactivateEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateEvaluationVariables): MutationRef<DeactivateEvaluationData, DeactivateEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateEvaluationVariables): MutationRef<DeactivateEvaluationData, DeactivateEvaluationVariables>;
  operationName: string;
}
export const deactivateEvaluationRef: DeactivateEvaluationRef;

export function deactivateEvaluation(vars: DeactivateEvaluationVariables): MutationPromise<DeactivateEvaluationData, DeactivateEvaluationVariables>;
export function deactivateEvaluation(dc: DataConnect, vars: DeactivateEvaluationVariables): MutationPromise<DeactivateEvaluationData, DeactivateEvaluationVariables>;

interface ReactivateEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateEvaluationVariables): MutationRef<ReactivateEvaluationData, ReactivateEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateEvaluationVariables): MutationRef<ReactivateEvaluationData, ReactivateEvaluationVariables>;
  operationName: string;
}
export const reactivateEvaluationRef: ReactivateEvaluationRef;

export function reactivateEvaluation(vars: ReactivateEvaluationVariables): MutationPromise<ReactivateEvaluationData, ReactivateEvaluationVariables>;
export function reactivateEvaluation(dc: DataConnect, vars: ReactivateEvaluationVariables): MutationPromise<ReactivateEvaluationData, ReactivateEvaluationVariables>;

interface AddQuestionToEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddQuestionToEvaluationVariables): MutationRef<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddQuestionToEvaluationVariables): MutationRef<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;
  operationName: string;
}
export const addQuestionToEvaluationRef: AddQuestionToEvaluationRef;

export function addQuestionToEvaluation(vars: AddQuestionToEvaluationVariables): MutationPromise<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;
export function addQuestionToEvaluation(dc: DataConnect, vars: AddQuestionToEvaluationVariables): MutationPromise<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;

interface UpdateEvaluationQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEvaluationQuestionVariables): MutationRef<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEvaluationQuestionVariables): MutationRef<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;
  operationName: string;
}
export const updateEvaluationQuestionRef: UpdateEvaluationQuestionRef;

export function updateEvaluationQuestion(vars: UpdateEvaluationQuestionVariables): MutationPromise<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;
export function updateEvaluationQuestion(dc: DataConnect, vars: UpdateEvaluationQuestionVariables): MutationPromise<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;

interface RemoveQuestionFromEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveQuestionFromEvaluationVariables): MutationRef<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveQuestionFromEvaluationVariables): MutationRef<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;
  operationName: string;
}
export const removeQuestionFromEvaluationRef: RemoveQuestionFromEvaluationRef;

export function removeQuestionFromEvaluation(vars: RemoveQuestionFromEvaluationVariables): MutationPromise<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;
export function removeQuestionFromEvaluation(dc: DataConnect, vars: RemoveQuestionFromEvaluationVariables): MutationPromise<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;

interface AssignEvaluationToCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignEvaluationToCourseVariables): MutationRef<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignEvaluationToCourseVariables): MutationRef<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;
  operationName: string;
}
export const assignEvaluationToCourseRef: AssignEvaluationToCourseRef;

export function assignEvaluationToCourse(vars: AssignEvaluationToCourseVariables): MutationPromise<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;
export function assignEvaluationToCourse(dc: DataConnect, vars: AssignEvaluationToCourseVariables): MutationPromise<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;

interface RemoveEvaluationFromCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveEvaluationFromCourseVariables): MutationRef<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveEvaluationFromCourseVariables): MutationRef<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;
  operationName: string;
}
export const removeEvaluationFromCourseRef: RemoveEvaluationFromCourseRef;

export function removeEvaluationFromCourse(vars: RemoveEvaluationFromCourseVariables): MutationPromise<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;
export function removeEvaluationFromCourse(dc: DataConnect, vars: RemoveEvaluationFromCourseVariables): MutationPromise<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;

interface UpdateCourseEvaluationAccessCodeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseEvaluationAccessCodeVariables): MutationRef<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCourseEvaluationAccessCodeVariables): MutationRef<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;
  operationName: string;
}
export const updateCourseEvaluationAccessCodeRef: UpdateCourseEvaluationAccessCodeRef;

export function updateCourseEvaluationAccessCode(vars: UpdateCourseEvaluationAccessCodeVariables): MutationPromise<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;
export function updateCourseEvaluationAccessCode(dc: DataConnect, vars: UpdateCourseEvaluationAccessCodeVariables): MutationPromise<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;

interface CreateStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudentVariables): MutationRef<CreateStudentData, CreateStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStudentVariables): MutationRef<CreateStudentData, CreateStudentVariables>;
  operationName: string;
}
export const createStudentRef: CreateStudentRef;

export function createStudent(vars: CreateStudentVariables): MutationPromise<CreateStudentData, CreateStudentVariables>;
export function createStudent(dc: DataConnect, vars: CreateStudentVariables): MutationPromise<CreateStudentData, CreateStudentVariables>;

interface UpdateStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
  operationName: string;
}
export const updateStudentRef: UpdateStudentRef;

export function updateStudent(vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;
export function updateStudent(dc: DataConnect, vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface DeactivateStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateStudentVariables): MutationRef<DeactivateStudentData, DeactivateStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateStudentVariables): MutationRef<DeactivateStudentData, DeactivateStudentVariables>;
  operationName: string;
}
export const deactivateStudentRef: DeactivateStudentRef;

export function deactivateStudent(vars: DeactivateStudentVariables): MutationPromise<DeactivateStudentData, DeactivateStudentVariables>;
export function deactivateStudent(dc: DataConnect, vars: DeactivateStudentVariables): MutationPromise<DeactivateStudentData, DeactivateStudentVariables>;

interface ReactivateStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateStudentVariables): MutationRef<ReactivateStudentData, ReactivateStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReactivateStudentVariables): MutationRef<ReactivateStudentData, ReactivateStudentVariables>;
  operationName: string;
}
export const reactivateStudentRef: ReactivateStudentRef;

export function reactivateStudent(vars: ReactivateStudentVariables): MutationPromise<ReactivateStudentData, ReactivateStudentVariables>;
export function reactivateStudent(dc: DataConnect, vars: ReactivateStudentVariables): MutationPromise<ReactivateStudentData, ReactivateStudentVariables>;

interface EnrollStudentInCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollStudentInCourseVariables): MutationRef<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EnrollStudentInCourseVariables): MutationRef<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;
  operationName: string;
}
export const enrollStudentInCourseRef: EnrollStudentInCourseRef;

export function enrollStudentInCourse(vars: EnrollStudentInCourseVariables): MutationPromise<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;
export function enrollStudentInCourse(dc: DataConnect, vars: EnrollStudentInCourseVariables): MutationPromise<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;

interface UpdateCourseStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseStudentVariables): MutationRef<UpdateCourseStudentData, UpdateCourseStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCourseStudentVariables): MutationRef<UpdateCourseStudentData, UpdateCourseStudentVariables>;
  operationName: string;
}
export const updateCourseStudentRef: UpdateCourseStudentRef;

export function updateCourseStudent(vars: UpdateCourseStudentVariables): MutationPromise<UpdateCourseStudentData, UpdateCourseStudentVariables>;
export function updateCourseStudent(dc: DataConnect, vars: UpdateCourseStudentVariables): MutationPromise<UpdateCourseStudentData, UpdateCourseStudentVariables>;

interface UnenrollStudentFromCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UnenrollStudentFromCourseVariables): MutationRef<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UnenrollStudentFromCourseVariables): MutationRef<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;
  operationName: string;
}
export const unenrollStudentFromCourseRef: UnenrollStudentFromCourseRef;

export function unenrollStudentFromCourse(vars: UnenrollStudentFromCourseVariables): MutationPromise<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;
export function unenrollStudentFromCourse(dc: DataConnect, vars: UnenrollStudentFromCourseVariables): MutationPromise<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;

interface ReenrollStudentInCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReenrollStudentInCourseVariables): MutationRef<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReenrollStudentInCourseVariables): MutationRef<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;
  operationName: string;
}
export const reenrollStudentInCourseRef: ReenrollStudentInCourseRef;

export function reenrollStudentInCourse(vars: ReenrollStudentInCourseVariables): MutationPromise<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;
export function reenrollStudentInCourse(dc: DataConnect, vars: ReenrollStudentInCourseVariables): MutationPromise<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;

interface CreateStudentEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudentEvaluationVariables): MutationRef<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStudentEvaluationVariables): MutationRef<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;
  operationName: string;
}
export const createStudentEvaluationRef: CreateStudentEvaluationRef;

export function createStudentEvaluation(vars: CreateStudentEvaluationVariables): MutationPromise<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;
export function createStudentEvaluation(dc: DataConnect, vars: CreateStudentEvaluationVariables): MutationPromise<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;

interface UpdateStudentEvaluationStateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentEvaluationStateVariables): MutationRef<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStudentEvaluationStateVariables): MutationRef<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;
  operationName: string;
}
export const updateStudentEvaluationStateRef: UpdateStudentEvaluationStateRef;

export function updateStudentEvaluationState(vars: UpdateStudentEvaluationStateVariables): MutationPromise<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;
export function updateStudentEvaluationState(dc: DataConnect, vars: UpdateStudentEvaluationStateVariables): MutationPromise<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;

interface StartStudentEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartStudentEvaluationVariables): MutationRef<StartStudentEvaluationData, StartStudentEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: StartStudentEvaluationVariables): MutationRef<StartStudentEvaluationData, StartStudentEvaluationVariables>;
  operationName: string;
}
export const startStudentEvaluationRef: StartStudentEvaluationRef;

export function startStudentEvaluation(vars: StartStudentEvaluationVariables): MutationPromise<StartStudentEvaluationData, StartStudentEvaluationVariables>;
export function startStudentEvaluation(dc: DataConnect, vars: StartStudentEvaluationVariables): MutationPromise<StartStudentEvaluationData, StartStudentEvaluationVariables>;

interface CompleteStudentEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CompleteStudentEvaluationVariables): MutationRef<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CompleteStudentEvaluationVariables): MutationRef<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;
  operationName: string;
}
export const completeStudentEvaluationRef: CompleteStudentEvaluationRef;

export function completeStudentEvaluation(vars: CompleteStudentEvaluationVariables): MutationPromise<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;
export function completeStudentEvaluation(dc: DataConnect, vars: CompleteStudentEvaluationVariables): MutationPromise<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;

interface GradeStudentEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeStudentEvaluationVariables): MutationRef<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GradeStudentEvaluationVariables): MutationRef<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;
  operationName: string;
}
export const gradeStudentEvaluationRef: GradeStudentEvaluationRef;

export function gradeStudentEvaluation(vars: GradeStudentEvaluationVariables): MutationPromise<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;
export function gradeStudentEvaluation(dc: DataConnect, vars: GradeStudentEvaluationVariables): MutationPromise<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;

interface UpdateStudentEvaluationScoreRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentEvaluationScoreVariables): MutationRef<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStudentEvaluationScoreVariables): MutationRef<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;
  operationName: string;
}
export const updateStudentEvaluationScoreRef: UpdateStudentEvaluationScoreRef;

export function updateStudentEvaluationScore(vars: UpdateStudentEvaluationScoreVariables): MutationPromise<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;
export function updateStudentEvaluationScore(dc: DataConnect, vars: UpdateStudentEvaluationScoreVariables): MutationPromise<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;

interface AddQuestionToStudentEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddQuestionToStudentEvaluationVariables): MutationRef<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddQuestionToStudentEvaluationVariables): MutationRef<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;
  operationName: string;
}
export const addQuestionToStudentEvaluationRef: AddQuestionToStudentEvaluationRef;

export function addQuestionToStudentEvaluation(vars: AddQuestionToStudentEvaluationVariables): MutationPromise<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;
export function addQuestionToStudentEvaluation(dc: DataConnect, vars: AddQuestionToStudentEvaluationVariables): MutationPromise<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;

interface GradeStudentQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeStudentQuestionVariables): MutationRef<GradeStudentQuestionData, GradeStudentQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GradeStudentQuestionVariables): MutationRef<GradeStudentQuestionData, GradeStudentQuestionVariables>;
  operationName: string;
}
export const gradeStudentQuestionRef: GradeStudentQuestionRef;

export function gradeStudentQuestion(vars: GradeStudentQuestionVariables): MutationPromise<GradeStudentQuestionData, GradeStudentQuestionVariables>;
export function gradeStudentQuestion(dc: DataConnect, vars: GradeStudentQuestionVariables): MutationPromise<GradeStudentQuestionData, GradeStudentQuestionVariables>;

interface UpdateStudentQuestionPositionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentQuestionPositionVariables): MutationRef<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStudentQuestionPositionVariables): MutationRef<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;
  operationName: string;
}
export const updateStudentQuestionPositionRef: UpdateStudentQuestionPositionRef;

export function updateStudentQuestionPosition(vars: UpdateStudentQuestionPositionVariables): MutationPromise<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;
export function updateStudentQuestionPosition(dc: DataConnect, vars: UpdateStudentQuestionPositionVariables): MutationPromise<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;

interface RemoveQuestionFromStudentEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveQuestionFromStudentEvaluationVariables): MutationRef<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveQuestionFromStudentEvaluationVariables): MutationRef<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;
  operationName: string;
}
export const removeQuestionFromStudentEvaluationRef: RemoveQuestionFromStudentEvaluationRef;

export function removeQuestionFromStudentEvaluation(vars: RemoveQuestionFromStudentEvaluationVariables): MutationPromise<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;
export function removeQuestionFromStudentEvaluation(dc: DataConnect, vars: RemoveQuestionFromStudentEvaluationVariables): MutationPromise<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;

interface RegisterStudentAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegisterStudentAnswerVariables): MutationRef<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegisterStudentAnswerVariables): MutationRef<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;
  operationName: string;
}
export const registerStudentAnswerRef: RegisterStudentAnswerRef;

export function registerStudentAnswer(vars: RegisterStudentAnswerVariables): MutationPromise<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;
export function registerStudentAnswer(dc: DataConnect, vars: RegisterStudentAnswerVariables): MutationPromise<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;

interface RemoveStudentAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveStudentAnswerVariables): MutationRef<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveStudentAnswerVariables): MutationRef<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;
  operationName: string;
}
export const removeStudentAnswerRef: RemoveStudentAnswerRef;

export function removeStudentAnswer(vars: RemoveStudentAnswerVariables): MutationPromise<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;
export function removeStudentAnswer(dc: DataConnect, vars: RemoveStudentAnswerVariables): MutationPromise<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;

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

interface GetUserByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  operationName: string;
}
export const getUserByIdRef: GetUserByIdRef;

export function getUserById(vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;
export function getUserById(dc: DataConnect, vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

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

interface GetDashboardQuestionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDashboardQuestionsVariables): QueryRef<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDashboardQuestionsVariables): QueryRef<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;
  operationName: string;
}
export const getDashboardQuestionsRef: GetDashboardQuestionsRef;

export function getDashboardQuestions(vars: GetDashboardQuestionsVariables): QueryPromise<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;
export function getDashboardQuestions(dc: DataConnect, vars: GetDashboardQuestionsVariables): QueryPromise<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;

interface GetDashboardSystemDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDashboardSystemDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetDashboardSystemDataData, undefined>;
  operationName: string;
}
export const getDashboardSystemDataRef: GetDashboardSystemDataRef;

export function getDashboardSystemData(): QueryPromise<GetDashboardSystemDataData, undefined>;
export function getDashboardSystemData(dc: DataConnect): QueryPromise<GetDashboardSystemDataData, undefined>;

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

interface GetAllCoursesByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllCoursesByUserVariables): QueryRef<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAllCoursesByUserVariables): QueryRef<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;
  operationName: string;
}
export const getAllCoursesByUserRef: GetAllCoursesByUserRef;

export function getAllCoursesByUser(vars: GetAllCoursesByUserVariables): QueryPromise<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;
export function getAllCoursesByUser(dc: DataConnect, vars: GetAllCoursesByUserVariables): QueryPromise<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;

interface GetCourseByCodeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseByCodeVariables): QueryRef<GetCourseByCodeData, GetCourseByCodeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseByCodeVariables): QueryRef<GetCourseByCodeData, GetCourseByCodeVariables>;
  operationName: string;
}
export const getCourseByCodeRef: GetCourseByCodeRef;

export function getCourseByCode(vars: GetCourseByCodeVariables): QueryPromise<GetCourseByCodeData, GetCourseByCodeVariables>;
export function getCourseByCode(dc: DataConnect, vars: GetCourseByCodeVariables): QueryPromise<GetCourseByCodeData, GetCourseByCodeVariables>;

interface GetCoursesByInstitutionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesByInstitutionVariables): QueryRef<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCoursesByInstitutionVariables): QueryRef<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;
  operationName: string;
}
export const getCoursesByInstitutionRef: GetCoursesByInstitutionRef;

export function getCoursesByInstitution(vars: GetCoursesByInstitutionVariables): QueryPromise<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;
export function getCoursesByInstitution(dc: DataConnect, vars: GetCoursesByInstitutionVariables): QueryPromise<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;

interface GetCoursesByEducationalLevelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesByEducationalLevelVariables): QueryRef<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCoursesByEducationalLevelVariables): QueryRef<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;
  operationName: string;
}
export const getCoursesByEducationalLevelRef: GetCoursesByEducationalLevelRef;

export function getCoursesByEducationalLevel(vars: GetCoursesByEducationalLevelVariables): QueryPromise<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;
export function getCoursesByEducationalLevel(dc: DataConnect, vars: GetCoursesByEducationalLevelVariables): QueryPromise<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;

interface GetEvaluationByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationByIdVariables): QueryRef<GetEvaluationByIdData, GetEvaluationByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEvaluationByIdVariables): QueryRef<GetEvaluationByIdData, GetEvaluationByIdVariables>;
  operationName: string;
}
export const getEvaluationByIdRef: GetEvaluationByIdRef;

export function getEvaluationById(vars: GetEvaluationByIdVariables): QueryPromise<GetEvaluationByIdData, GetEvaluationByIdVariables>;
export function getEvaluationById(dc: DataConnect, vars: GetEvaluationByIdVariables): QueryPromise<GetEvaluationByIdData, GetEvaluationByIdVariables>;

interface GetAllEvaluationsByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllEvaluationsByUserVariables): QueryRef<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAllEvaluationsByUserVariables): QueryRef<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;
  operationName: string;
}
export const getAllEvaluationsByUserRef: GetAllEvaluationsByUserRef;

export function getAllEvaluationsByUser(vars: GetAllEvaluationsByUserVariables): QueryPromise<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;
export function getAllEvaluationsByUser(dc: DataConnect, vars: GetAllEvaluationsByUserVariables): QueryPromise<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;

interface GetEvaluationsByStateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationsByStateVariables): QueryRef<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEvaluationsByStateVariables): QueryRef<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;
  operationName: string;
}
export const getEvaluationsByStateRef: GetEvaluationsByStateRef;

export function getEvaluationsByState(vars: GetEvaluationsByStateVariables): QueryPromise<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;
export function getEvaluationsByState(dc: DataConnect, vars: GetEvaluationsByStateVariables): QueryPromise<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;

interface GetEvaluationsBySubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationsBySubjectVariables): QueryRef<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEvaluationsBySubjectVariables): QueryRef<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;
  operationName: string;
}
export const getEvaluationsBySubjectRef: GetEvaluationsBySubjectRef;

export function getEvaluationsBySubject(vars: GetEvaluationsBySubjectVariables): QueryPromise<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;
export function getEvaluationsBySubject(dc: DataConnect, vars: GetEvaluationsBySubjectVariables): QueryPromise<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;

interface GetEvaluationsByCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationsByCourseVariables): QueryRef<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEvaluationsByCourseVariables): QueryRef<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;
  operationName: string;
}
export const getEvaluationsByCourseRef: GetEvaluationsByCourseRef;

export function getEvaluationsByCourse(vars: GetEvaluationsByCourseVariables): QueryPromise<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;
export function getEvaluationsByCourse(dc: DataConnect, vars: GetEvaluationsByCourseVariables): QueryPromise<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;

interface GetEvaluationFullDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationFullDetailVariables): QueryRef<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEvaluationFullDetailVariables): QueryRef<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;
  operationName: string;
}
export const getEvaluationFullDetailRef: GetEvaluationFullDetailRef;

export function getEvaluationFullDetail(vars: GetEvaluationFullDetailVariables): QueryPromise<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;
export function getEvaluationFullDetail(dc: DataConnect, vars: GetEvaluationFullDetailVariables): QueryPromise<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;

interface GetEvaluationQuestionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationQuestionsVariables): QueryRef<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEvaluationQuestionsVariables): QueryRef<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;
  operationName: string;
}
export const getEvaluationQuestionsRef: GetEvaluationQuestionsRef;

export function getEvaluationQuestions(vars: GetEvaluationQuestionsVariables): QueryPromise<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;
export function getEvaluationQuestions(dc: DataConnect, vars: GetEvaluationQuestionsVariables): QueryPromise<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;

interface GetAllStudentsByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllStudentsByUserVariables): QueryRef<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAllStudentsByUserVariables): QueryRef<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;
  operationName: string;
}
export const getAllStudentsByUserRef: GetAllStudentsByUserRef;

export function getAllStudentsByUser(vars: GetAllStudentsByUserVariables): QueryPromise<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;
export function getAllStudentsByUser(dc: DataConnect, vars: GetAllStudentsByUserVariables): QueryPromise<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;

interface GetStudentByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentByIdVariables): QueryRef<GetStudentByIdData, GetStudentByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentByIdVariables): QueryRef<GetStudentByIdData, GetStudentByIdVariables>;
  operationName: string;
}
export const getStudentByIdRef: GetStudentByIdRef;

export function getStudentById(vars: GetStudentByIdVariables): QueryPromise<GetStudentByIdData, GetStudentByIdVariables>;
export function getStudentById(dc: DataConnect, vars: GetStudentByIdVariables): QueryPromise<GetStudentByIdData, GetStudentByIdVariables>;

interface GetStudentByIdentifierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentByIdentifierVariables): QueryRef<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentByIdentifierVariables): QueryRef<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;
  operationName: string;
}
export const getStudentByIdentifierRef: GetStudentByIdentifierRef;

export function getStudentByIdentifier(vars: GetStudentByIdentifierVariables): QueryPromise<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;
export function getStudentByIdentifier(dc: DataConnect, vars: GetStudentByIdentifierVariables): QueryPromise<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;

interface GetStudentsByFirstNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentsByFirstNameVariables): QueryRef<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentsByFirstNameVariables): QueryRef<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;
  operationName: string;
}
export const getStudentsByFirstNameRef: GetStudentsByFirstNameRef;

export function getStudentsByFirstName(vars: GetStudentsByFirstNameVariables): QueryPromise<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;
export function getStudentsByFirstName(dc: DataConnect, vars: GetStudentsByFirstNameVariables): QueryPromise<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;

interface GetStudentsByLastNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentsByLastNameVariables): QueryRef<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentsByLastNameVariables): QueryRef<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;
  operationName: string;
}
export const getStudentsByLastNameRef: GetStudentsByLastNameRef;

export function getStudentsByLastName(vars: GetStudentsByLastNameVariables): QueryPromise<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;
export function getStudentsByLastName(dc: DataConnect, vars: GetStudentsByLastNameVariables): QueryPromise<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;

interface GetStudentsByCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentsByCourseVariables): QueryRef<GetStudentsByCourseData, GetStudentsByCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentsByCourseVariables): QueryRef<GetStudentsByCourseData, GetStudentsByCourseVariables>;
  operationName: string;
}
export const getStudentsByCourseRef: GetStudentsByCourseRef;

export function getStudentsByCourse(vars: GetStudentsByCourseVariables): QueryPromise<GetStudentsByCourseData, GetStudentsByCourseVariables>;
export function getStudentsByCourse(dc: DataConnect, vars: GetStudentsByCourseVariables): QueryPromise<GetStudentsByCourseData, GetStudentsByCourseVariables>;

interface GetCourseStudentsDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseStudentsDetailVariables): QueryRef<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseStudentsDetailVariables): QueryRef<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;
  operationName: string;
}
export const getCourseStudentsDetailRef: GetCourseStudentsDetailRef;

export function getCourseStudentsDetail(vars: GetCourseStudentsDetailVariables): QueryPromise<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;
export function getCourseStudentsDetail(dc: DataConnect, vars: GetCourseStudentsDetailVariables): QueryPromise<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;

interface GetCourseStudentsWithDetailsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseStudentsWithDetailsVariables): QueryRef<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseStudentsWithDetailsVariables): QueryRef<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;
  operationName: string;
}
export const getCourseStudentsWithDetailsRef: GetCourseStudentsWithDetailsRef;

export function getCourseStudentsWithDetails(vars: GetCourseStudentsWithDetailsVariables): QueryPromise<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;
export function getCourseStudentsWithDetails(dc: DataConnect, vars: GetCourseStudentsWithDetailsVariables): QueryPromise<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;

interface GetStudentEvaluationByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationByIdVariables): QueryRef<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentEvaluationByIdVariables): QueryRef<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;
  operationName: string;
}
export const getStudentEvaluationByIdRef: GetStudentEvaluationByIdRef;

export function getStudentEvaluationById(vars: GetStudentEvaluationByIdVariables): QueryPromise<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;
export function getStudentEvaluationById(dc: DataConnect, vars: GetStudentEvaluationByIdVariables): QueryPromise<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;

interface GetStudentEvaluationsByStudentIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByStudentIdVariables): QueryRef<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentEvaluationsByStudentIdVariables): QueryRef<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;
  operationName: string;
}
export const getStudentEvaluationsByStudentIdRef: GetStudentEvaluationsByStudentIdRef;

export function getStudentEvaluationsByStudentId(vars: GetStudentEvaluationsByStudentIdVariables): QueryPromise<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;
export function getStudentEvaluationsByStudentId(dc: DataConnect, vars: GetStudentEvaluationsByStudentIdVariables): QueryPromise<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;

interface GetStudentEvaluationsByIdentifierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByIdentifierVariables): QueryRef<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentEvaluationsByIdentifierVariables): QueryRef<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;
  operationName: string;
}
export const getStudentEvaluationsByIdentifierRef: GetStudentEvaluationsByIdentifierRef;

export function getStudentEvaluationsByIdentifier(vars: GetStudentEvaluationsByIdentifierVariables): QueryPromise<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;
export function getStudentEvaluationsByIdentifier(dc: DataConnect, vars: GetStudentEvaluationsByIdentifierVariables): QueryPromise<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;

interface GetStudentEvaluationsByFirstNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByFirstNameVariables): QueryRef<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentEvaluationsByFirstNameVariables): QueryRef<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;
  operationName: string;
}
export const getStudentEvaluationsByFirstNameRef: GetStudentEvaluationsByFirstNameRef;

export function getStudentEvaluationsByFirstName(vars: GetStudentEvaluationsByFirstNameVariables): QueryPromise<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;
export function getStudentEvaluationsByFirstName(dc: DataConnect, vars: GetStudentEvaluationsByFirstNameVariables): QueryPromise<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;

interface GetStudentEvaluationsByLastNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByLastNameVariables): QueryRef<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentEvaluationsByLastNameVariables): QueryRef<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;
  operationName: string;
}
export const getStudentEvaluationsByLastNameRef: GetStudentEvaluationsByLastNameRef;

export function getStudentEvaluationsByLastName(vars: GetStudentEvaluationsByLastNameVariables): QueryPromise<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;
export function getStudentEvaluationsByLastName(dc: DataConnect, vars: GetStudentEvaluationsByLastNameVariables): QueryPromise<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;

interface GetStudentEvaluationQuestionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationQuestionsVariables): QueryRef<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentEvaluationQuestionsVariables): QueryRef<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;
  operationName: string;
}
export const getStudentEvaluationQuestionsRef: GetStudentEvaluationQuestionsRef;

export function getStudentEvaluationQuestions(vars: GetStudentEvaluationQuestionsVariables): QueryPromise<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;
export function getStudentEvaluationQuestions(dc: DataConnect, vars: GetStudentEvaluationQuestionsVariables): QueryPromise<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;

interface GetStudentAnswerOptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentAnswerOptionsVariables): QueryRef<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentAnswerOptionsVariables): QueryRef<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;
  operationName: string;
}
export const getStudentAnswerOptionsRef: GetStudentAnswerOptionsRef;

export function getStudentAnswerOptions(vars: GetStudentAnswerOptionsVariables): QueryPromise<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;
export function getStudentAnswerOptions(dc: DataConnect, vars: GetStudentAnswerOptionsVariables): QueryPromise<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;

interface GetStudentEvaluationsByCourseEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByCourseEvaluationVariables): QueryRef<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentEvaluationsByCourseEvaluationVariables): QueryRef<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;
  operationName: string;
}
export const getStudentEvaluationsByCourseEvaluationRef: GetStudentEvaluationsByCourseEvaluationRef;

export function getStudentEvaluationsByCourseEvaluation(vars: GetStudentEvaluationsByCourseEvaluationVariables): QueryPromise<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;
export function getStudentEvaluationsByCourseEvaluation(dc: DataConnect, vars: GetStudentEvaluationsByCourseEvaluationVariables): QueryPromise<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;

interface GetStudentEvaluationsByCourseStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByCourseStudentVariables): QueryRef<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentEvaluationsByCourseStudentVariables): QueryRef<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;
  operationName: string;
}
export const getStudentEvaluationsByCourseStudentRef: GetStudentEvaluationsByCourseStudentRef;

export function getStudentEvaluationsByCourseStudent(vars: GetStudentEvaluationsByCourseStudentVariables): QueryPromise<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;
export function getStudentEvaluationsByCourseStudent(dc: DataConnect, vars: GetStudentEvaluationsByCourseStudentVariables): QueryPromise<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;

interface GetStudentEvaluationFullDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationFullDetailVariables): QueryRef<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentEvaluationFullDetailVariables): QueryRef<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;
  operationName: string;
}
export const getStudentEvaluationFullDetailRef: GetStudentEvaluationFullDetailRef;

export function getStudentEvaluationFullDetail(vars: GetStudentEvaluationFullDetailVariables): QueryPromise<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;
export function getStudentEvaluationFullDetail(dc: DataConnect, vars: GetStudentEvaluationFullDetailVariables): QueryPromise<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;

interface GetCourseEvaluationsByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseEvaluationsByUserVariables): QueryRef<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseEvaluationsByUserVariables): QueryRef<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;
  operationName: string;
}
export const getCourseEvaluationsByUserRef: GetCourseEvaluationsByUserRef;

export function getCourseEvaluationsByUser(vars: GetCourseEvaluationsByUserVariables): QueryPromise<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;
export function getCourseEvaluationsByUser(dc: DataConnect, vars: GetCourseEvaluationsByUserVariables): QueryPromise<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;

interface GetCourseEvaluationByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseEvaluationByIdVariables): QueryRef<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseEvaluationByIdVariables): QueryRef<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;
  operationName: string;
}
export const getCourseEvaluationByIdRef: GetCourseEvaluationByIdRef;

export function getCourseEvaluationById(vars: GetCourseEvaluationByIdVariables): QueryPromise<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;
export function getCourseEvaluationById(dc: DataConnect, vars: GetCourseEvaluationByIdVariables): QueryPromise<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;

interface GetEvaluationsForCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationsForCourseVariables): QueryRef<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEvaluationsForCourseVariables): QueryRef<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;
  operationName: string;
}
export const getEvaluationsForCourseRef: GetEvaluationsForCourseRef;

export function getEvaluationsForCourse(vars: GetEvaluationsForCourseVariables): QueryPromise<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;
export function getEvaluationsForCourse(dc: DataConnect, vars: GetEvaluationsForCourseVariables): QueryPromise<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;

interface GetCoursesForEvaluationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesForEvaluationVariables): QueryRef<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCoursesForEvaluationVariables): QueryRef<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;
  operationName: string;
}
export const getCoursesForEvaluationRef: GetCoursesForEvaluationRef;

export function getCoursesForEvaluation(vars: GetCoursesForEvaluationVariables): QueryPromise<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;
export function getCoursesForEvaluation(dc: DataConnect, vars: GetCoursesForEvaluationVariables): QueryPromise<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;

interface GetCourseEvaluationByAccessCodeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseEvaluationByAccessCodeVariables): QueryRef<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseEvaluationByAccessCodeVariables): QueryRef<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;
  operationName: string;
}
export const getCourseEvaluationByAccessCodeRef: GetCourseEvaluationByAccessCodeRef;

export function getCourseEvaluationByAccessCode(vars: GetCourseEvaluationByAccessCodeVariables): QueryPromise<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;
export function getCourseEvaluationByAccessCode(dc: DataConnect, vars: GetCourseEvaluationByAccessCodeVariables): QueryPromise<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;

