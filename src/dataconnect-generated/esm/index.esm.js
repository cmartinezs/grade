import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'grade-2c5d1-2-service',
  location: 'southamerica-west1'
};

export const getUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByEmail', inputVars);
}
getUserByEmailRef.operationName = 'GetUserByEmail';

export function getUserByEmail(dcOrVars, vars) {
  return executeQuery(getUserByEmailRef(dcOrVars, vars));
}

export const getUserByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserById', inputVars);
}
getUserByIdRef.operationName = 'GetUserById';

export function getUserById(dcOrVars, vars) {
  return executeQuery(getUserByIdRef(dcOrVars, vars));
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

export const listTaxonomiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTaxonomies');
}
listTaxonomiesRef.operationName = 'ListTaxonomies';

export function listTaxonomies(dc) {
  return executeQuery(listTaxonomiesRef(dc));
}

export const getTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTaxonomy', inputVars);
}
getTaxonomyRef.operationName = 'GetTaxonomy';

export function getTaxonomy(dcOrVars, vars) {
  return executeQuery(getTaxonomyRef(dcOrVars, vars));
}

export const getTaxonomyByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTaxonomyByCode', inputVars);
}
getTaxonomyByCodeRef.operationName = 'GetTaxonomyByCode';

export function getTaxonomyByCode(dcOrVars, vars) {
  return executeQuery(getTaxonomyByCodeRef(dcOrVars, vars));
}

export const listTaxonomiesByLevelRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTaxonomiesByLevel');
}
listTaxonomiesByLevelRef.operationName = 'ListTaxonomiesByLevel';

export function listTaxonomiesByLevel(dc) {
  return executeQuery(listTaxonomiesByLevelRef(dc));
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

export const getDashboardQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardQuestions', inputVars);
}
getDashboardQuestionsRef.operationName = 'GetDashboardQuestions';

export function getDashboardQuestions(dcOrVars, vars) {
  return executeQuery(getDashboardQuestionsRef(dcOrVars, vars));
}

export const getDashboardSystemDataRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardSystemData');
}
getDashboardSystemDataRef.operationName = 'GetDashboardSystemData';

export function getDashboardSystemData(dc) {
  return executeQuery(getDashboardSystemDataRef(dc));
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

export const getAllCoursesByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllCoursesByUser', inputVars);
}
getAllCoursesByUserRef.operationName = 'GetAllCoursesByUser';

export function getAllCoursesByUser(dcOrVars, vars) {
  return executeQuery(getAllCoursesByUserRef(dcOrVars, vars));
}

export const getCourseByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseByCode', inputVars);
}
getCourseByCodeRef.operationName = 'GetCourseByCode';

export function getCourseByCode(dcOrVars, vars) {
  return executeQuery(getCourseByCodeRef(dcOrVars, vars));
}

export const getCoursesByInstitutionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesByInstitution', inputVars);
}
getCoursesByInstitutionRef.operationName = 'GetCoursesByInstitution';

export function getCoursesByInstitution(dcOrVars, vars) {
  return executeQuery(getCoursesByInstitutionRef(dcOrVars, vars));
}

export const getCoursesByEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesByEducationalLevel', inputVars);
}
getCoursesByEducationalLevelRef.operationName = 'GetCoursesByEducationalLevel';

export function getCoursesByEducationalLevel(dcOrVars, vars) {
  return executeQuery(getCoursesByEducationalLevelRef(dcOrVars, vars));
}

export const getEvaluationByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationById', inputVars);
}
getEvaluationByIdRef.operationName = 'GetEvaluationById';

export function getEvaluationById(dcOrVars, vars) {
  return executeQuery(getEvaluationByIdRef(dcOrVars, vars));
}

export const getAllEvaluationsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllEvaluationsByUser', inputVars);
}
getAllEvaluationsByUserRef.operationName = 'GetAllEvaluationsByUser';

export function getAllEvaluationsByUser(dcOrVars, vars) {
  return executeQuery(getAllEvaluationsByUserRef(dcOrVars, vars));
}

