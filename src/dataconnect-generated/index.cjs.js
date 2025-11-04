const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'grade-2c5d1-2-service',
  location: 'southamerica-west1'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const updateUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}
updateUserRef.operationName = 'UpdateUser';
exports.updateUserRef = updateUserRef;

exports.updateUser = function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
};

const createSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSubject', inputVars);
}
createSubjectRef.operationName = 'CreateSubject';
exports.createSubjectRef = createSubjectRef;

exports.createSubject = function createSubject(dcOrVars, vars) {
  return executeMutation(createSubjectRef(dcOrVars, vars));
};

const updateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSubject', inputVars);
}
updateSubjectRef.operationName = 'UpdateSubject';
exports.updateSubjectRef = updateSubjectRef;

exports.updateSubject = function updateSubject(dcOrVars, vars) {
  return executeMutation(updateSubjectRef(dcOrVars, vars));
};

const deactivateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateSubject', inputVars);
}
deactivateSubjectRef.operationName = 'DeactivateSubject';
exports.deactivateSubjectRef = deactivateSubjectRef;

exports.deactivateSubject = function deactivateSubject(dcOrVars, vars) {
  return executeMutation(deactivateSubjectRef(dcOrVars, vars));
};

const reactivateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateSubject', inputVars);
}
reactivateSubjectRef.operationName = 'ReactivateSubject';
exports.reactivateSubjectRef = reactivateSubjectRef;

exports.reactivateSubject = function reactivateSubject(dcOrVars, vars) {
  return executeMutation(reactivateSubjectRef(dcOrVars, vars));
};

const createUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUnit', inputVars);
}
createUnitRef.operationName = 'CreateUnit';
exports.createUnitRef = createUnitRef;

exports.createUnit = function createUnit(dcOrVars, vars) {
  return executeMutation(createUnitRef(dcOrVars, vars));
};

const updateUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUnit', inputVars);
}
updateUnitRef.operationName = 'UpdateUnit';
exports.updateUnitRef = updateUnitRef;

exports.updateUnit = function updateUnit(dcOrVars, vars) {
  return executeMutation(updateUnitRef(dcOrVars, vars));
};

const deactivateUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateUnit', inputVars);
}
deactivateUnitRef.operationName = 'DeactivateUnit';
exports.deactivateUnitRef = deactivateUnitRef;

exports.deactivateUnit = function deactivateUnit(dcOrVars, vars) {
  return executeMutation(deactivateUnitRef(dcOrVars, vars));
};

const reactivateUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateUnit', inputVars);
}
reactivateUnitRef.operationName = 'ReactivateUnit';
exports.reactivateUnitRef = reactivateUnitRef;

exports.reactivateUnit = function reactivateUnit(dcOrVars, vars) {
  return executeMutation(reactivateUnitRef(dcOrVars, vars));
};

const createTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTopic', inputVars);
}
createTopicRef.operationName = 'CreateTopic';
exports.createTopicRef = createTopicRef;

exports.createTopic = function createTopic(dcOrVars, vars) {
  return executeMutation(createTopicRef(dcOrVars, vars));
};

const updateTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTopic', inputVars);
}
updateTopicRef.operationName = 'UpdateTopic';
exports.updateTopicRef = updateTopicRef;

exports.updateTopic = function updateTopic(dcOrVars, vars) {
  return executeMutation(updateTopicRef(dcOrVars, vars));
};

const deactivateTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateTopic', inputVars);
}
deactivateTopicRef.operationName = 'DeactivateTopic';
exports.deactivateTopicRef = deactivateTopicRef;

exports.deactivateTopic = function deactivateTopic(dcOrVars, vars) {
  return executeMutation(deactivateTopicRef(dcOrVars, vars));
};

const reactivateTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateTopic', inputVars);
}
reactivateTopicRef.operationName = 'ReactivateTopic';
exports.reactivateTopicRef = reactivateTopicRef;

exports.reactivateTopic = function reactivateTopic(dcOrVars, vars) {
  return executeMutation(reactivateTopicRef(dcOrVars, vars));
};

const createLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLevelCategory', inputVars);
}
createLevelCategoryRef.operationName = 'CreateLevelCategory';
exports.createLevelCategoryRef = createLevelCategoryRef;

exports.createLevelCategory = function createLevelCategory(dcOrVars, vars) {
  return executeMutation(createLevelCategoryRef(dcOrVars, vars));
};

const updateLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLevelCategory', inputVars);
}
updateLevelCategoryRef.operationName = 'UpdateLevelCategory';
exports.updateLevelCategoryRef = updateLevelCategoryRef;

exports.updateLevelCategory = function updateLevelCategory(dcOrVars, vars) {
  return executeMutation(updateLevelCategoryRef(dcOrVars, vars));
};

const deactivateLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateLevelCategory', inputVars);
}
deactivateLevelCategoryRef.operationName = 'DeactivateLevelCategory';
exports.deactivateLevelCategoryRef = deactivateLevelCategoryRef;

exports.deactivateLevelCategory = function deactivateLevelCategory(dcOrVars, vars) {
  return executeMutation(deactivateLevelCategoryRef(dcOrVars, vars));
};

const reactivateLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateLevelCategory', inputVars);
}
reactivateLevelCategoryRef.operationName = 'ReactivateLevelCategory';
exports.reactivateLevelCategoryRef = reactivateLevelCategoryRef;

exports.reactivateLevelCategory = function reactivateLevelCategory(dcOrVars, vars) {
  return executeMutation(reactivateLevelCategoryRef(dcOrVars, vars));
};

const createEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateEducationalLevel', inputVars);
}
createEducationalLevelRef.operationName = 'CreateEducationalLevel';
exports.createEducationalLevelRef = createEducationalLevelRef;

exports.createEducationalLevel = function createEducationalLevel(dcOrVars, vars) {
  return executeMutation(createEducationalLevelRef(dcOrVars, vars));
};

const updateEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEducationalLevel', inputVars);
}
updateEducationalLevelRef.operationName = 'UpdateEducationalLevel';
exports.updateEducationalLevelRef = updateEducationalLevelRef;

exports.updateEducationalLevel = function updateEducationalLevel(dcOrVars, vars) {
  return executeMutation(updateEducationalLevelRef(dcOrVars, vars));
};

const deactivateEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateEducationalLevel', inputVars);
}
deactivateEducationalLevelRef.operationName = 'DeactivateEducationalLevel';
exports.deactivateEducationalLevelRef = deactivateEducationalLevelRef;

exports.deactivateEducationalLevel = function deactivateEducationalLevel(dcOrVars, vars) {
  return executeMutation(deactivateEducationalLevelRef(dcOrVars, vars));
};

const reactivateEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateEducationalLevel', inputVars);
}
reactivateEducationalLevelRef.operationName = 'ReactivateEducationalLevel';
exports.reactivateEducationalLevelRef = reactivateEducationalLevelRef;

exports.reactivateEducationalLevel = function reactivateEducationalLevel(dcOrVars, vars) {
  return executeMutation(reactivateEducationalLevelRef(dcOrVars, vars));
};

const createCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCourse', inputVars);
}
createCourseRef.operationName = 'CreateCourse';
exports.createCourseRef = createCourseRef;

exports.createCourse = function createCourse(dcOrVars, vars) {
  return executeMutation(createCourseRef(dcOrVars, vars));
};

const updateCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCourse', inputVars);
}
updateCourseRef.operationName = 'UpdateCourse';
exports.updateCourseRef = updateCourseRef;

exports.updateCourse = function updateCourse(dcOrVars, vars) {
  return executeMutation(updateCourseRef(dcOrVars, vars));
};

const deactivateCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateCourse', inputVars);
}
deactivateCourseRef.operationName = 'DeactivateCourse';
exports.deactivateCourseRef = deactivateCourseRef;

exports.deactivateCourse = function deactivateCourse(dcOrVars, vars) {
  return executeMutation(deactivateCourseRef(dcOrVars, vars));
};

const reactivateCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateCourse', inputVars);
}
reactivateCourseRef.operationName = 'ReactivateCourse';
exports.reactivateCourseRef = reactivateCourseRef;

exports.reactivateCourse = function reactivateCourse(dcOrVars, vars) {
  return executeMutation(reactivateCourseRef(dcOrVars, vars));
};

const getUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByEmail', inputVars);
}
getUserByEmailRef.operationName = 'GetUserByEmail';
exports.getUserByEmailRef = getUserByEmailRef;

exports.getUserByEmail = function getUserByEmail(dcOrVars, vars) {
  return executeQuery(getUserByEmailRef(dcOrVars, vars));
};

const listSubjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSubjects');
}
listSubjectsRef.operationName = 'ListSubjects';
exports.listSubjectsRef = listSubjectsRef;

