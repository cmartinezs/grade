import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, CreateSubjectData, CreateSubjectVariables, UpdateSubjectData, UpdateSubjectVariables, DeactivateSubjectData, DeactivateSubjectVariables, ReactivateSubjectData, ReactivateSubjectVariables, CreateUnitData, CreateUnitVariables, UpdateUnitData, UpdateUnitVariables, DeactivateUnitData, DeactivateUnitVariables, ReactivateUnitData, ReactivateUnitVariables, CreateTopicData, CreateTopicVariables, UpdateTopicData, UpdateTopicVariables, DeactivateTopicData, DeactivateTopicVariables, ReactivateTopicData, ReactivateTopicVariables, CreateLevelCategoryData, CreateLevelCategoryVariables, UpdateLevelCategoryData, UpdateLevelCategoryVariables, DeactivateLevelCategoryData, DeactivateLevelCategoryVariables, ReactivateLevelCategoryData, ReactivateLevelCategoryVariables, CreateEducationalLevelData, CreateEducationalLevelVariables, UpdateEducationalLevelData, UpdateEducationalLevelVariables, DeactivateEducationalLevelData, DeactivateEducationalLevelVariables, ReactivateEducationalLevelData, ReactivateEducationalLevelVariables, GetUserByEmailData, GetUserByEmailVariables, ListSubjectsData, GetSubjectData, GetSubjectVariables, ListUnitsData, GetUnitData, GetUnitVariables, ListTopicsData, GetTopicData, GetTopicVariables, ListLevelCategoriesData, GetLevelCategoryData, GetLevelCategoryVariables, ListEducationalLevelsData, GetEducationalLevelData, GetEducationalLevelVariables, GetLevelsByCategoryData, GetLevelsByCategoryVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useCreateSubject(options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;
export function useCreateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;

export function useUpdateSubject(options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;
export function useUpdateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;

export function useDeactivateSubject(options?: useDataConnectMutationOptions<DeactivateSubjectData, FirebaseError, DeactivateSubjectVariables>): UseDataConnectMutationResult<DeactivateSubjectData, DeactivateSubjectVariables>;
export function useDeactivateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateSubjectData, FirebaseError, DeactivateSubjectVariables>): UseDataConnectMutationResult<DeactivateSubjectData, DeactivateSubjectVariables>;

export function useReactivateSubject(options?: useDataConnectMutationOptions<ReactivateSubjectData, FirebaseError, ReactivateSubjectVariables>): UseDataConnectMutationResult<ReactivateSubjectData, ReactivateSubjectVariables>;
export function useReactivateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateSubjectData, FirebaseError, ReactivateSubjectVariables>): UseDataConnectMutationResult<ReactivateSubjectData, ReactivateSubjectVariables>;

export function useCreateUnit(options?: useDataConnectMutationOptions<CreateUnitData, FirebaseError, CreateUnitVariables>): UseDataConnectMutationResult<CreateUnitData, CreateUnitVariables>;
export function useCreateUnit(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUnitData, FirebaseError, CreateUnitVariables>): UseDataConnectMutationResult<CreateUnitData, CreateUnitVariables>;

export function useUpdateUnit(options?: useDataConnectMutationOptions<UpdateUnitData, FirebaseError, UpdateUnitVariables>): UseDataConnectMutationResult<UpdateUnitData, UpdateUnitVariables>;
export function useUpdateUnit(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUnitData, FirebaseError, UpdateUnitVariables>): UseDataConnectMutationResult<UpdateUnitData, UpdateUnitVariables>;

export function useDeactivateUnit(options?: useDataConnectMutationOptions<DeactivateUnitData, FirebaseError, DeactivateUnitVariables>): UseDataConnectMutationResult<DeactivateUnitData, DeactivateUnitVariables>;
export function useDeactivateUnit(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateUnitData, FirebaseError, DeactivateUnitVariables>): UseDataConnectMutationResult<DeactivateUnitData, DeactivateUnitVariables>;

export function useReactivateUnit(options?: useDataConnectMutationOptions<ReactivateUnitData, FirebaseError, ReactivateUnitVariables>): UseDataConnectMutationResult<ReactivateUnitData, ReactivateUnitVariables>;
export function useReactivateUnit(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateUnitData, FirebaseError, ReactivateUnitVariables>): UseDataConnectMutationResult<ReactivateUnitData, ReactivateUnitVariables>;

export function useCreateTopic(options?: useDataConnectMutationOptions<CreateTopicData, FirebaseError, CreateTopicVariables>): UseDataConnectMutationResult<CreateTopicData, CreateTopicVariables>;
export function useCreateTopic(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTopicData, FirebaseError, CreateTopicVariables>): UseDataConnectMutationResult<CreateTopicData, CreateTopicVariables>;