export const getEvaluationsByStateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationsByState', inputVars);
}
getEvaluationsByStateRef.operationName = 'GetEvaluationsByState';

export function getEvaluationsByState(dcOrVars, vars) {
  return executeQuery(getEvaluationsByStateRef(dcOrVars, vars));
}

export const getEvaluationsBySubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationsBySubject', inputVars);
}
getEvaluationsBySubjectRef.operationName = 'GetEvaluationsBySubject';

export function getEvaluationsBySubject(dcOrVars, vars) {
  return executeQuery(getEvaluationsBySubjectRef(dcOrVars, vars));
}

export const getEvaluationsByCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationsByCourse', inputVars);
}
getEvaluationsByCourseRef.operationName = 'GetEvaluationsByCourse';

export function getEvaluationsByCourse(dcOrVars, vars) {
  return executeQuery(getEvaluationsByCourseRef(dcOrVars, vars));
}

export const getEvaluationFullDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationFullDetail', inputVars);
}
getEvaluationFullDetailRef.operationName = 'GetEvaluationFullDetail';

export function getEvaluationFullDetail(dcOrVars, vars) {
  return executeQuery(getEvaluationFullDetailRef(dcOrVars, vars));
}

export const getEvaluationQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationQuestions', inputVars);
}
getEvaluationQuestionsRef.operationName = 'GetEvaluationQuestions';

export function getEvaluationQuestions(dcOrVars, vars) {
  return executeQuery(getEvaluationQuestionsRef(dcOrVars, vars));
}

export const getAllStudentsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllStudentsByUser', inputVars);
}
getAllStudentsByUserRef.operationName = 'GetAllStudentsByUser';

export function getAllStudentsByUser(dcOrVars, vars) {
  return executeQuery(getAllStudentsByUserRef(dcOrVars, vars));
}

export const getStudentByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentById', inputVars);
}
getStudentByIdRef.operationName = 'GetStudentById';

export function getStudentById(dcOrVars, vars) {
  return executeQuery(getStudentByIdRef(dcOrVars, vars));
}

export const getStudentByIdentifierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentByIdentifier', inputVars);
}
getStudentByIdentifierRef.operationName = 'GetStudentByIdentifier';

export function getStudentByIdentifier(dcOrVars, vars) {
  return executeQuery(getStudentByIdentifierRef(dcOrVars, vars));
}

export const getStudentsByFirstNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentsByFirstName', inputVars);
}
getStudentsByFirstNameRef.operationName = 'GetStudentsByFirstName';

export function getStudentsByFirstName(dcOrVars, vars) {
  return executeQuery(getStudentsByFirstNameRef(dcOrVars, vars));
}

export const getStudentsByLastNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentsByLastName', inputVars);
}
getStudentsByLastNameRef.operationName = 'GetStudentsByLastName';

export function getStudentsByLastName(dcOrVars, vars) {
  return executeQuery(getStudentsByLastNameRef(dcOrVars, vars));
}

export const getStudentsByCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentsByCourse', inputVars);
}
getStudentsByCourseRef.operationName = 'GetStudentsByCourse';

export function getStudentsByCourse(dcOrVars, vars) {
  return executeQuery(getStudentsByCourseRef(dcOrVars, vars));
}

export const getCourseStudentsDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseStudentsDetail', inputVars);
}
getCourseStudentsDetailRef.operationName = 'GetCourseStudentsDetail';

export function getCourseStudentsDetail(dcOrVars, vars) {
  return executeQuery(getCourseStudentsDetailRef(dcOrVars, vars));
}

export const getCourseStudentsWithDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseStudentsWithDetails', inputVars);
}
getCourseStudentsWithDetailsRef.operationName = 'GetCourseStudentsWithDetails';

export function getCourseStudentsWithDetails(dcOrVars, vars) {
  return executeQuery(getCourseStudentsWithDetailsRef(dcOrVars, vars));
}

