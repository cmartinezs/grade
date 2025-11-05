import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'grade-2c5d1-2-service',
  location: 'southamerica-west1'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const updateUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}
updateUserRef.operationName = 'UpdateUser';

export function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
}

export const createSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSubject', inputVars);
}
createSubjectRef.operationName = 'CreateSubject';

export function createSubject(dcOrVars, vars) {
  return executeMutation(createSubjectRef(dcOrVars, vars));
}

export const updateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSubject', inputVars);
}
updateSubjectRef.operationName = 'UpdateSubject';

export function updateSubject(dcOrVars, vars) {
  return executeMutation(updateSubjectRef(dcOrVars, vars));
}

export const deactivateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateSubject', inputVars);
}
deactivateSubjectRef.operationName = 'DeactivateSubject';

export function deactivateSubject(dcOrVars, vars) {
  return executeMutation(deactivateSubjectRef(dcOrVars, vars));
}

export const reactivateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateSubject', inputVars);
}
reactivateSubjectRef.operationName = 'ReactivateSubject';

export function reactivateSubject(dcOrVars, vars) {
  return executeMutation(reactivateSubjectRef(dcOrVars, vars));
}

export const createUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUnit', inputVars);
}
createUnitRef.operationName = 'CreateUnit';

export function createUnit(dcOrVars, vars) {
  return executeMutation(createUnitRef(dcOrVars, vars));
}

export const updateUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUnit', inputVars);
}
updateUnitRef.operationName = 'UpdateUnit';

export function updateUnit(dcOrVars, vars) {
  return executeMutation(updateUnitRef(dcOrVars, vars));
}

export const deactivateUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateUnit', inputVars);
}
deactivateUnitRef.operationName = 'DeactivateUnit';

export function deactivateUnit(dcOrVars, vars) {
  return executeMutation(deactivateUnitRef(dcOrVars, vars));
}

export const reactivateUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateUnit', inputVars);
}
reactivateUnitRef.operationName = 'ReactivateUnit';

export function reactivateUnit(dcOrVars, vars) {
  return executeMutation(reactivateUnitRef(dcOrVars, vars));
}

export const createTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTopic', inputVars);
}
createTopicRef.operationName = 'CreateTopic';

export function createTopic(dcOrVars, vars) {
  return executeMutation(createTopicRef(dcOrVars, vars));
}

export const updateTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTopic', inputVars);
}
updateTopicRef.operationName = 'UpdateTopic';

export function updateTopic(dcOrVars, vars) {
  return executeMutation(updateTopicRef(dcOrVars, vars));
}

export const deactivateTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateTopic', inputVars);
}
deactivateTopicRef.operationName = 'DeactivateTopic';

export function deactivateTopic(dcOrVars, vars) {
  return executeMutation(deactivateTopicRef(dcOrVars, vars));
}

export const reactivateTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateTopic', inputVars);
}
reactivateTopicRef.operationName = 'ReactivateTopic';

export function reactivateTopic(dcOrVars, vars) {
  return executeMutation(reactivateTopicRef(dcOrVars, vars));
}

export const createLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLevelCategory', inputVars);
}
createLevelCategoryRef.operationName = 'CreateLevelCategory';

export function createLevelCategory(dcOrVars, vars) {
  return executeMutation(createLevelCategoryRef(dcOrVars, vars));
}

export const updateLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLevelCategory', inputVars);
}
updateLevelCategoryRef.operationName = 'UpdateLevelCategory';

export function updateLevelCategory(dcOrVars, vars) {
  return executeMutation(updateLevelCategoryRef(dcOrVars, vars));
}

export const deactivateLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateLevelCategory', inputVars);
}
deactivateLevelCategoryRef.operationName = 'DeactivateLevelCategory';

export function deactivateLevelCategory(dcOrVars, vars) {
  return executeMutation(deactivateLevelCategoryRef(dcOrVars, vars));
}

export const reactivateLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateLevelCategory', inputVars);
}
reactivateLevelCategoryRef.operationName = 'ReactivateLevelCategory';

export function reactivateLevelCategory(dcOrVars, vars) {
  return executeMutation(reactivateLevelCategoryRef(dcOrVars, vars));
}