export function useUpdateTopic(options?: useDataConnectMutationOptions<UpdateTopicData, FirebaseError, UpdateTopicVariables>): UseDataConnectMutationResult<UpdateTopicData, UpdateTopicVariables>;
export function useUpdateTopic(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTopicData, FirebaseError, UpdateTopicVariables>): UseDataConnectMutationResult<UpdateTopicData, UpdateTopicVariables>;

export function useDeactivateTopic(options?: useDataConnectMutationOptions<DeactivateTopicData, FirebaseError, DeactivateTopicVariables>): UseDataConnectMutationResult<DeactivateTopicData, DeactivateTopicVariables>;
export function useDeactivateTopic(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateTopicData, FirebaseError, DeactivateTopicVariables>): UseDataConnectMutationResult<DeactivateTopicData, DeactivateTopicVariables>;

export function useReactivateTopic(options?: useDataConnectMutationOptions<ReactivateTopicData, FirebaseError, ReactivateTopicVariables>): UseDataConnectMutationResult<ReactivateTopicData, ReactivateTopicVariables>;
export function useReactivateTopic(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateTopicData, FirebaseError, ReactivateTopicVariables>): UseDataConnectMutationResult<ReactivateTopicData, ReactivateTopicVariables>;

export function useCreateLevelCategory(options?: useDataConnectMutationOptions<CreateLevelCategoryData, FirebaseError, CreateLevelCategoryVariables>): UseDataConnectMutationResult<CreateLevelCategoryData, CreateLevelCategoryVariables>;
export function useCreateLevelCategory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLevelCategoryData, FirebaseError, CreateLevelCategoryVariables>): UseDataConnectMutationResult<CreateLevelCategoryData, CreateLevelCategoryVariables>;

export function useUpdateLevelCategory(options?: useDataConnectMutationOptions<UpdateLevelCategoryData, FirebaseError, UpdateLevelCategoryVariables>): UseDataConnectMutationResult<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;
export function useUpdateLevelCategory(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLevelCategoryData, FirebaseError, UpdateLevelCategoryVariables>): UseDataConnectMutationResult<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;

export function useDeactivateLevelCategory(options?: useDataConnectMutationOptions<DeactivateLevelCategoryData, FirebaseError, DeactivateLevelCategoryVariables>): UseDataConnectMutationResult<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;
export function useDeactivateLevelCategory(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateLevelCategoryData, FirebaseError, DeactivateLevelCategoryVariables>): UseDataConnectMutationResult<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;

export function useReactivateLevelCategory(options?: useDataConnectMutationOptions<ReactivateLevelCategoryData, FirebaseError, ReactivateLevelCategoryVariables>): UseDataConnectMutationResult<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;
export function useReactivateLevelCategory(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateLevelCategoryData, FirebaseError, ReactivateLevelCategoryVariables>): UseDataConnectMutationResult<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;

export function useCreateEducationalLevel(options?: useDataConnectMutationOptions<CreateEducationalLevelData, FirebaseError, CreateEducationalLevelVariables>): UseDataConnectMutationResult<CreateEducationalLevelData, CreateEducationalLevelVariables>;
export function useCreateEducationalLevel(dc: DataConnect, options?: useDataConnectMutationOptions<CreateEducationalLevelData, FirebaseError, CreateEducationalLevelVariables>): UseDataConnectMutationResult<CreateEducationalLevelData, CreateEducationalLevelVariables>;

export function useUpdateEducationalLevel(options?: useDataConnectMutationOptions<UpdateEducationalLevelData, FirebaseError, UpdateEducationalLevelVariables>): UseDataConnectMutationResult<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;
export function useUpdateEducationalLevel(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEducationalLevelData, FirebaseError, UpdateEducationalLevelVariables>): UseDataConnectMutationResult<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;

export function useDeactivateEducationalLevel(options?: useDataConnectMutationOptions<DeactivateEducationalLevelData, FirebaseError, DeactivateEducationalLevelVariables>): UseDataConnectMutationResult<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;
export function useDeactivateEducationalLevel(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateEducationalLevelData, FirebaseError, DeactivateEducationalLevelVariables>): UseDataConnectMutationResult<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;

export function useReactivateEducationalLevel(options?: useDataConnectMutationOptions<ReactivateEducationalLevelData, FirebaseError, ReactivateEducationalLevelVariables>): UseDataConnectMutationResult<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;
export function useReactivateEducationalLevel(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateEducationalLevelData, FirebaseError, ReactivateEducationalLevelVariables>): UseDataConnectMutationResult<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;