export const getStudentEvaluationByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationById', inputVars);
}
getStudentEvaluationByIdRef.operationName = 'GetStudentEvaluationById';

export function getStudentEvaluationById(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationByIdRef(dcOrVars, vars));
}

export const getStudentEvaluationsByStudentIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByStudentId', inputVars);
}
getStudentEvaluationsByStudentIdRef.operationName = 'GetStudentEvaluationsByStudentId';

export function getStudentEvaluationsByStudentId(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByStudentIdRef(dcOrVars, vars));
}

export const getStudentEvaluationsByIdentifierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByIdentifier', inputVars);
}
getStudentEvaluationsByIdentifierRef.operationName = 'GetStudentEvaluationsByIdentifier';

export function getStudentEvaluationsByIdentifier(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByIdentifierRef(dcOrVars, vars));
}

export const getStudentEvaluationsByFirstNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByFirstName', inputVars);
}
getStudentEvaluationsByFirstNameRef.operationName = 'GetStudentEvaluationsByFirstName';

export function getStudentEvaluationsByFirstName(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByFirstNameRef(dcOrVars, vars));
}

export const getStudentEvaluationsByLastNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByLastName', inputVars);
}
getStudentEvaluationsByLastNameRef.operationName = 'GetStudentEvaluationsByLastName';

export function getStudentEvaluationsByLastName(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByLastNameRef(dcOrVars, vars));
}

export const getStudentEvaluationQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationQuestions', inputVars);
}
getStudentEvaluationQuestionsRef.operationName = 'GetStudentEvaluationQuestions';

export function getStudentEvaluationQuestions(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationQuestionsRef(dcOrVars, vars));
}

export const getStudentAnswerOptionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentAnswerOptions', inputVars);
}
getStudentAnswerOptionsRef.operationName = 'GetStudentAnswerOptions';

export function getStudentAnswerOptions(dcOrVars, vars) {
  return executeQuery(getStudentAnswerOptionsRef(dcOrVars, vars));
}

export const getStudentEvaluationsByCourseEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByCourseEvaluation', inputVars);
}
getStudentEvaluationsByCourseEvaluationRef.operationName = 'GetStudentEvaluationsByCourseEvaluation';

export function getStudentEvaluationsByCourseEvaluation(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByCourseEvaluationRef(dcOrVars, vars));
}

export const getStudentEvaluationsByCourseStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByCourseStudent', inputVars);
}
getStudentEvaluationsByCourseStudentRef.operationName = 'GetStudentEvaluationsByCourseStudent';

export function getStudentEvaluationsByCourseStudent(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByCourseStudentRef(dcOrVars, vars));
}

export const getStudentEvaluationFullDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationFullDetail', inputVars);
}
getStudentEvaluationFullDetailRef.operationName = 'GetStudentEvaluationFullDetail';

export function getStudentEvaluationFullDetail(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationFullDetailRef(dcOrVars, vars));
}

export const getCourseEvaluationsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseEvaluationsByUser', inputVars);
}
getCourseEvaluationsByUserRef.operationName = 'GetCourseEvaluationsByUser';

export function getCourseEvaluationsByUser(dcOrVars, vars) {
  return executeQuery(getCourseEvaluationsByUserRef(dcOrVars, vars));
}

export const getCourseEvaluationByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseEvaluationById', inputVars);
}
getCourseEvaluationByIdRef.operationName = 'GetCourseEvaluationById';

export function getCourseEvaluationById(dcOrVars, vars) {
  return executeQuery(getCourseEvaluationByIdRef(dcOrVars, vars));
}

export const getEvaluationsForCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationsForCourse', inputVars);
}
getEvaluationsForCourseRef.operationName = 'GetEvaluationsForCourse';

export function getEvaluationsForCourse(dcOrVars, vars) {
  return executeQuery(getEvaluationsForCourseRef(dcOrVars, vars));
}

export const getCoursesForEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesForEvaluation', inputVars);
}
getCoursesForEvaluationRef.operationName = 'GetCoursesForEvaluation';

