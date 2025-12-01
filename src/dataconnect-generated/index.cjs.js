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

const createQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestion', inputVars);
}
createQuestionRef.operationName = 'CreateQuestion';
exports.createQuestionRef = createQuestionRef;

exports.createQuestion = function createQuestion(dcOrVars, vars) {
  return executeMutation(createQuestionRef(dcOrVars, vars));
};

const createQuestionVersionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionVersion', inputVars);
}
createQuestionVersionRef.operationName = 'CreateQuestionVersion';
exports.createQuestionVersionRef = createQuestionVersionRef;

exports.createQuestionVersion = function createQuestionVersion(dcOrVars, vars) {
  return executeMutation(createQuestionVersionRef(dcOrVars, vars));
};

const updateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestion', inputVars);
}
updateQuestionRef.operationName = 'UpdateQuestion';
exports.updateQuestionRef = updateQuestionRef;

exports.updateQuestion = function updateQuestion(dcOrVars, vars) {
  return executeMutation(updateQuestionRef(dcOrVars, vars));
};

const deactivateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateQuestion', inputVars);
}
deactivateQuestionRef.operationName = 'DeactivateQuestion';
exports.deactivateQuestionRef = deactivateQuestionRef;

exports.deactivateQuestion = function deactivateQuestion(dcOrVars, vars) {
  return executeMutation(deactivateQuestionRef(dcOrVars, vars));
};

const reactivateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateQuestion', inputVars);
}
reactivateQuestionRef.operationName = 'ReactivateQuestion';
exports.reactivateQuestionRef = reactivateQuestionRef;

exports.reactivateQuestion = function reactivateQuestion(dcOrVars, vars) {
  return executeMutation(reactivateQuestionRef(dcOrVars, vars));
};

const createQuestionOptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionOption', inputVars);
}
createQuestionOptionRef.operationName = 'CreateQuestionOption';
exports.createQuestionOptionRef = createQuestionOptionRef;

exports.createQuestionOption = function createQuestionOption(dcOrVars, vars) {
  return executeMutation(createQuestionOptionRef(dcOrVars, vars));
};

const updateQuestionOptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestionOption', inputVars);
}
updateQuestionOptionRef.operationName = 'UpdateQuestionOption';
exports.updateQuestionOptionRef = updateQuestionOptionRef;

exports.updateQuestionOption = function updateQuestionOption(dcOrVars, vars) {
  return executeMutation(updateQuestionOptionRef(dcOrVars, vars));
};

const deleteQuestionOptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuestionOption', inputVars);
}
deleteQuestionOptionRef.operationName = 'DeleteQuestionOption';
exports.deleteQuestionOptionRef = deleteQuestionOptionRef;

exports.deleteQuestionOption = function deleteQuestionOption(dcOrVars, vars) {
  return executeMutation(deleteQuestionOptionRef(dcOrVars, vars));
};

const createQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionType', inputVars);
}
createQuestionTypeRef.operationName = 'CreateQuestionType';
exports.createQuestionTypeRef = createQuestionTypeRef;

exports.createQuestionType = function createQuestionType(dcOrVars, vars) {
  return executeMutation(createQuestionTypeRef(dcOrVars, vars));
};

const updateQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestionType', inputVars);
}
updateQuestionTypeRef.operationName = 'UpdateQuestionType';
exports.updateQuestionTypeRef = updateQuestionTypeRef;

exports.updateQuestionType = function updateQuestionType(dcOrVars, vars) {
  return executeMutation(updateQuestionTypeRef(dcOrVars, vars));
};

const deactivateQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateQuestionType', inputVars);
}
deactivateQuestionTypeRef.operationName = 'DeactivateQuestionType';
exports.deactivateQuestionTypeRef = deactivateQuestionTypeRef;

exports.deactivateQuestionType = function deactivateQuestionType(dcOrVars, vars) {
  return executeMutation(deactivateQuestionTypeRef(dcOrVars, vars));
};

const reactivateQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateQuestionType', inputVars);
}
reactivateQuestionTypeRef.operationName = 'ReactivateQuestionType';
exports.reactivateQuestionTypeRef = reactivateQuestionTypeRef;

exports.reactivateQuestionType = function reactivateQuestionType(dcOrVars, vars) {
  return executeMutation(reactivateQuestionTypeRef(dcOrVars, vars));
};

const createDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDifficulty', inputVars);
}
createDifficultyRef.operationName = 'CreateDifficulty';
exports.createDifficultyRef = createDifficultyRef;

exports.createDifficulty = function createDifficulty(dcOrVars, vars) {
  return executeMutation(createDifficultyRef(dcOrVars, vars));
};

const deactivateDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateDifficulty', inputVars);
}
deactivateDifficultyRef.operationName = 'DeactivateDifficulty';
exports.deactivateDifficultyRef = deactivateDifficultyRef;

exports.deactivateDifficulty = function deactivateDifficulty(dcOrVars, vars) {
  return executeMutation(deactivateDifficultyRef(dcOrVars, vars));
};

const reactivateDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateDifficulty', inputVars);
}
reactivateDifficultyRef.operationName = 'ReactivateDifficulty';
exports.reactivateDifficultyRef = reactivateDifficultyRef;

exports.reactivateDifficulty = function reactivateDifficulty(dcOrVars, vars) {
  return executeMutation(reactivateDifficultyRef(dcOrVars, vars));
};

const createTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTaxonomy', inputVars);
}
createTaxonomyRef.operationName = 'CreateTaxonomy';
exports.createTaxonomyRef = createTaxonomyRef;

exports.createTaxonomy = function createTaxonomy(dcOrVars, vars) {
  return executeMutation(createTaxonomyRef(dcOrVars, vars));
};

const updateTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTaxonomy', inputVars);
}
updateTaxonomyRef.operationName = 'UpdateTaxonomy';
exports.updateTaxonomyRef = updateTaxonomyRef;

exports.updateTaxonomy = function updateTaxonomy(dcOrVars, vars) {
  return executeMutation(updateTaxonomyRef(dcOrVars, vars));
};

const deactivateTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateTaxonomy', inputVars);
}
deactivateTaxonomyRef.operationName = 'DeactivateTaxonomy';
exports.deactivateTaxonomyRef = deactivateTaxonomyRef;

exports.deactivateTaxonomy = function deactivateTaxonomy(dcOrVars, vars) {
  return executeMutation(deactivateTaxonomyRef(dcOrVars, vars));
};

const reactivateTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateTaxonomy', inputVars);
}
reactivateTaxonomyRef.operationName = 'ReactivateTaxonomy';
exports.reactivateTaxonomyRef = reactivateTaxonomyRef;

exports.reactivateTaxonomy = function reactivateTaxonomy(dcOrVars, vars) {
  return executeMutation(reactivateTaxonomyRef(dcOrVars, vars));
};

const createEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateEvaluation', inputVars);
}
createEvaluationRef.operationName = 'CreateEvaluation';
exports.createEvaluationRef = createEvaluationRef;

exports.createEvaluation = function createEvaluation(dcOrVars, vars) {
  return executeMutation(createEvaluationRef(dcOrVars, vars));
};

const updateEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEvaluation', inputVars);
}
updateEvaluationRef.operationName = 'UpdateEvaluation';
exports.updateEvaluationRef = updateEvaluationRef;

exports.updateEvaluation = function updateEvaluation(dcOrVars, vars) {
  return executeMutation(updateEvaluationRef(dcOrVars, vars));
};

const updateEvaluationStateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEvaluationState', inputVars);
}
updateEvaluationStateRef.operationName = 'UpdateEvaluationState';
exports.updateEvaluationStateRef = updateEvaluationStateRef;

exports.updateEvaluationState = function updateEvaluationState(dcOrVars, vars) {
  return executeMutation(updateEvaluationStateRef(dcOrVars, vars));
};

const deactivateEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateEvaluation', inputVars);
}
deactivateEvaluationRef.operationName = 'DeactivateEvaluation';
exports.deactivateEvaluationRef = deactivateEvaluationRef;

exports.deactivateEvaluation = function deactivateEvaluation(dcOrVars, vars) {
  return executeMutation(deactivateEvaluationRef(dcOrVars, vars));
};

const reactivateEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateEvaluation', inputVars);
}
reactivateEvaluationRef.operationName = 'ReactivateEvaluation';
exports.reactivateEvaluationRef = reactivateEvaluationRef;

exports.reactivateEvaluation = function reactivateEvaluation(dcOrVars, vars) {
  return executeMutation(reactivateEvaluationRef(dcOrVars, vars));
};

const addQuestionToEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddQuestionToEvaluation', inputVars);
}
addQuestionToEvaluationRef.operationName = 'AddQuestionToEvaluation';
exports.addQuestionToEvaluationRef = addQuestionToEvaluationRef;

exports.addQuestionToEvaluation = function addQuestionToEvaluation(dcOrVars, vars) {
  return executeMutation(addQuestionToEvaluationRef(dcOrVars, vars));
};

const updateEvaluationQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEvaluationQuestion', inputVars);
}
updateEvaluationQuestionRef.operationName = 'UpdateEvaluationQuestion';
exports.updateEvaluationQuestionRef = updateEvaluationQuestionRef;

exports.updateEvaluationQuestion = function updateEvaluationQuestion(dcOrVars, vars) {
  return executeMutation(updateEvaluationQuestionRef(dcOrVars, vars));
};

const removeQuestionFromEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveQuestionFromEvaluation', inputVars);
}
removeQuestionFromEvaluationRef.operationName = 'RemoveQuestionFromEvaluation';
exports.removeQuestionFromEvaluationRef = removeQuestionFromEvaluationRef;

exports.removeQuestionFromEvaluation = function removeQuestionFromEvaluation(dcOrVars, vars) {
  return executeMutation(removeQuestionFromEvaluationRef(dcOrVars, vars));
};

const assignEvaluationToCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignEvaluationToCourse', inputVars);
}
assignEvaluationToCourseRef.operationName = 'AssignEvaluationToCourse';
exports.assignEvaluationToCourseRef = assignEvaluationToCourseRef;

exports.assignEvaluationToCourse = function assignEvaluationToCourse(dcOrVars, vars) {
  return executeMutation(assignEvaluationToCourseRef(dcOrVars, vars));
};

const removeEvaluationFromCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveEvaluationFromCourse', inputVars);
}
removeEvaluationFromCourseRef.operationName = 'RemoveEvaluationFromCourse';
exports.removeEvaluationFromCourseRef = removeEvaluationFromCourseRef;

exports.removeEvaluationFromCourse = function removeEvaluationFromCourse(dcOrVars, vars) {
  return executeMutation(removeEvaluationFromCourseRef(dcOrVars, vars));
};

const createStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStudent', inputVars);
}
createStudentRef.operationName = 'CreateStudent';
exports.createStudentRef = createStudentRef;

exports.createStudent = function createStudent(dcOrVars, vars) {
  return executeMutation(createStudentRef(dcOrVars, vars));
};

const updateStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStudent', inputVars);
}
updateStudentRef.operationName = 'UpdateStudent';
exports.updateStudentRef = updateStudentRef;

exports.updateStudent = function updateStudent(dcOrVars, vars) {
  return executeMutation(updateStudentRef(dcOrVars, vars));
};

const deactivateStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateStudent', inputVars);
}
deactivateStudentRef.operationName = 'DeactivateStudent';
exports.deactivateStudentRef = deactivateStudentRef;

exports.deactivateStudent = function deactivateStudent(dcOrVars, vars) {
  return executeMutation(deactivateStudentRef(dcOrVars, vars));
};

const reactivateStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReactivateStudent', inputVars);
}
reactivateStudentRef.operationName = 'ReactivateStudent';
exports.reactivateStudentRef = reactivateStudentRef;

exports.reactivateStudent = function reactivateStudent(dcOrVars, vars) {
  return executeMutation(reactivateStudentRef(dcOrVars, vars));
};

const enrollStudentInCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnrollStudentInCourse', inputVars);
}
enrollStudentInCourseRef.operationName = 'EnrollStudentInCourse';
exports.enrollStudentInCourseRef = enrollStudentInCourseRef;

exports.enrollStudentInCourse = function enrollStudentInCourse(dcOrVars, vars) {
  return executeMutation(enrollStudentInCourseRef(dcOrVars, vars));
};

const updateCourseStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCourseStudent', inputVars);
}
updateCourseStudentRef.operationName = 'UpdateCourseStudent';
exports.updateCourseStudentRef = updateCourseStudentRef;

exports.updateCourseStudent = function updateCourseStudent(dcOrVars, vars) {
  return executeMutation(updateCourseStudentRef(dcOrVars, vars));
};

const unenrollStudentFromCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UnenrollStudentFromCourse', inputVars);
}
unenrollStudentFromCourseRef.operationName = 'UnenrollStudentFromCourse';
exports.unenrollStudentFromCourseRef = unenrollStudentFromCourseRef;

exports.unenrollStudentFromCourse = function unenrollStudentFromCourse(dcOrVars, vars) {
  return executeMutation(unenrollStudentFromCourseRef(dcOrVars, vars));
};

const reenrollStudentInCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReenrollStudentInCourse', inputVars);
}
reenrollStudentInCourseRef.operationName = 'ReenrollStudentInCourse';
exports.reenrollStudentInCourseRef = reenrollStudentInCourseRef;

exports.reenrollStudentInCourse = function reenrollStudentInCourse(dcOrVars, vars) {
  return executeMutation(reenrollStudentInCourseRef(dcOrVars, vars));
};

const createStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStudentEvaluation', inputVars);
}
createStudentEvaluationRef.operationName = 'CreateStudentEvaluation';
exports.createStudentEvaluationRef = createStudentEvaluationRef;

exports.createStudentEvaluation = function createStudentEvaluation(dcOrVars, vars) {
  return executeMutation(createStudentEvaluationRef(dcOrVars, vars));
};

const updateStudentEvaluationStateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStudentEvaluationState', inputVars);
}
updateStudentEvaluationStateRef.operationName = 'UpdateStudentEvaluationState';
exports.updateStudentEvaluationStateRef = updateStudentEvaluationStateRef;

exports.updateStudentEvaluationState = function updateStudentEvaluationState(dcOrVars, vars) {
  return executeMutation(updateStudentEvaluationStateRef(dcOrVars, vars));
};

const startStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartStudentEvaluation', inputVars);
}
startStudentEvaluationRef.operationName = 'StartStudentEvaluation';
exports.startStudentEvaluationRef = startStudentEvaluationRef;

exports.startStudentEvaluation = function startStudentEvaluation(dcOrVars, vars) {
  return executeMutation(startStudentEvaluationRef(dcOrVars, vars));
};

const completeStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CompleteStudentEvaluation', inputVars);
}
completeStudentEvaluationRef.operationName = 'CompleteStudentEvaluation';
exports.completeStudentEvaluationRef = completeStudentEvaluationRef;

exports.completeStudentEvaluation = function completeStudentEvaluation(dcOrVars, vars) {
  return executeMutation(completeStudentEvaluationRef(dcOrVars, vars));
};

const gradeStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GradeStudentEvaluation', inputVars);
}
gradeStudentEvaluationRef.operationName = 'GradeStudentEvaluation';
exports.gradeStudentEvaluationRef = gradeStudentEvaluationRef;

exports.gradeStudentEvaluation = function gradeStudentEvaluation(dcOrVars, vars) {
  return executeMutation(gradeStudentEvaluationRef(dcOrVars, vars));
};

const updateStudentEvaluationScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStudentEvaluationScore', inputVars);
}
updateStudentEvaluationScoreRef.operationName = 'UpdateStudentEvaluationScore';
exports.updateStudentEvaluationScoreRef = updateStudentEvaluationScoreRef;

exports.updateStudentEvaluationScore = function updateStudentEvaluationScore(dcOrVars, vars) {
  return executeMutation(updateStudentEvaluationScoreRef(dcOrVars, vars));
};

const addQuestionToStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddQuestionToStudentEvaluation', inputVars);
}
addQuestionToStudentEvaluationRef.operationName = 'AddQuestionToStudentEvaluation';
exports.addQuestionToStudentEvaluationRef = addQuestionToStudentEvaluationRef;

exports.addQuestionToStudentEvaluation = function addQuestionToStudentEvaluation(dcOrVars, vars) {
  return executeMutation(addQuestionToStudentEvaluationRef(dcOrVars, vars));
};

const gradeStudentQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GradeStudentQuestion', inputVars);
}
gradeStudentQuestionRef.operationName = 'GradeStudentQuestion';
exports.gradeStudentQuestionRef = gradeStudentQuestionRef;

exports.gradeStudentQuestion = function gradeStudentQuestion(dcOrVars, vars) {
  return executeMutation(gradeStudentQuestionRef(dcOrVars, vars));
};

const updateStudentQuestionPositionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStudentQuestionPosition', inputVars);
}
updateStudentQuestionPositionRef.operationName = 'UpdateStudentQuestionPosition';
exports.updateStudentQuestionPositionRef = updateStudentQuestionPositionRef;

exports.updateStudentQuestionPosition = function updateStudentQuestionPosition(dcOrVars, vars) {
  return executeMutation(updateStudentQuestionPositionRef(dcOrVars, vars));
};

const removeQuestionFromStudentEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveQuestionFromStudentEvaluation', inputVars);
}
removeQuestionFromStudentEvaluationRef.operationName = 'RemoveQuestionFromStudentEvaluation';
exports.removeQuestionFromStudentEvaluationRef = removeQuestionFromStudentEvaluationRef;

exports.removeQuestionFromStudentEvaluation = function removeQuestionFromStudentEvaluation(dcOrVars, vars) {
  return executeMutation(removeQuestionFromStudentEvaluationRef(dcOrVars, vars));
};

const registerStudentAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegisterStudentAnswer', inputVars);
}
registerStudentAnswerRef.operationName = 'RegisterStudentAnswer';
exports.registerStudentAnswerRef = registerStudentAnswerRef;

exports.registerStudentAnswer = function registerStudentAnswer(dcOrVars, vars) {
  return executeMutation(registerStudentAnswerRef(dcOrVars, vars));
};

const removeStudentAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveStudentAnswer', inputVars);
}
removeStudentAnswerRef.operationName = 'RemoveStudentAnswer';
exports.removeStudentAnswerRef = removeStudentAnswerRef;

exports.removeStudentAnswer = function removeStudentAnswer(dcOrVars, vars) {
  return executeMutation(removeStudentAnswerRef(dcOrVars, vars));
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

const getUserByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserById', inputVars);
}
getUserByIdRef.operationName = 'GetUserById';
exports.getUserByIdRef = getUserByIdRef;

exports.getUserById = function getUserById(dcOrVars, vars) {
  return executeQuery(getUserByIdRef(dcOrVars, vars));
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

const listDifficultiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDifficulties');
}
listDifficultiesRef.operationName = 'ListDifficulties';
exports.listDifficultiesRef = listDifficultiesRef;

exports.listDifficulties = function listDifficulties(dc) {
  return executeQuery(listDifficultiesRef(dc));
};

const getDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDifficulty', inputVars);
}
getDifficultyRef.operationName = 'GetDifficulty';
exports.getDifficultyRef = getDifficultyRef;

exports.getDifficulty = function getDifficulty(dcOrVars, vars) {
  return executeQuery(getDifficultyRef(dcOrVars, vars));
};

const listQuestionTypesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuestionTypes');
}
listQuestionTypesRef.operationName = 'ListQuestionTypes';
exports.listQuestionTypesRef = listQuestionTypesRef;

exports.listQuestionTypes = function listQuestionTypes(dc) {
  return executeQuery(listQuestionTypesRef(dc));
};

const getQuestionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionType', inputVars);
}
getQuestionTypeRef.operationName = 'GetQuestionType';
exports.getQuestionTypeRef = getQuestionTypeRef;

exports.getQuestionType = function getQuestionType(dcOrVars, vars) {
  return executeQuery(getQuestionTypeRef(dcOrVars, vars));
};

const getQuestionTypeByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionTypeByCode', inputVars);
}
getQuestionTypeByCodeRef.operationName = 'GetQuestionTypeByCode';
exports.getQuestionTypeByCodeRef = getQuestionTypeByCodeRef;

exports.getQuestionTypeByCode = function getQuestionTypeByCode(dcOrVars, vars) {
  return executeQuery(getQuestionTypeByCodeRef(dcOrVars, vars));
};

const listTaxonomiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTaxonomies');
}
listTaxonomiesRef.operationName = 'ListTaxonomies';
exports.listTaxonomiesRef = listTaxonomiesRef;

exports.listTaxonomies = function listTaxonomies(dc) {
  return executeQuery(listTaxonomiesRef(dc));
};

const getTaxonomyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTaxonomy', inputVars);
}
getTaxonomyRef.operationName = 'GetTaxonomy';
exports.getTaxonomyRef = getTaxonomyRef;

exports.getTaxonomy = function getTaxonomy(dcOrVars, vars) {
  return executeQuery(getTaxonomyRef(dcOrVars, vars));
};

const getTaxonomyByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTaxonomyByCode', inputVars);
}
getTaxonomyByCodeRef.operationName = 'GetTaxonomyByCode';
exports.getTaxonomyByCodeRef = getTaxonomyByCodeRef;

exports.getTaxonomyByCode = function getTaxonomyByCode(dcOrVars, vars) {
  return executeQuery(getTaxonomyByCodeRef(dcOrVars, vars));
};

const listTaxonomiesByLevelRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTaxonomiesByLevel');
}
listTaxonomiesByLevelRef.operationName = 'ListTaxonomiesByLevel';
exports.listTaxonomiesByLevelRef = listTaxonomiesByLevelRef;

exports.listTaxonomiesByLevel = function listTaxonomiesByLevel(dc) {
  return executeQuery(listTaxonomiesByLevelRef(dc));
};

const listQuestionsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuestionsByUser', inputVars);
}
listQuestionsByUserRef.operationName = 'ListQuestionsByUser';
exports.listQuestionsByUserRef = listQuestionsByUserRef;

exports.listQuestionsByUser = function listQuestionsByUser(dcOrVars, vars) {
  return executeQuery(listQuestionsByUserRef(dcOrVars, vars));
};

const getDashboardQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardQuestions', inputVars);
}
getDashboardQuestionsRef.operationName = 'GetDashboardQuestions';
exports.getDashboardQuestionsRef = getDashboardQuestionsRef;

exports.getDashboardQuestions = function getDashboardQuestions(dcOrVars, vars) {
  return executeQuery(getDashboardQuestionsRef(dcOrVars, vars));
};

const getDashboardSystemDataRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardSystemData');
}
getDashboardSystemDataRef.operationName = 'GetDashboardSystemData';
exports.getDashboardSystemDataRef = getDashboardSystemDataRef;

exports.getDashboardSystemData = function getDashboardSystemData(dc) {
  return executeQuery(getDashboardSystemDataRef(dc));
};

const getQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestion', inputVars);
}
getQuestionRef.operationName = 'GetQuestion';
exports.getQuestionRef = getQuestionRef;

exports.getQuestion = function getQuestion(dcOrVars, vars) {
  return executeQuery(getQuestionRef(dcOrVars, vars));
};

const listPublicQuestionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicQuestions');
}
listPublicQuestionsRef.operationName = 'ListPublicQuestions';
exports.listPublicQuestionsRef = listPublicQuestionsRef;

exports.listPublicQuestions = function listPublicQuestions(dc) {
  return executeQuery(listPublicQuestionsRef(dc));
};

const listPublicQuestionsByDifficultyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicQuestionsByDifficulty', inputVars);
}
listPublicQuestionsByDifficultyRef.operationName = 'ListPublicQuestionsByDifficulty';
exports.listPublicQuestionsByDifficultyRef = listPublicQuestionsByDifficultyRef;

exports.listPublicQuestionsByDifficulty = function listPublicQuestionsByDifficulty(dcOrVars, vars) {
  return executeQuery(listPublicQuestionsByDifficultyRef(dcOrVars, vars));
};

const listPublicQuestionsByTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicQuestionsByType', inputVars);
}
listPublicQuestionsByTypeRef.operationName = 'ListPublicQuestionsByType';
exports.listPublicQuestionsByTypeRef = listPublicQuestionsByTypeRef;

