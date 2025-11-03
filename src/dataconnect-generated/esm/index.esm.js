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

