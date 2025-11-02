import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateSubjectData {
  subject_insert: Subject_Key;
}

export interface CreateSubjectVariables {
  name: string;
  code: string;
}

export interface CreateTopicData {
  topic_insert: Topic_Key;
}

export interface CreateTopicVariables {
  name: string;
  unitId: UUIDString;
}

export interface CreateUnitData {
  unit_insert: Unit_Key;
}

export interface CreateUnitVariables {
  name: string;
  subjectId: UUIDString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  authId: string;
  name: string;
  email: string;
  role: string;
}

export interface DeactivateSubjectData {
  subject_update?: Subject_Key | null;
}

export interface DeactivateSubjectVariables {
  subjectId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
}

export interface DeactivateTopicData {
  topic_update?: Topic_Key | null;
}

export interface DeactivateTopicVariables {
  topicId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
}

export interface DeactivateUnitData {
  unit_update?: Unit_Key | null;
}

export interface DeactivateUnitVariables {
  unitId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
}

export interface Difficulty_Key {
  difficultyId: UUIDString;
  __typename?: 'Difficulty_Key';
}

export interface GetSubjectData {
  subject?: {
    subjectId: UUIDString;
    name: string;
    code: string;
    active: boolean;
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

export interface ListSubjectsData {
  subjects: ({
    subjectId: UUIDString;
    name: string;
    code: string;
    active: boolean;
    createdAt: TimestampString;
  } & Subject_Key)[];
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

export interface Outcome_Key {
  outcomeId: UUIDString;
  __typename?: 'Outcome_Key';
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

export interface ReactivateSubjectData {
  subject_update?: Subject_Key | null;
}

export interface ReactivateSubjectVariables {
  subjectId: UUIDString;
  deletedBy: UUIDString;
}

export interface ReactivateTopicData {
  topic_update?: Topic_Key | null;
}

export interface ReactivateTopicVariables {
  topicId: UUIDString;
  deletedBy: UUIDString;
}

export interface ReactivateUnitData {
  unit_update?: Unit_Key | null;
}

export interface ReactivateUnitVariables {
  unitId: UUIDString;
  deletedBy: UUIDString;
}

export interface Subject_Key {
  subjectId: UUIDString;
  __typename?: 'Subject_Key';
}

export interface Topic_Key {
  topicId: UUIDString;
  __typename?: 'Topic_Key';
}

export interface Unit_Key {
  unitId: UUIDString;
  __typename?: 'Unit_Key';
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
}

export interface UpdateTopicData {
  topic_update?: Topic_Key | null;
}

export interface UpdateTopicVariables {
  topicId: UUIDString;
  name?: string | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
}

export interface UpdateUnitData {
  unit_update?: Unit_Key | null;
}

export interface UpdateUnitVariables {
  unitId: UUIDString;
  name?: string | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
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