exports.listPublicQuestionsByType = function listPublicQuestionsByType(dcOrVars, vars) {
  return executeQuery(listPublicQuestionsByTypeRef(dcOrVars, vars));
};

const getQuestionOptionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionOptions', inputVars);
}
getQuestionOptionsRef.operationName = 'GetQuestionOptions';
exports.getQuestionOptionsRef = getQuestionOptionsRef;

exports.getQuestionOptions = function getQuestionOptions(dcOrVars, vars) {
  return executeQuery(getQuestionOptionsRef(dcOrVars, vars));
};

const getAllCoursesByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllCoursesByUser', inputVars);
}
getAllCoursesByUserRef.operationName = 'GetAllCoursesByUser';
exports.getAllCoursesByUserRef = getAllCoursesByUserRef;

exports.getAllCoursesByUser = function getAllCoursesByUser(dcOrVars, vars) {
  return executeQuery(getAllCoursesByUserRef(dcOrVars, vars));
};

const getCourseByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseByCode', inputVars);
}
getCourseByCodeRef.operationName = 'GetCourseByCode';
exports.getCourseByCodeRef = getCourseByCodeRef;

exports.getCourseByCode = function getCourseByCode(dcOrVars, vars) {
  return executeQuery(getCourseByCodeRef(dcOrVars, vars));
};

const getCoursesByInstitutionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesByInstitution', inputVars);
}
getCoursesByInstitutionRef.operationName = 'GetCoursesByInstitution';
exports.getCoursesByInstitutionRef = getCoursesByInstitutionRef;

exports.getCoursesByInstitution = function getCoursesByInstitution(dcOrVars, vars) {
  return executeQuery(getCoursesByInstitutionRef(dcOrVars, vars));
};

const getCoursesByEducationalLevelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesByEducationalLevel', inputVars);
}
getCoursesByEducationalLevelRef.operationName = 'GetCoursesByEducationalLevel';
exports.getCoursesByEducationalLevelRef = getCoursesByEducationalLevelRef;

exports.getCoursesByEducationalLevel = function getCoursesByEducationalLevel(dcOrVars, vars) {
  return executeQuery(getCoursesByEducationalLevelRef(dcOrVars, vars));
};

const getEvaluationByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationById', inputVars);
}
getEvaluationByIdRef.operationName = 'GetEvaluationById';
exports.getEvaluationByIdRef = getEvaluationByIdRef;

exports.getEvaluationById = function getEvaluationById(dcOrVars, vars) {
  return executeQuery(getEvaluationByIdRef(dcOrVars, vars));
};

const getAllEvaluationsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllEvaluationsByUser', inputVars);
}
getAllEvaluationsByUserRef.operationName = 'GetAllEvaluationsByUser';
exports.getAllEvaluationsByUserRef = getAllEvaluationsByUserRef;

exports.getAllEvaluationsByUser = function getAllEvaluationsByUser(dcOrVars, vars) {
  return executeQuery(getAllEvaluationsByUserRef(dcOrVars, vars));
};

const getEvaluationsByDateRangeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationsByDateRange', inputVars);
}
getEvaluationsByDateRangeRef.operationName = 'GetEvaluationsByDateRange';
exports.getEvaluationsByDateRangeRef = getEvaluationsByDateRangeRef;

exports.getEvaluationsByDateRange = function getEvaluationsByDateRange(dcOrVars, vars) {
  return executeQuery(getEvaluationsByDateRangeRef(dcOrVars, vars));
};

const getEvaluationsByStateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationsByState', inputVars);
}
getEvaluationsByStateRef.operationName = 'GetEvaluationsByState';
exports.getEvaluationsByStateRef = getEvaluationsByStateRef;

exports.getEvaluationsByState = function getEvaluationsByState(dcOrVars, vars) {
  return executeQuery(getEvaluationsByStateRef(dcOrVars, vars));
};

const getEvaluationsBySubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationsBySubject', inputVars);
}
getEvaluationsBySubjectRef.operationName = 'GetEvaluationsBySubject';
exports.getEvaluationsBySubjectRef = getEvaluationsBySubjectRef;

exports.getEvaluationsBySubject = function getEvaluationsBySubject(dcOrVars, vars) {
  return executeQuery(getEvaluationsBySubjectRef(dcOrVars, vars));
};

const getEvaluationsByCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationsByCourse', inputVars);
}
getEvaluationsByCourseRef.operationName = 'GetEvaluationsByCourse';
exports.getEvaluationsByCourseRef = getEvaluationsByCourseRef;

exports.getEvaluationsByCourse = function getEvaluationsByCourse(dcOrVars, vars) {
  return executeQuery(getEvaluationsByCourseRef(dcOrVars, vars));
};

const getEvaluationFullDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationFullDetail', inputVars);
}
getEvaluationFullDetailRef.operationName = 'GetEvaluationFullDetail';
exports.getEvaluationFullDetailRef = getEvaluationFullDetailRef;