export function useGetUserByEmail(vars: GetUserByEmailVariables, options?: useDataConnectQueryOptions<GetUserByEmailData>): UseDataConnectQueryResult<GetUserByEmailData, GetUserByEmailVariables>;
export function useGetUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables, options?: useDataConnectQueryOptions<GetUserByEmailData>): UseDataConnectQueryResult<GetUserByEmailData, GetUserByEmailVariables>;

export function useListSubjects(options?: useDataConnectQueryOptions<ListSubjectsData>): UseDataConnectQueryResult<ListSubjectsData, undefined>;
export function useListSubjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListSubjectsData>): UseDataConnectQueryResult<ListSubjectsData, undefined>;

export function useGetSubject(vars: GetSubjectVariables, options?: useDataConnectQueryOptions<GetSubjectData>): UseDataConnectQueryResult<GetSubjectData, GetSubjectVariables>;
export function useGetSubject(dc: DataConnect, vars: GetSubjectVariables, options?: useDataConnectQueryOptions<GetSubjectData>): UseDataConnectQueryResult<GetSubjectData, GetSubjectVariables>;

export function useListUnits(options?: useDataConnectQueryOptions<ListUnitsData>): UseDataConnectQueryResult<ListUnitsData, undefined>;
export function useListUnits(dc: DataConnect, options?: useDataConnectQueryOptions<ListUnitsData>): UseDataConnectQueryResult<ListUnitsData, undefined>;

export function useGetUnit(vars: GetUnitVariables, options?: useDataConnectQueryOptions<GetUnitData>): UseDataConnectQueryResult<GetUnitData, GetUnitVariables>;
export function useGetUnit(dc: DataConnect, vars: GetUnitVariables, options?: useDataConnectQueryOptions<GetUnitData>): UseDataConnectQueryResult<GetUnitData, GetUnitVariables>;

export function useListTopics(options?: useDataConnectQueryOptions<ListTopicsData>): UseDataConnectQueryResult<ListTopicsData, undefined>;
export function useListTopics(dc: DataConnect, options?: useDataConnectQueryOptions<ListTopicsData>): UseDataConnectQueryResult<ListTopicsData, undefined>;

export function useGetTopic(vars: GetTopicVariables, options?: useDataConnectQueryOptions<GetTopicData>): UseDataConnectQueryResult<GetTopicData, GetTopicVariables>;
export function useGetTopic(dc: DataConnect, vars: GetTopicVariables, options?: useDataConnectQueryOptions<GetTopicData>): UseDataConnectQueryResult<GetTopicData, GetTopicVariables>;

export function useListLevelCategories(options?: useDataConnectQueryOptions<ListLevelCategoriesData>): UseDataConnectQueryResult<ListLevelCategoriesData, undefined>;
export function useListLevelCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListLevelCategoriesData>): UseDataConnectQueryResult<ListLevelCategoriesData, undefined>;

export function useGetLevelCategory(vars: GetLevelCategoryVariables, options?: useDataConnectQueryOptions<GetLevelCategoryData>): UseDataConnectQueryResult<GetLevelCategoryData, GetLevelCategoryVariables>;
export function useGetLevelCategory(dc: DataConnect, vars: GetLevelCategoryVariables, options?: useDataConnectQueryOptions<GetLevelCategoryData>): UseDataConnectQueryResult<GetLevelCategoryData, GetLevelCategoryVariables>;

export function useListEducationalLevels(options?: useDataConnectQueryOptions<ListEducationalLevelsData>): UseDataConnectQueryResult<ListEducationalLevelsData, undefined>;
export function useListEducationalLevels(dc: DataConnect, options?: useDataConnectQueryOptions<ListEducationalLevelsData>): UseDataConnectQueryResult<ListEducationalLevelsData, undefined>;

export function useGetEducationalLevel(vars: GetEducationalLevelVariables, options?: useDataConnectQueryOptions<GetEducationalLevelData>): UseDataConnectQueryResult<GetEducationalLevelData, GetEducationalLevelVariables>;
export function useGetEducationalLevel(dc: DataConnect, vars: GetEducationalLevelVariables, options?: useDataConnectQueryOptions<GetEducationalLevelData>): UseDataConnectQueryResult<GetEducationalLevelData, GetEducationalLevelVariables>;

export function useGetLevelsByCategory(vars: GetLevelsByCategoryVariables, options?: useDataConnectQueryOptions<GetLevelsByCategoryData>): UseDataConnectQueryResult<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;
export function useGetLevelsByCategory(dc: DataConnect, vars: GetLevelsByCategoryVariables, options?: useDataConnectQueryOptions<GetLevelsByCategoryData>): UseDataConnectQueryResult<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;