export const createEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateEducationalLevel', inputVars);
}
createEducationalLevelRef.operationName = 'CreateEducationalLevel';

export function createEducationalLevel(dcOrVars, vars) {
  return executeMutation(createEducationalLevelRef(dcOrVars, vars));
}

export const updateEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEducationalLevel', inputVars);
}
updateEducationalLevelRef.operationName = 'UpdateEducationalLevel';

export function updateEducationalLevel(dcOrVars, vars) {
  return executeMutation(updateEducationalLevelRef(dcOrVars, vars));
}

export const deactivateEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateEducationalLevel', inputVars);
}
deactivateEducationalLevelRef.operationName = 'DeactivateEducationalLevel';

export function deactivateEducationalLevel(dcOrVars, vars) {
  return executeMutation(deactivateEducationalLevelRef(dcOrVars, vars));
}

export const reactivateEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateEducationalLevel', inputVars);
}
reactivateEducationalLevelRef.operationName = 'ReactivateEducationalLevel';

export function reactivateEducationalLevel(dcOrVars, vars) {
  return executeMutation(reactivateEducationalLevelRef(dcOrVars, vars));
}

export const createCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCourse', inputVars);
}
createCourseRef.operationName = 'CreateCourse';

export function createCourse(dcOrVars, vars) {
  return executeMutation(createCourseRef(dcOrVars, vars));
}

export const updateCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCourse', inputVars);
}
updateCourseRef.operationName = 'UpdateCourse';

export function updateCourse(dcOrVars, vars) {
  return executeMutation(updateCourseRef(dcOrVars, vars));
}

export const deactivateCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateCourse', inputVars);
}
deactivateCourseRef.operationName = 'DeactivateCourse';

export function deactivateCourse(dcOrVars, vars) {
  return executeMutation(deactivateCourseRef(dcOrVars, vars));
}

export const reactivateCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateCourse', inputVars);
}
reactivateCourseRef.operationName = 'ReactivateCourse';

export function reactivateCourse(dcOrVars, vars) {
  return executeMutation(reactivateCourseRef(dcOrVars, vars));
}

export const createQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestion', inputVars);
}
createQuestionRef.operationName = 'CreateQuestion';

export function createQuestion(dcOrVars, vars) {
  return executeMutation(createQuestionRef(dcOrVars, vars));
}

export const createQuestionVersionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionVersion', inputVars);
}
createQuestionVersionRef.operationName = 'CreateQuestionVersion';

export function createQuestionVersion(dcOrVars, vars) {
  return executeMutation(createQuestionVersionRef(dcOrVars, vars));
}

export const updateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestion', inputVars);
}
updateQuestionRef.operationName = 'UpdateQuestion';

export function updateQuestion(dcOrVars, vars) {
  return executeMutation(updateQuestionRef(dcOrVars, vars));
}

export const deactivateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateQuestion', inputVars);
}
deactivateQuestionRef.operationName = 'DeactivateQuestion';

export function deactivateQuestion(dcOrVars, vars) {
  return executeMutation(deactivateQuestionRef(dcOrVars, vars));
}

export const reactivateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateQuestion', inputVars);
}
reactivateQuestionRef.operationName = 'ReactivateQuestion';

export function reactivateQuestion(dcOrVars, vars) {
  return executeMutation(reactivateQuestionRef(dcOrVars, vars));
}

export const createQuestionOptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionOption', inputVars);
}
createQuestionOptionRef.operationName = 'CreateQuestionOption';

export function createQuestionOption(dcOrVars, vars) {
  return executeMutation(createQuestionOptionRef(dcOrVars, vars));
}

export const updateQuestionOptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestionOption', inputVars);
}
updateQuestionOptionRef.operationName = 'UpdateQuestionOption';

export function updateQuestionOption(dcOrVars, vars) {
  return executeMutation(updateQuestionOptionRef(dcOrVars, vars));
}

export const deleteQuestionOptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuestionOption', inputVars);
}
deleteQuestionOptionRef.operationName = 'DeleteQuestionOption';