export function getCoursesForEvaluation(dcOrVars, vars) {
  return executeQuery(getCoursesForEvaluationRef(dcOrVars, vars));
}

export const getCourseEvaluationByAccessCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseEvaluationByAccessCode', inputVars);
}
getCourseEvaluationByAccessCodeRef.operationName = 'GetCourseEvaluationByAccessCode';

export function getCourseEvaluationByAccessCode(dcOrVars, vars) {
  return executeQuery(getCourseEvaluationByAccessCodeRef(dcOrVars, vars));
}

export const getCourseEvaluationDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseEvaluationDetails', inputVars);
}
getCourseEvaluationDetailsRef.operationName = 'GetCourseEvaluationDetails';

export function getCourseEvaluationDetails(dcOrVars, vars) {
  return executeQuery(getCourseEvaluationDetailsRef(dcOrVars, vars));
}

export const validateStudentForEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ValidateStudentForEvaluation', inputVars);
}
validateStudentForEvaluationRef.operationName = 'ValidateStudentForEvaluation';

export function validateStudentForEvaluation(dcOrVars, vars) {
  return executeQuery(validateStudentForEvaluationRef(dcOrVars, vars));
}

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

export const updateQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestionType', inputVars);
}
updateQuestionTypeRef.operationName = 'UpdateQuestionType';

export function updateQuestionType(dcOrVars, vars) {
  return executeMutation(updateQuestionTypeRef(dcOrVars, vars));
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

export const createTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTaxonomy', inputVars);
}
createTaxonomyRef.operationName = 'CreateTaxonomy';

export function createTaxonomy(dcOrVars, vars) {
  return executeMutation(createTaxonomyRef(dcOrVars, vars));
}

export const updateTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTaxonomy', inputVars);
}
updateTaxonomyRef.operationName = 'UpdateTaxonomy';

export function updateTaxonomy(dcOrVars, vars) {
  return executeMutation(updateTaxonomyRef(dcOrVars, vars));
}

export const deactivateTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateTaxonomy', inputVars);
}
deactivateTaxonomyRef.operationName = 'DeactivateTaxonomy';

export function deactivateTaxonomy(dcOrVars, vars) {
  return executeMutation(deactivateTaxonomyRef(dcOrVars, vars));
}

export const reactivateTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateTaxonomy', inputVars);
}
reactivateTaxonomyRef.operationName = 'ReactivateTaxonomy';

export function reactivateTaxonomy(dcOrVars, vars) {
  return executeMutation(reactivateTaxonomyRef(dcOrVars, vars));
}

export const createEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateEvaluation', inputVars);
}
createEvaluationRef.operationName = 'CreateEvaluation';

export function createEvaluation(dcOrVars, vars) {
  return executeMutation(createEvaluationRef(dcOrVars, vars));
}

export const updateEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEvaluation', inputVars);
}
updateEvaluationRef.operationName = 'UpdateEvaluation';

export function updateEvaluation(dcOrVars, vars) {
  return executeMutation(updateEvaluationRef(dcOrVars, vars));
}

export const updateEvaluationStateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEvaluationState', inputVars);
}
updateEvaluationStateRef.operationName = 'UpdateEvaluationState';

export function updateEvaluationState(dcOrVars, vars) {
  return executeMutation(updateEvaluationStateRef(dcOrVars, vars));
}

export const deactivateEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateEvaluation', inputVars);
}
deactivateEvaluationRef.operationName = 'DeactivateEvaluation';

export function deactivateEvaluation(dcOrVars, vars) {
  return executeMutation(deactivateEvaluationRef(dcOrVars, vars));
}

export const reactivateEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateEvaluation', inputVars);
}
reactivateEvaluationRef.operationName = 'ReactivateEvaluation';

export function reactivateEvaluation(dcOrVars, vars) {
  return executeMutation(reactivateEvaluationRef(dcOrVars, vars));
}