exports.listSubjects = function listSubjects(dc) {
  return executeQuery(listSubjectsRef(dc));
};

const getSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSubject', inputVars);
}
getSubjectRef.operationName = 'GetSubject';
exports.getSubjectRef = getSubjectRef;

exports.getSubject = function getSubject(dcOrVars, vars) {
  return executeQuery(getSubjectRef(dcOrVars, vars));
};

const listUnitsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUnits');
}
listUnitsRef.operationName = 'ListUnits';
exports.listUnitsRef = listUnitsRef;

exports.listUnits = function listUnits(dc) {
  return executeQuery(listUnitsRef(dc));
};

const getUnitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUnit', inputVars);
}
getUnitRef.operationName = 'GetUnit';
exports.getUnitRef = getUnitRef;

exports.getUnit = function getUnit(dcOrVars, vars) {
  return executeQuery(getUnitRef(dcOrVars, vars));
};

const listTopicsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTopics');
}
listTopicsRef.operationName = 'ListTopics';
exports.listTopicsRef = listTopicsRef;

exports.listTopics = function listTopics(dc) {
  return executeQuery(listTopicsRef(dc));
};

const getTopicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTopic', inputVars);
}
getTopicRef.operationName = 'GetTopic';
exports.getTopicRef = getTopicRef;

exports.getTopic = function getTopic(dcOrVars, vars) {
  return executeQuery(getTopicRef(dcOrVars, vars));
};

const listLevelCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLevelCategories');
}
listLevelCategoriesRef.operationName = 'ListLevelCategories';
exports.listLevelCategoriesRef = listLevelCategoriesRef;

exports.listLevelCategories = function listLevelCategories(dc) {
  return executeQuery(listLevelCategoriesRef(dc));
};

const getLevelCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLevelCategory', inputVars);
}
getLevelCategoryRef.operationName = 'GetLevelCategory';
exports.getLevelCategoryRef = getLevelCategoryRef;

exports.getLevelCategory = function getLevelCategory(dcOrVars, vars) {
  return executeQuery(getLevelCategoryRef(dcOrVars, vars));
};

const listEducationalLevelsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListEducationalLevels');
}
listEducationalLevelsRef.operationName = 'ListEducationalLevels';
exports.listEducationalLevelsRef = listEducationalLevelsRef;

exports.listEducationalLevels = function listEducationalLevels(dc) {
  return executeQuery(listEducationalLevelsRef(dc));
};

const getEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEducationalLevel', inputVars);
}
getEducationalLevelRef.operationName = 'GetEducationalLevel';
exports.getEducationalLevelRef = getEducationalLevelRef;

exports.getEducationalLevel = function getEducationalLevel(dcOrVars, vars) {
  return executeQuery(getEducationalLevelRef(dcOrVars, vars));
};

const getLevelsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLevelsByCategory', inputVars);
}
getLevelsByCategoryRef.operationName = 'GetLevelsByCategory';
exports.getLevelsByCategoryRef = getLevelsByCategoryRef;

exports.getLevelsByCategory = function getLevelsByCategory(dcOrVars, vars) {
  return executeQuery(getLevelsByCategoryRef(dcOrVars, vars));
};

const listCoursesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCourses', inputVars);
}
listCoursesRef.operationName = 'ListCourses';
exports.listCoursesRef = listCoursesRef;

exports.listCourses = function listCourses(dcOrVars, vars) {
  return executeQuery(listCoursesRef(dcOrVars, vars));
};

const getCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourse', inputVars);
}
getCourseRef.operationName = 'GetCourse';
exports.getCourseRef = getCourseRef;

exports.getCourse = function getCourse(dcOrVars, vars) {
  return executeQuery(getCourseRef(dcOrVars, vars));
};

const getCoursesByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesByUser', inputVars);
}
getCoursesByUserRef.operationName = 'GetCoursesByUser';
exports.getCoursesByUserRef = getCoursesByUserRef;

exports.getCoursesByUser = function getCoursesByUser(dcOrVars, vars) {
  return executeQuery(getCoursesByUserRef(dcOrVars, vars));
};

const getCoursesByLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesByLevel', inputVars);
}
getCoursesByLevelRef.operationName = 'GetCoursesByLevel';
exports.getCoursesByLevelRef = getCoursesByLevelRef;

exports.getCoursesByLevel = function getCoursesByLevel(dcOrVars, vars) {
  return executeQuery(getCoursesByLevelRef(dcOrVars, vars));
};