exports.getEvaluationFullDetail = function getEvaluationFullDetail(dcOrVars, vars) {
  return executeQuery(getEvaluationFullDetailRef(dcOrVars, vars));
};

const getEvaluationQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationQuestions', inputVars);
}
getEvaluationQuestionsRef.operationName = 'GetEvaluationQuestions';
exports.getEvaluationQuestionsRef = getEvaluationQuestionsRef;

exports.getEvaluationQuestions = function getEvaluationQuestions(dcOrVars, vars) {
  return executeQuery(getEvaluationQuestionsRef(dcOrVars, vars));
};

const getAllStudentsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllStudentsByUser', inputVars);
}
getAllStudentsByUserRef.operationName = 'GetAllStudentsByUser';
exports.getAllStudentsByUserRef = getAllStudentsByUserRef;

exports.getAllStudentsByUser = function getAllStudentsByUser(dcOrVars, vars) {
  return executeQuery(getAllStudentsByUserRef(dcOrVars, vars));
};

const getStudentByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentById', inputVars);
}
getStudentByIdRef.operationName = 'GetStudentById';
exports.getStudentByIdRef = getStudentByIdRef;

exports.getStudentById = function getStudentById(dcOrVars, vars) {
  return executeQuery(getStudentByIdRef(dcOrVars, vars));
};

const getStudentByIdentifierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentByIdentifier', inputVars);
}
getStudentByIdentifierRef.operationName = 'GetStudentByIdentifier';
exports.getStudentByIdentifierRef = getStudentByIdentifierRef;

exports.getStudentByIdentifier = function getStudentByIdentifier(dcOrVars, vars) {
  return executeQuery(getStudentByIdentifierRef(dcOrVars, vars));
};

const getStudentsByFirstNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentsByFirstName', inputVars);
}
getStudentsByFirstNameRef.operationName = 'GetStudentsByFirstName';
exports.getStudentsByFirstNameRef = getStudentsByFirstNameRef;

exports.getStudentsByFirstName = function getStudentsByFirstName(dcOrVars, vars) {
  return executeQuery(getStudentsByFirstNameRef(dcOrVars, vars));
};

const getStudentsByLastNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentsByLastName', inputVars);
}
getStudentsByLastNameRef.operationName = 'GetStudentsByLastName';
exports.getStudentsByLastNameRef = getStudentsByLastNameRef;

exports.getStudentsByLastName = function getStudentsByLastName(dcOrVars, vars) {
  return executeQuery(getStudentsByLastNameRef(dcOrVars, vars));
};

const getStudentsByCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentsByCourse', inputVars);
}
getStudentsByCourseRef.operationName = 'GetStudentsByCourse';
exports.getStudentsByCourseRef = getStudentsByCourseRef;

exports.getStudentsByCourse = function getStudentsByCourse(dcOrVars, vars) {
  return executeQuery(getStudentsByCourseRef(dcOrVars, vars));
};

const getCourseStudentsDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseStudentsDetail', inputVars);
}
getCourseStudentsDetailRef.operationName = 'GetCourseStudentsDetail';
exports.getCourseStudentsDetailRef = getCourseStudentsDetailRef;

exports.getCourseStudentsDetail = function getCourseStudentsDetail(dcOrVars, vars) {
  return executeQuery(getCourseStudentsDetailRef(dcOrVars, vars));
};

const getCourseStudentsWithDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseStudentsWithDetails', inputVars);
}
getCourseStudentsWithDetailsRef.operationName = 'GetCourseStudentsWithDetails';
exports.getCourseStudentsWithDetailsRef = getCourseStudentsWithDetailsRef;

exports.getCourseStudentsWithDetails = function getCourseStudentsWithDetails(dcOrVars, vars) {
  return executeQuery(getCourseStudentsWithDetailsRef(dcOrVars, vars));
};

const getStudentEvaluationByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationById', inputVars);
}
getStudentEvaluationByIdRef.operationName = 'GetStudentEvaluationById';
exports.getStudentEvaluationByIdRef = getStudentEvaluationByIdRef;

exports.getStudentEvaluationById = function getStudentEvaluationById(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationByIdRef(dcOrVars, vars));
};

const getStudentEvaluationsByStudentIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByStudentId', inputVars);
}
getStudentEvaluationsByStudentIdRef.operationName = 'GetStudentEvaluationsByStudentId';
exports.getStudentEvaluationsByStudentIdRef = getStudentEvaluationsByStudentIdRef;

exports.getStudentEvaluationsByStudentId = function getStudentEvaluationsByStudentId(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByStudentIdRef(dcOrVars, vars));
};

const getStudentEvaluationsByIdentifierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByIdentifier', inputVars);
}
getStudentEvaluationsByIdentifierRef.operationName = 'GetStudentEvaluationsByIdentifier';
exports.getStudentEvaluationsByIdentifierRef = getStudentEvaluationsByIdentifierRef;

exports.getStudentEvaluationsByIdentifier = function getStudentEvaluationsByIdentifier(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByIdentifierRef(dcOrVars, vars));
};

const getStudentEvaluationsByFirstNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByFirstName', inputVars);
}
getStudentEvaluationsByFirstNameRef.operationName = 'GetStudentEvaluationsByFirstName';
exports.getStudentEvaluationsByFirstNameRef = getStudentEvaluationsByFirstNameRef;

exports.getStudentEvaluationsByFirstName = function getStudentEvaluationsByFirstName(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByFirstNameRef(dcOrVars, vars));
};

const getStudentEvaluationsByLastNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByLastName', inputVars);
}
getStudentEvaluationsByLastNameRef.operationName = 'GetStudentEvaluationsByLastName';
exports.getStudentEvaluationsByLastNameRef = getStudentEvaluationsByLastNameRef;

exports.getStudentEvaluationsByLastName = function getStudentEvaluationsByLastName(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByLastNameRef(dcOrVars, vars));
};

const getStudentEvaluationQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationQuestions', inputVars);
}
getStudentEvaluationQuestionsRef.operationName = 'GetStudentEvaluationQuestions';
exports.getStudentEvaluationQuestionsRef = getStudentEvaluationQuestionsRef;

exports.getStudentEvaluationQuestions = function getStudentEvaluationQuestions(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationQuestionsRef(dcOrVars, vars));
};

const getStudentAnswerOptionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentAnswerOptions', inputVars);
}
getStudentAnswerOptionsRef.operationName = 'GetStudentAnswerOptions';
exports.getStudentAnswerOptionsRef = getStudentAnswerOptionsRef;

exports.getStudentAnswerOptions = function getStudentAnswerOptions(dcOrVars, vars) {
  return executeQuery(getStudentAnswerOptionsRef(dcOrVars, vars));
};

const getStudentEvaluationsByCourseEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByCourseEvaluation', inputVars);
}
getStudentEvaluationsByCourseEvaluationRef.operationName = 'GetStudentEvaluationsByCourseEvaluation';
exports.getStudentEvaluationsByCourseEvaluationRef = getStudentEvaluationsByCourseEvaluationRef;

exports.getStudentEvaluationsByCourseEvaluation = function getStudentEvaluationsByCourseEvaluation(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByCourseEvaluationRef(dcOrVars, vars));
};

const getStudentEvaluationsByCourseStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationsByCourseStudent', inputVars);
}
getStudentEvaluationsByCourseStudentRef.operationName = 'GetStudentEvaluationsByCourseStudent';
exports.getStudentEvaluationsByCourseStudentRef = getStudentEvaluationsByCourseStudentRef;

exports.getStudentEvaluationsByCourseStudent = function getStudentEvaluationsByCourseStudent(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationsByCourseStudentRef(dcOrVars, vars));
};

const getStudentEvaluationFullDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudentEvaluationFullDetail', inputVars);
}
getStudentEvaluationFullDetailRef.operationName = 'GetStudentEvaluationFullDetail';
exports.getStudentEvaluationFullDetailRef = getStudentEvaluationFullDetailRef;

exports.getStudentEvaluationFullDetail = function getStudentEvaluationFullDetail(dcOrVars, vars) {
  return executeQuery(getStudentEvaluationFullDetailRef(dcOrVars, vars));
};

const getCourseEvaluationsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseEvaluationsByUser', inputVars);
}
getCourseEvaluationsByUserRef.operationName = 'GetCourseEvaluationsByUser';
exports.getCourseEvaluationsByUserRef = getCourseEvaluationsByUserRef;

exports.getCourseEvaluationsByUser = function getCourseEvaluationsByUser(dcOrVars, vars) {
  return executeQuery(getCourseEvaluationsByUserRef(dcOrVars, vars));
};

const getCourseEvaluationByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseEvaluationById', inputVars);
}
getCourseEvaluationByIdRef.operationName = 'GetCourseEvaluationById';
exports.getCourseEvaluationByIdRef = getCourseEvaluationByIdRef;

exports.getCourseEvaluationById = function getCourseEvaluationById(dcOrVars, vars) {
  return executeQuery(getCourseEvaluationByIdRef(dcOrVars, vars));
};

const getEvaluationsForCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvaluationsForCourse', inputVars);
}
getEvaluationsForCourseRef.operationName = 'GetEvaluationsForCourse';
exports.getEvaluationsForCourseRef = getEvaluationsForCourseRef;

exports.getEvaluationsForCourse = function getEvaluationsForCourse(dcOrVars, vars) {
  return executeQuery(getEvaluationsForCourseRef(dcOrVars, vars));
};

const getCoursesForEvaluationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCoursesForEvaluation', inputVars);
}
getCoursesForEvaluationRef.operationName = 'GetCoursesForEvaluation';
exports.getCoursesForEvaluationRef = getCoursesForEvaluationRef;

exports.getCoursesForEvaluation = function getCoursesForEvaluation(dcOrVars, vars) {
  return executeQuery(getCoursesForEvaluationRef(dcOrVars, vars));
};