export function deleteQuestionOption(dcOrVars, vars) {
  return executeMutation(deleteQuestionOptionRef(dcOrVars, vars));
}

export const createQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionType', inputVars);
}
createQuestionTypeRef.operationName = 'CreateQuestionType';

export function createQuestionType(dcOrVars, vars) {
  return executeMutation(createQuestionTypeRef(dcOrVars, vars));
}

export const deactivateQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateQuestionType', inputVars);
}
deactivateQuestionTypeRef.operationName = 'DeactivateQuestionType';

export function deactivateQuestionType(dcOrVars, vars) {
  return executeMutation(deactivateQuestionTypeRef(dcOrVars, vars));
}

export const reactivateQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateQuestionType', inputVars);
}
reactivateQuestionTypeRef.operationName = 'ReactivateQuestionType';

export function reactivateQuestionType(dcOrVars, vars) {
  return executeMutation(reactivateQuestionTypeRef(dcOrVars, vars));
}

export const createDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDifficulty', inputVars);
}
createDifficultyRef.operationName = 'CreateDifficulty';

export function createDifficulty(dcOrVars, vars) {
  return executeMutation(createDifficultyRef(dcOrVars, vars));
}

export const deactivateDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateDifficulty', inputVars);
}
deactivateDifficultyRef.operationName = 'DeactivateDifficulty';

export function deactivateDifficulty(dcOrVars, vars) {
  return executeMutation(deactivateDifficultyRef(dcOrVars, vars));
}

export const reactivateDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateDifficulty', inputVars);
}
reactivateDifficultyRef.operationName = 'ReactivateDifficulty';

export function reactivateDifficulty(dcOrVars, vars) {
  return executeMutation(reactivateDifficultyRef(dcOrVars, vars));
}

export const getUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByEmail', inputVars);
}
getUserByEmailRef.operationName = 'GetUserByEmail';

export function getUserByEmail(dcOrVars, vars) {
  return executeQuery(getUserByEmailRef(dcOrVars, vars));
}

export const listSubjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSubjects');
}
listSubjectsRef.operationName = 'ListSubjects';

export function listSubjects(dc) {
  return executeQuery(listSubjectsRef(dc));
}

export const getSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSubject', inputVars);
}
getSubjectRef.operationName = 'GetSubject';

export function getSubject(dcOrVars, vars) {
  return executeQuery(getSubjectRef(dcOrVars, vars));
}

export const listUnitsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUnits');
}
listUnitsRef.operationName = 'ListUnits';

export function listUnits(dc) {
  return executeQuery(listUnitsRef(dc));
}

export const getUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUnit', inputVars);
}
getUnitRef.operationName = 'GetUnit';

export function getUnit(dcOrVars, vars) {
  return executeQuery(getUnitRef(dcOrVars, vars));
}

export const listTopicsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTopics');
}
listTopicsRef.operationName = 'ListTopics';

export function listTopics(dc) {
  return executeQuery(listTopicsRef(dc));
}

export const getTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTopic', inputVars);
}
getTopicRef.operationName = 'GetTopic';

export function getTopic(dcOrVars, vars) {
  return executeQuery(getTopicRef(dcOrVars, vars));
}

export const listLevelCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLevelCategories');
}
listLevelCategoriesRef.operationName = 'ListLevelCategories';

export function listLevelCategories(dc) {
  return executeQuery(listLevelCategoriesRef(dc));
}

export const getLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLevelCategory', inputVars);
}
getLevelCategoryRef.operationName = 'GetLevelCategory';

export function getLevelCategory(dcOrVars, vars) {
  return executeQuery(getLevelCategoryRef(dcOrVars, vars));
}

export const listEducationalLevelsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListEducationalLevels');
}
listEducationalLevelsRef.operationName = 'ListEducationalLevels';

export function listEducationalLevels(dc) {
  return executeQuery(listEducationalLevelsRef(dc));
}

export const getEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEducationalLevel', inputVars);
}
getEducationalLevelRef.operationName = 'GetEducationalLevel';

export function getEducationalLevel(dcOrVars, vars) {
  return executeQuery(getEducationalLevelRef(dcOrVars, vars));
}