export const addQuestionToEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddQuestionToEvaluation', inputVars);
}
addQuestionToEvaluationRef.operationName = 'AddQuestionToEvaluation';

export function addQuestionToEvaluation(dcOrVars, vars) {
  return executeMutation(addQuestionToEvaluationRef(dcOrVars, vars));
}

export const updateEvaluationQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEvaluationQuestion', inputVars);
}
updateEvaluationQuestionRef.operationName = 'UpdateEvaluationQuestion';

export function updateEvaluationQuestion(dcOrVars, vars) {
  return executeMutation(updateEvaluationQuestionRef(dcOrVars, vars));
}

export const removeQuestionFromEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveQuestionFromEvaluation', inputVars);
}
removeQuestionFromEvaluationRef.operationName = 'RemoveQuestionFromEvaluation';

export function removeQuestionFromEvaluation(dcOrVars, vars) {
  return executeMutation(removeQuestionFromEvaluationRef(dcOrVars, vars));
}

export const assignEvaluationToCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignEvaluationToCourse', inputVars);
}
assignEvaluationToCourseRef.operationName = 'AssignEvaluationToCourse';

export function assignEvaluationToCourse(dcOrVars, vars) {
  return executeMutation(assignEvaluationToCourseRef(dcOrVars, vars));
}

export const removeEvaluationFromCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveEvaluationFromCourse', inputVars);
}
removeEvaluationFromCourseRef.operationName = 'RemoveEvaluationFromCourse';

export function removeEvaluationFromCourse(dcOrVars, vars) {
  return executeMutation(removeEvaluationFromCourseRef(dcOrVars, vars));
}

export const updateCourseEvaluationAccessCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCourseEvaluationAccessCode', inputVars);
}
updateCourseEvaluationAccessCodeRef.operationName = 'UpdateCourseEvaluationAccessCode';

export function updateCourseEvaluationAccessCode(dcOrVars, vars) {
  return executeMutation(updateCourseEvaluationAccessCodeRef(dcOrVars, vars));
}

export const createStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStudent', inputVars);
}
createStudentRef.operationName = 'CreateStudent';

export function createStudent(dcOrVars, vars) {
  return executeMutation(createStudentRef(dcOrVars, vars));
}

export const updateStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStudent', inputVars);
}
updateStudentRef.operationName = 'UpdateStudent';

export function updateStudent(dcOrVars, vars) {
  return executeMutation(updateStudentRef(dcOrVars, vars));
}

export const deactivateStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateStudent', inputVars);
}
deactivateStudentRef.operationName = 'DeactivateStudent';

export function deactivateStudent(dcOrVars, vars) {
  return executeMutation(deactivateStudentRef(dcOrVars, vars));
}

export const reactivateStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateStudent', inputVars);
}
reactivateStudentRef.operationName = 'ReactivateStudent';

export function reactivateStudent(dcOrVars, vars) {
  return executeMutation(reactivateStudentRef(dcOrVars, vars));
}

export const enrollStudentInCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnrollStudentInCourse', inputVars);
}
enrollStudentInCourseRef.operationName = 'EnrollStudentInCourse';

export function enrollStudentInCourse(dcOrVars, vars) {
  return executeMutation(enrollStudentInCourseRef(dcOrVars, vars));
}

export const updateCourseStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCourseStudent', inputVars);
}
updateCourseStudentRef.operationName = 'UpdateCourseStudent';

export function updateCourseStudent(dcOrVars, vars) {
  return executeMutation(updateCourseStudentRef(dcOrVars, vars));
}

export const unenrollStudentFromCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UnenrollStudentFromCourse', inputVars);
}
unenrollStudentFromCourseRef.operationName = 'UnenrollStudentFromCourse';

export function unenrollStudentFromCourse(dcOrVars, vars) {
  return executeMutation(unenrollStudentFromCourseRef(dcOrVars, vars));
}

export const reenrollStudentInCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReenrollStudentInCourse', inputVars);
}
reenrollStudentInCourseRef.operationName = 'ReenrollStudentInCourse';

