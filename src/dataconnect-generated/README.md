# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserByEmail*](#getuserbyemail)
  - [*GetUserById*](#getuserbyid)
  - [*ListSubjects*](#listsubjects)
  - [*GetSubject*](#getsubject)
  - [*ListUnits*](#listunits)
  - [*GetUnit*](#getunit)
  - [*ListTopics*](#listtopics)
  - [*GetTopic*](#gettopic)
  - [*ListLevelCategories*](#listlevelcategories)
  - [*GetLevelCategory*](#getlevelcategory)
  - [*ListEducationalLevels*](#listeducationallevels)
  - [*GetEducationalLevel*](#geteducationallevel)
  - [*GetLevelsByCategory*](#getlevelsbycategory)
  - [*ListCourses*](#listcourses)
  - [*GetCourse*](#getcourse)
  - [*GetCoursesByUser*](#getcoursesbyuser)
  - [*GetCoursesByLevel*](#getcoursesbylevel)
  - [*ListDifficulties*](#listdifficulties)
  - [*GetDifficulty*](#getdifficulty)
  - [*ListQuestionTypes*](#listquestiontypes)
  - [*GetQuestionType*](#getquestiontype)
  - [*GetQuestionTypeByCode*](#getquestiontypebycode)
  - [*ListTaxonomies*](#listtaxonomies)
  - [*GetTaxonomy*](#gettaxonomy)
  - [*GetTaxonomyByCode*](#gettaxonomybycode)
  - [*ListTaxonomiesByLevel*](#listtaxonomiesbylevel)
  - [*ListQuestionsByUser*](#listquestionsbyuser)
  - [*GetDashboardQuestions*](#getdashboardquestions)
  - [*GetDashboardSystemData*](#getdashboardsystemdata)
  - [*GetQuestion*](#getquestion)
  - [*ListPublicQuestions*](#listpublicquestions)
  - [*ListPublicQuestionsByDifficulty*](#listpublicquestionsbydifficulty)
  - [*ListPublicQuestionsByType*](#listpublicquestionsbytype)
  - [*GetQuestionOptions*](#getquestionoptions)
  - [*GetAllCoursesByUser*](#getallcoursesbyuser)
  - [*GetCourseByCode*](#getcoursebycode)
  - [*GetCoursesByInstitution*](#getcoursesbyinstitution)
  - [*GetCoursesByEducationalLevel*](#getcoursesbyeducationallevel)
  - [*GetEvaluationById*](#getevaluationbyid)
  - [*GetAllEvaluationsByUser*](#getallevaluationsbyuser)
  - [*GetEvaluationsByState*](#getevaluationsbystate)
  - [*GetEvaluationsBySubject*](#getevaluationsbysubject)
  - [*GetEvaluationsByCourse*](#getevaluationsbycourse)
  - [*GetEvaluationFullDetail*](#getevaluationfulldetail)
  - [*GetEvaluationQuestions*](#getevaluationquestions)
  - [*GetAllStudentsByUser*](#getallstudentsbyuser)
  - [*GetStudentById*](#getstudentbyid)
  - [*GetStudentByIdentifier*](#getstudentbyidentifier)
  - [*GetStudentsByFirstName*](#getstudentsbyfirstname)
  - [*GetStudentsByLastName*](#getstudentsbylastname)
  - [*GetStudentsByCourse*](#getstudentsbycourse)
  - [*GetCourseStudentsDetail*](#getcoursestudentsdetail)
  - [*GetCourseStudentsWithDetails*](#getcoursestudentswithdetails)
  - [*GetStudentEvaluationById*](#getstudentevaluationbyid)
  - [*GetStudentEvaluationsByStudentId*](#getstudentevaluationsbystudentid)
  - [*GetStudentEvaluationsByIdentifier*](#getstudentevaluationsbyidentifier)
  - [*GetStudentEvaluationsByFirstName*](#getstudentevaluationsbyfirstname)
  - [*GetStudentEvaluationsByLastName*](#getstudentevaluationsbylastname)
  - [*GetStudentEvaluationQuestions*](#getstudentevaluationquestions)
  - [*GetStudentAnswerOptions*](#getstudentansweroptions)
  - [*GetStudentEvaluationsByCourseEvaluation*](#getstudentevaluationsbycourseevaluation)
  - [*GetStudentEvaluationsByCourseStudent*](#getstudentevaluationsbycoursestudent)
  - [*GetStudentEvaluationFullDetail*](#getstudentevaluationfulldetail)
  - [*GetCourseEvaluationsByUser*](#getcourseevaluationsbyuser)
  - [*GetCourseEvaluationById*](#getcourseevaluationbyid)
  - [*GetEvaluationsForCourse*](#getevaluationsforcourse)
  - [*GetCoursesForEvaluation*](#getcoursesforevaluation)
  - [*GetCourseEvaluationByAccessCode*](#getcourseevaluationbyaccesscode)
  - [*GetCourseEvaluationDetails*](#getcourseevaluationdetails)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*CreateSubject*](#createsubject)
  - [*UpdateSubject*](#updatesubject)
  - [*DeactivateSubject*](#deactivatesubject)
  - [*ReactivateSubject*](#reactivatesubject)
  - [*CreateUnit*](#createunit)
  - [*UpdateUnit*](#updateunit)
  - [*DeactivateUnit*](#deactivateunit)
  - [*ReactivateUnit*](#reactivateunit)
  - [*CreateTopic*](#createtopic)
  - [*UpdateTopic*](#updatetopic)
  - [*DeactivateTopic*](#deactivatetopic)
  - [*ReactivateTopic*](#reactivatetopic)
  - [*CreateLevelCategory*](#createlevelcategory)
  - [*UpdateLevelCategory*](#updatelevelcategory)
  - [*DeactivateLevelCategory*](#deactivatelevelcategory)
  - [*ReactivateLevelCategory*](#reactivatelevelcategory)
  - [*CreateEducationalLevel*](#createeducationallevel)
  - [*UpdateEducationalLevel*](#updateeducationallevel)
  - [*DeactivateEducationalLevel*](#deactivateeducationallevel)
  - [*ReactivateEducationalLevel*](#reactivateeducationallevel)
  - [*CreateCourse*](#createcourse)
  - [*UpdateCourse*](#updatecourse)
  - [*DeactivateCourse*](#deactivatecourse)
  - [*ReactivateCourse*](#reactivatecourse)
  - [*CreateQuestion*](#createquestion)
  - [*CreateQuestionVersion*](#createquestionversion)
  - [*UpdateQuestion*](#updatequestion)
  - [*DeactivateQuestion*](#deactivatequestion)
  - [*ReactivateQuestion*](#reactivatequestion)
  - [*CreateQuestionOption*](#createquestionoption)
  - [*UpdateQuestionOption*](#updatequestionoption)
  - [*DeleteQuestionOption*](#deletequestionoption)
  - [*CreateQuestionType*](#createquestiontype)
  - [*UpdateQuestionType*](#updatequestiontype)
  - [*DeactivateQuestionType*](#deactivatequestiontype)
  - [*ReactivateQuestionType*](#reactivatequestiontype)
  - [*CreateDifficulty*](#createdifficulty)
  - [*DeactivateDifficulty*](#deactivatedifficulty)
  - [*ReactivateDifficulty*](#reactivatedifficulty)
  - [*CreateTaxonomy*](#createtaxonomy)
  - [*UpdateTaxonomy*](#updatetaxonomy)
  - [*DeactivateTaxonomy*](#deactivatetaxonomy)
  - [*ReactivateTaxonomy*](#reactivatetaxonomy)
  - [*CreateEvaluation*](#createevaluation)
  - [*UpdateEvaluation*](#updateevaluation)
  - [*UpdateEvaluationState*](#updateevaluationstate)
  - [*DeactivateEvaluation*](#deactivateevaluation)
  - [*ReactivateEvaluation*](#reactivateevaluation)
  - [*AddQuestionToEvaluation*](#addquestiontoevaluation)
  - [*UpdateEvaluationQuestion*](#updateevaluationquestion)
  - [*RemoveQuestionFromEvaluation*](#removequestionfromevaluation)
  - [*AssignEvaluationToCourse*](#assignevaluationtocourse)
  - [*RemoveEvaluationFromCourse*](#removeevaluationfromcourse)
  - [*UpdateCourseEvaluationAccessCode*](#updatecourseevaluationaccesscode)
  - [*CreateStudent*](#createstudent)
  - [*UpdateStudent*](#updatestudent)
  - [*DeactivateStudent*](#deactivatestudent)
  - [*ReactivateStudent*](#reactivatestudent)
  - [*EnrollStudentInCourse*](#enrollstudentincourse)
  - [*UpdateCourseStudent*](#updatecoursestudent)
  - [*UnenrollStudentFromCourse*](#unenrollstudentfromcourse)
  - [*ReenrollStudentInCourse*](#reenrollstudentincourse)
  - [*CreateStudentEvaluation*](#createstudentevaluation)
  - [*UpdateStudentEvaluationState*](#updatestudentevaluationstate)
  - [*StartStudentEvaluation*](#startstudentevaluation)
  - [*CompleteStudentEvaluation*](#completestudentevaluation)
  - [*GradeStudentEvaluation*](#gradestudentevaluation)
  - [*UpdateStudentEvaluationScore*](#updatestudentevaluationscore)
  - [*AddQuestionToStudentEvaluation*](#addquestiontostudentevaluation)
  - [*GradeStudentQuestion*](#gradestudentquestion)
  - [*UpdateStudentQuestionPosition*](#updatestudentquestionposition)
  - [*RemoveQuestionFromStudentEvaluation*](#removequestionfromstudentevaluation)
  - [*RegisterStudentAnswer*](#registerstudentanswer)
  - [*RemoveStudentAnswer*](#removestudentanswer)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserByEmail
You can execute the `GetUserByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserByEmail(vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByEmailRef:
```typescript
const name = getUserByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetUserByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByEmail, GetUserByEmailVariables } from '@dataconnect/generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByEmail(getUserByEmailVars);
// Variables can be defined inline as well.
const { data } = await getUserByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByEmail(dataConnect, getUserByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByEmail(getUserByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByEmailRef, GetUserByEmailVariables } from '@dataconnect/generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmailRef()` function to get a reference to the query.
const ref = getUserByEmailRef(getUserByEmailVars);
// Variables can be defined inline as well.
const ref = getUserByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByEmailRef(dataConnect, getUserByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetUserById
You can execute the `GetUserById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserById(vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserById(dc: DataConnect, vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByIdRef:
```typescript
const name = getUserByIdRef.operationName;
console.log(name);
```

### Variables
The `GetUserById` query requires an argument of type `GetUserByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByIdVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserById, GetUserByIdVariables } from '@dataconnect/generated';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  userId: ..., 
};

// Call the `getUserById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserById(getUserByIdVars);
// Variables can be defined inline as well.
const { data } = await getUserById({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserById(dataConnect, getUserByIdVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserById(getUserByIdVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByIdRef, GetUserByIdVariables } from '@dataconnect/generated';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  userId: ..., 
};

// Call the `getUserByIdRef()` function to get a reference to the query.
const ref = getUserByIdRef(getUserByIdVars);
// Variables can be defined inline as well.
const ref = getUserByIdRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByIdRef(dataConnect, getUserByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListSubjects
You can execute the `ListSubjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSubjects(): QueryPromise<ListSubjectsData, undefined>;

interface ListSubjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSubjectsData, undefined>;
}
export const listSubjectsRef: ListSubjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSubjects(dc: DataConnect): QueryPromise<ListSubjectsData, undefined>;

interface ListSubjectsRef {
  ...
  (dc: DataConnect): QueryRef<ListSubjectsData, undefined>;
}
export const listSubjectsRef: ListSubjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSubjectsRef:
```typescript
const name = listSubjectsRef.operationName;
console.log(name);
```

### Variables
The `ListSubjects` query has no variables.
### Return Type
Recall that executing the `ListSubjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSubjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListSubjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSubjects } from '@dataconnect/generated';


// Call the `listSubjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSubjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSubjects(dataConnect);

console.log(data.subjects);

// Or, you can use the `Promise` API.
listSubjects().then((response) => {
  const data = response.data;
  console.log(data.subjects);
});
```

### Using `ListSubjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSubjectsRef } from '@dataconnect/generated';


// Call the `listSubjectsRef()` function to get a reference to the query.
const ref = listSubjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSubjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.subjects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.subjects);
});
```

## GetSubject
You can execute the `GetSubject` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSubject(vars: GetSubjectVariables): QueryPromise<GetSubjectData, GetSubjectVariables>;

interface GetSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSubjectVariables): QueryRef<GetSubjectData, GetSubjectVariables>;
}
export const getSubjectRef: GetSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSubject(dc: DataConnect, vars: GetSubjectVariables): QueryPromise<GetSubjectData, GetSubjectVariables>;

interface GetSubjectRef {
  ...
  (dc: DataConnect, vars: GetSubjectVariables): QueryRef<GetSubjectData, GetSubjectVariables>;
}
export const getSubjectRef: GetSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSubjectRef:
```typescript
const name = getSubjectRef.operationName;
console.log(name);
```

### Variables
The `GetSubject` query requires an argument of type `GetSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSubjectVariables {
  subjectId: UUIDString;
}
```
### Return Type
Recall that executing the `GetSubject` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSubjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSubject, GetSubjectVariables } from '@dataconnect/generated';

// The `GetSubject` query requires an argument of type `GetSubjectVariables`:
const getSubjectVars: GetSubjectVariables = {
  subjectId: ..., 
};

// Call the `getSubject()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSubject(getSubjectVars);
// Variables can be defined inline as well.
const { data } = await getSubject({ subjectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSubject(dataConnect, getSubjectVars);

console.log(data.subject);

// Or, you can use the `Promise` API.
getSubject(getSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject);
});
```

### Using `GetSubject`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSubjectRef, GetSubjectVariables } from '@dataconnect/generated';

// The `GetSubject` query requires an argument of type `GetSubjectVariables`:
const getSubjectVars: GetSubjectVariables = {
  subjectId: ..., 
};

// Call the `getSubjectRef()` function to get a reference to the query.
const ref = getSubjectRef(getSubjectVars);
// Variables can be defined inline as well.
const ref = getSubjectRef({ subjectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSubjectRef(dataConnect, getSubjectVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.subject);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.subject);
});
```

## ListUnits
You can execute the `ListUnits` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUnits(): QueryPromise<ListUnitsData, undefined>;

interface ListUnitsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUnitsData, undefined>;
}
export const listUnitsRef: ListUnitsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUnits(dc: DataConnect): QueryPromise<ListUnitsData, undefined>;

interface ListUnitsRef {
  ...
  (dc: DataConnect): QueryRef<ListUnitsData, undefined>;
}
export const listUnitsRef: ListUnitsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUnitsRef:
```typescript
const name = listUnitsRef.operationName;
console.log(name);
```

### Variables
The `ListUnits` query has no variables.
### Return Type
Recall that executing the `ListUnits` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUnitsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUnits`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUnits } from '@dataconnect/generated';


// Call the `listUnits()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUnits();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUnits(dataConnect);

console.log(data.units);

// Or, you can use the `Promise` API.
listUnits().then((response) => {
  const data = response.data;
  console.log(data.units);
});
```

### Using `ListUnits`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUnitsRef } from '@dataconnect/generated';


// Call the `listUnitsRef()` function to get a reference to the query.
const ref = listUnitsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUnitsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.units);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.units);
});
```

## GetUnit
You can execute the `GetUnit` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUnit(vars: GetUnitVariables): QueryPromise<GetUnitData, GetUnitVariables>;

interface GetUnitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUnitVariables): QueryRef<GetUnitData, GetUnitVariables>;
}
export const getUnitRef: GetUnitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUnit(dc: DataConnect, vars: GetUnitVariables): QueryPromise<GetUnitData, GetUnitVariables>;

interface GetUnitRef {
  ...
  (dc: DataConnect, vars: GetUnitVariables): QueryRef<GetUnitData, GetUnitVariables>;
}
export const getUnitRef: GetUnitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUnitRef:
```typescript
const name = getUnitRef.operationName;
console.log(name);
```

### Variables
The `GetUnit` query requires an argument of type `GetUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUnitVariables {
  unitId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUnit` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUnitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUnit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUnit, GetUnitVariables } from '@dataconnect/generated';

// The `GetUnit` query requires an argument of type `GetUnitVariables`:
const getUnitVars: GetUnitVariables = {
  unitId: ..., 
};

// Call the `getUnit()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUnit(getUnitVars);
// Variables can be defined inline as well.
const { data } = await getUnit({ unitId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUnit(dataConnect, getUnitVars);

console.log(data.unit);

// Or, you can use the `Promise` API.
getUnit(getUnitVars).then((response) => {
  const data = response.data;
  console.log(data.unit);
});
```

### Using `GetUnit`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUnitRef, GetUnitVariables } from '@dataconnect/generated';

// The `GetUnit` query requires an argument of type `GetUnitVariables`:
const getUnitVars: GetUnitVariables = {
  unitId: ..., 
};

// Call the `getUnitRef()` function to get a reference to the query.
const ref = getUnitRef(getUnitVars);
// Variables can be defined inline as well.
const ref = getUnitRef({ unitId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUnitRef(dataConnect, getUnitVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.unit);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.unit);
});
```

## ListTopics
You can execute the `ListTopics` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTopics(): QueryPromise<ListTopicsData, undefined>;

interface ListTopicsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTopicsData, undefined>;
}
export const listTopicsRef: ListTopicsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTopics(dc: DataConnect): QueryPromise<ListTopicsData, undefined>;

interface ListTopicsRef {
  ...
  (dc: DataConnect): QueryRef<ListTopicsData, undefined>;
}
export const listTopicsRef: ListTopicsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTopicsRef:
```typescript
const name = listTopicsRef.operationName;
console.log(name);
```

### Variables
The `ListTopics` query has no variables.
### Return Type
Recall that executing the `ListTopics` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTopicsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTopics`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTopics } from '@dataconnect/generated';


// Call the `listTopics()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTopics();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTopics(dataConnect);

console.log(data.topics);

// Or, you can use the `Promise` API.
listTopics().then((response) => {
  const data = response.data;
  console.log(data.topics);
});
```

### Using `ListTopics`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTopicsRef } from '@dataconnect/generated';


// Call the `listTopicsRef()` function to get a reference to the query.
const ref = listTopicsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTopicsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.topics);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.topics);
});
```

## GetTopic
You can execute the `GetTopic` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTopic(vars: GetTopicVariables): QueryPromise<GetTopicData, GetTopicVariables>;

interface GetTopicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTopicVariables): QueryRef<GetTopicData, GetTopicVariables>;
}
export const getTopicRef: GetTopicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTopic(dc: DataConnect, vars: GetTopicVariables): QueryPromise<GetTopicData, GetTopicVariables>;

interface GetTopicRef {
  ...
  (dc: DataConnect, vars: GetTopicVariables): QueryRef<GetTopicData, GetTopicVariables>;
}
export const getTopicRef: GetTopicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTopicRef:
```typescript
const name = getTopicRef.operationName;
console.log(name);
```

### Variables
The `GetTopic` query requires an argument of type `GetTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTopicVariables {
  topicId: UUIDString;
}
```
### Return Type
Recall that executing the `GetTopic` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTopicData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTopic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTopic, GetTopicVariables } from '@dataconnect/generated';

// The `GetTopic` query requires an argument of type `GetTopicVariables`:
const getTopicVars: GetTopicVariables = {
  topicId: ..., 
};

// Call the `getTopic()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTopic(getTopicVars);
// Variables can be defined inline as well.
const { data } = await getTopic({ topicId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTopic(dataConnect, getTopicVars);

console.log(data.topic);

// Or, you can use the `Promise` API.
getTopic(getTopicVars).then((response) => {
  const data = response.data;
  console.log(data.topic);
});
```

### Using `GetTopic`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTopicRef, GetTopicVariables } from '@dataconnect/generated';

// The `GetTopic` query requires an argument of type `GetTopicVariables`:
const getTopicVars: GetTopicVariables = {
  topicId: ..., 
};

// Call the `getTopicRef()` function to get a reference to the query.
const ref = getTopicRef(getTopicVars);
// Variables can be defined inline as well.
const ref = getTopicRef({ topicId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTopicRef(dataConnect, getTopicVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.topic);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.topic);
});
```

## ListLevelCategories
You can execute the `ListLevelCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listLevelCategories(): QueryPromise<ListLevelCategoriesData, undefined>;

interface ListLevelCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLevelCategoriesData, undefined>;
}
export const listLevelCategoriesRef: ListLevelCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listLevelCategories(dc: DataConnect): QueryPromise<ListLevelCategoriesData, undefined>;

interface ListLevelCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListLevelCategoriesData, undefined>;
}
export const listLevelCategoriesRef: ListLevelCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listLevelCategoriesRef:
```typescript
const name = listLevelCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListLevelCategories` query has no variables.
### Return Type
Recall that executing the `ListLevelCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListLevelCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListLevelCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listLevelCategories } from '@dataconnect/generated';


// Call the `listLevelCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listLevelCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listLevelCategories(dataConnect);

console.log(data.levelCategories);

// Or, you can use the `Promise` API.
listLevelCategories().then((response) => {
  const data = response.data;
  console.log(data.levelCategories);
});
```

### Using `ListLevelCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listLevelCategoriesRef } from '@dataconnect/generated';


// Call the `listLevelCategoriesRef()` function to get a reference to the query.
const ref = listLevelCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listLevelCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.levelCategories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.levelCategories);
});
```

## GetLevelCategory
You can execute the `GetLevelCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLevelCategory(vars: GetLevelCategoryVariables): QueryPromise<GetLevelCategoryData, GetLevelCategoryVariables>;

interface GetLevelCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLevelCategoryVariables): QueryRef<GetLevelCategoryData, GetLevelCategoryVariables>;
}
export const getLevelCategoryRef: GetLevelCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLevelCategory(dc: DataConnect, vars: GetLevelCategoryVariables): QueryPromise<GetLevelCategoryData, GetLevelCategoryVariables>;

interface GetLevelCategoryRef {
  ...
  (dc: DataConnect, vars: GetLevelCategoryVariables): QueryRef<GetLevelCategoryData, GetLevelCategoryVariables>;
}
export const getLevelCategoryRef: GetLevelCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLevelCategoryRef:
```typescript
const name = getLevelCategoryRef.operationName;
console.log(name);
```

### Variables
The `GetLevelCategory` query requires an argument of type `GetLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLevelCategoryVariables {
  categoryId: UUIDString;
}
```
### Return Type
Recall that executing the `GetLevelCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetLevelCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLevelCategory, GetLevelCategoryVariables } from '@dataconnect/generated';

// The `GetLevelCategory` query requires an argument of type `GetLevelCategoryVariables`:
const getLevelCategoryVars: GetLevelCategoryVariables = {
  categoryId: ..., 
};

// Call the `getLevelCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLevelCategory(getLevelCategoryVars);
// Variables can be defined inline as well.
const { data } = await getLevelCategory({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLevelCategory(dataConnect, getLevelCategoryVars);

console.log(data.levelCategory);

// Or, you can use the `Promise` API.
getLevelCategory(getLevelCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.levelCategory);
});
```

### Using `GetLevelCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLevelCategoryRef, GetLevelCategoryVariables } from '@dataconnect/generated';

// The `GetLevelCategory` query requires an argument of type `GetLevelCategoryVariables`:
const getLevelCategoryVars: GetLevelCategoryVariables = {
  categoryId: ..., 
};

// Call the `getLevelCategoryRef()` function to get a reference to the query.
const ref = getLevelCategoryRef(getLevelCategoryVars);
// Variables can be defined inline as well.
const ref = getLevelCategoryRef({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLevelCategoryRef(dataConnect, getLevelCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.levelCategory);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.levelCategory);
});
```

## ListEducationalLevels
You can execute the `ListEducationalLevels` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listEducationalLevels(): QueryPromise<ListEducationalLevelsData, undefined>;

interface ListEducationalLevelsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEducationalLevelsData, undefined>;
}
export const listEducationalLevelsRef: ListEducationalLevelsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listEducationalLevels(dc: DataConnect): QueryPromise<ListEducationalLevelsData, undefined>;

interface ListEducationalLevelsRef {
  ...
  (dc: DataConnect): QueryRef<ListEducationalLevelsData, undefined>;
}
export const listEducationalLevelsRef: ListEducationalLevelsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listEducationalLevelsRef:
```typescript
const name = listEducationalLevelsRef.operationName;
console.log(name);
```

### Variables
The `ListEducationalLevels` query has no variables.
### Return Type
Recall that executing the `ListEducationalLevels` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListEducationalLevelsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListEducationalLevels`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listEducationalLevels } from '@dataconnect/generated';


// Call the `listEducationalLevels()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listEducationalLevels();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listEducationalLevels(dataConnect);

console.log(data.educationalLevels);

// Or, you can use the `Promise` API.
listEducationalLevels().then((response) => {
  const data = response.data;
  console.log(data.educationalLevels);
});
```

### Using `ListEducationalLevels`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listEducationalLevelsRef } from '@dataconnect/generated';


// Call the `listEducationalLevelsRef()` function to get a reference to the query.
const ref = listEducationalLevelsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listEducationalLevelsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.educationalLevels);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.educationalLevels);
});
```

## GetEducationalLevel
You can execute the `GetEducationalLevel` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEducationalLevel(vars: GetEducationalLevelVariables): QueryPromise<GetEducationalLevelData, GetEducationalLevelVariables>;

interface GetEducationalLevelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEducationalLevelVariables): QueryRef<GetEducationalLevelData, GetEducationalLevelVariables>;
}
export const getEducationalLevelRef: GetEducationalLevelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEducationalLevel(dc: DataConnect, vars: GetEducationalLevelVariables): QueryPromise<GetEducationalLevelData, GetEducationalLevelVariables>;

interface GetEducationalLevelRef {
  ...
  (dc: DataConnect, vars: GetEducationalLevelVariables): QueryRef<GetEducationalLevelData, GetEducationalLevelVariables>;
}
export const getEducationalLevelRef: GetEducationalLevelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEducationalLevelRef:
```typescript
const name = getEducationalLevelRef.operationName;
console.log(name);
```

### Variables
The `GetEducationalLevel` query requires an argument of type `GetEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEducationalLevelVariables {
  levelId: UUIDString;
}
```
### Return Type
Recall that executing the `GetEducationalLevel` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetEducationalLevel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEducationalLevel, GetEducationalLevelVariables } from '@dataconnect/generated';

// The `GetEducationalLevel` query requires an argument of type `GetEducationalLevelVariables`:
const getEducationalLevelVars: GetEducationalLevelVariables = {
  levelId: ..., 
};

// Call the `getEducationalLevel()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEducationalLevel(getEducationalLevelVars);
// Variables can be defined inline as well.
const { data } = await getEducationalLevel({ levelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEducationalLevel(dataConnect, getEducationalLevelVars);

console.log(data.educationalLevel);

// Or, you can use the `Promise` API.
getEducationalLevel(getEducationalLevelVars).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel);
});
```

### Using `GetEducationalLevel`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEducationalLevelRef, GetEducationalLevelVariables } from '@dataconnect/generated';

// The `GetEducationalLevel` query requires an argument of type `GetEducationalLevelVariables`:
const getEducationalLevelVars: GetEducationalLevelVariables = {
  levelId: ..., 
};

// Call the `getEducationalLevelRef()` function to get a reference to the query.
const ref = getEducationalLevelRef(getEducationalLevelVars);
// Variables can be defined inline as well.
const ref = getEducationalLevelRef({ levelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEducationalLevelRef(dataConnect, getEducationalLevelVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.educationalLevel);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel);
});
```

## GetLevelsByCategory
You can execute the `GetLevelsByCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLevelsByCategory(vars: GetLevelsByCategoryVariables): QueryPromise<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;

interface GetLevelsByCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLevelsByCategoryVariables): QueryRef<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;
}
export const getLevelsByCategoryRef: GetLevelsByCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLevelsByCategory(dc: DataConnect, vars: GetLevelsByCategoryVariables): QueryPromise<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;

interface GetLevelsByCategoryRef {
  ...
  (dc: DataConnect, vars: GetLevelsByCategoryVariables): QueryRef<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;
}
export const getLevelsByCategoryRef: GetLevelsByCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLevelsByCategoryRef:
```typescript
const name = getLevelsByCategoryRef.operationName;
console.log(name);
```

### Variables
The `GetLevelsByCategory` query requires an argument of type `GetLevelsByCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLevelsByCategoryVariables {
  categoryId: UUIDString;
}
```
### Return Type
Recall that executing the `GetLevelsByCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLevelsByCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetLevelsByCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLevelsByCategory, GetLevelsByCategoryVariables } from '@dataconnect/generated';

// The `GetLevelsByCategory` query requires an argument of type `GetLevelsByCategoryVariables`:
const getLevelsByCategoryVars: GetLevelsByCategoryVariables = {
  categoryId: ..., 
};

// Call the `getLevelsByCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLevelsByCategory(getLevelsByCategoryVars);
// Variables can be defined inline as well.
const { data } = await getLevelsByCategory({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLevelsByCategory(dataConnect, getLevelsByCategoryVars);

console.log(data.educationalLevels);

// Or, you can use the `Promise` API.
getLevelsByCategory(getLevelsByCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.educationalLevels);
});
```

### Using `GetLevelsByCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLevelsByCategoryRef, GetLevelsByCategoryVariables } from '@dataconnect/generated';

// The `GetLevelsByCategory` query requires an argument of type `GetLevelsByCategoryVariables`:
const getLevelsByCategoryVars: GetLevelsByCategoryVariables = {
  categoryId: ..., 
};

// Call the `getLevelsByCategoryRef()` function to get a reference to the query.
const ref = getLevelsByCategoryRef(getLevelsByCategoryVars);
// Variables can be defined inline as well.
const ref = getLevelsByCategoryRef({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLevelsByCategoryRef(dataConnect, getLevelsByCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.educationalLevels);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.educationalLevels);
});
```

## ListCourses
You can execute the `ListCourses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCourses(vars: ListCoursesVariables): QueryPromise<ListCoursesData, ListCoursesVariables>;

interface ListCoursesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCoursesVariables): QueryRef<ListCoursesData, ListCoursesVariables>;
}
export const listCoursesRef: ListCoursesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCourses(dc: DataConnect, vars: ListCoursesVariables): QueryPromise<ListCoursesData, ListCoursesVariables>;

interface ListCoursesRef {
  ...
  (dc: DataConnect, vars: ListCoursesVariables): QueryRef<ListCoursesData, ListCoursesVariables>;
}
export const listCoursesRef: ListCoursesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCoursesRef:
```typescript
const name = listCoursesRef.operationName;
console.log(name);
```

### Variables
The `ListCourses` query requires an argument of type `ListCoursesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCoursesVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ListCourses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCoursesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListCourses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCourses, ListCoursesVariables } from '@dataconnect/generated';

// The `ListCourses` query requires an argument of type `ListCoursesVariables`:
const listCoursesVars: ListCoursesVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `listCourses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCourses(listCoursesVars);
// Variables can be defined inline as well.
const { data } = await listCourses({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCourses(dataConnect, listCoursesVars);

console.log(data.courses);

// Or, you can use the `Promise` API.
listCourses(listCoursesVars).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `ListCourses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCoursesRef, ListCoursesVariables } from '@dataconnect/generated';

// The `ListCourses` query requires an argument of type `ListCoursesVariables`:
const listCoursesVars: ListCoursesVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `listCoursesRef()` function to get a reference to the query.
const ref = listCoursesRef(listCoursesVars);
// Variables can be defined inline as well.
const ref = listCoursesRef({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCoursesRef(dataConnect, listCoursesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetCourse
You can execute the `GetCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourse(vars: GetCourseVariables): QueryPromise<GetCourseData, GetCourseVariables>;

interface GetCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
}
export const getCourseRef: GetCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourse(dc: DataConnect, vars: GetCourseVariables): QueryPromise<GetCourseData, GetCourseVariables>;

interface GetCourseRef {
  ...
  (dc: DataConnect, vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
}
export const getCourseRef: GetCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseRef:
```typescript
const name = getCourseRef.operationName;
console.log(name);
```

### Variables
The `GetCourse` query requires an argument of type `GetCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseVariables {
  courseId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourse, GetCourseVariables } from '@dataconnect/generated';

// The `GetCourse` query requires an argument of type `GetCourseVariables`:
const getCourseVars: GetCourseVariables = {
  courseId: ..., 
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourse(getCourseVars);
// Variables can be defined inline as well.
const { data } = await getCourse({ courseId: ..., userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourse(dataConnect, getCourseVars);

console.log(data.courses);

// Or, you can use the `Promise` API.
getCourse(getCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `GetCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseRef, GetCourseVariables } from '@dataconnect/generated';

// The `GetCourse` query requires an argument of type `GetCourseVariables`:
const getCourseVars: GetCourseVariables = {
  courseId: ..., 
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getCourseRef()` function to get a reference to the query.
const ref = getCourseRef(getCourseVars);
// Variables can be defined inline as well.
const ref = getCourseRef({ courseId: ..., userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseRef(dataConnect, getCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetCoursesByUser
You can execute the `GetCoursesByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCoursesByUser(vars: GetCoursesByUserVariables): QueryPromise<GetCoursesByUserData, GetCoursesByUserVariables>;

interface GetCoursesByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesByUserVariables): QueryRef<GetCoursesByUserData, GetCoursesByUserVariables>;
}
export const getCoursesByUserRef: GetCoursesByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCoursesByUser(dc: DataConnect, vars: GetCoursesByUserVariables): QueryPromise<GetCoursesByUserData, GetCoursesByUserVariables>;

interface GetCoursesByUserRef {
  ...
  (dc: DataConnect, vars: GetCoursesByUserVariables): QueryRef<GetCoursesByUserData, GetCoursesByUserVariables>;
}
export const getCoursesByUserRef: GetCoursesByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCoursesByUserRef:
```typescript
const name = getCoursesByUserRef.operationName;
console.log(name);
```

### Variables
The `GetCoursesByUser` query requires an argument of type `GetCoursesByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCoursesByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetCoursesByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCoursesByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCoursesByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCoursesByUser, GetCoursesByUserVariables } from '@dataconnect/generated';

// The `GetCoursesByUser` query requires an argument of type `GetCoursesByUserVariables`:
const getCoursesByUserVars: GetCoursesByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getCoursesByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCoursesByUser(getCoursesByUserVars);
// Variables can be defined inline as well.
const { data } = await getCoursesByUser({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCoursesByUser(dataConnect, getCoursesByUserVars);

console.log(data.courses);

// Or, you can use the `Promise` API.
getCoursesByUser(getCoursesByUserVars).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `GetCoursesByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCoursesByUserRef, GetCoursesByUserVariables } from '@dataconnect/generated';

// The `GetCoursesByUser` query requires an argument of type `GetCoursesByUserVariables`:
const getCoursesByUserVars: GetCoursesByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getCoursesByUserRef()` function to get a reference to the query.
const ref = getCoursesByUserRef(getCoursesByUserVars);
// Variables can be defined inline as well.
const ref = getCoursesByUserRef({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCoursesByUserRef(dataConnect, getCoursesByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetCoursesByLevel
You can execute the `GetCoursesByLevel` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCoursesByLevel(vars: GetCoursesByLevelVariables): QueryPromise<GetCoursesByLevelData, GetCoursesByLevelVariables>;

interface GetCoursesByLevelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesByLevelVariables): QueryRef<GetCoursesByLevelData, GetCoursesByLevelVariables>;
}
export const getCoursesByLevelRef: GetCoursesByLevelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCoursesByLevel(dc: DataConnect, vars: GetCoursesByLevelVariables): QueryPromise<GetCoursesByLevelData, GetCoursesByLevelVariables>;

interface GetCoursesByLevelRef {
  ...
  (dc: DataConnect, vars: GetCoursesByLevelVariables): QueryRef<GetCoursesByLevelData, GetCoursesByLevelVariables>;
}
export const getCoursesByLevelRef: GetCoursesByLevelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCoursesByLevelRef:
```typescript
const name = getCoursesByLevelRef.operationName;
console.log(name);
```

### Variables
The `GetCoursesByLevel` query requires an argument of type `GetCoursesByLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCoursesByLevelVariables {
  userId: UUIDString;
  levelId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetCoursesByLevel` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCoursesByLevelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCoursesByLevel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCoursesByLevel, GetCoursesByLevelVariables } from '@dataconnect/generated';

// The `GetCoursesByLevel` query requires an argument of type `GetCoursesByLevelVariables`:
const getCoursesByLevelVars: GetCoursesByLevelVariables = {
  userId: ..., 
  levelId: ..., 
  firebaseId: ..., 
};

// Call the `getCoursesByLevel()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCoursesByLevel(getCoursesByLevelVars);
// Variables can be defined inline as well.
const { data } = await getCoursesByLevel({ userId: ..., levelId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCoursesByLevel(dataConnect, getCoursesByLevelVars);

console.log(data.courses);

// Or, you can use the `Promise` API.
getCoursesByLevel(getCoursesByLevelVars).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `GetCoursesByLevel`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCoursesByLevelRef, GetCoursesByLevelVariables } from '@dataconnect/generated';

// The `GetCoursesByLevel` query requires an argument of type `GetCoursesByLevelVariables`:
const getCoursesByLevelVars: GetCoursesByLevelVariables = {
  userId: ..., 
  levelId: ..., 
  firebaseId: ..., 
};

// Call the `getCoursesByLevelRef()` function to get a reference to the query.
const ref = getCoursesByLevelRef(getCoursesByLevelVars);
// Variables can be defined inline as well.
const ref = getCoursesByLevelRef({ userId: ..., levelId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCoursesByLevelRef(dataConnect, getCoursesByLevelVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## ListDifficulties
You can execute the `ListDifficulties` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDifficulties(): QueryPromise<ListDifficultiesData, undefined>;

interface ListDifficultiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDifficultiesData, undefined>;
}
export const listDifficultiesRef: ListDifficultiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDifficulties(dc: DataConnect): QueryPromise<ListDifficultiesData, undefined>;

interface ListDifficultiesRef {
  ...
  (dc: DataConnect): QueryRef<ListDifficultiesData, undefined>;
}
export const listDifficultiesRef: ListDifficultiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDifficultiesRef:
```typescript
const name = listDifficultiesRef.operationName;
console.log(name);
```

### Variables
The `ListDifficulties` query has no variables.
### Return Type
Recall that executing the `ListDifficulties` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDifficultiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListDifficulties`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDifficulties } from '@dataconnect/generated';


// Call the `listDifficulties()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDifficulties();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDifficulties(dataConnect);

console.log(data.difficulties);

// Or, you can use the `Promise` API.
listDifficulties().then((response) => {
  const data = response.data;
  console.log(data.difficulties);
});
```

### Using `ListDifficulties`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDifficultiesRef } from '@dataconnect/generated';


// Call the `listDifficultiesRef()` function to get a reference to the query.
const ref = listDifficultiesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDifficultiesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.difficulties);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.difficulties);
});
```

## GetDifficulty
You can execute the `GetDifficulty` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDifficulty(vars: GetDifficultyVariables): QueryPromise<GetDifficultyData, GetDifficultyVariables>;

interface GetDifficultyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDifficultyVariables): QueryRef<GetDifficultyData, GetDifficultyVariables>;
}
export const getDifficultyRef: GetDifficultyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDifficulty(dc: DataConnect, vars: GetDifficultyVariables): QueryPromise<GetDifficultyData, GetDifficultyVariables>;

interface GetDifficultyRef {
  ...
  (dc: DataConnect, vars: GetDifficultyVariables): QueryRef<GetDifficultyData, GetDifficultyVariables>;
}
export const getDifficultyRef: GetDifficultyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDifficultyRef:
```typescript
const name = getDifficultyRef.operationName;
console.log(name);
```

### Variables
The `GetDifficulty` query requires an argument of type `GetDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDifficultyVariables {
  difficultyId: UUIDString;
}
```
### Return Type
Recall that executing the `GetDifficulty` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDifficulty`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDifficulty, GetDifficultyVariables } from '@dataconnect/generated';

// The `GetDifficulty` query requires an argument of type `GetDifficultyVariables`:
const getDifficultyVars: GetDifficultyVariables = {
  difficultyId: ..., 
};

// Call the `getDifficulty()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDifficulty(getDifficultyVars);
// Variables can be defined inline as well.
const { data } = await getDifficulty({ difficultyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDifficulty(dataConnect, getDifficultyVars);

console.log(data.difficulty);

// Or, you can use the `Promise` API.
getDifficulty(getDifficultyVars).then((response) => {
  const data = response.data;
  console.log(data.difficulty);
});
```

### Using `GetDifficulty`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDifficultyRef, GetDifficultyVariables } from '@dataconnect/generated';

// The `GetDifficulty` query requires an argument of type `GetDifficultyVariables`:
const getDifficultyVars: GetDifficultyVariables = {
  difficultyId: ..., 
};

// Call the `getDifficultyRef()` function to get a reference to the query.
const ref = getDifficultyRef(getDifficultyVars);
// Variables can be defined inline as well.
const ref = getDifficultyRef({ difficultyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDifficultyRef(dataConnect, getDifficultyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.difficulty);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.difficulty);
});
```

## ListQuestionTypes
You can execute the `ListQuestionTypes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listQuestionTypes(): QueryPromise<ListQuestionTypesData, undefined>;

interface ListQuestionTypesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuestionTypesData, undefined>;
}
export const listQuestionTypesRef: ListQuestionTypesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuestionTypes(dc: DataConnect): QueryPromise<ListQuestionTypesData, undefined>;

interface ListQuestionTypesRef {
  ...
  (dc: DataConnect): QueryRef<ListQuestionTypesData, undefined>;
}
export const listQuestionTypesRef: ListQuestionTypesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuestionTypesRef:
```typescript
const name = listQuestionTypesRef.operationName;
console.log(name);
```

### Variables
The `ListQuestionTypes` query has no variables.
### Return Type
Recall that executing the `ListQuestionTypes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuestionTypesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListQuestionTypes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuestionTypes } from '@dataconnect/generated';


// Call the `listQuestionTypes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuestionTypes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuestionTypes(dataConnect);

console.log(data.questionTypes);

// Or, you can use the `Promise` API.
listQuestionTypes().then((response) => {
  const data = response.data;
  console.log(data.questionTypes);
});
```

### Using `ListQuestionTypes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuestionTypesRef } from '@dataconnect/generated';


// Call the `listQuestionTypesRef()` function to get a reference to the query.
const ref = listQuestionTypesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuestionTypesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questionTypes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questionTypes);
});
```

## GetQuestionType
You can execute the `GetQuestionType` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuestionType(vars: GetQuestionTypeVariables): QueryPromise<GetQuestionTypeData, GetQuestionTypeVariables>;

interface GetQuestionTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionTypeVariables): QueryRef<GetQuestionTypeData, GetQuestionTypeVariables>;
}
export const getQuestionTypeRef: GetQuestionTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuestionType(dc: DataConnect, vars: GetQuestionTypeVariables): QueryPromise<GetQuestionTypeData, GetQuestionTypeVariables>;

interface GetQuestionTypeRef {
  ...
  (dc: DataConnect, vars: GetQuestionTypeVariables): QueryRef<GetQuestionTypeData, GetQuestionTypeVariables>;
}
export const getQuestionTypeRef: GetQuestionTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuestionTypeRef:
```typescript
const name = getQuestionTypeRef.operationName;
console.log(name);
```

### Variables
The `GetQuestionType` query requires an argument of type `GetQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuestionTypeVariables {
  questionTypeId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuestionType` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetQuestionType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuestionType, GetQuestionTypeVariables } from '@dataconnect/generated';

// The `GetQuestionType` query requires an argument of type `GetQuestionTypeVariables`:
const getQuestionTypeVars: GetQuestionTypeVariables = {
  questionTypeId: ..., 
};

// Call the `getQuestionType()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuestionType(getQuestionTypeVars);
// Variables can be defined inline as well.
const { data } = await getQuestionType({ questionTypeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuestionType(dataConnect, getQuestionTypeVars);

console.log(data.questionType);

// Or, you can use the `Promise` API.
getQuestionType(getQuestionTypeVars).then((response) => {
  const data = response.data;
  console.log(data.questionType);
});
```

### Using `GetQuestionType`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuestionTypeRef, GetQuestionTypeVariables } from '@dataconnect/generated';

// The `GetQuestionType` query requires an argument of type `GetQuestionTypeVariables`:
const getQuestionTypeVars: GetQuestionTypeVariables = {
  questionTypeId: ..., 
};

// Call the `getQuestionTypeRef()` function to get a reference to the query.
const ref = getQuestionTypeRef(getQuestionTypeVars);
// Variables can be defined inline as well.
const ref = getQuestionTypeRef({ questionTypeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuestionTypeRef(dataConnect, getQuestionTypeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questionType);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questionType);
});
```

## GetQuestionTypeByCode
You can execute the `GetQuestionTypeByCode` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuestionTypeByCode(vars: GetQuestionTypeByCodeVariables): QueryPromise<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;

interface GetQuestionTypeByCodeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionTypeByCodeVariables): QueryRef<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;
}
export const getQuestionTypeByCodeRef: GetQuestionTypeByCodeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuestionTypeByCode(dc: DataConnect, vars: GetQuestionTypeByCodeVariables): QueryPromise<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;

interface GetQuestionTypeByCodeRef {
  ...
  (dc: DataConnect, vars: GetQuestionTypeByCodeVariables): QueryRef<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;
}
export const getQuestionTypeByCodeRef: GetQuestionTypeByCodeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuestionTypeByCodeRef:
```typescript
const name = getQuestionTypeByCodeRef.operationName;
console.log(name);
```

### Variables
The `GetQuestionTypeByCode` query requires an argument of type `GetQuestionTypeByCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuestionTypeByCodeVariables {
  code: string;
}
```
### Return Type
Recall that executing the `GetQuestionTypeByCode` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuestionTypeByCodeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetQuestionTypeByCode`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuestionTypeByCode, GetQuestionTypeByCodeVariables } from '@dataconnect/generated';

// The `GetQuestionTypeByCode` query requires an argument of type `GetQuestionTypeByCodeVariables`:
const getQuestionTypeByCodeVars: GetQuestionTypeByCodeVariables = {
  code: ..., 
};

// Call the `getQuestionTypeByCode()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuestionTypeByCode(getQuestionTypeByCodeVars);
// Variables can be defined inline as well.
const { data } = await getQuestionTypeByCode({ code: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuestionTypeByCode(dataConnect, getQuestionTypeByCodeVars);

console.log(data.questionTypes);

// Or, you can use the `Promise` API.
getQuestionTypeByCode(getQuestionTypeByCodeVars).then((response) => {
  const data = response.data;
  console.log(data.questionTypes);
});
```

### Using `GetQuestionTypeByCode`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuestionTypeByCodeRef, GetQuestionTypeByCodeVariables } from '@dataconnect/generated';

// The `GetQuestionTypeByCode` query requires an argument of type `GetQuestionTypeByCodeVariables`:
const getQuestionTypeByCodeVars: GetQuestionTypeByCodeVariables = {
  code: ..., 
};

// Call the `getQuestionTypeByCodeRef()` function to get a reference to the query.
const ref = getQuestionTypeByCodeRef(getQuestionTypeByCodeVars);
// Variables can be defined inline as well.
const ref = getQuestionTypeByCodeRef({ code: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuestionTypeByCodeRef(dataConnect, getQuestionTypeByCodeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questionTypes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questionTypes);
});
```

## ListTaxonomies
You can execute the `ListTaxonomies` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTaxonomies(): QueryPromise<ListTaxonomiesData, undefined>;

interface ListTaxonomiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTaxonomiesData, undefined>;
}
export const listTaxonomiesRef: ListTaxonomiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTaxonomies(dc: DataConnect): QueryPromise<ListTaxonomiesData, undefined>;

interface ListTaxonomiesRef {
  ...
  (dc: DataConnect): QueryRef<ListTaxonomiesData, undefined>;
}
export const listTaxonomiesRef: ListTaxonomiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTaxonomiesRef:
```typescript
const name = listTaxonomiesRef.operationName;
console.log(name);
```

### Variables
The `ListTaxonomies` query has no variables.
### Return Type
Recall that executing the `ListTaxonomies` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTaxonomiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTaxonomies`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTaxonomies } from '@dataconnect/generated';


// Call the `listTaxonomies()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTaxonomies();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTaxonomies(dataConnect);

console.log(data.taxonomies);

// Or, you can use the `Promise` API.
listTaxonomies().then((response) => {
  const data = response.data;
  console.log(data.taxonomies);
});
```

### Using `ListTaxonomies`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTaxonomiesRef } from '@dataconnect/generated';


// Call the `listTaxonomiesRef()` function to get a reference to the query.
const ref = listTaxonomiesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTaxonomiesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.taxonomies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.taxonomies);
});
```

## GetTaxonomy
You can execute the `GetTaxonomy` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTaxonomy(vars: GetTaxonomyVariables): QueryPromise<GetTaxonomyData, GetTaxonomyVariables>;

interface GetTaxonomyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTaxonomyVariables): QueryRef<GetTaxonomyData, GetTaxonomyVariables>;
}
export const getTaxonomyRef: GetTaxonomyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTaxonomy(dc: DataConnect, vars: GetTaxonomyVariables): QueryPromise<GetTaxonomyData, GetTaxonomyVariables>;

interface GetTaxonomyRef {
  ...
  (dc: DataConnect, vars: GetTaxonomyVariables): QueryRef<GetTaxonomyData, GetTaxonomyVariables>;
}
export const getTaxonomyRef: GetTaxonomyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTaxonomyRef:
```typescript
const name = getTaxonomyRef.operationName;
console.log(name);
```

### Variables
The `GetTaxonomy` query requires an argument of type `GetTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTaxonomyVariables {
  taxonomyId: UUIDString;
}
```
### Return Type
Recall that executing the `GetTaxonomy` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTaxonomy`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTaxonomy, GetTaxonomyVariables } from '@dataconnect/generated';

// The `GetTaxonomy` query requires an argument of type `GetTaxonomyVariables`:
const getTaxonomyVars: GetTaxonomyVariables = {
  taxonomyId: ..., 
};

// Call the `getTaxonomy()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTaxonomy(getTaxonomyVars);
// Variables can be defined inline as well.
const { data } = await getTaxonomy({ taxonomyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTaxonomy(dataConnect, getTaxonomyVars);

console.log(data.taxonomy);

// Or, you can use the `Promise` API.
getTaxonomy(getTaxonomyVars).then((response) => {
  const data = response.data;
  console.log(data.taxonomy);
});
```

### Using `GetTaxonomy`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTaxonomyRef, GetTaxonomyVariables } from '@dataconnect/generated';

// The `GetTaxonomy` query requires an argument of type `GetTaxonomyVariables`:
const getTaxonomyVars: GetTaxonomyVariables = {
  taxonomyId: ..., 
};

// Call the `getTaxonomyRef()` function to get a reference to the query.
const ref = getTaxonomyRef(getTaxonomyVars);
// Variables can be defined inline as well.
const ref = getTaxonomyRef({ taxonomyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTaxonomyRef(dataConnect, getTaxonomyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.taxonomy);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.taxonomy);
});
```

## GetTaxonomyByCode
You can execute the `GetTaxonomyByCode` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTaxonomyByCode(vars: GetTaxonomyByCodeVariables): QueryPromise<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;

interface GetTaxonomyByCodeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTaxonomyByCodeVariables): QueryRef<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;
}
export const getTaxonomyByCodeRef: GetTaxonomyByCodeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTaxonomyByCode(dc: DataConnect, vars: GetTaxonomyByCodeVariables): QueryPromise<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;

interface GetTaxonomyByCodeRef {
  ...
  (dc: DataConnect, vars: GetTaxonomyByCodeVariables): QueryRef<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;
}
export const getTaxonomyByCodeRef: GetTaxonomyByCodeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTaxonomyByCodeRef:
```typescript
const name = getTaxonomyByCodeRef.operationName;
console.log(name);
```

### Variables
The `GetTaxonomyByCode` query requires an argument of type `GetTaxonomyByCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTaxonomyByCodeVariables {
  code: string;
}
```
### Return Type
Recall that executing the `GetTaxonomyByCode` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTaxonomyByCodeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTaxonomyByCode`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTaxonomyByCode, GetTaxonomyByCodeVariables } from '@dataconnect/generated';

// The `GetTaxonomyByCode` query requires an argument of type `GetTaxonomyByCodeVariables`:
const getTaxonomyByCodeVars: GetTaxonomyByCodeVariables = {
  code: ..., 
};

// Call the `getTaxonomyByCode()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTaxonomyByCode(getTaxonomyByCodeVars);
// Variables can be defined inline as well.
const { data } = await getTaxonomyByCode({ code: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTaxonomyByCode(dataConnect, getTaxonomyByCodeVars);

console.log(data.taxonomies);

// Or, you can use the `Promise` API.
getTaxonomyByCode(getTaxonomyByCodeVars).then((response) => {
  const data = response.data;
  console.log(data.taxonomies);
});
```

### Using `GetTaxonomyByCode`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTaxonomyByCodeRef, GetTaxonomyByCodeVariables } from '@dataconnect/generated';

// The `GetTaxonomyByCode` query requires an argument of type `GetTaxonomyByCodeVariables`:
const getTaxonomyByCodeVars: GetTaxonomyByCodeVariables = {
  code: ..., 
};

// Call the `getTaxonomyByCodeRef()` function to get a reference to the query.
const ref = getTaxonomyByCodeRef(getTaxonomyByCodeVars);
// Variables can be defined inline as well.
const ref = getTaxonomyByCodeRef({ code: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTaxonomyByCodeRef(dataConnect, getTaxonomyByCodeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.taxonomies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.taxonomies);
});
```

## ListTaxonomiesByLevel
You can execute the `ListTaxonomiesByLevel` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTaxonomiesByLevel(): QueryPromise<ListTaxonomiesByLevelData, undefined>;

interface ListTaxonomiesByLevelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTaxonomiesByLevelData, undefined>;
}
export const listTaxonomiesByLevelRef: ListTaxonomiesByLevelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTaxonomiesByLevel(dc: DataConnect): QueryPromise<ListTaxonomiesByLevelData, undefined>;

interface ListTaxonomiesByLevelRef {
  ...
  (dc: DataConnect): QueryRef<ListTaxonomiesByLevelData, undefined>;
}
export const listTaxonomiesByLevelRef: ListTaxonomiesByLevelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTaxonomiesByLevelRef:
```typescript
const name = listTaxonomiesByLevelRef.operationName;
console.log(name);
```

### Variables
The `ListTaxonomiesByLevel` query has no variables.
### Return Type
Recall that executing the `ListTaxonomiesByLevel` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTaxonomiesByLevelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTaxonomiesByLevel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTaxonomiesByLevel } from '@dataconnect/generated';


// Call the `listTaxonomiesByLevel()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTaxonomiesByLevel();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTaxonomiesByLevel(dataConnect);

console.log(data.taxonomies);

// Or, you can use the `Promise` API.
listTaxonomiesByLevel().then((response) => {
  const data = response.data;
  console.log(data.taxonomies);
});
```

### Using `ListTaxonomiesByLevel`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTaxonomiesByLevelRef } from '@dataconnect/generated';


// Call the `listTaxonomiesByLevelRef()` function to get a reference to the query.
const ref = listTaxonomiesByLevelRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTaxonomiesByLevelRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.taxonomies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.taxonomies);
});
```

## ListQuestionsByUser
You can execute the `ListQuestionsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listQuestionsByUser(vars: ListQuestionsByUserVariables): QueryPromise<ListQuestionsByUserData, ListQuestionsByUserVariables>;

interface ListQuestionsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListQuestionsByUserVariables): QueryRef<ListQuestionsByUserData, ListQuestionsByUserVariables>;
}
export const listQuestionsByUserRef: ListQuestionsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuestionsByUser(dc: DataConnect, vars: ListQuestionsByUserVariables): QueryPromise<ListQuestionsByUserData, ListQuestionsByUserVariables>;

interface ListQuestionsByUserRef {
  ...
  (dc: DataConnect, vars: ListQuestionsByUserVariables): QueryRef<ListQuestionsByUserData, ListQuestionsByUserVariables>;
}
export const listQuestionsByUserRef: ListQuestionsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuestionsByUserRef:
```typescript
const name = listQuestionsByUserRef.operationName;
console.log(name);
```

### Variables
The `ListQuestionsByUser` query requires an argument of type `ListQuestionsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListQuestionsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ListQuestionsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuestionsByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListQuestionsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuestionsByUser, ListQuestionsByUserVariables } from '@dataconnect/generated';

// The `ListQuestionsByUser` query requires an argument of type `ListQuestionsByUserVariables`:
const listQuestionsByUserVars: ListQuestionsByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `listQuestionsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuestionsByUser(listQuestionsByUserVars);
// Variables can be defined inline as well.
const { data } = await listQuestionsByUser({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuestionsByUser(dataConnect, listQuestionsByUserVars);

console.log(data.questions);

// Or, you can use the `Promise` API.
listQuestionsByUser(listQuestionsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

### Using `ListQuestionsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuestionsByUserRef, ListQuestionsByUserVariables } from '@dataconnect/generated';

// The `ListQuestionsByUser` query requires an argument of type `ListQuestionsByUserVariables`:
const listQuestionsByUserVars: ListQuestionsByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `listQuestionsByUserRef()` function to get a reference to the query.
const ref = listQuestionsByUserRef(listQuestionsByUserVars);
// Variables can be defined inline as well.
const ref = listQuestionsByUserRef({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuestionsByUserRef(dataConnect, listQuestionsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

## GetDashboardQuestions
You can execute the `GetDashboardQuestions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDashboardQuestions(vars: GetDashboardQuestionsVariables): QueryPromise<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;

interface GetDashboardQuestionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDashboardQuestionsVariables): QueryRef<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;
}
export const getDashboardQuestionsRef: GetDashboardQuestionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDashboardQuestions(dc: DataConnect, vars: GetDashboardQuestionsVariables): QueryPromise<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;

interface GetDashboardQuestionsRef {
  ...
  (dc: DataConnect, vars: GetDashboardQuestionsVariables): QueryRef<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;
}
export const getDashboardQuestionsRef: GetDashboardQuestionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDashboardQuestionsRef:
```typescript
const name = getDashboardQuestionsRef.operationName;
console.log(name);
```

### Variables
The `GetDashboardQuestions` query requires an argument of type `GetDashboardQuestionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDashboardQuestionsVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetDashboardQuestions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDashboardQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDashboardQuestions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDashboardQuestions, GetDashboardQuestionsVariables } from '@dataconnect/generated';

// The `GetDashboardQuestions` query requires an argument of type `GetDashboardQuestionsVariables`:
const getDashboardQuestionsVars: GetDashboardQuestionsVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getDashboardQuestions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDashboardQuestions(getDashboardQuestionsVars);
// Variables can be defined inline as well.
const { data } = await getDashboardQuestions({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDashboardQuestions(dataConnect, getDashboardQuestionsVars);

console.log(data.questions);

// Or, you can use the `Promise` API.
getDashboardQuestions(getDashboardQuestionsVars).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

### Using `GetDashboardQuestions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDashboardQuestionsRef, GetDashboardQuestionsVariables } from '@dataconnect/generated';

// The `GetDashboardQuestions` query requires an argument of type `GetDashboardQuestionsVariables`:
const getDashboardQuestionsVars: GetDashboardQuestionsVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getDashboardQuestionsRef()` function to get a reference to the query.
const ref = getDashboardQuestionsRef(getDashboardQuestionsVars);
// Variables can be defined inline as well.
const ref = getDashboardQuestionsRef({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDashboardQuestionsRef(dataConnect, getDashboardQuestionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

## GetDashboardSystemData
You can execute the `GetDashboardSystemData` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDashboardSystemData(): QueryPromise<GetDashboardSystemDataData, undefined>;

interface GetDashboardSystemDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDashboardSystemDataData, undefined>;
}
export const getDashboardSystemDataRef: GetDashboardSystemDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDashboardSystemData(dc: DataConnect): QueryPromise<GetDashboardSystemDataData, undefined>;

interface GetDashboardSystemDataRef {
  ...
  (dc: DataConnect): QueryRef<GetDashboardSystemDataData, undefined>;
}
export const getDashboardSystemDataRef: GetDashboardSystemDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDashboardSystemDataRef:
```typescript
const name = getDashboardSystemDataRef.operationName;
console.log(name);
```

### Variables
The `GetDashboardSystemData` query has no variables.
### Return Type
Recall that executing the `GetDashboardSystemData` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDashboardSystemDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDashboardSystemData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDashboardSystemData } from '@dataconnect/generated';


// Call the `getDashboardSystemData()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDashboardSystemData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDashboardSystemData(dataConnect);

console.log(data.taxonomies);
console.log(data.difficulties);
console.log(data.questionTypes);
console.log(data.subjects);
console.log(data.units);
console.log(data.topics);

// Or, you can use the `Promise` API.
getDashboardSystemData().then((response) => {
  const data = response.data;
  console.log(data.taxonomies);
  console.log(data.difficulties);
  console.log(data.questionTypes);
  console.log(data.subjects);
  console.log(data.units);
  console.log(data.topics);
});
```

### Using `GetDashboardSystemData`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDashboardSystemDataRef } from '@dataconnect/generated';


// Call the `getDashboardSystemDataRef()` function to get a reference to the query.
const ref = getDashboardSystemDataRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDashboardSystemDataRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.taxonomies);
console.log(data.difficulties);
console.log(data.questionTypes);
console.log(data.subjects);
console.log(data.units);
console.log(data.topics);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.taxonomies);
  console.log(data.difficulties);
  console.log(data.questionTypes);
  console.log(data.subjects);
  console.log(data.units);
  console.log(data.topics);
});
```

## GetQuestion
You can execute the `GetQuestion` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuestion(vars: GetQuestionVariables): QueryPromise<GetQuestionData, GetQuestionVariables>;

interface GetQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionVariables): QueryRef<GetQuestionData, GetQuestionVariables>;
}
export const getQuestionRef: GetQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuestion(dc: DataConnect, vars: GetQuestionVariables): QueryPromise<GetQuestionData, GetQuestionVariables>;

interface GetQuestionRef {
  ...
  (dc: DataConnect, vars: GetQuestionVariables): QueryRef<GetQuestionData, GetQuestionVariables>;
}
export const getQuestionRef: GetQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuestionRef:
```typescript
const name = getQuestionRef.operationName;
console.log(name);
```

### Variables
The `GetQuestion` query requires an argument of type `GetQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuestionVariables {
  questionId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetQuestion` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuestion, GetQuestionVariables } from '@dataconnect/generated';

// The `GetQuestion` query requires an argument of type `GetQuestionVariables`:
const getQuestionVars: GetQuestionVariables = {
  questionId: ..., 
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getQuestion()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuestion(getQuestionVars);
// Variables can be defined inline as well.
const { data } = await getQuestion({ questionId: ..., userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuestion(dataConnect, getQuestionVars);

console.log(data.questions);
console.log(data.questionOptions);

// Or, you can use the `Promise` API.
getQuestion(getQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.questions);
  console.log(data.questionOptions);
});
```

### Using `GetQuestion`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuestionRef, GetQuestionVariables } from '@dataconnect/generated';

// The `GetQuestion` query requires an argument of type `GetQuestionVariables`:
const getQuestionVars: GetQuestionVariables = {
  questionId: ..., 
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getQuestionRef()` function to get a reference to the query.
const ref = getQuestionRef(getQuestionVars);
// Variables can be defined inline as well.
const ref = getQuestionRef({ questionId: ..., userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuestionRef(dataConnect, getQuestionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questions);
console.log(data.questionOptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questions);
  console.log(data.questionOptions);
});
```

## ListPublicQuestions
You can execute the `ListPublicQuestions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPublicQuestions(): QueryPromise<ListPublicQuestionsData, undefined>;

interface ListPublicQuestionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicQuestionsData, undefined>;
}
export const listPublicQuestionsRef: ListPublicQuestionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPublicQuestions(dc: DataConnect): QueryPromise<ListPublicQuestionsData, undefined>;

interface ListPublicQuestionsRef {
  ...
  (dc: DataConnect): QueryRef<ListPublicQuestionsData, undefined>;
}
export const listPublicQuestionsRef: ListPublicQuestionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPublicQuestionsRef:
```typescript
const name = listPublicQuestionsRef.operationName;
console.log(name);
```

### Variables
The `ListPublicQuestions` query has no variables.
### Return Type
Recall that executing the `ListPublicQuestions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPublicQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListPublicQuestions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPublicQuestions } from '@dataconnect/generated';


// Call the `listPublicQuestions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPublicQuestions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPublicQuestions(dataConnect);

console.log(data.questions);

// Or, you can use the `Promise` API.
listPublicQuestions().then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

### Using `ListPublicQuestions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPublicQuestionsRef } from '@dataconnect/generated';


// Call the `listPublicQuestionsRef()` function to get a reference to the query.
const ref = listPublicQuestionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPublicQuestionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

## ListPublicQuestionsByDifficulty
You can execute the `ListPublicQuestionsByDifficulty` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPublicQuestionsByDifficulty(vars: ListPublicQuestionsByDifficultyVariables): QueryPromise<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;

interface ListPublicQuestionsByDifficultyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPublicQuestionsByDifficultyVariables): QueryRef<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;
}
export const listPublicQuestionsByDifficultyRef: ListPublicQuestionsByDifficultyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPublicQuestionsByDifficulty(dc: DataConnect, vars: ListPublicQuestionsByDifficultyVariables): QueryPromise<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;

interface ListPublicQuestionsByDifficultyRef {
  ...
  (dc: DataConnect, vars: ListPublicQuestionsByDifficultyVariables): QueryRef<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;
}
export const listPublicQuestionsByDifficultyRef: ListPublicQuestionsByDifficultyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPublicQuestionsByDifficultyRef:
```typescript
const name = listPublicQuestionsByDifficultyRef.operationName;
console.log(name);
```

### Variables
The `ListPublicQuestionsByDifficulty` query requires an argument of type `ListPublicQuestionsByDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListPublicQuestionsByDifficultyVariables {
  difficultyId: UUIDString;
}
```
### Return Type
Recall that executing the `ListPublicQuestionsByDifficulty` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPublicQuestionsByDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListPublicQuestionsByDifficulty`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPublicQuestionsByDifficulty, ListPublicQuestionsByDifficultyVariables } from '@dataconnect/generated';

// The `ListPublicQuestionsByDifficulty` query requires an argument of type `ListPublicQuestionsByDifficultyVariables`:
const listPublicQuestionsByDifficultyVars: ListPublicQuestionsByDifficultyVariables = {
  difficultyId: ..., 
};

// Call the `listPublicQuestionsByDifficulty()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPublicQuestionsByDifficulty(listPublicQuestionsByDifficultyVars);
// Variables can be defined inline as well.
const { data } = await listPublicQuestionsByDifficulty({ difficultyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPublicQuestionsByDifficulty(dataConnect, listPublicQuestionsByDifficultyVars);

console.log(data.questions);

// Or, you can use the `Promise` API.
listPublicQuestionsByDifficulty(listPublicQuestionsByDifficultyVars).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

### Using `ListPublicQuestionsByDifficulty`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPublicQuestionsByDifficultyRef, ListPublicQuestionsByDifficultyVariables } from '@dataconnect/generated';

// The `ListPublicQuestionsByDifficulty` query requires an argument of type `ListPublicQuestionsByDifficultyVariables`:
const listPublicQuestionsByDifficultyVars: ListPublicQuestionsByDifficultyVariables = {
  difficultyId: ..., 
};

// Call the `listPublicQuestionsByDifficultyRef()` function to get a reference to the query.
const ref = listPublicQuestionsByDifficultyRef(listPublicQuestionsByDifficultyVars);
// Variables can be defined inline as well.
const ref = listPublicQuestionsByDifficultyRef({ difficultyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPublicQuestionsByDifficultyRef(dataConnect, listPublicQuestionsByDifficultyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

## ListPublicQuestionsByType
You can execute the `ListPublicQuestionsByType` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPublicQuestionsByType(vars: ListPublicQuestionsByTypeVariables): QueryPromise<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;

interface ListPublicQuestionsByTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPublicQuestionsByTypeVariables): QueryRef<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;
}
export const listPublicQuestionsByTypeRef: ListPublicQuestionsByTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPublicQuestionsByType(dc: DataConnect, vars: ListPublicQuestionsByTypeVariables): QueryPromise<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;

interface ListPublicQuestionsByTypeRef {
  ...
  (dc: DataConnect, vars: ListPublicQuestionsByTypeVariables): QueryRef<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;
}
export const listPublicQuestionsByTypeRef: ListPublicQuestionsByTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPublicQuestionsByTypeRef:
```typescript
const name = listPublicQuestionsByTypeRef.operationName;
console.log(name);
```

### Variables
The `ListPublicQuestionsByType` query requires an argument of type `ListPublicQuestionsByTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListPublicQuestionsByTypeVariables {
  questionTypeId: UUIDString;
}
```
### Return Type
Recall that executing the `ListPublicQuestionsByType` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPublicQuestionsByTypeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListPublicQuestionsByType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPublicQuestionsByType, ListPublicQuestionsByTypeVariables } from '@dataconnect/generated';

// The `ListPublicQuestionsByType` query requires an argument of type `ListPublicQuestionsByTypeVariables`:
const listPublicQuestionsByTypeVars: ListPublicQuestionsByTypeVariables = {
  questionTypeId: ..., 
};

// Call the `listPublicQuestionsByType()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPublicQuestionsByType(listPublicQuestionsByTypeVars);
// Variables can be defined inline as well.
const { data } = await listPublicQuestionsByType({ questionTypeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPublicQuestionsByType(dataConnect, listPublicQuestionsByTypeVars);

console.log(data.questions);

// Or, you can use the `Promise` API.
listPublicQuestionsByType(listPublicQuestionsByTypeVars).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

### Using `ListPublicQuestionsByType`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPublicQuestionsByTypeRef, ListPublicQuestionsByTypeVariables } from '@dataconnect/generated';

// The `ListPublicQuestionsByType` query requires an argument of type `ListPublicQuestionsByTypeVariables`:
const listPublicQuestionsByTypeVars: ListPublicQuestionsByTypeVariables = {
  questionTypeId: ..., 
};

// Call the `listPublicQuestionsByTypeRef()` function to get a reference to the query.
const ref = listPublicQuestionsByTypeRef(listPublicQuestionsByTypeVars);
// Variables can be defined inline as well.
const ref = listPublicQuestionsByTypeRef({ questionTypeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPublicQuestionsByTypeRef(dataConnect, listPublicQuestionsByTypeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

## GetQuestionOptions
You can execute the `GetQuestionOptions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuestionOptions(vars: GetQuestionOptionsVariables): QueryPromise<GetQuestionOptionsData, GetQuestionOptionsVariables>;

interface GetQuestionOptionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionOptionsVariables): QueryRef<GetQuestionOptionsData, GetQuestionOptionsVariables>;
}
export const getQuestionOptionsRef: GetQuestionOptionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuestionOptions(dc: DataConnect, vars: GetQuestionOptionsVariables): QueryPromise<GetQuestionOptionsData, GetQuestionOptionsVariables>;

interface GetQuestionOptionsRef {
  ...
  (dc: DataConnect, vars: GetQuestionOptionsVariables): QueryRef<GetQuestionOptionsData, GetQuestionOptionsVariables>;
}
export const getQuestionOptionsRef: GetQuestionOptionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuestionOptionsRef:
```typescript
const name = getQuestionOptionsRef.operationName;
console.log(name);
```

### Variables
The `GetQuestionOptions` query requires an argument of type `GetQuestionOptionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuestionOptionsVariables {
  questionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuestionOptions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuestionOptionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetQuestionOptions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuestionOptions, GetQuestionOptionsVariables } from '@dataconnect/generated';

// The `GetQuestionOptions` query requires an argument of type `GetQuestionOptionsVariables`:
const getQuestionOptionsVars: GetQuestionOptionsVariables = {
  questionId: ..., 
};

// Call the `getQuestionOptions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuestionOptions(getQuestionOptionsVars);
// Variables can be defined inline as well.
const { data } = await getQuestionOptions({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuestionOptions(dataConnect, getQuestionOptionsVars);

console.log(data.questionOptions);

// Or, you can use the `Promise` API.
getQuestionOptions(getQuestionOptionsVars).then((response) => {
  const data = response.data;
  console.log(data.questionOptions);
});
```

### Using `GetQuestionOptions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuestionOptionsRef, GetQuestionOptionsVariables } from '@dataconnect/generated';

// The `GetQuestionOptions` query requires an argument of type `GetQuestionOptionsVariables`:
const getQuestionOptionsVars: GetQuestionOptionsVariables = {
  questionId: ..., 
};

// Call the `getQuestionOptionsRef()` function to get a reference to the query.
const ref = getQuestionOptionsRef(getQuestionOptionsVars);
// Variables can be defined inline as well.
const ref = getQuestionOptionsRef({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuestionOptionsRef(dataConnect, getQuestionOptionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questionOptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questionOptions);
});
```

## GetAllCoursesByUser
You can execute the `GetAllCoursesByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAllCoursesByUser(vars: GetAllCoursesByUserVariables): QueryPromise<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;

interface GetAllCoursesByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllCoursesByUserVariables): QueryRef<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;
}
export const getAllCoursesByUserRef: GetAllCoursesByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllCoursesByUser(dc: DataConnect, vars: GetAllCoursesByUserVariables): QueryPromise<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;

interface GetAllCoursesByUserRef {
  ...
  (dc: DataConnect, vars: GetAllCoursesByUserVariables): QueryRef<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;
}
export const getAllCoursesByUserRef: GetAllCoursesByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllCoursesByUserRef:
```typescript
const name = getAllCoursesByUserRef.operationName;
console.log(name);
```

### Variables
The `GetAllCoursesByUser` query requires an argument of type `GetAllCoursesByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAllCoursesByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetAllCoursesByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllCoursesByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAllCoursesByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllCoursesByUser, GetAllCoursesByUserVariables } from '@dataconnect/generated';

// The `GetAllCoursesByUser` query requires an argument of type `GetAllCoursesByUserVariables`:
const getAllCoursesByUserVars: GetAllCoursesByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getAllCoursesByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllCoursesByUser(getAllCoursesByUserVars);
// Variables can be defined inline as well.
const { data } = await getAllCoursesByUser({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllCoursesByUser(dataConnect, getAllCoursesByUserVars);

console.log(data.courses);

// Or, you can use the `Promise` API.
getAllCoursesByUser(getAllCoursesByUserVars).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `GetAllCoursesByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllCoursesByUserRef, GetAllCoursesByUserVariables } from '@dataconnect/generated';

// The `GetAllCoursesByUser` query requires an argument of type `GetAllCoursesByUserVariables`:
const getAllCoursesByUserVars: GetAllCoursesByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getAllCoursesByUserRef()` function to get a reference to the query.
const ref = getAllCoursesByUserRef(getAllCoursesByUserVars);
// Variables can be defined inline as well.
const ref = getAllCoursesByUserRef({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllCoursesByUserRef(dataConnect, getAllCoursesByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetCourseByCode
You can execute the `GetCourseByCode` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseByCode(vars: GetCourseByCodeVariables): QueryPromise<GetCourseByCodeData, GetCourseByCodeVariables>;

interface GetCourseByCodeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseByCodeVariables): QueryRef<GetCourseByCodeData, GetCourseByCodeVariables>;
}
export const getCourseByCodeRef: GetCourseByCodeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseByCode(dc: DataConnect, vars: GetCourseByCodeVariables): QueryPromise<GetCourseByCodeData, GetCourseByCodeVariables>;

interface GetCourseByCodeRef {
  ...
  (dc: DataConnect, vars: GetCourseByCodeVariables): QueryRef<GetCourseByCodeData, GetCourseByCodeVariables>;
}
export const getCourseByCodeRef: GetCourseByCodeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseByCodeRef:
```typescript
const name = getCourseByCodeRef.operationName;
console.log(name);
```

### Variables
The `GetCourseByCode` query requires an argument of type `GetCourseByCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseByCodeVariables {
  userId: UUIDString;
  code: string;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetCourseByCode` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseByCodeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCourseByCode`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseByCode, GetCourseByCodeVariables } from '@dataconnect/generated';

// The `GetCourseByCode` query requires an argument of type `GetCourseByCodeVariables`:
const getCourseByCodeVars: GetCourseByCodeVariables = {
  userId: ..., 
  code: ..., 
  firebaseId: ..., 
};

// Call the `getCourseByCode()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseByCode(getCourseByCodeVars);
// Variables can be defined inline as well.
const { data } = await getCourseByCode({ userId: ..., code: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseByCode(dataConnect, getCourseByCodeVars);

console.log(data.courses);

// Or, you can use the `Promise` API.
getCourseByCode(getCourseByCodeVars).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `GetCourseByCode`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseByCodeRef, GetCourseByCodeVariables } from '@dataconnect/generated';

// The `GetCourseByCode` query requires an argument of type `GetCourseByCodeVariables`:
const getCourseByCodeVars: GetCourseByCodeVariables = {
  userId: ..., 
  code: ..., 
  firebaseId: ..., 
};

// Call the `getCourseByCodeRef()` function to get a reference to the query.
const ref = getCourseByCodeRef(getCourseByCodeVars);
// Variables can be defined inline as well.
const ref = getCourseByCodeRef({ userId: ..., code: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseByCodeRef(dataConnect, getCourseByCodeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetCoursesByInstitution
You can execute the `GetCoursesByInstitution` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCoursesByInstitution(vars: GetCoursesByInstitutionVariables): QueryPromise<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;

interface GetCoursesByInstitutionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesByInstitutionVariables): QueryRef<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;
}
export const getCoursesByInstitutionRef: GetCoursesByInstitutionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCoursesByInstitution(dc: DataConnect, vars: GetCoursesByInstitutionVariables): QueryPromise<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;

interface GetCoursesByInstitutionRef {
  ...
  (dc: DataConnect, vars: GetCoursesByInstitutionVariables): QueryRef<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;
}
export const getCoursesByInstitutionRef: GetCoursesByInstitutionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCoursesByInstitutionRef:
```typescript
const name = getCoursesByInstitutionRef.operationName;
console.log(name);
```

### Variables
The `GetCoursesByInstitution` query requires an argument of type `GetCoursesByInstitutionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCoursesByInstitutionVariables {
  userId: UUIDString;
  institutionName: string;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetCoursesByInstitution` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCoursesByInstitutionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCoursesByInstitution`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCoursesByInstitution, GetCoursesByInstitutionVariables } from '@dataconnect/generated';

// The `GetCoursesByInstitution` query requires an argument of type `GetCoursesByInstitutionVariables`:
const getCoursesByInstitutionVars: GetCoursesByInstitutionVariables = {
  userId: ..., 
  institutionName: ..., 
  firebaseId: ..., 
};

// Call the `getCoursesByInstitution()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCoursesByInstitution(getCoursesByInstitutionVars);
// Variables can be defined inline as well.
const { data } = await getCoursesByInstitution({ userId: ..., institutionName: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCoursesByInstitution(dataConnect, getCoursesByInstitutionVars);

console.log(data.courses);

// Or, you can use the `Promise` API.
getCoursesByInstitution(getCoursesByInstitutionVars).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `GetCoursesByInstitution`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCoursesByInstitutionRef, GetCoursesByInstitutionVariables } from '@dataconnect/generated';

// The `GetCoursesByInstitution` query requires an argument of type `GetCoursesByInstitutionVariables`:
const getCoursesByInstitutionVars: GetCoursesByInstitutionVariables = {
  userId: ..., 
  institutionName: ..., 
  firebaseId: ..., 
};

// Call the `getCoursesByInstitutionRef()` function to get a reference to the query.
const ref = getCoursesByInstitutionRef(getCoursesByInstitutionVars);
// Variables can be defined inline as well.
const ref = getCoursesByInstitutionRef({ userId: ..., institutionName: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCoursesByInstitutionRef(dataConnect, getCoursesByInstitutionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetCoursesByEducationalLevel
You can execute the `GetCoursesByEducationalLevel` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCoursesByEducationalLevel(vars: GetCoursesByEducationalLevelVariables): QueryPromise<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;

interface GetCoursesByEducationalLevelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesByEducationalLevelVariables): QueryRef<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;
}
export const getCoursesByEducationalLevelRef: GetCoursesByEducationalLevelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCoursesByEducationalLevel(dc: DataConnect, vars: GetCoursesByEducationalLevelVariables): QueryPromise<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;

interface GetCoursesByEducationalLevelRef {
  ...
  (dc: DataConnect, vars: GetCoursesByEducationalLevelVariables): QueryRef<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;
}
export const getCoursesByEducationalLevelRef: GetCoursesByEducationalLevelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCoursesByEducationalLevelRef:
```typescript
const name = getCoursesByEducationalLevelRef.operationName;
console.log(name);
```

### Variables
The `GetCoursesByEducationalLevel` query requires an argument of type `GetCoursesByEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCoursesByEducationalLevelVariables {
  userId: UUIDString;
  levelId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetCoursesByEducationalLevel` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCoursesByEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCoursesByEducationalLevel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCoursesByEducationalLevel, GetCoursesByEducationalLevelVariables } from '@dataconnect/generated';

// The `GetCoursesByEducationalLevel` query requires an argument of type `GetCoursesByEducationalLevelVariables`:
const getCoursesByEducationalLevelVars: GetCoursesByEducationalLevelVariables = {
  userId: ..., 
  levelId: ..., 
  firebaseId: ..., 
};

// Call the `getCoursesByEducationalLevel()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCoursesByEducationalLevel(getCoursesByEducationalLevelVars);
// Variables can be defined inline as well.
const { data } = await getCoursesByEducationalLevel({ userId: ..., levelId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCoursesByEducationalLevel(dataConnect, getCoursesByEducationalLevelVars);

console.log(data.courses);

// Or, you can use the `Promise` API.
getCoursesByEducationalLevel(getCoursesByEducationalLevelVars).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `GetCoursesByEducationalLevel`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCoursesByEducationalLevelRef, GetCoursesByEducationalLevelVariables } from '@dataconnect/generated';

// The `GetCoursesByEducationalLevel` query requires an argument of type `GetCoursesByEducationalLevelVariables`:
const getCoursesByEducationalLevelVars: GetCoursesByEducationalLevelVariables = {
  userId: ..., 
  levelId: ..., 
  firebaseId: ..., 
};

// Call the `getCoursesByEducationalLevelRef()` function to get a reference to the query.
const ref = getCoursesByEducationalLevelRef(getCoursesByEducationalLevelVars);
// Variables can be defined inline as well.
const ref = getCoursesByEducationalLevelRef({ userId: ..., levelId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCoursesByEducationalLevelRef(dataConnect, getCoursesByEducationalLevelVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetEvaluationById
You can execute the `GetEvaluationById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEvaluationById(vars: GetEvaluationByIdVariables): QueryPromise<GetEvaluationByIdData, GetEvaluationByIdVariables>;

interface GetEvaluationByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationByIdVariables): QueryRef<GetEvaluationByIdData, GetEvaluationByIdVariables>;
}
export const getEvaluationByIdRef: GetEvaluationByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEvaluationById(dc: DataConnect, vars: GetEvaluationByIdVariables): QueryPromise<GetEvaluationByIdData, GetEvaluationByIdVariables>;

interface GetEvaluationByIdRef {
  ...
  (dc: DataConnect, vars: GetEvaluationByIdVariables): QueryRef<GetEvaluationByIdData, GetEvaluationByIdVariables>;
}
export const getEvaluationByIdRef: GetEvaluationByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEvaluationByIdRef:
```typescript
const name = getEvaluationByIdRef.operationName;
console.log(name);
```

### Variables
The `GetEvaluationById` query requires an argument of type `GetEvaluationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEvaluationByIdVariables {
  userId: UUIDString;
  evaluationId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetEvaluationById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEvaluationByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetEvaluationById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEvaluationById, GetEvaluationByIdVariables } from '@dataconnect/generated';

// The `GetEvaluationById` query requires an argument of type `GetEvaluationByIdVariables`:
const getEvaluationByIdVars: GetEvaluationByIdVariables = {
  userId: ..., 
  evaluationId: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEvaluationById(getEvaluationByIdVars);
// Variables can be defined inline as well.
const { data } = await getEvaluationById({ userId: ..., evaluationId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEvaluationById(dataConnect, getEvaluationByIdVars);

console.log(data.evaluations);
console.log(data.evaluationQuestions);

// Or, you can use the `Promise` API.
getEvaluationById(getEvaluationByIdVars).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
  console.log(data.evaluationQuestions);
});
```

### Using `GetEvaluationById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEvaluationByIdRef, GetEvaluationByIdVariables } from '@dataconnect/generated';

// The `GetEvaluationById` query requires an argument of type `GetEvaluationByIdVariables`:
const getEvaluationByIdVars: GetEvaluationByIdVariables = {
  userId: ..., 
  evaluationId: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationByIdRef()` function to get a reference to the query.
const ref = getEvaluationByIdRef(getEvaluationByIdVars);
// Variables can be defined inline as well.
const ref = getEvaluationByIdRef({ userId: ..., evaluationId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEvaluationByIdRef(dataConnect, getEvaluationByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.evaluations);
console.log(data.evaluationQuestions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
  console.log(data.evaluationQuestions);
});
```

## GetAllEvaluationsByUser
You can execute the `GetAllEvaluationsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAllEvaluationsByUser(vars: GetAllEvaluationsByUserVariables): QueryPromise<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;

interface GetAllEvaluationsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllEvaluationsByUserVariables): QueryRef<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;
}
export const getAllEvaluationsByUserRef: GetAllEvaluationsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllEvaluationsByUser(dc: DataConnect, vars: GetAllEvaluationsByUserVariables): QueryPromise<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;

interface GetAllEvaluationsByUserRef {
  ...
  (dc: DataConnect, vars: GetAllEvaluationsByUserVariables): QueryRef<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;
}
export const getAllEvaluationsByUserRef: GetAllEvaluationsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllEvaluationsByUserRef:
```typescript
const name = getAllEvaluationsByUserRef.operationName;
console.log(name);
```

### Variables
The `GetAllEvaluationsByUser` query requires an argument of type `GetAllEvaluationsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAllEvaluationsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetAllEvaluationsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllEvaluationsByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAllEvaluationsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllEvaluationsByUser, GetAllEvaluationsByUserVariables } from '@dataconnect/generated';

// The `GetAllEvaluationsByUser` query requires an argument of type `GetAllEvaluationsByUserVariables`:
const getAllEvaluationsByUserVars: GetAllEvaluationsByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getAllEvaluationsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllEvaluationsByUser(getAllEvaluationsByUserVars);
// Variables can be defined inline as well.
const { data } = await getAllEvaluationsByUser({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllEvaluationsByUser(dataConnect, getAllEvaluationsByUserVars);

console.log(data.evaluations);

// Or, you can use the `Promise` API.
getAllEvaluationsByUser(getAllEvaluationsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
});
```

### Using `GetAllEvaluationsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllEvaluationsByUserRef, GetAllEvaluationsByUserVariables } from '@dataconnect/generated';

// The `GetAllEvaluationsByUser` query requires an argument of type `GetAllEvaluationsByUserVariables`:
const getAllEvaluationsByUserVars: GetAllEvaluationsByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getAllEvaluationsByUserRef()` function to get a reference to the query.
const ref = getAllEvaluationsByUserRef(getAllEvaluationsByUserVars);
// Variables can be defined inline as well.
const ref = getAllEvaluationsByUserRef({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllEvaluationsByUserRef(dataConnect, getAllEvaluationsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.evaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
});
```

## GetEvaluationsByState
You can execute the `GetEvaluationsByState` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEvaluationsByState(vars: GetEvaluationsByStateVariables): QueryPromise<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;

interface GetEvaluationsByStateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationsByStateVariables): QueryRef<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;
}
export const getEvaluationsByStateRef: GetEvaluationsByStateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEvaluationsByState(dc: DataConnect, vars: GetEvaluationsByStateVariables): QueryPromise<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;

interface GetEvaluationsByStateRef {
  ...
  (dc: DataConnect, vars: GetEvaluationsByStateVariables): QueryRef<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;
}
export const getEvaluationsByStateRef: GetEvaluationsByStateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEvaluationsByStateRef:
```typescript
const name = getEvaluationsByStateRef.operationName;
console.log(name);
```

### Variables
The `GetEvaluationsByState` query requires an argument of type `GetEvaluationsByStateVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEvaluationsByStateVariables {
  userId: UUIDString;
  state: string;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetEvaluationsByState` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEvaluationsByStateData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetEvaluationsByState`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEvaluationsByState, GetEvaluationsByStateVariables } from '@dataconnect/generated';

// The `GetEvaluationsByState` query requires an argument of type `GetEvaluationsByStateVariables`:
const getEvaluationsByStateVars: GetEvaluationsByStateVariables = {
  userId: ..., 
  state: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationsByState()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEvaluationsByState(getEvaluationsByStateVars);
// Variables can be defined inline as well.
const { data } = await getEvaluationsByState({ userId: ..., state: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEvaluationsByState(dataConnect, getEvaluationsByStateVars);

console.log(data.evaluations);

// Or, you can use the `Promise` API.
getEvaluationsByState(getEvaluationsByStateVars).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
});
```

### Using `GetEvaluationsByState`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEvaluationsByStateRef, GetEvaluationsByStateVariables } from '@dataconnect/generated';

// The `GetEvaluationsByState` query requires an argument of type `GetEvaluationsByStateVariables`:
const getEvaluationsByStateVars: GetEvaluationsByStateVariables = {
  userId: ..., 
  state: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationsByStateRef()` function to get a reference to the query.
const ref = getEvaluationsByStateRef(getEvaluationsByStateVars);
// Variables can be defined inline as well.
const ref = getEvaluationsByStateRef({ userId: ..., state: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEvaluationsByStateRef(dataConnect, getEvaluationsByStateVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.evaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
});
```

## GetEvaluationsBySubject
You can execute the `GetEvaluationsBySubject` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEvaluationsBySubject(vars: GetEvaluationsBySubjectVariables): QueryPromise<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;

interface GetEvaluationsBySubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationsBySubjectVariables): QueryRef<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;
}
export const getEvaluationsBySubjectRef: GetEvaluationsBySubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEvaluationsBySubject(dc: DataConnect, vars: GetEvaluationsBySubjectVariables): QueryPromise<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;

interface GetEvaluationsBySubjectRef {
  ...
  (dc: DataConnect, vars: GetEvaluationsBySubjectVariables): QueryRef<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;
}
export const getEvaluationsBySubjectRef: GetEvaluationsBySubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEvaluationsBySubjectRef:
```typescript
const name = getEvaluationsBySubjectRef.operationName;
console.log(name);
```

### Variables
The `GetEvaluationsBySubject` query requires an argument of type `GetEvaluationsBySubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEvaluationsBySubjectVariables {
  userId: UUIDString;
  subjectId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetEvaluationsBySubject` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEvaluationsBySubjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetEvaluationsBySubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEvaluationsBySubject, GetEvaluationsBySubjectVariables } from '@dataconnect/generated';

// The `GetEvaluationsBySubject` query requires an argument of type `GetEvaluationsBySubjectVariables`:
const getEvaluationsBySubjectVars: GetEvaluationsBySubjectVariables = {
  userId: ..., 
  subjectId: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationsBySubject()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEvaluationsBySubject(getEvaluationsBySubjectVars);
// Variables can be defined inline as well.
const { data } = await getEvaluationsBySubject({ userId: ..., subjectId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEvaluationsBySubject(dataConnect, getEvaluationsBySubjectVars);

console.log(data.evaluations);

// Or, you can use the `Promise` API.
getEvaluationsBySubject(getEvaluationsBySubjectVars).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
});
```

### Using `GetEvaluationsBySubject`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEvaluationsBySubjectRef, GetEvaluationsBySubjectVariables } from '@dataconnect/generated';

// The `GetEvaluationsBySubject` query requires an argument of type `GetEvaluationsBySubjectVariables`:
const getEvaluationsBySubjectVars: GetEvaluationsBySubjectVariables = {
  userId: ..., 
  subjectId: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationsBySubjectRef()` function to get a reference to the query.
const ref = getEvaluationsBySubjectRef(getEvaluationsBySubjectVars);
// Variables can be defined inline as well.
const ref = getEvaluationsBySubjectRef({ userId: ..., subjectId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEvaluationsBySubjectRef(dataConnect, getEvaluationsBySubjectVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.evaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
});
```

## GetEvaluationsByCourse
You can execute the `GetEvaluationsByCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEvaluationsByCourse(vars: GetEvaluationsByCourseVariables): QueryPromise<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;

interface GetEvaluationsByCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationsByCourseVariables): QueryRef<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;
}
export const getEvaluationsByCourseRef: GetEvaluationsByCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEvaluationsByCourse(dc: DataConnect, vars: GetEvaluationsByCourseVariables): QueryPromise<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;

interface GetEvaluationsByCourseRef {
  ...
  (dc: DataConnect, vars: GetEvaluationsByCourseVariables): QueryRef<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;
}
export const getEvaluationsByCourseRef: GetEvaluationsByCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEvaluationsByCourseRef:
```typescript
const name = getEvaluationsByCourseRef.operationName;
console.log(name);
```

### Variables
The `GetEvaluationsByCourse` query requires an argument of type `GetEvaluationsByCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEvaluationsByCourseVariables {
  userId: UUIDString;
  courseId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetEvaluationsByCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEvaluationsByCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEvaluationsByCourseData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
}
```
### Using `GetEvaluationsByCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEvaluationsByCourse, GetEvaluationsByCourseVariables } from '@dataconnect/generated';

// The `GetEvaluationsByCourse` query requires an argument of type `GetEvaluationsByCourseVariables`:
const getEvaluationsByCourseVars: GetEvaluationsByCourseVariables = {
  userId: ..., 
  courseId: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationsByCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEvaluationsByCourse(getEvaluationsByCourseVars);
// Variables can be defined inline as well.
const { data } = await getEvaluationsByCourse({ userId: ..., courseId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEvaluationsByCourse(dataConnect, getEvaluationsByCourseVars);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
getEvaluationsByCourse(getEvaluationsByCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

### Using `GetEvaluationsByCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEvaluationsByCourseRef, GetEvaluationsByCourseVariables } from '@dataconnect/generated';

// The `GetEvaluationsByCourse` query requires an argument of type `GetEvaluationsByCourseVariables`:
const getEvaluationsByCourseVars: GetEvaluationsByCourseVariables = {
  userId: ..., 
  courseId: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationsByCourseRef()` function to get a reference to the query.
const ref = getEvaluationsByCourseRef(getEvaluationsByCourseVars);
// Variables can be defined inline as well.
const ref = getEvaluationsByCourseRef({ userId: ..., courseId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEvaluationsByCourseRef(dataConnect, getEvaluationsByCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

## GetEvaluationFullDetail
You can execute the `GetEvaluationFullDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEvaluationFullDetail(vars: GetEvaluationFullDetailVariables): QueryPromise<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;

interface GetEvaluationFullDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationFullDetailVariables): QueryRef<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;
}
export const getEvaluationFullDetailRef: GetEvaluationFullDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEvaluationFullDetail(dc: DataConnect, vars: GetEvaluationFullDetailVariables): QueryPromise<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;

interface GetEvaluationFullDetailRef {
  ...
  (dc: DataConnect, vars: GetEvaluationFullDetailVariables): QueryRef<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;
}
export const getEvaluationFullDetailRef: GetEvaluationFullDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEvaluationFullDetailRef:
```typescript
const name = getEvaluationFullDetailRef.operationName;
console.log(name);
```

### Variables
The `GetEvaluationFullDetail` query requires an argument of type `GetEvaluationFullDetailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEvaluationFullDetailVariables {
  userId: UUIDString;
  evaluationId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetEvaluationFullDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEvaluationFullDetailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetEvaluationFullDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEvaluationFullDetail, GetEvaluationFullDetailVariables } from '@dataconnect/generated';

// The `GetEvaluationFullDetail` query requires an argument of type `GetEvaluationFullDetailVariables`:
const getEvaluationFullDetailVars: GetEvaluationFullDetailVariables = {
  userId: ..., 
  evaluationId: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationFullDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEvaluationFullDetail(getEvaluationFullDetailVars);
// Variables can be defined inline as well.
const { data } = await getEvaluationFullDetail({ userId: ..., evaluationId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEvaluationFullDetail(dataConnect, getEvaluationFullDetailVars);

console.log(data.evaluations);
console.log(data.evaluationQuestions);

// Or, you can use the `Promise` API.
getEvaluationFullDetail(getEvaluationFullDetailVars).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
  console.log(data.evaluationQuestions);
});
```

### Using `GetEvaluationFullDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEvaluationFullDetailRef, GetEvaluationFullDetailVariables } from '@dataconnect/generated';

// The `GetEvaluationFullDetail` query requires an argument of type `GetEvaluationFullDetailVariables`:
const getEvaluationFullDetailVars: GetEvaluationFullDetailVariables = {
  userId: ..., 
  evaluationId: ..., 
  firebaseId: ..., 
};

// Call the `getEvaluationFullDetailRef()` function to get a reference to the query.
const ref = getEvaluationFullDetailRef(getEvaluationFullDetailVars);
// Variables can be defined inline as well.
const ref = getEvaluationFullDetailRef({ userId: ..., evaluationId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEvaluationFullDetailRef(dataConnect, getEvaluationFullDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.evaluations);
console.log(data.evaluationQuestions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluations);
  console.log(data.evaluationQuestions);
});
```

## GetEvaluationQuestions
You can execute the `GetEvaluationQuestions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEvaluationQuestions(vars: GetEvaluationQuestionsVariables): QueryPromise<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;

interface GetEvaluationQuestionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationQuestionsVariables): QueryRef<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;
}
export const getEvaluationQuestionsRef: GetEvaluationQuestionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEvaluationQuestions(dc: DataConnect, vars: GetEvaluationQuestionsVariables): QueryPromise<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;

interface GetEvaluationQuestionsRef {
  ...
  (dc: DataConnect, vars: GetEvaluationQuestionsVariables): QueryRef<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;
}
export const getEvaluationQuestionsRef: GetEvaluationQuestionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEvaluationQuestionsRef:
```typescript
const name = getEvaluationQuestionsRef.operationName;
console.log(name);
```

### Variables
The `GetEvaluationQuestions` query requires an argument of type `GetEvaluationQuestionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEvaluationQuestionsVariables {
  evaluationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetEvaluationQuestions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEvaluationQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEvaluationQuestionsData {
  evaluationQuestions: ({
    evaluationQuestionId: UUIDString;
    evaluationId: UUIDString;
    questionId: UUIDString;
    points: number;
    position: number;
  } & EvaluationQuestion_Key)[];
}
```
### Using `GetEvaluationQuestions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEvaluationQuestions, GetEvaluationQuestionsVariables } from '@dataconnect/generated';

// The `GetEvaluationQuestions` query requires an argument of type `GetEvaluationQuestionsVariables`:
const getEvaluationQuestionsVars: GetEvaluationQuestionsVariables = {
  evaluationId: ..., 
};

// Call the `getEvaluationQuestions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEvaluationQuestions(getEvaluationQuestionsVars);
// Variables can be defined inline as well.
const { data } = await getEvaluationQuestions({ evaluationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEvaluationQuestions(dataConnect, getEvaluationQuestionsVars);

console.log(data.evaluationQuestions);

// Or, you can use the `Promise` API.
getEvaluationQuestions(getEvaluationQuestionsVars).then((response) => {
  const data = response.data;
  console.log(data.evaluationQuestions);
});
```

### Using `GetEvaluationQuestions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEvaluationQuestionsRef, GetEvaluationQuestionsVariables } from '@dataconnect/generated';

// The `GetEvaluationQuestions` query requires an argument of type `GetEvaluationQuestionsVariables`:
const getEvaluationQuestionsVars: GetEvaluationQuestionsVariables = {
  evaluationId: ..., 
};

// Call the `getEvaluationQuestionsRef()` function to get a reference to the query.
const ref = getEvaluationQuestionsRef(getEvaluationQuestionsVars);
// Variables can be defined inline as well.
const ref = getEvaluationQuestionsRef({ evaluationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEvaluationQuestionsRef(dataConnect, getEvaluationQuestionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.evaluationQuestions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluationQuestions);
});
```

## GetAllStudentsByUser
You can execute the `GetAllStudentsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAllStudentsByUser(vars: GetAllStudentsByUserVariables): QueryPromise<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;

interface GetAllStudentsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllStudentsByUserVariables): QueryRef<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;
}
export const getAllStudentsByUserRef: GetAllStudentsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllStudentsByUser(dc: DataConnect, vars: GetAllStudentsByUserVariables): QueryPromise<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;

interface GetAllStudentsByUserRef {
  ...
  (dc: DataConnect, vars: GetAllStudentsByUserVariables): QueryRef<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;
}
export const getAllStudentsByUserRef: GetAllStudentsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllStudentsByUserRef:
```typescript
const name = getAllStudentsByUserRef.operationName;
console.log(name);
```

### Variables
The `GetAllStudentsByUser` query requires an argument of type `GetAllStudentsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAllStudentsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetAllStudentsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllStudentsByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAllStudentsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllStudentsByUser, GetAllStudentsByUserVariables } from '@dataconnect/generated';

// The `GetAllStudentsByUser` query requires an argument of type `GetAllStudentsByUserVariables`:
const getAllStudentsByUserVars: GetAllStudentsByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getAllStudentsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllStudentsByUser(getAllStudentsByUserVars);
// Variables can be defined inline as well.
const { data } = await getAllStudentsByUser({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllStudentsByUser(dataConnect, getAllStudentsByUserVars);

console.log(data.students);

// Or, you can use the `Promise` API.
getAllStudentsByUser(getAllStudentsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `GetAllStudentsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllStudentsByUserRef, GetAllStudentsByUserVariables } from '@dataconnect/generated';

// The `GetAllStudentsByUser` query requires an argument of type `GetAllStudentsByUserVariables`:
const getAllStudentsByUserVars: GetAllStudentsByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getAllStudentsByUserRef()` function to get a reference to the query.
const ref = getAllStudentsByUserRef(getAllStudentsByUserVars);
// Variables can be defined inline as well.
const ref = getAllStudentsByUserRef({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllStudentsByUserRef(dataConnect, getAllStudentsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## GetStudentById
You can execute the `GetStudentById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentById(vars: GetStudentByIdVariables): QueryPromise<GetStudentByIdData, GetStudentByIdVariables>;

interface GetStudentByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentByIdVariables): QueryRef<GetStudentByIdData, GetStudentByIdVariables>;
}
export const getStudentByIdRef: GetStudentByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentById(dc: DataConnect, vars: GetStudentByIdVariables): QueryPromise<GetStudentByIdData, GetStudentByIdVariables>;

interface GetStudentByIdRef {
  ...
  (dc: DataConnect, vars: GetStudentByIdVariables): QueryRef<GetStudentByIdData, GetStudentByIdVariables>;
}
export const getStudentByIdRef: GetStudentByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentByIdRef:
```typescript
const name = getStudentByIdRef.operationName;
console.log(name);
```

### Variables
The `GetStudentById` query requires an argument of type `GetStudentByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentByIdVariables {
  userId: UUIDString;
  studentId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetStudentById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentById, GetStudentByIdVariables } from '@dataconnect/generated';

// The `GetStudentById` query requires an argument of type `GetStudentByIdVariables`:
const getStudentByIdVars: GetStudentByIdVariables = {
  userId: ..., 
  studentId: ..., 
  firebaseId: ..., 
};

// Call the `getStudentById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentById(getStudentByIdVars);
// Variables can be defined inline as well.
const { data } = await getStudentById({ userId: ..., studentId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentById(dataConnect, getStudentByIdVars);

console.log(data.students);

// Or, you can use the `Promise` API.
getStudentById(getStudentByIdVars).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `GetStudentById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentByIdRef, GetStudentByIdVariables } from '@dataconnect/generated';

// The `GetStudentById` query requires an argument of type `GetStudentByIdVariables`:
const getStudentByIdVars: GetStudentByIdVariables = {
  userId: ..., 
  studentId: ..., 
  firebaseId: ..., 
};

// Call the `getStudentByIdRef()` function to get a reference to the query.
const ref = getStudentByIdRef(getStudentByIdVars);
// Variables can be defined inline as well.
const ref = getStudentByIdRef({ userId: ..., studentId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentByIdRef(dataConnect, getStudentByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## GetStudentByIdentifier
You can execute the `GetStudentByIdentifier` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentByIdentifier(vars: GetStudentByIdentifierVariables): QueryPromise<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;

interface GetStudentByIdentifierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentByIdentifierVariables): QueryRef<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;
}
export const getStudentByIdentifierRef: GetStudentByIdentifierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentByIdentifier(dc: DataConnect, vars: GetStudentByIdentifierVariables): QueryPromise<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;

interface GetStudentByIdentifierRef {
  ...
  (dc: DataConnect, vars: GetStudentByIdentifierVariables): QueryRef<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;
}
export const getStudentByIdentifierRef: GetStudentByIdentifierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentByIdentifierRef:
```typescript
const name = getStudentByIdentifierRef.operationName;
console.log(name);
```

### Variables
The `GetStudentByIdentifier` query requires an argument of type `GetStudentByIdentifierVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentByIdentifierVariables {
  userId: UUIDString;
  identifier: string;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetStudentByIdentifier` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentByIdentifierData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentByIdentifier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentByIdentifier, GetStudentByIdentifierVariables } from '@dataconnect/generated';

// The `GetStudentByIdentifier` query requires an argument of type `GetStudentByIdentifierVariables`:
const getStudentByIdentifierVars: GetStudentByIdentifierVariables = {
  userId: ..., 
  identifier: ..., 
  firebaseId: ..., 
};

// Call the `getStudentByIdentifier()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentByIdentifier(getStudentByIdentifierVars);
// Variables can be defined inline as well.
const { data } = await getStudentByIdentifier({ userId: ..., identifier: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentByIdentifier(dataConnect, getStudentByIdentifierVars);

console.log(data.students);

// Or, you can use the `Promise` API.
getStudentByIdentifier(getStudentByIdentifierVars).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `GetStudentByIdentifier`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentByIdentifierRef, GetStudentByIdentifierVariables } from '@dataconnect/generated';

// The `GetStudentByIdentifier` query requires an argument of type `GetStudentByIdentifierVariables`:
const getStudentByIdentifierVars: GetStudentByIdentifierVariables = {
  userId: ..., 
  identifier: ..., 
  firebaseId: ..., 
};

// Call the `getStudentByIdentifierRef()` function to get a reference to the query.
const ref = getStudentByIdentifierRef(getStudentByIdentifierVars);
// Variables can be defined inline as well.
const ref = getStudentByIdentifierRef({ userId: ..., identifier: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentByIdentifierRef(dataConnect, getStudentByIdentifierVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## GetStudentsByFirstName
You can execute the `GetStudentsByFirstName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentsByFirstName(vars: GetStudentsByFirstNameVariables): QueryPromise<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;

interface GetStudentsByFirstNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentsByFirstNameVariables): QueryRef<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;
}
export const getStudentsByFirstNameRef: GetStudentsByFirstNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentsByFirstName(dc: DataConnect, vars: GetStudentsByFirstNameVariables): QueryPromise<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;

interface GetStudentsByFirstNameRef {
  ...
  (dc: DataConnect, vars: GetStudentsByFirstNameVariables): QueryRef<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;
}
export const getStudentsByFirstNameRef: GetStudentsByFirstNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentsByFirstNameRef:
```typescript
const name = getStudentsByFirstNameRef.operationName;
console.log(name);
```

### Variables
The `GetStudentsByFirstName` query requires an argument of type `GetStudentsByFirstNameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentsByFirstNameVariables {
  userId: UUIDString;
  firstName: string;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetStudentsByFirstName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentsByFirstNameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentsByFirstName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentsByFirstName, GetStudentsByFirstNameVariables } from '@dataconnect/generated';

// The `GetStudentsByFirstName` query requires an argument of type `GetStudentsByFirstNameVariables`:
const getStudentsByFirstNameVars: GetStudentsByFirstNameVariables = {
  userId: ..., 
  firstName: ..., 
  firebaseId: ..., 
};

// Call the `getStudentsByFirstName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentsByFirstName(getStudentsByFirstNameVars);
// Variables can be defined inline as well.
const { data } = await getStudentsByFirstName({ userId: ..., firstName: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentsByFirstName(dataConnect, getStudentsByFirstNameVars);

console.log(data.students);

// Or, you can use the `Promise` API.
getStudentsByFirstName(getStudentsByFirstNameVars).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `GetStudentsByFirstName`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentsByFirstNameRef, GetStudentsByFirstNameVariables } from '@dataconnect/generated';

// The `GetStudentsByFirstName` query requires an argument of type `GetStudentsByFirstNameVariables`:
const getStudentsByFirstNameVars: GetStudentsByFirstNameVariables = {
  userId: ..., 
  firstName: ..., 
  firebaseId: ..., 
};

// Call the `getStudentsByFirstNameRef()` function to get a reference to the query.
const ref = getStudentsByFirstNameRef(getStudentsByFirstNameVars);
// Variables can be defined inline as well.
const ref = getStudentsByFirstNameRef({ userId: ..., firstName: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentsByFirstNameRef(dataConnect, getStudentsByFirstNameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## GetStudentsByLastName
You can execute the `GetStudentsByLastName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentsByLastName(vars: GetStudentsByLastNameVariables): QueryPromise<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;

interface GetStudentsByLastNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentsByLastNameVariables): QueryRef<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;
}
export const getStudentsByLastNameRef: GetStudentsByLastNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentsByLastName(dc: DataConnect, vars: GetStudentsByLastNameVariables): QueryPromise<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;

interface GetStudentsByLastNameRef {
  ...
  (dc: DataConnect, vars: GetStudentsByLastNameVariables): QueryRef<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;
}
export const getStudentsByLastNameRef: GetStudentsByLastNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentsByLastNameRef:
```typescript
const name = getStudentsByLastNameRef.operationName;
console.log(name);
```

### Variables
The `GetStudentsByLastName` query requires an argument of type `GetStudentsByLastNameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentsByLastNameVariables {
  userId: UUIDString;
  lastName: string;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetStudentsByLastName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentsByLastNameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentsByLastName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentsByLastName, GetStudentsByLastNameVariables } from '@dataconnect/generated';

// The `GetStudentsByLastName` query requires an argument of type `GetStudentsByLastNameVariables`:
const getStudentsByLastNameVars: GetStudentsByLastNameVariables = {
  userId: ..., 
  lastName: ..., 
  firebaseId: ..., 
};

// Call the `getStudentsByLastName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentsByLastName(getStudentsByLastNameVars);
// Variables can be defined inline as well.
const { data } = await getStudentsByLastName({ userId: ..., lastName: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentsByLastName(dataConnect, getStudentsByLastNameVars);

console.log(data.students);

// Or, you can use the `Promise` API.
getStudentsByLastName(getStudentsByLastNameVars).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `GetStudentsByLastName`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentsByLastNameRef, GetStudentsByLastNameVariables } from '@dataconnect/generated';

// The `GetStudentsByLastName` query requires an argument of type `GetStudentsByLastNameVariables`:
const getStudentsByLastNameVars: GetStudentsByLastNameVariables = {
  userId: ..., 
  lastName: ..., 
  firebaseId: ..., 
};

// Call the `getStudentsByLastNameRef()` function to get a reference to the query.
const ref = getStudentsByLastNameRef(getStudentsByLastNameVars);
// Variables can be defined inline as well.
const ref = getStudentsByLastNameRef({ userId: ..., lastName: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentsByLastNameRef(dataConnect, getStudentsByLastNameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## GetStudentsByCourse
You can execute the `GetStudentsByCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentsByCourse(vars: GetStudentsByCourseVariables): QueryPromise<GetStudentsByCourseData, GetStudentsByCourseVariables>;

interface GetStudentsByCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentsByCourseVariables): QueryRef<GetStudentsByCourseData, GetStudentsByCourseVariables>;
}
export const getStudentsByCourseRef: GetStudentsByCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentsByCourse(dc: DataConnect, vars: GetStudentsByCourseVariables): QueryPromise<GetStudentsByCourseData, GetStudentsByCourseVariables>;

interface GetStudentsByCourseRef {
  ...
  (dc: DataConnect, vars: GetStudentsByCourseVariables): QueryRef<GetStudentsByCourseData, GetStudentsByCourseVariables>;
}
export const getStudentsByCourseRef: GetStudentsByCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentsByCourseRef:
```typescript
const name = getStudentsByCourseRef.operationName;
console.log(name);
```

### Variables
The `GetStudentsByCourse` query requires an argument of type `GetStudentsByCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentsByCourseVariables {
  userId: UUIDString;
  courseId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetStudentsByCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentsByCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentsByCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentsByCourse, GetStudentsByCourseVariables } from '@dataconnect/generated';

// The `GetStudentsByCourse` query requires an argument of type `GetStudentsByCourseVariables`:
const getStudentsByCourseVars: GetStudentsByCourseVariables = {
  userId: ..., 
  courseId: ..., 
  firebaseId: ..., 
};

// Call the `getStudentsByCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentsByCourse(getStudentsByCourseVars);
// Variables can be defined inline as well.
const { data } = await getStudentsByCourse({ userId: ..., courseId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentsByCourse(dataConnect, getStudentsByCourseVars);

console.log(data.courseStudents);

// Or, you can use the `Promise` API.
getStudentsByCourse(getStudentsByCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courseStudents);
});
```

### Using `GetStudentsByCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentsByCourseRef, GetStudentsByCourseVariables } from '@dataconnect/generated';

// The `GetStudentsByCourse` query requires an argument of type `GetStudentsByCourseVariables`:
const getStudentsByCourseVars: GetStudentsByCourseVariables = {
  userId: ..., 
  courseId: ..., 
  firebaseId: ..., 
};

// Call the `getStudentsByCourseRef()` function to get a reference to the query.
const ref = getStudentsByCourseRef(getStudentsByCourseVars);
// Variables can be defined inline as well.
const ref = getStudentsByCourseRef({ userId: ..., courseId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentsByCourseRef(dataConnect, getStudentsByCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseStudents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseStudents);
});
```

## GetCourseStudentsDetail
You can execute the `GetCourseStudentsDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseStudentsDetail(vars: GetCourseStudentsDetailVariables): QueryPromise<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;

interface GetCourseStudentsDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseStudentsDetailVariables): QueryRef<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;
}
export const getCourseStudentsDetailRef: GetCourseStudentsDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseStudentsDetail(dc: DataConnect, vars: GetCourseStudentsDetailVariables): QueryPromise<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;

interface GetCourseStudentsDetailRef {
  ...
  (dc: DataConnect, vars: GetCourseStudentsDetailVariables): QueryRef<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;
}
export const getCourseStudentsDetailRef: GetCourseStudentsDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseStudentsDetailRef:
```typescript
const name = getCourseStudentsDetailRef.operationName;
console.log(name);
```

### Variables
The `GetCourseStudentsDetail` query requires an argument of type `GetCourseStudentsDetailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseStudentsDetailVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourseStudentsDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseStudentsDetailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCourseStudentsDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseStudentsDetail, GetCourseStudentsDetailVariables } from '@dataconnect/generated';

// The `GetCourseStudentsDetail` query requires an argument of type `GetCourseStudentsDetailVariables`:
const getCourseStudentsDetailVars: GetCourseStudentsDetailVariables = {
  courseId: ..., 
};

// Call the `getCourseStudentsDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseStudentsDetail(getCourseStudentsDetailVars);
// Variables can be defined inline as well.
const { data } = await getCourseStudentsDetail({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseStudentsDetail(dataConnect, getCourseStudentsDetailVars);

console.log(data.courseStudents);

// Or, you can use the `Promise` API.
getCourseStudentsDetail(getCourseStudentsDetailVars).then((response) => {
  const data = response.data;
  console.log(data.courseStudents);
});
```

### Using `GetCourseStudentsDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseStudentsDetailRef, GetCourseStudentsDetailVariables } from '@dataconnect/generated';

// The `GetCourseStudentsDetail` query requires an argument of type `GetCourseStudentsDetailVariables`:
const getCourseStudentsDetailVars: GetCourseStudentsDetailVariables = {
  courseId: ..., 
};

// Call the `getCourseStudentsDetailRef()` function to get a reference to the query.
const ref = getCourseStudentsDetailRef(getCourseStudentsDetailVars);
// Variables can be defined inline as well.
const ref = getCourseStudentsDetailRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseStudentsDetailRef(dataConnect, getCourseStudentsDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseStudents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseStudents);
});
```

## GetCourseStudentsWithDetails
You can execute the `GetCourseStudentsWithDetails` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseStudentsWithDetails(vars: GetCourseStudentsWithDetailsVariables): QueryPromise<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;

interface GetCourseStudentsWithDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseStudentsWithDetailsVariables): QueryRef<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;
}
export const getCourseStudentsWithDetailsRef: GetCourseStudentsWithDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseStudentsWithDetails(dc: DataConnect, vars: GetCourseStudentsWithDetailsVariables): QueryPromise<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;

interface GetCourseStudentsWithDetailsRef {
  ...
  (dc: DataConnect, vars: GetCourseStudentsWithDetailsVariables): QueryRef<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;
}
export const getCourseStudentsWithDetailsRef: GetCourseStudentsWithDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseStudentsWithDetailsRef:
```typescript
const name = getCourseStudentsWithDetailsRef.operationName;
console.log(name);
```

### Variables
The `GetCourseStudentsWithDetails` query requires an argument of type `GetCourseStudentsWithDetailsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseStudentsWithDetailsVariables {
  courseId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetCourseStudentsWithDetails` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseStudentsWithDetailsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCourseStudentsWithDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseStudentsWithDetails, GetCourseStudentsWithDetailsVariables } from '@dataconnect/generated';

// The `GetCourseStudentsWithDetails` query requires an argument of type `GetCourseStudentsWithDetailsVariables`:
const getCourseStudentsWithDetailsVars: GetCourseStudentsWithDetailsVariables = {
  courseId: ..., 
  firebaseId: ..., 
};

// Call the `getCourseStudentsWithDetails()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseStudentsWithDetails(getCourseStudentsWithDetailsVars);
// Variables can be defined inline as well.
const { data } = await getCourseStudentsWithDetails({ courseId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseStudentsWithDetails(dataConnect, getCourseStudentsWithDetailsVars);

console.log(data.courseStudents);

// Or, you can use the `Promise` API.
getCourseStudentsWithDetails(getCourseStudentsWithDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.courseStudents);
});
```

### Using `GetCourseStudentsWithDetails`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseStudentsWithDetailsRef, GetCourseStudentsWithDetailsVariables } from '@dataconnect/generated';

// The `GetCourseStudentsWithDetails` query requires an argument of type `GetCourseStudentsWithDetailsVariables`:
const getCourseStudentsWithDetailsVars: GetCourseStudentsWithDetailsVariables = {
  courseId: ..., 
  firebaseId: ..., 
};

// Call the `getCourseStudentsWithDetailsRef()` function to get a reference to the query.
const ref = getCourseStudentsWithDetailsRef(getCourseStudentsWithDetailsVars);
// Variables can be defined inline as well.
const ref = getCourseStudentsWithDetailsRef({ courseId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseStudentsWithDetailsRef(dataConnect, getCourseStudentsWithDetailsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseStudents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseStudents);
});
```

## GetStudentEvaluationById
You can execute the `GetStudentEvaluationById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentEvaluationById(vars: GetStudentEvaluationByIdVariables): QueryPromise<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;

interface GetStudentEvaluationByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationByIdVariables): QueryRef<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;
}
export const getStudentEvaluationByIdRef: GetStudentEvaluationByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentEvaluationById(dc: DataConnect, vars: GetStudentEvaluationByIdVariables): QueryPromise<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;

interface GetStudentEvaluationByIdRef {
  ...
  (dc: DataConnect, vars: GetStudentEvaluationByIdVariables): QueryRef<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;
}
export const getStudentEvaluationByIdRef: GetStudentEvaluationByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentEvaluationByIdRef:
```typescript
const name = getStudentEvaluationByIdRef.operationName;
console.log(name);
```

### Variables
The `GetStudentEvaluationById` query requires an argument of type `GetStudentEvaluationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentEvaluationByIdVariables {
  studentEvaluationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetStudentEvaluationById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentEvaluationByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentEvaluationById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationById, GetStudentEvaluationByIdVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationById` query requires an argument of type `GetStudentEvaluationByIdVariables`:
const getStudentEvaluationByIdVars: GetStudentEvaluationByIdVariables = {
  studentEvaluationId: ..., 
};

// Call the `getStudentEvaluationById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentEvaluationById(getStudentEvaluationByIdVars);
// Variables can be defined inline as well.
const { data } = await getStudentEvaluationById({ studentEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentEvaluationById(dataConnect, getStudentEvaluationByIdVars);

console.log(data.studentCourseEvaluations);
console.log(data.studentEvaluationQuestions);

// Or, you can use the `Promise` API.
getStudentEvaluationById(getStudentEvaluationByIdVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluations);
  console.log(data.studentEvaluationQuestions);
});
```

### Using `GetStudentEvaluationById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationByIdRef, GetStudentEvaluationByIdVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationById` query requires an argument of type `GetStudentEvaluationByIdVariables`:
const getStudentEvaluationByIdVars: GetStudentEvaluationByIdVariables = {
  studentEvaluationId: ..., 
};

// Call the `getStudentEvaluationByIdRef()` function to get a reference to the query.
const ref = getStudentEvaluationByIdRef(getStudentEvaluationByIdVars);
// Variables can be defined inline as well.
const ref = getStudentEvaluationByIdRef({ studentEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentEvaluationByIdRef(dataConnect, getStudentEvaluationByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studentCourseEvaluations);
console.log(data.studentEvaluationQuestions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluations);
  console.log(data.studentEvaluationQuestions);
});
```

## GetStudentEvaluationsByStudentId
You can execute the `GetStudentEvaluationsByStudentId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentEvaluationsByStudentId(vars: GetStudentEvaluationsByStudentIdVariables): QueryPromise<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;

interface GetStudentEvaluationsByStudentIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByStudentIdVariables): QueryRef<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;
}
export const getStudentEvaluationsByStudentIdRef: GetStudentEvaluationsByStudentIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentEvaluationsByStudentId(dc: DataConnect, vars: GetStudentEvaluationsByStudentIdVariables): QueryPromise<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;

interface GetStudentEvaluationsByStudentIdRef {
  ...
  (dc: DataConnect, vars: GetStudentEvaluationsByStudentIdVariables): QueryRef<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;
}
export const getStudentEvaluationsByStudentIdRef: GetStudentEvaluationsByStudentIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentEvaluationsByStudentIdRef:
```typescript
const name = getStudentEvaluationsByStudentIdRef.operationName;
console.log(name);
```

### Variables
The `GetStudentEvaluationsByStudentId` query requires an argument of type `GetStudentEvaluationsByStudentIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentEvaluationsByStudentIdVariables {
  studentId: UUIDString;
}
```
### Return Type
Recall that executing the `GetStudentEvaluationsByStudentId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentEvaluationsByStudentIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStudentEvaluationsByStudentIdData {
  courseStudents: ({
    courseStudentId: UUIDString;
    courseId: UUIDString;
    studentId: UUIDString;
    enrolledOn: DateString;
  } & CourseStudent_Key)[];
}
```
### Using `GetStudentEvaluationsByStudentId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByStudentId, GetStudentEvaluationsByStudentIdVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByStudentId` query requires an argument of type `GetStudentEvaluationsByStudentIdVariables`:
const getStudentEvaluationsByStudentIdVars: GetStudentEvaluationsByStudentIdVariables = {
  studentId: ..., 
};

// Call the `getStudentEvaluationsByStudentId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentEvaluationsByStudentId(getStudentEvaluationsByStudentIdVars);
// Variables can be defined inline as well.
const { data } = await getStudentEvaluationsByStudentId({ studentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentEvaluationsByStudentId(dataConnect, getStudentEvaluationsByStudentIdVars);

console.log(data.courseStudents);

// Or, you can use the `Promise` API.
getStudentEvaluationsByStudentId(getStudentEvaluationsByStudentIdVars).then((response) => {
  const data = response.data;
  console.log(data.courseStudents);
});
```

### Using `GetStudentEvaluationsByStudentId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByStudentIdRef, GetStudentEvaluationsByStudentIdVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByStudentId` query requires an argument of type `GetStudentEvaluationsByStudentIdVariables`:
const getStudentEvaluationsByStudentIdVars: GetStudentEvaluationsByStudentIdVariables = {
  studentId: ..., 
};

// Call the `getStudentEvaluationsByStudentIdRef()` function to get a reference to the query.
const ref = getStudentEvaluationsByStudentIdRef(getStudentEvaluationsByStudentIdVars);
// Variables can be defined inline as well.
const ref = getStudentEvaluationsByStudentIdRef({ studentId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentEvaluationsByStudentIdRef(dataConnect, getStudentEvaluationsByStudentIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseStudents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseStudents);
});
```

## GetStudentEvaluationsByIdentifier
You can execute the `GetStudentEvaluationsByIdentifier` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentEvaluationsByIdentifier(vars: GetStudentEvaluationsByIdentifierVariables): QueryPromise<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;

interface GetStudentEvaluationsByIdentifierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByIdentifierVariables): QueryRef<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;
}
export const getStudentEvaluationsByIdentifierRef: GetStudentEvaluationsByIdentifierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentEvaluationsByIdentifier(dc: DataConnect, vars: GetStudentEvaluationsByIdentifierVariables): QueryPromise<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;

interface GetStudentEvaluationsByIdentifierRef {
  ...
  (dc: DataConnect, vars: GetStudentEvaluationsByIdentifierVariables): QueryRef<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;
}
export const getStudentEvaluationsByIdentifierRef: GetStudentEvaluationsByIdentifierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentEvaluationsByIdentifierRef:
```typescript
const name = getStudentEvaluationsByIdentifierRef.operationName;
console.log(name);
```

### Variables
The `GetStudentEvaluationsByIdentifier` query requires an argument of type `GetStudentEvaluationsByIdentifierVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentEvaluationsByIdentifierVariables {
  identifier: string;
}
```
### Return Type
Recall that executing the `GetStudentEvaluationsByIdentifier` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentEvaluationsByIdentifierData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStudentEvaluationsByIdentifierData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
  } & Student_Key)[];
}
```
### Using `GetStudentEvaluationsByIdentifier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByIdentifier, GetStudentEvaluationsByIdentifierVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByIdentifier` query requires an argument of type `GetStudentEvaluationsByIdentifierVariables`:
const getStudentEvaluationsByIdentifierVars: GetStudentEvaluationsByIdentifierVariables = {
  identifier: ..., 
};

// Call the `getStudentEvaluationsByIdentifier()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentEvaluationsByIdentifier(getStudentEvaluationsByIdentifierVars);
// Variables can be defined inline as well.
const { data } = await getStudentEvaluationsByIdentifier({ identifier: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentEvaluationsByIdentifier(dataConnect, getStudentEvaluationsByIdentifierVars);

console.log(data.students);

// Or, you can use the `Promise` API.
getStudentEvaluationsByIdentifier(getStudentEvaluationsByIdentifierVars).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `GetStudentEvaluationsByIdentifier`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByIdentifierRef, GetStudentEvaluationsByIdentifierVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByIdentifier` query requires an argument of type `GetStudentEvaluationsByIdentifierVariables`:
const getStudentEvaluationsByIdentifierVars: GetStudentEvaluationsByIdentifierVariables = {
  identifier: ..., 
};

// Call the `getStudentEvaluationsByIdentifierRef()` function to get a reference to the query.
const ref = getStudentEvaluationsByIdentifierRef(getStudentEvaluationsByIdentifierVars);
// Variables can be defined inline as well.
const ref = getStudentEvaluationsByIdentifierRef({ identifier: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentEvaluationsByIdentifierRef(dataConnect, getStudentEvaluationsByIdentifierVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## GetStudentEvaluationsByFirstName
You can execute the `GetStudentEvaluationsByFirstName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentEvaluationsByFirstName(vars: GetStudentEvaluationsByFirstNameVariables): QueryPromise<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;

interface GetStudentEvaluationsByFirstNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByFirstNameVariables): QueryRef<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;
}
export const getStudentEvaluationsByFirstNameRef: GetStudentEvaluationsByFirstNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentEvaluationsByFirstName(dc: DataConnect, vars: GetStudentEvaluationsByFirstNameVariables): QueryPromise<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;

interface GetStudentEvaluationsByFirstNameRef {
  ...
  (dc: DataConnect, vars: GetStudentEvaluationsByFirstNameVariables): QueryRef<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;
}
export const getStudentEvaluationsByFirstNameRef: GetStudentEvaluationsByFirstNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentEvaluationsByFirstNameRef:
```typescript
const name = getStudentEvaluationsByFirstNameRef.operationName;
console.log(name);
```

### Variables
The `GetStudentEvaluationsByFirstName` query requires an argument of type `GetStudentEvaluationsByFirstNameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentEvaluationsByFirstNameVariables {
  firstName: string;
}
```
### Return Type
Recall that executing the `GetStudentEvaluationsByFirstName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentEvaluationsByFirstNameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStudentEvaluationsByFirstNameData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
  } & Student_Key)[];
}
```
### Using `GetStudentEvaluationsByFirstName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByFirstName, GetStudentEvaluationsByFirstNameVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByFirstName` query requires an argument of type `GetStudentEvaluationsByFirstNameVariables`:
const getStudentEvaluationsByFirstNameVars: GetStudentEvaluationsByFirstNameVariables = {
  firstName: ..., 
};

// Call the `getStudentEvaluationsByFirstName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentEvaluationsByFirstName(getStudentEvaluationsByFirstNameVars);
// Variables can be defined inline as well.
const { data } = await getStudentEvaluationsByFirstName({ firstName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentEvaluationsByFirstName(dataConnect, getStudentEvaluationsByFirstNameVars);

console.log(data.students);

// Or, you can use the `Promise` API.
getStudentEvaluationsByFirstName(getStudentEvaluationsByFirstNameVars).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `GetStudentEvaluationsByFirstName`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByFirstNameRef, GetStudentEvaluationsByFirstNameVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByFirstName` query requires an argument of type `GetStudentEvaluationsByFirstNameVariables`:
const getStudentEvaluationsByFirstNameVars: GetStudentEvaluationsByFirstNameVariables = {
  firstName: ..., 
};

// Call the `getStudentEvaluationsByFirstNameRef()` function to get a reference to the query.
const ref = getStudentEvaluationsByFirstNameRef(getStudentEvaluationsByFirstNameVars);
// Variables can be defined inline as well.
const ref = getStudentEvaluationsByFirstNameRef({ firstName: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentEvaluationsByFirstNameRef(dataConnect, getStudentEvaluationsByFirstNameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## GetStudentEvaluationsByLastName
You can execute the `GetStudentEvaluationsByLastName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentEvaluationsByLastName(vars: GetStudentEvaluationsByLastNameVariables): QueryPromise<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;

interface GetStudentEvaluationsByLastNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByLastNameVariables): QueryRef<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;
}
export const getStudentEvaluationsByLastNameRef: GetStudentEvaluationsByLastNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentEvaluationsByLastName(dc: DataConnect, vars: GetStudentEvaluationsByLastNameVariables): QueryPromise<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;

interface GetStudentEvaluationsByLastNameRef {
  ...
  (dc: DataConnect, vars: GetStudentEvaluationsByLastNameVariables): QueryRef<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;
}
export const getStudentEvaluationsByLastNameRef: GetStudentEvaluationsByLastNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentEvaluationsByLastNameRef:
```typescript
const name = getStudentEvaluationsByLastNameRef.operationName;
console.log(name);
```

### Variables
The `GetStudentEvaluationsByLastName` query requires an argument of type `GetStudentEvaluationsByLastNameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentEvaluationsByLastNameVariables {
  lastName: string;
}
```
### Return Type
Recall that executing the `GetStudentEvaluationsByLastName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentEvaluationsByLastNameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStudentEvaluationsByLastNameData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
  } & Student_Key)[];
}
```
### Using `GetStudentEvaluationsByLastName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByLastName, GetStudentEvaluationsByLastNameVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByLastName` query requires an argument of type `GetStudentEvaluationsByLastNameVariables`:
const getStudentEvaluationsByLastNameVars: GetStudentEvaluationsByLastNameVariables = {
  lastName: ..., 
};

// Call the `getStudentEvaluationsByLastName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentEvaluationsByLastName(getStudentEvaluationsByLastNameVars);
// Variables can be defined inline as well.
const { data } = await getStudentEvaluationsByLastName({ lastName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentEvaluationsByLastName(dataConnect, getStudentEvaluationsByLastNameVars);

console.log(data.students);

// Or, you can use the `Promise` API.
getStudentEvaluationsByLastName(getStudentEvaluationsByLastNameVars).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `GetStudentEvaluationsByLastName`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByLastNameRef, GetStudentEvaluationsByLastNameVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByLastName` query requires an argument of type `GetStudentEvaluationsByLastNameVariables`:
const getStudentEvaluationsByLastNameVars: GetStudentEvaluationsByLastNameVariables = {
  lastName: ..., 
};

// Call the `getStudentEvaluationsByLastNameRef()` function to get a reference to the query.
const ref = getStudentEvaluationsByLastNameRef(getStudentEvaluationsByLastNameVars);
// Variables can be defined inline as well.
const ref = getStudentEvaluationsByLastNameRef({ lastName: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentEvaluationsByLastNameRef(dataConnect, getStudentEvaluationsByLastNameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## GetStudentEvaluationQuestions
You can execute the `GetStudentEvaluationQuestions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentEvaluationQuestions(vars: GetStudentEvaluationQuestionsVariables): QueryPromise<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;

interface GetStudentEvaluationQuestionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationQuestionsVariables): QueryRef<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;
}
export const getStudentEvaluationQuestionsRef: GetStudentEvaluationQuestionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentEvaluationQuestions(dc: DataConnect, vars: GetStudentEvaluationQuestionsVariables): QueryPromise<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;

interface GetStudentEvaluationQuestionsRef {
  ...
  (dc: DataConnect, vars: GetStudentEvaluationQuestionsVariables): QueryRef<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;
}
export const getStudentEvaluationQuestionsRef: GetStudentEvaluationQuestionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentEvaluationQuestionsRef:
```typescript
const name = getStudentEvaluationQuestionsRef.operationName;
console.log(name);
```

### Variables
The `GetStudentEvaluationQuestions` query requires an argument of type `GetStudentEvaluationQuestionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentEvaluationQuestionsVariables {
  studentEvaluationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetStudentEvaluationQuestions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentEvaluationQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentEvaluationQuestions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationQuestions, GetStudentEvaluationQuestionsVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationQuestions` query requires an argument of type `GetStudentEvaluationQuestionsVariables`:
const getStudentEvaluationQuestionsVars: GetStudentEvaluationQuestionsVariables = {
  studentEvaluationId: ..., 
};

// Call the `getStudentEvaluationQuestions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentEvaluationQuestions(getStudentEvaluationQuestionsVars);
// Variables can be defined inline as well.
const { data } = await getStudentEvaluationQuestions({ studentEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentEvaluationQuestions(dataConnect, getStudentEvaluationQuestionsVars);

console.log(data.studentEvaluationQuestions);

// Or, you can use the `Promise` API.
getStudentEvaluationQuestions(getStudentEvaluationQuestionsVars).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestions);
});
```

### Using `GetStudentEvaluationQuestions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationQuestionsRef, GetStudentEvaluationQuestionsVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationQuestions` query requires an argument of type `GetStudentEvaluationQuestionsVariables`:
const getStudentEvaluationQuestionsVars: GetStudentEvaluationQuestionsVariables = {
  studentEvaluationId: ..., 
};

// Call the `getStudentEvaluationQuestionsRef()` function to get a reference to the query.
const ref = getStudentEvaluationQuestionsRef(getStudentEvaluationQuestionsVars);
// Variables can be defined inline as well.
const ref = getStudentEvaluationQuestionsRef({ studentEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentEvaluationQuestionsRef(dataConnect, getStudentEvaluationQuestionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studentEvaluationQuestions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestions);
});
```

## GetStudentAnswerOptions
You can execute the `GetStudentAnswerOptions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentAnswerOptions(vars: GetStudentAnswerOptionsVariables): QueryPromise<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;

interface GetStudentAnswerOptionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentAnswerOptionsVariables): QueryRef<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;
}
export const getStudentAnswerOptionsRef: GetStudentAnswerOptionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentAnswerOptions(dc: DataConnect, vars: GetStudentAnswerOptionsVariables): QueryPromise<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;

interface GetStudentAnswerOptionsRef {
  ...
  (dc: DataConnect, vars: GetStudentAnswerOptionsVariables): QueryRef<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;
}
export const getStudentAnswerOptionsRef: GetStudentAnswerOptionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentAnswerOptionsRef:
```typescript
const name = getStudentAnswerOptionsRef.operationName;
console.log(name);
```

### Variables
The `GetStudentAnswerOptions` query requires an argument of type `GetStudentAnswerOptionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentAnswerOptionsVariables {
  studentEvaluationQuestionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetStudentAnswerOptions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentAnswerOptionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStudentAnswerOptionsData {
  studentAnswerOptions: ({
    studentAnswerOptionId: UUIDString;
    studentEvaluationQuestionId: UUIDString;
    questionOptionId: UUIDString;
  } & StudentAnswerOption_Key)[];
}
```
### Using `GetStudentAnswerOptions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentAnswerOptions, GetStudentAnswerOptionsVariables } from '@dataconnect/generated';

// The `GetStudentAnswerOptions` query requires an argument of type `GetStudentAnswerOptionsVariables`:
const getStudentAnswerOptionsVars: GetStudentAnswerOptionsVariables = {
  studentEvaluationQuestionId: ..., 
};

// Call the `getStudentAnswerOptions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentAnswerOptions(getStudentAnswerOptionsVars);
// Variables can be defined inline as well.
const { data } = await getStudentAnswerOptions({ studentEvaluationQuestionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentAnswerOptions(dataConnect, getStudentAnswerOptionsVars);

console.log(data.studentAnswerOptions);

// Or, you can use the `Promise` API.
getStudentAnswerOptions(getStudentAnswerOptionsVars).then((response) => {
  const data = response.data;
  console.log(data.studentAnswerOptions);
});
```

### Using `GetStudentAnswerOptions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentAnswerOptionsRef, GetStudentAnswerOptionsVariables } from '@dataconnect/generated';

// The `GetStudentAnswerOptions` query requires an argument of type `GetStudentAnswerOptionsVariables`:
const getStudentAnswerOptionsVars: GetStudentAnswerOptionsVariables = {
  studentEvaluationQuestionId: ..., 
};

// Call the `getStudentAnswerOptionsRef()` function to get a reference to the query.
const ref = getStudentAnswerOptionsRef(getStudentAnswerOptionsVars);
// Variables can be defined inline as well.
const ref = getStudentAnswerOptionsRef({ studentEvaluationQuestionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentAnswerOptionsRef(dataConnect, getStudentAnswerOptionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studentAnswerOptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studentAnswerOptions);
});
```

## GetStudentEvaluationsByCourseEvaluation
You can execute the `GetStudentEvaluationsByCourseEvaluation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentEvaluationsByCourseEvaluation(vars: GetStudentEvaluationsByCourseEvaluationVariables): QueryPromise<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;

interface GetStudentEvaluationsByCourseEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByCourseEvaluationVariables): QueryRef<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;
}
export const getStudentEvaluationsByCourseEvaluationRef: GetStudentEvaluationsByCourseEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentEvaluationsByCourseEvaluation(dc: DataConnect, vars: GetStudentEvaluationsByCourseEvaluationVariables): QueryPromise<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;

interface GetStudentEvaluationsByCourseEvaluationRef {
  ...
  (dc: DataConnect, vars: GetStudentEvaluationsByCourseEvaluationVariables): QueryRef<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;
}
export const getStudentEvaluationsByCourseEvaluationRef: GetStudentEvaluationsByCourseEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentEvaluationsByCourseEvaluationRef:
```typescript
const name = getStudentEvaluationsByCourseEvaluationRef.operationName;
console.log(name);
```

### Variables
The `GetStudentEvaluationsByCourseEvaluation` query requires an argument of type `GetStudentEvaluationsByCourseEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentEvaluationsByCourseEvaluationVariables {
  courseEvaluationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetStudentEvaluationsByCourseEvaluation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentEvaluationsByCourseEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentEvaluationsByCourseEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByCourseEvaluation, GetStudentEvaluationsByCourseEvaluationVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByCourseEvaluation` query requires an argument of type `GetStudentEvaluationsByCourseEvaluationVariables`:
const getStudentEvaluationsByCourseEvaluationVars: GetStudentEvaluationsByCourseEvaluationVariables = {
  courseEvaluationId: ..., 
};

// Call the `getStudentEvaluationsByCourseEvaluation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentEvaluationsByCourseEvaluation(getStudentEvaluationsByCourseEvaluationVars);
// Variables can be defined inline as well.
const { data } = await getStudentEvaluationsByCourseEvaluation({ courseEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentEvaluationsByCourseEvaluation(dataConnect, getStudentEvaluationsByCourseEvaluationVars);

console.log(data.studentCourseEvaluations);

// Or, you can use the `Promise` API.
getStudentEvaluationsByCourseEvaluation(getStudentEvaluationsByCourseEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluations);
});
```

### Using `GetStudentEvaluationsByCourseEvaluation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByCourseEvaluationRef, GetStudentEvaluationsByCourseEvaluationVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByCourseEvaluation` query requires an argument of type `GetStudentEvaluationsByCourseEvaluationVariables`:
const getStudentEvaluationsByCourseEvaluationVars: GetStudentEvaluationsByCourseEvaluationVariables = {
  courseEvaluationId: ..., 
};

// Call the `getStudentEvaluationsByCourseEvaluationRef()` function to get a reference to the query.
const ref = getStudentEvaluationsByCourseEvaluationRef(getStudentEvaluationsByCourseEvaluationVars);
// Variables can be defined inline as well.
const ref = getStudentEvaluationsByCourseEvaluationRef({ courseEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentEvaluationsByCourseEvaluationRef(dataConnect, getStudentEvaluationsByCourseEvaluationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studentCourseEvaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluations);
});
```

## GetStudentEvaluationsByCourseStudent
You can execute the `GetStudentEvaluationsByCourseStudent` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentEvaluationsByCourseStudent(vars: GetStudentEvaluationsByCourseStudentVariables): QueryPromise<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;

interface GetStudentEvaluationsByCourseStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationsByCourseStudentVariables): QueryRef<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;
}
export const getStudentEvaluationsByCourseStudentRef: GetStudentEvaluationsByCourseStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentEvaluationsByCourseStudent(dc: DataConnect, vars: GetStudentEvaluationsByCourseStudentVariables): QueryPromise<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;

interface GetStudentEvaluationsByCourseStudentRef {
  ...
  (dc: DataConnect, vars: GetStudentEvaluationsByCourseStudentVariables): QueryRef<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;
}
export const getStudentEvaluationsByCourseStudentRef: GetStudentEvaluationsByCourseStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentEvaluationsByCourseStudentRef:
```typescript
const name = getStudentEvaluationsByCourseStudentRef.operationName;
console.log(name);
```

### Variables
The `GetStudentEvaluationsByCourseStudent` query requires an argument of type `GetStudentEvaluationsByCourseStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentEvaluationsByCourseStudentVariables {
  courseStudentId: UUIDString;
}
```
### Return Type
Recall that executing the `GetStudentEvaluationsByCourseStudent` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentEvaluationsByCourseStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentEvaluationsByCourseStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByCourseStudent, GetStudentEvaluationsByCourseStudentVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByCourseStudent` query requires an argument of type `GetStudentEvaluationsByCourseStudentVariables`:
const getStudentEvaluationsByCourseStudentVars: GetStudentEvaluationsByCourseStudentVariables = {
  courseStudentId: ..., 
};

// Call the `getStudentEvaluationsByCourseStudent()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentEvaluationsByCourseStudent(getStudentEvaluationsByCourseStudentVars);
// Variables can be defined inline as well.
const { data } = await getStudentEvaluationsByCourseStudent({ courseStudentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentEvaluationsByCourseStudent(dataConnect, getStudentEvaluationsByCourseStudentVars);

console.log(data.studentCourseEvaluations);

// Or, you can use the `Promise` API.
getStudentEvaluationsByCourseStudent(getStudentEvaluationsByCourseStudentVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluations);
});
```

### Using `GetStudentEvaluationsByCourseStudent`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationsByCourseStudentRef, GetStudentEvaluationsByCourseStudentVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationsByCourseStudent` query requires an argument of type `GetStudentEvaluationsByCourseStudentVariables`:
const getStudentEvaluationsByCourseStudentVars: GetStudentEvaluationsByCourseStudentVariables = {
  courseStudentId: ..., 
};

// Call the `getStudentEvaluationsByCourseStudentRef()` function to get a reference to the query.
const ref = getStudentEvaluationsByCourseStudentRef(getStudentEvaluationsByCourseStudentVars);
// Variables can be defined inline as well.
const ref = getStudentEvaluationsByCourseStudentRef({ courseStudentId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentEvaluationsByCourseStudentRef(dataConnect, getStudentEvaluationsByCourseStudentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studentCourseEvaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluations);
});
```

## GetStudentEvaluationFullDetail
You can execute the `GetStudentEvaluationFullDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudentEvaluationFullDetail(vars: GetStudentEvaluationFullDetailVariables): QueryPromise<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;

interface GetStudentEvaluationFullDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentEvaluationFullDetailVariables): QueryRef<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;
}
export const getStudentEvaluationFullDetailRef: GetStudentEvaluationFullDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudentEvaluationFullDetail(dc: DataConnect, vars: GetStudentEvaluationFullDetailVariables): QueryPromise<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;

interface GetStudentEvaluationFullDetailRef {
  ...
  (dc: DataConnect, vars: GetStudentEvaluationFullDetailVariables): QueryRef<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;
}
export const getStudentEvaluationFullDetailRef: GetStudentEvaluationFullDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentEvaluationFullDetailRef:
```typescript
const name = getStudentEvaluationFullDetailRef.operationName;
console.log(name);
```

### Variables
The `GetStudentEvaluationFullDetail` query requires an argument of type `GetStudentEvaluationFullDetailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentEvaluationFullDetailVariables {
  studentEvaluationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetStudentEvaluationFullDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentEvaluationFullDetailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStudentEvaluationFullDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationFullDetail, GetStudentEvaluationFullDetailVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationFullDetail` query requires an argument of type `GetStudentEvaluationFullDetailVariables`:
const getStudentEvaluationFullDetailVars: GetStudentEvaluationFullDetailVariables = {
  studentEvaluationId: ..., 
};

// Call the `getStudentEvaluationFullDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudentEvaluationFullDetail(getStudentEvaluationFullDetailVars);
// Variables can be defined inline as well.
const { data } = await getStudentEvaluationFullDetail({ studentEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudentEvaluationFullDetail(dataConnect, getStudentEvaluationFullDetailVars);

console.log(data.studentCourseEvaluations);
console.log(data.studentEvaluationQuestions);

// Or, you can use the `Promise` API.
getStudentEvaluationFullDetail(getStudentEvaluationFullDetailVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluations);
  console.log(data.studentEvaluationQuestions);
});
```

### Using `GetStudentEvaluationFullDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentEvaluationFullDetailRef, GetStudentEvaluationFullDetailVariables } from '@dataconnect/generated';

// The `GetStudentEvaluationFullDetail` query requires an argument of type `GetStudentEvaluationFullDetailVariables`:
const getStudentEvaluationFullDetailVars: GetStudentEvaluationFullDetailVariables = {
  studentEvaluationId: ..., 
};

// Call the `getStudentEvaluationFullDetailRef()` function to get a reference to the query.
const ref = getStudentEvaluationFullDetailRef(getStudentEvaluationFullDetailVars);
// Variables can be defined inline as well.
const ref = getStudentEvaluationFullDetailRef({ studentEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentEvaluationFullDetailRef(dataConnect, getStudentEvaluationFullDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studentCourseEvaluations);
console.log(data.studentEvaluationQuestions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluations);
  console.log(data.studentEvaluationQuestions);
});
```

## GetCourseEvaluationsByUser
You can execute the `GetCourseEvaluationsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseEvaluationsByUser(vars: GetCourseEvaluationsByUserVariables): QueryPromise<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;

interface GetCourseEvaluationsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseEvaluationsByUserVariables): QueryRef<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;
}
export const getCourseEvaluationsByUserRef: GetCourseEvaluationsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseEvaluationsByUser(dc: DataConnect, vars: GetCourseEvaluationsByUserVariables): QueryPromise<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;

interface GetCourseEvaluationsByUserRef {
  ...
  (dc: DataConnect, vars: GetCourseEvaluationsByUserVariables): QueryRef<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;
}
export const getCourseEvaluationsByUserRef: GetCourseEvaluationsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseEvaluationsByUserRef:
```typescript
const name = getCourseEvaluationsByUserRef.operationName;
console.log(name);
```

### Variables
The `GetCourseEvaluationsByUser` query requires an argument of type `GetCourseEvaluationsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseEvaluationsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `GetCourseEvaluationsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseEvaluationsByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseEvaluationsByUserData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
}
```
### Using `GetCourseEvaluationsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseEvaluationsByUser, GetCourseEvaluationsByUserVariables } from '@dataconnect/generated';

// The `GetCourseEvaluationsByUser` query requires an argument of type `GetCourseEvaluationsByUserVariables`:
const getCourseEvaluationsByUserVars: GetCourseEvaluationsByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getCourseEvaluationsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseEvaluationsByUser(getCourseEvaluationsByUserVars);
// Variables can be defined inline as well.
const { data } = await getCourseEvaluationsByUser({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseEvaluationsByUser(dataConnect, getCourseEvaluationsByUserVars);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
getCourseEvaluationsByUser(getCourseEvaluationsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

### Using `GetCourseEvaluationsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseEvaluationsByUserRef, GetCourseEvaluationsByUserVariables } from '@dataconnect/generated';

// The `GetCourseEvaluationsByUser` query requires an argument of type `GetCourseEvaluationsByUserVariables`:
const getCourseEvaluationsByUserVars: GetCourseEvaluationsByUserVariables = {
  userId: ..., 
  firebaseId: ..., 
};

// Call the `getCourseEvaluationsByUserRef()` function to get a reference to the query.
const ref = getCourseEvaluationsByUserRef(getCourseEvaluationsByUserVars);
// Variables can be defined inline as well.
const ref = getCourseEvaluationsByUserRef({ userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseEvaluationsByUserRef(dataConnect, getCourseEvaluationsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

## GetCourseEvaluationById
You can execute the `GetCourseEvaluationById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseEvaluationById(vars: GetCourseEvaluationByIdVariables): QueryPromise<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;

interface GetCourseEvaluationByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseEvaluationByIdVariables): QueryRef<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;
}
export const getCourseEvaluationByIdRef: GetCourseEvaluationByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseEvaluationById(dc: DataConnect, vars: GetCourseEvaluationByIdVariables): QueryPromise<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;

interface GetCourseEvaluationByIdRef {
  ...
  (dc: DataConnect, vars: GetCourseEvaluationByIdVariables): QueryRef<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;
}
export const getCourseEvaluationByIdRef: GetCourseEvaluationByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseEvaluationByIdRef:
```typescript
const name = getCourseEvaluationByIdRef.operationName;
console.log(name);
```

### Variables
The `GetCourseEvaluationById` query requires an argument of type `GetCourseEvaluationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseEvaluationByIdVariables {
  courseEvaluationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourseEvaluationById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseEvaluationByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseEvaluationByIdData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
}
```
### Using `GetCourseEvaluationById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseEvaluationById, GetCourseEvaluationByIdVariables } from '@dataconnect/generated';

// The `GetCourseEvaluationById` query requires an argument of type `GetCourseEvaluationByIdVariables`:
const getCourseEvaluationByIdVars: GetCourseEvaluationByIdVariables = {
  courseEvaluationId: ..., 
};

// Call the `getCourseEvaluationById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseEvaluationById(getCourseEvaluationByIdVars);
// Variables can be defined inline as well.
const { data } = await getCourseEvaluationById({ courseEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseEvaluationById(dataConnect, getCourseEvaluationByIdVars);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
getCourseEvaluationById(getCourseEvaluationByIdVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

### Using `GetCourseEvaluationById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseEvaluationByIdRef, GetCourseEvaluationByIdVariables } from '@dataconnect/generated';

// The `GetCourseEvaluationById` query requires an argument of type `GetCourseEvaluationByIdVariables`:
const getCourseEvaluationByIdVars: GetCourseEvaluationByIdVariables = {
  courseEvaluationId: ..., 
};

// Call the `getCourseEvaluationByIdRef()` function to get a reference to the query.
const ref = getCourseEvaluationByIdRef(getCourseEvaluationByIdVars);
// Variables can be defined inline as well.
const ref = getCourseEvaluationByIdRef({ courseEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseEvaluationByIdRef(dataConnect, getCourseEvaluationByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

## GetEvaluationsForCourse
You can execute the `GetEvaluationsForCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEvaluationsForCourse(vars: GetEvaluationsForCourseVariables): QueryPromise<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;

interface GetEvaluationsForCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEvaluationsForCourseVariables): QueryRef<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;
}
export const getEvaluationsForCourseRef: GetEvaluationsForCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEvaluationsForCourse(dc: DataConnect, vars: GetEvaluationsForCourseVariables): QueryPromise<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;

interface GetEvaluationsForCourseRef {
  ...
  (dc: DataConnect, vars: GetEvaluationsForCourseVariables): QueryRef<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;
}
export const getEvaluationsForCourseRef: GetEvaluationsForCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEvaluationsForCourseRef:
```typescript
const name = getEvaluationsForCourseRef.operationName;
console.log(name);
```

### Variables
The `GetEvaluationsForCourse` query requires an argument of type `GetEvaluationsForCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEvaluationsForCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetEvaluationsForCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEvaluationsForCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEvaluationsForCourseData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
}
```
### Using `GetEvaluationsForCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEvaluationsForCourse, GetEvaluationsForCourseVariables } from '@dataconnect/generated';

// The `GetEvaluationsForCourse` query requires an argument of type `GetEvaluationsForCourseVariables`:
const getEvaluationsForCourseVars: GetEvaluationsForCourseVariables = {
  courseId: ..., 
};

// Call the `getEvaluationsForCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEvaluationsForCourse(getEvaluationsForCourseVars);
// Variables can be defined inline as well.
const { data } = await getEvaluationsForCourse({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEvaluationsForCourse(dataConnect, getEvaluationsForCourseVars);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
getEvaluationsForCourse(getEvaluationsForCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

### Using `GetEvaluationsForCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEvaluationsForCourseRef, GetEvaluationsForCourseVariables } from '@dataconnect/generated';

// The `GetEvaluationsForCourse` query requires an argument of type `GetEvaluationsForCourseVariables`:
const getEvaluationsForCourseVars: GetEvaluationsForCourseVariables = {
  courseId: ..., 
};

// Call the `getEvaluationsForCourseRef()` function to get a reference to the query.
const ref = getEvaluationsForCourseRef(getEvaluationsForCourseVars);
// Variables can be defined inline as well.
const ref = getEvaluationsForCourseRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEvaluationsForCourseRef(dataConnect, getEvaluationsForCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

## GetCoursesForEvaluation
You can execute the `GetCoursesForEvaluation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCoursesForEvaluation(vars: GetCoursesForEvaluationVariables): QueryPromise<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;

interface GetCoursesForEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCoursesForEvaluationVariables): QueryRef<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;
}
export const getCoursesForEvaluationRef: GetCoursesForEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCoursesForEvaluation(dc: DataConnect, vars: GetCoursesForEvaluationVariables): QueryPromise<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;

interface GetCoursesForEvaluationRef {
  ...
  (dc: DataConnect, vars: GetCoursesForEvaluationVariables): QueryRef<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;
}
export const getCoursesForEvaluationRef: GetCoursesForEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCoursesForEvaluationRef:
```typescript
const name = getCoursesForEvaluationRef.operationName;
console.log(name);
```

### Variables
The `GetCoursesForEvaluation` query requires an argument of type `GetCoursesForEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCoursesForEvaluationVariables {
  evaluationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCoursesForEvaluation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCoursesForEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCoursesForEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCoursesForEvaluation, GetCoursesForEvaluationVariables } from '@dataconnect/generated';

// The `GetCoursesForEvaluation` query requires an argument of type `GetCoursesForEvaluationVariables`:
const getCoursesForEvaluationVars: GetCoursesForEvaluationVariables = {
  evaluationId: ..., 
};

// Call the `getCoursesForEvaluation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCoursesForEvaluation(getCoursesForEvaluationVars);
// Variables can be defined inline as well.
const { data } = await getCoursesForEvaluation({ evaluationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCoursesForEvaluation(dataConnect, getCoursesForEvaluationVars);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
getCoursesForEvaluation(getCoursesForEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

### Using `GetCoursesForEvaluation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCoursesForEvaluationRef, GetCoursesForEvaluationVariables } from '@dataconnect/generated';

// The `GetCoursesForEvaluation` query requires an argument of type `GetCoursesForEvaluationVariables`:
const getCoursesForEvaluationVars: GetCoursesForEvaluationVariables = {
  evaluationId: ..., 
};

// Call the `getCoursesForEvaluationRef()` function to get a reference to the query.
const ref = getCoursesForEvaluationRef(getCoursesForEvaluationVars);
// Variables can be defined inline as well.
const ref = getCoursesForEvaluationRef({ evaluationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCoursesForEvaluationRef(dataConnect, getCoursesForEvaluationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

## GetCourseEvaluationByAccessCode
You can execute the `GetCourseEvaluationByAccessCode` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseEvaluationByAccessCode(vars: GetCourseEvaluationByAccessCodeVariables): QueryPromise<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;

interface GetCourseEvaluationByAccessCodeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseEvaluationByAccessCodeVariables): QueryRef<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;
}
export const getCourseEvaluationByAccessCodeRef: GetCourseEvaluationByAccessCodeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseEvaluationByAccessCode(dc: DataConnect, vars: GetCourseEvaluationByAccessCodeVariables): QueryPromise<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;

interface GetCourseEvaluationByAccessCodeRef {
  ...
  (dc: DataConnect, vars: GetCourseEvaluationByAccessCodeVariables): QueryRef<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;
}
export const getCourseEvaluationByAccessCodeRef: GetCourseEvaluationByAccessCodeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseEvaluationByAccessCodeRef:
```typescript
const name = getCourseEvaluationByAccessCodeRef.operationName;
console.log(name);
```

### Variables
The `GetCourseEvaluationByAccessCode` query requires an argument of type `GetCourseEvaluationByAccessCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseEvaluationByAccessCodeVariables {
  accessCode: string;
}
```
### Return Type
Recall that executing the `GetCourseEvaluationByAccessCode` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseEvaluationByAccessCodeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCourseEvaluationByAccessCode`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseEvaluationByAccessCode, GetCourseEvaluationByAccessCodeVariables } from '@dataconnect/generated';

// The `GetCourseEvaluationByAccessCode` query requires an argument of type `GetCourseEvaluationByAccessCodeVariables`:
const getCourseEvaluationByAccessCodeVars: GetCourseEvaluationByAccessCodeVariables = {
  accessCode: ..., 
};

// Call the `getCourseEvaluationByAccessCode()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseEvaluationByAccessCode(getCourseEvaluationByAccessCodeVars);
// Variables can be defined inline as well.
const { data } = await getCourseEvaluationByAccessCode({ accessCode: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseEvaluationByAccessCode(dataConnect, getCourseEvaluationByAccessCodeVars);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
getCourseEvaluationByAccessCode(getCourseEvaluationByAccessCodeVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

### Using `GetCourseEvaluationByAccessCode`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseEvaluationByAccessCodeRef, GetCourseEvaluationByAccessCodeVariables } from '@dataconnect/generated';

// The `GetCourseEvaluationByAccessCode` query requires an argument of type `GetCourseEvaluationByAccessCodeVariables`:
const getCourseEvaluationByAccessCodeVars: GetCourseEvaluationByAccessCodeVariables = {
  accessCode: ..., 
};

// Call the `getCourseEvaluationByAccessCodeRef()` function to get a reference to the query.
const ref = getCourseEvaluationByAccessCodeRef(getCourseEvaluationByAccessCodeVars);
// Variables can be defined inline as well.
const ref = getCourseEvaluationByAccessCodeRef({ accessCode: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseEvaluationByAccessCodeRef(dataConnect, getCourseEvaluationByAccessCodeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseEvaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
});
```

## GetCourseEvaluationDetails
You can execute the `GetCourseEvaluationDetails` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseEvaluationDetails(vars: GetCourseEvaluationDetailsVariables): QueryPromise<GetCourseEvaluationDetailsData, GetCourseEvaluationDetailsVariables>;

interface GetCourseEvaluationDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseEvaluationDetailsVariables): QueryRef<GetCourseEvaluationDetailsData, GetCourseEvaluationDetailsVariables>;
}
export const getCourseEvaluationDetailsRef: GetCourseEvaluationDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseEvaluationDetails(dc: DataConnect, vars: GetCourseEvaluationDetailsVariables): QueryPromise<GetCourseEvaluationDetailsData, GetCourseEvaluationDetailsVariables>;

interface GetCourseEvaluationDetailsRef {
  ...
  (dc: DataConnect, vars: GetCourseEvaluationDetailsVariables): QueryRef<GetCourseEvaluationDetailsData, GetCourseEvaluationDetailsVariables>;
}
export const getCourseEvaluationDetailsRef: GetCourseEvaluationDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseEvaluationDetailsRef:
```typescript
const name = getCourseEvaluationDetailsRef.operationName;
console.log(name);
```

### Variables
The `GetCourseEvaluationDetails` query requires an argument of type `GetCourseEvaluationDetailsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseEvaluationDetailsVariables {
  courseId: UUIDString;
  evaluationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourseEvaluationDetails` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseEvaluationDetailsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseEvaluationDetailsData {
  courseEvaluations: ({
    courseEvaluationId: UUIDString;
    courseId: UUIDString;
    evaluationId: UUIDString;
    scheduledDate: DateString;
    durationMinutes: number;
    createdAt: TimestampString;
    createdBy: UUIDString;
  } & CourseEvaluation_Key)[];
    courses: ({
      courseId: UUIDString;
      name: string;
      code: string;
      section?: string | null;
      institutionName: string;
      active: boolean;
    } & Course_Key)[];
      evaluations: ({
        evaluationId: UUIDString;
        title: string;
        gradeScale: string;
        state: string;
        allowQuestionSubset: boolean;
        questionSubsetPercent?: number | null;
      } & Evaluation_Key)[];
}
```
### Using `GetCourseEvaluationDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseEvaluationDetails, GetCourseEvaluationDetailsVariables } from '@dataconnect/generated';

// The `GetCourseEvaluationDetails` query requires an argument of type `GetCourseEvaluationDetailsVariables`:
const getCourseEvaluationDetailsVars: GetCourseEvaluationDetailsVariables = {
  courseId: ..., 
  evaluationId: ..., 
};

// Call the `getCourseEvaluationDetails()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseEvaluationDetails(getCourseEvaluationDetailsVars);
// Variables can be defined inline as well.
const { data } = await getCourseEvaluationDetails({ courseId: ..., evaluationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseEvaluationDetails(dataConnect, getCourseEvaluationDetailsVars);

console.log(data.courseEvaluations);
console.log(data.courses);
console.log(data.evaluations);

// Or, you can use the `Promise` API.
getCourseEvaluationDetails(getCourseEvaluationDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
  console.log(data.courses);
  console.log(data.evaluations);
});
```

### Using `GetCourseEvaluationDetails`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseEvaluationDetailsRef, GetCourseEvaluationDetailsVariables } from '@dataconnect/generated';

// The `GetCourseEvaluationDetails` query requires an argument of type `GetCourseEvaluationDetailsVariables`:
const getCourseEvaluationDetailsVars: GetCourseEvaluationDetailsVariables = {
  courseId: ..., 
  evaluationId: ..., 
};

// Call the `getCourseEvaluationDetailsRef()` function to get a reference to the query.
const ref = getCourseEvaluationDetailsRef(getCourseEvaluationDetailsVars);
// Variables can be defined inline as well.
const ref = getCourseEvaluationDetailsRef({ courseId: ..., evaluationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseEvaluationDetailsRef(dataConnect, getCourseEvaluationDetailsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseEvaluations);
console.log(data.courses);
console.log(data.evaluations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluations);
  console.log(data.courses);
  console.log(data.evaluations);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  userId: UUIDString;
  firebaseId: string;
  name: string;
  email: string;
  role: string;
  createdBy: UUIDString;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  userId: ..., 
  firebaseId: ..., 
  name: ..., 
  email: ..., 
  role: ..., 
  createdBy: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ userId: ..., firebaseId: ..., name: ..., email: ..., role: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  userId: ..., 
  firebaseId: ..., 
  name: ..., 
  email: ..., 
  role: ..., 
  createdBy: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ userId: ..., firebaseId: ..., name: ..., email: ..., role: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  userId: UUIDString;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  userId: ..., 
  name: ..., // optional
  email: ..., // optional
  role: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ userId: ..., name: ..., email: ..., role: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  userId: ..., 
  name: ..., // optional
  email: ..., // optional
  role: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ userId: ..., name: ..., email: ..., role: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## CreateSubject
You can execute the `CreateSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSubject(vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;

interface CreateSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
}
export const createSubjectRef: CreateSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSubject(dc: DataConnect, vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;

interface CreateSubjectRef {
  ...
  (dc: DataConnect, vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
}
export const createSubjectRef: CreateSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSubjectRef:
```typescript
const name = createSubjectRef.operationName;
console.log(name);
```

### Variables
The `CreateSubject` mutation requires an argument of type `CreateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSubjectVariables {
  subjectId: UUIDString;
  name: string;
  code: string;
  levelId: UUIDString;
  description?: string | null;
  createdBy: UUIDString;
}
```
### Return Type
Recall that executing the `CreateSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSubjectData {
  subject_insert: Subject_Key;
}
```
### Using `CreateSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSubject, CreateSubjectVariables } from '@dataconnect/generated';

// The `CreateSubject` mutation requires an argument of type `CreateSubjectVariables`:
const createSubjectVars: CreateSubjectVariables = {
  subjectId: ..., 
  name: ..., 
  code: ..., 
  levelId: ..., 
  description: ..., // optional
  createdBy: ..., 
};

// Call the `createSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSubject(createSubjectVars);
// Variables can be defined inline as well.
const { data } = await createSubject({ subjectId: ..., name: ..., code: ..., levelId: ..., description: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSubject(dataConnect, createSubjectVars);

console.log(data.subject_insert);

// Or, you can use the `Promise` API.
createSubject(createSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject_insert);
});
```

### Using `CreateSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSubjectRef, CreateSubjectVariables } from '@dataconnect/generated';

// The `CreateSubject` mutation requires an argument of type `CreateSubjectVariables`:
const createSubjectVars: CreateSubjectVariables = {
  subjectId: ..., 
  name: ..., 
  code: ..., 
  levelId: ..., 
  description: ..., // optional
  createdBy: ..., 
};

// Call the `createSubjectRef()` function to get a reference to the mutation.
const ref = createSubjectRef(createSubjectVars);
// Variables can be defined inline as well.
const ref = createSubjectRef({ subjectId: ..., name: ..., code: ..., levelId: ..., description: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSubjectRef(dataConnect, createSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subject_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subject_insert);
});
```

## UpdateSubject
You can execute the `UpdateSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSubject(vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;

interface UpdateSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
}
export const updateSubjectRef: UpdateSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSubject(dc: DataConnect, vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;

interface UpdateSubjectRef {
  ...
  (dc: DataConnect, vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
}
export const updateSubjectRef: UpdateSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSubjectRef:
```typescript
const name = updateSubjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateSubject` mutation requires an argument of type `UpdateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSubjectVariables {
  subjectId: UUIDString;
  name?: string | null;
  code?: string | null;
  description?: string | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `UpdateSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSubjectData {
  subject_update?: Subject_Key | null;
}
```
### Using `UpdateSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSubject, UpdateSubjectVariables } from '@dataconnect/generated';

// The `UpdateSubject` mutation requires an argument of type `UpdateSubjectVariables`:
const updateSubjectVars: UpdateSubjectVariables = {
  subjectId: ..., 
  name: ..., // optional
  code: ..., // optional
  description: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSubject(updateSubjectVars);
// Variables can be defined inline as well.
const { data } = await updateSubject({ subjectId: ..., name: ..., code: ..., description: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSubject(dataConnect, updateSubjectVars);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
updateSubject(updateSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

### Using `UpdateSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSubjectRef, UpdateSubjectVariables } from '@dataconnect/generated';

// The `UpdateSubject` mutation requires an argument of type `UpdateSubjectVariables`:
const updateSubjectVars: UpdateSubjectVariables = {
  subjectId: ..., 
  name: ..., // optional
  code: ..., // optional
  description: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateSubjectRef()` function to get a reference to the mutation.
const ref = updateSubjectRef(updateSubjectVars);
// Variables can be defined inline as well.
const ref = updateSubjectRef({ subjectId: ..., name: ..., code: ..., description: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSubjectRef(dataConnect, updateSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

## DeactivateSubject
You can execute the `DeactivateSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateSubject(vars: DeactivateSubjectVariables): MutationPromise<DeactivateSubjectData, DeactivateSubjectVariables>;

interface DeactivateSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateSubjectVariables): MutationRef<DeactivateSubjectData, DeactivateSubjectVariables>;
}
export const deactivateSubjectRef: DeactivateSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateSubject(dc: DataConnect, vars: DeactivateSubjectVariables): MutationPromise<DeactivateSubjectData, DeactivateSubjectVariables>;

interface DeactivateSubjectRef {
  ...
  (dc: DataConnect, vars: DeactivateSubjectVariables): MutationRef<DeactivateSubjectData, DeactivateSubjectVariables>;
}
export const deactivateSubjectRef: DeactivateSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateSubjectRef:
```typescript
const name = deactivateSubjectRef.operationName;
console.log(name);
```

### Variables
The `DeactivateSubject` mutation requires an argument of type `DeactivateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateSubjectVariables {
  subjectId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateSubjectData {
  subject_update?: Subject_Key | null;
}
```
### Using `DeactivateSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateSubject, DeactivateSubjectVariables } from '@dataconnect/generated';

// The `DeactivateSubject` mutation requires an argument of type `DeactivateSubjectVariables`:
const deactivateSubjectVars: DeactivateSubjectVariables = {
  subjectId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateSubject(deactivateSubjectVars);
// Variables can be defined inline as well.
const { data } = await deactivateSubject({ subjectId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateSubject(dataConnect, deactivateSubjectVars);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
deactivateSubject(deactivateSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

### Using `DeactivateSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateSubjectRef, DeactivateSubjectVariables } from '@dataconnect/generated';

// The `DeactivateSubject` mutation requires an argument of type `DeactivateSubjectVariables`:
const deactivateSubjectVars: DeactivateSubjectVariables = {
  subjectId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateSubjectRef()` function to get a reference to the mutation.
const ref = deactivateSubjectRef(deactivateSubjectVars);
// Variables can be defined inline as well.
const ref = deactivateSubjectRef({ subjectId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateSubjectRef(dataConnect, deactivateSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

## ReactivateSubject
You can execute the `ReactivateSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateSubject(vars: ReactivateSubjectVariables): MutationPromise<ReactivateSubjectData, ReactivateSubjectVariables>;

interface ReactivateSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateSubjectVariables): MutationRef<ReactivateSubjectData, ReactivateSubjectVariables>;
}
export const reactivateSubjectRef: ReactivateSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateSubject(dc: DataConnect, vars: ReactivateSubjectVariables): MutationPromise<ReactivateSubjectData, ReactivateSubjectVariables>;

interface ReactivateSubjectRef {
  ...
  (dc: DataConnect, vars: ReactivateSubjectVariables): MutationRef<ReactivateSubjectData, ReactivateSubjectVariables>;
}
export const reactivateSubjectRef: ReactivateSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateSubjectRef:
```typescript
const name = reactivateSubjectRef.operationName;
console.log(name);
```

### Variables
The `ReactivateSubject` mutation requires an argument of type `ReactivateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateSubjectVariables {
  subjectId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateSubjectData {
  subject_update?: Subject_Key | null;
}
```
### Using `ReactivateSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateSubject, ReactivateSubjectVariables } from '@dataconnect/generated';

// The `ReactivateSubject` mutation requires an argument of type `ReactivateSubjectVariables`:
const reactivateSubjectVars: ReactivateSubjectVariables = {
  subjectId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateSubject(reactivateSubjectVars);
// Variables can be defined inline as well.
const { data } = await reactivateSubject({ subjectId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateSubject(dataConnect, reactivateSubjectVars);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
reactivateSubject(reactivateSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

### Using `ReactivateSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateSubjectRef, ReactivateSubjectVariables } from '@dataconnect/generated';

// The `ReactivateSubject` mutation requires an argument of type `ReactivateSubjectVariables`:
const reactivateSubjectVars: ReactivateSubjectVariables = {
  subjectId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateSubjectRef()` function to get a reference to the mutation.
const ref = reactivateSubjectRef(reactivateSubjectVars);
// Variables can be defined inline as well.
const ref = reactivateSubjectRef({ subjectId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateSubjectRef(dataConnect, reactivateSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

## CreateUnit
You can execute the `CreateUnit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUnit(vars: CreateUnitVariables): MutationPromise<CreateUnitData, CreateUnitVariables>;

interface CreateUnitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUnitVariables): MutationRef<CreateUnitData, CreateUnitVariables>;
}
export const createUnitRef: CreateUnitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUnit(dc: DataConnect, vars: CreateUnitVariables): MutationPromise<CreateUnitData, CreateUnitVariables>;

interface CreateUnitRef {
  ...
  (dc: DataConnect, vars: CreateUnitVariables): MutationRef<CreateUnitData, CreateUnitVariables>;
}
export const createUnitRef: CreateUnitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUnitRef:
```typescript
const name = createUnitRef.operationName;
console.log(name);
```

### Variables
The `CreateUnit` mutation requires an argument of type `CreateUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUnitVariables {
  unitId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  subjectId: UUIDString;
  createdBy: UUIDString;
}
```
### Return Type
Recall that executing the `CreateUnit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUnitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUnitData {
  unit_insert: Unit_Key;
}
```
### Using `CreateUnit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUnit, CreateUnitVariables } from '@dataconnect/generated';

// The `CreateUnit` mutation requires an argument of type `CreateUnitVariables`:
const createUnitVars: CreateUnitVariables = {
  unitId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  createdBy: ..., 
};

// Call the `createUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUnit(createUnitVars);
// Variables can be defined inline as well.
const { data } = await createUnit({ unitId: ..., code: ..., name: ..., description: ..., subjectId: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUnit(dataConnect, createUnitVars);

console.log(data.unit_insert);

// Or, you can use the `Promise` API.
createUnit(createUnitVars).then((response) => {
  const data = response.data;
  console.log(data.unit_insert);
});
```

### Using `CreateUnit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUnitRef, CreateUnitVariables } from '@dataconnect/generated';

// The `CreateUnit` mutation requires an argument of type `CreateUnitVariables`:
const createUnitVars: CreateUnitVariables = {
  unitId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  createdBy: ..., 
};

// Call the `createUnitRef()` function to get a reference to the mutation.
const ref = createUnitRef(createUnitVars);
// Variables can be defined inline as well.
const ref = createUnitRef({ unitId: ..., code: ..., name: ..., description: ..., subjectId: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUnitRef(dataConnect, createUnitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.unit_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.unit_insert);
});
```

## UpdateUnit
You can execute the `UpdateUnit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUnit(vars: UpdateUnitVariables): MutationPromise<UpdateUnitData, UpdateUnitVariables>;

interface UpdateUnitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUnitVariables): MutationRef<UpdateUnitData, UpdateUnitVariables>;
}
export const updateUnitRef: UpdateUnitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUnit(dc: DataConnect, vars: UpdateUnitVariables): MutationPromise<UpdateUnitData, UpdateUnitVariables>;

interface UpdateUnitRef {
  ...
  (dc: DataConnect, vars: UpdateUnitVariables): MutationRef<UpdateUnitData, UpdateUnitVariables>;
}
export const updateUnitRef: UpdateUnitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUnitRef:
```typescript
const name = updateUnitRef.operationName;
console.log(name);
```

### Variables
The `UpdateUnit` mutation requires an argument of type `UpdateUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateUnit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUnitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUnitData {
  unit_update?: Unit_Key | null;
}
```
### Using `UpdateUnit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUnit, UpdateUnitVariables } from '@dataconnect/generated';

// The `UpdateUnit` mutation requires an argument of type `UpdateUnitVariables`:
const updateUnitVars: UpdateUnitVariables = {
  unitId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUnit(updateUnitVars);
// Variables can be defined inline as well.
const { data } = await updateUnit({ unitId: ..., code: ..., name: ..., description: ..., subjectId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUnit(dataConnect, updateUnitVars);

console.log(data.unit_update);

// Or, you can use the `Promise` API.
updateUnit(updateUnitVars).then((response) => {
  const data = response.data;
  console.log(data.unit_update);
});
```

### Using `UpdateUnit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUnitRef, UpdateUnitVariables } from '@dataconnect/generated';

// The `UpdateUnit` mutation requires an argument of type `UpdateUnitVariables`:
const updateUnitVars: UpdateUnitVariables = {
  unitId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateUnitRef()` function to get a reference to the mutation.
const ref = updateUnitRef(updateUnitVars);
// Variables can be defined inline as well.
const ref = updateUnitRef({ unitId: ..., code: ..., name: ..., description: ..., subjectId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUnitRef(dataConnect, updateUnitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.unit_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.unit_update);
});
```

## DeactivateUnit
You can execute the `DeactivateUnit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateUnit(vars: DeactivateUnitVariables): MutationPromise<DeactivateUnitData, DeactivateUnitVariables>;

interface DeactivateUnitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateUnitVariables): MutationRef<DeactivateUnitData, DeactivateUnitVariables>;
}
export const deactivateUnitRef: DeactivateUnitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateUnit(dc: DataConnect, vars: DeactivateUnitVariables): MutationPromise<DeactivateUnitData, DeactivateUnitVariables>;

interface DeactivateUnitRef {
  ...
  (dc: DataConnect, vars: DeactivateUnitVariables): MutationRef<DeactivateUnitData, DeactivateUnitVariables>;
}
export const deactivateUnitRef: DeactivateUnitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateUnitRef:
```typescript
const name = deactivateUnitRef.operationName;
console.log(name);
```

### Variables
The `DeactivateUnit` mutation requires an argument of type `DeactivateUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateUnitVariables {
  unitId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateUnit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateUnitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateUnitData {
  unit_update?: Unit_Key | null;
}
```
### Using `DeactivateUnit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateUnit, DeactivateUnitVariables } from '@dataconnect/generated';

// The `DeactivateUnit` mutation requires an argument of type `DeactivateUnitVariables`:
const deactivateUnitVars: DeactivateUnitVariables = {
  unitId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateUnit(deactivateUnitVars);
// Variables can be defined inline as well.
const { data } = await deactivateUnit({ unitId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateUnit(dataConnect, deactivateUnitVars);

console.log(data.unit_update);

// Or, you can use the `Promise` API.
deactivateUnit(deactivateUnitVars).then((response) => {
  const data = response.data;
  console.log(data.unit_update);
});
```

### Using `DeactivateUnit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateUnitRef, DeactivateUnitVariables } from '@dataconnect/generated';

// The `DeactivateUnit` mutation requires an argument of type `DeactivateUnitVariables`:
const deactivateUnitVars: DeactivateUnitVariables = {
  unitId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateUnitRef()` function to get a reference to the mutation.
const ref = deactivateUnitRef(deactivateUnitVars);
// Variables can be defined inline as well.
const ref = deactivateUnitRef({ unitId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateUnitRef(dataConnect, deactivateUnitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.unit_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.unit_update);
});
```

## ReactivateUnit
You can execute the `ReactivateUnit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateUnit(vars: ReactivateUnitVariables): MutationPromise<ReactivateUnitData, ReactivateUnitVariables>;

interface ReactivateUnitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateUnitVariables): MutationRef<ReactivateUnitData, ReactivateUnitVariables>;
}
export const reactivateUnitRef: ReactivateUnitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateUnit(dc: DataConnect, vars: ReactivateUnitVariables): MutationPromise<ReactivateUnitData, ReactivateUnitVariables>;

interface ReactivateUnitRef {
  ...
  (dc: DataConnect, vars: ReactivateUnitVariables): MutationRef<ReactivateUnitData, ReactivateUnitVariables>;
}
export const reactivateUnitRef: ReactivateUnitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateUnitRef:
```typescript
const name = reactivateUnitRef.operationName;
console.log(name);
```

### Variables
The `ReactivateUnit` mutation requires an argument of type `ReactivateUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateUnitVariables {
  unitId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateUnit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateUnitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateUnitData {
  unit_update?: Unit_Key | null;
}
```
### Using `ReactivateUnit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateUnit, ReactivateUnitVariables } from '@dataconnect/generated';

// The `ReactivateUnit` mutation requires an argument of type `ReactivateUnitVariables`:
const reactivateUnitVars: ReactivateUnitVariables = {
  unitId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateUnit(reactivateUnitVars);
// Variables can be defined inline as well.
const { data } = await reactivateUnit({ unitId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateUnit(dataConnect, reactivateUnitVars);

console.log(data.unit_update);

// Or, you can use the `Promise` API.
reactivateUnit(reactivateUnitVars).then((response) => {
  const data = response.data;
  console.log(data.unit_update);
});
```

### Using `ReactivateUnit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateUnitRef, ReactivateUnitVariables } from '@dataconnect/generated';

// The `ReactivateUnit` mutation requires an argument of type `ReactivateUnitVariables`:
const reactivateUnitVars: ReactivateUnitVariables = {
  unitId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateUnitRef()` function to get a reference to the mutation.
const ref = reactivateUnitRef(reactivateUnitVars);
// Variables can be defined inline as well.
const ref = reactivateUnitRef({ unitId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateUnitRef(dataConnect, reactivateUnitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.unit_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.unit_update);
});
```

## CreateTopic
You can execute the `CreateTopic` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTopic(vars: CreateTopicVariables): MutationPromise<CreateTopicData, CreateTopicVariables>;

interface CreateTopicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTopicVariables): MutationRef<CreateTopicData, CreateTopicVariables>;
}
export const createTopicRef: CreateTopicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTopic(dc: DataConnect, vars: CreateTopicVariables): MutationPromise<CreateTopicData, CreateTopicVariables>;

interface CreateTopicRef {
  ...
  (dc: DataConnect, vars: CreateTopicVariables): MutationRef<CreateTopicData, CreateTopicVariables>;
}
export const createTopicRef: CreateTopicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTopicRef:
```typescript
const name = createTopicRef.operationName;
console.log(name);
```

### Variables
The `CreateTopic` mutation requires an argument of type `CreateTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTopicVariables {
  topicId: UUIDString;
  code: string;
  name: string;
  unitId: UUIDString;
  createdBy: UUIDString;
}
```
### Return Type
Recall that executing the `CreateTopic` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTopicData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTopicData {
  topic_insert: Topic_Key;
}
```
### Using `CreateTopic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTopic, CreateTopicVariables } from '@dataconnect/generated';

// The `CreateTopic` mutation requires an argument of type `CreateTopicVariables`:
const createTopicVars: CreateTopicVariables = {
  topicId: ..., 
  code: ..., 
  name: ..., 
  unitId: ..., 
  createdBy: ..., 
};

// Call the `createTopic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTopic(createTopicVars);
// Variables can be defined inline as well.
const { data } = await createTopic({ topicId: ..., code: ..., name: ..., unitId: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTopic(dataConnect, createTopicVars);

console.log(data.topic_insert);

// Or, you can use the `Promise` API.
createTopic(createTopicVars).then((response) => {
  const data = response.data;
  console.log(data.topic_insert);
});
```

### Using `CreateTopic`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTopicRef, CreateTopicVariables } from '@dataconnect/generated';

// The `CreateTopic` mutation requires an argument of type `CreateTopicVariables`:
const createTopicVars: CreateTopicVariables = {
  topicId: ..., 
  code: ..., 
  name: ..., 
  unitId: ..., 
  createdBy: ..., 
};

// Call the `createTopicRef()` function to get a reference to the mutation.
const ref = createTopicRef(createTopicVars);
// Variables can be defined inline as well.
const ref = createTopicRef({ topicId: ..., code: ..., name: ..., unitId: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTopicRef(dataConnect, createTopicVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.topic_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.topic_insert);
});
```

## UpdateTopic
You can execute the `UpdateTopic` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTopic(vars: UpdateTopicVariables): MutationPromise<UpdateTopicData, UpdateTopicVariables>;

interface UpdateTopicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTopicVariables): MutationRef<UpdateTopicData, UpdateTopicVariables>;
}
export const updateTopicRef: UpdateTopicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTopic(dc: DataConnect, vars: UpdateTopicVariables): MutationPromise<UpdateTopicData, UpdateTopicVariables>;

interface UpdateTopicRef {
  ...
  (dc: DataConnect, vars: UpdateTopicVariables): MutationRef<UpdateTopicData, UpdateTopicVariables>;
}
export const updateTopicRef: UpdateTopicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTopicRef:
```typescript
const name = updateTopicRef.operationName;
console.log(name);
```

### Variables
The `UpdateTopic` mutation requires an argument of type `UpdateTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTopicVariables {
  topicId: UUIDString;
  unitId: UUIDString;
  code: string;
  name: string;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `UpdateTopic` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTopicData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTopicData {
  topic_update?: Topic_Key | null;
}
```
### Using `UpdateTopic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTopic, UpdateTopicVariables } from '@dataconnect/generated';

// The `UpdateTopic` mutation requires an argument of type `UpdateTopicVariables`:
const updateTopicVars: UpdateTopicVariables = {
  topicId: ..., 
  unitId: ..., 
  code: ..., 
  name: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateTopic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTopic(updateTopicVars);
// Variables can be defined inline as well.
const { data } = await updateTopic({ topicId: ..., unitId: ..., code: ..., name: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTopic(dataConnect, updateTopicVars);

console.log(data.topic_update);

// Or, you can use the `Promise` API.
updateTopic(updateTopicVars).then((response) => {
  const data = response.data;
  console.log(data.topic_update);
});
```

### Using `UpdateTopic`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTopicRef, UpdateTopicVariables } from '@dataconnect/generated';

// The `UpdateTopic` mutation requires an argument of type `UpdateTopicVariables`:
const updateTopicVars: UpdateTopicVariables = {
  topicId: ..., 
  unitId: ..., 
  code: ..., 
  name: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateTopicRef()` function to get a reference to the mutation.
const ref = updateTopicRef(updateTopicVars);
// Variables can be defined inline as well.
const ref = updateTopicRef({ topicId: ..., unitId: ..., code: ..., name: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTopicRef(dataConnect, updateTopicVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.topic_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.topic_update);
});
```

## DeactivateTopic
You can execute the `DeactivateTopic` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateTopic(vars: DeactivateTopicVariables): MutationPromise<DeactivateTopicData, DeactivateTopicVariables>;

interface DeactivateTopicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateTopicVariables): MutationRef<DeactivateTopicData, DeactivateTopicVariables>;
}
export const deactivateTopicRef: DeactivateTopicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateTopic(dc: DataConnect, vars: DeactivateTopicVariables): MutationPromise<DeactivateTopicData, DeactivateTopicVariables>;

interface DeactivateTopicRef {
  ...
  (dc: DataConnect, vars: DeactivateTopicVariables): MutationRef<DeactivateTopicData, DeactivateTopicVariables>;
}
export const deactivateTopicRef: DeactivateTopicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateTopicRef:
```typescript
const name = deactivateTopicRef.operationName;
console.log(name);
```

### Variables
The `DeactivateTopic` mutation requires an argument of type `DeactivateTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateTopicVariables {
  topicId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateTopic` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateTopicData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateTopicData {
  topic_update?: Topic_Key | null;
}
```
### Using `DeactivateTopic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateTopic, DeactivateTopicVariables } from '@dataconnect/generated';

// The `DeactivateTopic` mutation requires an argument of type `DeactivateTopicVariables`:
const deactivateTopicVars: DeactivateTopicVariables = {
  topicId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateTopic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateTopic(deactivateTopicVars);
// Variables can be defined inline as well.
const { data } = await deactivateTopic({ topicId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateTopic(dataConnect, deactivateTopicVars);

console.log(data.topic_update);

// Or, you can use the `Promise` API.
deactivateTopic(deactivateTopicVars).then((response) => {
  const data = response.data;
  console.log(data.topic_update);
});
```

### Using `DeactivateTopic`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateTopicRef, DeactivateTopicVariables } from '@dataconnect/generated';

// The `DeactivateTopic` mutation requires an argument of type `DeactivateTopicVariables`:
const deactivateTopicVars: DeactivateTopicVariables = {
  topicId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateTopicRef()` function to get a reference to the mutation.
const ref = deactivateTopicRef(deactivateTopicVars);
// Variables can be defined inline as well.
const ref = deactivateTopicRef({ topicId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateTopicRef(dataConnect, deactivateTopicVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.topic_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.topic_update);
});
```

## ReactivateTopic
You can execute the `ReactivateTopic` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateTopic(vars: ReactivateTopicVariables): MutationPromise<ReactivateTopicData, ReactivateTopicVariables>;

interface ReactivateTopicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateTopicVariables): MutationRef<ReactivateTopicData, ReactivateTopicVariables>;
}
export const reactivateTopicRef: ReactivateTopicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateTopic(dc: DataConnect, vars: ReactivateTopicVariables): MutationPromise<ReactivateTopicData, ReactivateTopicVariables>;

interface ReactivateTopicRef {
  ...
  (dc: DataConnect, vars: ReactivateTopicVariables): MutationRef<ReactivateTopicData, ReactivateTopicVariables>;
}
export const reactivateTopicRef: ReactivateTopicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateTopicRef:
```typescript
const name = reactivateTopicRef.operationName;
console.log(name);
```

### Variables
The `ReactivateTopic` mutation requires an argument of type `ReactivateTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateTopicVariables {
  topicId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateTopic` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateTopicData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateTopicData {
  topic_update?: Topic_Key | null;
}
```
### Using `ReactivateTopic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateTopic, ReactivateTopicVariables } from '@dataconnect/generated';

// The `ReactivateTopic` mutation requires an argument of type `ReactivateTopicVariables`:
const reactivateTopicVars: ReactivateTopicVariables = {
  topicId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateTopic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateTopic(reactivateTopicVars);
// Variables can be defined inline as well.
const { data } = await reactivateTopic({ topicId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateTopic(dataConnect, reactivateTopicVars);

console.log(data.topic_update);

// Or, you can use the `Promise` API.
reactivateTopic(reactivateTopicVars).then((response) => {
  const data = response.data;
  console.log(data.topic_update);
});
```

### Using `ReactivateTopic`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateTopicRef, ReactivateTopicVariables } from '@dataconnect/generated';

// The `ReactivateTopic` mutation requires an argument of type `ReactivateTopicVariables`:
const reactivateTopicVars: ReactivateTopicVariables = {
  topicId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateTopicRef()` function to get a reference to the mutation.
const ref = reactivateTopicRef(reactivateTopicVars);
// Variables can be defined inline as well.
const ref = reactivateTopicRef({ topicId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateTopicRef(dataConnect, reactivateTopicVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.topic_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.topic_update);
});
```

## CreateLevelCategory
You can execute the `CreateLevelCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createLevelCategory(vars: CreateLevelCategoryVariables): MutationPromise<CreateLevelCategoryData, CreateLevelCategoryVariables>;

interface CreateLevelCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLevelCategoryVariables): MutationRef<CreateLevelCategoryData, CreateLevelCategoryVariables>;
}
export const createLevelCategoryRef: CreateLevelCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLevelCategory(dc: DataConnect, vars: CreateLevelCategoryVariables): MutationPromise<CreateLevelCategoryData, CreateLevelCategoryVariables>;

interface CreateLevelCategoryRef {
  ...
  (dc: DataConnect, vars: CreateLevelCategoryVariables): MutationRef<CreateLevelCategoryData, CreateLevelCategoryVariables>;
}
export const createLevelCategoryRef: CreateLevelCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLevelCategoryRef:
```typescript
const name = createLevelCategoryRef.operationName;
console.log(name);
```

### Variables
The `CreateLevelCategory` mutation requires an argument of type `CreateLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLevelCategoryVariables {
  categoryId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  createdBy: UUIDString;
}
```
### Return Type
Recall that executing the `CreateLevelCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLevelCategoryData {
  levelCategory_insert: LevelCategory_Key;
}
```
### Using `CreateLevelCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLevelCategory, CreateLevelCategoryVariables } from '@dataconnect/generated';

// The `CreateLevelCategory` mutation requires an argument of type `CreateLevelCategoryVariables`:
const createLevelCategoryVars: CreateLevelCategoryVariables = {
  categoryId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  createdBy: ..., 
};

// Call the `createLevelCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLevelCategory(createLevelCategoryVars);
// Variables can be defined inline as well.
const { data } = await createLevelCategory({ categoryId: ..., code: ..., name: ..., description: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLevelCategory(dataConnect, createLevelCategoryVars);

console.log(data.levelCategory_insert);

// Or, you can use the `Promise` API.
createLevelCategory(createLevelCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.levelCategory_insert);
});
```

### Using `CreateLevelCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLevelCategoryRef, CreateLevelCategoryVariables } from '@dataconnect/generated';

// The `CreateLevelCategory` mutation requires an argument of type `CreateLevelCategoryVariables`:
const createLevelCategoryVars: CreateLevelCategoryVariables = {
  categoryId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  createdBy: ..., 
};

// Call the `createLevelCategoryRef()` function to get a reference to the mutation.
const ref = createLevelCategoryRef(createLevelCategoryVars);
// Variables can be defined inline as well.
const ref = createLevelCategoryRef({ categoryId: ..., code: ..., name: ..., description: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLevelCategoryRef(dataConnect, createLevelCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.levelCategory_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.levelCategory_insert);
});
```

## UpdateLevelCategory
You can execute the `UpdateLevelCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateLevelCategory(vars: UpdateLevelCategoryVariables): MutationPromise<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;

interface UpdateLevelCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLevelCategoryVariables): MutationRef<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;
}
export const updateLevelCategoryRef: UpdateLevelCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLevelCategory(dc: DataConnect, vars: UpdateLevelCategoryVariables): MutationPromise<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;

interface UpdateLevelCategoryRef {
  ...
  (dc: DataConnect, vars: UpdateLevelCategoryVariables): MutationRef<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;
}
export const updateLevelCategoryRef: UpdateLevelCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLevelCategoryRef:
```typescript
const name = updateLevelCategoryRef.operationName;
console.log(name);
```

### Variables
The `UpdateLevelCategory` mutation requires an argument of type `UpdateLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLevelCategoryVariables {
  categoryId: UUIDString;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `UpdateLevelCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLevelCategoryData {
  levelCategory_update?: LevelCategory_Key | null;
}
```
### Using `UpdateLevelCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLevelCategory, UpdateLevelCategoryVariables } from '@dataconnect/generated';

// The `UpdateLevelCategory` mutation requires an argument of type `UpdateLevelCategoryVariables`:
const updateLevelCategoryVars: UpdateLevelCategoryVariables = {
  categoryId: ..., 
  code: ..., // optional
  name: ..., // optional
  description: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateLevelCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLevelCategory(updateLevelCategoryVars);
// Variables can be defined inline as well.
const { data } = await updateLevelCategory({ categoryId: ..., code: ..., name: ..., description: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLevelCategory(dataConnect, updateLevelCategoryVars);

console.log(data.levelCategory_update);

// Or, you can use the `Promise` API.
updateLevelCategory(updateLevelCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.levelCategory_update);
});
```

### Using `UpdateLevelCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLevelCategoryRef, UpdateLevelCategoryVariables } from '@dataconnect/generated';

// The `UpdateLevelCategory` mutation requires an argument of type `UpdateLevelCategoryVariables`:
const updateLevelCategoryVars: UpdateLevelCategoryVariables = {
  categoryId: ..., 
  code: ..., // optional
  name: ..., // optional
  description: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateLevelCategoryRef()` function to get a reference to the mutation.
const ref = updateLevelCategoryRef(updateLevelCategoryVars);
// Variables can be defined inline as well.
const ref = updateLevelCategoryRef({ categoryId: ..., code: ..., name: ..., description: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLevelCategoryRef(dataConnect, updateLevelCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.levelCategory_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.levelCategory_update);
});
```

## DeactivateLevelCategory
You can execute the `DeactivateLevelCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateLevelCategory(vars: DeactivateLevelCategoryVariables): MutationPromise<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;

interface DeactivateLevelCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateLevelCategoryVariables): MutationRef<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;
}
export const deactivateLevelCategoryRef: DeactivateLevelCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateLevelCategory(dc: DataConnect, vars: DeactivateLevelCategoryVariables): MutationPromise<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;

interface DeactivateLevelCategoryRef {
  ...
  (dc: DataConnect, vars: DeactivateLevelCategoryVariables): MutationRef<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;
}
export const deactivateLevelCategoryRef: DeactivateLevelCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateLevelCategoryRef:
```typescript
const name = deactivateLevelCategoryRef.operationName;
console.log(name);
```

### Variables
The `DeactivateLevelCategory` mutation requires an argument of type `DeactivateLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateLevelCategoryVariables {
  categoryId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateLevelCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateLevelCategoryData {
  levelCategory_update?: LevelCategory_Key | null;
}
```
### Using `DeactivateLevelCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateLevelCategory, DeactivateLevelCategoryVariables } from '@dataconnect/generated';

// The `DeactivateLevelCategory` mutation requires an argument of type `DeactivateLevelCategoryVariables`:
const deactivateLevelCategoryVars: DeactivateLevelCategoryVariables = {
  categoryId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateLevelCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateLevelCategory(deactivateLevelCategoryVars);
// Variables can be defined inline as well.
const { data } = await deactivateLevelCategory({ categoryId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateLevelCategory(dataConnect, deactivateLevelCategoryVars);

console.log(data.levelCategory_update);

// Or, you can use the `Promise` API.
deactivateLevelCategory(deactivateLevelCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.levelCategory_update);
});
```

### Using `DeactivateLevelCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateLevelCategoryRef, DeactivateLevelCategoryVariables } from '@dataconnect/generated';

// The `DeactivateLevelCategory` mutation requires an argument of type `DeactivateLevelCategoryVariables`:
const deactivateLevelCategoryVars: DeactivateLevelCategoryVariables = {
  categoryId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateLevelCategoryRef()` function to get a reference to the mutation.
const ref = deactivateLevelCategoryRef(deactivateLevelCategoryVars);
// Variables can be defined inline as well.
const ref = deactivateLevelCategoryRef({ categoryId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateLevelCategoryRef(dataConnect, deactivateLevelCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.levelCategory_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.levelCategory_update);
});
```

## ReactivateLevelCategory
You can execute the `ReactivateLevelCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateLevelCategory(vars: ReactivateLevelCategoryVariables): MutationPromise<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;

interface ReactivateLevelCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateLevelCategoryVariables): MutationRef<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;
}
export const reactivateLevelCategoryRef: ReactivateLevelCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateLevelCategory(dc: DataConnect, vars: ReactivateLevelCategoryVariables): MutationPromise<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;

interface ReactivateLevelCategoryRef {
  ...
  (dc: DataConnect, vars: ReactivateLevelCategoryVariables): MutationRef<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;
}
export const reactivateLevelCategoryRef: ReactivateLevelCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateLevelCategoryRef:
```typescript
const name = reactivateLevelCategoryRef.operationName;
console.log(name);
```

### Variables
The `ReactivateLevelCategory` mutation requires an argument of type `ReactivateLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateLevelCategoryVariables {
  categoryId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateLevelCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateLevelCategoryData {
  levelCategory_update?: LevelCategory_Key | null;
}
```
### Using `ReactivateLevelCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateLevelCategory, ReactivateLevelCategoryVariables } from '@dataconnect/generated';

// The `ReactivateLevelCategory` mutation requires an argument of type `ReactivateLevelCategoryVariables`:
const reactivateLevelCategoryVars: ReactivateLevelCategoryVariables = {
  categoryId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateLevelCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateLevelCategory(reactivateLevelCategoryVars);
// Variables can be defined inline as well.
const { data } = await reactivateLevelCategory({ categoryId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateLevelCategory(dataConnect, reactivateLevelCategoryVars);

console.log(data.levelCategory_update);

// Or, you can use the `Promise` API.
reactivateLevelCategory(reactivateLevelCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.levelCategory_update);
});
```

### Using `ReactivateLevelCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateLevelCategoryRef, ReactivateLevelCategoryVariables } from '@dataconnect/generated';

// The `ReactivateLevelCategory` mutation requires an argument of type `ReactivateLevelCategoryVariables`:
const reactivateLevelCategoryVars: ReactivateLevelCategoryVariables = {
  categoryId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateLevelCategoryRef()` function to get a reference to the mutation.
const ref = reactivateLevelCategoryRef(reactivateLevelCategoryVars);
// Variables can be defined inline as well.
const ref = reactivateLevelCategoryRef({ categoryId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateLevelCategoryRef(dataConnect, reactivateLevelCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.levelCategory_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.levelCategory_update);
});
```

## CreateEducationalLevel
You can execute the `CreateEducationalLevel` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEducationalLevel(vars: CreateEducationalLevelVariables): MutationPromise<CreateEducationalLevelData, CreateEducationalLevelVariables>;

interface CreateEducationalLevelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEducationalLevelVariables): MutationRef<CreateEducationalLevelData, CreateEducationalLevelVariables>;
}
export const createEducationalLevelRef: CreateEducationalLevelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEducationalLevel(dc: DataConnect, vars: CreateEducationalLevelVariables): MutationPromise<CreateEducationalLevelData, CreateEducationalLevelVariables>;

interface CreateEducationalLevelRef {
  ...
  (dc: DataConnect, vars: CreateEducationalLevelVariables): MutationRef<CreateEducationalLevelData, CreateEducationalLevelVariables>;
}
export const createEducationalLevelRef: CreateEducationalLevelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEducationalLevelRef:
```typescript
const name = createEducationalLevelRef.operationName;
console.log(name);
```

### Variables
The `CreateEducationalLevel` mutation requires an argument of type `CreateEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateEducationalLevelVariables {
  levelId: UUIDString;
  categoryId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  createdBy: UUIDString;
}
```
### Return Type
Recall that executing the `CreateEducationalLevel` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEducationalLevelData {
  educationalLevel_insert: EducationalLevel_Key;
}
```
### Using `CreateEducationalLevel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEducationalLevel, CreateEducationalLevelVariables } from '@dataconnect/generated';

// The `CreateEducationalLevel` mutation requires an argument of type `CreateEducationalLevelVariables`:
const createEducationalLevelVars: CreateEducationalLevelVariables = {
  levelId: ..., 
  categoryId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  createdBy: ..., 
};

// Call the `createEducationalLevel()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEducationalLevel(createEducationalLevelVars);
// Variables can be defined inline as well.
const { data } = await createEducationalLevel({ levelId: ..., categoryId: ..., code: ..., name: ..., description: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEducationalLevel(dataConnect, createEducationalLevelVars);

console.log(data.educationalLevel_insert);

// Or, you can use the `Promise` API.
createEducationalLevel(createEducationalLevelVars).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel_insert);
});
```

### Using `CreateEducationalLevel`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEducationalLevelRef, CreateEducationalLevelVariables } from '@dataconnect/generated';

// The `CreateEducationalLevel` mutation requires an argument of type `CreateEducationalLevelVariables`:
const createEducationalLevelVars: CreateEducationalLevelVariables = {
  levelId: ..., 
  categoryId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  createdBy: ..., 
};

// Call the `createEducationalLevelRef()` function to get a reference to the mutation.
const ref = createEducationalLevelRef(createEducationalLevelVars);
// Variables can be defined inline as well.
const ref = createEducationalLevelRef({ levelId: ..., categoryId: ..., code: ..., name: ..., description: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEducationalLevelRef(dataConnect, createEducationalLevelVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.educationalLevel_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel_insert);
});
```

## UpdateEducationalLevel
You can execute the `UpdateEducationalLevel` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEducationalLevel(vars: UpdateEducationalLevelVariables): MutationPromise<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;

interface UpdateEducationalLevelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEducationalLevelVariables): MutationRef<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;
}
export const updateEducationalLevelRef: UpdateEducationalLevelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEducationalLevel(dc: DataConnect, vars: UpdateEducationalLevelVariables): MutationPromise<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;

interface UpdateEducationalLevelRef {
  ...
  (dc: DataConnect, vars: UpdateEducationalLevelVariables): MutationRef<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;
}
export const updateEducationalLevelRef: UpdateEducationalLevelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEducationalLevelRef:
```typescript
const name = updateEducationalLevelRef.operationName;
console.log(name);
```

### Variables
The `UpdateEducationalLevel` mutation requires an argument of type `UpdateEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateEducationalLevel` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEducationalLevelData {
  educationalLevel_update?: EducationalLevel_Key | null;
}
```
### Using `UpdateEducationalLevel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEducationalLevel, UpdateEducationalLevelVariables } from '@dataconnect/generated';

// The `UpdateEducationalLevel` mutation requires an argument of type `UpdateEducationalLevelVariables`:
const updateEducationalLevelVars: UpdateEducationalLevelVariables = {
  levelId: ..., 
  code: ..., // optional
  name: ..., // optional
  description: ..., // optional
  categoryId: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateEducationalLevel()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEducationalLevel(updateEducationalLevelVars);
// Variables can be defined inline as well.
const { data } = await updateEducationalLevel({ levelId: ..., code: ..., name: ..., description: ..., categoryId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEducationalLevel(dataConnect, updateEducationalLevelVars);

console.log(data.educationalLevel_update);

// Or, you can use the `Promise` API.
updateEducationalLevel(updateEducationalLevelVars).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel_update);
});
```

### Using `UpdateEducationalLevel`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEducationalLevelRef, UpdateEducationalLevelVariables } from '@dataconnect/generated';

// The `UpdateEducationalLevel` mutation requires an argument of type `UpdateEducationalLevelVariables`:
const updateEducationalLevelVars: UpdateEducationalLevelVariables = {
  levelId: ..., 
  code: ..., // optional
  name: ..., // optional
  description: ..., // optional
  categoryId: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateEducationalLevelRef()` function to get a reference to the mutation.
const ref = updateEducationalLevelRef(updateEducationalLevelVars);
// Variables can be defined inline as well.
const ref = updateEducationalLevelRef({ levelId: ..., code: ..., name: ..., description: ..., categoryId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEducationalLevelRef(dataConnect, updateEducationalLevelVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.educationalLevel_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel_update);
});
```

## DeactivateEducationalLevel
You can execute the `DeactivateEducationalLevel` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateEducationalLevel(vars: DeactivateEducationalLevelVariables): MutationPromise<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;

interface DeactivateEducationalLevelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateEducationalLevelVariables): MutationRef<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;
}
export const deactivateEducationalLevelRef: DeactivateEducationalLevelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateEducationalLevel(dc: DataConnect, vars: DeactivateEducationalLevelVariables): MutationPromise<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;

interface DeactivateEducationalLevelRef {
  ...
  (dc: DataConnect, vars: DeactivateEducationalLevelVariables): MutationRef<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;
}
export const deactivateEducationalLevelRef: DeactivateEducationalLevelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateEducationalLevelRef:
```typescript
const name = deactivateEducationalLevelRef.operationName;
console.log(name);
```

### Variables
The `DeactivateEducationalLevel` mutation requires an argument of type `DeactivateEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateEducationalLevelVariables {
  levelId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateEducationalLevel` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateEducationalLevelData {
  educationalLevel_update?: EducationalLevel_Key | null;
}
```
### Using `DeactivateEducationalLevel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateEducationalLevel, DeactivateEducationalLevelVariables } from '@dataconnect/generated';

// The `DeactivateEducationalLevel` mutation requires an argument of type `DeactivateEducationalLevelVariables`:
const deactivateEducationalLevelVars: DeactivateEducationalLevelVariables = {
  levelId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateEducationalLevel()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateEducationalLevel(deactivateEducationalLevelVars);
// Variables can be defined inline as well.
const { data } = await deactivateEducationalLevel({ levelId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateEducationalLevel(dataConnect, deactivateEducationalLevelVars);

console.log(data.educationalLevel_update);

// Or, you can use the `Promise` API.
deactivateEducationalLevel(deactivateEducationalLevelVars).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel_update);
});
```

### Using `DeactivateEducationalLevel`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateEducationalLevelRef, DeactivateEducationalLevelVariables } from '@dataconnect/generated';

// The `DeactivateEducationalLevel` mutation requires an argument of type `DeactivateEducationalLevelVariables`:
const deactivateEducationalLevelVars: DeactivateEducationalLevelVariables = {
  levelId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateEducationalLevelRef()` function to get a reference to the mutation.
const ref = deactivateEducationalLevelRef(deactivateEducationalLevelVars);
// Variables can be defined inline as well.
const ref = deactivateEducationalLevelRef({ levelId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateEducationalLevelRef(dataConnect, deactivateEducationalLevelVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.educationalLevel_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel_update);
});
```

## ReactivateEducationalLevel
You can execute the `ReactivateEducationalLevel` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateEducationalLevel(vars: ReactivateEducationalLevelVariables): MutationPromise<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;

interface ReactivateEducationalLevelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateEducationalLevelVariables): MutationRef<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;
}
export const reactivateEducationalLevelRef: ReactivateEducationalLevelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateEducationalLevel(dc: DataConnect, vars: ReactivateEducationalLevelVariables): MutationPromise<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;

interface ReactivateEducationalLevelRef {
  ...
  (dc: DataConnect, vars: ReactivateEducationalLevelVariables): MutationRef<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;
}
export const reactivateEducationalLevelRef: ReactivateEducationalLevelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateEducationalLevelRef:
```typescript
const name = reactivateEducationalLevelRef.operationName;
console.log(name);
```

### Variables
The `ReactivateEducationalLevel` mutation requires an argument of type `ReactivateEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateEducationalLevelVariables {
  levelId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateEducationalLevel` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateEducationalLevelData {
  educationalLevel_update?: EducationalLevel_Key | null;
}
```
### Using `ReactivateEducationalLevel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateEducationalLevel, ReactivateEducationalLevelVariables } from '@dataconnect/generated';

// The `ReactivateEducationalLevel` mutation requires an argument of type `ReactivateEducationalLevelVariables`:
const reactivateEducationalLevelVars: ReactivateEducationalLevelVariables = {
  levelId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateEducationalLevel()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateEducationalLevel(reactivateEducationalLevelVars);
// Variables can be defined inline as well.
const { data } = await reactivateEducationalLevel({ levelId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateEducationalLevel(dataConnect, reactivateEducationalLevelVars);

console.log(data.educationalLevel_update);

// Or, you can use the `Promise` API.
reactivateEducationalLevel(reactivateEducationalLevelVars).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel_update);
});
```

### Using `ReactivateEducationalLevel`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateEducationalLevelRef, ReactivateEducationalLevelVariables } from '@dataconnect/generated';

// The `ReactivateEducationalLevel` mutation requires an argument of type `ReactivateEducationalLevelVariables`:
const reactivateEducationalLevelVars: ReactivateEducationalLevelVariables = {
  levelId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateEducationalLevelRef()` function to get a reference to the mutation.
const ref = reactivateEducationalLevelRef(reactivateEducationalLevelVars);
// Variables can be defined inline as well.
const ref = reactivateEducationalLevelRef({ levelId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateEducationalLevelRef(dataConnect, reactivateEducationalLevelVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.educationalLevel_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.educationalLevel_update);
});
```

## CreateCourse
You can execute the `CreateCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCourse(vars: CreateCourseVariables): MutationPromise<CreateCourseData, CreateCourseVariables>;

interface CreateCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCourseVariables): MutationRef<CreateCourseData, CreateCourseVariables>;
}
export const createCourseRef: CreateCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCourse(dc: DataConnect, vars: CreateCourseVariables): MutationPromise<CreateCourseData, CreateCourseVariables>;

interface CreateCourseRef {
  ...
  (dc: DataConnect, vars: CreateCourseVariables): MutationRef<CreateCourseData, CreateCourseVariables>;
}
export const createCourseRef: CreateCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCourseRef:
```typescript
const name = createCourseRef.operationName;
console.log(name);
```

### Variables
The `CreateCourse` mutation requires an argument of type `CreateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCourseData {
  course_insert: Course_Key;
}
```
### Using `CreateCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCourse, CreateCourseVariables } from '@dataconnect/generated';

// The `CreateCourse` mutation requires an argument of type `CreateCourseVariables`:
const createCourseVars: CreateCourseVariables = {
  courseId: ..., 
  name: ..., 
  code: ..., 
  section: ..., // optional
  institutionName: ..., 
  levelId: ..., 
  userId: ..., 
  createdBy: ..., 
};

// Call the `createCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCourse(createCourseVars);
// Variables can be defined inline as well.
const { data } = await createCourse({ courseId: ..., name: ..., code: ..., section: ..., institutionName: ..., levelId: ..., userId: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCourse(dataConnect, createCourseVars);

console.log(data.course_insert);

// Or, you can use the `Promise` API.
createCourse(createCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_insert);
});
```

### Using `CreateCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCourseRef, CreateCourseVariables } from '@dataconnect/generated';

// The `CreateCourse` mutation requires an argument of type `CreateCourseVariables`:
const createCourseVars: CreateCourseVariables = {
  courseId: ..., 
  name: ..., 
  code: ..., 
  section: ..., // optional
  institutionName: ..., 
  levelId: ..., 
  userId: ..., 
  createdBy: ..., 
};

// Call the `createCourseRef()` function to get a reference to the mutation.
const ref = createCourseRef(createCourseVars);
// Variables can be defined inline as well.
const ref = createCourseRef({ courseId: ..., name: ..., code: ..., section: ..., institutionName: ..., levelId: ..., userId: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCourseRef(dataConnect, createCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_insert);
});
```

## UpdateCourse
You can execute the `UpdateCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCourse(vars: UpdateCourseVariables): MutationPromise<UpdateCourseData, UpdateCourseVariables>;

interface UpdateCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseVariables): MutationRef<UpdateCourseData, UpdateCourseVariables>;
}
export const updateCourseRef: UpdateCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCourse(dc: DataConnect, vars: UpdateCourseVariables): MutationPromise<UpdateCourseData, UpdateCourseVariables>;

interface UpdateCourseRef {
  ...
  (dc: DataConnect, vars: UpdateCourseVariables): MutationRef<UpdateCourseData, UpdateCourseVariables>;
}
export const updateCourseRef: UpdateCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCourseRef:
```typescript
const name = updateCourseRef.operationName;
console.log(name);
```

### Variables
The `UpdateCourse` mutation requires an argument of type `UpdateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCourseData {
  course_update?: Course_Key | null;
}
```
### Using `UpdateCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCourse, UpdateCourseVariables } from '@dataconnect/generated';

// The `UpdateCourse` mutation requires an argument of type `UpdateCourseVariables`:
const updateCourseVars: UpdateCourseVariables = {
  courseId: ..., 
  name: ..., 
  code: ..., 
  section: ..., // optional
  institutionName: ..., 
  levelId: ..., 
  userId: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCourse(updateCourseVars);
// Variables can be defined inline as well.
const { data } = await updateCourse({ courseId: ..., name: ..., code: ..., section: ..., institutionName: ..., levelId: ..., userId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCourse(dataConnect, updateCourseVars);

console.log(data.course_update);

// Or, you can use the `Promise` API.
updateCourse(updateCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

### Using `UpdateCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCourseRef, UpdateCourseVariables } from '@dataconnect/generated';

// The `UpdateCourse` mutation requires an argument of type `UpdateCourseVariables`:
const updateCourseVars: UpdateCourseVariables = {
  courseId: ..., 
  name: ..., 
  code: ..., 
  section: ..., // optional
  institutionName: ..., 
  levelId: ..., 
  userId: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateCourseRef()` function to get a reference to the mutation.
const ref = updateCourseRef(updateCourseVars);
// Variables can be defined inline as well.
const ref = updateCourseRef({ courseId: ..., name: ..., code: ..., section: ..., institutionName: ..., levelId: ..., userId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCourseRef(dataConnect, updateCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

## DeactivateCourse
You can execute the `DeactivateCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateCourse(vars: DeactivateCourseVariables): MutationPromise<DeactivateCourseData, DeactivateCourseVariables>;

interface DeactivateCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateCourseVariables): MutationRef<DeactivateCourseData, DeactivateCourseVariables>;
}
export const deactivateCourseRef: DeactivateCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateCourse(dc: DataConnect, vars: DeactivateCourseVariables): MutationPromise<DeactivateCourseData, DeactivateCourseVariables>;

interface DeactivateCourseRef {
  ...
  (dc: DataConnect, vars: DeactivateCourseVariables): MutationRef<DeactivateCourseData, DeactivateCourseVariables>;
}
export const deactivateCourseRef: DeactivateCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateCourseRef:
```typescript
const name = deactivateCourseRef.operationName;
console.log(name);
```

### Variables
The `DeactivateCourse` mutation requires an argument of type `DeactivateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateCourseVariables {
  courseId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateCourseData {
  course_update?: Course_Key | null;
}
```
### Using `DeactivateCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateCourse, DeactivateCourseVariables } from '@dataconnect/generated';

// The `DeactivateCourse` mutation requires an argument of type `DeactivateCourseVariables`:
const deactivateCourseVars: DeactivateCourseVariables = {
  courseId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateCourse(deactivateCourseVars);
// Variables can be defined inline as well.
const { data } = await deactivateCourse({ courseId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateCourse(dataConnect, deactivateCourseVars);

console.log(data.course_update);

// Or, you can use the `Promise` API.
deactivateCourse(deactivateCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

### Using `DeactivateCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateCourseRef, DeactivateCourseVariables } from '@dataconnect/generated';

// The `DeactivateCourse` mutation requires an argument of type `DeactivateCourseVariables`:
const deactivateCourseVars: DeactivateCourseVariables = {
  courseId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateCourseRef()` function to get a reference to the mutation.
const ref = deactivateCourseRef(deactivateCourseVars);
// Variables can be defined inline as well.
const ref = deactivateCourseRef({ courseId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateCourseRef(dataConnect, deactivateCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

## ReactivateCourse
You can execute the `ReactivateCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateCourse(vars: ReactivateCourseVariables): MutationPromise<ReactivateCourseData, ReactivateCourseVariables>;

interface ReactivateCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateCourseVariables): MutationRef<ReactivateCourseData, ReactivateCourseVariables>;
}
export const reactivateCourseRef: ReactivateCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateCourse(dc: DataConnect, vars: ReactivateCourseVariables): MutationPromise<ReactivateCourseData, ReactivateCourseVariables>;

interface ReactivateCourseRef {
  ...
  (dc: DataConnect, vars: ReactivateCourseVariables): MutationRef<ReactivateCourseData, ReactivateCourseVariables>;
}
export const reactivateCourseRef: ReactivateCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateCourseRef:
```typescript
const name = reactivateCourseRef.operationName;
console.log(name);
```

### Variables
The `ReactivateCourse` mutation requires an argument of type `ReactivateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateCourseVariables {
  courseId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateCourseData {
  course_update?: Course_Key | null;
}
```
### Using `ReactivateCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateCourse, ReactivateCourseVariables } from '@dataconnect/generated';

// The `ReactivateCourse` mutation requires an argument of type `ReactivateCourseVariables`:
const reactivateCourseVars: ReactivateCourseVariables = {
  courseId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateCourse(reactivateCourseVars);
// Variables can be defined inline as well.
const { data } = await reactivateCourse({ courseId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateCourse(dataConnect, reactivateCourseVars);

console.log(data.course_update);

// Or, you can use the `Promise` API.
reactivateCourse(reactivateCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

### Using `ReactivateCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateCourseRef, ReactivateCourseVariables } from '@dataconnect/generated';

// The `ReactivateCourse` mutation requires an argument of type `ReactivateCourseVariables`:
const reactivateCourseVars: ReactivateCourseVariables = {
  courseId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateCourseRef()` function to get a reference to the mutation.
const ref = reactivateCourseRef(reactivateCourseVars);
// Variables can be defined inline as well.
const ref = reactivateCourseRef({ courseId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateCourseRef(dataConnect, reactivateCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

## CreateQuestion
You can execute the `CreateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createQuestion(vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface CreateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
}
export const createQuestionRef: CreateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuestion(dc: DataConnect, vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface CreateQuestionRef {
  ...
  (dc: DataConnect, vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
}
export const createQuestionRef: CreateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuestionRef:
```typescript
const name = createQuestionRef.operationName;
console.log(name);
```

### Variables
The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuestionData {
  question_insert: Question_Key;
}
```
### Using `CreateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuestion, CreateQuestionVariables } from '@dataconnect/generated';

// The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`:
const createQuestionVars: CreateQuestionVariables = {
  questionId: ..., 
  text: ..., 
  topicId: ..., 
  difficultyId: ..., 
  questionTypeId: ..., 
  taxonomyId: ..., 
  userId: ..., 
  isPublic: ..., 
  allowPartialScore: ..., 
  firebaseId: ..., 
};

// Call the `createQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestion(createQuestionVars);
// Variables can be defined inline as well.
const { data } = await createQuestion({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., taxonomyId: ..., userId: ..., isPublic: ..., allowPartialScore: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuestion(dataConnect, createQuestionVars);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
createQuestion(createQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```

### Using `CreateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuestionRef, CreateQuestionVariables } from '@dataconnect/generated';

// The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`:
const createQuestionVars: CreateQuestionVariables = {
  questionId: ..., 
  text: ..., 
  topicId: ..., 
  difficultyId: ..., 
  questionTypeId: ..., 
  taxonomyId: ..., 
  userId: ..., 
  isPublic: ..., 
  allowPartialScore: ..., 
  firebaseId: ..., 
};

// Call the `createQuestionRef()` function to get a reference to the mutation.
const ref = createQuestionRef(createQuestionVars);
// Variables can be defined inline as well.
const ref = createQuestionRef({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., taxonomyId: ..., userId: ..., isPublic: ..., allowPartialScore: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuestionRef(dataConnect, createQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```

## CreateQuestionVersion
You can execute the `CreateQuestionVersion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createQuestionVersion(vars: CreateQuestionVersionVariables): MutationPromise<CreateQuestionVersionData, CreateQuestionVersionVariables>;

interface CreateQuestionVersionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVersionVariables): MutationRef<CreateQuestionVersionData, CreateQuestionVersionVariables>;
}
export const createQuestionVersionRef: CreateQuestionVersionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuestionVersion(dc: DataConnect, vars: CreateQuestionVersionVariables): MutationPromise<CreateQuestionVersionData, CreateQuestionVersionVariables>;

interface CreateQuestionVersionRef {
  ...
  (dc: DataConnect, vars: CreateQuestionVersionVariables): MutationRef<CreateQuestionVersionData, CreateQuestionVersionVariables>;
}
export const createQuestionVersionRef: CreateQuestionVersionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuestionVersionRef:
```typescript
const name = createQuestionVersionRef.operationName;
console.log(name);
```

### Variables
The `CreateQuestionVersion` mutation requires an argument of type `CreateQuestionVersionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateQuestionVersion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuestionVersionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuestionVersionData {
  question_insert: Question_Key;
}
```
### Using `CreateQuestionVersion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuestionVersion, CreateQuestionVersionVariables } from '@dataconnect/generated';

// The `CreateQuestionVersion` mutation requires an argument of type `CreateQuestionVersionVariables`:
const createQuestionVersionVars: CreateQuestionVersionVariables = {
  questionId: ..., 
  text: ..., 
  topicId: ..., 
  difficultyId: ..., 
  questionTypeId: ..., 
  taxonomyId: ..., 
  userId: ..., 
  isPublic: ..., 
  allowPartialScore: ..., 
  version: ..., 
  originalQuestionId: ..., 
  firebaseId: ..., 
};

// Call the `createQuestionVersion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestionVersion(createQuestionVersionVars);
// Variables can be defined inline as well.
const { data } = await createQuestionVersion({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., taxonomyId: ..., userId: ..., isPublic: ..., allowPartialScore: ..., version: ..., originalQuestionId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuestionVersion(dataConnect, createQuestionVersionVars);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
createQuestionVersion(createQuestionVersionVars).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```

### Using `CreateQuestionVersion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuestionVersionRef, CreateQuestionVersionVariables } from '@dataconnect/generated';

// The `CreateQuestionVersion` mutation requires an argument of type `CreateQuestionVersionVariables`:
const createQuestionVersionVars: CreateQuestionVersionVariables = {
  questionId: ..., 
  text: ..., 
  topicId: ..., 
  difficultyId: ..., 
  questionTypeId: ..., 
  taxonomyId: ..., 
  userId: ..., 
  isPublic: ..., 
  allowPartialScore: ..., 
  version: ..., 
  originalQuestionId: ..., 
  firebaseId: ..., 
};

// Call the `createQuestionVersionRef()` function to get a reference to the mutation.
const ref = createQuestionVersionRef(createQuestionVersionVars);
// Variables can be defined inline as well.
const ref = createQuestionVersionRef({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., taxonomyId: ..., userId: ..., isPublic: ..., allowPartialScore: ..., version: ..., originalQuestionId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuestionVersionRef(dataConnect, createQuestionVersionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```

## UpdateQuestion
You can execute the `UpdateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateQuestion(vars: UpdateQuestionVariables): MutationPromise<UpdateQuestionData, UpdateQuestionVariables>;

interface UpdateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionVariables): MutationRef<UpdateQuestionData, UpdateQuestionVariables>;
}
export const updateQuestionRef: UpdateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuestion(dc: DataConnect, vars: UpdateQuestionVariables): MutationPromise<UpdateQuestionData, UpdateQuestionVariables>;

interface UpdateQuestionRef {
  ...
  (dc: DataConnect, vars: UpdateQuestionVariables): MutationRef<UpdateQuestionData, UpdateQuestionVariables>;
}
export const updateQuestionRef: UpdateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuestionRef:
```typescript
const name = updateQuestionRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuestion` mutation requires an argument of type `UpdateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuestionData {
  question_update?: Question_Key | null;
}
```
### Using `UpdateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuestion, UpdateQuestionVariables } from '@dataconnect/generated';

// The `UpdateQuestion` mutation requires an argument of type `UpdateQuestionVariables`:
const updateQuestionVars: UpdateQuestionVariables = {
  questionId: ..., 
  text: ..., // optional
  topicId: ..., // optional
  difficultyId: ..., // optional
  questionTypeId: ..., // optional
  isPublic: ..., // optional
  allowPartialScore: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuestion(updateQuestionVars);
// Variables can be defined inline as well.
const { data } = await updateQuestion({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., isPublic: ..., allowPartialScore: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuestion(dataConnect, updateQuestionVars);

console.log(data.question_update);

// Or, you can use the `Promise` API.
updateQuestion(updateQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.question_update);
});
```

### Using `UpdateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuestionRef, UpdateQuestionVariables } from '@dataconnect/generated';

// The `UpdateQuestion` mutation requires an argument of type `UpdateQuestionVariables`:
const updateQuestionVars: UpdateQuestionVariables = {
  questionId: ..., 
  text: ..., // optional
  topicId: ..., // optional
  difficultyId: ..., // optional
  questionTypeId: ..., // optional
  isPublic: ..., // optional
  allowPartialScore: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateQuestionRef()` function to get a reference to the mutation.
const ref = updateQuestionRef(updateQuestionVars);
// Variables can be defined inline as well.
const ref = updateQuestionRef({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., isPublic: ..., allowPartialScore: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuestionRef(dataConnect, updateQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_update);
});
```

## DeactivateQuestion
You can execute the `DeactivateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateQuestion(vars: DeactivateQuestionVariables): MutationPromise<DeactivateQuestionData, DeactivateQuestionVariables>;

interface DeactivateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateQuestionVariables): MutationRef<DeactivateQuestionData, DeactivateQuestionVariables>;
}
export const deactivateQuestionRef: DeactivateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateQuestion(dc: DataConnect, vars: DeactivateQuestionVariables): MutationPromise<DeactivateQuestionData, DeactivateQuestionVariables>;

interface DeactivateQuestionRef {
  ...
  (dc: DataConnect, vars: DeactivateQuestionVariables): MutationRef<DeactivateQuestionData, DeactivateQuestionVariables>;
}
export const deactivateQuestionRef: DeactivateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateQuestionRef:
```typescript
const name = deactivateQuestionRef.operationName;
console.log(name);
```

### Variables
The `DeactivateQuestion` mutation requires an argument of type `DeactivateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateQuestionVariables {
  questionId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateQuestionData {
  question_update?: Question_Key | null;
}
```
### Using `DeactivateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateQuestion, DeactivateQuestionVariables } from '@dataconnect/generated';

// The `DeactivateQuestion` mutation requires an argument of type `DeactivateQuestionVariables`:
const deactivateQuestionVars: DeactivateQuestionVariables = {
  questionId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  userId: ..., 
  firebaseId: ..., 
};

// Call the `deactivateQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateQuestion(deactivateQuestionVars);
// Variables can be defined inline as well.
const { data } = await deactivateQuestion({ questionId: ..., deletedAt: ..., deletedBy: ..., userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateQuestion(dataConnect, deactivateQuestionVars);

console.log(data.question_update);

// Or, you can use the `Promise` API.
deactivateQuestion(deactivateQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.question_update);
});
```

### Using `DeactivateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateQuestionRef, DeactivateQuestionVariables } from '@dataconnect/generated';

// The `DeactivateQuestion` mutation requires an argument of type `DeactivateQuestionVariables`:
const deactivateQuestionVars: DeactivateQuestionVariables = {
  questionId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  userId: ..., 
  firebaseId: ..., 
};

// Call the `deactivateQuestionRef()` function to get a reference to the mutation.
const ref = deactivateQuestionRef(deactivateQuestionVars);
// Variables can be defined inline as well.
const ref = deactivateQuestionRef({ questionId: ..., deletedAt: ..., deletedBy: ..., userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateQuestionRef(dataConnect, deactivateQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_update);
});
```

## ReactivateQuestion
You can execute the `ReactivateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateQuestion(vars: ReactivateQuestionVariables): MutationPromise<ReactivateQuestionData, ReactivateQuestionVariables>;

interface ReactivateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateQuestionVariables): MutationRef<ReactivateQuestionData, ReactivateQuestionVariables>;
}
export const reactivateQuestionRef: ReactivateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateQuestion(dc: DataConnect, vars: ReactivateQuestionVariables): MutationPromise<ReactivateQuestionData, ReactivateQuestionVariables>;

interface ReactivateQuestionRef {
  ...
  (dc: DataConnect, vars: ReactivateQuestionVariables): MutationRef<ReactivateQuestionData, ReactivateQuestionVariables>;
}
export const reactivateQuestionRef: ReactivateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateQuestionRef:
```typescript
const name = reactivateQuestionRef.operationName;
console.log(name);
```

### Variables
The `ReactivateQuestion` mutation requires an argument of type `ReactivateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateQuestionVariables {
  questionId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateQuestionData {
  question_update?: Question_Key | null;
}
```
### Using `ReactivateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateQuestion, ReactivateQuestionVariables } from '@dataconnect/generated';

// The `ReactivateQuestion` mutation requires an argument of type `ReactivateQuestionVariables`:
const reactivateQuestionVars: ReactivateQuestionVariables = {
  questionId: ..., 
  userId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateQuestion(reactivateQuestionVars);
// Variables can be defined inline as well.
const { data } = await reactivateQuestion({ questionId: ..., userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateQuestion(dataConnect, reactivateQuestionVars);

console.log(data.question_update);

// Or, you can use the `Promise` API.
reactivateQuestion(reactivateQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.question_update);
});
```

### Using `ReactivateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateQuestionRef, ReactivateQuestionVariables } from '@dataconnect/generated';

// The `ReactivateQuestion` mutation requires an argument of type `ReactivateQuestionVariables`:
const reactivateQuestionVars: ReactivateQuestionVariables = {
  questionId: ..., 
  userId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateQuestionRef()` function to get a reference to the mutation.
const ref = reactivateQuestionRef(reactivateQuestionVars);
// Variables can be defined inline as well.
const ref = reactivateQuestionRef({ questionId: ..., userId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateQuestionRef(dataConnect, reactivateQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_update);
});
```

## CreateQuestionOption
You can execute the `CreateQuestionOption` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createQuestionOption(vars: CreateQuestionOptionVariables): MutationPromise<CreateQuestionOptionData, CreateQuestionOptionVariables>;

interface CreateQuestionOptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionOptionVariables): MutationRef<CreateQuestionOptionData, CreateQuestionOptionVariables>;
}
export const createQuestionOptionRef: CreateQuestionOptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuestionOption(dc: DataConnect, vars: CreateQuestionOptionVariables): MutationPromise<CreateQuestionOptionData, CreateQuestionOptionVariables>;

interface CreateQuestionOptionRef {
  ...
  (dc: DataConnect, vars: CreateQuestionOptionVariables): MutationRef<CreateQuestionOptionData, CreateQuestionOptionVariables>;
}
export const createQuestionOptionRef: CreateQuestionOptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuestionOptionRef:
```typescript
const name = createQuestionOptionRef.operationName;
console.log(name);
```

### Variables
The `CreateQuestionOption` mutation requires an argument of type `CreateQuestionOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuestionOptionVariables {
  questionOptionId: UUIDString;
  text: string;
  isCorrect: boolean;
  position: number;
  score?: number | null;
  questionId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateQuestionOption` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuestionOptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuestionOptionData {
  questionOption_insert: QuestionOption_Key;
}
```
### Using `CreateQuestionOption`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuestionOption, CreateQuestionOptionVariables } from '@dataconnect/generated';

// The `CreateQuestionOption` mutation requires an argument of type `CreateQuestionOptionVariables`:
const createQuestionOptionVars: CreateQuestionOptionVariables = {
  questionOptionId: ..., 
  text: ..., 
  isCorrect: ..., 
  position: ..., 
  score: ..., // optional
  questionId: ..., 
};

// Call the `createQuestionOption()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestionOption(createQuestionOptionVars);
// Variables can be defined inline as well.
const { data } = await createQuestionOption({ questionOptionId: ..., text: ..., isCorrect: ..., position: ..., score: ..., questionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuestionOption(dataConnect, createQuestionOptionVars);

console.log(data.questionOption_insert);

// Or, you can use the `Promise` API.
createQuestionOption(createQuestionOptionVars).then((response) => {
  const data = response.data;
  console.log(data.questionOption_insert);
});
```

### Using `CreateQuestionOption`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuestionOptionRef, CreateQuestionOptionVariables } from '@dataconnect/generated';

// The `CreateQuestionOption` mutation requires an argument of type `CreateQuestionOptionVariables`:
const createQuestionOptionVars: CreateQuestionOptionVariables = {
  questionOptionId: ..., 
  text: ..., 
  isCorrect: ..., 
  position: ..., 
  score: ..., // optional
  questionId: ..., 
};

// Call the `createQuestionOptionRef()` function to get a reference to the mutation.
const ref = createQuestionOptionRef(createQuestionOptionVars);
// Variables can be defined inline as well.
const ref = createQuestionOptionRef({ questionOptionId: ..., text: ..., isCorrect: ..., position: ..., score: ..., questionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuestionOptionRef(dataConnect, createQuestionOptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionOption_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionOption_insert);
});
```

## UpdateQuestionOption
You can execute the `UpdateQuestionOption` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateQuestionOption(vars: UpdateQuestionOptionVariables): MutationPromise<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;

interface UpdateQuestionOptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionOptionVariables): MutationRef<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;
}
export const updateQuestionOptionRef: UpdateQuestionOptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuestionOption(dc: DataConnect, vars: UpdateQuestionOptionVariables): MutationPromise<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;

interface UpdateQuestionOptionRef {
  ...
  (dc: DataConnect, vars: UpdateQuestionOptionVariables): MutationRef<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;
}
export const updateQuestionOptionRef: UpdateQuestionOptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuestionOptionRef:
```typescript
const name = updateQuestionOptionRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuestionOption` mutation requires an argument of type `UpdateQuestionOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuestionOptionVariables {
  questionOptionId: UUIDString;
  text?: string | null;
  isCorrect?: boolean | null;
  position?: number | null;
  score?: number | null;
}
```
### Return Type
Recall that executing the `UpdateQuestionOption` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuestionOptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuestionOptionData {
  questionOption_update?: QuestionOption_Key | null;
}
```
### Using `UpdateQuestionOption`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuestionOption, UpdateQuestionOptionVariables } from '@dataconnect/generated';

// The `UpdateQuestionOption` mutation requires an argument of type `UpdateQuestionOptionVariables`:
const updateQuestionOptionVars: UpdateQuestionOptionVariables = {
  questionOptionId: ..., 
  text: ..., // optional
  isCorrect: ..., // optional
  position: ..., // optional
  score: ..., // optional
};

// Call the `updateQuestionOption()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuestionOption(updateQuestionOptionVars);
// Variables can be defined inline as well.
const { data } = await updateQuestionOption({ questionOptionId: ..., text: ..., isCorrect: ..., position: ..., score: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuestionOption(dataConnect, updateQuestionOptionVars);

console.log(data.questionOption_update);

// Or, you can use the `Promise` API.
updateQuestionOption(updateQuestionOptionVars).then((response) => {
  const data = response.data;
  console.log(data.questionOption_update);
});
```

### Using `UpdateQuestionOption`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuestionOptionRef, UpdateQuestionOptionVariables } from '@dataconnect/generated';

// The `UpdateQuestionOption` mutation requires an argument of type `UpdateQuestionOptionVariables`:
const updateQuestionOptionVars: UpdateQuestionOptionVariables = {
  questionOptionId: ..., 
  text: ..., // optional
  isCorrect: ..., // optional
  position: ..., // optional
  score: ..., // optional
};

// Call the `updateQuestionOptionRef()` function to get a reference to the mutation.
const ref = updateQuestionOptionRef(updateQuestionOptionVars);
// Variables can be defined inline as well.
const ref = updateQuestionOptionRef({ questionOptionId: ..., text: ..., isCorrect: ..., position: ..., score: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuestionOptionRef(dataConnect, updateQuestionOptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionOption_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionOption_update);
});
```

## DeleteQuestionOption
You can execute the `DeleteQuestionOption` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteQuestionOption(vars: DeleteQuestionOptionVariables): MutationPromise<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;

interface DeleteQuestionOptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionOptionVariables): MutationRef<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;
}
export const deleteQuestionOptionRef: DeleteQuestionOptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQuestionOption(dc: DataConnect, vars: DeleteQuestionOptionVariables): MutationPromise<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;

interface DeleteQuestionOptionRef {
  ...
  (dc: DataConnect, vars: DeleteQuestionOptionVariables): MutationRef<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;
}
export const deleteQuestionOptionRef: DeleteQuestionOptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQuestionOptionRef:
```typescript
const name = deleteQuestionOptionRef.operationName;
console.log(name);
```

### Variables
The `DeleteQuestionOption` mutation requires an argument of type `DeleteQuestionOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQuestionOptionVariables {
  questionOptionId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteQuestionOption` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQuestionOptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQuestionOptionData {
  questionOption_delete?: QuestionOption_Key | null;
}
```
### Using `DeleteQuestionOption`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQuestionOption, DeleteQuestionOptionVariables } from '@dataconnect/generated';

// The `DeleteQuestionOption` mutation requires an argument of type `DeleteQuestionOptionVariables`:
const deleteQuestionOptionVars: DeleteQuestionOptionVariables = {
  questionOptionId: ..., 
};

// Call the `deleteQuestionOption()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQuestionOption(deleteQuestionOptionVars);
// Variables can be defined inline as well.
const { data } = await deleteQuestionOption({ questionOptionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQuestionOption(dataConnect, deleteQuestionOptionVars);

console.log(data.questionOption_delete);

// Or, you can use the `Promise` API.
deleteQuestionOption(deleteQuestionOptionVars).then((response) => {
  const data = response.data;
  console.log(data.questionOption_delete);
});
```

### Using `DeleteQuestionOption`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQuestionOptionRef, DeleteQuestionOptionVariables } from '@dataconnect/generated';

// The `DeleteQuestionOption` mutation requires an argument of type `DeleteQuestionOptionVariables`:
const deleteQuestionOptionVars: DeleteQuestionOptionVariables = {
  questionOptionId: ..., 
};

// Call the `deleteQuestionOptionRef()` function to get a reference to the mutation.
const ref = deleteQuestionOptionRef(deleteQuestionOptionVars);
// Variables can be defined inline as well.
const ref = deleteQuestionOptionRef({ questionOptionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQuestionOptionRef(dataConnect, deleteQuestionOptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionOption_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionOption_delete);
});
```

## CreateQuestionType
You can execute the `CreateQuestionType` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createQuestionType(vars: CreateQuestionTypeVariables): MutationPromise<CreateQuestionTypeData, CreateQuestionTypeVariables>;

interface CreateQuestionTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionTypeVariables): MutationRef<CreateQuestionTypeData, CreateQuestionTypeVariables>;
}
export const createQuestionTypeRef: CreateQuestionTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuestionType(dc: DataConnect, vars: CreateQuestionTypeVariables): MutationPromise<CreateQuestionTypeData, CreateQuestionTypeVariables>;

interface CreateQuestionTypeRef {
  ...
  (dc: DataConnect, vars: CreateQuestionTypeVariables): MutationRef<CreateQuestionTypeData, CreateQuestionTypeVariables>;
}
export const createQuestionTypeRef: CreateQuestionTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuestionTypeRef:
```typescript
const name = createQuestionTypeRef.operationName;
console.log(name);
```

### Variables
The `CreateQuestionType` mutation requires an argument of type `CreateQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateQuestionType` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuestionTypeData {
  questionType_insert: QuestionType_Key;
}
```
### Using `CreateQuestionType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuestionType, CreateQuestionTypeVariables } from '@dataconnect/generated';

// The `CreateQuestionType` mutation requires an argument of type `CreateQuestionTypeVariables`:
const createQuestionTypeVars: CreateQuestionTypeVariables = {
  questionTypeId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  minOptions: ..., 
  maxOptions: ..., 
  correctOptions: ..., 
  active: ..., 
};

// Call the `createQuestionType()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestionType(createQuestionTypeVars);
// Variables can be defined inline as well.
const { data } = await createQuestionType({ questionTypeId: ..., code: ..., name: ..., description: ..., minOptions: ..., maxOptions: ..., correctOptions: ..., active: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuestionType(dataConnect, createQuestionTypeVars);

console.log(data.questionType_insert);

// Or, you can use the `Promise` API.
createQuestionType(createQuestionTypeVars).then((response) => {
  const data = response.data;
  console.log(data.questionType_insert);
});
```

### Using `CreateQuestionType`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuestionTypeRef, CreateQuestionTypeVariables } from '@dataconnect/generated';

// The `CreateQuestionType` mutation requires an argument of type `CreateQuestionTypeVariables`:
const createQuestionTypeVars: CreateQuestionTypeVariables = {
  questionTypeId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  minOptions: ..., 
  maxOptions: ..., 
  correctOptions: ..., 
  active: ..., 
};

// Call the `createQuestionTypeRef()` function to get a reference to the mutation.
const ref = createQuestionTypeRef(createQuestionTypeVars);
// Variables can be defined inline as well.
const ref = createQuestionTypeRef({ questionTypeId: ..., code: ..., name: ..., description: ..., minOptions: ..., maxOptions: ..., correctOptions: ..., active: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuestionTypeRef(dataConnect, createQuestionTypeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionType_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionType_insert);
});
```

## UpdateQuestionType
You can execute the `UpdateQuestionType` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateQuestionType(vars: UpdateQuestionTypeVariables): MutationPromise<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;

interface UpdateQuestionTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionTypeVariables): MutationRef<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;
}
export const updateQuestionTypeRef: UpdateQuestionTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuestionType(dc: DataConnect, vars: UpdateQuestionTypeVariables): MutationPromise<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;

interface UpdateQuestionTypeRef {
  ...
  (dc: DataConnect, vars: UpdateQuestionTypeVariables): MutationRef<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;
}
export const updateQuestionTypeRef: UpdateQuestionTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuestionTypeRef:
```typescript
const name = updateQuestionTypeRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuestionType` mutation requires an argument of type `UpdateQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuestionTypeVariables {
  questionTypeId: UUIDString;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  minOptions?: number | null;
  maxOptions?: number | null;
  correctOptions?: number | null;
}
```
### Return Type
Recall that executing the `UpdateQuestionType` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuestionTypeData {
  questionType_update?: QuestionType_Key | null;
}
```
### Using `UpdateQuestionType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuestionType, UpdateQuestionTypeVariables } from '@dataconnect/generated';

// The `UpdateQuestionType` mutation requires an argument of type `UpdateQuestionTypeVariables`:
const updateQuestionTypeVars: UpdateQuestionTypeVariables = {
  questionTypeId: ..., 
  code: ..., // optional
  name: ..., // optional
  description: ..., // optional
  minOptions: ..., // optional
  maxOptions: ..., // optional
  correctOptions: ..., // optional
};

// Call the `updateQuestionType()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuestionType(updateQuestionTypeVars);
// Variables can be defined inline as well.
const { data } = await updateQuestionType({ questionTypeId: ..., code: ..., name: ..., description: ..., minOptions: ..., maxOptions: ..., correctOptions: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuestionType(dataConnect, updateQuestionTypeVars);

console.log(data.questionType_update);

// Or, you can use the `Promise` API.
updateQuestionType(updateQuestionTypeVars).then((response) => {
  const data = response.data;
  console.log(data.questionType_update);
});
```

### Using `UpdateQuestionType`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuestionTypeRef, UpdateQuestionTypeVariables } from '@dataconnect/generated';

// The `UpdateQuestionType` mutation requires an argument of type `UpdateQuestionTypeVariables`:
const updateQuestionTypeVars: UpdateQuestionTypeVariables = {
  questionTypeId: ..., 
  code: ..., // optional
  name: ..., // optional
  description: ..., // optional
  minOptions: ..., // optional
  maxOptions: ..., // optional
  correctOptions: ..., // optional
};

// Call the `updateQuestionTypeRef()` function to get a reference to the mutation.
const ref = updateQuestionTypeRef(updateQuestionTypeVars);
// Variables can be defined inline as well.
const ref = updateQuestionTypeRef({ questionTypeId: ..., code: ..., name: ..., description: ..., minOptions: ..., maxOptions: ..., correctOptions: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuestionTypeRef(dataConnect, updateQuestionTypeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionType_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionType_update);
});
```

## DeactivateQuestionType
You can execute the `DeactivateQuestionType` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateQuestionType(vars: DeactivateQuestionTypeVariables): MutationPromise<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;

interface DeactivateQuestionTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateQuestionTypeVariables): MutationRef<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;
}
export const deactivateQuestionTypeRef: DeactivateQuestionTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateQuestionType(dc: DataConnect, vars: DeactivateQuestionTypeVariables): MutationPromise<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;

interface DeactivateQuestionTypeRef {
  ...
  (dc: DataConnect, vars: DeactivateQuestionTypeVariables): MutationRef<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;
}
export const deactivateQuestionTypeRef: DeactivateQuestionTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateQuestionTypeRef:
```typescript
const name = deactivateQuestionTypeRef.operationName;
console.log(name);
```

### Variables
The `DeactivateQuestionType` mutation requires an argument of type `DeactivateQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateQuestionTypeVariables {
  questionTypeId: UUIDString;
}
```
### Return Type
Recall that executing the `DeactivateQuestionType` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateQuestionTypeData {
  questionType_update?: QuestionType_Key | null;
}
```
### Using `DeactivateQuestionType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateQuestionType, DeactivateQuestionTypeVariables } from '@dataconnect/generated';

// The `DeactivateQuestionType` mutation requires an argument of type `DeactivateQuestionTypeVariables`:
const deactivateQuestionTypeVars: DeactivateQuestionTypeVariables = {
  questionTypeId: ..., 
};

// Call the `deactivateQuestionType()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateQuestionType(deactivateQuestionTypeVars);
// Variables can be defined inline as well.
const { data } = await deactivateQuestionType({ questionTypeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateQuestionType(dataConnect, deactivateQuestionTypeVars);

console.log(data.questionType_update);

// Or, you can use the `Promise` API.
deactivateQuestionType(deactivateQuestionTypeVars).then((response) => {
  const data = response.data;
  console.log(data.questionType_update);
});
```

### Using `DeactivateQuestionType`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateQuestionTypeRef, DeactivateQuestionTypeVariables } from '@dataconnect/generated';

// The `DeactivateQuestionType` mutation requires an argument of type `DeactivateQuestionTypeVariables`:
const deactivateQuestionTypeVars: DeactivateQuestionTypeVariables = {
  questionTypeId: ..., 
};

// Call the `deactivateQuestionTypeRef()` function to get a reference to the mutation.
const ref = deactivateQuestionTypeRef(deactivateQuestionTypeVars);
// Variables can be defined inline as well.
const ref = deactivateQuestionTypeRef({ questionTypeId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateQuestionTypeRef(dataConnect, deactivateQuestionTypeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionType_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionType_update);
});
```

## ReactivateQuestionType
You can execute the `ReactivateQuestionType` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateQuestionType(vars: ReactivateQuestionTypeVariables): MutationPromise<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;

interface ReactivateQuestionTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateQuestionTypeVariables): MutationRef<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;
}
export const reactivateQuestionTypeRef: ReactivateQuestionTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateQuestionType(dc: DataConnect, vars: ReactivateQuestionTypeVariables): MutationPromise<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;

interface ReactivateQuestionTypeRef {
  ...
  (dc: DataConnect, vars: ReactivateQuestionTypeVariables): MutationRef<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;
}
export const reactivateQuestionTypeRef: ReactivateQuestionTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateQuestionTypeRef:
```typescript
const name = reactivateQuestionTypeRef.operationName;
console.log(name);
```

### Variables
The `ReactivateQuestionType` mutation requires an argument of type `ReactivateQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateQuestionTypeVariables {
  questionTypeId: UUIDString;
}
```
### Return Type
Recall that executing the `ReactivateQuestionType` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateQuestionTypeData {
  questionType_update?: QuestionType_Key | null;
}
```
### Using `ReactivateQuestionType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateQuestionType, ReactivateQuestionTypeVariables } from '@dataconnect/generated';

// The `ReactivateQuestionType` mutation requires an argument of type `ReactivateQuestionTypeVariables`:
const reactivateQuestionTypeVars: ReactivateQuestionTypeVariables = {
  questionTypeId: ..., 
};

// Call the `reactivateQuestionType()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateQuestionType(reactivateQuestionTypeVars);
// Variables can be defined inline as well.
const { data } = await reactivateQuestionType({ questionTypeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateQuestionType(dataConnect, reactivateQuestionTypeVars);

console.log(data.questionType_update);

// Or, you can use the `Promise` API.
reactivateQuestionType(reactivateQuestionTypeVars).then((response) => {
  const data = response.data;
  console.log(data.questionType_update);
});
```

### Using `ReactivateQuestionType`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateQuestionTypeRef, ReactivateQuestionTypeVariables } from '@dataconnect/generated';

// The `ReactivateQuestionType` mutation requires an argument of type `ReactivateQuestionTypeVariables`:
const reactivateQuestionTypeVars: ReactivateQuestionTypeVariables = {
  questionTypeId: ..., 
};

// Call the `reactivateQuestionTypeRef()` function to get a reference to the mutation.
const ref = reactivateQuestionTypeRef(reactivateQuestionTypeVars);
// Variables can be defined inline as well.
const ref = reactivateQuestionTypeRef({ questionTypeId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateQuestionTypeRef(dataConnect, reactivateQuestionTypeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionType_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionType_update);
});
```

## CreateDifficulty
You can execute the `CreateDifficulty` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDifficulty(vars: CreateDifficultyVariables): MutationPromise<CreateDifficultyData, CreateDifficultyVariables>;

interface CreateDifficultyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDifficultyVariables): MutationRef<CreateDifficultyData, CreateDifficultyVariables>;
}
export const createDifficultyRef: CreateDifficultyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDifficulty(dc: DataConnect, vars: CreateDifficultyVariables): MutationPromise<CreateDifficultyData, CreateDifficultyVariables>;

interface CreateDifficultyRef {
  ...
  (dc: DataConnect, vars: CreateDifficultyVariables): MutationRef<CreateDifficultyData, CreateDifficultyVariables>;
}
export const createDifficultyRef: CreateDifficultyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDifficultyRef:
```typescript
const name = createDifficultyRef.operationName;
console.log(name);
```

### Variables
The `CreateDifficulty` mutation requires an argument of type `CreateDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDifficultyVariables {
  difficultyId: UUIDString;
  code: string;
  level: string;
  weight: number;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateDifficulty` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDifficultyData {
  difficulty_insert: Difficulty_Key;
}
```
### Using `CreateDifficulty`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDifficulty, CreateDifficultyVariables } from '@dataconnect/generated';

// The `CreateDifficulty` mutation requires an argument of type `CreateDifficultyVariables`:
const createDifficultyVars: CreateDifficultyVariables = {
  difficultyId: ..., 
  code: ..., 
  level: ..., 
  weight: ..., 
  description: ..., // optional
};

// Call the `createDifficulty()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDifficulty(createDifficultyVars);
// Variables can be defined inline as well.
const { data } = await createDifficulty({ difficultyId: ..., code: ..., level: ..., weight: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDifficulty(dataConnect, createDifficultyVars);

console.log(data.difficulty_insert);

// Or, you can use the `Promise` API.
createDifficulty(createDifficultyVars).then((response) => {
  const data = response.data;
  console.log(data.difficulty_insert);
});
```

### Using `CreateDifficulty`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDifficultyRef, CreateDifficultyVariables } from '@dataconnect/generated';

// The `CreateDifficulty` mutation requires an argument of type `CreateDifficultyVariables`:
const createDifficultyVars: CreateDifficultyVariables = {
  difficultyId: ..., 
  code: ..., 
  level: ..., 
  weight: ..., 
  description: ..., // optional
};

// Call the `createDifficultyRef()` function to get a reference to the mutation.
const ref = createDifficultyRef(createDifficultyVars);
// Variables can be defined inline as well.
const ref = createDifficultyRef({ difficultyId: ..., code: ..., level: ..., weight: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDifficultyRef(dataConnect, createDifficultyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.difficulty_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.difficulty_insert);
});
```

## DeactivateDifficulty
You can execute the `DeactivateDifficulty` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateDifficulty(vars: DeactivateDifficultyVariables): MutationPromise<DeactivateDifficultyData, DeactivateDifficultyVariables>;

interface DeactivateDifficultyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateDifficultyVariables): MutationRef<DeactivateDifficultyData, DeactivateDifficultyVariables>;
}
export const deactivateDifficultyRef: DeactivateDifficultyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateDifficulty(dc: DataConnect, vars: DeactivateDifficultyVariables): MutationPromise<DeactivateDifficultyData, DeactivateDifficultyVariables>;

interface DeactivateDifficultyRef {
  ...
  (dc: DataConnect, vars: DeactivateDifficultyVariables): MutationRef<DeactivateDifficultyData, DeactivateDifficultyVariables>;
}
export const deactivateDifficultyRef: DeactivateDifficultyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateDifficultyRef:
```typescript
const name = deactivateDifficultyRef.operationName;
console.log(name);
```

### Variables
The `DeactivateDifficulty` mutation requires an argument of type `DeactivateDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateDifficultyVariables {
  difficultyId: UUIDString;
}
```
### Return Type
Recall that executing the `DeactivateDifficulty` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateDifficultyData {
  difficulty_update?: Difficulty_Key | null;
}
```
### Using `DeactivateDifficulty`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateDifficulty, DeactivateDifficultyVariables } from '@dataconnect/generated';

// The `DeactivateDifficulty` mutation requires an argument of type `DeactivateDifficultyVariables`:
const deactivateDifficultyVars: DeactivateDifficultyVariables = {
  difficultyId: ..., 
};

// Call the `deactivateDifficulty()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateDifficulty(deactivateDifficultyVars);
// Variables can be defined inline as well.
const { data } = await deactivateDifficulty({ difficultyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateDifficulty(dataConnect, deactivateDifficultyVars);

console.log(data.difficulty_update);

// Or, you can use the `Promise` API.
deactivateDifficulty(deactivateDifficultyVars).then((response) => {
  const data = response.data;
  console.log(data.difficulty_update);
});
```

### Using `DeactivateDifficulty`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateDifficultyRef, DeactivateDifficultyVariables } from '@dataconnect/generated';

// The `DeactivateDifficulty` mutation requires an argument of type `DeactivateDifficultyVariables`:
const deactivateDifficultyVars: DeactivateDifficultyVariables = {
  difficultyId: ..., 
};

// Call the `deactivateDifficultyRef()` function to get a reference to the mutation.
const ref = deactivateDifficultyRef(deactivateDifficultyVars);
// Variables can be defined inline as well.
const ref = deactivateDifficultyRef({ difficultyId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateDifficultyRef(dataConnect, deactivateDifficultyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.difficulty_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.difficulty_update);
});
```

## ReactivateDifficulty
You can execute the `ReactivateDifficulty` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateDifficulty(vars: ReactivateDifficultyVariables): MutationPromise<ReactivateDifficultyData, ReactivateDifficultyVariables>;

interface ReactivateDifficultyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateDifficultyVariables): MutationRef<ReactivateDifficultyData, ReactivateDifficultyVariables>;
}
export const reactivateDifficultyRef: ReactivateDifficultyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateDifficulty(dc: DataConnect, vars: ReactivateDifficultyVariables): MutationPromise<ReactivateDifficultyData, ReactivateDifficultyVariables>;

interface ReactivateDifficultyRef {
  ...
  (dc: DataConnect, vars: ReactivateDifficultyVariables): MutationRef<ReactivateDifficultyData, ReactivateDifficultyVariables>;
}
export const reactivateDifficultyRef: ReactivateDifficultyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateDifficultyRef:
```typescript
const name = reactivateDifficultyRef.operationName;
console.log(name);
```

### Variables
The `ReactivateDifficulty` mutation requires an argument of type `ReactivateDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateDifficultyVariables {
  difficultyId: UUIDString;
}
```
### Return Type
Recall that executing the `ReactivateDifficulty` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateDifficultyData {
  difficulty_update?: Difficulty_Key | null;
}
```
### Using `ReactivateDifficulty`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateDifficulty, ReactivateDifficultyVariables } from '@dataconnect/generated';

// The `ReactivateDifficulty` mutation requires an argument of type `ReactivateDifficultyVariables`:
const reactivateDifficultyVars: ReactivateDifficultyVariables = {
  difficultyId: ..., 
};

// Call the `reactivateDifficulty()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateDifficulty(reactivateDifficultyVars);
// Variables can be defined inline as well.
const { data } = await reactivateDifficulty({ difficultyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateDifficulty(dataConnect, reactivateDifficultyVars);

console.log(data.difficulty_update);

// Or, you can use the `Promise` API.
reactivateDifficulty(reactivateDifficultyVars).then((response) => {
  const data = response.data;
  console.log(data.difficulty_update);
});
```

### Using `ReactivateDifficulty`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateDifficultyRef, ReactivateDifficultyVariables } from '@dataconnect/generated';

// The `ReactivateDifficulty` mutation requires an argument of type `ReactivateDifficultyVariables`:
const reactivateDifficultyVars: ReactivateDifficultyVariables = {
  difficultyId: ..., 
};

// Call the `reactivateDifficultyRef()` function to get a reference to the mutation.
const ref = reactivateDifficultyRef(reactivateDifficultyVars);
// Variables can be defined inline as well.
const ref = reactivateDifficultyRef({ difficultyId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateDifficultyRef(dataConnect, reactivateDifficultyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.difficulty_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.difficulty_update);
});
```

## CreateTaxonomy
You can execute the `CreateTaxonomy` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTaxonomy(vars: CreateTaxonomyVariables): MutationPromise<CreateTaxonomyData, CreateTaxonomyVariables>;

interface CreateTaxonomyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTaxonomyVariables): MutationRef<CreateTaxonomyData, CreateTaxonomyVariables>;
}
export const createTaxonomyRef: CreateTaxonomyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTaxonomy(dc: DataConnect, vars: CreateTaxonomyVariables): MutationPromise<CreateTaxonomyData, CreateTaxonomyVariables>;

interface CreateTaxonomyRef {
  ...
  (dc: DataConnect, vars: CreateTaxonomyVariables): MutationRef<CreateTaxonomyData, CreateTaxonomyVariables>;
}
export const createTaxonomyRef: CreateTaxonomyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTaxonomyRef:
```typescript
const name = createTaxonomyRef.operationName;
console.log(name);
```

### Variables
The `CreateTaxonomy` mutation requires an argument of type `CreateTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTaxonomyVariables {
  taxonomyId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  level: number;
  createdBy: UUIDString;
}
```
### Return Type
Recall that executing the `CreateTaxonomy` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTaxonomyData {
  taxonomy_insert: Taxonomy_Key;
}
```
### Using `CreateTaxonomy`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTaxonomy, CreateTaxonomyVariables } from '@dataconnect/generated';

// The `CreateTaxonomy` mutation requires an argument of type `CreateTaxonomyVariables`:
const createTaxonomyVars: CreateTaxonomyVariables = {
  taxonomyId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  level: ..., 
  createdBy: ..., 
};

// Call the `createTaxonomy()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTaxonomy(createTaxonomyVars);
// Variables can be defined inline as well.
const { data } = await createTaxonomy({ taxonomyId: ..., code: ..., name: ..., description: ..., level: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTaxonomy(dataConnect, createTaxonomyVars);

console.log(data.taxonomy_insert);

// Or, you can use the `Promise` API.
createTaxonomy(createTaxonomyVars).then((response) => {
  const data = response.data;
  console.log(data.taxonomy_insert);
});
```

### Using `CreateTaxonomy`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTaxonomyRef, CreateTaxonomyVariables } from '@dataconnect/generated';

// The `CreateTaxonomy` mutation requires an argument of type `CreateTaxonomyVariables`:
const createTaxonomyVars: CreateTaxonomyVariables = {
  taxonomyId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  level: ..., 
  createdBy: ..., 
};

// Call the `createTaxonomyRef()` function to get a reference to the mutation.
const ref = createTaxonomyRef(createTaxonomyVars);
// Variables can be defined inline as well.
const ref = createTaxonomyRef({ taxonomyId: ..., code: ..., name: ..., description: ..., level: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTaxonomyRef(dataConnect, createTaxonomyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.taxonomy_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.taxonomy_insert);
});
```

## UpdateTaxonomy
You can execute the `UpdateTaxonomy` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTaxonomy(vars: UpdateTaxonomyVariables): MutationPromise<UpdateTaxonomyData, UpdateTaxonomyVariables>;

interface UpdateTaxonomyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTaxonomyVariables): MutationRef<UpdateTaxonomyData, UpdateTaxonomyVariables>;
}
export const updateTaxonomyRef: UpdateTaxonomyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTaxonomy(dc: DataConnect, vars: UpdateTaxonomyVariables): MutationPromise<UpdateTaxonomyData, UpdateTaxonomyVariables>;

interface UpdateTaxonomyRef {
  ...
  (dc: DataConnect, vars: UpdateTaxonomyVariables): MutationRef<UpdateTaxonomyData, UpdateTaxonomyVariables>;
}
export const updateTaxonomyRef: UpdateTaxonomyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTaxonomyRef:
```typescript
const name = updateTaxonomyRef.operationName;
console.log(name);
```

### Variables
The `UpdateTaxonomy` mutation requires an argument of type `UpdateTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateTaxonomy` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTaxonomyData {
  taxonomy_update?: Taxonomy_Key | null;
}
```
### Using `UpdateTaxonomy`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTaxonomy, UpdateTaxonomyVariables } from '@dataconnect/generated';

// The `UpdateTaxonomy` mutation requires an argument of type `UpdateTaxonomyVariables`:
const updateTaxonomyVars: UpdateTaxonomyVariables = {
  taxonomyId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  level: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateTaxonomy()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTaxonomy(updateTaxonomyVars);
// Variables can be defined inline as well.
const { data } = await updateTaxonomy({ taxonomyId: ..., code: ..., name: ..., description: ..., level: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTaxonomy(dataConnect, updateTaxonomyVars);

console.log(data.taxonomy_update);

// Or, you can use the `Promise` API.
updateTaxonomy(updateTaxonomyVars).then((response) => {
  const data = response.data;
  console.log(data.taxonomy_update);
});
```

### Using `UpdateTaxonomy`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTaxonomyRef, UpdateTaxonomyVariables } from '@dataconnect/generated';

// The `UpdateTaxonomy` mutation requires an argument of type `UpdateTaxonomyVariables`:
const updateTaxonomyVars: UpdateTaxonomyVariables = {
  taxonomyId: ..., 
  code: ..., 
  name: ..., 
  description: ..., // optional
  level: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateTaxonomyRef()` function to get a reference to the mutation.
const ref = updateTaxonomyRef(updateTaxonomyVars);
// Variables can be defined inline as well.
const ref = updateTaxonomyRef({ taxonomyId: ..., code: ..., name: ..., description: ..., level: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTaxonomyRef(dataConnect, updateTaxonomyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.taxonomy_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.taxonomy_update);
});
```

## DeactivateTaxonomy
You can execute the `DeactivateTaxonomy` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateTaxonomy(vars: DeactivateTaxonomyVariables): MutationPromise<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;

interface DeactivateTaxonomyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateTaxonomyVariables): MutationRef<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;
}
export const deactivateTaxonomyRef: DeactivateTaxonomyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateTaxonomy(dc: DataConnect, vars: DeactivateTaxonomyVariables): MutationPromise<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;

interface DeactivateTaxonomyRef {
  ...
  (dc: DataConnect, vars: DeactivateTaxonomyVariables): MutationRef<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;
}
export const deactivateTaxonomyRef: DeactivateTaxonomyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateTaxonomyRef:
```typescript
const name = deactivateTaxonomyRef.operationName;
console.log(name);
```

### Variables
The `DeactivateTaxonomy` mutation requires an argument of type `DeactivateTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateTaxonomyVariables {
  taxonomyId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateTaxonomy` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateTaxonomyData {
  taxonomy_update?: Taxonomy_Key | null;
}
```
### Using `DeactivateTaxonomy`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateTaxonomy, DeactivateTaxonomyVariables } from '@dataconnect/generated';

// The `DeactivateTaxonomy` mutation requires an argument of type `DeactivateTaxonomyVariables`:
const deactivateTaxonomyVars: DeactivateTaxonomyVariables = {
  taxonomyId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateTaxonomy()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateTaxonomy(deactivateTaxonomyVars);
// Variables can be defined inline as well.
const { data } = await deactivateTaxonomy({ taxonomyId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateTaxonomy(dataConnect, deactivateTaxonomyVars);

console.log(data.taxonomy_update);

// Or, you can use the `Promise` API.
deactivateTaxonomy(deactivateTaxonomyVars).then((response) => {
  const data = response.data;
  console.log(data.taxonomy_update);
});
```

### Using `DeactivateTaxonomy`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateTaxonomyRef, DeactivateTaxonomyVariables } from '@dataconnect/generated';

// The `DeactivateTaxonomy` mutation requires an argument of type `DeactivateTaxonomyVariables`:
const deactivateTaxonomyVars: DeactivateTaxonomyVariables = {
  taxonomyId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateTaxonomyRef()` function to get a reference to the mutation.
const ref = deactivateTaxonomyRef(deactivateTaxonomyVars);
// Variables can be defined inline as well.
const ref = deactivateTaxonomyRef({ taxonomyId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateTaxonomyRef(dataConnect, deactivateTaxonomyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.taxonomy_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.taxonomy_update);
});
```

## ReactivateTaxonomy
You can execute the `ReactivateTaxonomy` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateTaxonomy(vars: ReactivateTaxonomyVariables): MutationPromise<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;

interface ReactivateTaxonomyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateTaxonomyVariables): MutationRef<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;
}
export const reactivateTaxonomyRef: ReactivateTaxonomyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateTaxonomy(dc: DataConnect, vars: ReactivateTaxonomyVariables): MutationPromise<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;

interface ReactivateTaxonomyRef {
  ...
  (dc: DataConnect, vars: ReactivateTaxonomyVariables): MutationRef<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;
}
export const reactivateTaxonomyRef: ReactivateTaxonomyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateTaxonomyRef:
```typescript
const name = reactivateTaxonomyRef.operationName;
console.log(name);
```

### Variables
The `ReactivateTaxonomy` mutation requires an argument of type `ReactivateTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateTaxonomyVariables {
  taxonomyId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateTaxonomy` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateTaxonomyData {
  taxonomy_update?: Taxonomy_Key | null;
}
```
### Using `ReactivateTaxonomy`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateTaxonomy, ReactivateTaxonomyVariables } from '@dataconnect/generated';

// The `ReactivateTaxonomy` mutation requires an argument of type `ReactivateTaxonomyVariables`:
const reactivateTaxonomyVars: ReactivateTaxonomyVariables = {
  taxonomyId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateTaxonomy()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateTaxonomy(reactivateTaxonomyVars);
// Variables can be defined inline as well.
const { data } = await reactivateTaxonomy({ taxonomyId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateTaxonomy(dataConnect, reactivateTaxonomyVars);

console.log(data.taxonomy_update);

// Or, you can use the `Promise` API.
reactivateTaxonomy(reactivateTaxonomyVars).then((response) => {
  const data = response.data;
  console.log(data.taxonomy_update);
});
```

### Using `ReactivateTaxonomy`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateTaxonomyRef, ReactivateTaxonomyVariables } from '@dataconnect/generated';

// The `ReactivateTaxonomy` mutation requires an argument of type `ReactivateTaxonomyVariables`:
const reactivateTaxonomyVars: ReactivateTaxonomyVariables = {
  taxonomyId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateTaxonomyRef()` function to get a reference to the mutation.
const ref = reactivateTaxonomyRef(reactivateTaxonomyVars);
// Variables can be defined inline as well.
const ref = reactivateTaxonomyRef({ taxonomyId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateTaxonomyRef(dataConnect, reactivateTaxonomyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.taxonomy_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.taxonomy_update);
});
```

## CreateEvaluation
You can execute the `CreateEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEvaluation(vars: CreateEvaluationVariables): MutationPromise<CreateEvaluationData, CreateEvaluationVariables>;

interface CreateEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEvaluationVariables): MutationRef<CreateEvaluationData, CreateEvaluationVariables>;
}
export const createEvaluationRef: CreateEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEvaluation(dc: DataConnect, vars: CreateEvaluationVariables): MutationPromise<CreateEvaluationData, CreateEvaluationVariables>;

interface CreateEvaluationRef {
  ...
  (dc: DataConnect, vars: CreateEvaluationVariables): MutationRef<CreateEvaluationData, CreateEvaluationVariables>;
}
export const createEvaluationRef: CreateEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEvaluationRef:
```typescript
const name = createEvaluationRef.operationName;
console.log(name);
```

### Variables
The `CreateEvaluation` mutation requires an argument of type `CreateEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEvaluationData {
  evaluation_insert: Evaluation_Key;
}
```
### Using `CreateEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEvaluation, CreateEvaluationVariables } from '@dataconnect/generated';

// The `CreateEvaluation` mutation requires an argument of type `CreateEvaluationVariables`:
const createEvaluationVars: CreateEvaluationVariables = {
  evaluationId: ..., 
  title: ..., 
  gradeScale: ..., 
  subjectId: ..., 
  userId: ..., 
  allowQuestionSubset: ..., 
  questionSubsetPercent: ..., // optional
  firebaseId: ..., 
};

// Call the `createEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEvaluation(createEvaluationVars);
// Variables can be defined inline as well.
const { data } = await createEvaluation({ evaluationId: ..., title: ..., gradeScale: ..., subjectId: ..., userId: ..., allowQuestionSubset: ..., questionSubsetPercent: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEvaluation(dataConnect, createEvaluationVars);

console.log(data.evaluation_insert);

// Or, you can use the `Promise` API.
createEvaluation(createEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.evaluation_insert);
});
```

### Using `CreateEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEvaluationRef, CreateEvaluationVariables } from '@dataconnect/generated';

// The `CreateEvaluation` mutation requires an argument of type `CreateEvaluationVariables`:
const createEvaluationVars: CreateEvaluationVariables = {
  evaluationId: ..., 
  title: ..., 
  gradeScale: ..., 
  subjectId: ..., 
  userId: ..., 
  allowQuestionSubset: ..., 
  questionSubsetPercent: ..., // optional
  firebaseId: ..., 
};

// Call the `createEvaluationRef()` function to get a reference to the mutation.
const ref = createEvaluationRef(createEvaluationVars);
// Variables can be defined inline as well.
const ref = createEvaluationRef({ evaluationId: ..., title: ..., gradeScale: ..., subjectId: ..., userId: ..., allowQuestionSubset: ..., questionSubsetPercent: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEvaluationRef(dataConnect, createEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.evaluation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluation_insert);
});
```

## UpdateEvaluation
You can execute the `UpdateEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEvaluation(vars: UpdateEvaluationVariables): MutationPromise<UpdateEvaluationData, UpdateEvaluationVariables>;

interface UpdateEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEvaluationVariables): MutationRef<UpdateEvaluationData, UpdateEvaluationVariables>;
}
export const updateEvaluationRef: UpdateEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEvaluation(dc: DataConnect, vars: UpdateEvaluationVariables): MutationPromise<UpdateEvaluationData, UpdateEvaluationVariables>;

interface UpdateEvaluationRef {
  ...
  (dc: DataConnect, vars: UpdateEvaluationVariables): MutationRef<UpdateEvaluationData, UpdateEvaluationVariables>;
}
export const updateEvaluationRef: UpdateEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEvaluationRef:
```typescript
const name = updateEvaluationRef.operationName;
console.log(name);
```

### Variables
The `UpdateEvaluation` mutation requires an argument of type `UpdateEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEvaluationData {
  evaluation_update?: Evaluation_Key | null;
}
```
### Using `UpdateEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEvaluation, UpdateEvaluationVariables } from '@dataconnect/generated';

// The `UpdateEvaluation` mutation requires an argument of type `UpdateEvaluationVariables`:
const updateEvaluationVars: UpdateEvaluationVariables = {
  evaluationId: ..., 
  title: ..., // optional
  gradeScale: ..., // optional
  subjectId: ..., // optional
  pdfPath: ..., // optional
  allowQuestionSubset: ..., // optional
  questionSubsetPercent: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEvaluation(updateEvaluationVars);
// Variables can be defined inline as well.
const { data } = await updateEvaluation({ evaluationId: ..., title: ..., gradeScale: ..., subjectId: ..., pdfPath: ..., allowQuestionSubset: ..., questionSubsetPercent: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEvaluation(dataConnect, updateEvaluationVars);

console.log(data.evaluation_update);

// Or, you can use the `Promise` API.
updateEvaluation(updateEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.evaluation_update);
});
```

### Using `UpdateEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEvaluationRef, UpdateEvaluationVariables } from '@dataconnect/generated';

// The `UpdateEvaluation` mutation requires an argument of type `UpdateEvaluationVariables`:
const updateEvaluationVars: UpdateEvaluationVariables = {
  evaluationId: ..., 
  title: ..., // optional
  gradeScale: ..., // optional
  subjectId: ..., // optional
  pdfPath: ..., // optional
  allowQuestionSubset: ..., // optional
  questionSubsetPercent: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateEvaluationRef()` function to get a reference to the mutation.
const ref = updateEvaluationRef(updateEvaluationVars);
// Variables can be defined inline as well.
const ref = updateEvaluationRef({ evaluationId: ..., title: ..., gradeScale: ..., subjectId: ..., pdfPath: ..., allowQuestionSubset: ..., questionSubsetPercent: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEvaluationRef(dataConnect, updateEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.evaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluation_update);
});
```

## UpdateEvaluationState
You can execute the `UpdateEvaluationState` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEvaluationState(vars: UpdateEvaluationStateVariables): MutationPromise<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;

interface UpdateEvaluationStateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEvaluationStateVariables): MutationRef<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;
}
export const updateEvaluationStateRef: UpdateEvaluationStateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEvaluationState(dc: DataConnect, vars: UpdateEvaluationStateVariables): MutationPromise<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;

interface UpdateEvaluationStateRef {
  ...
  (dc: DataConnect, vars: UpdateEvaluationStateVariables): MutationRef<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;
}
export const updateEvaluationStateRef: UpdateEvaluationStateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEvaluationStateRef:
```typescript
const name = updateEvaluationStateRef.operationName;
console.log(name);
```

### Variables
The `UpdateEvaluationState` mutation requires an argument of type `UpdateEvaluationStateVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEvaluationStateVariables {
  evaluationId: UUIDString;
  state: string;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `UpdateEvaluationState` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEvaluationStateData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEvaluationStateData {
  evaluation_update?: Evaluation_Key | null;
}
```
### Using `UpdateEvaluationState`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEvaluationState, UpdateEvaluationStateVariables } from '@dataconnect/generated';

// The `UpdateEvaluationState` mutation requires an argument of type `UpdateEvaluationStateVariables`:
const updateEvaluationStateVars: UpdateEvaluationStateVariables = {
  evaluationId: ..., 
  state: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateEvaluationState()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEvaluationState(updateEvaluationStateVars);
// Variables can be defined inline as well.
const { data } = await updateEvaluationState({ evaluationId: ..., state: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEvaluationState(dataConnect, updateEvaluationStateVars);

console.log(data.evaluation_update);

// Or, you can use the `Promise` API.
updateEvaluationState(updateEvaluationStateVars).then((response) => {
  const data = response.data;
  console.log(data.evaluation_update);
});
```

### Using `UpdateEvaluationState`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEvaluationStateRef, UpdateEvaluationStateVariables } from '@dataconnect/generated';

// The `UpdateEvaluationState` mutation requires an argument of type `UpdateEvaluationStateVariables`:
const updateEvaluationStateVars: UpdateEvaluationStateVariables = {
  evaluationId: ..., 
  state: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateEvaluationStateRef()` function to get a reference to the mutation.
const ref = updateEvaluationStateRef(updateEvaluationStateVars);
// Variables can be defined inline as well.
const ref = updateEvaluationStateRef({ evaluationId: ..., state: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEvaluationStateRef(dataConnect, updateEvaluationStateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.evaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluation_update);
});
```

## DeactivateEvaluation
You can execute the `DeactivateEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateEvaluation(vars: DeactivateEvaluationVariables): MutationPromise<DeactivateEvaluationData, DeactivateEvaluationVariables>;

interface DeactivateEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateEvaluationVariables): MutationRef<DeactivateEvaluationData, DeactivateEvaluationVariables>;
}
export const deactivateEvaluationRef: DeactivateEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateEvaluation(dc: DataConnect, vars: DeactivateEvaluationVariables): MutationPromise<DeactivateEvaluationData, DeactivateEvaluationVariables>;

interface DeactivateEvaluationRef {
  ...
  (dc: DataConnect, vars: DeactivateEvaluationVariables): MutationRef<DeactivateEvaluationData, DeactivateEvaluationVariables>;
}
export const deactivateEvaluationRef: DeactivateEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateEvaluationRef:
```typescript
const name = deactivateEvaluationRef.operationName;
console.log(name);
```

### Variables
The `DeactivateEvaluation` mutation requires an argument of type `DeactivateEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateEvaluationVariables {
  evaluationId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateEvaluationData {
  evaluation_update?: Evaluation_Key | null;
}
```
### Using `DeactivateEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateEvaluation, DeactivateEvaluationVariables } from '@dataconnect/generated';

// The `DeactivateEvaluation` mutation requires an argument of type `DeactivateEvaluationVariables`:
const deactivateEvaluationVars: DeactivateEvaluationVariables = {
  evaluationId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateEvaluation(deactivateEvaluationVars);
// Variables can be defined inline as well.
const { data } = await deactivateEvaluation({ evaluationId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateEvaluation(dataConnect, deactivateEvaluationVars);

console.log(data.evaluation_update);

// Or, you can use the `Promise` API.
deactivateEvaluation(deactivateEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.evaluation_update);
});
```

### Using `DeactivateEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateEvaluationRef, DeactivateEvaluationVariables } from '@dataconnect/generated';

// The `DeactivateEvaluation` mutation requires an argument of type `DeactivateEvaluationVariables`:
const deactivateEvaluationVars: DeactivateEvaluationVariables = {
  evaluationId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateEvaluationRef()` function to get a reference to the mutation.
const ref = deactivateEvaluationRef(deactivateEvaluationVars);
// Variables can be defined inline as well.
const ref = deactivateEvaluationRef({ evaluationId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateEvaluationRef(dataConnect, deactivateEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.evaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluation_update);
});
```

## ReactivateEvaluation
You can execute the `ReactivateEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateEvaluation(vars: ReactivateEvaluationVariables): MutationPromise<ReactivateEvaluationData, ReactivateEvaluationVariables>;

interface ReactivateEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateEvaluationVariables): MutationRef<ReactivateEvaluationData, ReactivateEvaluationVariables>;
}
export const reactivateEvaluationRef: ReactivateEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateEvaluation(dc: DataConnect, vars: ReactivateEvaluationVariables): MutationPromise<ReactivateEvaluationData, ReactivateEvaluationVariables>;

interface ReactivateEvaluationRef {
  ...
  (dc: DataConnect, vars: ReactivateEvaluationVariables): MutationRef<ReactivateEvaluationData, ReactivateEvaluationVariables>;
}
export const reactivateEvaluationRef: ReactivateEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateEvaluationRef:
```typescript
const name = reactivateEvaluationRef.operationName;
console.log(name);
```

### Variables
The `ReactivateEvaluation` mutation requires an argument of type `ReactivateEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateEvaluationVariables {
  evaluationId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateEvaluationData {
  evaluation_update?: Evaluation_Key | null;
}
```
### Using `ReactivateEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateEvaluation, ReactivateEvaluationVariables } from '@dataconnect/generated';

// The `ReactivateEvaluation` mutation requires an argument of type `ReactivateEvaluationVariables`:
const reactivateEvaluationVars: ReactivateEvaluationVariables = {
  evaluationId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateEvaluation(reactivateEvaluationVars);
// Variables can be defined inline as well.
const { data } = await reactivateEvaluation({ evaluationId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateEvaluation(dataConnect, reactivateEvaluationVars);

console.log(data.evaluation_update);

// Or, you can use the `Promise` API.
reactivateEvaluation(reactivateEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.evaluation_update);
});
```

### Using `ReactivateEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateEvaluationRef, ReactivateEvaluationVariables } from '@dataconnect/generated';

// The `ReactivateEvaluation` mutation requires an argument of type `ReactivateEvaluationVariables`:
const reactivateEvaluationVars: ReactivateEvaluationVariables = {
  evaluationId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateEvaluationRef()` function to get a reference to the mutation.
const ref = reactivateEvaluationRef(reactivateEvaluationVars);
// Variables can be defined inline as well.
const ref = reactivateEvaluationRef({ evaluationId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateEvaluationRef(dataConnect, reactivateEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.evaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluation_update);
});
```

## AddQuestionToEvaluation
You can execute the `AddQuestionToEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addQuestionToEvaluation(vars: AddQuestionToEvaluationVariables): MutationPromise<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;

interface AddQuestionToEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddQuestionToEvaluationVariables): MutationRef<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;
}
export const addQuestionToEvaluationRef: AddQuestionToEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addQuestionToEvaluation(dc: DataConnect, vars: AddQuestionToEvaluationVariables): MutationPromise<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;

interface AddQuestionToEvaluationRef {
  ...
  (dc: DataConnect, vars: AddQuestionToEvaluationVariables): MutationRef<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;
}
export const addQuestionToEvaluationRef: AddQuestionToEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addQuestionToEvaluationRef:
```typescript
const name = addQuestionToEvaluationRef.operationName;
console.log(name);
```

### Variables
The `AddQuestionToEvaluation` mutation requires an argument of type `AddQuestionToEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddQuestionToEvaluationVariables {
  evaluationQuestionId: UUIDString;
  evaluationId: UUIDString;
  questionId: UUIDString;
  points: number;
  position: number;
}
```
### Return Type
Recall that executing the `AddQuestionToEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddQuestionToEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddQuestionToEvaluationData {
  evaluationQuestion_insert: EvaluationQuestion_Key;
}
```
### Using `AddQuestionToEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addQuestionToEvaluation, AddQuestionToEvaluationVariables } from '@dataconnect/generated';

// The `AddQuestionToEvaluation` mutation requires an argument of type `AddQuestionToEvaluationVariables`:
const addQuestionToEvaluationVars: AddQuestionToEvaluationVariables = {
  evaluationQuestionId: ..., 
  evaluationId: ..., 
  questionId: ..., 
  points: ..., 
  position: ..., 
};

// Call the `addQuestionToEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addQuestionToEvaluation(addQuestionToEvaluationVars);
// Variables can be defined inline as well.
const { data } = await addQuestionToEvaluation({ evaluationQuestionId: ..., evaluationId: ..., questionId: ..., points: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addQuestionToEvaluation(dataConnect, addQuestionToEvaluationVars);

console.log(data.evaluationQuestion_insert);

// Or, you can use the `Promise` API.
addQuestionToEvaluation(addQuestionToEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.evaluationQuestion_insert);
});
```

### Using `AddQuestionToEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addQuestionToEvaluationRef, AddQuestionToEvaluationVariables } from '@dataconnect/generated';

// The `AddQuestionToEvaluation` mutation requires an argument of type `AddQuestionToEvaluationVariables`:
const addQuestionToEvaluationVars: AddQuestionToEvaluationVariables = {
  evaluationQuestionId: ..., 
  evaluationId: ..., 
  questionId: ..., 
  points: ..., 
  position: ..., 
};

// Call the `addQuestionToEvaluationRef()` function to get a reference to the mutation.
const ref = addQuestionToEvaluationRef(addQuestionToEvaluationVars);
// Variables can be defined inline as well.
const ref = addQuestionToEvaluationRef({ evaluationQuestionId: ..., evaluationId: ..., questionId: ..., points: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addQuestionToEvaluationRef(dataConnect, addQuestionToEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.evaluationQuestion_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluationQuestion_insert);
});
```

## UpdateEvaluationQuestion
You can execute the `UpdateEvaluationQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEvaluationQuestion(vars: UpdateEvaluationQuestionVariables): MutationPromise<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;

interface UpdateEvaluationQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEvaluationQuestionVariables): MutationRef<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;
}
export const updateEvaluationQuestionRef: UpdateEvaluationQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEvaluationQuestion(dc: DataConnect, vars: UpdateEvaluationQuestionVariables): MutationPromise<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;

interface UpdateEvaluationQuestionRef {
  ...
  (dc: DataConnect, vars: UpdateEvaluationQuestionVariables): MutationRef<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;
}
export const updateEvaluationQuestionRef: UpdateEvaluationQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEvaluationQuestionRef:
```typescript
const name = updateEvaluationQuestionRef.operationName;
console.log(name);
```

### Variables
The `UpdateEvaluationQuestion` mutation requires an argument of type `UpdateEvaluationQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEvaluationQuestionVariables {
  evaluationQuestionId: UUIDString;
  points?: number | null;
  position?: number | null;
}
```
### Return Type
Recall that executing the `UpdateEvaluationQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEvaluationQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEvaluationQuestionData {
  evaluationQuestion_update?: EvaluationQuestion_Key | null;
}
```
### Using `UpdateEvaluationQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEvaluationQuestion, UpdateEvaluationQuestionVariables } from '@dataconnect/generated';

// The `UpdateEvaluationQuestion` mutation requires an argument of type `UpdateEvaluationQuestionVariables`:
const updateEvaluationQuestionVars: UpdateEvaluationQuestionVariables = {
  evaluationQuestionId: ..., 
  points: ..., // optional
  position: ..., // optional
};

// Call the `updateEvaluationQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEvaluationQuestion(updateEvaluationQuestionVars);
// Variables can be defined inline as well.
const { data } = await updateEvaluationQuestion({ evaluationQuestionId: ..., points: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEvaluationQuestion(dataConnect, updateEvaluationQuestionVars);

console.log(data.evaluationQuestion_update);

// Or, you can use the `Promise` API.
updateEvaluationQuestion(updateEvaluationQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.evaluationQuestion_update);
});
```

### Using `UpdateEvaluationQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEvaluationQuestionRef, UpdateEvaluationQuestionVariables } from '@dataconnect/generated';

// The `UpdateEvaluationQuestion` mutation requires an argument of type `UpdateEvaluationQuestionVariables`:
const updateEvaluationQuestionVars: UpdateEvaluationQuestionVariables = {
  evaluationQuestionId: ..., 
  points: ..., // optional
  position: ..., // optional
};

// Call the `updateEvaluationQuestionRef()` function to get a reference to the mutation.
const ref = updateEvaluationQuestionRef(updateEvaluationQuestionVars);
// Variables can be defined inline as well.
const ref = updateEvaluationQuestionRef({ evaluationQuestionId: ..., points: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEvaluationQuestionRef(dataConnect, updateEvaluationQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.evaluationQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluationQuestion_update);
});
```

## RemoveQuestionFromEvaluation
You can execute the `RemoveQuestionFromEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeQuestionFromEvaluation(vars: RemoveQuestionFromEvaluationVariables): MutationPromise<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;

interface RemoveQuestionFromEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveQuestionFromEvaluationVariables): MutationRef<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;
}
export const removeQuestionFromEvaluationRef: RemoveQuestionFromEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeQuestionFromEvaluation(dc: DataConnect, vars: RemoveQuestionFromEvaluationVariables): MutationPromise<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;

interface RemoveQuestionFromEvaluationRef {
  ...
  (dc: DataConnect, vars: RemoveQuestionFromEvaluationVariables): MutationRef<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;
}
export const removeQuestionFromEvaluationRef: RemoveQuestionFromEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeQuestionFromEvaluationRef:
```typescript
const name = removeQuestionFromEvaluationRef.operationName;
console.log(name);
```

### Variables
The `RemoveQuestionFromEvaluation` mutation requires an argument of type `RemoveQuestionFromEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveQuestionFromEvaluationVariables {
  evaluationQuestionId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveQuestionFromEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveQuestionFromEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveQuestionFromEvaluationData {
  evaluationQuestion_delete?: EvaluationQuestion_Key | null;
}
```
### Using `RemoveQuestionFromEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeQuestionFromEvaluation, RemoveQuestionFromEvaluationVariables } from '@dataconnect/generated';

// The `RemoveQuestionFromEvaluation` mutation requires an argument of type `RemoveQuestionFromEvaluationVariables`:
const removeQuestionFromEvaluationVars: RemoveQuestionFromEvaluationVariables = {
  evaluationQuestionId: ..., 
};

// Call the `removeQuestionFromEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeQuestionFromEvaluation(removeQuestionFromEvaluationVars);
// Variables can be defined inline as well.
const { data } = await removeQuestionFromEvaluation({ evaluationQuestionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeQuestionFromEvaluation(dataConnect, removeQuestionFromEvaluationVars);

console.log(data.evaluationQuestion_delete);

// Or, you can use the `Promise` API.
removeQuestionFromEvaluation(removeQuestionFromEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.evaluationQuestion_delete);
});
```

### Using `RemoveQuestionFromEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeQuestionFromEvaluationRef, RemoveQuestionFromEvaluationVariables } from '@dataconnect/generated';

// The `RemoveQuestionFromEvaluation` mutation requires an argument of type `RemoveQuestionFromEvaluationVariables`:
const removeQuestionFromEvaluationVars: RemoveQuestionFromEvaluationVariables = {
  evaluationQuestionId: ..., 
};

// Call the `removeQuestionFromEvaluationRef()` function to get a reference to the mutation.
const ref = removeQuestionFromEvaluationRef(removeQuestionFromEvaluationVars);
// Variables can be defined inline as well.
const ref = removeQuestionFromEvaluationRef({ evaluationQuestionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeQuestionFromEvaluationRef(dataConnect, removeQuestionFromEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.evaluationQuestion_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.evaluationQuestion_delete);
});
```

## AssignEvaluationToCourse
You can execute the `AssignEvaluationToCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
assignEvaluationToCourse(vars: AssignEvaluationToCourseVariables): MutationPromise<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;

interface AssignEvaluationToCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignEvaluationToCourseVariables): MutationRef<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;
}
export const assignEvaluationToCourseRef: AssignEvaluationToCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignEvaluationToCourse(dc: DataConnect, vars: AssignEvaluationToCourseVariables): MutationPromise<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;

interface AssignEvaluationToCourseRef {
  ...
  (dc: DataConnect, vars: AssignEvaluationToCourseVariables): MutationRef<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;
}
export const assignEvaluationToCourseRef: AssignEvaluationToCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignEvaluationToCourseRef:
```typescript
const name = assignEvaluationToCourseRef.operationName;
console.log(name);
```

### Variables
The `AssignEvaluationToCourse` mutation requires an argument of type `AssignEvaluationToCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignEvaluationToCourseVariables {
  courseEvaluationId: UUIDString;
  courseId: UUIDString;
  evaluationId: UUIDString;
  scheduledDate: DateString;
  durationMinutes: number;
  createdBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `AssignEvaluationToCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignEvaluationToCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignEvaluationToCourseData {
  courseEvaluation_insert: CourseEvaluation_Key;
}
```
### Using `AssignEvaluationToCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignEvaluationToCourse, AssignEvaluationToCourseVariables } from '@dataconnect/generated';

// The `AssignEvaluationToCourse` mutation requires an argument of type `AssignEvaluationToCourseVariables`:
const assignEvaluationToCourseVars: AssignEvaluationToCourseVariables = {
  courseEvaluationId: ..., 
  courseId: ..., 
  evaluationId: ..., 
  scheduledDate: ..., 
  durationMinutes: ..., 
  createdBy: ..., 
  firebaseId: ..., 
};

// Call the `assignEvaluationToCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignEvaluationToCourse(assignEvaluationToCourseVars);
// Variables can be defined inline as well.
const { data } = await assignEvaluationToCourse({ courseEvaluationId: ..., courseId: ..., evaluationId: ..., scheduledDate: ..., durationMinutes: ..., createdBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignEvaluationToCourse(dataConnect, assignEvaluationToCourseVars);

console.log(data.courseEvaluation_insert);

// Or, you can use the `Promise` API.
assignEvaluationToCourse(assignEvaluationToCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluation_insert);
});
```

### Using `AssignEvaluationToCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignEvaluationToCourseRef, AssignEvaluationToCourseVariables } from '@dataconnect/generated';

// The `AssignEvaluationToCourse` mutation requires an argument of type `AssignEvaluationToCourseVariables`:
const assignEvaluationToCourseVars: AssignEvaluationToCourseVariables = {
  courseEvaluationId: ..., 
  courseId: ..., 
  evaluationId: ..., 
  scheduledDate: ..., 
  durationMinutes: ..., 
  createdBy: ..., 
  firebaseId: ..., 
};

// Call the `assignEvaluationToCourseRef()` function to get a reference to the mutation.
const ref = assignEvaluationToCourseRef(assignEvaluationToCourseVars);
// Variables can be defined inline as well.
const ref = assignEvaluationToCourseRef({ courseEvaluationId: ..., courseId: ..., evaluationId: ..., scheduledDate: ..., durationMinutes: ..., createdBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignEvaluationToCourseRef(dataConnect, assignEvaluationToCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseEvaluation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluation_insert);
});
```

## RemoveEvaluationFromCourse
You can execute the `RemoveEvaluationFromCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeEvaluationFromCourse(vars: RemoveEvaluationFromCourseVariables): MutationPromise<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;

interface RemoveEvaluationFromCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveEvaluationFromCourseVariables): MutationRef<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;
}
export const removeEvaluationFromCourseRef: RemoveEvaluationFromCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeEvaluationFromCourse(dc: DataConnect, vars: RemoveEvaluationFromCourseVariables): MutationPromise<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;

interface RemoveEvaluationFromCourseRef {
  ...
  (dc: DataConnect, vars: RemoveEvaluationFromCourseVariables): MutationRef<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;
}
export const removeEvaluationFromCourseRef: RemoveEvaluationFromCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeEvaluationFromCourseRef:
```typescript
const name = removeEvaluationFromCourseRef.operationName;
console.log(name);
```

### Variables
The `RemoveEvaluationFromCourse` mutation requires an argument of type `RemoveEvaluationFromCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveEvaluationFromCourseVariables {
  courseEvaluationId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `RemoveEvaluationFromCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveEvaluationFromCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveEvaluationFromCourseData {
  courseEvaluation_delete?: CourseEvaluation_Key | null;
}
```
### Using `RemoveEvaluationFromCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeEvaluationFromCourse, RemoveEvaluationFromCourseVariables } from '@dataconnect/generated';

// The `RemoveEvaluationFromCourse` mutation requires an argument of type `RemoveEvaluationFromCourseVariables`:
const removeEvaluationFromCourseVars: RemoveEvaluationFromCourseVariables = {
  courseEvaluationId: ..., 
  firebaseId: ..., 
};

// Call the `removeEvaluationFromCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeEvaluationFromCourse(removeEvaluationFromCourseVars);
// Variables can be defined inline as well.
const { data } = await removeEvaluationFromCourse({ courseEvaluationId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeEvaluationFromCourse(dataConnect, removeEvaluationFromCourseVars);

console.log(data.courseEvaluation_delete);

// Or, you can use the `Promise` API.
removeEvaluationFromCourse(removeEvaluationFromCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluation_delete);
});
```

### Using `RemoveEvaluationFromCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeEvaluationFromCourseRef, RemoveEvaluationFromCourseVariables } from '@dataconnect/generated';

// The `RemoveEvaluationFromCourse` mutation requires an argument of type `RemoveEvaluationFromCourseVariables`:
const removeEvaluationFromCourseVars: RemoveEvaluationFromCourseVariables = {
  courseEvaluationId: ..., 
  firebaseId: ..., 
};

// Call the `removeEvaluationFromCourseRef()` function to get a reference to the mutation.
const ref = removeEvaluationFromCourseRef(removeEvaluationFromCourseVars);
// Variables can be defined inline as well.
const ref = removeEvaluationFromCourseRef({ courseEvaluationId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeEvaluationFromCourseRef(dataConnect, removeEvaluationFromCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseEvaluation_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluation_delete);
});
```

## UpdateCourseEvaluationAccessCode
You can execute the `UpdateCourseEvaluationAccessCode` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCourseEvaluationAccessCode(vars: UpdateCourseEvaluationAccessCodeVariables): MutationPromise<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;

interface UpdateCourseEvaluationAccessCodeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseEvaluationAccessCodeVariables): MutationRef<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;
}
export const updateCourseEvaluationAccessCodeRef: UpdateCourseEvaluationAccessCodeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCourseEvaluationAccessCode(dc: DataConnect, vars: UpdateCourseEvaluationAccessCodeVariables): MutationPromise<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;

interface UpdateCourseEvaluationAccessCodeRef {
  ...
  (dc: DataConnect, vars: UpdateCourseEvaluationAccessCodeVariables): MutationRef<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;
}
export const updateCourseEvaluationAccessCodeRef: UpdateCourseEvaluationAccessCodeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCourseEvaluationAccessCodeRef:
```typescript
const name = updateCourseEvaluationAccessCodeRef.operationName;
console.log(name);
```

### Variables
The `UpdateCourseEvaluationAccessCode` mutation requires an argument of type `UpdateCourseEvaluationAccessCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCourseEvaluationAccessCodeVariables {
  courseEvaluationId: UUIDString;
  accessCode: string;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `UpdateCourseEvaluationAccessCode` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCourseEvaluationAccessCodeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCourseEvaluationAccessCodeData {
  courseEvaluation_update?: CourseEvaluation_Key | null;
}
```
### Using `UpdateCourseEvaluationAccessCode`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCourseEvaluationAccessCode, UpdateCourseEvaluationAccessCodeVariables } from '@dataconnect/generated';

// The `UpdateCourseEvaluationAccessCode` mutation requires an argument of type `UpdateCourseEvaluationAccessCodeVariables`:
const updateCourseEvaluationAccessCodeVars: UpdateCourseEvaluationAccessCodeVariables = {
  courseEvaluationId: ..., 
  accessCode: ..., 
  firebaseId: ..., 
};

// Call the `updateCourseEvaluationAccessCode()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCourseEvaluationAccessCode(updateCourseEvaluationAccessCodeVars);
// Variables can be defined inline as well.
const { data } = await updateCourseEvaluationAccessCode({ courseEvaluationId: ..., accessCode: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCourseEvaluationAccessCode(dataConnect, updateCourseEvaluationAccessCodeVars);

console.log(data.courseEvaluation_update);

// Or, you can use the `Promise` API.
updateCourseEvaluationAccessCode(updateCourseEvaluationAccessCodeVars).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluation_update);
});
```

### Using `UpdateCourseEvaluationAccessCode`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCourseEvaluationAccessCodeRef, UpdateCourseEvaluationAccessCodeVariables } from '@dataconnect/generated';

// The `UpdateCourseEvaluationAccessCode` mutation requires an argument of type `UpdateCourseEvaluationAccessCodeVariables`:
const updateCourseEvaluationAccessCodeVars: UpdateCourseEvaluationAccessCodeVariables = {
  courseEvaluationId: ..., 
  accessCode: ..., 
  firebaseId: ..., 
};

// Call the `updateCourseEvaluationAccessCodeRef()` function to get a reference to the mutation.
const ref = updateCourseEvaluationAccessCodeRef(updateCourseEvaluationAccessCodeVars);
// Variables can be defined inline as well.
const ref = updateCourseEvaluationAccessCodeRef({ courseEvaluationId: ..., accessCode: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCourseEvaluationAccessCodeRef(dataConnect, updateCourseEvaluationAccessCodeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseEvaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseEvaluation_update);
});
```

## CreateStudent
You can execute the `CreateStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStudent(vars: CreateStudentVariables): MutationPromise<CreateStudentData, CreateStudentVariables>;

interface CreateStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudentVariables): MutationRef<CreateStudentData, CreateStudentVariables>;
}
export const createStudentRef: CreateStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStudent(dc: DataConnect, vars: CreateStudentVariables): MutationPromise<CreateStudentData, CreateStudentVariables>;

interface CreateStudentRef {
  ...
  (dc: DataConnect, vars: CreateStudentVariables): MutationRef<CreateStudentData, CreateStudentVariables>;
}
export const createStudentRef: CreateStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStudentRef:
```typescript
const name = createStudentRef.operationName;
console.log(name);
```

### Variables
The `CreateStudent` mutation requires an argument of type `CreateStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStudentVariables {
  studentId: UUIDString;
  firstName: string;
  lastName: string;
  identifier: string;
  email: string;
  createdBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `CreateStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStudentData {
  student_insert: Student_Key;
}
```
### Using `CreateStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStudent, CreateStudentVariables } from '@dataconnect/generated';

// The `CreateStudent` mutation requires an argument of type `CreateStudentVariables`:
const createStudentVars: CreateStudentVariables = {
  studentId: ..., 
  firstName: ..., 
  lastName: ..., 
  identifier: ..., 
  email: ..., 
  createdBy: ..., 
  firebaseId: ..., 
};

// Call the `createStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStudent(createStudentVars);
// Variables can be defined inline as well.
const { data } = await createStudent({ studentId: ..., firstName: ..., lastName: ..., identifier: ..., email: ..., createdBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStudent(dataConnect, createStudentVars);

console.log(data.student_insert);

// Or, you can use the `Promise` API.
createStudent(createStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_insert);
});
```

### Using `CreateStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStudentRef, CreateStudentVariables } from '@dataconnect/generated';

// The `CreateStudent` mutation requires an argument of type `CreateStudentVariables`:
const createStudentVars: CreateStudentVariables = {
  studentId: ..., 
  firstName: ..., 
  lastName: ..., 
  identifier: ..., 
  email: ..., 
  createdBy: ..., 
  firebaseId: ..., 
};

// Call the `createStudentRef()` function to get a reference to the mutation.
const ref = createStudentRef(createStudentVars);
// Variables can be defined inline as well.
const ref = createStudentRef({ studentId: ..., firstName: ..., lastName: ..., identifier: ..., email: ..., createdBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStudentRef(dataConnect, createStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_insert);
});
```

## UpdateStudent
You can execute the `UpdateStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStudent(vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface UpdateStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
}
export const updateStudentRef: UpdateStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStudent(dc: DataConnect, vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface UpdateStudentRef {
  ...
  (dc: DataConnect, vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
}
export const updateStudentRef: UpdateStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStudentRef:
```typescript
const name = updateStudentRef.operationName;
console.log(name);
```

### Variables
The `UpdateStudent` mutation requires an argument of type `UpdateStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStudentData {
  student_update?: Student_Key | null;
}
```
### Using `UpdateStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStudent, UpdateStudentVariables } from '@dataconnect/generated';

// The `UpdateStudent` mutation requires an argument of type `UpdateStudentVariables`:
const updateStudentVars: UpdateStudentVariables = {
  studentId: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  identifier: ..., // optional
  email: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStudent(updateStudentVars);
// Variables can be defined inline as well.
const { data } = await updateStudent({ studentId: ..., firstName: ..., lastName: ..., identifier: ..., email: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStudent(dataConnect, updateStudentVars);

console.log(data.student_update);

// Or, you can use the `Promise` API.
updateStudent(updateStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

### Using `UpdateStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStudentRef, UpdateStudentVariables } from '@dataconnect/generated';

// The `UpdateStudent` mutation requires an argument of type `UpdateStudentVariables`:
const updateStudentVars: UpdateStudentVariables = {
  studentId: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  identifier: ..., // optional
  email: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateStudentRef()` function to get a reference to the mutation.
const ref = updateStudentRef(updateStudentVars);
// Variables can be defined inline as well.
const ref = updateStudentRef({ studentId: ..., firstName: ..., lastName: ..., identifier: ..., email: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStudentRef(dataConnect, updateStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

## DeactivateStudent
You can execute the `DeactivateStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateStudent(vars: DeactivateStudentVariables): MutationPromise<DeactivateStudentData, DeactivateStudentVariables>;

interface DeactivateStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateStudentVariables): MutationRef<DeactivateStudentData, DeactivateStudentVariables>;
}
export const deactivateStudentRef: DeactivateStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateStudent(dc: DataConnect, vars: DeactivateStudentVariables): MutationPromise<DeactivateStudentData, DeactivateStudentVariables>;

interface DeactivateStudentRef {
  ...
  (dc: DataConnect, vars: DeactivateStudentVariables): MutationRef<DeactivateStudentData, DeactivateStudentVariables>;
}
export const deactivateStudentRef: DeactivateStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateStudentRef:
```typescript
const name = deactivateStudentRef.operationName;
console.log(name);
```

### Variables
The `DeactivateStudent` mutation requires an argument of type `DeactivateStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateStudentVariables {
  studentId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `DeactivateStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateStudentData {
  student_update?: Student_Key | null;
}
```
### Using `DeactivateStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateStudent, DeactivateStudentVariables } from '@dataconnect/generated';

// The `DeactivateStudent` mutation requires an argument of type `DeactivateStudentVariables`:
const deactivateStudentVars: DeactivateStudentVariables = {
  studentId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateStudent(deactivateStudentVars);
// Variables can be defined inline as well.
const { data } = await deactivateStudent({ studentId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateStudent(dataConnect, deactivateStudentVars);

console.log(data.student_update);

// Or, you can use the `Promise` API.
deactivateStudent(deactivateStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

### Using `DeactivateStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateStudentRef, DeactivateStudentVariables } from '@dataconnect/generated';

// The `DeactivateStudent` mutation requires an argument of type `DeactivateStudentVariables`:
const deactivateStudentVars: DeactivateStudentVariables = {
  studentId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `deactivateStudentRef()` function to get a reference to the mutation.
const ref = deactivateStudentRef(deactivateStudentVars);
// Variables can be defined inline as well.
const ref = deactivateStudentRef({ studentId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateStudentRef(dataConnect, deactivateStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

## ReactivateStudent
You can execute the `ReactivateStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reactivateStudent(vars: ReactivateStudentVariables): MutationPromise<ReactivateStudentData, ReactivateStudentVariables>;

interface ReactivateStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReactivateStudentVariables): MutationRef<ReactivateStudentData, ReactivateStudentVariables>;
}
export const reactivateStudentRef: ReactivateStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reactivateStudent(dc: DataConnect, vars: ReactivateStudentVariables): MutationPromise<ReactivateStudentData, ReactivateStudentVariables>;

interface ReactivateStudentRef {
  ...
  (dc: DataConnect, vars: ReactivateStudentVariables): MutationRef<ReactivateStudentData, ReactivateStudentVariables>;
}
export const reactivateStudentRef: ReactivateStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reactivateStudentRef:
```typescript
const name = reactivateStudentRef.operationName;
console.log(name);
```

### Variables
The `ReactivateStudent` mutation requires an argument of type `ReactivateStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReactivateStudentVariables {
  studentId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReactivateStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReactivateStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReactivateStudentData {
  student_update?: Student_Key | null;
}
```
### Using `ReactivateStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reactivateStudent, ReactivateStudentVariables } from '@dataconnect/generated';

// The `ReactivateStudent` mutation requires an argument of type `ReactivateStudentVariables`:
const reactivateStudentVars: ReactivateStudentVariables = {
  studentId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateStudent(reactivateStudentVars);
// Variables can be defined inline as well.
const { data } = await reactivateStudent({ studentId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reactivateStudent(dataConnect, reactivateStudentVars);

console.log(data.student_update);

// Or, you can use the `Promise` API.
reactivateStudent(reactivateStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

### Using `ReactivateStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reactivateStudentRef, ReactivateStudentVariables } from '@dataconnect/generated';

// The `ReactivateStudent` mutation requires an argument of type `ReactivateStudentVariables`:
const reactivateStudentVars: ReactivateStudentVariables = {
  studentId: ..., 
  firebaseId: ..., 
};

// Call the `reactivateStudentRef()` function to get a reference to the mutation.
const ref = reactivateStudentRef(reactivateStudentVars);
// Variables can be defined inline as well.
const ref = reactivateStudentRef({ studentId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reactivateStudentRef(dataConnect, reactivateStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

## EnrollStudentInCourse
You can execute the `EnrollStudentInCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
enrollStudentInCourse(vars: EnrollStudentInCourseVariables): MutationPromise<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;

interface EnrollStudentInCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollStudentInCourseVariables): MutationRef<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;
}
export const enrollStudentInCourseRef: EnrollStudentInCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
enrollStudentInCourse(dc: DataConnect, vars: EnrollStudentInCourseVariables): MutationPromise<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;

interface EnrollStudentInCourseRef {
  ...
  (dc: DataConnect, vars: EnrollStudentInCourseVariables): MutationRef<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;
}
export const enrollStudentInCourseRef: EnrollStudentInCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the enrollStudentInCourseRef:
```typescript
const name = enrollStudentInCourseRef.operationName;
console.log(name);
```

### Variables
The `EnrollStudentInCourse` mutation requires an argument of type `EnrollStudentInCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EnrollStudentInCourseVariables {
  courseStudentId: UUIDString;
  courseId: UUIDString;
  studentId: UUIDString;
  enrolledOn: DateString;
  createdBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `EnrollStudentInCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EnrollStudentInCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EnrollStudentInCourseData {
  courseStudent_insert: CourseStudent_Key;
}
```
### Using `EnrollStudentInCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, enrollStudentInCourse, EnrollStudentInCourseVariables } from '@dataconnect/generated';

// The `EnrollStudentInCourse` mutation requires an argument of type `EnrollStudentInCourseVariables`:
const enrollStudentInCourseVars: EnrollStudentInCourseVariables = {
  courseStudentId: ..., 
  courseId: ..., 
  studentId: ..., 
  enrolledOn: ..., 
  createdBy: ..., 
  firebaseId: ..., 
};

// Call the `enrollStudentInCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await enrollStudentInCourse(enrollStudentInCourseVars);
// Variables can be defined inline as well.
const { data } = await enrollStudentInCourse({ courseStudentId: ..., courseId: ..., studentId: ..., enrolledOn: ..., createdBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await enrollStudentInCourse(dataConnect, enrollStudentInCourseVars);

console.log(data.courseStudent_insert);

// Or, you can use the `Promise` API.
enrollStudentInCourse(enrollStudentInCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courseStudent_insert);
});
```

### Using `EnrollStudentInCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, enrollStudentInCourseRef, EnrollStudentInCourseVariables } from '@dataconnect/generated';

// The `EnrollStudentInCourse` mutation requires an argument of type `EnrollStudentInCourseVariables`:
const enrollStudentInCourseVars: EnrollStudentInCourseVariables = {
  courseStudentId: ..., 
  courseId: ..., 
  studentId: ..., 
  enrolledOn: ..., 
  createdBy: ..., 
  firebaseId: ..., 
};

// Call the `enrollStudentInCourseRef()` function to get a reference to the mutation.
const ref = enrollStudentInCourseRef(enrollStudentInCourseVars);
// Variables can be defined inline as well.
const ref = enrollStudentInCourseRef({ courseStudentId: ..., courseId: ..., studentId: ..., enrolledOn: ..., createdBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = enrollStudentInCourseRef(dataConnect, enrollStudentInCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseStudent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseStudent_insert);
});
```

## UpdateCourseStudent
You can execute the `UpdateCourseStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCourseStudent(vars: UpdateCourseStudentVariables): MutationPromise<UpdateCourseStudentData, UpdateCourseStudentVariables>;

interface UpdateCourseStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseStudentVariables): MutationRef<UpdateCourseStudentData, UpdateCourseStudentVariables>;
}
export const updateCourseStudentRef: UpdateCourseStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCourseStudent(dc: DataConnect, vars: UpdateCourseStudentVariables): MutationPromise<UpdateCourseStudentData, UpdateCourseStudentVariables>;

interface UpdateCourseStudentRef {
  ...
  (dc: DataConnect, vars: UpdateCourseStudentVariables): MutationRef<UpdateCourseStudentData, UpdateCourseStudentVariables>;
}
export const updateCourseStudentRef: UpdateCourseStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCourseStudentRef:
```typescript
const name = updateCourseStudentRef.operationName;
console.log(name);
```

### Variables
The `UpdateCourseStudent` mutation requires an argument of type `UpdateCourseStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCourseStudentVariables {
  courseStudentId: UUIDString;
  enrolledOn?: DateString | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `UpdateCourseStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCourseStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCourseStudentData {
  courseStudent_update?: CourseStudent_Key | null;
}
```
### Using `UpdateCourseStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCourseStudent, UpdateCourseStudentVariables } from '@dataconnect/generated';

// The `UpdateCourseStudent` mutation requires an argument of type `UpdateCourseStudentVariables`:
const updateCourseStudentVars: UpdateCourseStudentVariables = {
  courseStudentId: ..., 
  enrolledOn: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateCourseStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCourseStudent(updateCourseStudentVars);
// Variables can be defined inline as well.
const { data } = await updateCourseStudent({ courseStudentId: ..., enrolledOn: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCourseStudent(dataConnect, updateCourseStudentVars);

console.log(data.courseStudent_update);

// Or, you can use the `Promise` API.
updateCourseStudent(updateCourseStudentVars).then((response) => {
  const data = response.data;
  console.log(data.courseStudent_update);
});
```

### Using `UpdateCourseStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCourseStudentRef, UpdateCourseStudentVariables } from '@dataconnect/generated';

// The `UpdateCourseStudent` mutation requires an argument of type `UpdateCourseStudentVariables`:
const updateCourseStudentVars: UpdateCourseStudentVariables = {
  courseStudentId: ..., 
  enrolledOn: ..., // optional
  updatedBy: ..., 
  updatedAt: ..., 
  firebaseId: ..., 
};

// Call the `updateCourseStudentRef()` function to get a reference to the mutation.
const ref = updateCourseStudentRef(updateCourseStudentVars);
// Variables can be defined inline as well.
const ref = updateCourseStudentRef({ courseStudentId: ..., enrolledOn: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCourseStudentRef(dataConnect, updateCourseStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseStudent_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseStudent_update);
});
```

## UnenrollStudentFromCourse
You can execute the `UnenrollStudentFromCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
unenrollStudentFromCourse(vars: UnenrollStudentFromCourseVariables): MutationPromise<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;

interface UnenrollStudentFromCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UnenrollStudentFromCourseVariables): MutationRef<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;
}
export const unenrollStudentFromCourseRef: UnenrollStudentFromCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
unenrollStudentFromCourse(dc: DataConnect, vars: UnenrollStudentFromCourseVariables): MutationPromise<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;

interface UnenrollStudentFromCourseRef {
  ...
  (dc: DataConnect, vars: UnenrollStudentFromCourseVariables): MutationRef<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;
}
export const unenrollStudentFromCourseRef: UnenrollStudentFromCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the unenrollStudentFromCourseRef:
```typescript
const name = unenrollStudentFromCourseRef.operationName;
console.log(name);
```

### Variables
The `UnenrollStudentFromCourse` mutation requires an argument of type `UnenrollStudentFromCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UnenrollStudentFromCourseVariables {
  courseStudentId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `UnenrollStudentFromCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UnenrollStudentFromCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UnenrollStudentFromCourseData {
  courseStudent_update?: CourseStudent_Key | null;
}
```
### Using `UnenrollStudentFromCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, unenrollStudentFromCourse, UnenrollStudentFromCourseVariables } from '@dataconnect/generated';

// The `UnenrollStudentFromCourse` mutation requires an argument of type `UnenrollStudentFromCourseVariables`:
const unenrollStudentFromCourseVars: UnenrollStudentFromCourseVariables = {
  courseStudentId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `unenrollStudentFromCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await unenrollStudentFromCourse(unenrollStudentFromCourseVars);
// Variables can be defined inline as well.
const { data } = await unenrollStudentFromCourse({ courseStudentId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await unenrollStudentFromCourse(dataConnect, unenrollStudentFromCourseVars);

console.log(data.courseStudent_update);

// Or, you can use the `Promise` API.
unenrollStudentFromCourse(unenrollStudentFromCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courseStudent_update);
});
```

### Using `UnenrollStudentFromCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, unenrollStudentFromCourseRef, UnenrollStudentFromCourseVariables } from '@dataconnect/generated';

// The `UnenrollStudentFromCourse` mutation requires an argument of type `UnenrollStudentFromCourseVariables`:
const unenrollStudentFromCourseVars: UnenrollStudentFromCourseVariables = {
  courseStudentId: ..., 
  deletedAt: ..., 
  deletedBy: ..., 
  firebaseId: ..., 
};

// Call the `unenrollStudentFromCourseRef()` function to get a reference to the mutation.
const ref = unenrollStudentFromCourseRef(unenrollStudentFromCourseVars);
// Variables can be defined inline as well.
const ref = unenrollStudentFromCourseRef({ courseStudentId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = unenrollStudentFromCourseRef(dataConnect, unenrollStudentFromCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseStudent_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseStudent_update);
});
```

## ReenrollStudentInCourse
You can execute the `ReenrollStudentInCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reenrollStudentInCourse(vars: ReenrollStudentInCourseVariables): MutationPromise<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;

interface ReenrollStudentInCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReenrollStudentInCourseVariables): MutationRef<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;
}
export const reenrollStudentInCourseRef: ReenrollStudentInCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reenrollStudentInCourse(dc: DataConnect, vars: ReenrollStudentInCourseVariables): MutationPromise<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;

interface ReenrollStudentInCourseRef {
  ...
  (dc: DataConnect, vars: ReenrollStudentInCourseVariables): MutationRef<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;
}
export const reenrollStudentInCourseRef: ReenrollStudentInCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reenrollStudentInCourseRef:
```typescript
const name = reenrollStudentInCourseRef.operationName;
console.log(name);
```

### Variables
The `ReenrollStudentInCourse` mutation requires an argument of type `ReenrollStudentInCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReenrollStudentInCourseVariables {
  courseStudentId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that executing the `ReenrollStudentInCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReenrollStudentInCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReenrollStudentInCourseData {
  courseStudent_update?: CourseStudent_Key | null;
}
```
### Using `ReenrollStudentInCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reenrollStudentInCourse, ReenrollStudentInCourseVariables } from '@dataconnect/generated';

// The `ReenrollStudentInCourse` mutation requires an argument of type `ReenrollStudentInCourseVariables`:
const reenrollStudentInCourseVars: ReenrollStudentInCourseVariables = {
  courseStudentId: ..., 
  firebaseId: ..., 
};

// Call the `reenrollStudentInCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reenrollStudentInCourse(reenrollStudentInCourseVars);
// Variables can be defined inline as well.
const { data } = await reenrollStudentInCourse({ courseStudentId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reenrollStudentInCourse(dataConnect, reenrollStudentInCourseVars);

console.log(data.courseStudent_update);

// Or, you can use the `Promise` API.
reenrollStudentInCourse(reenrollStudentInCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courseStudent_update);
});
```

### Using `ReenrollStudentInCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reenrollStudentInCourseRef, ReenrollStudentInCourseVariables } from '@dataconnect/generated';

// The `ReenrollStudentInCourse` mutation requires an argument of type `ReenrollStudentInCourseVariables`:
const reenrollStudentInCourseVars: ReenrollStudentInCourseVariables = {
  courseStudentId: ..., 
  firebaseId: ..., 
};

// Call the `reenrollStudentInCourseRef()` function to get a reference to the mutation.
const ref = reenrollStudentInCourseRef(reenrollStudentInCourseVars);
// Variables can be defined inline as well.
const ref = reenrollStudentInCourseRef({ courseStudentId: ..., firebaseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reenrollStudentInCourseRef(dataConnect, reenrollStudentInCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseStudent_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseStudent_update);
});
```

## CreateStudentEvaluation
You can execute the `CreateStudentEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStudentEvaluation(vars: CreateStudentEvaluationVariables): MutationPromise<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;

interface CreateStudentEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudentEvaluationVariables): MutationRef<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;
}
export const createStudentEvaluationRef: CreateStudentEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStudentEvaluation(dc: DataConnect, vars: CreateStudentEvaluationVariables): MutationPromise<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;

interface CreateStudentEvaluationRef {
  ...
  (dc: DataConnect, vars: CreateStudentEvaluationVariables): MutationRef<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;
}
export const createStudentEvaluationRef: CreateStudentEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStudentEvaluationRef:
```typescript
const name = createStudentEvaluationRef.operationName;
console.log(name);
```

### Variables
The `CreateStudentEvaluation` mutation requires an argument of type `CreateStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
  courseEvaluationId: UUIDString;
  courseStudentId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateStudentEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStudentEvaluationData {
  studentCourseEvaluation_insert: StudentCourseEvaluation_Key;
}
```
### Using `CreateStudentEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStudentEvaluation, CreateStudentEvaluationVariables } from '@dataconnect/generated';

// The `CreateStudentEvaluation` mutation requires an argument of type `CreateStudentEvaluationVariables`:
const createStudentEvaluationVars: CreateStudentEvaluationVariables = {
  studentCourseEvaluationId: ..., 
  courseEvaluationId: ..., 
  courseStudentId: ..., 
};

// Call the `createStudentEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStudentEvaluation(createStudentEvaluationVars);
// Variables can be defined inline as well.
const { data } = await createStudentEvaluation({ studentCourseEvaluationId: ..., courseEvaluationId: ..., courseStudentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStudentEvaluation(dataConnect, createStudentEvaluationVars);

console.log(data.studentCourseEvaluation_insert);

// Or, you can use the `Promise` API.
createStudentEvaluation(createStudentEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_insert);
});
```

### Using `CreateStudentEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStudentEvaluationRef, CreateStudentEvaluationVariables } from '@dataconnect/generated';

// The `CreateStudentEvaluation` mutation requires an argument of type `CreateStudentEvaluationVariables`:
const createStudentEvaluationVars: CreateStudentEvaluationVariables = {
  studentCourseEvaluationId: ..., 
  courseEvaluationId: ..., 
  courseStudentId: ..., 
};

// Call the `createStudentEvaluationRef()` function to get a reference to the mutation.
const ref = createStudentEvaluationRef(createStudentEvaluationVars);
// Variables can be defined inline as well.
const ref = createStudentEvaluationRef({ studentCourseEvaluationId: ..., courseEvaluationId: ..., courseStudentId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStudentEvaluationRef(dataConnect, createStudentEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentCourseEvaluation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_insert);
});
```

## UpdateStudentEvaluationState
You can execute the `UpdateStudentEvaluationState` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStudentEvaluationState(vars: UpdateStudentEvaluationStateVariables): MutationPromise<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;

interface UpdateStudentEvaluationStateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentEvaluationStateVariables): MutationRef<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;
}
export const updateStudentEvaluationStateRef: UpdateStudentEvaluationStateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStudentEvaluationState(dc: DataConnect, vars: UpdateStudentEvaluationStateVariables): MutationPromise<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;

interface UpdateStudentEvaluationStateRef {
  ...
  (dc: DataConnect, vars: UpdateStudentEvaluationStateVariables): MutationRef<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;
}
export const updateStudentEvaluationStateRef: UpdateStudentEvaluationStateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStudentEvaluationStateRef:
```typescript
const name = updateStudentEvaluationStateRef.operationName;
console.log(name);
```

### Variables
The `UpdateStudentEvaluationState` mutation requires an argument of type `UpdateStudentEvaluationStateVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStudentEvaluationStateVariables {
  studentCourseEvaluationId: UUIDString;
  state: string;
}
```
### Return Type
Recall that executing the `UpdateStudentEvaluationState` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStudentEvaluationStateData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStudentEvaluationStateData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```
### Using `UpdateStudentEvaluationState`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStudentEvaluationState, UpdateStudentEvaluationStateVariables } from '@dataconnect/generated';

// The `UpdateStudentEvaluationState` mutation requires an argument of type `UpdateStudentEvaluationStateVariables`:
const updateStudentEvaluationStateVars: UpdateStudentEvaluationStateVariables = {
  studentCourseEvaluationId: ..., 
  state: ..., 
};

// Call the `updateStudentEvaluationState()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStudentEvaluationState(updateStudentEvaluationStateVars);
// Variables can be defined inline as well.
const { data } = await updateStudentEvaluationState({ studentCourseEvaluationId: ..., state: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStudentEvaluationState(dataConnect, updateStudentEvaluationStateVars);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
updateStudentEvaluationState(updateStudentEvaluationStateVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

### Using `UpdateStudentEvaluationState`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStudentEvaluationStateRef, UpdateStudentEvaluationStateVariables } from '@dataconnect/generated';

// The `UpdateStudentEvaluationState` mutation requires an argument of type `UpdateStudentEvaluationStateVariables`:
const updateStudentEvaluationStateVars: UpdateStudentEvaluationStateVariables = {
  studentCourseEvaluationId: ..., 
  state: ..., 
};

// Call the `updateStudentEvaluationStateRef()` function to get a reference to the mutation.
const ref = updateStudentEvaluationStateRef(updateStudentEvaluationStateVars);
// Variables can be defined inline as well.
const ref = updateStudentEvaluationStateRef({ studentCourseEvaluationId: ..., state: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStudentEvaluationStateRef(dataConnect, updateStudentEvaluationStateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

## StartStudentEvaluation
You can execute the `StartStudentEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
startStudentEvaluation(vars: StartStudentEvaluationVariables): MutationPromise<StartStudentEvaluationData, StartStudentEvaluationVariables>;

interface StartStudentEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartStudentEvaluationVariables): MutationRef<StartStudentEvaluationData, StartStudentEvaluationVariables>;
}
export const startStudentEvaluationRef: StartStudentEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
startStudentEvaluation(dc: DataConnect, vars: StartStudentEvaluationVariables): MutationPromise<StartStudentEvaluationData, StartStudentEvaluationVariables>;

interface StartStudentEvaluationRef {
  ...
  (dc: DataConnect, vars: StartStudentEvaluationVariables): MutationRef<StartStudentEvaluationData, StartStudentEvaluationVariables>;
}
export const startStudentEvaluationRef: StartStudentEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the startStudentEvaluationRef:
```typescript
const name = startStudentEvaluationRef.operationName;
console.log(name);
```

### Variables
The `StartStudentEvaluation` mutation requires an argument of type `StartStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface StartStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
  takenOn: TimestampString;
  attemptNo: number;
}
```
### Return Type
Recall that executing the `StartStudentEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `StartStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface StartStudentEvaluationData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```
### Using `StartStudentEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, startStudentEvaluation, StartStudentEvaluationVariables } from '@dataconnect/generated';

// The `StartStudentEvaluation` mutation requires an argument of type `StartStudentEvaluationVariables`:
const startStudentEvaluationVars: StartStudentEvaluationVariables = {
  studentCourseEvaluationId: ..., 
  takenOn: ..., 
  attemptNo: ..., 
};

// Call the `startStudentEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await startStudentEvaluation(startStudentEvaluationVars);
// Variables can be defined inline as well.
const { data } = await startStudentEvaluation({ studentCourseEvaluationId: ..., takenOn: ..., attemptNo: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await startStudentEvaluation(dataConnect, startStudentEvaluationVars);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
startStudentEvaluation(startStudentEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

### Using `StartStudentEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, startStudentEvaluationRef, StartStudentEvaluationVariables } from '@dataconnect/generated';

// The `StartStudentEvaluation` mutation requires an argument of type `StartStudentEvaluationVariables`:
const startStudentEvaluationVars: StartStudentEvaluationVariables = {
  studentCourseEvaluationId: ..., 
  takenOn: ..., 
  attemptNo: ..., 
};

// Call the `startStudentEvaluationRef()` function to get a reference to the mutation.
const ref = startStudentEvaluationRef(startStudentEvaluationVars);
// Variables can be defined inline as well.
const ref = startStudentEvaluationRef({ studentCourseEvaluationId: ..., takenOn: ..., attemptNo: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = startStudentEvaluationRef(dataConnect, startStudentEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

## CompleteStudentEvaluation
You can execute the `CompleteStudentEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
completeStudentEvaluation(vars: CompleteStudentEvaluationVariables): MutationPromise<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;

interface CompleteStudentEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CompleteStudentEvaluationVariables): MutationRef<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;
}
export const completeStudentEvaluationRef: CompleteStudentEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
completeStudentEvaluation(dc: DataConnect, vars: CompleteStudentEvaluationVariables): MutationPromise<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;

interface CompleteStudentEvaluationRef {
  ...
  (dc: DataConnect, vars: CompleteStudentEvaluationVariables): MutationRef<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;
}
export const completeStudentEvaluationRef: CompleteStudentEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the completeStudentEvaluationRef:
```typescript
const name = completeStudentEvaluationRef.operationName;
console.log(name);
```

### Variables
The `CompleteStudentEvaluation` mutation requires an argument of type `CompleteStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CompleteStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
}
```
### Return Type
Recall that executing the `CompleteStudentEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CompleteStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CompleteStudentEvaluationData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```
### Using `CompleteStudentEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, completeStudentEvaluation, CompleteStudentEvaluationVariables } from '@dataconnect/generated';

// The `CompleteStudentEvaluation` mutation requires an argument of type `CompleteStudentEvaluationVariables`:
const completeStudentEvaluationVars: CompleteStudentEvaluationVariables = {
  studentCourseEvaluationId: ..., 
};

// Call the `completeStudentEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await completeStudentEvaluation(completeStudentEvaluationVars);
// Variables can be defined inline as well.
const { data } = await completeStudentEvaluation({ studentCourseEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await completeStudentEvaluation(dataConnect, completeStudentEvaluationVars);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
completeStudentEvaluation(completeStudentEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

### Using `CompleteStudentEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, completeStudentEvaluationRef, CompleteStudentEvaluationVariables } from '@dataconnect/generated';

// The `CompleteStudentEvaluation` mutation requires an argument of type `CompleteStudentEvaluationVariables`:
const completeStudentEvaluationVars: CompleteStudentEvaluationVariables = {
  studentCourseEvaluationId: ..., 
};

// Call the `completeStudentEvaluationRef()` function to get a reference to the mutation.
const ref = completeStudentEvaluationRef(completeStudentEvaluationVars);
// Variables can be defined inline as well.
const ref = completeStudentEvaluationRef({ studentCourseEvaluationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = completeStudentEvaluationRef(dataConnect, completeStudentEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

## GradeStudentEvaluation
You can execute the `GradeStudentEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
gradeStudentEvaluation(vars: GradeStudentEvaluationVariables): MutationPromise<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;

interface GradeStudentEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeStudentEvaluationVariables): MutationRef<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;
}
export const gradeStudentEvaluationRef: GradeStudentEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
gradeStudentEvaluation(dc: DataConnect, vars: GradeStudentEvaluationVariables): MutationPromise<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;

interface GradeStudentEvaluationRef {
  ...
  (dc: DataConnect, vars: GradeStudentEvaluationVariables): MutationRef<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;
}
export const gradeStudentEvaluationRef: GradeStudentEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the gradeStudentEvaluationRef:
```typescript
const name = gradeStudentEvaluationRef.operationName;
console.log(name);
```

### Variables
The `GradeStudentEvaluation` mutation requires an argument of type `GradeStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GradeStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
  totalScore: number;
  grade: number;
}
```
### Return Type
Recall that executing the `GradeStudentEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GradeStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GradeStudentEvaluationData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```
### Using `GradeStudentEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, gradeStudentEvaluation, GradeStudentEvaluationVariables } from '@dataconnect/generated';

// The `GradeStudentEvaluation` mutation requires an argument of type `GradeStudentEvaluationVariables`:
const gradeStudentEvaluationVars: GradeStudentEvaluationVariables = {
  studentCourseEvaluationId: ..., 
  totalScore: ..., 
  grade: ..., 
};

// Call the `gradeStudentEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await gradeStudentEvaluation(gradeStudentEvaluationVars);
// Variables can be defined inline as well.
const { data } = await gradeStudentEvaluation({ studentCourseEvaluationId: ..., totalScore: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await gradeStudentEvaluation(dataConnect, gradeStudentEvaluationVars);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
gradeStudentEvaluation(gradeStudentEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

### Using `GradeStudentEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, gradeStudentEvaluationRef, GradeStudentEvaluationVariables } from '@dataconnect/generated';

// The `GradeStudentEvaluation` mutation requires an argument of type `GradeStudentEvaluationVariables`:
const gradeStudentEvaluationVars: GradeStudentEvaluationVariables = {
  studentCourseEvaluationId: ..., 
  totalScore: ..., 
  grade: ..., 
};

// Call the `gradeStudentEvaluationRef()` function to get a reference to the mutation.
const ref = gradeStudentEvaluationRef(gradeStudentEvaluationVars);
// Variables can be defined inline as well.
const ref = gradeStudentEvaluationRef({ studentCourseEvaluationId: ..., totalScore: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = gradeStudentEvaluationRef(dataConnect, gradeStudentEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

## UpdateStudentEvaluationScore
You can execute the `UpdateStudentEvaluationScore` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStudentEvaluationScore(vars: UpdateStudentEvaluationScoreVariables): MutationPromise<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;

interface UpdateStudentEvaluationScoreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentEvaluationScoreVariables): MutationRef<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;
}
export const updateStudentEvaluationScoreRef: UpdateStudentEvaluationScoreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStudentEvaluationScore(dc: DataConnect, vars: UpdateStudentEvaluationScoreVariables): MutationPromise<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;

interface UpdateStudentEvaluationScoreRef {
  ...
  (dc: DataConnect, vars: UpdateStudentEvaluationScoreVariables): MutationRef<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;
}
export const updateStudentEvaluationScoreRef: UpdateStudentEvaluationScoreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStudentEvaluationScoreRef:
```typescript
const name = updateStudentEvaluationScoreRef.operationName;
console.log(name);
```

### Variables
The `UpdateStudentEvaluationScore` mutation requires an argument of type `UpdateStudentEvaluationScoreVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStudentEvaluationScoreVariables {
  studentCourseEvaluationId: UUIDString;
  totalScore: number;
}
```
### Return Type
Recall that executing the `UpdateStudentEvaluationScore` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStudentEvaluationScoreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStudentEvaluationScoreData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```
### Using `UpdateStudentEvaluationScore`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStudentEvaluationScore, UpdateStudentEvaluationScoreVariables } from '@dataconnect/generated';

// The `UpdateStudentEvaluationScore` mutation requires an argument of type `UpdateStudentEvaluationScoreVariables`:
const updateStudentEvaluationScoreVars: UpdateStudentEvaluationScoreVariables = {
  studentCourseEvaluationId: ..., 
  totalScore: ..., 
};

// Call the `updateStudentEvaluationScore()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStudentEvaluationScore(updateStudentEvaluationScoreVars);
// Variables can be defined inline as well.
const { data } = await updateStudentEvaluationScore({ studentCourseEvaluationId: ..., totalScore: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStudentEvaluationScore(dataConnect, updateStudentEvaluationScoreVars);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
updateStudentEvaluationScore(updateStudentEvaluationScoreVars).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

### Using `UpdateStudentEvaluationScore`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStudentEvaluationScoreRef, UpdateStudentEvaluationScoreVariables } from '@dataconnect/generated';

// The `UpdateStudentEvaluationScore` mutation requires an argument of type `UpdateStudentEvaluationScoreVariables`:
const updateStudentEvaluationScoreVars: UpdateStudentEvaluationScoreVariables = {
  studentCourseEvaluationId: ..., 
  totalScore: ..., 
};

// Call the `updateStudentEvaluationScoreRef()` function to get a reference to the mutation.
const ref = updateStudentEvaluationScoreRef(updateStudentEvaluationScoreVars);
// Variables can be defined inline as well.
const ref = updateStudentEvaluationScoreRef({ studentCourseEvaluationId: ..., totalScore: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStudentEvaluationScoreRef(dataConnect, updateStudentEvaluationScoreVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentCourseEvaluation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentCourseEvaluation_update);
});
```

## AddQuestionToStudentEvaluation
You can execute the `AddQuestionToStudentEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addQuestionToStudentEvaluation(vars: AddQuestionToStudentEvaluationVariables): MutationPromise<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;

interface AddQuestionToStudentEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddQuestionToStudentEvaluationVariables): MutationRef<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;
}
export const addQuestionToStudentEvaluationRef: AddQuestionToStudentEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addQuestionToStudentEvaluation(dc: DataConnect, vars: AddQuestionToStudentEvaluationVariables): MutationPromise<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;

interface AddQuestionToStudentEvaluationRef {
  ...
  (dc: DataConnect, vars: AddQuestionToStudentEvaluationVariables): MutationRef<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;
}
export const addQuestionToStudentEvaluationRef: AddQuestionToStudentEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addQuestionToStudentEvaluationRef:
```typescript
const name = addQuestionToStudentEvaluationRef.operationName;
console.log(name);
```

### Variables
The `AddQuestionToStudentEvaluation` mutation requires an argument of type `AddQuestionToStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddQuestionToStudentEvaluationVariables {
  studentEvaluationQuestionId: UUIDString;
  studentEvaluationId: UUIDString;
  evaluationQuestionId: UUIDString;
  position: number;
}
```
### Return Type
Recall that executing the `AddQuestionToStudentEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddQuestionToStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddQuestionToStudentEvaluationData {
  studentEvaluationQuestion_insert: StudentEvaluationQuestion_Key;
}
```
### Using `AddQuestionToStudentEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addQuestionToStudentEvaluation, AddQuestionToStudentEvaluationVariables } from '@dataconnect/generated';

// The `AddQuestionToStudentEvaluation` mutation requires an argument of type `AddQuestionToStudentEvaluationVariables`:
const addQuestionToStudentEvaluationVars: AddQuestionToStudentEvaluationVariables = {
  studentEvaluationQuestionId: ..., 
  studentEvaluationId: ..., 
  evaluationQuestionId: ..., 
  position: ..., 
};

// Call the `addQuestionToStudentEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addQuestionToStudentEvaluation(addQuestionToStudentEvaluationVars);
// Variables can be defined inline as well.
const { data } = await addQuestionToStudentEvaluation({ studentEvaluationQuestionId: ..., studentEvaluationId: ..., evaluationQuestionId: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addQuestionToStudentEvaluation(dataConnect, addQuestionToStudentEvaluationVars);

console.log(data.studentEvaluationQuestion_insert);

// Or, you can use the `Promise` API.
addQuestionToStudentEvaluation(addQuestionToStudentEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestion_insert);
});
```

### Using `AddQuestionToStudentEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addQuestionToStudentEvaluationRef, AddQuestionToStudentEvaluationVariables } from '@dataconnect/generated';

// The `AddQuestionToStudentEvaluation` mutation requires an argument of type `AddQuestionToStudentEvaluationVariables`:
const addQuestionToStudentEvaluationVars: AddQuestionToStudentEvaluationVariables = {
  studentEvaluationQuestionId: ..., 
  studentEvaluationId: ..., 
  evaluationQuestionId: ..., 
  position: ..., 
};

// Call the `addQuestionToStudentEvaluationRef()` function to get a reference to the mutation.
const ref = addQuestionToStudentEvaluationRef(addQuestionToStudentEvaluationVars);
// Variables can be defined inline as well.
const ref = addQuestionToStudentEvaluationRef({ studentEvaluationQuestionId: ..., studentEvaluationId: ..., evaluationQuestionId: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addQuestionToStudentEvaluationRef(dataConnect, addQuestionToStudentEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentEvaluationQuestion_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestion_insert);
});
```

## GradeStudentQuestion
You can execute the `GradeStudentQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
gradeStudentQuestion(vars: GradeStudentQuestionVariables): MutationPromise<GradeStudentQuestionData, GradeStudentQuestionVariables>;

interface GradeStudentQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeStudentQuestionVariables): MutationRef<GradeStudentQuestionData, GradeStudentQuestionVariables>;
}
export const gradeStudentQuestionRef: GradeStudentQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
gradeStudentQuestion(dc: DataConnect, vars: GradeStudentQuestionVariables): MutationPromise<GradeStudentQuestionData, GradeStudentQuestionVariables>;

interface GradeStudentQuestionRef {
  ...
  (dc: DataConnect, vars: GradeStudentQuestionVariables): MutationRef<GradeStudentQuestionData, GradeStudentQuestionVariables>;
}
export const gradeStudentQuestionRef: GradeStudentQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the gradeStudentQuestionRef:
```typescript
const name = gradeStudentQuestionRef.operationName;
console.log(name);
```

### Variables
The `GradeStudentQuestion` mutation requires an argument of type `GradeStudentQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GradeStudentQuestionVariables {
  studentEvaluationQuestionId: UUIDString;
  scoreObtained: number;
  isCorrect: boolean;
}
```
### Return Type
Recall that executing the `GradeStudentQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GradeStudentQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GradeStudentQuestionData {
  studentEvaluationQuestion_update?: StudentEvaluationQuestion_Key | null;
}
```
### Using `GradeStudentQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, gradeStudentQuestion, GradeStudentQuestionVariables } from '@dataconnect/generated';

// The `GradeStudentQuestion` mutation requires an argument of type `GradeStudentQuestionVariables`:
const gradeStudentQuestionVars: GradeStudentQuestionVariables = {
  studentEvaluationQuestionId: ..., 
  scoreObtained: ..., 
  isCorrect: ..., 
};

// Call the `gradeStudentQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await gradeStudentQuestion(gradeStudentQuestionVars);
// Variables can be defined inline as well.
const { data } = await gradeStudentQuestion({ studentEvaluationQuestionId: ..., scoreObtained: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await gradeStudentQuestion(dataConnect, gradeStudentQuestionVars);

console.log(data.studentEvaluationQuestion_update);

// Or, you can use the `Promise` API.
gradeStudentQuestion(gradeStudentQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestion_update);
});
```

### Using `GradeStudentQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, gradeStudentQuestionRef, GradeStudentQuestionVariables } from '@dataconnect/generated';

// The `GradeStudentQuestion` mutation requires an argument of type `GradeStudentQuestionVariables`:
const gradeStudentQuestionVars: GradeStudentQuestionVariables = {
  studentEvaluationQuestionId: ..., 
  scoreObtained: ..., 
  isCorrect: ..., 
};

// Call the `gradeStudentQuestionRef()` function to get a reference to the mutation.
const ref = gradeStudentQuestionRef(gradeStudentQuestionVars);
// Variables can be defined inline as well.
const ref = gradeStudentQuestionRef({ studentEvaluationQuestionId: ..., scoreObtained: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = gradeStudentQuestionRef(dataConnect, gradeStudentQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentEvaluationQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestion_update);
});
```

## UpdateStudentQuestionPosition
You can execute the `UpdateStudentQuestionPosition` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStudentQuestionPosition(vars: UpdateStudentQuestionPositionVariables): MutationPromise<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;

interface UpdateStudentQuestionPositionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentQuestionPositionVariables): MutationRef<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;
}
export const updateStudentQuestionPositionRef: UpdateStudentQuestionPositionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStudentQuestionPosition(dc: DataConnect, vars: UpdateStudentQuestionPositionVariables): MutationPromise<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;

interface UpdateStudentQuestionPositionRef {
  ...
  (dc: DataConnect, vars: UpdateStudentQuestionPositionVariables): MutationRef<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;
}
export const updateStudentQuestionPositionRef: UpdateStudentQuestionPositionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStudentQuestionPositionRef:
```typescript
const name = updateStudentQuestionPositionRef.operationName;
console.log(name);
```

### Variables
The `UpdateStudentQuestionPosition` mutation requires an argument of type `UpdateStudentQuestionPositionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStudentQuestionPositionVariables {
  studentEvaluationQuestionId: UUIDString;
  position: number;
}
```
### Return Type
Recall that executing the `UpdateStudentQuestionPosition` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStudentQuestionPositionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStudentQuestionPositionData {
  studentEvaluationQuestion_update?: StudentEvaluationQuestion_Key | null;
}
```
### Using `UpdateStudentQuestionPosition`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStudentQuestionPosition, UpdateStudentQuestionPositionVariables } from '@dataconnect/generated';

// The `UpdateStudentQuestionPosition` mutation requires an argument of type `UpdateStudentQuestionPositionVariables`:
const updateStudentQuestionPositionVars: UpdateStudentQuestionPositionVariables = {
  studentEvaluationQuestionId: ..., 
  position: ..., 
};

// Call the `updateStudentQuestionPosition()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStudentQuestionPosition(updateStudentQuestionPositionVars);
// Variables can be defined inline as well.
const { data } = await updateStudentQuestionPosition({ studentEvaluationQuestionId: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStudentQuestionPosition(dataConnect, updateStudentQuestionPositionVars);

console.log(data.studentEvaluationQuestion_update);

// Or, you can use the `Promise` API.
updateStudentQuestionPosition(updateStudentQuestionPositionVars).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestion_update);
});
```

### Using `UpdateStudentQuestionPosition`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStudentQuestionPositionRef, UpdateStudentQuestionPositionVariables } from '@dataconnect/generated';

// The `UpdateStudentQuestionPosition` mutation requires an argument of type `UpdateStudentQuestionPositionVariables`:
const updateStudentQuestionPositionVars: UpdateStudentQuestionPositionVariables = {
  studentEvaluationQuestionId: ..., 
  position: ..., 
};

// Call the `updateStudentQuestionPositionRef()` function to get a reference to the mutation.
const ref = updateStudentQuestionPositionRef(updateStudentQuestionPositionVars);
// Variables can be defined inline as well.
const ref = updateStudentQuestionPositionRef({ studentEvaluationQuestionId: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStudentQuestionPositionRef(dataConnect, updateStudentQuestionPositionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentEvaluationQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestion_update);
});
```

## RemoveQuestionFromStudentEvaluation
You can execute the `RemoveQuestionFromStudentEvaluation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeQuestionFromStudentEvaluation(vars: RemoveQuestionFromStudentEvaluationVariables): MutationPromise<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;

interface RemoveQuestionFromStudentEvaluationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveQuestionFromStudentEvaluationVariables): MutationRef<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;
}
export const removeQuestionFromStudentEvaluationRef: RemoveQuestionFromStudentEvaluationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeQuestionFromStudentEvaluation(dc: DataConnect, vars: RemoveQuestionFromStudentEvaluationVariables): MutationPromise<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;

interface RemoveQuestionFromStudentEvaluationRef {
  ...
  (dc: DataConnect, vars: RemoveQuestionFromStudentEvaluationVariables): MutationRef<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;
}
export const removeQuestionFromStudentEvaluationRef: RemoveQuestionFromStudentEvaluationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeQuestionFromStudentEvaluationRef:
```typescript
const name = removeQuestionFromStudentEvaluationRef.operationName;
console.log(name);
```

### Variables
The `RemoveQuestionFromStudentEvaluation` mutation requires an argument of type `RemoveQuestionFromStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveQuestionFromStudentEvaluationVariables {
  studentEvaluationQuestionId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveQuestionFromStudentEvaluation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveQuestionFromStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveQuestionFromStudentEvaluationData {
  studentEvaluationQuestion_delete?: StudentEvaluationQuestion_Key | null;
}
```
### Using `RemoveQuestionFromStudentEvaluation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeQuestionFromStudentEvaluation, RemoveQuestionFromStudentEvaluationVariables } from '@dataconnect/generated';

// The `RemoveQuestionFromStudentEvaluation` mutation requires an argument of type `RemoveQuestionFromStudentEvaluationVariables`:
const removeQuestionFromStudentEvaluationVars: RemoveQuestionFromStudentEvaluationVariables = {
  studentEvaluationQuestionId: ..., 
};

// Call the `removeQuestionFromStudentEvaluation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeQuestionFromStudentEvaluation(removeQuestionFromStudentEvaluationVars);
// Variables can be defined inline as well.
const { data } = await removeQuestionFromStudentEvaluation({ studentEvaluationQuestionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeQuestionFromStudentEvaluation(dataConnect, removeQuestionFromStudentEvaluationVars);

console.log(data.studentEvaluationQuestion_delete);

// Or, you can use the `Promise` API.
removeQuestionFromStudentEvaluation(removeQuestionFromStudentEvaluationVars).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestion_delete);
});
```

### Using `RemoveQuestionFromStudentEvaluation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeQuestionFromStudentEvaluationRef, RemoveQuestionFromStudentEvaluationVariables } from '@dataconnect/generated';

// The `RemoveQuestionFromStudentEvaluation` mutation requires an argument of type `RemoveQuestionFromStudentEvaluationVariables`:
const removeQuestionFromStudentEvaluationVars: RemoveQuestionFromStudentEvaluationVariables = {
  studentEvaluationQuestionId: ..., 
};

// Call the `removeQuestionFromStudentEvaluationRef()` function to get a reference to the mutation.
const ref = removeQuestionFromStudentEvaluationRef(removeQuestionFromStudentEvaluationVars);
// Variables can be defined inline as well.
const ref = removeQuestionFromStudentEvaluationRef({ studentEvaluationQuestionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeQuestionFromStudentEvaluationRef(dataConnect, removeQuestionFromStudentEvaluationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentEvaluationQuestion_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentEvaluationQuestion_delete);
});
```

## RegisterStudentAnswer
You can execute the `RegisterStudentAnswer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
registerStudentAnswer(vars: RegisterStudentAnswerVariables): MutationPromise<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;

interface RegisterStudentAnswerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegisterStudentAnswerVariables): MutationRef<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;
}
export const registerStudentAnswerRef: RegisterStudentAnswerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registerStudentAnswer(dc: DataConnect, vars: RegisterStudentAnswerVariables): MutationPromise<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;

interface RegisterStudentAnswerRef {
  ...
  (dc: DataConnect, vars: RegisterStudentAnswerVariables): MutationRef<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;
}
export const registerStudentAnswerRef: RegisterStudentAnswerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registerStudentAnswerRef:
```typescript
const name = registerStudentAnswerRef.operationName;
console.log(name);
```

### Variables
The `RegisterStudentAnswer` mutation requires an argument of type `RegisterStudentAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegisterStudentAnswerVariables {
  studentAnswerOptionId: UUIDString;
  studentEvaluationQuestionId: UUIDString;
  questionOptionId: UUIDString;
}
```
### Return Type
Recall that executing the `RegisterStudentAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegisterStudentAnswerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegisterStudentAnswerData {
  studentAnswerOption_insert: StudentAnswerOption_Key;
}
```
### Using `RegisterStudentAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registerStudentAnswer, RegisterStudentAnswerVariables } from '@dataconnect/generated';

// The `RegisterStudentAnswer` mutation requires an argument of type `RegisterStudentAnswerVariables`:
const registerStudentAnswerVars: RegisterStudentAnswerVariables = {
  studentAnswerOptionId: ..., 
  studentEvaluationQuestionId: ..., 
  questionOptionId: ..., 
};

// Call the `registerStudentAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registerStudentAnswer(registerStudentAnswerVars);
// Variables can be defined inline as well.
const { data } = await registerStudentAnswer({ studentAnswerOptionId: ..., studentEvaluationQuestionId: ..., questionOptionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registerStudentAnswer(dataConnect, registerStudentAnswerVars);

console.log(data.studentAnswerOption_insert);

// Or, you can use the `Promise` API.
registerStudentAnswer(registerStudentAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.studentAnswerOption_insert);
});
```

### Using `RegisterStudentAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registerStudentAnswerRef, RegisterStudentAnswerVariables } from '@dataconnect/generated';

// The `RegisterStudentAnswer` mutation requires an argument of type `RegisterStudentAnswerVariables`:
const registerStudentAnswerVars: RegisterStudentAnswerVariables = {
  studentAnswerOptionId: ..., 
  studentEvaluationQuestionId: ..., 
  questionOptionId: ..., 
};

// Call the `registerStudentAnswerRef()` function to get a reference to the mutation.
const ref = registerStudentAnswerRef(registerStudentAnswerVars);
// Variables can be defined inline as well.
const ref = registerStudentAnswerRef({ studentAnswerOptionId: ..., studentEvaluationQuestionId: ..., questionOptionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registerStudentAnswerRef(dataConnect, registerStudentAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentAnswerOption_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentAnswerOption_insert);
});
```

## RemoveStudentAnswer
You can execute the `RemoveStudentAnswer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeStudentAnswer(vars: RemoveStudentAnswerVariables): MutationPromise<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;

interface RemoveStudentAnswerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveStudentAnswerVariables): MutationRef<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;
}
export const removeStudentAnswerRef: RemoveStudentAnswerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeStudentAnswer(dc: DataConnect, vars: RemoveStudentAnswerVariables): MutationPromise<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;

interface RemoveStudentAnswerRef {
  ...
  (dc: DataConnect, vars: RemoveStudentAnswerVariables): MutationRef<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;
}
export const removeStudentAnswerRef: RemoveStudentAnswerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeStudentAnswerRef:
```typescript
const name = removeStudentAnswerRef.operationName;
console.log(name);
```

### Variables
The `RemoveStudentAnswer` mutation requires an argument of type `RemoveStudentAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveStudentAnswerVariables {
  studentAnswerOptionId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveStudentAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveStudentAnswerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveStudentAnswerData {
  studentAnswerOption_delete?: StudentAnswerOption_Key | null;
}
```
### Using `RemoveStudentAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeStudentAnswer, RemoveStudentAnswerVariables } from '@dataconnect/generated';

// The `RemoveStudentAnswer` mutation requires an argument of type `RemoveStudentAnswerVariables`:
const removeStudentAnswerVars: RemoveStudentAnswerVariables = {
  studentAnswerOptionId: ..., 
};

// Call the `removeStudentAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeStudentAnswer(removeStudentAnswerVars);
// Variables can be defined inline as well.
const { data } = await removeStudentAnswer({ studentAnswerOptionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeStudentAnswer(dataConnect, removeStudentAnswerVars);

console.log(data.studentAnswerOption_delete);

// Or, you can use the `Promise` API.
removeStudentAnswer(removeStudentAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.studentAnswerOption_delete);
});
```

### Using `RemoveStudentAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeStudentAnswerRef, RemoveStudentAnswerVariables } from '@dataconnect/generated';

// The `RemoveStudentAnswer` mutation requires an argument of type `RemoveStudentAnswerVariables`:
const removeStudentAnswerVars: RemoveStudentAnswerVariables = {
  studentAnswerOptionId: ..., 
};

// Call the `removeStudentAnswerRef()` function to get a reference to the mutation.
const ref = removeStudentAnswerRef(removeStudentAnswerVars);
// Variables can be defined inline as well.
const ref = removeStudentAnswerRef({ studentAnswerOptionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeStudentAnswerRef(dataConnect, removeStudentAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentAnswerOption_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentAnswerOption_delete);
});
```