export const getLevelsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLevelsByCategory', inputVars);
}
getLevelsByCategoryRef.operationName = 'GetLevelsByCategory';

export function getLevelsByCategory(dcOrVars, vars) {
  return executeQuery(getLevelsByCategoryRef(dcOrVars, vars));
}

export const listCoursesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCourses', inputVars);
}
listCoursesRef.operationName = 'ListCourses';

export function listCourses(dcOrVars, vars) {
  return executeQuery(listCoursesRef(dcOrVars, vars));
}

export const getCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourse', inputVars);
}
getCourseRef.operationName = 'GetCourse';

export function getCourse(dcOrVars, vars) {
  return executeQuery(getCourseRef(dcOrVars, vars));
}

export const getCoursesByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesByUser', inputVars);
}
getCoursesByUserRef.operationName = 'GetCoursesByUser';

export function getCoursesByUser(dcOrVars, vars) {
  return executeQuery(getCoursesByUserRef(dcOrVars, vars));
}

export const getCoursesByLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesByLevel', inputVars);
}
getCoursesByLevelRef.operationName = 'GetCoursesByLevel';

export function getCoursesByLevel(dcOrVars, vars) {
  return executeQuery(getCoursesByLevelRef(dcOrVars, vars));
}

export const listDifficultiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDifficulties');
}
listDifficultiesRef.operationName = 'ListDifficulties';

export function listDifficulties(dc) {
  return executeQuery(listDifficultiesRef(dc));
}

export const getDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDifficulty', inputVars);
}
getDifficultyRef.operationName = 'GetDifficulty';

export function getDifficulty(dcOrVars, vars) {
  return executeQuery(getDifficultyRef(dcOrVars, vars));
}

export const listQuestionTypesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuestionTypes');
}
listQuestionTypesRef.operationName = 'ListQuestionTypes';

export function listQuestionTypes(dc) {
  return executeQuery(listQuestionTypesRef(dc));
}

export const getQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionType', inputVars);
}
getQuestionTypeRef.operationName = 'GetQuestionType';

export function getQuestionType(dcOrVars, vars) {
  return executeQuery(getQuestionTypeRef(dcOrVars, vars));
}

export const getQuestionTypeByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionTypeByCode', inputVars);
}
getQuestionTypeByCodeRef.operationName = 'GetQuestionTypeByCode';

export function getQuestionTypeByCode(dcOrVars, vars) {
  return executeQuery(getQuestionTypeByCodeRef(dcOrVars, vars));
}

export const listQuestionsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuestionsByUser', inputVars);
}
listQuestionsByUserRef.operationName = 'ListQuestionsByUser';

export function listQuestionsByUser(dcOrVars, vars) {
  return executeQuery(listQuestionsByUserRef(dcOrVars, vars));
}

export const getQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestion', inputVars);
}
getQuestionRef.operationName = 'GetQuestion';

export function getQuestion(dcOrVars, vars) {
  return executeQuery(getQuestionRef(dcOrVars, vars));
}

export const listPublicQuestionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicQuestions');
}
listPublicQuestionsRef.operationName = 'ListPublicQuestions';

export function listPublicQuestions(dc) {
  return executeQuery(listPublicQuestionsRef(dc));
}

export const listPublicQuestionsByDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicQuestionsByDifficulty', inputVars);
}
listPublicQuestionsByDifficultyRef.operationName = 'ListPublicQuestionsByDifficulty';

export function listPublicQuestionsByDifficulty(dcOrVars, vars) {
  return executeQuery(listPublicQuestionsByDifficultyRef(dcOrVars, vars));
}

export const listPublicQuestionsByTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicQuestionsByType', inputVars);
}
listPublicQuestionsByTypeRef.operationName = 'ListPublicQuestionsByType';

export function listPublicQuestionsByType(dcOrVars, vars) {
  return executeQuery(listPublicQuestionsByTypeRef(dcOrVars, vars));
}

export const getQuestionOptionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionOptions', inputVars);
}
getQuestionOptionsRef.operationName = 'GetQuestionOptions';

export function getQuestionOptions(dcOrVars, vars) {
  return executeQuery(getQuestionOptionsRef(dcOrVars, vars));
}