export function reenrollStudentInCourse(dcOrVars, vars) {
  return executeMutation(reenrollStudentInCourseRef(dcOrVars, vars));
}

export const createStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStudentEvaluation', inputVars);
}
createStudentEvaluationRef.operationName = 'CreateStudentEvaluation';

export function createStudentEvaluation(dcOrVars, vars) {
  return executeMutation(createStudentEvaluationRef(dcOrVars, vars));
}

export const updateStudentEvaluationStateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStudentEvaluationState', inputVars);
}
updateStudentEvaluationStateRef.operationName = 'UpdateStudentEvaluationState';

export function updateStudentEvaluationState(dcOrVars, vars) {
  return executeMutation(updateStudentEvaluationStateRef(dcOrVars, vars));
}

export const startStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartStudentEvaluation', inputVars);
}
startStudentEvaluationRef.operationName = 'StartStudentEvaluation';

export function startStudentEvaluation(dcOrVars, vars) {
  return executeMutation(startStudentEvaluationRef(dcOrVars, vars));
}

export const completeStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CompleteStudentEvaluation', inputVars);
}
completeStudentEvaluationRef.operationName = 'CompleteStudentEvaluation';

export function completeStudentEvaluation(dcOrVars, vars) {
  return executeMutation(completeStudentEvaluationRef(dcOrVars, vars));
}

export const gradeStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GradeStudentEvaluation', inputVars);
}
gradeStudentEvaluationRef.operationName = 'GradeStudentEvaluation';

export function gradeStudentEvaluation(dcOrVars, vars) {
  return executeMutation(gradeStudentEvaluationRef(dcOrVars, vars));
}

export const updateStudentEvaluationScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStudentEvaluationScore', inputVars);
}
updateStudentEvaluationScoreRef.operationName = 'UpdateStudentEvaluationScore';

export function updateStudentEvaluationScore(dcOrVars, vars) {
  return executeMutation(updateStudentEvaluationScoreRef(dcOrVars, vars));
}

export const addQuestionToStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddQuestionToStudentEvaluation', inputVars);
}
addQuestionToStudentEvaluationRef.operationName = 'AddQuestionToStudentEvaluation';

export function addQuestionToStudentEvaluation(dcOrVars, vars) {
  return executeMutation(addQuestionToStudentEvaluationRef(dcOrVars, vars));
}

export const gradeStudentQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GradeStudentQuestion', inputVars);
}
gradeStudentQuestionRef.operationName = 'GradeStudentQuestion';

export function gradeStudentQuestion(dcOrVars, vars) {
  return executeMutation(gradeStudentQuestionRef(dcOrVars, vars));
}

export const updateStudentQuestionPositionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStudentQuestionPosition', inputVars);
}
updateStudentQuestionPositionRef.operationName = 'UpdateStudentQuestionPosition';

export function updateStudentQuestionPosition(dcOrVars, vars) {
  return executeMutation(updateStudentQuestionPositionRef(dcOrVars, vars));
}

export const removeQuestionFromStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveQuestionFromStudentEvaluation', inputVars);
}
removeQuestionFromStudentEvaluationRef.operationName = 'RemoveQuestionFromStudentEvaluation';

export function removeQuestionFromStudentEvaluation(dcOrVars, vars) {
  return executeMutation(removeQuestionFromStudentEvaluationRef(dcOrVars, vars));
}

export const registerStudentAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegisterStudentAnswer', inputVars);
}
registerStudentAnswerRef.operationName = 'RegisterStudentAnswer';

export function registerStudentAnswer(dcOrVars, vars) {
  return executeMutation(registerStudentAnswerRef(dcOrVars, vars));
}

export const removeStudentAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveStudentAnswer', inputVars);
}
removeStudentAnswerRef.operationName = 'RemoveStudentAnswer';

export function removeStudentAnswer(dcOrVars, vars) {
  return executeMutation(removeStudentAnswerRef(dcOrVars, vars));
}

