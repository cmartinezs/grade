# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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
  - [*ValidateStudentForEvaluation*](#validatestudentforevaluation)
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

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `example`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `example` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetUserByEmail
You can execute the `GetUserByEmail` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables, options?: useDataConnectQueryOptions<GetUserByEmailData>): UseDataConnectQueryResult<GetUserByEmailData, GetUserByEmailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserByEmail(vars: GetUserByEmailVariables, options?: useDataConnectQueryOptions<GetUserByEmailData>): UseDataConnectQueryResult<GetUserByEmailData, GetUserByEmailVariables>;
```

### Variables
The `GetUserByEmail` Query requires an argument of type `GetUserByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that calling the `GetUserByEmail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserByEmail` Query is of type `GetUserByEmailData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserByEmail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserByEmailVariables } from '@dataconnect/generated';
import { useGetUserByEmail } from '@dataconnect/generated/react'

export default function GetUserByEmailComponent() {
  // The `useGetUserByEmail` Query hook requires an argument of type `GetUserByEmailVariables`:
  const getUserByEmailVars: GetUserByEmailVariables = {
    email: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserByEmail(getUserByEmailVars);
  // Variables can be defined inline as well.
  const query = useGetUserByEmail({ email: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserByEmail(dataConnect, getUserByEmailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserByEmail(getUserByEmailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserByEmail(dataConnect, getUserByEmailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.users);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserById
You can execute the `GetUserById` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: useDataConnectQueryOptions<GetUserByIdData>): UseDataConnectQueryResult<GetUserByIdData, GetUserByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserById(vars: GetUserByIdVariables, options?: useDataConnectQueryOptions<GetUserByIdData>): UseDataConnectQueryResult<GetUserByIdData, GetUserByIdVariables>;
```

### Variables
The `GetUserById` Query requires an argument of type `GetUserByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserByIdVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that calling the `GetUserById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserById` Query is of type `GetUserByIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserByIdVariables } from '@dataconnect/generated';
import { useGetUserById } from '@dataconnect/generated/react'

export default function GetUserByIdComponent() {
  // The `useGetUserById` Query hook requires an argument of type `GetUserByIdVariables`:
  const getUserByIdVars: GetUserByIdVariables = {
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserById(getUserByIdVars);
  // Variables can be defined inline as well.
  const query = useGetUserById({ userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserById(dataConnect, getUserByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserById(getUserByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserById(dataConnect, getUserByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.users);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListSubjects
You can execute the `ListSubjects` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListSubjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListSubjectsData>): UseDataConnectQueryResult<ListSubjectsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListSubjects(options?: useDataConnectQueryOptions<ListSubjectsData>): UseDataConnectQueryResult<ListSubjectsData, undefined>;
```

### Variables
The `ListSubjects` Query has no variables.
### Return Type
Recall that calling the `ListSubjects` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListSubjects` Query is of type `ListSubjectsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListSubjects`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListSubjects } from '@dataconnect/generated/react'

export default function ListSubjectsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListSubjects();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListSubjects(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListSubjects(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListSubjects(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.subjects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetSubject
You can execute the `GetSubject` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetSubject(dc: DataConnect, vars: GetSubjectVariables, options?: useDataConnectQueryOptions<GetSubjectData>): UseDataConnectQueryResult<GetSubjectData, GetSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetSubject(vars: GetSubjectVariables, options?: useDataConnectQueryOptions<GetSubjectData>): UseDataConnectQueryResult<GetSubjectData, GetSubjectVariables>;
```

### Variables
The `GetSubject` Query requires an argument of type `GetSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetSubjectVariables {
  subjectId: UUIDString;
}
```
### Return Type
Recall that calling the `GetSubject` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetSubject` Query is of type `GetSubjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetSubject`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetSubjectVariables } from '@dataconnect/generated';
import { useGetSubject } from '@dataconnect/generated/react'

export default function GetSubjectComponent() {
  // The `useGetSubject` Query hook requires an argument of type `GetSubjectVariables`:
  const getSubjectVars: GetSubjectVariables = {
    subjectId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetSubject(getSubjectVars);
  // Variables can be defined inline as well.
  const query = useGetSubject({ subjectId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetSubject(dataConnect, getSubjectVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetSubject(getSubjectVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetSubject(dataConnect, getSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.subject);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListUnits
You can execute the `ListUnits` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListUnits(dc: DataConnect, options?: useDataConnectQueryOptions<ListUnitsData>): UseDataConnectQueryResult<ListUnitsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListUnits(options?: useDataConnectQueryOptions<ListUnitsData>): UseDataConnectQueryResult<ListUnitsData, undefined>;
```

### Variables
The `ListUnits` Query has no variables.
### Return Type
Recall that calling the `ListUnits` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListUnits` Query is of type `ListUnitsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListUnits`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListUnits } from '@dataconnect/generated/react'

export default function ListUnitsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListUnits();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListUnits(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListUnits(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListUnits(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.units);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUnit
You can execute the `GetUnit` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUnit(dc: DataConnect, vars: GetUnitVariables, options?: useDataConnectQueryOptions<GetUnitData>): UseDataConnectQueryResult<GetUnitData, GetUnitVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUnit(vars: GetUnitVariables, options?: useDataConnectQueryOptions<GetUnitData>): UseDataConnectQueryResult<GetUnitData, GetUnitVariables>;
```

### Variables
The `GetUnit` Query requires an argument of type `GetUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUnitVariables {
  unitId: UUIDString;
}
```
### Return Type
Recall that calling the `GetUnit` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUnit` Query is of type `GetUnitData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUnit`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUnitVariables } from '@dataconnect/generated';
import { useGetUnit } from '@dataconnect/generated/react'

export default function GetUnitComponent() {
  // The `useGetUnit` Query hook requires an argument of type `GetUnitVariables`:
  const getUnitVars: GetUnitVariables = {
    unitId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUnit(getUnitVars);
  // Variables can be defined inline as well.
  const query = useGetUnit({ unitId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUnit(dataConnect, getUnitVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUnit(getUnitVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUnit(dataConnect, getUnitVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.unit);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTopics
You can execute the `ListTopics` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListTopics(dc: DataConnect, options?: useDataConnectQueryOptions<ListTopicsData>): UseDataConnectQueryResult<ListTopicsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTopics(options?: useDataConnectQueryOptions<ListTopicsData>): UseDataConnectQueryResult<ListTopicsData, undefined>;
```

### Variables
The `ListTopics` Query has no variables.
### Return Type
Recall that calling the `ListTopics` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTopics` Query is of type `ListTopicsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTopics`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListTopics } from '@dataconnect/generated/react'

export default function ListTopicsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTopics();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTopics(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTopics(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTopics(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.topics);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTopic
You can execute the `GetTopic` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetTopic(dc: DataConnect, vars: GetTopicVariables, options?: useDataConnectQueryOptions<GetTopicData>): UseDataConnectQueryResult<GetTopicData, GetTopicVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTopic(vars: GetTopicVariables, options?: useDataConnectQueryOptions<GetTopicData>): UseDataConnectQueryResult<GetTopicData, GetTopicVariables>;
```

### Variables
The `GetTopic` Query requires an argument of type `GetTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetTopicVariables {
  topicId: UUIDString;
}
```
### Return Type
Recall that calling the `GetTopic` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTopic` Query is of type `GetTopicData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTopic`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTopicVariables } from '@dataconnect/generated';
import { useGetTopic } from '@dataconnect/generated/react'

export default function GetTopicComponent() {
  // The `useGetTopic` Query hook requires an argument of type `GetTopicVariables`:
  const getTopicVars: GetTopicVariables = {
    topicId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTopic(getTopicVars);
  // Variables can be defined inline as well.
  const query = useGetTopic({ topicId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTopic(dataConnect, getTopicVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTopic(getTopicVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTopic(dataConnect, getTopicVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.topic);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListLevelCategories
You can execute the `ListLevelCategories` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListLevelCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListLevelCategoriesData>): UseDataConnectQueryResult<ListLevelCategoriesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListLevelCategories(options?: useDataConnectQueryOptions<ListLevelCategoriesData>): UseDataConnectQueryResult<ListLevelCategoriesData, undefined>;
```

### Variables
The `ListLevelCategories` Query has no variables.
### Return Type
Recall that calling the `ListLevelCategories` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListLevelCategories` Query is of type `ListLevelCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListLevelCategories`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListLevelCategories } from '@dataconnect/generated/react'

export default function ListLevelCategoriesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListLevelCategories();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListLevelCategories(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListLevelCategories(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListLevelCategories(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.levelCategories);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetLevelCategory
You can execute the `GetLevelCategory` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetLevelCategory(dc: DataConnect, vars: GetLevelCategoryVariables, options?: useDataConnectQueryOptions<GetLevelCategoryData>): UseDataConnectQueryResult<GetLevelCategoryData, GetLevelCategoryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetLevelCategory(vars: GetLevelCategoryVariables, options?: useDataConnectQueryOptions<GetLevelCategoryData>): UseDataConnectQueryResult<GetLevelCategoryData, GetLevelCategoryVariables>;
```

### Variables
The `GetLevelCategory` Query requires an argument of type `GetLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetLevelCategoryVariables {
  categoryId: UUIDString;
}
```
### Return Type
Recall that calling the `GetLevelCategory` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLevelCategory` Query is of type `GetLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetLevelCategory`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetLevelCategoryVariables } from '@dataconnect/generated';
import { useGetLevelCategory } from '@dataconnect/generated/react'

export default function GetLevelCategoryComponent() {
  // The `useGetLevelCategory` Query hook requires an argument of type `GetLevelCategoryVariables`:
  const getLevelCategoryVars: GetLevelCategoryVariables = {
    categoryId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetLevelCategory(getLevelCategoryVars);
  // Variables can be defined inline as well.
  const query = useGetLevelCategory({ categoryId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetLevelCategory(dataConnect, getLevelCategoryVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetLevelCategory(getLevelCategoryVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetLevelCategory(dataConnect, getLevelCategoryVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.levelCategory);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListEducationalLevels
You can execute the `ListEducationalLevels` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListEducationalLevels(dc: DataConnect, options?: useDataConnectQueryOptions<ListEducationalLevelsData>): UseDataConnectQueryResult<ListEducationalLevelsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListEducationalLevels(options?: useDataConnectQueryOptions<ListEducationalLevelsData>): UseDataConnectQueryResult<ListEducationalLevelsData, undefined>;
```

### Variables
The `ListEducationalLevels` Query has no variables.
### Return Type
Recall that calling the `ListEducationalLevels` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListEducationalLevels` Query is of type `ListEducationalLevelsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListEducationalLevels`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListEducationalLevels } from '@dataconnect/generated/react'

export default function ListEducationalLevelsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListEducationalLevels();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListEducationalLevels(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListEducationalLevels(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListEducationalLevels(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.educationalLevels);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEducationalLevel
You can execute the `GetEducationalLevel` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEducationalLevel(dc: DataConnect, vars: GetEducationalLevelVariables, options?: useDataConnectQueryOptions<GetEducationalLevelData>): UseDataConnectQueryResult<GetEducationalLevelData, GetEducationalLevelVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEducationalLevel(vars: GetEducationalLevelVariables, options?: useDataConnectQueryOptions<GetEducationalLevelData>): UseDataConnectQueryResult<GetEducationalLevelData, GetEducationalLevelVariables>;
```

### Variables
The `GetEducationalLevel` Query requires an argument of type `GetEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEducationalLevelVariables {
  levelId: UUIDString;
}
```
### Return Type
Recall that calling the `GetEducationalLevel` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEducationalLevel` Query is of type `GetEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEducationalLevel`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEducationalLevelVariables } from '@dataconnect/generated';
import { useGetEducationalLevel } from '@dataconnect/generated/react'

export default function GetEducationalLevelComponent() {
  // The `useGetEducationalLevel` Query hook requires an argument of type `GetEducationalLevelVariables`:
  const getEducationalLevelVars: GetEducationalLevelVariables = {
    levelId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEducationalLevel(getEducationalLevelVars);
  // Variables can be defined inline as well.
  const query = useGetEducationalLevel({ levelId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEducationalLevel(dataConnect, getEducationalLevelVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEducationalLevel(getEducationalLevelVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEducationalLevel(dataConnect, getEducationalLevelVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.educationalLevel);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetLevelsByCategory
You can execute the `GetLevelsByCategory` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetLevelsByCategory(dc: DataConnect, vars: GetLevelsByCategoryVariables, options?: useDataConnectQueryOptions<GetLevelsByCategoryData>): UseDataConnectQueryResult<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetLevelsByCategory(vars: GetLevelsByCategoryVariables, options?: useDataConnectQueryOptions<GetLevelsByCategoryData>): UseDataConnectQueryResult<GetLevelsByCategoryData, GetLevelsByCategoryVariables>;
```

### Variables
The `GetLevelsByCategory` Query requires an argument of type `GetLevelsByCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetLevelsByCategoryVariables {
  categoryId: UUIDString;
}
```
### Return Type
Recall that calling the `GetLevelsByCategory` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLevelsByCategory` Query is of type `GetLevelsByCategoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetLevelsByCategory`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetLevelsByCategoryVariables } from '@dataconnect/generated';
import { useGetLevelsByCategory } from '@dataconnect/generated/react'

export default function GetLevelsByCategoryComponent() {
  // The `useGetLevelsByCategory` Query hook requires an argument of type `GetLevelsByCategoryVariables`:
  const getLevelsByCategoryVars: GetLevelsByCategoryVariables = {
    categoryId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetLevelsByCategory(getLevelsByCategoryVars);
  // Variables can be defined inline as well.
  const query = useGetLevelsByCategory({ categoryId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetLevelsByCategory(dataConnect, getLevelsByCategoryVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetLevelsByCategory(getLevelsByCategoryVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetLevelsByCategory(dataConnect, getLevelsByCategoryVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.educationalLevels);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCourses
You can execute the `ListCourses` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListCourses(dc: DataConnect, vars: ListCoursesVariables, options?: useDataConnectQueryOptions<ListCoursesData>): UseDataConnectQueryResult<ListCoursesData, ListCoursesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCourses(vars: ListCoursesVariables, options?: useDataConnectQueryOptions<ListCoursesData>): UseDataConnectQueryResult<ListCoursesData, ListCoursesVariables>;
```

### Variables
The `ListCourses` Query requires an argument of type `ListCoursesVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListCoursesVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ListCourses` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCourses` Query is of type `ListCoursesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCourses`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListCoursesVariables } from '@dataconnect/generated';
import { useListCourses } from '@dataconnect/generated/react'

export default function ListCoursesComponent() {
  // The `useListCourses` Query hook requires an argument of type `ListCoursesVariables`:
  const listCoursesVars: ListCoursesVariables = {
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCourses(listCoursesVars);
  // Variables can be defined inline as well.
  const query = useListCourses({ userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCourses(dataConnect, listCoursesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCourses(listCoursesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCourses(dataConnect, listCoursesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourse
You can execute the `GetCourse` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourse(dc: DataConnect, vars: GetCourseVariables, options?: useDataConnectQueryOptions<GetCourseData>): UseDataConnectQueryResult<GetCourseData, GetCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourse(vars: GetCourseVariables, options?: useDataConnectQueryOptions<GetCourseData>): UseDataConnectQueryResult<GetCourseData, GetCourseVariables>;
```

### Variables
The `GetCourse` Query requires an argument of type `GetCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseVariables {
  courseId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetCourse` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourse` Query is of type `GetCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourse`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseVariables } from '@dataconnect/generated';
import { useGetCourse } from '@dataconnect/generated/react'

export default function GetCourseComponent() {
  // The `useGetCourse` Query hook requires an argument of type `GetCourseVariables`:
  const getCourseVars: GetCourseVariables = {
    courseId: ..., 
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourse(getCourseVars);
  // Variables can be defined inline as well.
  const query = useGetCourse({ courseId: ..., userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourse(dataConnect, getCourseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourse(getCourseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourse(dataConnect, getCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCoursesByUser
You can execute the `GetCoursesByUser` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCoursesByUser(dc: DataConnect, vars: GetCoursesByUserVariables, options?: useDataConnectQueryOptions<GetCoursesByUserData>): UseDataConnectQueryResult<GetCoursesByUserData, GetCoursesByUserVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCoursesByUser(vars: GetCoursesByUserVariables, options?: useDataConnectQueryOptions<GetCoursesByUserData>): UseDataConnectQueryResult<GetCoursesByUserData, GetCoursesByUserVariables>;
```

### Variables
The `GetCoursesByUser` Query requires an argument of type `GetCoursesByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCoursesByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetCoursesByUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCoursesByUser` Query is of type `GetCoursesByUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCoursesByUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCoursesByUserVariables } from '@dataconnect/generated';
import { useGetCoursesByUser } from '@dataconnect/generated/react'

export default function GetCoursesByUserComponent() {
  // The `useGetCoursesByUser` Query hook requires an argument of type `GetCoursesByUserVariables`:
  const getCoursesByUserVars: GetCoursesByUserVariables = {
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCoursesByUser(getCoursesByUserVars);
  // Variables can be defined inline as well.
  const query = useGetCoursesByUser({ userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCoursesByUser(dataConnect, getCoursesByUserVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesByUser(getCoursesByUserVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesByUser(dataConnect, getCoursesByUserVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCoursesByLevel
You can execute the `GetCoursesByLevel` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCoursesByLevel(dc: DataConnect, vars: GetCoursesByLevelVariables, options?: useDataConnectQueryOptions<GetCoursesByLevelData>): UseDataConnectQueryResult<GetCoursesByLevelData, GetCoursesByLevelVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCoursesByLevel(vars: GetCoursesByLevelVariables, options?: useDataConnectQueryOptions<GetCoursesByLevelData>): UseDataConnectQueryResult<GetCoursesByLevelData, GetCoursesByLevelVariables>;
```

### Variables
The `GetCoursesByLevel` Query requires an argument of type `GetCoursesByLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCoursesByLevelVariables {
  userId: UUIDString;
  levelId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetCoursesByLevel` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCoursesByLevel` Query is of type `GetCoursesByLevelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCoursesByLevel`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCoursesByLevelVariables } from '@dataconnect/generated';
import { useGetCoursesByLevel } from '@dataconnect/generated/react'

export default function GetCoursesByLevelComponent() {
  // The `useGetCoursesByLevel` Query hook requires an argument of type `GetCoursesByLevelVariables`:
  const getCoursesByLevelVars: GetCoursesByLevelVariables = {
    userId: ..., 
    levelId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCoursesByLevel(getCoursesByLevelVars);
  // Variables can be defined inline as well.
  const query = useGetCoursesByLevel({ userId: ..., levelId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCoursesByLevel(dataConnect, getCoursesByLevelVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesByLevel(getCoursesByLevelVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesByLevel(dataConnect, getCoursesByLevelVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListDifficulties
You can execute the `ListDifficulties` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListDifficulties(dc: DataConnect, options?: useDataConnectQueryOptions<ListDifficultiesData>): UseDataConnectQueryResult<ListDifficultiesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListDifficulties(options?: useDataConnectQueryOptions<ListDifficultiesData>): UseDataConnectQueryResult<ListDifficultiesData, undefined>;
```

### Variables
The `ListDifficulties` Query has no variables.
### Return Type
Recall that calling the `ListDifficulties` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListDifficulties` Query is of type `ListDifficultiesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListDifficulties`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListDifficulties } from '@dataconnect/generated/react'

export default function ListDifficultiesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListDifficulties();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListDifficulties(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListDifficulties(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListDifficulties(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.difficulties);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetDifficulty
You can execute the `GetDifficulty` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetDifficulty(dc: DataConnect, vars: GetDifficultyVariables, options?: useDataConnectQueryOptions<GetDifficultyData>): UseDataConnectQueryResult<GetDifficultyData, GetDifficultyVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetDifficulty(vars: GetDifficultyVariables, options?: useDataConnectQueryOptions<GetDifficultyData>): UseDataConnectQueryResult<GetDifficultyData, GetDifficultyVariables>;
```

### Variables
The `GetDifficulty` Query requires an argument of type `GetDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetDifficultyVariables {
  difficultyId: UUIDString;
}
```
### Return Type
Recall that calling the `GetDifficulty` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetDifficulty` Query is of type `GetDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetDifficulty`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetDifficultyVariables } from '@dataconnect/generated';
import { useGetDifficulty } from '@dataconnect/generated/react'

export default function GetDifficultyComponent() {
  // The `useGetDifficulty` Query hook requires an argument of type `GetDifficultyVariables`:
  const getDifficultyVars: GetDifficultyVariables = {
    difficultyId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetDifficulty(getDifficultyVars);
  // Variables can be defined inline as well.
  const query = useGetDifficulty({ difficultyId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetDifficulty(dataConnect, getDifficultyVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetDifficulty(getDifficultyVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetDifficulty(dataConnect, getDifficultyVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.difficulty);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListQuestionTypes
You can execute the `ListQuestionTypes` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListQuestionTypes(dc: DataConnect, options?: useDataConnectQueryOptions<ListQuestionTypesData>): UseDataConnectQueryResult<ListQuestionTypesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListQuestionTypes(options?: useDataConnectQueryOptions<ListQuestionTypesData>): UseDataConnectQueryResult<ListQuestionTypesData, undefined>;
```

### Variables
The `ListQuestionTypes` Query has no variables.
### Return Type
Recall that calling the `ListQuestionTypes` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListQuestionTypes` Query is of type `ListQuestionTypesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListQuestionTypes`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListQuestionTypes } from '@dataconnect/generated/react'

export default function ListQuestionTypesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListQuestionTypes();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListQuestionTypes(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListQuestionTypes(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListQuestionTypes(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questionTypes);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuestionType
You can execute the `GetQuestionType` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuestionType(dc: DataConnect, vars: GetQuestionTypeVariables, options?: useDataConnectQueryOptions<GetQuestionTypeData>): UseDataConnectQueryResult<GetQuestionTypeData, GetQuestionTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuestionType(vars: GetQuestionTypeVariables, options?: useDataConnectQueryOptions<GetQuestionTypeData>): UseDataConnectQueryResult<GetQuestionTypeData, GetQuestionTypeVariables>;
```

### Variables
The `GetQuestionType` Query requires an argument of type `GetQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuestionTypeVariables {
  questionTypeId: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuestionType` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuestionType` Query is of type `GetQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuestionType`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuestionTypeVariables } from '@dataconnect/generated';
import { useGetQuestionType } from '@dataconnect/generated/react'

export default function GetQuestionTypeComponent() {
  // The `useGetQuestionType` Query hook requires an argument of type `GetQuestionTypeVariables`:
  const getQuestionTypeVars: GetQuestionTypeVariables = {
    questionTypeId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuestionType(getQuestionTypeVars);
  // Variables can be defined inline as well.
  const query = useGetQuestionType({ questionTypeId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuestionType(dataConnect, getQuestionTypeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionType(getQuestionTypeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionType(dataConnect, getQuestionTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questionType);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuestionTypeByCode
You can execute the `GetQuestionTypeByCode` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuestionTypeByCode(dc: DataConnect, vars: GetQuestionTypeByCodeVariables, options?: useDataConnectQueryOptions<GetQuestionTypeByCodeData>): UseDataConnectQueryResult<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuestionTypeByCode(vars: GetQuestionTypeByCodeVariables, options?: useDataConnectQueryOptions<GetQuestionTypeByCodeData>): UseDataConnectQueryResult<GetQuestionTypeByCodeData, GetQuestionTypeByCodeVariables>;
```

### Variables
The `GetQuestionTypeByCode` Query requires an argument of type `GetQuestionTypeByCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuestionTypeByCodeVariables {
  code: string;
}
```
### Return Type
Recall that calling the `GetQuestionTypeByCode` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuestionTypeByCode` Query is of type `GetQuestionTypeByCodeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuestionTypeByCode`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuestionTypeByCodeVariables } from '@dataconnect/generated';
import { useGetQuestionTypeByCode } from '@dataconnect/generated/react'

export default function GetQuestionTypeByCodeComponent() {
  // The `useGetQuestionTypeByCode` Query hook requires an argument of type `GetQuestionTypeByCodeVariables`:
  const getQuestionTypeByCodeVars: GetQuestionTypeByCodeVariables = {
    code: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuestionTypeByCode(getQuestionTypeByCodeVars);
  // Variables can be defined inline as well.
  const query = useGetQuestionTypeByCode({ code: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuestionTypeByCode(dataConnect, getQuestionTypeByCodeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionTypeByCode(getQuestionTypeByCodeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionTypeByCode(dataConnect, getQuestionTypeByCodeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questionTypes);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTaxonomies
You can execute the `ListTaxonomies` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListTaxonomies(dc: DataConnect, options?: useDataConnectQueryOptions<ListTaxonomiesData>): UseDataConnectQueryResult<ListTaxonomiesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTaxonomies(options?: useDataConnectQueryOptions<ListTaxonomiesData>): UseDataConnectQueryResult<ListTaxonomiesData, undefined>;
```

### Variables
The `ListTaxonomies` Query has no variables.
### Return Type
Recall that calling the `ListTaxonomies` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTaxonomies` Query is of type `ListTaxonomiesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTaxonomies`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListTaxonomies } from '@dataconnect/generated/react'

export default function ListTaxonomiesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTaxonomies();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTaxonomies(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTaxonomies(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTaxonomies(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.taxonomies);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTaxonomy
You can execute the `GetTaxonomy` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetTaxonomy(dc: DataConnect, vars: GetTaxonomyVariables, options?: useDataConnectQueryOptions<GetTaxonomyData>): UseDataConnectQueryResult<GetTaxonomyData, GetTaxonomyVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTaxonomy(vars: GetTaxonomyVariables, options?: useDataConnectQueryOptions<GetTaxonomyData>): UseDataConnectQueryResult<GetTaxonomyData, GetTaxonomyVariables>;
```

### Variables
The `GetTaxonomy` Query requires an argument of type `GetTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetTaxonomyVariables {
  taxonomyId: UUIDString;
}
```
### Return Type
Recall that calling the `GetTaxonomy` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTaxonomy` Query is of type `GetTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTaxonomy`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTaxonomyVariables } from '@dataconnect/generated';
import { useGetTaxonomy } from '@dataconnect/generated/react'

export default function GetTaxonomyComponent() {
  // The `useGetTaxonomy` Query hook requires an argument of type `GetTaxonomyVariables`:
  const getTaxonomyVars: GetTaxonomyVariables = {
    taxonomyId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTaxonomy(getTaxonomyVars);
  // Variables can be defined inline as well.
  const query = useGetTaxonomy({ taxonomyId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTaxonomy(dataConnect, getTaxonomyVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTaxonomy(getTaxonomyVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTaxonomy(dataConnect, getTaxonomyVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.taxonomy);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTaxonomyByCode
You can execute the `GetTaxonomyByCode` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetTaxonomyByCode(dc: DataConnect, vars: GetTaxonomyByCodeVariables, options?: useDataConnectQueryOptions<GetTaxonomyByCodeData>): UseDataConnectQueryResult<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTaxonomyByCode(vars: GetTaxonomyByCodeVariables, options?: useDataConnectQueryOptions<GetTaxonomyByCodeData>): UseDataConnectQueryResult<GetTaxonomyByCodeData, GetTaxonomyByCodeVariables>;
```

### Variables
The `GetTaxonomyByCode` Query requires an argument of type `GetTaxonomyByCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetTaxonomyByCodeVariables {
  code: string;
}
```
### Return Type
Recall that calling the `GetTaxonomyByCode` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTaxonomyByCode` Query is of type `GetTaxonomyByCodeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTaxonomyByCode`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTaxonomyByCodeVariables } from '@dataconnect/generated';
import { useGetTaxonomyByCode } from '@dataconnect/generated/react'

export default function GetTaxonomyByCodeComponent() {
  // The `useGetTaxonomyByCode` Query hook requires an argument of type `GetTaxonomyByCodeVariables`:
  const getTaxonomyByCodeVars: GetTaxonomyByCodeVariables = {
    code: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTaxonomyByCode(getTaxonomyByCodeVars);
  // Variables can be defined inline as well.
  const query = useGetTaxonomyByCode({ code: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTaxonomyByCode(dataConnect, getTaxonomyByCodeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTaxonomyByCode(getTaxonomyByCodeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTaxonomyByCode(dataConnect, getTaxonomyByCodeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.taxonomies);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTaxonomiesByLevel
You can execute the `ListTaxonomiesByLevel` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListTaxonomiesByLevel(dc: DataConnect, options?: useDataConnectQueryOptions<ListTaxonomiesByLevelData>): UseDataConnectQueryResult<ListTaxonomiesByLevelData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTaxonomiesByLevel(options?: useDataConnectQueryOptions<ListTaxonomiesByLevelData>): UseDataConnectQueryResult<ListTaxonomiesByLevelData, undefined>;
```

### Variables
The `ListTaxonomiesByLevel` Query has no variables.
### Return Type
Recall that calling the `ListTaxonomiesByLevel` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTaxonomiesByLevel` Query is of type `ListTaxonomiesByLevelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTaxonomiesByLevel`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListTaxonomiesByLevel } from '@dataconnect/generated/react'

export default function ListTaxonomiesByLevelComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTaxonomiesByLevel();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTaxonomiesByLevel(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTaxonomiesByLevel(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTaxonomiesByLevel(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.taxonomies);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListQuestionsByUser
You can execute the `ListQuestionsByUser` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListQuestionsByUser(dc: DataConnect, vars: ListQuestionsByUserVariables, options?: useDataConnectQueryOptions<ListQuestionsByUserData>): UseDataConnectQueryResult<ListQuestionsByUserData, ListQuestionsByUserVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListQuestionsByUser(vars: ListQuestionsByUserVariables, options?: useDataConnectQueryOptions<ListQuestionsByUserData>): UseDataConnectQueryResult<ListQuestionsByUserData, ListQuestionsByUserVariables>;
```

### Variables
The `ListQuestionsByUser` Query requires an argument of type `ListQuestionsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListQuestionsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ListQuestionsByUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListQuestionsByUser` Query is of type `ListQuestionsByUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListQuestionsByUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListQuestionsByUserVariables } from '@dataconnect/generated';
import { useListQuestionsByUser } from '@dataconnect/generated/react'

export default function ListQuestionsByUserComponent() {
  // The `useListQuestionsByUser` Query hook requires an argument of type `ListQuestionsByUserVariables`:
  const listQuestionsByUserVars: ListQuestionsByUserVariables = {
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListQuestionsByUser(listQuestionsByUserVars);
  // Variables can be defined inline as well.
  const query = useListQuestionsByUser({ userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListQuestionsByUser(dataConnect, listQuestionsByUserVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListQuestionsByUser(listQuestionsByUserVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListQuestionsByUser(dataConnect, listQuestionsByUserVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetDashboardQuestions
You can execute the `GetDashboardQuestions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetDashboardQuestions(dc: DataConnect, vars: GetDashboardQuestionsVariables, options?: useDataConnectQueryOptions<GetDashboardQuestionsData>): UseDataConnectQueryResult<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetDashboardQuestions(vars: GetDashboardQuestionsVariables, options?: useDataConnectQueryOptions<GetDashboardQuestionsData>): UseDataConnectQueryResult<GetDashboardQuestionsData, GetDashboardQuestionsVariables>;
```

### Variables
The `GetDashboardQuestions` Query requires an argument of type `GetDashboardQuestionsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetDashboardQuestionsVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetDashboardQuestions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetDashboardQuestions` Query is of type `GetDashboardQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetDashboardQuestions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetDashboardQuestionsVariables } from '@dataconnect/generated';
import { useGetDashboardQuestions } from '@dataconnect/generated/react'

export default function GetDashboardQuestionsComponent() {
  // The `useGetDashboardQuestions` Query hook requires an argument of type `GetDashboardQuestionsVariables`:
  const getDashboardQuestionsVars: GetDashboardQuestionsVariables = {
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetDashboardQuestions(getDashboardQuestionsVars);
  // Variables can be defined inline as well.
  const query = useGetDashboardQuestions({ userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetDashboardQuestions(dataConnect, getDashboardQuestionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetDashboardQuestions(getDashboardQuestionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetDashboardQuestions(dataConnect, getDashboardQuestionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetDashboardSystemData
You can execute the `GetDashboardSystemData` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetDashboardSystemData(dc: DataConnect, options?: useDataConnectQueryOptions<GetDashboardSystemDataData>): UseDataConnectQueryResult<GetDashboardSystemDataData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetDashboardSystemData(options?: useDataConnectQueryOptions<GetDashboardSystemDataData>): UseDataConnectQueryResult<GetDashboardSystemDataData, undefined>;
```

### Variables
The `GetDashboardSystemData` Query has no variables.
### Return Type
Recall that calling the `GetDashboardSystemData` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetDashboardSystemData` Query is of type `GetDashboardSystemDataData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetDashboardSystemData`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetDashboardSystemData } from '@dataconnect/generated/react'

export default function GetDashboardSystemDataComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetDashboardSystemData();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetDashboardSystemData(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetDashboardSystemData(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetDashboardSystemData(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.taxonomies);
    console.log(query.data.difficulties);
    console.log(query.data.questionTypes);
    console.log(query.data.subjects);
    console.log(query.data.units);
    console.log(query.data.topics);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuestion
You can execute the `GetQuestion` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuestion(dc: DataConnect, vars: GetQuestionVariables, options?: useDataConnectQueryOptions<GetQuestionData>): UseDataConnectQueryResult<GetQuestionData, GetQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuestion(vars: GetQuestionVariables, options?: useDataConnectQueryOptions<GetQuestionData>): UseDataConnectQueryResult<GetQuestionData, GetQuestionVariables>;
```

### Variables
The `GetQuestion` Query requires an argument of type `GetQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuestionVariables {
  questionId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetQuestion` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuestion` Query is of type `GetQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuestion`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuestionVariables } from '@dataconnect/generated';
import { useGetQuestion } from '@dataconnect/generated/react'

export default function GetQuestionComponent() {
  // The `useGetQuestion` Query hook requires an argument of type `GetQuestionVariables`:
  const getQuestionVars: GetQuestionVariables = {
    questionId: ..., 
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuestion(getQuestionVars);
  // Variables can be defined inline as well.
  const query = useGetQuestion({ questionId: ..., userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuestion(dataConnect, getQuestionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestion(getQuestionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestion(dataConnect, getQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questions);
    console.log(query.data.questionOptions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListPublicQuestions
You can execute the `ListPublicQuestions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListPublicQuestions(dc: DataConnect, options?: useDataConnectQueryOptions<ListPublicQuestionsData>): UseDataConnectQueryResult<ListPublicQuestionsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListPublicQuestions(options?: useDataConnectQueryOptions<ListPublicQuestionsData>): UseDataConnectQueryResult<ListPublicQuestionsData, undefined>;
```

### Variables
The `ListPublicQuestions` Query has no variables.
### Return Type
Recall that calling the `ListPublicQuestions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListPublicQuestions` Query is of type `ListPublicQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListPublicQuestions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListPublicQuestions } from '@dataconnect/generated/react'

export default function ListPublicQuestionsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListPublicQuestions();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListPublicQuestions(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListPublicQuestions(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListPublicQuestions(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListPublicQuestionsByDifficulty
You can execute the `ListPublicQuestionsByDifficulty` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListPublicQuestionsByDifficulty(dc: DataConnect, vars: ListPublicQuestionsByDifficultyVariables, options?: useDataConnectQueryOptions<ListPublicQuestionsByDifficultyData>): UseDataConnectQueryResult<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListPublicQuestionsByDifficulty(vars: ListPublicQuestionsByDifficultyVariables, options?: useDataConnectQueryOptions<ListPublicQuestionsByDifficultyData>): UseDataConnectQueryResult<ListPublicQuestionsByDifficultyData, ListPublicQuestionsByDifficultyVariables>;
```

### Variables
The `ListPublicQuestionsByDifficulty` Query requires an argument of type `ListPublicQuestionsByDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListPublicQuestionsByDifficultyVariables {
  difficultyId: UUIDString;
}
```
### Return Type
Recall that calling the `ListPublicQuestionsByDifficulty` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListPublicQuestionsByDifficulty` Query is of type `ListPublicQuestionsByDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListPublicQuestionsByDifficulty`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListPublicQuestionsByDifficultyVariables } from '@dataconnect/generated';
import { useListPublicQuestionsByDifficulty } from '@dataconnect/generated/react'

export default function ListPublicQuestionsByDifficultyComponent() {
  // The `useListPublicQuestionsByDifficulty` Query hook requires an argument of type `ListPublicQuestionsByDifficultyVariables`:
  const listPublicQuestionsByDifficultyVars: ListPublicQuestionsByDifficultyVariables = {
    difficultyId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListPublicQuestionsByDifficulty(listPublicQuestionsByDifficultyVars);
  // Variables can be defined inline as well.
  const query = useListPublicQuestionsByDifficulty({ difficultyId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListPublicQuestionsByDifficulty(dataConnect, listPublicQuestionsByDifficultyVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListPublicQuestionsByDifficulty(listPublicQuestionsByDifficultyVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListPublicQuestionsByDifficulty(dataConnect, listPublicQuestionsByDifficultyVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListPublicQuestionsByType
You can execute the `ListPublicQuestionsByType` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListPublicQuestionsByType(dc: DataConnect, vars: ListPublicQuestionsByTypeVariables, options?: useDataConnectQueryOptions<ListPublicQuestionsByTypeData>): UseDataConnectQueryResult<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListPublicQuestionsByType(vars: ListPublicQuestionsByTypeVariables, options?: useDataConnectQueryOptions<ListPublicQuestionsByTypeData>): UseDataConnectQueryResult<ListPublicQuestionsByTypeData, ListPublicQuestionsByTypeVariables>;
```

### Variables
The `ListPublicQuestionsByType` Query requires an argument of type `ListPublicQuestionsByTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListPublicQuestionsByTypeVariables {
  questionTypeId: UUIDString;
}
```
### Return Type
Recall that calling the `ListPublicQuestionsByType` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListPublicQuestionsByType` Query is of type `ListPublicQuestionsByTypeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListPublicQuestionsByType`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListPublicQuestionsByTypeVariables } from '@dataconnect/generated';
import { useListPublicQuestionsByType } from '@dataconnect/generated/react'

export default function ListPublicQuestionsByTypeComponent() {
  // The `useListPublicQuestionsByType` Query hook requires an argument of type `ListPublicQuestionsByTypeVariables`:
  const listPublicQuestionsByTypeVars: ListPublicQuestionsByTypeVariables = {
    questionTypeId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListPublicQuestionsByType(listPublicQuestionsByTypeVars);
  // Variables can be defined inline as well.
  const query = useListPublicQuestionsByType({ questionTypeId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListPublicQuestionsByType(dataConnect, listPublicQuestionsByTypeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListPublicQuestionsByType(listPublicQuestionsByTypeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListPublicQuestionsByType(dataConnect, listPublicQuestionsByTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuestionOptions
You can execute the `GetQuestionOptions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuestionOptions(dc: DataConnect, vars: GetQuestionOptionsVariables, options?: useDataConnectQueryOptions<GetQuestionOptionsData>): UseDataConnectQueryResult<GetQuestionOptionsData, GetQuestionOptionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuestionOptions(vars: GetQuestionOptionsVariables, options?: useDataConnectQueryOptions<GetQuestionOptionsData>): UseDataConnectQueryResult<GetQuestionOptionsData, GetQuestionOptionsVariables>;
```

### Variables
The `GetQuestionOptions` Query requires an argument of type `GetQuestionOptionsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuestionOptionsVariables {
  questionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuestionOptions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuestionOptions` Query is of type `GetQuestionOptionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuestionOptions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuestionOptionsVariables } from '@dataconnect/generated';
import { useGetQuestionOptions } from '@dataconnect/generated/react'

export default function GetQuestionOptionsComponent() {
  // The `useGetQuestionOptions` Query hook requires an argument of type `GetQuestionOptionsVariables`:
  const getQuestionOptionsVars: GetQuestionOptionsVariables = {
    questionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuestionOptions(getQuestionOptionsVars);
  // Variables can be defined inline as well.
  const query = useGetQuestionOptions({ questionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuestionOptions(dataConnect, getQuestionOptionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionOptions(getQuestionOptionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionOptions(dataConnect, getQuestionOptionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questionOptions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAllCoursesByUser
You can execute the `GetAllCoursesByUser` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetAllCoursesByUser(dc: DataConnect, vars: GetAllCoursesByUserVariables, options?: useDataConnectQueryOptions<GetAllCoursesByUserData>): UseDataConnectQueryResult<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAllCoursesByUser(vars: GetAllCoursesByUserVariables, options?: useDataConnectQueryOptions<GetAllCoursesByUserData>): UseDataConnectQueryResult<GetAllCoursesByUserData, GetAllCoursesByUserVariables>;
```

### Variables
The `GetAllCoursesByUser` Query requires an argument of type `GetAllCoursesByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAllCoursesByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetAllCoursesByUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAllCoursesByUser` Query is of type `GetAllCoursesByUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAllCoursesByUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAllCoursesByUserVariables } from '@dataconnect/generated';
import { useGetAllCoursesByUser } from '@dataconnect/generated/react'

export default function GetAllCoursesByUserComponent() {
  // The `useGetAllCoursesByUser` Query hook requires an argument of type `GetAllCoursesByUserVariables`:
  const getAllCoursesByUserVars: GetAllCoursesByUserVariables = {
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAllCoursesByUser(getAllCoursesByUserVars);
  // Variables can be defined inline as well.
  const query = useGetAllCoursesByUser({ userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAllCoursesByUser(dataConnect, getAllCoursesByUserVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllCoursesByUser(getAllCoursesByUserVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllCoursesByUser(dataConnect, getAllCoursesByUserVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseByCode
You can execute the `GetCourseByCode` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseByCode(dc: DataConnect, vars: GetCourseByCodeVariables, options?: useDataConnectQueryOptions<GetCourseByCodeData>): UseDataConnectQueryResult<GetCourseByCodeData, GetCourseByCodeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseByCode(vars: GetCourseByCodeVariables, options?: useDataConnectQueryOptions<GetCourseByCodeData>): UseDataConnectQueryResult<GetCourseByCodeData, GetCourseByCodeVariables>;
```

### Variables
The `GetCourseByCode` Query requires an argument of type `GetCourseByCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseByCodeVariables {
  userId: UUIDString;
  code: string;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetCourseByCode` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseByCode` Query is of type `GetCourseByCodeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseByCode`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseByCodeVariables } from '@dataconnect/generated';
import { useGetCourseByCode } from '@dataconnect/generated/react'

export default function GetCourseByCodeComponent() {
  // The `useGetCourseByCode` Query hook requires an argument of type `GetCourseByCodeVariables`:
  const getCourseByCodeVars: GetCourseByCodeVariables = {
    userId: ..., 
    code: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseByCode(getCourseByCodeVars);
  // Variables can be defined inline as well.
  const query = useGetCourseByCode({ userId: ..., code: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseByCode(dataConnect, getCourseByCodeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseByCode(getCourseByCodeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseByCode(dataConnect, getCourseByCodeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCoursesByInstitution
You can execute the `GetCoursesByInstitution` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCoursesByInstitution(dc: DataConnect, vars: GetCoursesByInstitutionVariables, options?: useDataConnectQueryOptions<GetCoursesByInstitutionData>): UseDataConnectQueryResult<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCoursesByInstitution(vars: GetCoursesByInstitutionVariables, options?: useDataConnectQueryOptions<GetCoursesByInstitutionData>): UseDataConnectQueryResult<GetCoursesByInstitutionData, GetCoursesByInstitutionVariables>;
```

### Variables
The `GetCoursesByInstitution` Query requires an argument of type `GetCoursesByInstitutionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCoursesByInstitutionVariables {
  userId: UUIDString;
  institutionName: string;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetCoursesByInstitution` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCoursesByInstitution` Query is of type `GetCoursesByInstitutionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCoursesByInstitution`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCoursesByInstitutionVariables } from '@dataconnect/generated';
import { useGetCoursesByInstitution } from '@dataconnect/generated/react'

export default function GetCoursesByInstitutionComponent() {
  // The `useGetCoursesByInstitution` Query hook requires an argument of type `GetCoursesByInstitutionVariables`:
  const getCoursesByInstitutionVars: GetCoursesByInstitutionVariables = {
    userId: ..., 
    institutionName: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCoursesByInstitution(getCoursesByInstitutionVars);
  // Variables can be defined inline as well.
  const query = useGetCoursesByInstitution({ userId: ..., institutionName: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCoursesByInstitution(dataConnect, getCoursesByInstitutionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesByInstitution(getCoursesByInstitutionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesByInstitution(dataConnect, getCoursesByInstitutionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCoursesByEducationalLevel
You can execute the `GetCoursesByEducationalLevel` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCoursesByEducationalLevel(dc: DataConnect, vars: GetCoursesByEducationalLevelVariables, options?: useDataConnectQueryOptions<GetCoursesByEducationalLevelData>): UseDataConnectQueryResult<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCoursesByEducationalLevel(vars: GetCoursesByEducationalLevelVariables, options?: useDataConnectQueryOptions<GetCoursesByEducationalLevelData>): UseDataConnectQueryResult<GetCoursesByEducationalLevelData, GetCoursesByEducationalLevelVariables>;
```

### Variables
The `GetCoursesByEducationalLevel` Query requires an argument of type `GetCoursesByEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCoursesByEducationalLevelVariables {
  userId: UUIDString;
  levelId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetCoursesByEducationalLevel` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCoursesByEducationalLevel` Query is of type `GetCoursesByEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCoursesByEducationalLevel`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCoursesByEducationalLevelVariables } from '@dataconnect/generated';
import { useGetCoursesByEducationalLevel } from '@dataconnect/generated/react'

export default function GetCoursesByEducationalLevelComponent() {
  // The `useGetCoursesByEducationalLevel` Query hook requires an argument of type `GetCoursesByEducationalLevelVariables`:
  const getCoursesByEducationalLevelVars: GetCoursesByEducationalLevelVariables = {
    userId: ..., 
    levelId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCoursesByEducationalLevel(getCoursesByEducationalLevelVars);
  // Variables can be defined inline as well.
  const query = useGetCoursesByEducationalLevel({ userId: ..., levelId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCoursesByEducationalLevel(dataConnect, getCoursesByEducationalLevelVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesByEducationalLevel(getCoursesByEducationalLevelVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesByEducationalLevel(dataConnect, getCoursesByEducationalLevelVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEvaluationById
You can execute the `GetEvaluationById` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEvaluationById(dc: DataConnect, vars: GetEvaluationByIdVariables, options?: useDataConnectQueryOptions<GetEvaluationByIdData>): UseDataConnectQueryResult<GetEvaluationByIdData, GetEvaluationByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEvaluationById(vars: GetEvaluationByIdVariables, options?: useDataConnectQueryOptions<GetEvaluationByIdData>): UseDataConnectQueryResult<GetEvaluationByIdData, GetEvaluationByIdVariables>;
```

### Variables
The `GetEvaluationById` Query requires an argument of type `GetEvaluationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEvaluationByIdVariables {
  userId: UUIDString;
  evaluationId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetEvaluationById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEvaluationById` Query is of type `GetEvaluationByIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEvaluationById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEvaluationByIdVariables } from '@dataconnect/generated';
import { useGetEvaluationById } from '@dataconnect/generated/react'

export default function GetEvaluationByIdComponent() {
  // The `useGetEvaluationById` Query hook requires an argument of type `GetEvaluationByIdVariables`:
  const getEvaluationByIdVars: GetEvaluationByIdVariables = {
    userId: ..., 
    evaluationId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEvaluationById(getEvaluationByIdVars);
  // Variables can be defined inline as well.
  const query = useGetEvaluationById({ userId: ..., evaluationId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEvaluationById(dataConnect, getEvaluationByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationById(getEvaluationByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationById(dataConnect, getEvaluationByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.evaluations);
    console.log(query.data.evaluationQuestions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAllEvaluationsByUser
You can execute the `GetAllEvaluationsByUser` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetAllEvaluationsByUser(dc: DataConnect, vars: GetAllEvaluationsByUserVariables, options?: useDataConnectQueryOptions<GetAllEvaluationsByUserData>): UseDataConnectQueryResult<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAllEvaluationsByUser(vars: GetAllEvaluationsByUserVariables, options?: useDataConnectQueryOptions<GetAllEvaluationsByUserData>): UseDataConnectQueryResult<GetAllEvaluationsByUserData, GetAllEvaluationsByUserVariables>;
```

### Variables
The `GetAllEvaluationsByUser` Query requires an argument of type `GetAllEvaluationsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAllEvaluationsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetAllEvaluationsByUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAllEvaluationsByUser` Query is of type `GetAllEvaluationsByUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAllEvaluationsByUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAllEvaluationsByUserVariables } from '@dataconnect/generated';
import { useGetAllEvaluationsByUser } from '@dataconnect/generated/react'

export default function GetAllEvaluationsByUserComponent() {
  // The `useGetAllEvaluationsByUser` Query hook requires an argument of type `GetAllEvaluationsByUserVariables`:
  const getAllEvaluationsByUserVars: GetAllEvaluationsByUserVariables = {
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAllEvaluationsByUser(getAllEvaluationsByUserVars);
  // Variables can be defined inline as well.
  const query = useGetAllEvaluationsByUser({ userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAllEvaluationsByUser(dataConnect, getAllEvaluationsByUserVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllEvaluationsByUser(getAllEvaluationsByUserVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllEvaluationsByUser(dataConnect, getAllEvaluationsByUserVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.evaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEvaluationsByState
You can execute the `GetEvaluationsByState` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEvaluationsByState(dc: DataConnect, vars: GetEvaluationsByStateVariables, options?: useDataConnectQueryOptions<GetEvaluationsByStateData>): UseDataConnectQueryResult<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEvaluationsByState(vars: GetEvaluationsByStateVariables, options?: useDataConnectQueryOptions<GetEvaluationsByStateData>): UseDataConnectQueryResult<GetEvaluationsByStateData, GetEvaluationsByStateVariables>;
```

### Variables
The `GetEvaluationsByState` Query requires an argument of type `GetEvaluationsByStateVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEvaluationsByStateVariables {
  userId: UUIDString;
  state: string;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetEvaluationsByState` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEvaluationsByState` Query is of type `GetEvaluationsByStateData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEvaluationsByState`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEvaluationsByStateVariables } from '@dataconnect/generated';
import { useGetEvaluationsByState } from '@dataconnect/generated/react'

export default function GetEvaluationsByStateComponent() {
  // The `useGetEvaluationsByState` Query hook requires an argument of type `GetEvaluationsByStateVariables`:
  const getEvaluationsByStateVars: GetEvaluationsByStateVariables = {
    userId: ..., 
    state: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEvaluationsByState(getEvaluationsByStateVars);
  // Variables can be defined inline as well.
  const query = useGetEvaluationsByState({ userId: ..., state: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEvaluationsByState(dataConnect, getEvaluationsByStateVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationsByState(getEvaluationsByStateVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationsByState(dataConnect, getEvaluationsByStateVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.evaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEvaluationsBySubject
You can execute the `GetEvaluationsBySubject` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEvaluationsBySubject(dc: DataConnect, vars: GetEvaluationsBySubjectVariables, options?: useDataConnectQueryOptions<GetEvaluationsBySubjectData>): UseDataConnectQueryResult<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEvaluationsBySubject(vars: GetEvaluationsBySubjectVariables, options?: useDataConnectQueryOptions<GetEvaluationsBySubjectData>): UseDataConnectQueryResult<GetEvaluationsBySubjectData, GetEvaluationsBySubjectVariables>;
```

### Variables
The `GetEvaluationsBySubject` Query requires an argument of type `GetEvaluationsBySubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEvaluationsBySubjectVariables {
  userId: UUIDString;
  subjectId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetEvaluationsBySubject` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEvaluationsBySubject` Query is of type `GetEvaluationsBySubjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEvaluationsBySubject`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEvaluationsBySubjectVariables } from '@dataconnect/generated';
import { useGetEvaluationsBySubject } from '@dataconnect/generated/react'

export default function GetEvaluationsBySubjectComponent() {
  // The `useGetEvaluationsBySubject` Query hook requires an argument of type `GetEvaluationsBySubjectVariables`:
  const getEvaluationsBySubjectVars: GetEvaluationsBySubjectVariables = {
    userId: ..., 
    subjectId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEvaluationsBySubject(getEvaluationsBySubjectVars);
  // Variables can be defined inline as well.
  const query = useGetEvaluationsBySubject({ userId: ..., subjectId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEvaluationsBySubject(dataConnect, getEvaluationsBySubjectVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationsBySubject(getEvaluationsBySubjectVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationsBySubject(dataConnect, getEvaluationsBySubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.evaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEvaluationsByCourse
You can execute the `GetEvaluationsByCourse` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEvaluationsByCourse(dc: DataConnect, vars: GetEvaluationsByCourseVariables, options?: useDataConnectQueryOptions<GetEvaluationsByCourseData>): UseDataConnectQueryResult<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEvaluationsByCourse(vars: GetEvaluationsByCourseVariables, options?: useDataConnectQueryOptions<GetEvaluationsByCourseData>): UseDataConnectQueryResult<GetEvaluationsByCourseData, GetEvaluationsByCourseVariables>;
```

### Variables
The `GetEvaluationsByCourse` Query requires an argument of type `GetEvaluationsByCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEvaluationsByCourseVariables {
  userId: UUIDString;
  courseId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetEvaluationsByCourse` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEvaluationsByCourse` Query is of type `GetEvaluationsByCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEvaluationsByCourse`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEvaluationsByCourseVariables } from '@dataconnect/generated';
import { useGetEvaluationsByCourse } from '@dataconnect/generated/react'

export default function GetEvaluationsByCourseComponent() {
  // The `useGetEvaluationsByCourse` Query hook requires an argument of type `GetEvaluationsByCourseVariables`:
  const getEvaluationsByCourseVars: GetEvaluationsByCourseVariables = {
    userId: ..., 
    courseId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEvaluationsByCourse(getEvaluationsByCourseVars);
  // Variables can be defined inline as well.
  const query = useGetEvaluationsByCourse({ userId: ..., courseId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEvaluationsByCourse(dataConnect, getEvaluationsByCourseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationsByCourse(getEvaluationsByCourseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationsByCourse(dataConnect, getEvaluationsByCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseEvaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEvaluationFullDetail
You can execute the `GetEvaluationFullDetail` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEvaluationFullDetail(dc: DataConnect, vars: GetEvaluationFullDetailVariables, options?: useDataConnectQueryOptions<GetEvaluationFullDetailData>): UseDataConnectQueryResult<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEvaluationFullDetail(vars: GetEvaluationFullDetailVariables, options?: useDataConnectQueryOptions<GetEvaluationFullDetailData>): UseDataConnectQueryResult<GetEvaluationFullDetailData, GetEvaluationFullDetailVariables>;
```

### Variables
The `GetEvaluationFullDetail` Query requires an argument of type `GetEvaluationFullDetailVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEvaluationFullDetailVariables {
  userId: UUIDString;
  evaluationId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetEvaluationFullDetail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEvaluationFullDetail` Query is of type `GetEvaluationFullDetailData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEvaluationFullDetail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEvaluationFullDetailVariables } from '@dataconnect/generated';
import { useGetEvaluationFullDetail } from '@dataconnect/generated/react'

export default function GetEvaluationFullDetailComponent() {
  // The `useGetEvaluationFullDetail` Query hook requires an argument of type `GetEvaluationFullDetailVariables`:
  const getEvaluationFullDetailVars: GetEvaluationFullDetailVariables = {
    userId: ..., 
    evaluationId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEvaluationFullDetail(getEvaluationFullDetailVars);
  // Variables can be defined inline as well.
  const query = useGetEvaluationFullDetail({ userId: ..., evaluationId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEvaluationFullDetail(dataConnect, getEvaluationFullDetailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationFullDetail(getEvaluationFullDetailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationFullDetail(dataConnect, getEvaluationFullDetailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.evaluations);
    console.log(query.data.evaluationQuestions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEvaluationQuestions
You can execute the `GetEvaluationQuestions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEvaluationQuestions(dc: DataConnect, vars: GetEvaluationQuestionsVariables, options?: useDataConnectQueryOptions<GetEvaluationQuestionsData>): UseDataConnectQueryResult<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEvaluationQuestions(vars: GetEvaluationQuestionsVariables, options?: useDataConnectQueryOptions<GetEvaluationQuestionsData>): UseDataConnectQueryResult<GetEvaluationQuestionsData, GetEvaluationQuestionsVariables>;
```

### Variables
The `GetEvaluationQuestions` Query requires an argument of type `GetEvaluationQuestionsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEvaluationQuestionsVariables {
  evaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetEvaluationQuestions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEvaluationQuestions` Query is of type `GetEvaluationQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEvaluationQuestions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEvaluationQuestionsVariables } from '@dataconnect/generated';
import { useGetEvaluationQuestions } from '@dataconnect/generated/react'

export default function GetEvaluationQuestionsComponent() {
  // The `useGetEvaluationQuestions` Query hook requires an argument of type `GetEvaluationQuestionsVariables`:
  const getEvaluationQuestionsVars: GetEvaluationQuestionsVariables = {
    evaluationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEvaluationQuestions(getEvaluationQuestionsVars);
  // Variables can be defined inline as well.
  const query = useGetEvaluationQuestions({ evaluationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEvaluationQuestions(dataConnect, getEvaluationQuestionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationQuestions(getEvaluationQuestionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationQuestions(dataConnect, getEvaluationQuestionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.evaluationQuestions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAllStudentsByUser
You can execute the `GetAllStudentsByUser` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetAllStudentsByUser(dc: DataConnect, vars: GetAllStudentsByUserVariables, options?: useDataConnectQueryOptions<GetAllStudentsByUserData>): UseDataConnectQueryResult<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAllStudentsByUser(vars: GetAllStudentsByUserVariables, options?: useDataConnectQueryOptions<GetAllStudentsByUserData>): UseDataConnectQueryResult<GetAllStudentsByUserData, GetAllStudentsByUserVariables>;
```

### Variables
The `GetAllStudentsByUser` Query requires an argument of type `GetAllStudentsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAllStudentsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetAllStudentsByUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAllStudentsByUser` Query is of type `GetAllStudentsByUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAllStudentsByUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAllStudentsByUserVariables } from '@dataconnect/generated';
import { useGetAllStudentsByUser } from '@dataconnect/generated/react'

export default function GetAllStudentsByUserComponent() {
  // The `useGetAllStudentsByUser` Query hook requires an argument of type `GetAllStudentsByUserVariables`:
  const getAllStudentsByUserVars: GetAllStudentsByUserVariables = {
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAllStudentsByUser(getAllStudentsByUserVars);
  // Variables can be defined inline as well.
  const query = useGetAllStudentsByUser({ userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAllStudentsByUser(dataConnect, getAllStudentsByUserVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllStudentsByUser(getAllStudentsByUserVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllStudentsByUser(dataConnect, getAllStudentsByUserVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.students);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentById
You can execute the `GetStudentById` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentById(dc: DataConnect, vars: GetStudentByIdVariables, options?: useDataConnectQueryOptions<GetStudentByIdData>): UseDataConnectQueryResult<GetStudentByIdData, GetStudentByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentById(vars: GetStudentByIdVariables, options?: useDataConnectQueryOptions<GetStudentByIdData>): UseDataConnectQueryResult<GetStudentByIdData, GetStudentByIdVariables>;
```

### Variables
The `GetStudentById` Query requires an argument of type `GetStudentByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentByIdVariables {
  userId: UUIDString;
  studentId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetStudentById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentById` Query is of type `GetStudentByIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentByIdVariables } from '@dataconnect/generated';
import { useGetStudentById } from '@dataconnect/generated/react'

export default function GetStudentByIdComponent() {
  // The `useGetStudentById` Query hook requires an argument of type `GetStudentByIdVariables`:
  const getStudentByIdVars: GetStudentByIdVariables = {
    userId: ..., 
    studentId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentById(getStudentByIdVars);
  // Variables can be defined inline as well.
  const query = useGetStudentById({ userId: ..., studentId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentById(dataConnect, getStudentByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentById(getStudentByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentById(dataConnect, getStudentByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.students);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentByIdentifier
You can execute the `GetStudentByIdentifier` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentByIdentifier(dc: DataConnect, vars: GetStudentByIdentifierVariables, options?: useDataConnectQueryOptions<GetStudentByIdentifierData>): UseDataConnectQueryResult<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentByIdentifier(vars: GetStudentByIdentifierVariables, options?: useDataConnectQueryOptions<GetStudentByIdentifierData>): UseDataConnectQueryResult<GetStudentByIdentifierData, GetStudentByIdentifierVariables>;
```

### Variables
The `GetStudentByIdentifier` Query requires an argument of type `GetStudentByIdentifierVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentByIdentifierVariables {
  userId: UUIDString;
  identifier: string;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetStudentByIdentifier` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentByIdentifier` Query is of type `GetStudentByIdentifierData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentByIdentifier`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentByIdentifierVariables } from '@dataconnect/generated';
import { useGetStudentByIdentifier } from '@dataconnect/generated/react'

export default function GetStudentByIdentifierComponent() {
  // The `useGetStudentByIdentifier` Query hook requires an argument of type `GetStudentByIdentifierVariables`:
  const getStudentByIdentifierVars: GetStudentByIdentifierVariables = {
    userId: ..., 
    identifier: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentByIdentifier(getStudentByIdentifierVars);
  // Variables can be defined inline as well.
  const query = useGetStudentByIdentifier({ userId: ..., identifier: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentByIdentifier(dataConnect, getStudentByIdentifierVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentByIdentifier(getStudentByIdentifierVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentByIdentifier(dataConnect, getStudentByIdentifierVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.students);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentsByFirstName
You can execute the `GetStudentsByFirstName` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentsByFirstName(dc: DataConnect, vars: GetStudentsByFirstNameVariables, options?: useDataConnectQueryOptions<GetStudentsByFirstNameData>): UseDataConnectQueryResult<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentsByFirstName(vars: GetStudentsByFirstNameVariables, options?: useDataConnectQueryOptions<GetStudentsByFirstNameData>): UseDataConnectQueryResult<GetStudentsByFirstNameData, GetStudentsByFirstNameVariables>;
```

### Variables
The `GetStudentsByFirstName` Query requires an argument of type `GetStudentsByFirstNameVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentsByFirstNameVariables {
  userId: UUIDString;
  firstName: string;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetStudentsByFirstName` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentsByFirstName` Query is of type `GetStudentsByFirstNameData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentsByFirstName`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentsByFirstNameVariables } from '@dataconnect/generated';
import { useGetStudentsByFirstName } from '@dataconnect/generated/react'

export default function GetStudentsByFirstNameComponent() {
  // The `useGetStudentsByFirstName` Query hook requires an argument of type `GetStudentsByFirstNameVariables`:
  const getStudentsByFirstNameVars: GetStudentsByFirstNameVariables = {
    userId: ..., 
    firstName: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentsByFirstName(getStudentsByFirstNameVars);
  // Variables can be defined inline as well.
  const query = useGetStudentsByFirstName({ userId: ..., firstName: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentsByFirstName(dataConnect, getStudentsByFirstNameVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentsByFirstName(getStudentsByFirstNameVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentsByFirstName(dataConnect, getStudentsByFirstNameVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.students);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentsByLastName
You can execute the `GetStudentsByLastName` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentsByLastName(dc: DataConnect, vars: GetStudentsByLastNameVariables, options?: useDataConnectQueryOptions<GetStudentsByLastNameData>): UseDataConnectQueryResult<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentsByLastName(vars: GetStudentsByLastNameVariables, options?: useDataConnectQueryOptions<GetStudentsByLastNameData>): UseDataConnectQueryResult<GetStudentsByLastNameData, GetStudentsByLastNameVariables>;
```

### Variables
The `GetStudentsByLastName` Query requires an argument of type `GetStudentsByLastNameVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentsByLastNameVariables {
  userId: UUIDString;
  lastName: string;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetStudentsByLastName` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentsByLastName` Query is of type `GetStudentsByLastNameData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentsByLastName`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentsByLastNameVariables } from '@dataconnect/generated';
import { useGetStudentsByLastName } from '@dataconnect/generated/react'

export default function GetStudentsByLastNameComponent() {
  // The `useGetStudentsByLastName` Query hook requires an argument of type `GetStudentsByLastNameVariables`:
  const getStudentsByLastNameVars: GetStudentsByLastNameVariables = {
    userId: ..., 
    lastName: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentsByLastName(getStudentsByLastNameVars);
  // Variables can be defined inline as well.
  const query = useGetStudentsByLastName({ userId: ..., lastName: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentsByLastName(dataConnect, getStudentsByLastNameVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentsByLastName(getStudentsByLastNameVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentsByLastName(dataConnect, getStudentsByLastNameVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.students);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentsByCourse
You can execute the `GetStudentsByCourse` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentsByCourse(dc: DataConnect, vars: GetStudentsByCourseVariables, options?: useDataConnectQueryOptions<GetStudentsByCourseData>): UseDataConnectQueryResult<GetStudentsByCourseData, GetStudentsByCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentsByCourse(vars: GetStudentsByCourseVariables, options?: useDataConnectQueryOptions<GetStudentsByCourseData>): UseDataConnectQueryResult<GetStudentsByCourseData, GetStudentsByCourseVariables>;
```

### Variables
The `GetStudentsByCourse` Query requires an argument of type `GetStudentsByCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentsByCourseVariables {
  userId: UUIDString;
  courseId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetStudentsByCourse` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentsByCourse` Query is of type `GetStudentsByCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentsByCourse`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentsByCourseVariables } from '@dataconnect/generated';
import { useGetStudentsByCourse } from '@dataconnect/generated/react'

export default function GetStudentsByCourseComponent() {
  // The `useGetStudentsByCourse` Query hook requires an argument of type `GetStudentsByCourseVariables`:
  const getStudentsByCourseVars: GetStudentsByCourseVariables = {
    userId: ..., 
    courseId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentsByCourse(getStudentsByCourseVars);
  // Variables can be defined inline as well.
  const query = useGetStudentsByCourse({ userId: ..., courseId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentsByCourse(dataConnect, getStudentsByCourseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentsByCourse(getStudentsByCourseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentsByCourse(dataConnect, getStudentsByCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseStudents);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseStudentsDetail
You can execute the `GetCourseStudentsDetail` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseStudentsDetail(dc: DataConnect, vars: GetCourseStudentsDetailVariables, options?: useDataConnectQueryOptions<GetCourseStudentsDetailData>): UseDataConnectQueryResult<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseStudentsDetail(vars: GetCourseStudentsDetailVariables, options?: useDataConnectQueryOptions<GetCourseStudentsDetailData>): UseDataConnectQueryResult<GetCourseStudentsDetailData, GetCourseStudentsDetailVariables>;
```

### Variables
The `GetCourseStudentsDetail` Query requires an argument of type `GetCourseStudentsDetailVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseStudentsDetailVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCourseStudentsDetail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseStudentsDetail` Query is of type `GetCourseStudentsDetailData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseStudentsDetail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseStudentsDetailVariables } from '@dataconnect/generated';
import { useGetCourseStudentsDetail } from '@dataconnect/generated/react'

export default function GetCourseStudentsDetailComponent() {
  // The `useGetCourseStudentsDetail` Query hook requires an argument of type `GetCourseStudentsDetailVariables`:
  const getCourseStudentsDetailVars: GetCourseStudentsDetailVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseStudentsDetail(getCourseStudentsDetailVars);
  // Variables can be defined inline as well.
  const query = useGetCourseStudentsDetail({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseStudentsDetail(dataConnect, getCourseStudentsDetailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseStudentsDetail(getCourseStudentsDetailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseStudentsDetail(dataConnect, getCourseStudentsDetailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseStudents);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseStudentsWithDetails
You can execute the `GetCourseStudentsWithDetails` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseStudentsWithDetails(dc: DataConnect, vars: GetCourseStudentsWithDetailsVariables, options?: useDataConnectQueryOptions<GetCourseStudentsWithDetailsData>): UseDataConnectQueryResult<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseStudentsWithDetails(vars: GetCourseStudentsWithDetailsVariables, options?: useDataConnectQueryOptions<GetCourseStudentsWithDetailsData>): UseDataConnectQueryResult<GetCourseStudentsWithDetailsData, GetCourseStudentsWithDetailsVariables>;
```

### Variables
The `GetCourseStudentsWithDetails` Query requires an argument of type `GetCourseStudentsWithDetailsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseStudentsWithDetailsVariables {
  courseId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetCourseStudentsWithDetails` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseStudentsWithDetails` Query is of type `GetCourseStudentsWithDetailsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseStudentsWithDetails`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseStudentsWithDetailsVariables } from '@dataconnect/generated';
import { useGetCourseStudentsWithDetails } from '@dataconnect/generated/react'

export default function GetCourseStudentsWithDetailsComponent() {
  // The `useGetCourseStudentsWithDetails` Query hook requires an argument of type `GetCourseStudentsWithDetailsVariables`:
  const getCourseStudentsWithDetailsVars: GetCourseStudentsWithDetailsVariables = {
    courseId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseStudentsWithDetails(getCourseStudentsWithDetailsVars);
  // Variables can be defined inline as well.
  const query = useGetCourseStudentsWithDetails({ courseId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseStudentsWithDetails(dataConnect, getCourseStudentsWithDetailsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseStudentsWithDetails(getCourseStudentsWithDetailsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseStudentsWithDetails(dataConnect, getCourseStudentsWithDetailsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseStudents);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentEvaluationById
You can execute the `GetStudentEvaluationById` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentEvaluationById(dc: DataConnect, vars: GetStudentEvaluationByIdVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationByIdData>): UseDataConnectQueryResult<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentEvaluationById(vars: GetStudentEvaluationByIdVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationByIdData>): UseDataConnectQueryResult<GetStudentEvaluationByIdData, GetStudentEvaluationByIdVariables>;
```

### Variables
The `GetStudentEvaluationById` Query requires an argument of type `GetStudentEvaluationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentEvaluationByIdVariables {
  studentEvaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetStudentEvaluationById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentEvaluationById` Query is of type `GetStudentEvaluationByIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentEvaluationById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentEvaluationByIdVariables } from '@dataconnect/generated';
import { useGetStudentEvaluationById } from '@dataconnect/generated/react'

export default function GetStudentEvaluationByIdComponent() {
  // The `useGetStudentEvaluationById` Query hook requires an argument of type `GetStudentEvaluationByIdVariables`:
  const getStudentEvaluationByIdVars: GetStudentEvaluationByIdVariables = {
    studentEvaluationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentEvaluationById(getStudentEvaluationByIdVars);
  // Variables can be defined inline as well.
  const query = useGetStudentEvaluationById({ studentEvaluationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentEvaluationById(dataConnect, getStudentEvaluationByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationById(getStudentEvaluationByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationById(dataConnect, getStudentEvaluationByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.studentCourseEvaluations);
    console.log(query.data.studentEvaluationQuestions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentEvaluationsByStudentId
You can execute the `GetStudentEvaluationsByStudentId` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentEvaluationsByStudentId(dc: DataConnect, vars: GetStudentEvaluationsByStudentIdVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByStudentIdData>): UseDataConnectQueryResult<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentEvaluationsByStudentId(vars: GetStudentEvaluationsByStudentIdVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByStudentIdData>): UseDataConnectQueryResult<GetStudentEvaluationsByStudentIdData, GetStudentEvaluationsByStudentIdVariables>;
```

### Variables
The `GetStudentEvaluationsByStudentId` Query requires an argument of type `GetStudentEvaluationsByStudentIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentEvaluationsByStudentIdVariables {
  studentId: UUIDString;
}
```
### Return Type
Recall that calling the `GetStudentEvaluationsByStudentId` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentEvaluationsByStudentId` Query is of type `GetStudentEvaluationsByStudentIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetStudentEvaluationsByStudentIdData {
  courseStudents: ({
    courseStudentId: UUIDString;
    courseId: UUIDString;
    studentId: UUIDString;
    enrolledOn: DateString;
  } & CourseStudent_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentEvaluationsByStudentId`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentEvaluationsByStudentIdVariables } from '@dataconnect/generated';
import { useGetStudentEvaluationsByStudentId } from '@dataconnect/generated/react'

export default function GetStudentEvaluationsByStudentIdComponent() {
  // The `useGetStudentEvaluationsByStudentId` Query hook requires an argument of type `GetStudentEvaluationsByStudentIdVariables`:
  const getStudentEvaluationsByStudentIdVars: GetStudentEvaluationsByStudentIdVariables = {
    studentId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentEvaluationsByStudentId(getStudentEvaluationsByStudentIdVars);
  // Variables can be defined inline as well.
  const query = useGetStudentEvaluationsByStudentId({ studentId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentEvaluationsByStudentId(dataConnect, getStudentEvaluationsByStudentIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByStudentId(getStudentEvaluationsByStudentIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByStudentId(dataConnect, getStudentEvaluationsByStudentIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseStudents);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentEvaluationsByIdentifier
You can execute the `GetStudentEvaluationsByIdentifier` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentEvaluationsByIdentifier(dc: DataConnect, vars: GetStudentEvaluationsByIdentifierVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByIdentifierData>): UseDataConnectQueryResult<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentEvaluationsByIdentifier(vars: GetStudentEvaluationsByIdentifierVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByIdentifierData>): UseDataConnectQueryResult<GetStudentEvaluationsByIdentifierData, GetStudentEvaluationsByIdentifierVariables>;
```

### Variables
The `GetStudentEvaluationsByIdentifier` Query requires an argument of type `GetStudentEvaluationsByIdentifierVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentEvaluationsByIdentifierVariables {
  identifier: string;
}
```
### Return Type
Recall that calling the `GetStudentEvaluationsByIdentifier` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentEvaluationsByIdentifier` Query is of type `GetStudentEvaluationsByIdentifierData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetStudentEvaluationsByIdentifierData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
  } & Student_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentEvaluationsByIdentifier`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentEvaluationsByIdentifierVariables } from '@dataconnect/generated';
import { useGetStudentEvaluationsByIdentifier } from '@dataconnect/generated/react'

export default function GetStudentEvaluationsByIdentifierComponent() {
  // The `useGetStudentEvaluationsByIdentifier` Query hook requires an argument of type `GetStudentEvaluationsByIdentifierVariables`:
  const getStudentEvaluationsByIdentifierVars: GetStudentEvaluationsByIdentifierVariables = {
    identifier: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentEvaluationsByIdentifier(getStudentEvaluationsByIdentifierVars);
  // Variables can be defined inline as well.
  const query = useGetStudentEvaluationsByIdentifier({ identifier: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentEvaluationsByIdentifier(dataConnect, getStudentEvaluationsByIdentifierVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByIdentifier(getStudentEvaluationsByIdentifierVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByIdentifier(dataConnect, getStudentEvaluationsByIdentifierVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.students);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentEvaluationsByFirstName
You can execute the `GetStudentEvaluationsByFirstName` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentEvaluationsByFirstName(dc: DataConnect, vars: GetStudentEvaluationsByFirstNameVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByFirstNameData>): UseDataConnectQueryResult<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentEvaluationsByFirstName(vars: GetStudentEvaluationsByFirstNameVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByFirstNameData>): UseDataConnectQueryResult<GetStudentEvaluationsByFirstNameData, GetStudentEvaluationsByFirstNameVariables>;
```

### Variables
The `GetStudentEvaluationsByFirstName` Query requires an argument of type `GetStudentEvaluationsByFirstNameVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentEvaluationsByFirstNameVariables {
  firstName: string;
}
```
### Return Type
Recall that calling the `GetStudentEvaluationsByFirstName` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentEvaluationsByFirstName` Query is of type `GetStudentEvaluationsByFirstNameData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetStudentEvaluationsByFirstNameData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
  } & Student_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentEvaluationsByFirstName`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentEvaluationsByFirstNameVariables } from '@dataconnect/generated';
import { useGetStudentEvaluationsByFirstName } from '@dataconnect/generated/react'

export default function GetStudentEvaluationsByFirstNameComponent() {
  // The `useGetStudentEvaluationsByFirstName` Query hook requires an argument of type `GetStudentEvaluationsByFirstNameVariables`:
  const getStudentEvaluationsByFirstNameVars: GetStudentEvaluationsByFirstNameVariables = {
    firstName: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentEvaluationsByFirstName(getStudentEvaluationsByFirstNameVars);
  // Variables can be defined inline as well.
  const query = useGetStudentEvaluationsByFirstName({ firstName: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentEvaluationsByFirstName(dataConnect, getStudentEvaluationsByFirstNameVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByFirstName(getStudentEvaluationsByFirstNameVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByFirstName(dataConnect, getStudentEvaluationsByFirstNameVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.students);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentEvaluationsByLastName
You can execute the `GetStudentEvaluationsByLastName` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentEvaluationsByLastName(dc: DataConnect, vars: GetStudentEvaluationsByLastNameVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByLastNameData>): UseDataConnectQueryResult<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentEvaluationsByLastName(vars: GetStudentEvaluationsByLastNameVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByLastNameData>): UseDataConnectQueryResult<GetStudentEvaluationsByLastNameData, GetStudentEvaluationsByLastNameVariables>;
```

### Variables
The `GetStudentEvaluationsByLastName` Query requires an argument of type `GetStudentEvaluationsByLastNameVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentEvaluationsByLastNameVariables {
  lastName: string;
}
```
### Return Type
Recall that calling the `GetStudentEvaluationsByLastName` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentEvaluationsByLastName` Query is of type `GetStudentEvaluationsByLastNameData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetStudentEvaluationsByLastNameData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
  } & Student_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentEvaluationsByLastName`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentEvaluationsByLastNameVariables } from '@dataconnect/generated';
import { useGetStudentEvaluationsByLastName } from '@dataconnect/generated/react'

export default function GetStudentEvaluationsByLastNameComponent() {
  // The `useGetStudentEvaluationsByLastName` Query hook requires an argument of type `GetStudentEvaluationsByLastNameVariables`:
  const getStudentEvaluationsByLastNameVars: GetStudentEvaluationsByLastNameVariables = {
    lastName: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentEvaluationsByLastName(getStudentEvaluationsByLastNameVars);
  // Variables can be defined inline as well.
  const query = useGetStudentEvaluationsByLastName({ lastName: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentEvaluationsByLastName(dataConnect, getStudentEvaluationsByLastNameVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByLastName(getStudentEvaluationsByLastNameVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByLastName(dataConnect, getStudentEvaluationsByLastNameVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.students);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentEvaluationQuestions
You can execute the `GetStudentEvaluationQuestions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentEvaluationQuestions(dc: DataConnect, vars: GetStudentEvaluationQuestionsVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationQuestionsData>): UseDataConnectQueryResult<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentEvaluationQuestions(vars: GetStudentEvaluationQuestionsVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationQuestionsData>): UseDataConnectQueryResult<GetStudentEvaluationQuestionsData, GetStudentEvaluationQuestionsVariables>;
```

### Variables
The `GetStudentEvaluationQuestions` Query requires an argument of type `GetStudentEvaluationQuestionsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentEvaluationQuestionsVariables {
  studentEvaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetStudentEvaluationQuestions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentEvaluationQuestions` Query is of type `GetStudentEvaluationQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentEvaluationQuestions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentEvaluationQuestionsVariables } from '@dataconnect/generated';
import { useGetStudentEvaluationQuestions } from '@dataconnect/generated/react'

export default function GetStudentEvaluationQuestionsComponent() {
  // The `useGetStudentEvaluationQuestions` Query hook requires an argument of type `GetStudentEvaluationQuestionsVariables`:
  const getStudentEvaluationQuestionsVars: GetStudentEvaluationQuestionsVariables = {
    studentEvaluationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentEvaluationQuestions(getStudentEvaluationQuestionsVars);
  // Variables can be defined inline as well.
  const query = useGetStudentEvaluationQuestions({ studentEvaluationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentEvaluationQuestions(dataConnect, getStudentEvaluationQuestionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationQuestions(getStudentEvaluationQuestionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationQuestions(dataConnect, getStudentEvaluationQuestionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.studentEvaluationQuestions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentAnswerOptions
You can execute the `GetStudentAnswerOptions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentAnswerOptions(dc: DataConnect, vars: GetStudentAnswerOptionsVariables, options?: useDataConnectQueryOptions<GetStudentAnswerOptionsData>): UseDataConnectQueryResult<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentAnswerOptions(vars: GetStudentAnswerOptionsVariables, options?: useDataConnectQueryOptions<GetStudentAnswerOptionsData>): UseDataConnectQueryResult<GetStudentAnswerOptionsData, GetStudentAnswerOptionsVariables>;
```

### Variables
The `GetStudentAnswerOptions` Query requires an argument of type `GetStudentAnswerOptionsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentAnswerOptionsVariables {
  studentEvaluationQuestionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetStudentAnswerOptions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentAnswerOptions` Query is of type `GetStudentAnswerOptionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetStudentAnswerOptionsData {
  studentAnswerOptions: ({
    studentAnswerOptionId: UUIDString;
    studentEvaluationQuestionId: UUIDString;
    questionOptionId: UUIDString;
  } & StudentAnswerOption_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentAnswerOptions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentAnswerOptionsVariables } from '@dataconnect/generated';
import { useGetStudentAnswerOptions } from '@dataconnect/generated/react'

export default function GetStudentAnswerOptionsComponent() {
  // The `useGetStudentAnswerOptions` Query hook requires an argument of type `GetStudentAnswerOptionsVariables`:
  const getStudentAnswerOptionsVars: GetStudentAnswerOptionsVariables = {
    studentEvaluationQuestionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentAnswerOptions(getStudentAnswerOptionsVars);
  // Variables can be defined inline as well.
  const query = useGetStudentAnswerOptions({ studentEvaluationQuestionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentAnswerOptions(dataConnect, getStudentAnswerOptionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentAnswerOptions(getStudentAnswerOptionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentAnswerOptions(dataConnect, getStudentAnswerOptionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.studentAnswerOptions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentEvaluationsByCourseEvaluation
You can execute the `GetStudentEvaluationsByCourseEvaluation` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentEvaluationsByCourseEvaluation(dc: DataConnect, vars: GetStudentEvaluationsByCourseEvaluationVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByCourseEvaluationData>): UseDataConnectQueryResult<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentEvaluationsByCourseEvaluation(vars: GetStudentEvaluationsByCourseEvaluationVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByCourseEvaluationData>): UseDataConnectQueryResult<GetStudentEvaluationsByCourseEvaluationData, GetStudentEvaluationsByCourseEvaluationVariables>;
```

### Variables
The `GetStudentEvaluationsByCourseEvaluation` Query requires an argument of type `GetStudentEvaluationsByCourseEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentEvaluationsByCourseEvaluationVariables {
  courseEvaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetStudentEvaluationsByCourseEvaluation` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentEvaluationsByCourseEvaluation` Query is of type `GetStudentEvaluationsByCourseEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentEvaluationsByCourseEvaluation`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentEvaluationsByCourseEvaluationVariables } from '@dataconnect/generated';
import { useGetStudentEvaluationsByCourseEvaluation } from '@dataconnect/generated/react'

export default function GetStudentEvaluationsByCourseEvaluationComponent() {
  // The `useGetStudentEvaluationsByCourseEvaluation` Query hook requires an argument of type `GetStudentEvaluationsByCourseEvaluationVariables`:
  const getStudentEvaluationsByCourseEvaluationVars: GetStudentEvaluationsByCourseEvaluationVariables = {
    courseEvaluationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentEvaluationsByCourseEvaluation(getStudentEvaluationsByCourseEvaluationVars);
  // Variables can be defined inline as well.
  const query = useGetStudentEvaluationsByCourseEvaluation({ courseEvaluationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentEvaluationsByCourseEvaluation(dataConnect, getStudentEvaluationsByCourseEvaluationVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByCourseEvaluation(getStudentEvaluationsByCourseEvaluationVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByCourseEvaluation(dataConnect, getStudentEvaluationsByCourseEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.studentCourseEvaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentEvaluationsByCourseStudent
You can execute the `GetStudentEvaluationsByCourseStudent` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentEvaluationsByCourseStudent(dc: DataConnect, vars: GetStudentEvaluationsByCourseStudentVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByCourseStudentData>): UseDataConnectQueryResult<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentEvaluationsByCourseStudent(vars: GetStudentEvaluationsByCourseStudentVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationsByCourseStudentData>): UseDataConnectQueryResult<GetStudentEvaluationsByCourseStudentData, GetStudentEvaluationsByCourseStudentVariables>;
```

### Variables
The `GetStudentEvaluationsByCourseStudent` Query requires an argument of type `GetStudentEvaluationsByCourseStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentEvaluationsByCourseStudentVariables {
  courseStudentId: UUIDString;
}
```
### Return Type
Recall that calling the `GetStudentEvaluationsByCourseStudent` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentEvaluationsByCourseStudent` Query is of type `GetStudentEvaluationsByCourseStudentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentEvaluationsByCourseStudent`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentEvaluationsByCourseStudentVariables } from '@dataconnect/generated';
import { useGetStudentEvaluationsByCourseStudent } from '@dataconnect/generated/react'

export default function GetStudentEvaluationsByCourseStudentComponent() {
  // The `useGetStudentEvaluationsByCourseStudent` Query hook requires an argument of type `GetStudentEvaluationsByCourseStudentVariables`:
  const getStudentEvaluationsByCourseStudentVars: GetStudentEvaluationsByCourseStudentVariables = {
    courseStudentId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentEvaluationsByCourseStudent(getStudentEvaluationsByCourseStudentVars);
  // Variables can be defined inline as well.
  const query = useGetStudentEvaluationsByCourseStudent({ courseStudentId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentEvaluationsByCourseStudent(dataConnect, getStudentEvaluationsByCourseStudentVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByCourseStudent(getStudentEvaluationsByCourseStudentVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationsByCourseStudent(dataConnect, getStudentEvaluationsByCourseStudentVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.studentCourseEvaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStudentEvaluationFullDetail
You can execute the `GetStudentEvaluationFullDetail` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetStudentEvaluationFullDetail(dc: DataConnect, vars: GetStudentEvaluationFullDetailVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationFullDetailData>): UseDataConnectQueryResult<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStudentEvaluationFullDetail(vars: GetStudentEvaluationFullDetailVariables, options?: useDataConnectQueryOptions<GetStudentEvaluationFullDetailData>): UseDataConnectQueryResult<GetStudentEvaluationFullDetailData, GetStudentEvaluationFullDetailVariables>;
```

### Variables
The `GetStudentEvaluationFullDetail` Query requires an argument of type `GetStudentEvaluationFullDetailVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStudentEvaluationFullDetailVariables {
  studentEvaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetStudentEvaluationFullDetail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStudentEvaluationFullDetail` Query is of type `GetStudentEvaluationFullDetailData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStudentEvaluationFullDetail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStudentEvaluationFullDetailVariables } from '@dataconnect/generated';
import { useGetStudentEvaluationFullDetail } from '@dataconnect/generated/react'

export default function GetStudentEvaluationFullDetailComponent() {
  // The `useGetStudentEvaluationFullDetail` Query hook requires an argument of type `GetStudentEvaluationFullDetailVariables`:
  const getStudentEvaluationFullDetailVars: GetStudentEvaluationFullDetailVariables = {
    studentEvaluationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStudentEvaluationFullDetail(getStudentEvaluationFullDetailVars);
  // Variables can be defined inline as well.
  const query = useGetStudentEvaluationFullDetail({ studentEvaluationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStudentEvaluationFullDetail(dataConnect, getStudentEvaluationFullDetailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationFullDetail(getStudentEvaluationFullDetailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStudentEvaluationFullDetail(dataConnect, getStudentEvaluationFullDetailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.studentCourseEvaluations);
    console.log(query.data.studentEvaluationQuestions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseEvaluationsByUser
You can execute the `GetCourseEvaluationsByUser` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseEvaluationsByUser(dc: DataConnect, vars: GetCourseEvaluationsByUserVariables, options?: useDataConnectQueryOptions<GetCourseEvaluationsByUserData>): UseDataConnectQueryResult<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseEvaluationsByUser(vars: GetCourseEvaluationsByUserVariables, options?: useDataConnectQueryOptions<GetCourseEvaluationsByUserData>): UseDataConnectQueryResult<GetCourseEvaluationsByUserData, GetCourseEvaluationsByUserVariables>;
```

### Variables
The `GetCourseEvaluationsByUser` Query requires an argument of type `GetCourseEvaluationsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseEvaluationsByUserVariables {
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `GetCourseEvaluationsByUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseEvaluationsByUser` Query is of type `GetCourseEvaluationsByUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseEvaluationsByUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseEvaluationsByUserVariables } from '@dataconnect/generated';
import { useGetCourseEvaluationsByUser } from '@dataconnect/generated/react'

export default function GetCourseEvaluationsByUserComponent() {
  // The `useGetCourseEvaluationsByUser` Query hook requires an argument of type `GetCourseEvaluationsByUserVariables`:
  const getCourseEvaluationsByUserVars: GetCourseEvaluationsByUserVariables = {
    userId: ..., 
    firebaseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseEvaluationsByUser(getCourseEvaluationsByUserVars);
  // Variables can be defined inline as well.
  const query = useGetCourseEvaluationsByUser({ userId: ..., firebaseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseEvaluationsByUser(dataConnect, getCourseEvaluationsByUserVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseEvaluationsByUser(getCourseEvaluationsByUserVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseEvaluationsByUser(dataConnect, getCourseEvaluationsByUserVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseEvaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseEvaluationById
You can execute the `GetCourseEvaluationById` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseEvaluationById(dc: DataConnect, vars: GetCourseEvaluationByIdVariables, options?: useDataConnectQueryOptions<GetCourseEvaluationByIdData>): UseDataConnectQueryResult<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseEvaluationById(vars: GetCourseEvaluationByIdVariables, options?: useDataConnectQueryOptions<GetCourseEvaluationByIdData>): UseDataConnectQueryResult<GetCourseEvaluationByIdData, GetCourseEvaluationByIdVariables>;
```

### Variables
The `GetCourseEvaluationById` Query requires an argument of type `GetCourseEvaluationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseEvaluationByIdVariables {
  courseEvaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCourseEvaluationById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseEvaluationById` Query is of type `GetCourseEvaluationByIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseEvaluationById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseEvaluationByIdVariables } from '@dataconnect/generated';
import { useGetCourseEvaluationById } from '@dataconnect/generated/react'

export default function GetCourseEvaluationByIdComponent() {
  // The `useGetCourseEvaluationById` Query hook requires an argument of type `GetCourseEvaluationByIdVariables`:
  const getCourseEvaluationByIdVars: GetCourseEvaluationByIdVariables = {
    courseEvaluationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseEvaluationById(getCourseEvaluationByIdVars);
  // Variables can be defined inline as well.
  const query = useGetCourseEvaluationById({ courseEvaluationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseEvaluationById(dataConnect, getCourseEvaluationByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseEvaluationById(getCourseEvaluationByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseEvaluationById(dataConnect, getCourseEvaluationByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseEvaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEvaluationsForCourse
You can execute the `GetEvaluationsForCourse` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEvaluationsForCourse(dc: DataConnect, vars: GetEvaluationsForCourseVariables, options?: useDataConnectQueryOptions<GetEvaluationsForCourseData>): UseDataConnectQueryResult<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEvaluationsForCourse(vars: GetEvaluationsForCourseVariables, options?: useDataConnectQueryOptions<GetEvaluationsForCourseData>): UseDataConnectQueryResult<GetEvaluationsForCourseData, GetEvaluationsForCourseVariables>;
```

### Variables
The `GetEvaluationsForCourse` Query requires an argument of type `GetEvaluationsForCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEvaluationsForCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetEvaluationsForCourse` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEvaluationsForCourse` Query is of type `GetEvaluationsForCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEvaluationsForCourse`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEvaluationsForCourseVariables } from '@dataconnect/generated';
import { useGetEvaluationsForCourse } from '@dataconnect/generated/react'

export default function GetEvaluationsForCourseComponent() {
  // The `useGetEvaluationsForCourse` Query hook requires an argument of type `GetEvaluationsForCourseVariables`:
  const getEvaluationsForCourseVars: GetEvaluationsForCourseVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEvaluationsForCourse(getEvaluationsForCourseVars);
  // Variables can be defined inline as well.
  const query = useGetEvaluationsForCourse({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEvaluationsForCourse(dataConnect, getEvaluationsForCourseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationsForCourse(getEvaluationsForCourseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEvaluationsForCourse(dataConnect, getEvaluationsForCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseEvaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCoursesForEvaluation
You can execute the `GetCoursesForEvaluation` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCoursesForEvaluation(dc: DataConnect, vars: GetCoursesForEvaluationVariables, options?: useDataConnectQueryOptions<GetCoursesForEvaluationData>): UseDataConnectQueryResult<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCoursesForEvaluation(vars: GetCoursesForEvaluationVariables, options?: useDataConnectQueryOptions<GetCoursesForEvaluationData>): UseDataConnectQueryResult<GetCoursesForEvaluationData, GetCoursesForEvaluationVariables>;
```

### Variables
The `GetCoursesForEvaluation` Query requires an argument of type `GetCoursesForEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCoursesForEvaluationVariables {
  evaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCoursesForEvaluation` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCoursesForEvaluation` Query is of type `GetCoursesForEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCoursesForEvaluation`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCoursesForEvaluationVariables } from '@dataconnect/generated';
import { useGetCoursesForEvaluation } from '@dataconnect/generated/react'

export default function GetCoursesForEvaluationComponent() {
  // The `useGetCoursesForEvaluation` Query hook requires an argument of type `GetCoursesForEvaluationVariables`:
  const getCoursesForEvaluationVars: GetCoursesForEvaluationVariables = {
    evaluationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCoursesForEvaluation(getCoursesForEvaluationVars);
  // Variables can be defined inline as well.
  const query = useGetCoursesForEvaluation({ evaluationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCoursesForEvaluation(dataConnect, getCoursesForEvaluationVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesForEvaluation(getCoursesForEvaluationVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCoursesForEvaluation(dataConnect, getCoursesForEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseEvaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseEvaluationByAccessCode
You can execute the `GetCourseEvaluationByAccessCode` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseEvaluationByAccessCode(dc: DataConnect, vars: GetCourseEvaluationByAccessCodeVariables, options?: useDataConnectQueryOptions<GetCourseEvaluationByAccessCodeData>): UseDataConnectQueryResult<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseEvaluationByAccessCode(vars: GetCourseEvaluationByAccessCodeVariables, options?: useDataConnectQueryOptions<GetCourseEvaluationByAccessCodeData>): UseDataConnectQueryResult<GetCourseEvaluationByAccessCodeData, GetCourseEvaluationByAccessCodeVariables>;
```

### Variables
The `GetCourseEvaluationByAccessCode` Query requires an argument of type `GetCourseEvaluationByAccessCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseEvaluationByAccessCodeVariables {
  accessCode: string;
}
```
### Return Type
Recall that calling the `GetCourseEvaluationByAccessCode` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseEvaluationByAccessCode` Query is of type `GetCourseEvaluationByAccessCodeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseEvaluationByAccessCode`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseEvaluationByAccessCodeVariables } from '@dataconnect/generated';
import { useGetCourseEvaluationByAccessCode } from '@dataconnect/generated/react'

export default function GetCourseEvaluationByAccessCodeComponent() {
  // The `useGetCourseEvaluationByAccessCode` Query hook requires an argument of type `GetCourseEvaluationByAccessCodeVariables`:
  const getCourseEvaluationByAccessCodeVars: GetCourseEvaluationByAccessCodeVariables = {
    accessCode: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseEvaluationByAccessCode(getCourseEvaluationByAccessCodeVars);
  // Variables can be defined inline as well.
  const query = useGetCourseEvaluationByAccessCode({ accessCode: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseEvaluationByAccessCode(dataConnect, getCourseEvaluationByAccessCodeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseEvaluationByAccessCode(getCourseEvaluationByAccessCodeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseEvaluationByAccessCode(dataConnect, getCourseEvaluationByAccessCodeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseEvaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseEvaluationDetails
You can execute the `GetCourseEvaluationDetails` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseEvaluationDetails(dc: DataConnect, vars: GetCourseEvaluationDetailsVariables, options?: useDataConnectQueryOptions<GetCourseEvaluationDetailsData>): UseDataConnectQueryResult<GetCourseEvaluationDetailsData, GetCourseEvaluationDetailsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseEvaluationDetails(vars: GetCourseEvaluationDetailsVariables, options?: useDataConnectQueryOptions<GetCourseEvaluationDetailsData>): UseDataConnectQueryResult<GetCourseEvaluationDetailsData, GetCourseEvaluationDetailsVariables>;
```

### Variables
The `GetCourseEvaluationDetails` Query requires an argument of type `GetCourseEvaluationDetailsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseEvaluationDetailsVariables {
  courseId: UUIDString;
  evaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCourseEvaluationDetails` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseEvaluationDetails` Query is of type `GetCourseEvaluationDetailsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseEvaluationDetails`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseEvaluationDetailsVariables } from '@dataconnect/generated';
import { useGetCourseEvaluationDetails } from '@dataconnect/generated/react'

export default function GetCourseEvaluationDetailsComponent() {
  // The `useGetCourseEvaluationDetails` Query hook requires an argument of type `GetCourseEvaluationDetailsVariables`:
  const getCourseEvaluationDetailsVars: GetCourseEvaluationDetailsVariables = {
    courseId: ..., 
    evaluationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseEvaluationDetails(getCourseEvaluationDetailsVars);
  // Variables can be defined inline as well.
  const query = useGetCourseEvaluationDetails({ courseId: ..., evaluationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseEvaluationDetails(dataConnect, getCourseEvaluationDetailsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseEvaluationDetails(getCourseEvaluationDetailsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseEvaluationDetails(dataConnect, getCourseEvaluationDetailsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseEvaluations);
    console.log(query.data.courses);
    console.log(query.data.evaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ValidateStudentForEvaluation
You can execute the `ValidateStudentForEvaluation` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useValidateStudentForEvaluation(dc: DataConnect, vars: ValidateStudentForEvaluationVariables, options?: useDataConnectQueryOptions<ValidateStudentForEvaluationData>): UseDataConnectQueryResult<ValidateStudentForEvaluationData, ValidateStudentForEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useValidateStudentForEvaluation(vars: ValidateStudentForEvaluationVariables, options?: useDataConnectQueryOptions<ValidateStudentForEvaluationData>): UseDataConnectQueryResult<ValidateStudentForEvaluationData, ValidateStudentForEvaluationVariables>;
```

### Variables
The `ValidateStudentForEvaluation` Query requires an argument of type `ValidateStudentForEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ValidateStudentForEvaluationVariables {
  email: string;
  courseId: UUIDString;
  evaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `ValidateStudentForEvaluation` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ValidateStudentForEvaluation` Query is of type `ValidateStudentForEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ValidateStudentForEvaluationData {
  students: ({
    studentId: UUIDString;
    firstName: string;
    lastName: string;
    identifier: string;
    email: string;
  } & Student_Key)[];
    courseStudents: ({
      courseStudentId: UUIDString;
      courseId: UUIDString;
      studentId: UUIDString;
      enrolledOn: DateString;
      student: {
        studentId: UUIDString;
        email: string;
        firstName: string;
        lastName: string;
      } & Student_Key;
    } & CourseStudent_Key)[];
      courseEvaluations: ({
        courseEvaluationId: UUIDString;
        courseId: UUIDString;
        evaluationId: UUIDString;
        scheduledDate: DateString;
        durationMinutes: number;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ValidateStudentForEvaluation`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ValidateStudentForEvaluationVariables } from '@dataconnect/generated';
import { useValidateStudentForEvaluation } from '@dataconnect/generated/react'

export default function ValidateStudentForEvaluationComponent() {
  // The `useValidateStudentForEvaluation` Query hook requires an argument of type `ValidateStudentForEvaluationVariables`:
  const validateStudentForEvaluationVars: ValidateStudentForEvaluationVariables = {
    email: ..., 
    courseId: ..., 
    evaluationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useValidateStudentForEvaluation(validateStudentForEvaluationVars);
  // Variables can be defined inline as well.
  const query = useValidateStudentForEvaluation({ email: ..., courseId: ..., evaluationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useValidateStudentForEvaluation(dataConnect, validateStudentForEvaluationVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useValidateStudentForEvaluation(validateStudentForEvaluationVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useValidateStudentForEvaluation(dataConnect, validateStudentForEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.students);
    console.log(query.data.courseStudents);
    console.log(query.data.courseEvaluations);
    console.log(query.data.courses);
    console.log(query.data.evaluations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `example` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateUser
You can execute the `CreateUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
```

### Variables
The `CreateUser` Mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateUser` Mutation is of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateUserData {
  user_insert: User_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateUser`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateUserVariables } from '@dataconnect/generated';
import { useCreateUser } from '@dataconnect/generated/react'

export default function CreateUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateUser();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateUser(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateUser(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateUser` Mutation requires an argument of type `CreateUserVariables`:
  const createUserVars: CreateUserVariables = {
    userId: ..., 
    firebaseId: ..., 
    name: ..., 
    email: ..., 
    role: ..., 
    createdBy: ..., 
  };
  mutation.mutate(createUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., firebaseId: ..., name: ..., email: ..., role: ..., createdBy: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createUserVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateUser
You can execute the `UpdateUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
```

### Variables
The `UpdateUser` Mutation requires an argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateUser` Mutation is of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateUser`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateUserVariables } from '@dataconnect/generated';
import { useUpdateUser } from '@dataconnect/generated/react'

export default function UpdateUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateUser();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateUser(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateUser(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateUser` Mutation requires an argument of type `UpdateUserVariables`:
  const updateUserVars: UpdateUserVariables = {
    userId: ..., 
    name: ..., // optional
    email: ..., // optional
    role: ..., // optional
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., name: ..., email: ..., role: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateUserVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateSubject
You can execute the `CreateSubject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateSubject(options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;
```

### Variables
The `CreateSubject` Mutation requires an argument of type `CreateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateSubject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateSubject` Mutation is of type `CreateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateSubjectData {
  subject_insert: Subject_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateSubject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateSubjectVariables } from '@dataconnect/generated';
import { useCreateSubject } from '@dataconnect/generated/react'

export default function CreateSubjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateSubject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateSubject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSubject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSubject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateSubject` Mutation requires an argument of type `CreateSubjectVariables`:
  const createSubjectVars: CreateSubjectVariables = {
    subjectId: ..., 
    name: ..., 
    code: ..., 
    levelId: ..., 
    description: ..., // optional
    createdBy: ..., 
  };
  mutation.mutate(createSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ subjectId: ..., name: ..., code: ..., levelId: ..., description: ..., createdBy: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subject_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateSubject
You can execute the `UpdateSubject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateSubject(options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;
```

### Variables
The `UpdateSubject` Mutation requires an argument of type `UpdateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateSubject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateSubject` Mutation is of type `UpdateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateSubjectData {
  subject_update?: Subject_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateSubject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateSubjectVariables } from '@dataconnect/generated';
import { useUpdateSubject } from '@dataconnect/generated/react'

export default function UpdateSubjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateSubject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateSubject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateSubject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateSubject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateSubject` Mutation requires an argument of type `UpdateSubjectVariables`:
  const updateSubjectVars: UpdateSubjectVariables = {
    subjectId: ..., 
    name: ..., // optional
    code: ..., // optional
    description: ..., // optional
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ subjectId: ..., name: ..., code: ..., description: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subject_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateSubject
You can execute the `DeactivateSubject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateSubject(options?: useDataConnectMutationOptions<DeactivateSubjectData, FirebaseError, DeactivateSubjectVariables>): UseDataConnectMutationResult<DeactivateSubjectData, DeactivateSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateSubjectData, FirebaseError, DeactivateSubjectVariables>): UseDataConnectMutationResult<DeactivateSubjectData, DeactivateSubjectVariables>;
```

### Variables
The `DeactivateSubject` Mutation requires an argument of type `DeactivateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateSubjectVariables {
  subjectId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateSubject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateSubject` Mutation is of type `DeactivateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateSubjectData {
  subject_update?: Subject_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateSubject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateSubjectVariables } from '@dataconnect/generated';
import { useDeactivateSubject } from '@dataconnect/generated/react'

export default function DeactivateSubjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateSubject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateSubject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateSubject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateSubject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateSubject` Mutation requires an argument of type `DeactivateSubjectVariables`:
  const deactivateSubjectVars: DeactivateSubjectVariables = {
    subjectId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ subjectId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subject_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateSubject
You can execute the `ReactivateSubject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateSubject(options?: useDataConnectMutationOptions<ReactivateSubjectData, FirebaseError, ReactivateSubjectVariables>): UseDataConnectMutationResult<ReactivateSubjectData, ReactivateSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateSubjectData, FirebaseError, ReactivateSubjectVariables>): UseDataConnectMutationResult<ReactivateSubjectData, ReactivateSubjectVariables>;
```

### Variables
The `ReactivateSubject` Mutation requires an argument of type `ReactivateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateSubjectVariables {
  subjectId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateSubject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateSubject` Mutation is of type `ReactivateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateSubjectData {
  subject_update?: Subject_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateSubject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateSubjectVariables } from '@dataconnect/generated';
import { useReactivateSubject } from '@dataconnect/generated/react'

export default function ReactivateSubjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateSubject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateSubject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateSubject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateSubject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateSubject` Mutation requires an argument of type `ReactivateSubjectVariables`:
  const reactivateSubjectVars: ReactivateSubjectVariables = {
    subjectId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ subjectId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subject_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateUnit
You can execute the `CreateUnit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateUnit(options?: useDataConnectMutationOptions<CreateUnitData, FirebaseError, CreateUnitVariables>): UseDataConnectMutationResult<CreateUnitData, CreateUnitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateUnit(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUnitData, FirebaseError, CreateUnitVariables>): UseDataConnectMutationResult<CreateUnitData, CreateUnitVariables>;
```

### Variables
The `CreateUnit` Mutation requires an argument of type `CreateUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateUnit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateUnit` Mutation is of type `CreateUnitData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateUnitData {
  unit_insert: Unit_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateUnit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateUnitVariables } from '@dataconnect/generated';
import { useCreateUnit } from '@dataconnect/generated/react'

export default function CreateUnitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateUnit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateUnit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateUnit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateUnit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateUnit` Mutation requires an argument of type `CreateUnitVariables`:
  const createUnitVars: CreateUnitVariables = {
    unitId: ..., 
    code: ..., 
    name: ..., 
    description: ..., // optional
    subjectId: ..., 
    createdBy: ..., 
  };
  mutation.mutate(createUnitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ unitId: ..., code: ..., name: ..., description: ..., subjectId: ..., createdBy: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createUnitVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.unit_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateUnit
You can execute the `UpdateUnit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateUnit(options?: useDataConnectMutationOptions<UpdateUnitData, FirebaseError, UpdateUnitVariables>): UseDataConnectMutationResult<UpdateUnitData, UpdateUnitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateUnit(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUnitData, FirebaseError, UpdateUnitVariables>): UseDataConnectMutationResult<UpdateUnitData, UpdateUnitVariables>;
```

### Variables
The `UpdateUnit` Mutation requires an argument of type `UpdateUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateUnit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateUnit` Mutation is of type `UpdateUnitData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateUnitData {
  unit_update?: Unit_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateUnit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateUnitVariables } from '@dataconnect/generated';
import { useUpdateUnit } from '@dataconnect/generated/react'

export default function UpdateUnitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateUnit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateUnit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateUnit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateUnit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateUnit` Mutation requires an argument of type `UpdateUnitVariables`:
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
  mutation.mutate(updateUnitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ unitId: ..., code: ..., name: ..., description: ..., subjectId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateUnitVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.unit_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateUnit
You can execute the `DeactivateUnit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateUnit(options?: useDataConnectMutationOptions<DeactivateUnitData, FirebaseError, DeactivateUnitVariables>): UseDataConnectMutationResult<DeactivateUnitData, DeactivateUnitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateUnit(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateUnitData, FirebaseError, DeactivateUnitVariables>): UseDataConnectMutationResult<DeactivateUnitData, DeactivateUnitVariables>;
```

### Variables
The `DeactivateUnit` Mutation requires an argument of type `DeactivateUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateUnitVariables {
  unitId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateUnit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateUnit` Mutation is of type `DeactivateUnitData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateUnitData {
  unit_update?: Unit_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateUnit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateUnitVariables } from '@dataconnect/generated';
import { useDeactivateUnit } from '@dataconnect/generated/react'

export default function DeactivateUnitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateUnit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateUnit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateUnit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateUnit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateUnit` Mutation requires an argument of type `DeactivateUnitVariables`:
  const deactivateUnitVars: DeactivateUnitVariables = {
    unitId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateUnitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ unitId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateUnitVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.unit_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateUnit
You can execute the `ReactivateUnit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateUnit(options?: useDataConnectMutationOptions<ReactivateUnitData, FirebaseError, ReactivateUnitVariables>): UseDataConnectMutationResult<ReactivateUnitData, ReactivateUnitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateUnit(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateUnitData, FirebaseError, ReactivateUnitVariables>): UseDataConnectMutationResult<ReactivateUnitData, ReactivateUnitVariables>;
```

### Variables
The `ReactivateUnit` Mutation requires an argument of type `ReactivateUnitVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateUnitVariables {
  unitId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateUnit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateUnit` Mutation is of type `ReactivateUnitData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateUnitData {
  unit_update?: Unit_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateUnit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateUnitVariables } from '@dataconnect/generated';
import { useReactivateUnit } from '@dataconnect/generated/react'

export default function ReactivateUnitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateUnit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateUnit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateUnit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateUnit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateUnit` Mutation requires an argument of type `ReactivateUnitVariables`:
  const reactivateUnitVars: ReactivateUnitVariables = {
    unitId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateUnitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ unitId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateUnitVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.unit_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTopic
You can execute the `CreateTopic` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTopic(options?: useDataConnectMutationOptions<CreateTopicData, FirebaseError, CreateTopicVariables>): UseDataConnectMutationResult<CreateTopicData, CreateTopicVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTopic(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTopicData, FirebaseError, CreateTopicVariables>): UseDataConnectMutationResult<CreateTopicData, CreateTopicVariables>;
```

### Variables
The `CreateTopic` Mutation requires an argument of type `CreateTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTopicVariables {
  topicId: UUIDString;
  code: string;
  name: string;
  unitId: UUIDString;
  createdBy: UUIDString;
}
```
### Return Type
Recall that calling the `CreateTopic` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTopic` Mutation is of type `CreateTopicData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTopicData {
  topic_insert: Topic_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTopic`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTopicVariables } from '@dataconnect/generated';
import { useCreateTopic } from '@dataconnect/generated/react'

export default function CreateTopicComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTopic();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTopic(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTopic(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTopic(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTopic` Mutation requires an argument of type `CreateTopicVariables`:
  const createTopicVars: CreateTopicVariables = {
    topicId: ..., 
    code: ..., 
    name: ..., 
    unitId: ..., 
    createdBy: ..., 
  };
  mutation.mutate(createTopicVars);
  // Variables can be defined inline as well.
  mutation.mutate({ topicId: ..., code: ..., name: ..., unitId: ..., createdBy: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTopicVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.topic_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTopic
You can execute the `UpdateTopic` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTopic(options?: useDataConnectMutationOptions<UpdateTopicData, FirebaseError, UpdateTopicVariables>): UseDataConnectMutationResult<UpdateTopicData, UpdateTopicVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTopic(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTopicData, FirebaseError, UpdateTopicVariables>): UseDataConnectMutationResult<UpdateTopicData, UpdateTopicVariables>;
```

### Variables
The `UpdateTopic` Mutation requires an argument of type `UpdateTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTopic` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTopic` Mutation is of type `UpdateTopicData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTopicData {
  topic_update?: Topic_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTopic`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTopicVariables } from '@dataconnect/generated';
import { useUpdateTopic } from '@dataconnect/generated/react'

export default function UpdateTopicComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTopic();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTopic(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTopic(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTopic(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTopic` Mutation requires an argument of type `UpdateTopicVariables`:
  const updateTopicVars: UpdateTopicVariables = {
    topicId: ..., 
    unitId: ..., 
    code: ..., 
    name: ..., 
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateTopicVars);
  // Variables can be defined inline as well.
  mutation.mutate({ topicId: ..., unitId: ..., code: ..., name: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTopicVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.topic_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateTopic
You can execute the `DeactivateTopic` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateTopic(options?: useDataConnectMutationOptions<DeactivateTopicData, FirebaseError, DeactivateTopicVariables>): UseDataConnectMutationResult<DeactivateTopicData, DeactivateTopicVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateTopic(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateTopicData, FirebaseError, DeactivateTopicVariables>): UseDataConnectMutationResult<DeactivateTopicData, DeactivateTopicVariables>;
```

### Variables
The `DeactivateTopic` Mutation requires an argument of type `DeactivateTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateTopicVariables {
  topicId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateTopic` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateTopic` Mutation is of type `DeactivateTopicData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateTopicData {
  topic_update?: Topic_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateTopic`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateTopicVariables } from '@dataconnect/generated';
import { useDeactivateTopic } from '@dataconnect/generated/react'

export default function DeactivateTopicComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateTopic();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateTopic(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateTopic(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateTopic(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateTopic` Mutation requires an argument of type `DeactivateTopicVariables`:
  const deactivateTopicVars: DeactivateTopicVariables = {
    topicId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateTopicVars);
  // Variables can be defined inline as well.
  mutation.mutate({ topicId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateTopicVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.topic_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateTopic
You can execute the `ReactivateTopic` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateTopic(options?: useDataConnectMutationOptions<ReactivateTopicData, FirebaseError, ReactivateTopicVariables>): UseDataConnectMutationResult<ReactivateTopicData, ReactivateTopicVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateTopic(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateTopicData, FirebaseError, ReactivateTopicVariables>): UseDataConnectMutationResult<ReactivateTopicData, ReactivateTopicVariables>;
```

### Variables
The `ReactivateTopic` Mutation requires an argument of type `ReactivateTopicVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateTopicVariables {
  topicId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateTopic` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateTopic` Mutation is of type `ReactivateTopicData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateTopicData {
  topic_update?: Topic_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateTopic`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateTopicVariables } from '@dataconnect/generated';
import { useReactivateTopic } from '@dataconnect/generated/react'

export default function ReactivateTopicComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateTopic();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateTopic(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateTopic(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateTopic(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateTopic` Mutation requires an argument of type `ReactivateTopicVariables`:
  const reactivateTopicVars: ReactivateTopicVariables = {
    topicId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateTopicVars);
  // Variables can be defined inline as well.
  mutation.mutate({ topicId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateTopicVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.topic_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateLevelCategory
You can execute the `CreateLevelCategory` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateLevelCategory(options?: useDataConnectMutationOptions<CreateLevelCategoryData, FirebaseError, CreateLevelCategoryVariables>): UseDataConnectMutationResult<CreateLevelCategoryData, CreateLevelCategoryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateLevelCategory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLevelCategoryData, FirebaseError, CreateLevelCategoryVariables>): UseDataConnectMutationResult<CreateLevelCategoryData, CreateLevelCategoryVariables>;
```

### Variables
The `CreateLevelCategory` Mutation requires an argument of type `CreateLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateLevelCategoryVariables {
  categoryId: UUIDString;
  code: string;
  name: string;
  description?: string | null;
  createdBy: UUIDString;
}
```
### Return Type
Recall that calling the `CreateLevelCategory` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateLevelCategory` Mutation is of type `CreateLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateLevelCategoryData {
  levelCategory_insert: LevelCategory_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateLevelCategory`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateLevelCategoryVariables } from '@dataconnect/generated';
import { useCreateLevelCategory } from '@dataconnect/generated/react'

export default function CreateLevelCategoryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateLevelCategory();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateLevelCategory(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateLevelCategory(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateLevelCategory(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateLevelCategory` Mutation requires an argument of type `CreateLevelCategoryVariables`:
  const createLevelCategoryVars: CreateLevelCategoryVariables = {
    categoryId: ..., 
    code: ..., 
    name: ..., 
    description: ..., // optional
    createdBy: ..., 
  };
  mutation.mutate(createLevelCategoryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ categoryId: ..., code: ..., name: ..., description: ..., createdBy: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createLevelCategoryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.levelCategory_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateLevelCategory
You can execute the `UpdateLevelCategory` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateLevelCategory(options?: useDataConnectMutationOptions<UpdateLevelCategoryData, FirebaseError, UpdateLevelCategoryVariables>): UseDataConnectMutationResult<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateLevelCategory(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLevelCategoryData, FirebaseError, UpdateLevelCategoryVariables>): UseDataConnectMutationResult<UpdateLevelCategoryData, UpdateLevelCategoryVariables>;
```

### Variables
The `UpdateLevelCategory` Mutation requires an argument of type `UpdateLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateLevelCategory` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateLevelCategory` Mutation is of type `UpdateLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateLevelCategoryData {
  levelCategory_update?: LevelCategory_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateLevelCategory`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateLevelCategoryVariables } from '@dataconnect/generated';
import { useUpdateLevelCategory } from '@dataconnect/generated/react'

export default function UpdateLevelCategoryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateLevelCategory();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateLevelCategory(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateLevelCategory(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateLevelCategory(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateLevelCategory` Mutation requires an argument of type `UpdateLevelCategoryVariables`:
  const updateLevelCategoryVars: UpdateLevelCategoryVariables = {
    categoryId: ..., 
    code: ..., // optional
    name: ..., // optional
    description: ..., // optional
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateLevelCategoryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ categoryId: ..., code: ..., name: ..., description: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateLevelCategoryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.levelCategory_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateLevelCategory
You can execute the `DeactivateLevelCategory` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateLevelCategory(options?: useDataConnectMutationOptions<DeactivateLevelCategoryData, FirebaseError, DeactivateLevelCategoryVariables>): UseDataConnectMutationResult<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateLevelCategory(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateLevelCategoryData, FirebaseError, DeactivateLevelCategoryVariables>): UseDataConnectMutationResult<DeactivateLevelCategoryData, DeactivateLevelCategoryVariables>;
```

### Variables
The `DeactivateLevelCategory` Mutation requires an argument of type `DeactivateLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateLevelCategoryVariables {
  categoryId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateLevelCategory` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateLevelCategory` Mutation is of type `DeactivateLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateLevelCategoryData {
  levelCategory_update?: LevelCategory_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateLevelCategory`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateLevelCategoryVariables } from '@dataconnect/generated';
import { useDeactivateLevelCategory } from '@dataconnect/generated/react'

export default function DeactivateLevelCategoryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateLevelCategory();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateLevelCategory(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateLevelCategory(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateLevelCategory(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateLevelCategory` Mutation requires an argument of type `DeactivateLevelCategoryVariables`:
  const deactivateLevelCategoryVars: DeactivateLevelCategoryVariables = {
    categoryId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateLevelCategoryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ categoryId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateLevelCategoryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.levelCategory_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateLevelCategory
You can execute the `ReactivateLevelCategory` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateLevelCategory(options?: useDataConnectMutationOptions<ReactivateLevelCategoryData, FirebaseError, ReactivateLevelCategoryVariables>): UseDataConnectMutationResult<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateLevelCategory(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateLevelCategoryData, FirebaseError, ReactivateLevelCategoryVariables>): UseDataConnectMutationResult<ReactivateLevelCategoryData, ReactivateLevelCategoryVariables>;
```

### Variables
The `ReactivateLevelCategory` Mutation requires an argument of type `ReactivateLevelCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateLevelCategoryVariables {
  categoryId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateLevelCategory` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateLevelCategory` Mutation is of type `ReactivateLevelCategoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateLevelCategoryData {
  levelCategory_update?: LevelCategory_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateLevelCategory`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateLevelCategoryVariables } from '@dataconnect/generated';
import { useReactivateLevelCategory } from '@dataconnect/generated/react'

export default function ReactivateLevelCategoryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateLevelCategory();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateLevelCategory(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateLevelCategory(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateLevelCategory(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateLevelCategory` Mutation requires an argument of type `ReactivateLevelCategoryVariables`:
  const reactivateLevelCategoryVars: ReactivateLevelCategoryVariables = {
    categoryId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateLevelCategoryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ categoryId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateLevelCategoryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.levelCategory_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateEducationalLevel
You can execute the `CreateEducationalLevel` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateEducationalLevel(options?: useDataConnectMutationOptions<CreateEducationalLevelData, FirebaseError, CreateEducationalLevelVariables>): UseDataConnectMutationResult<CreateEducationalLevelData, CreateEducationalLevelVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateEducationalLevel(dc: DataConnect, options?: useDataConnectMutationOptions<CreateEducationalLevelData, FirebaseError, CreateEducationalLevelVariables>): UseDataConnectMutationResult<CreateEducationalLevelData, CreateEducationalLevelVariables>;
```

### Variables
The `CreateEducationalLevel` Mutation requires an argument of type `CreateEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateEducationalLevel` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateEducationalLevel` Mutation is of type `CreateEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateEducationalLevelData {
  educationalLevel_insert: EducationalLevel_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateEducationalLevel`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateEducationalLevelVariables } from '@dataconnect/generated';
import { useCreateEducationalLevel } from '@dataconnect/generated/react'

export default function CreateEducationalLevelComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateEducationalLevel();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateEducationalLevel(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateEducationalLevel(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateEducationalLevel(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateEducationalLevel` Mutation requires an argument of type `CreateEducationalLevelVariables`:
  const createEducationalLevelVars: CreateEducationalLevelVariables = {
    levelId: ..., 
    categoryId: ..., 
    code: ..., 
    name: ..., 
    description: ..., // optional
    createdBy: ..., 
  };
  mutation.mutate(createEducationalLevelVars);
  // Variables can be defined inline as well.
  mutation.mutate({ levelId: ..., categoryId: ..., code: ..., name: ..., description: ..., createdBy: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createEducationalLevelVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.educationalLevel_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateEducationalLevel
You can execute the `UpdateEducationalLevel` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateEducationalLevel(options?: useDataConnectMutationOptions<UpdateEducationalLevelData, FirebaseError, UpdateEducationalLevelVariables>): UseDataConnectMutationResult<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateEducationalLevel(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEducationalLevelData, FirebaseError, UpdateEducationalLevelVariables>): UseDataConnectMutationResult<UpdateEducationalLevelData, UpdateEducationalLevelVariables>;
```

### Variables
The `UpdateEducationalLevel` Mutation requires an argument of type `UpdateEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateEducationalLevel` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateEducationalLevel` Mutation is of type `UpdateEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateEducationalLevelData {
  educationalLevel_update?: EducationalLevel_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateEducationalLevel`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateEducationalLevelVariables } from '@dataconnect/generated';
import { useUpdateEducationalLevel } from '@dataconnect/generated/react'

export default function UpdateEducationalLevelComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateEducationalLevel();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateEducationalLevel(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEducationalLevel(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEducationalLevel(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateEducationalLevel` Mutation requires an argument of type `UpdateEducationalLevelVariables`:
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
  mutation.mutate(updateEducationalLevelVars);
  // Variables can be defined inline as well.
  mutation.mutate({ levelId: ..., code: ..., name: ..., description: ..., categoryId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateEducationalLevelVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.educationalLevel_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateEducationalLevel
You can execute the `DeactivateEducationalLevel` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateEducationalLevel(options?: useDataConnectMutationOptions<DeactivateEducationalLevelData, FirebaseError, DeactivateEducationalLevelVariables>): UseDataConnectMutationResult<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateEducationalLevel(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateEducationalLevelData, FirebaseError, DeactivateEducationalLevelVariables>): UseDataConnectMutationResult<DeactivateEducationalLevelData, DeactivateEducationalLevelVariables>;
```

### Variables
The `DeactivateEducationalLevel` Mutation requires an argument of type `DeactivateEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateEducationalLevelVariables {
  levelId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateEducationalLevel` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateEducationalLevel` Mutation is of type `DeactivateEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateEducationalLevelData {
  educationalLevel_update?: EducationalLevel_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateEducationalLevel`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateEducationalLevelVariables } from '@dataconnect/generated';
import { useDeactivateEducationalLevel } from '@dataconnect/generated/react'

export default function DeactivateEducationalLevelComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateEducationalLevel();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateEducationalLevel(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateEducationalLevel(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateEducationalLevel(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateEducationalLevel` Mutation requires an argument of type `DeactivateEducationalLevelVariables`:
  const deactivateEducationalLevelVars: DeactivateEducationalLevelVariables = {
    levelId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateEducationalLevelVars);
  // Variables can be defined inline as well.
  mutation.mutate({ levelId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateEducationalLevelVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.educationalLevel_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateEducationalLevel
You can execute the `ReactivateEducationalLevel` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateEducationalLevel(options?: useDataConnectMutationOptions<ReactivateEducationalLevelData, FirebaseError, ReactivateEducationalLevelVariables>): UseDataConnectMutationResult<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateEducationalLevel(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateEducationalLevelData, FirebaseError, ReactivateEducationalLevelVariables>): UseDataConnectMutationResult<ReactivateEducationalLevelData, ReactivateEducationalLevelVariables>;
```

### Variables
The `ReactivateEducationalLevel` Mutation requires an argument of type `ReactivateEducationalLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateEducationalLevelVariables {
  levelId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateEducationalLevel` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateEducationalLevel` Mutation is of type `ReactivateEducationalLevelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateEducationalLevelData {
  educationalLevel_update?: EducationalLevel_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateEducationalLevel`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateEducationalLevelVariables } from '@dataconnect/generated';
import { useReactivateEducationalLevel } from '@dataconnect/generated/react'

export default function ReactivateEducationalLevelComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateEducationalLevel();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateEducationalLevel(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateEducationalLevel(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateEducationalLevel(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateEducationalLevel` Mutation requires an argument of type `ReactivateEducationalLevelVariables`:
  const reactivateEducationalLevelVars: ReactivateEducationalLevelVariables = {
    levelId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateEducationalLevelVars);
  // Variables can be defined inline as well.
  mutation.mutate({ levelId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateEducationalLevelVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.educationalLevel_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateCourse
You can execute the `CreateCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateCourse(options?: useDataConnectMutationOptions<CreateCourseData, FirebaseError, CreateCourseVariables>): UseDataConnectMutationResult<CreateCourseData, CreateCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateCourse(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCourseData, FirebaseError, CreateCourseVariables>): UseDataConnectMutationResult<CreateCourseData, CreateCourseVariables>;
```

### Variables
The `CreateCourse` Mutation requires an argument of type `CreateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateCourse` Mutation is of type `CreateCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateCourseData {
  course_insert: Course_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateCourseVariables } from '@dataconnect/generated';
import { useCreateCourse } from '@dataconnect/generated/react'

export default function CreateCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateCourse` Mutation requires an argument of type `CreateCourseVariables`:
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
  mutation.mutate(createCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., name: ..., code: ..., section: ..., institutionName: ..., levelId: ..., userId: ..., createdBy: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.course_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateCourse
You can execute the `UpdateCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateCourse(options?: useDataConnectMutationOptions<UpdateCourseData, FirebaseError, UpdateCourseVariables>): UseDataConnectMutationResult<UpdateCourseData, UpdateCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateCourse(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCourseData, FirebaseError, UpdateCourseVariables>): UseDataConnectMutationResult<UpdateCourseData, UpdateCourseVariables>;
```

### Variables
The `UpdateCourse` Mutation requires an argument of type `UpdateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateCourse` Mutation is of type `UpdateCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateCourseData {
  course_update?: Course_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateCourseVariables } from '@dataconnect/generated';
import { useUpdateCourse } from '@dataconnect/generated/react'

export default function UpdateCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateCourse` Mutation requires an argument of type `UpdateCourseVariables`:
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
  mutation.mutate(updateCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., name: ..., code: ..., section: ..., institutionName: ..., levelId: ..., userId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.course_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateCourse
You can execute the `DeactivateCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateCourse(options?: useDataConnectMutationOptions<DeactivateCourseData, FirebaseError, DeactivateCourseVariables>): UseDataConnectMutationResult<DeactivateCourseData, DeactivateCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateCourse(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateCourseData, FirebaseError, DeactivateCourseVariables>): UseDataConnectMutationResult<DeactivateCourseData, DeactivateCourseVariables>;
```

### Variables
The `DeactivateCourse` Mutation requires an argument of type `DeactivateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateCourseVariables {
  courseId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateCourse` Mutation is of type `DeactivateCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateCourseData {
  course_update?: Course_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateCourseVariables } from '@dataconnect/generated';
import { useDeactivateCourse } from '@dataconnect/generated/react'

export default function DeactivateCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateCourse` Mutation requires an argument of type `DeactivateCourseVariables`:
  const deactivateCourseVars: DeactivateCourseVariables = {
    courseId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.course_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateCourse
You can execute the `ReactivateCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateCourse(options?: useDataConnectMutationOptions<ReactivateCourseData, FirebaseError, ReactivateCourseVariables>): UseDataConnectMutationResult<ReactivateCourseData, ReactivateCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateCourse(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateCourseData, FirebaseError, ReactivateCourseVariables>): UseDataConnectMutationResult<ReactivateCourseData, ReactivateCourseVariables>;
```

### Variables
The `ReactivateCourse` Mutation requires an argument of type `ReactivateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateCourseVariables {
  courseId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateCourse` Mutation is of type `ReactivateCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateCourseData {
  course_update?: Course_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateCourseVariables } from '@dataconnect/generated';
import { useReactivateCourse } from '@dataconnect/generated/react'

export default function ReactivateCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateCourse` Mutation requires an argument of type `ReactivateCourseVariables`:
  const reactivateCourseVars: ReactivateCourseVariables = {
    courseId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.course_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuestion
You can execute the `CreateQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuestion(options?: useDataConnectMutationOptions<CreateQuestionData, FirebaseError, CreateQuestionVariables>): UseDataConnectMutationResult<CreateQuestionData, CreateQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuestionData, FirebaseError, CreateQuestionVariables>): UseDataConnectMutationResult<CreateQuestionData, CreateQuestionVariables>;
```

### Variables
The `CreateQuestion` Mutation requires an argument of type `CreateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuestion` Mutation is of type `CreateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuestionData {
  question_insert: Question_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuestionVariables } from '@dataconnect/generated';
import { useCreateQuestion } from '@dataconnect/generated/react'

export default function CreateQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuestion` Mutation requires an argument of type `CreateQuestionVariables`:
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
  mutation.mutate(createQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., taxonomyId: ..., userId: ..., isPublic: ..., allowPartialScore: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.question_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuestionVersion
You can execute the `CreateQuestionVersion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuestionVersion(options?: useDataConnectMutationOptions<CreateQuestionVersionData, FirebaseError, CreateQuestionVersionVariables>): UseDataConnectMutationResult<CreateQuestionVersionData, CreateQuestionVersionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuestionVersion(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuestionVersionData, FirebaseError, CreateQuestionVersionVariables>): UseDataConnectMutationResult<CreateQuestionVersionData, CreateQuestionVersionVariables>;
```

### Variables
The `CreateQuestionVersion` Mutation requires an argument of type `CreateQuestionVersionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateQuestionVersion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuestionVersion` Mutation is of type `CreateQuestionVersionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuestionVersionData {
  question_insert: Question_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuestionVersion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuestionVersionVariables } from '@dataconnect/generated';
import { useCreateQuestionVersion } from '@dataconnect/generated/react'

export default function CreateQuestionVersionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuestionVersion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuestionVersion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionVersion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionVersion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuestionVersion` Mutation requires an argument of type `CreateQuestionVersionVariables`:
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
  mutation.mutate(createQuestionVersionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., taxonomyId: ..., userId: ..., isPublic: ..., allowPartialScore: ..., version: ..., originalQuestionId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuestionVersionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.question_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuestion
You can execute the `UpdateQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuestion(options?: useDataConnectMutationOptions<UpdateQuestionData, FirebaseError, UpdateQuestionVariables>): UseDataConnectMutationResult<UpdateQuestionData, UpdateQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuestionData, FirebaseError, UpdateQuestionVariables>): UseDataConnectMutationResult<UpdateQuestionData, UpdateQuestionVariables>;
```

### Variables
The `UpdateQuestion` Mutation requires an argument of type `UpdateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuestion` Mutation is of type `UpdateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuestionData {
  question_update?: Question_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuestionVariables } from '@dataconnect/generated';
import { useUpdateQuestion } from '@dataconnect/generated/react'

export default function UpdateQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuestion` Mutation requires an argument of type `UpdateQuestionVariables`:
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
  mutation.mutate(updateQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., isPublic: ..., allowPartialScore: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.question_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateQuestion
You can execute the `DeactivateQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateQuestion(options?: useDataConnectMutationOptions<DeactivateQuestionData, FirebaseError, DeactivateQuestionVariables>): UseDataConnectMutationResult<DeactivateQuestionData, DeactivateQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateQuestionData, FirebaseError, DeactivateQuestionVariables>): UseDataConnectMutationResult<DeactivateQuestionData, DeactivateQuestionVariables>;
```

### Variables
The `DeactivateQuestion` Mutation requires an argument of type `DeactivateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateQuestionVariables {
  questionId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateQuestion` Mutation is of type `DeactivateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateQuestionData {
  question_update?: Question_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateQuestionVariables } from '@dataconnect/generated';
import { useDeactivateQuestion } from '@dataconnect/generated/react'

export default function DeactivateQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateQuestion` Mutation requires an argument of type `DeactivateQuestionVariables`:
  const deactivateQuestionVars: DeactivateQuestionVariables = {
    questionId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    userId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., deletedAt: ..., deletedBy: ..., userId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.question_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateQuestion
You can execute the `ReactivateQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateQuestion(options?: useDataConnectMutationOptions<ReactivateQuestionData, FirebaseError, ReactivateQuestionVariables>): UseDataConnectMutationResult<ReactivateQuestionData, ReactivateQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateQuestionData, FirebaseError, ReactivateQuestionVariables>): UseDataConnectMutationResult<ReactivateQuestionData, ReactivateQuestionVariables>;
```

### Variables
The `ReactivateQuestion` Mutation requires an argument of type `ReactivateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateQuestionVariables {
  questionId: UUIDString;
  userId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateQuestion` Mutation is of type `ReactivateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateQuestionData {
  question_update?: Question_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateQuestionVariables } from '@dataconnect/generated';
import { useReactivateQuestion } from '@dataconnect/generated/react'

export default function ReactivateQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateQuestion` Mutation requires an argument of type `ReactivateQuestionVariables`:
  const reactivateQuestionVars: ReactivateQuestionVariables = {
    questionId: ..., 
    userId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., userId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.question_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuestionOption
You can execute the `CreateQuestionOption` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuestionOption(options?: useDataConnectMutationOptions<CreateQuestionOptionData, FirebaseError, CreateQuestionOptionVariables>): UseDataConnectMutationResult<CreateQuestionOptionData, CreateQuestionOptionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuestionOption(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuestionOptionData, FirebaseError, CreateQuestionOptionVariables>): UseDataConnectMutationResult<CreateQuestionOptionData, CreateQuestionOptionVariables>;
```

### Variables
The `CreateQuestionOption` Mutation requires an argument of type `CreateQuestionOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateQuestionOption` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuestionOption` Mutation is of type `CreateQuestionOptionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuestionOptionData {
  questionOption_insert: QuestionOption_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuestionOption`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuestionOptionVariables } from '@dataconnect/generated';
import { useCreateQuestionOption } from '@dataconnect/generated/react'

export default function CreateQuestionOptionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuestionOption();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuestionOption(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionOption(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionOption(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuestionOption` Mutation requires an argument of type `CreateQuestionOptionVariables`:
  const createQuestionOptionVars: CreateQuestionOptionVariables = {
    questionOptionId: ..., 
    text: ..., 
    isCorrect: ..., 
    position: ..., 
    score: ..., // optional
    questionId: ..., 
  };
  mutation.mutate(createQuestionOptionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionOptionId: ..., text: ..., isCorrect: ..., position: ..., score: ..., questionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuestionOptionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionOption_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuestionOption
You can execute the `UpdateQuestionOption` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuestionOption(options?: useDataConnectMutationOptions<UpdateQuestionOptionData, FirebaseError, UpdateQuestionOptionVariables>): UseDataConnectMutationResult<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuestionOption(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuestionOptionData, FirebaseError, UpdateQuestionOptionVariables>): UseDataConnectMutationResult<UpdateQuestionOptionData, UpdateQuestionOptionVariables>;
```

### Variables
The `UpdateQuestionOption` Mutation requires an argument of type `UpdateQuestionOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateQuestionOptionVariables {
  questionOptionId: UUIDString;
  text?: string | null;
  isCorrect?: boolean | null;
  position?: number | null;
  score?: number | null;
}
```
### Return Type
Recall that calling the `UpdateQuestionOption` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuestionOption` Mutation is of type `UpdateQuestionOptionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuestionOptionData {
  questionOption_update?: QuestionOption_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuestionOption`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuestionOptionVariables } from '@dataconnect/generated';
import { useUpdateQuestionOption } from '@dataconnect/generated/react'

export default function UpdateQuestionOptionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuestionOption();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuestionOption(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestionOption(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestionOption(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuestionOption` Mutation requires an argument of type `UpdateQuestionOptionVariables`:
  const updateQuestionOptionVars: UpdateQuestionOptionVariables = {
    questionOptionId: ..., 
    text: ..., // optional
    isCorrect: ..., // optional
    position: ..., // optional
    score: ..., // optional
  };
  mutation.mutate(updateQuestionOptionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionOptionId: ..., text: ..., isCorrect: ..., position: ..., score: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuestionOptionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionOption_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteQuestionOption
You can execute the `DeleteQuestionOption` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteQuestionOption(options?: useDataConnectMutationOptions<DeleteQuestionOptionData, FirebaseError, DeleteQuestionOptionVariables>): UseDataConnectMutationResult<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteQuestionOption(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteQuestionOptionData, FirebaseError, DeleteQuestionOptionVariables>): UseDataConnectMutationResult<DeleteQuestionOptionData, DeleteQuestionOptionVariables>;
```

### Variables
The `DeleteQuestionOption` Mutation requires an argument of type `DeleteQuestionOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteQuestionOptionVariables {
  questionOptionId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteQuestionOption` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteQuestionOption` Mutation is of type `DeleteQuestionOptionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteQuestionOptionData {
  questionOption_delete?: QuestionOption_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteQuestionOption`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteQuestionOptionVariables } from '@dataconnect/generated';
import { useDeleteQuestionOption } from '@dataconnect/generated/react'

export default function DeleteQuestionOptionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteQuestionOption();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteQuestionOption(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuestionOption(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuestionOption(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteQuestionOption` Mutation requires an argument of type `DeleteQuestionOptionVariables`:
  const deleteQuestionOptionVars: DeleteQuestionOptionVariables = {
    questionOptionId: ..., 
  };
  mutation.mutate(deleteQuestionOptionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionOptionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteQuestionOptionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionOption_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuestionType
You can execute the `CreateQuestionType` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuestionType(options?: useDataConnectMutationOptions<CreateQuestionTypeData, FirebaseError, CreateQuestionTypeVariables>): UseDataConnectMutationResult<CreateQuestionTypeData, CreateQuestionTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuestionType(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuestionTypeData, FirebaseError, CreateQuestionTypeVariables>): UseDataConnectMutationResult<CreateQuestionTypeData, CreateQuestionTypeVariables>;
```

### Variables
The `CreateQuestionType` Mutation requires an argument of type `CreateQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateQuestionType` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuestionType` Mutation is of type `CreateQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuestionTypeData {
  questionType_insert: QuestionType_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuestionType`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuestionTypeVariables } from '@dataconnect/generated';
import { useCreateQuestionType } from '@dataconnect/generated/react'

export default function CreateQuestionTypeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuestionType();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuestionType(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionType(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionType(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuestionType` Mutation requires an argument of type `CreateQuestionTypeVariables`:
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
  mutation.mutate(createQuestionTypeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionTypeId: ..., code: ..., name: ..., description: ..., minOptions: ..., maxOptions: ..., correctOptions: ..., active: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuestionTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionType_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuestionType
You can execute the `UpdateQuestionType` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuestionType(options?: useDataConnectMutationOptions<UpdateQuestionTypeData, FirebaseError, UpdateQuestionTypeVariables>): UseDataConnectMutationResult<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuestionType(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuestionTypeData, FirebaseError, UpdateQuestionTypeVariables>): UseDataConnectMutationResult<UpdateQuestionTypeData, UpdateQuestionTypeVariables>;
```

### Variables
The `UpdateQuestionType` Mutation requires an argument of type `UpdateQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateQuestionType` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuestionType` Mutation is of type `UpdateQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuestionTypeData {
  questionType_update?: QuestionType_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuestionType`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuestionTypeVariables } from '@dataconnect/generated';
import { useUpdateQuestionType } from '@dataconnect/generated/react'

export default function UpdateQuestionTypeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuestionType();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuestionType(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestionType(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestionType(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuestionType` Mutation requires an argument of type `UpdateQuestionTypeVariables`:
  const updateQuestionTypeVars: UpdateQuestionTypeVariables = {
    questionTypeId: ..., 
    code: ..., // optional
    name: ..., // optional
    description: ..., // optional
    minOptions: ..., // optional
    maxOptions: ..., // optional
    correctOptions: ..., // optional
  };
  mutation.mutate(updateQuestionTypeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionTypeId: ..., code: ..., name: ..., description: ..., minOptions: ..., maxOptions: ..., correctOptions: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuestionTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionType_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateQuestionType
You can execute the `DeactivateQuestionType` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateQuestionType(options?: useDataConnectMutationOptions<DeactivateQuestionTypeData, FirebaseError, DeactivateQuestionTypeVariables>): UseDataConnectMutationResult<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateQuestionType(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateQuestionTypeData, FirebaseError, DeactivateQuestionTypeVariables>): UseDataConnectMutationResult<DeactivateQuestionTypeData, DeactivateQuestionTypeVariables>;
```

### Variables
The `DeactivateQuestionType` Mutation requires an argument of type `DeactivateQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateQuestionTypeVariables {
  questionTypeId: UUIDString;
}
```
### Return Type
Recall that calling the `DeactivateQuestionType` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateQuestionType` Mutation is of type `DeactivateQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateQuestionTypeData {
  questionType_update?: QuestionType_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateQuestionType`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateQuestionTypeVariables } from '@dataconnect/generated';
import { useDeactivateQuestionType } from '@dataconnect/generated/react'

export default function DeactivateQuestionTypeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateQuestionType();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateQuestionType(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateQuestionType(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateQuestionType(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateQuestionType` Mutation requires an argument of type `DeactivateQuestionTypeVariables`:
  const deactivateQuestionTypeVars: DeactivateQuestionTypeVariables = {
    questionTypeId: ..., 
  };
  mutation.mutate(deactivateQuestionTypeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionTypeId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateQuestionTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionType_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateQuestionType
You can execute the `ReactivateQuestionType` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateQuestionType(options?: useDataConnectMutationOptions<ReactivateQuestionTypeData, FirebaseError, ReactivateQuestionTypeVariables>): UseDataConnectMutationResult<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateQuestionType(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateQuestionTypeData, FirebaseError, ReactivateQuestionTypeVariables>): UseDataConnectMutationResult<ReactivateQuestionTypeData, ReactivateQuestionTypeVariables>;
```

### Variables
The `ReactivateQuestionType` Mutation requires an argument of type `ReactivateQuestionTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateQuestionTypeVariables {
  questionTypeId: UUIDString;
}
```
### Return Type
Recall that calling the `ReactivateQuestionType` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateQuestionType` Mutation is of type `ReactivateQuestionTypeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateQuestionTypeData {
  questionType_update?: QuestionType_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateQuestionType`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateQuestionTypeVariables } from '@dataconnect/generated';
import { useReactivateQuestionType } from '@dataconnect/generated/react'

export default function ReactivateQuestionTypeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateQuestionType();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateQuestionType(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateQuestionType(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateQuestionType(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateQuestionType` Mutation requires an argument of type `ReactivateQuestionTypeVariables`:
  const reactivateQuestionTypeVars: ReactivateQuestionTypeVariables = {
    questionTypeId: ..., 
  };
  mutation.mutate(reactivateQuestionTypeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionTypeId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateQuestionTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionType_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateDifficulty
You can execute the `CreateDifficulty` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateDifficulty(options?: useDataConnectMutationOptions<CreateDifficultyData, FirebaseError, CreateDifficultyVariables>): UseDataConnectMutationResult<CreateDifficultyData, CreateDifficultyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateDifficulty(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDifficultyData, FirebaseError, CreateDifficultyVariables>): UseDataConnectMutationResult<CreateDifficultyData, CreateDifficultyVariables>;
```

### Variables
The `CreateDifficulty` Mutation requires an argument of type `CreateDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateDifficultyVariables {
  difficultyId: UUIDString;
  code: string;
  level: string;
  weight: number;
  description?: string | null;
}
```
### Return Type
Recall that calling the `CreateDifficulty` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateDifficulty` Mutation is of type `CreateDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateDifficultyData {
  difficulty_insert: Difficulty_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateDifficulty`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateDifficultyVariables } from '@dataconnect/generated';
import { useCreateDifficulty } from '@dataconnect/generated/react'

export default function CreateDifficultyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateDifficulty();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateDifficulty(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateDifficulty(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateDifficulty(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateDifficulty` Mutation requires an argument of type `CreateDifficultyVariables`:
  const createDifficultyVars: CreateDifficultyVariables = {
    difficultyId: ..., 
    code: ..., 
    level: ..., 
    weight: ..., 
    description: ..., // optional
  };
  mutation.mutate(createDifficultyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ difficultyId: ..., code: ..., level: ..., weight: ..., description: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createDifficultyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.difficulty_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateDifficulty
You can execute the `DeactivateDifficulty` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateDifficulty(options?: useDataConnectMutationOptions<DeactivateDifficultyData, FirebaseError, DeactivateDifficultyVariables>): UseDataConnectMutationResult<DeactivateDifficultyData, DeactivateDifficultyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateDifficulty(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateDifficultyData, FirebaseError, DeactivateDifficultyVariables>): UseDataConnectMutationResult<DeactivateDifficultyData, DeactivateDifficultyVariables>;
```

### Variables
The `DeactivateDifficulty` Mutation requires an argument of type `DeactivateDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateDifficultyVariables {
  difficultyId: UUIDString;
}
```
### Return Type
Recall that calling the `DeactivateDifficulty` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateDifficulty` Mutation is of type `DeactivateDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateDifficultyData {
  difficulty_update?: Difficulty_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateDifficulty`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateDifficultyVariables } from '@dataconnect/generated';
import { useDeactivateDifficulty } from '@dataconnect/generated/react'

export default function DeactivateDifficultyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateDifficulty();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateDifficulty(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateDifficulty(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateDifficulty(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateDifficulty` Mutation requires an argument of type `DeactivateDifficultyVariables`:
  const deactivateDifficultyVars: DeactivateDifficultyVariables = {
    difficultyId: ..., 
  };
  mutation.mutate(deactivateDifficultyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ difficultyId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateDifficultyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.difficulty_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateDifficulty
You can execute the `ReactivateDifficulty` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateDifficulty(options?: useDataConnectMutationOptions<ReactivateDifficultyData, FirebaseError, ReactivateDifficultyVariables>): UseDataConnectMutationResult<ReactivateDifficultyData, ReactivateDifficultyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateDifficulty(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateDifficultyData, FirebaseError, ReactivateDifficultyVariables>): UseDataConnectMutationResult<ReactivateDifficultyData, ReactivateDifficultyVariables>;
```

### Variables
The `ReactivateDifficulty` Mutation requires an argument of type `ReactivateDifficultyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateDifficultyVariables {
  difficultyId: UUIDString;
}
```
### Return Type
Recall that calling the `ReactivateDifficulty` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateDifficulty` Mutation is of type `ReactivateDifficultyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateDifficultyData {
  difficulty_update?: Difficulty_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateDifficulty`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateDifficultyVariables } from '@dataconnect/generated';
import { useReactivateDifficulty } from '@dataconnect/generated/react'

export default function ReactivateDifficultyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateDifficulty();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateDifficulty(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateDifficulty(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateDifficulty(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateDifficulty` Mutation requires an argument of type `ReactivateDifficultyVariables`:
  const reactivateDifficultyVars: ReactivateDifficultyVariables = {
    difficultyId: ..., 
  };
  mutation.mutate(reactivateDifficultyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ difficultyId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateDifficultyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.difficulty_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTaxonomy
You can execute the `CreateTaxonomy` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTaxonomy(options?: useDataConnectMutationOptions<CreateTaxonomyData, FirebaseError, CreateTaxonomyVariables>): UseDataConnectMutationResult<CreateTaxonomyData, CreateTaxonomyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTaxonomy(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTaxonomyData, FirebaseError, CreateTaxonomyVariables>): UseDataConnectMutationResult<CreateTaxonomyData, CreateTaxonomyVariables>;
```

### Variables
The `CreateTaxonomy` Mutation requires an argument of type `CreateTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateTaxonomy` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTaxonomy` Mutation is of type `CreateTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTaxonomyData {
  taxonomy_insert: Taxonomy_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTaxonomy`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTaxonomyVariables } from '@dataconnect/generated';
import { useCreateTaxonomy } from '@dataconnect/generated/react'

export default function CreateTaxonomyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTaxonomy();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTaxonomy(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTaxonomy(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTaxonomy(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTaxonomy` Mutation requires an argument of type `CreateTaxonomyVariables`:
  const createTaxonomyVars: CreateTaxonomyVariables = {
    taxonomyId: ..., 
    code: ..., 
    name: ..., 
    description: ..., // optional
    level: ..., 
    createdBy: ..., 
  };
  mutation.mutate(createTaxonomyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ taxonomyId: ..., code: ..., name: ..., description: ..., level: ..., createdBy: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTaxonomyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.taxonomy_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTaxonomy
You can execute the `UpdateTaxonomy` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTaxonomy(options?: useDataConnectMutationOptions<UpdateTaxonomyData, FirebaseError, UpdateTaxonomyVariables>): UseDataConnectMutationResult<UpdateTaxonomyData, UpdateTaxonomyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTaxonomy(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTaxonomyData, FirebaseError, UpdateTaxonomyVariables>): UseDataConnectMutationResult<UpdateTaxonomyData, UpdateTaxonomyVariables>;
```

### Variables
The `UpdateTaxonomy` Mutation requires an argument of type `UpdateTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTaxonomy` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTaxonomy` Mutation is of type `UpdateTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTaxonomyData {
  taxonomy_update?: Taxonomy_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTaxonomy`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTaxonomyVariables } from '@dataconnect/generated';
import { useUpdateTaxonomy } from '@dataconnect/generated/react'

export default function UpdateTaxonomyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTaxonomy();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTaxonomy(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTaxonomy(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTaxonomy(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTaxonomy` Mutation requires an argument of type `UpdateTaxonomyVariables`:
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
  mutation.mutate(updateTaxonomyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ taxonomyId: ..., code: ..., name: ..., description: ..., level: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTaxonomyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.taxonomy_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateTaxonomy
You can execute the `DeactivateTaxonomy` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateTaxonomy(options?: useDataConnectMutationOptions<DeactivateTaxonomyData, FirebaseError, DeactivateTaxonomyVariables>): UseDataConnectMutationResult<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateTaxonomy(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateTaxonomyData, FirebaseError, DeactivateTaxonomyVariables>): UseDataConnectMutationResult<DeactivateTaxonomyData, DeactivateTaxonomyVariables>;
```

### Variables
The `DeactivateTaxonomy` Mutation requires an argument of type `DeactivateTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateTaxonomyVariables {
  taxonomyId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateTaxonomy` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateTaxonomy` Mutation is of type `DeactivateTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateTaxonomyData {
  taxonomy_update?: Taxonomy_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateTaxonomy`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateTaxonomyVariables } from '@dataconnect/generated';
import { useDeactivateTaxonomy } from '@dataconnect/generated/react'

export default function DeactivateTaxonomyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateTaxonomy();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateTaxonomy(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateTaxonomy(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateTaxonomy(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateTaxonomy` Mutation requires an argument of type `DeactivateTaxonomyVariables`:
  const deactivateTaxonomyVars: DeactivateTaxonomyVariables = {
    taxonomyId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateTaxonomyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ taxonomyId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateTaxonomyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.taxonomy_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateTaxonomy
You can execute the `ReactivateTaxonomy` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateTaxonomy(options?: useDataConnectMutationOptions<ReactivateTaxonomyData, FirebaseError, ReactivateTaxonomyVariables>): UseDataConnectMutationResult<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateTaxonomy(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateTaxonomyData, FirebaseError, ReactivateTaxonomyVariables>): UseDataConnectMutationResult<ReactivateTaxonomyData, ReactivateTaxonomyVariables>;
```

### Variables
The `ReactivateTaxonomy` Mutation requires an argument of type `ReactivateTaxonomyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateTaxonomyVariables {
  taxonomyId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateTaxonomy` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateTaxonomy` Mutation is of type `ReactivateTaxonomyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateTaxonomyData {
  taxonomy_update?: Taxonomy_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateTaxonomy`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateTaxonomyVariables } from '@dataconnect/generated';
import { useReactivateTaxonomy } from '@dataconnect/generated/react'

export default function ReactivateTaxonomyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateTaxonomy();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateTaxonomy(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateTaxonomy(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateTaxonomy(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateTaxonomy` Mutation requires an argument of type `ReactivateTaxonomyVariables`:
  const reactivateTaxonomyVars: ReactivateTaxonomyVariables = {
    taxonomyId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateTaxonomyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ taxonomyId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateTaxonomyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.taxonomy_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateEvaluation
You can execute the `CreateEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateEvaluation(options?: useDataConnectMutationOptions<CreateEvaluationData, FirebaseError, CreateEvaluationVariables>): UseDataConnectMutationResult<CreateEvaluationData, CreateEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateEvaluationData, FirebaseError, CreateEvaluationVariables>): UseDataConnectMutationResult<CreateEvaluationData, CreateEvaluationVariables>;
```

### Variables
The `CreateEvaluation` Mutation requires an argument of type `CreateEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateEvaluation` Mutation is of type `CreateEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateEvaluationData {
  evaluation_insert: Evaluation_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateEvaluationVariables } from '@dataconnect/generated';
import { useCreateEvaluation } from '@dataconnect/generated/react'

export default function CreateEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateEvaluation` Mutation requires an argument of type `CreateEvaluationVariables`:
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
  mutation.mutate(createEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ evaluationId: ..., title: ..., gradeScale: ..., subjectId: ..., userId: ..., allowQuestionSubset: ..., questionSubsetPercent: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.evaluation_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateEvaluation
You can execute the `UpdateEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateEvaluation(options?: useDataConnectMutationOptions<UpdateEvaluationData, FirebaseError, UpdateEvaluationVariables>): UseDataConnectMutationResult<UpdateEvaluationData, UpdateEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEvaluationData, FirebaseError, UpdateEvaluationVariables>): UseDataConnectMutationResult<UpdateEvaluationData, UpdateEvaluationVariables>;
```

### Variables
The `UpdateEvaluation` Mutation requires an argument of type `UpdateEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateEvaluation` Mutation is of type `UpdateEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateEvaluationData {
  evaluation_update?: Evaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateEvaluationVariables } from '@dataconnect/generated';
import { useUpdateEvaluation } from '@dataconnect/generated/react'

export default function UpdateEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateEvaluation` Mutation requires an argument of type `UpdateEvaluationVariables`:
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
  mutation.mutate(updateEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ evaluationId: ..., title: ..., gradeScale: ..., subjectId: ..., pdfPath: ..., allowQuestionSubset: ..., questionSubsetPercent: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.evaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateEvaluationState
You can execute the `UpdateEvaluationState` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateEvaluationState(options?: useDataConnectMutationOptions<UpdateEvaluationStateData, FirebaseError, UpdateEvaluationStateVariables>): UseDataConnectMutationResult<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateEvaluationState(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEvaluationStateData, FirebaseError, UpdateEvaluationStateVariables>): UseDataConnectMutationResult<UpdateEvaluationStateData, UpdateEvaluationStateVariables>;
```

### Variables
The `UpdateEvaluationState` Mutation requires an argument of type `UpdateEvaluationStateVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateEvaluationStateVariables {
  evaluationId: UUIDString;
  state: string;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `UpdateEvaluationState` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateEvaluationState` Mutation is of type `UpdateEvaluationStateData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateEvaluationStateData {
  evaluation_update?: Evaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateEvaluationState`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateEvaluationStateVariables } from '@dataconnect/generated';
import { useUpdateEvaluationState } from '@dataconnect/generated/react'

export default function UpdateEvaluationStateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateEvaluationState();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateEvaluationState(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEvaluationState(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEvaluationState(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateEvaluationState` Mutation requires an argument of type `UpdateEvaluationStateVariables`:
  const updateEvaluationStateVars: UpdateEvaluationStateVariables = {
    evaluationId: ..., 
    state: ..., 
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateEvaluationStateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ evaluationId: ..., state: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateEvaluationStateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.evaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateEvaluation
You can execute the `DeactivateEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateEvaluation(options?: useDataConnectMutationOptions<DeactivateEvaluationData, FirebaseError, DeactivateEvaluationVariables>): UseDataConnectMutationResult<DeactivateEvaluationData, DeactivateEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateEvaluationData, FirebaseError, DeactivateEvaluationVariables>): UseDataConnectMutationResult<DeactivateEvaluationData, DeactivateEvaluationVariables>;
```

### Variables
The `DeactivateEvaluation` Mutation requires an argument of type `DeactivateEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateEvaluationVariables {
  evaluationId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateEvaluation` Mutation is of type `DeactivateEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateEvaluationData {
  evaluation_update?: Evaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateEvaluationVariables } from '@dataconnect/generated';
import { useDeactivateEvaluation } from '@dataconnect/generated/react'

export default function DeactivateEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateEvaluation` Mutation requires an argument of type `DeactivateEvaluationVariables`:
  const deactivateEvaluationVars: DeactivateEvaluationVariables = {
    evaluationId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ evaluationId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.evaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateEvaluation
You can execute the `ReactivateEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateEvaluation(options?: useDataConnectMutationOptions<ReactivateEvaluationData, FirebaseError, ReactivateEvaluationVariables>): UseDataConnectMutationResult<ReactivateEvaluationData, ReactivateEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateEvaluationData, FirebaseError, ReactivateEvaluationVariables>): UseDataConnectMutationResult<ReactivateEvaluationData, ReactivateEvaluationVariables>;
```

### Variables
The `ReactivateEvaluation` Mutation requires an argument of type `ReactivateEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateEvaluationVariables {
  evaluationId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateEvaluation` Mutation is of type `ReactivateEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateEvaluationData {
  evaluation_update?: Evaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateEvaluationVariables } from '@dataconnect/generated';
import { useReactivateEvaluation } from '@dataconnect/generated/react'

export default function ReactivateEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateEvaluation` Mutation requires an argument of type `ReactivateEvaluationVariables`:
  const reactivateEvaluationVars: ReactivateEvaluationVariables = {
    evaluationId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ evaluationId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.evaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddQuestionToEvaluation
You can execute the `AddQuestionToEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAddQuestionToEvaluation(options?: useDataConnectMutationOptions<AddQuestionToEvaluationData, FirebaseError, AddQuestionToEvaluationVariables>): UseDataConnectMutationResult<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddQuestionToEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<AddQuestionToEvaluationData, FirebaseError, AddQuestionToEvaluationVariables>): UseDataConnectMutationResult<AddQuestionToEvaluationData, AddQuestionToEvaluationVariables>;
```

### Variables
The `AddQuestionToEvaluation` Mutation requires an argument of type `AddQuestionToEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AddQuestionToEvaluationVariables {
  evaluationQuestionId: UUIDString;
  evaluationId: UUIDString;
  questionId: UUIDString;
  points: number;
  position: number;
}
```
### Return Type
Recall that calling the `AddQuestionToEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddQuestionToEvaluation` Mutation is of type `AddQuestionToEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddQuestionToEvaluationData {
  evaluationQuestion_insert: EvaluationQuestion_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddQuestionToEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AddQuestionToEvaluationVariables } from '@dataconnect/generated';
import { useAddQuestionToEvaluation } from '@dataconnect/generated/react'

export default function AddQuestionToEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddQuestionToEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddQuestionToEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddQuestionToEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddQuestionToEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddQuestionToEvaluation` Mutation requires an argument of type `AddQuestionToEvaluationVariables`:
  const addQuestionToEvaluationVars: AddQuestionToEvaluationVariables = {
    evaluationQuestionId: ..., 
    evaluationId: ..., 
    questionId: ..., 
    points: ..., 
    position: ..., 
  };
  mutation.mutate(addQuestionToEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ evaluationQuestionId: ..., evaluationId: ..., questionId: ..., points: ..., position: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(addQuestionToEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.evaluationQuestion_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateEvaluationQuestion
You can execute the `UpdateEvaluationQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateEvaluationQuestion(options?: useDataConnectMutationOptions<UpdateEvaluationQuestionData, FirebaseError, UpdateEvaluationQuestionVariables>): UseDataConnectMutationResult<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateEvaluationQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEvaluationQuestionData, FirebaseError, UpdateEvaluationQuestionVariables>): UseDataConnectMutationResult<UpdateEvaluationQuestionData, UpdateEvaluationQuestionVariables>;
```

### Variables
The `UpdateEvaluationQuestion` Mutation requires an argument of type `UpdateEvaluationQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateEvaluationQuestionVariables {
  evaluationQuestionId: UUIDString;
  points?: number | null;
  position?: number | null;
}
```
### Return Type
Recall that calling the `UpdateEvaluationQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateEvaluationQuestion` Mutation is of type `UpdateEvaluationQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateEvaluationQuestionData {
  evaluationQuestion_update?: EvaluationQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateEvaluationQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateEvaluationQuestionVariables } from '@dataconnect/generated';
import { useUpdateEvaluationQuestion } from '@dataconnect/generated/react'

export default function UpdateEvaluationQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateEvaluationQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateEvaluationQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEvaluationQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEvaluationQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateEvaluationQuestion` Mutation requires an argument of type `UpdateEvaluationQuestionVariables`:
  const updateEvaluationQuestionVars: UpdateEvaluationQuestionVariables = {
    evaluationQuestionId: ..., 
    points: ..., // optional
    position: ..., // optional
  };
  mutation.mutate(updateEvaluationQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ evaluationQuestionId: ..., points: ..., position: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateEvaluationQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.evaluationQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveQuestionFromEvaluation
You can execute the `RemoveQuestionFromEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveQuestionFromEvaluation(options?: useDataConnectMutationOptions<RemoveQuestionFromEvaluationData, FirebaseError, RemoveQuestionFromEvaluationVariables>): UseDataConnectMutationResult<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveQuestionFromEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveQuestionFromEvaluationData, FirebaseError, RemoveQuestionFromEvaluationVariables>): UseDataConnectMutationResult<RemoveQuestionFromEvaluationData, RemoveQuestionFromEvaluationVariables>;
```

### Variables
The `RemoveQuestionFromEvaluation` Mutation requires an argument of type `RemoveQuestionFromEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveQuestionFromEvaluationVariables {
  evaluationQuestionId: UUIDString;
}
```
### Return Type
Recall that calling the `RemoveQuestionFromEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveQuestionFromEvaluation` Mutation is of type `RemoveQuestionFromEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveQuestionFromEvaluationData {
  evaluationQuestion_delete?: EvaluationQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveQuestionFromEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveQuestionFromEvaluationVariables } from '@dataconnect/generated';
import { useRemoveQuestionFromEvaluation } from '@dataconnect/generated/react'

export default function RemoveQuestionFromEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveQuestionFromEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveQuestionFromEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveQuestionFromEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveQuestionFromEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveQuestionFromEvaluation` Mutation requires an argument of type `RemoveQuestionFromEvaluationVariables`:
  const removeQuestionFromEvaluationVars: RemoveQuestionFromEvaluationVariables = {
    evaluationQuestionId: ..., 
  };
  mutation.mutate(removeQuestionFromEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ evaluationQuestionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(removeQuestionFromEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.evaluationQuestion_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AssignEvaluationToCourse
You can execute the `AssignEvaluationToCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAssignEvaluationToCourse(options?: useDataConnectMutationOptions<AssignEvaluationToCourseData, FirebaseError, AssignEvaluationToCourseVariables>): UseDataConnectMutationResult<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAssignEvaluationToCourse(dc: DataConnect, options?: useDataConnectMutationOptions<AssignEvaluationToCourseData, FirebaseError, AssignEvaluationToCourseVariables>): UseDataConnectMutationResult<AssignEvaluationToCourseData, AssignEvaluationToCourseVariables>;
```

### Variables
The `AssignEvaluationToCourse` Mutation requires an argument of type `AssignEvaluationToCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AssignEvaluationToCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignEvaluationToCourse` Mutation is of type `AssignEvaluationToCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AssignEvaluationToCourseData {
  courseEvaluation_insert: CourseEvaluation_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignEvaluationToCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AssignEvaluationToCourseVariables } from '@dataconnect/generated';
import { useAssignEvaluationToCourse } from '@dataconnect/generated/react'

export default function AssignEvaluationToCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAssignEvaluationToCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAssignEvaluationToCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignEvaluationToCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignEvaluationToCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAssignEvaluationToCourse` Mutation requires an argument of type `AssignEvaluationToCourseVariables`:
  const assignEvaluationToCourseVars: AssignEvaluationToCourseVariables = {
    courseEvaluationId: ..., 
    courseId: ..., 
    evaluationId: ..., 
    scheduledDate: ..., 
    durationMinutes: ..., 
    createdBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(assignEvaluationToCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseEvaluationId: ..., courseId: ..., evaluationId: ..., scheduledDate: ..., durationMinutes: ..., createdBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(assignEvaluationToCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseEvaluation_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveEvaluationFromCourse
You can execute the `RemoveEvaluationFromCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveEvaluationFromCourse(options?: useDataConnectMutationOptions<RemoveEvaluationFromCourseData, FirebaseError, RemoveEvaluationFromCourseVariables>): UseDataConnectMutationResult<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveEvaluationFromCourse(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveEvaluationFromCourseData, FirebaseError, RemoveEvaluationFromCourseVariables>): UseDataConnectMutationResult<RemoveEvaluationFromCourseData, RemoveEvaluationFromCourseVariables>;
```

### Variables
The `RemoveEvaluationFromCourse` Mutation requires an argument of type `RemoveEvaluationFromCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveEvaluationFromCourseVariables {
  courseEvaluationId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `RemoveEvaluationFromCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveEvaluationFromCourse` Mutation is of type `RemoveEvaluationFromCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveEvaluationFromCourseData {
  courseEvaluation_delete?: CourseEvaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveEvaluationFromCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveEvaluationFromCourseVariables } from '@dataconnect/generated';
import { useRemoveEvaluationFromCourse } from '@dataconnect/generated/react'

export default function RemoveEvaluationFromCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveEvaluationFromCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveEvaluationFromCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveEvaluationFromCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveEvaluationFromCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveEvaluationFromCourse` Mutation requires an argument of type `RemoveEvaluationFromCourseVariables`:
  const removeEvaluationFromCourseVars: RemoveEvaluationFromCourseVariables = {
    courseEvaluationId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(removeEvaluationFromCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseEvaluationId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(removeEvaluationFromCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseEvaluation_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateCourseEvaluationAccessCode
You can execute the `UpdateCourseEvaluationAccessCode` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateCourseEvaluationAccessCode(options?: useDataConnectMutationOptions<UpdateCourseEvaluationAccessCodeData, FirebaseError, UpdateCourseEvaluationAccessCodeVariables>): UseDataConnectMutationResult<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateCourseEvaluationAccessCode(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCourseEvaluationAccessCodeData, FirebaseError, UpdateCourseEvaluationAccessCodeVariables>): UseDataConnectMutationResult<UpdateCourseEvaluationAccessCodeData, UpdateCourseEvaluationAccessCodeVariables>;
```

### Variables
The `UpdateCourseEvaluationAccessCode` Mutation requires an argument of type `UpdateCourseEvaluationAccessCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateCourseEvaluationAccessCodeVariables {
  courseEvaluationId: UUIDString;
  accessCode: string;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `UpdateCourseEvaluationAccessCode` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateCourseEvaluationAccessCode` Mutation is of type `UpdateCourseEvaluationAccessCodeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateCourseEvaluationAccessCodeData {
  courseEvaluation_update?: CourseEvaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateCourseEvaluationAccessCode`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateCourseEvaluationAccessCodeVariables } from '@dataconnect/generated';
import { useUpdateCourseEvaluationAccessCode } from '@dataconnect/generated/react'

export default function UpdateCourseEvaluationAccessCodeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateCourseEvaluationAccessCode();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateCourseEvaluationAccessCode(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateCourseEvaluationAccessCode(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateCourseEvaluationAccessCode(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateCourseEvaluationAccessCode` Mutation requires an argument of type `UpdateCourseEvaluationAccessCodeVariables`:
  const updateCourseEvaluationAccessCodeVars: UpdateCourseEvaluationAccessCodeVariables = {
    courseEvaluationId: ..., 
    accessCode: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateCourseEvaluationAccessCodeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseEvaluationId: ..., accessCode: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateCourseEvaluationAccessCodeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseEvaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateStudent
You can execute the `CreateStudent` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateStudent(options?: useDataConnectMutationOptions<CreateStudentData, FirebaseError, CreateStudentVariables>): UseDataConnectMutationResult<CreateStudentData, CreateStudentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateStudent(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStudentData, FirebaseError, CreateStudentVariables>): UseDataConnectMutationResult<CreateStudentData, CreateStudentVariables>;
```

### Variables
The `CreateStudent` Mutation requires an argument of type `CreateStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateStudent` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateStudent` Mutation is of type `CreateStudentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateStudentData {
  student_insert: Student_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateStudent`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateStudentVariables } from '@dataconnect/generated';
import { useCreateStudent } from '@dataconnect/generated/react'

export default function CreateStudentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateStudent();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateStudent(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateStudent(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateStudent(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateStudent` Mutation requires an argument of type `CreateStudentVariables`:
  const createStudentVars: CreateStudentVariables = {
    studentId: ..., 
    firstName: ..., 
    lastName: ..., 
    identifier: ..., 
    email: ..., 
    createdBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(createStudentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentId: ..., firstName: ..., lastName: ..., identifier: ..., email: ..., createdBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createStudentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.student_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateStudent
You can execute the `UpdateStudent` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateStudent(options?: useDataConnectMutationOptions<UpdateStudentData, FirebaseError, UpdateStudentVariables>): UseDataConnectMutationResult<UpdateStudentData, UpdateStudentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateStudent(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateStudentData, FirebaseError, UpdateStudentVariables>): UseDataConnectMutationResult<UpdateStudentData, UpdateStudentVariables>;
```

### Variables
The `UpdateStudent` Mutation requires an argument of type `UpdateStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateStudent` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateStudent` Mutation is of type `UpdateStudentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateStudentData {
  student_update?: Student_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateStudent`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateStudentVariables } from '@dataconnect/generated';
import { useUpdateStudent } from '@dataconnect/generated/react'

export default function UpdateStudentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateStudent();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateStudent(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateStudent(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateStudent(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateStudent` Mutation requires an argument of type `UpdateStudentVariables`:
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
  mutation.mutate(updateStudentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentId: ..., firstName: ..., lastName: ..., identifier: ..., email: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateStudentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.student_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeactivateStudent
You can execute the `DeactivateStudent` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeactivateStudent(options?: useDataConnectMutationOptions<DeactivateStudentData, FirebaseError, DeactivateStudentVariables>): UseDataConnectMutationResult<DeactivateStudentData, DeactivateStudentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeactivateStudent(dc: DataConnect, options?: useDataConnectMutationOptions<DeactivateStudentData, FirebaseError, DeactivateStudentVariables>): UseDataConnectMutationResult<DeactivateStudentData, DeactivateStudentVariables>;
```

### Variables
The `DeactivateStudent` Mutation requires an argument of type `DeactivateStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeactivateStudentVariables {
  studentId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `DeactivateStudent` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeactivateStudent` Mutation is of type `DeactivateStudentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeactivateStudentData {
  student_update?: Student_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeactivateStudent`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeactivateStudentVariables } from '@dataconnect/generated';
import { useDeactivateStudent } from '@dataconnect/generated/react'

export default function DeactivateStudentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeactivateStudent();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeactivateStudent(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateStudent(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeactivateStudent(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeactivateStudent` Mutation requires an argument of type `DeactivateStudentVariables`:
  const deactivateStudentVars: DeactivateStudentVariables = {
    studentId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(deactivateStudentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deactivateStudentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.student_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReactivateStudent
You can execute the `ReactivateStudent` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReactivateStudent(options?: useDataConnectMutationOptions<ReactivateStudentData, FirebaseError, ReactivateStudentVariables>): UseDataConnectMutationResult<ReactivateStudentData, ReactivateStudentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReactivateStudent(dc: DataConnect, options?: useDataConnectMutationOptions<ReactivateStudentData, FirebaseError, ReactivateStudentVariables>): UseDataConnectMutationResult<ReactivateStudentData, ReactivateStudentVariables>;
```

### Variables
The `ReactivateStudent` Mutation requires an argument of type `ReactivateStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReactivateStudentVariables {
  studentId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReactivateStudent` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReactivateStudent` Mutation is of type `ReactivateStudentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReactivateStudentData {
  student_update?: Student_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReactivateStudent`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReactivateStudentVariables } from '@dataconnect/generated';
import { useReactivateStudent } from '@dataconnect/generated/react'

export default function ReactivateStudentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReactivateStudent();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReactivateStudent(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateStudent(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReactivateStudent(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReactivateStudent` Mutation requires an argument of type `ReactivateStudentVariables`:
  const reactivateStudentVars: ReactivateStudentVariables = {
    studentId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reactivateStudentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reactivateStudentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.student_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EnrollStudentInCourse
You can execute the `EnrollStudentInCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEnrollStudentInCourse(options?: useDataConnectMutationOptions<EnrollStudentInCourseData, FirebaseError, EnrollStudentInCourseVariables>): UseDataConnectMutationResult<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEnrollStudentInCourse(dc: DataConnect, options?: useDataConnectMutationOptions<EnrollStudentInCourseData, FirebaseError, EnrollStudentInCourseVariables>): UseDataConnectMutationResult<EnrollStudentInCourseData, EnrollStudentInCourseVariables>;
```

### Variables
The `EnrollStudentInCourse` Mutation requires an argument of type `EnrollStudentInCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `EnrollStudentInCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EnrollStudentInCourse` Mutation is of type `EnrollStudentInCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EnrollStudentInCourseData {
  courseStudent_insert: CourseStudent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EnrollStudentInCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EnrollStudentInCourseVariables } from '@dataconnect/generated';
import { useEnrollStudentInCourse } from '@dataconnect/generated/react'

export default function EnrollStudentInCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEnrollStudentInCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEnrollStudentInCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnrollStudentInCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnrollStudentInCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEnrollStudentInCourse` Mutation requires an argument of type `EnrollStudentInCourseVariables`:
  const enrollStudentInCourseVars: EnrollStudentInCourseVariables = {
    courseStudentId: ..., 
    courseId: ..., 
    studentId: ..., 
    enrolledOn: ..., 
    createdBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(enrollStudentInCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseStudentId: ..., courseId: ..., studentId: ..., enrolledOn: ..., createdBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(enrollStudentInCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseStudent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateCourseStudent
You can execute the `UpdateCourseStudent` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateCourseStudent(options?: useDataConnectMutationOptions<UpdateCourseStudentData, FirebaseError, UpdateCourseStudentVariables>): UseDataConnectMutationResult<UpdateCourseStudentData, UpdateCourseStudentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateCourseStudent(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCourseStudentData, FirebaseError, UpdateCourseStudentVariables>): UseDataConnectMutationResult<UpdateCourseStudentData, UpdateCourseStudentVariables>;
```

### Variables
The `UpdateCourseStudent` Mutation requires an argument of type `UpdateCourseStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateCourseStudentVariables {
  courseStudentId: UUIDString;
  enrolledOn?: DateString | null;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `UpdateCourseStudent` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateCourseStudent` Mutation is of type `UpdateCourseStudentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateCourseStudentData {
  courseStudent_update?: CourseStudent_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateCourseStudent`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateCourseStudentVariables } from '@dataconnect/generated';
import { useUpdateCourseStudent } from '@dataconnect/generated/react'

export default function UpdateCourseStudentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateCourseStudent();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateCourseStudent(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateCourseStudent(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateCourseStudent(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateCourseStudent` Mutation requires an argument of type `UpdateCourseStudentVariables`:
  const updateCourseStudentVars: UpdateCourseStudentVariables = {
    courseStudentId: ..., 
    enrolledOn: ..., // optional
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateCourseStudentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseStudentId: ..., enrolledOn: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateCourseStudentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseStudent_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UnenrollStudentFromCourse
You can execute the `UnenrollStudentFromCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUnenrollStudentFromCourse(options?: useDataConnectMutationOptions<UnenrollStudentFromCourseData, FirebaseError, UnenrollStudentFromCourseVariables>): UseDataConnectMutationResult<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUnenrollStudentFromCourse(dc: DataConnect, options?: useDataConnectMutationOptions<UnenrollStudentFromCourseData, FirebaseError, UnenrollStudentFromCourseVariables>): UseDataConnectMutationResult<UnenrollStudentFromCourseData, UnenrollStudentFromCourseVariables>;
```

### Variables
The `UnenrollStudentFromCourse` Mutation requires an argument of type `UnenrollStudentFromCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UnenrollStudentFromCourseVariables {
  courseStudentId: UUIDString;
  deletedAt: TimestampString;
  deletedBy: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `UnenrollStudentFromCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UnenrollStudentFromCourse` Mutation is of type `UnenrollStudentFromCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UnenrollStudentFromCourseData {
  courseStudent_update?: CourseStudent_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UnenrollStudentFromCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UnenrollStudentFromCourseVariables } from '@dataconnect/generated';
import { useUnenrollStudentFromCourse } from '@dataconnect/generated/react'

export default function UnenrollStudentFromCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUnenrollStudentFromCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUnenrollStudentFromCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUnenrollStudentFromCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUnenrollStudentFromCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUnenrollStudentFromCourse` Mutation requires an argument of type `UnenrollStudentFromCourseVariables`:
  const unenrollStudentFromCourseVars: UnenrollStudentFromCourseVariables = {
    courseStudentId: ..., 
    deletedAt: ..., 
    deletedBy: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(unenrollStudentFromCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseStudentId: ..., deletedAt: ..., deletedBy: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(unenrollStudentFromCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseStudent_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReenrollStudentInCourse
You can execute the `ReenrollStudentInCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useReenrollStudentInCourse(options?: useDataConnectMutationOptions<ReenrollStudentInCourseData, FirebaseError, ReenrollStudentInCourseVariables>): UseDataConnectMutationResult<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReenrollStudentInCourse(dc: DataConnect, options?: useDataConnectMutationOptions<ReenrollStudentInCourseData, FirebaseError, ReenrollStudentInCourseVariables>): UseDataConnectMutationResult<ReenrollStudentInCourseData, ReenrollStudentInCourseVariables>;
```

### Variables
The `ReenrollStudentInCourse` Mutation requires an argument of type `ReenrollStudentInCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ReenrollStudentInCourseVariables {
  courseStudentId: UUIDString;
  firebaseId: string;
}
```
### Return Type
Recall that calling the `ReenrollStudentInCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReenrollStudentInCourse` Mutation is of type `ReenrollStudentInCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReenrollStudentInCourseData {
  courseStudent_update?: CourseStudent_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReenrollStudentInCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReenrollStudentInCourseVariables } from '@dataconnect/generated';
import { useReenrollStudentInCourse } from '@dataconnect/generated/react'

export default function ReenrollStudentInCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReenrollStudentInCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReenrollStudentInCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReenrollStudentInCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReenrollStudentInCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReenrollStudentInCourse` Mutation requires an argument of type `ReenrollStudentInCourseVariables`:
  const reenrollStudentInCourseVars: ReenrollStudentInCourseVariables = {
    courseStudentId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(reenrollStudentInCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseStudentId: ..., firebaseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reenrollStudentInCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseStudent_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateStudentEvaluation
You can execute the `CreateStudentEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateStudentEvaluation(options?: useDataConnectMutationOptions<CreateStudentEvaluationData, FirebaseError, CreateStudentEvaluationVariables>): UseDataConnectMutationResult<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateStudentEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStudentEvaluationData, FirebaseError, CreateStudentEvaluationVariables>): UseDataConnectMutationResult<CreateStudentEvaluationData, CreateStudentEvaluationVariables>;
```

### Variables
The `CreateStudentEvaluation` Mutation requires an argument of type `CreateStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
  courseEvaluationId: UUIDString;
  courseStudentId: UUIDString;
}
```
### Return Type
Recall that calling the `CreateStudentEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateStudentEvaluation` Mutation is of type `CreateStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateStudentEvaluationData {
  studentCourseEvaluation_insert: StudentCourseEvaluation_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateStudentEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateStudentEvaluationVariables } from '@dataconnect/generated';
import { useCreateStudentEvaluation } from '@dataconnect/generated/react'

export default function CreateStudentEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateStudentEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateStudentEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateStudentEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateStudentEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateStudentEvaluation` Mutation requires an argument of type `CreateStudentEvaluationVariables`:
  const createStudentEvaluationVars: CreateStudentEvaluationVariables = {
    studentCourseEvaluationId: ..., 
    courseEvaluationId: ..., 
    courseStudentId: ..., 
  };
  mutation.mutate(createStudentEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentCourseEvaluationId: ..., courseEvaluationId: ..., courseStudentId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createStudentEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentCourseEvaluation_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateStudentEvaluationState
You can execute the `UpdateStudentEvaluationState` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateStudentEvaluationState(options?: useDataConnectMutationOptions<UpdateStudentEvaluationStateData, FirebaseError, UpdateStudentEvaluationStateVariables>): UseDataConnectMutationResult<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateStudentEvaluationState(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateStudentEvaluationStateData, FirebaseError, UpdateStudentEvaluationStateVariables>): UseDataConnectMutationResult<UpdateStudentEvaluationStateData, UpdateStudentEvaluationStateVariables>;
```

### Variables
The `UpdateStudentEvaluationState` Mutation requires an argument of type `UpdateStudentEvaluationStateVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateStudentEvaluationStateVariables {
  studentCourseEvaluationId: UUIDString;
  state: string;
}
```
### Return Type
Recall that calling the `UpdateStudentEvaluationState` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateStudentEvaluationState` Mutation is of type `UpdateStudentEvaluationStateData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateStudentEvaluationStateData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateStudentEvaluationState`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateStudentEvaluationStateVariables } from '@dataconnect/generated';
import { useUpdateStudentEvaluationState } from '@dataconnect/generated/react'

export default function UpdateStudentEvaluationStateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateStudentEvaluationState();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateStudentEvaluationState(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateStudentEvaluationState(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateStudentEvaluationState(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateStudentEvaluationState` Mutation requires an argument of type `UpdateStudentEvaluationStateVariables`:
  const updateStudentEvaluationStateVars: UpdateStudentEvaluationStateVariables = {
    studentCourseEvaluationId: ..., 
    state: ..., 
  };
  mutation.mutate(updateStudentEvaluationStateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentCourseEvaluationId: ..., state: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateStudentEvaluationStateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentCourseEvaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## StartStudentEvaluation
You can execute the `StartStudentEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useStartStudentEvaluation(options?: useDataConnectMutationOptions<StartStudentEvaluationData, FirebaseError, StartStudentEvaluationVariables>): UseDataConnectMutationResult<StartStudentEvaluationData, StartStudentEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useStartStudentEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<StartStudentEvaluationData, FirebaseError, StartStudentEvaluationVariables>): UseDataConnectMutationResult<StartStudentEvaluationData, StartStudentEvaluationVariables>;
```

### Variables
The `StartStudentEvaluation` Mutation requires an argument of type `StartStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface StartStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
  takenOn: TimestampString;
  attemptNo: number;
}
```
### Return Type
Recall that calling the `StartStudentEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `StartStudentEvaluation` Mutation is of type `StartStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface StartStudentEvaluationData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `StartStudentEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, StartStudentEvaluationVariables } from '@dataconnect/generated';
import { useStartStudentEvaluation } from '@dataconnect/generated/react'

export default function StartStudentEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useStartStudentEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useStartStudentEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useStartStudentEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useStartStudentEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useStartStudentEvaluation` Mutation requires an argument of type `StartStudentEvaluationVariables`:
  const startStudentEvaluationVars: StartStudentEvaluationVariables = {
    studentCourseEvaluationId: ..., 
    takenOn: ..., 
    attemptNo: ..., 
  };
  mutation.mutate(startStudentEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentCourseEvaluationId: ..., takenOn: ..., attemptNo: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(startStudentEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentCourseEvaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CompleteStudentEvaluation
You can execute the `CompleteStudentEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCompleteStudentEvaluation(options?: useDataConnectMutationOptions<CompleteStudentEvaluationData, FirebaseError, CompleteStudentEvaluationVariables>): UseDataConnectMutationResult<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCompleteStudentEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<CompleteStudentEvaluationData, FirebaseError, CompleteStudentEvaluationVariables>): UseDataConnectMutationResult<CompleteStudentEvaluationData, CompleteStudentEvaluationVariables>;
```

### Variables
The `CompleteStudentEvaluation` Mutation requires an argument of type `CompleteStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CompleteStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
}
```
### Return Type
Recall that calling the `CompleteStudentEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CompleteStudentEvaluation` Mutation is of type `CompleteStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CompleteStudentEvaluationData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CompleteStudentEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CompleteStudentEvaluationVariables } from '@dataconnect/generated';
import { useCompleteStudentEvaluation } from '@dataconnect/generated/react'

export default function CompleteStudentEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCompleteStudentEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCompleteStudentEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCompleteStudentEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCompleteStudentEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCompleteStudentEvaluation` Mutation requires an argument of type `CompleteStudentEvaluationVariables`:
  const completeStudentEvaluationVars: CompleteStudentEvaluationVariables = {
    studentCourseEvaluationId: ..., 
  };
  mutation.mutate(completeStudentEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentCourseEvaluationId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(completeStudentEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentCourseEvaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GradeStudentEvaluation
You can execute the `GradeStudentEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useGradeStudentEvaluation(options?: useDataConnectMutationOptions<GradeStudentEvaluationData, FirebaseError, GradeStudentEvaluationVariables>): UseDataConnectMutationResult<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useGradeStudentEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<GradeStudentEvaluationData, FirebaseError, GradeStudentEvaluationVariables>): UseDataConnectMutationResult<GradeStudentEvaluationData, GradeStudentEvaluationVariables>;
```

### Variables
The `GradeStudentEvaluation` Mutation requires an argument of type `GradeStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GradeStudentEvaluationVariables {
  studentCourseEvaluationId: UUIDString;
  totalScore: number;
  grade: number;
}
```
### Return Type
Recall that calling the `GradeStudentEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `GradeStudentEvaluation` Mutation is of type `GradeStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GradeStudentEvaluationData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `GradeStudentEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GradeStudentEvaluationVariables } from '@dataconnect/generated';
import { useGradeStudentEvaluation } from '@dataconnect/generated/react'

export default function GradeStudentEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useGradeStudentEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useGradeStudentEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useGradeStudentEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useGradeStudentEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useGradeStudentEvaluation` Mutation requires an argument of type `GradeStudentEvaluationVariables`:
  const gradeStudentEvaluationVars: GradeStudentEvaluationVariables = {
    studentCourseEvaluationId: ..., 
    totalScore: ..., 
    grade: ..., 
  };
  mutation.mutate(gradeStudentEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentCourseEvaluationId: ..., totalScore: ..., grade: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(gradeStudentEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentCourseEvaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateStudentEvaluationScore
You can execute the `UpdateStudentEvaluationScore` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateStudentEvaluationScore(options?: useDataConnectMutationOptions<UpdateStudentEvaluationScoreData, FirebaseError, UpdateStudentEvaluationScoreVariables>): UseDataConnectMutationResult<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateStudentEvaluationScore(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateStudentEvaluationScoreData, FirebaseError, UpdateStudentEvaluationScoreVariables>): UseDataConnectMutationResult<UpdateStudentEvaluationScoreData, UpdateStudentEvaluationScoreVariables>;
```

### Variables
The `UpdateStudentEvaluationScore` Mutation requires an argument of type `UpdateStudentEvaluationScoreVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateStudentEvaluationScoreVariables {
  studentCourseEvaluationId: UUIDString;
  totalScore: number;
}
```
### Return Type
Recall that calling the `UpdateStudentEvaluationScore` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateStudentEvaluationScore` Mutation is of type `UpdateStudentEvaluationScoreData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateStudentEvaluationScoreData {
  studentCourseEvaluation_update?: StudentCourseEvaluation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateStudentEvaluationScore`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateStudentEvaluationScoreVariables } from '@dataconnect/generated';
import { useUpdateStudentEvaluationScore } from '@dataconnect/generated/react'

export default function UpdateStudentEvaluationScoreComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateStudentEvaluationScore();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateStudentEvaluationScore(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateStudentEvaluationScore(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateStudentEvaluationScore(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateStudentEvaluationScore` Mutation requires an argument of type `UpdateStudentEvaluationScoreVariables`:
  const updateStudentEvaluationScoreVars: UpdateStudentEvaluationScoreVariables = {
    studentCourseEvaluationId: ..., 
    totalScore: ..., 
  };
  mutation.mutate(updateStudentEvaluationScoreVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentCourseEvaluationId: ..., totalScore: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateStudentEvaluationScoreVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentCourseEvaluation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddQuestionToStudentEvaluation
You can execute the `AddQuestionToStudentEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAddQuestionToStudentEvaluation(options?: useDataConnectMutationOptions<AddQuestionToStudentEvaluationData, FirebaseError, AddQuestionToStudentEvaluationVariables>): UseDataConnectMutationResult<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddQuestionToStudentEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<AddQuestionToStudentEvaluationData, FirebaseError, AddQuestionToStudentEvaluationVariables>): UseDataConnectMutationResult<AddQuestionToStudentEvaluationData, AddQuestionToStudentEvaluationVariables>;
```

### Variables
The `AddQuestionToStudentEvaluation` Mutation requires an argument of type `AddQuestionToStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AddQuestionToStudentEvaluationVariables {
  studentEvaluationQuestionId: UUIDString;
  studentEvaluationId: UUIDString;
  evaluationQuestionId: UUIDString;
  position: number;
}
```
### Return Type
Recall that calling the `AddQuestionToStudentEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddQuestionToStudentEvaluation` Mutation is of type `AddQuestionToStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddQuestionToStudentEvaluationData {
  studentEvaluationQuestion_insert: StudentEvaluationQuestion_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddQuestionToStudentEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AddQuestionToStudentEvaluationVariables } from '@dataconnect/generated';
import { useAddQuestionToStudentEvaluation } from '@dataconnect/generated/react'

export default function AddQuestionToStudentEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddQuestionToStudentEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddQuestionToStudentEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddQuestionToStudentEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddQuestionToStudentEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddQuestionToStudentEvaluation` Mutation requires an argument of type `AddQuestionToStudentEvaluationVariables`:
  const addQuestionToStudentEvaluationVars: AddQuestionToStudentEvaluationVariables = {
    studentEvaluationQuestionId: ..., 
    studentEvaluationId: ..., 
    evaluationQuestionId: ..., 
    position: ..., 
  };
  mutation.mutate(addQuestionToStudentEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentEvaluationQuestionId: ..., studentEvaluationId: ..., evaluationQuestionId: ..., position: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(addQuestionToStudentEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentEvaluationQuestion_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GradeStudentQuestion
You can execute the `GradeStudentQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useGradeStudentQuestion(options?: useDataConnectMutationOptions<GradeStudentQuestionData, FirebaseError, GradeStudentQuestionVariables>): UseDataConnectMutationResult<GradeStudentQuestionData, GradeStudentQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useGradeStudentQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<GradeStudentQuestionData, FirebaseError, GradeStudentQuestionVariables>): UseDataConnectMutationResult<GradeStudentQuestionData, GradeStudentQuestionVariables>;
```

### Variables
The `GradeStudentQuestion` Mutation requires an argument of type `GradeStudentQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GradeStudentQuestionVariables {
  studentEvaluationQuestionId: UUIDString;
  scoreObtained: number;
  isCorrect: boolean;
}
```
### Return Type
Recall that calling the `GradeStudentQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `GradeStudentQuestion` Mutation is of type `GradeStudentQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GradeStudentQuestionData {
  studentEvaluationQuestion_update?: StudentEvaluationQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `GradeStudentQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GradeStudentQuestionVariables } from '@dataconnect/generated';
import { useGradeStudentQuestion } from '@dataconnect/generated/react'

export default function GradeStudentQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useGradeStudentQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useGradeStudentQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useGradeStudentQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useGradeStudentQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useGradeStudentQuestion` Mutation requires an argument of type `GradeStudentQuestionVariables`:
  const gradeStudentQuestionVars: GradeStudentQuestionVariables = {
    studentEvaluationQuestionId: ..., 
    scoreObtained: ..., 
    isCorrect: ..., 
  };
  mutation.mutate(gradeStudentQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentEvaluationQuestionId: ..., scoreObtained: ..., isCorrect: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(gradeStudentQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentEvaluationQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateStudentQuestionPosition
You can execute the `UpdateStudentQuestionPosition` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateStudentQuestionPosition(options?: useDataConnectMutationOptions<UpdateStudentQuestionPositionData, FirebaseError, UpdateStudentQuestionPositionVariables>): UseDataConnectMutationResult<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateStudentQuestionPosition(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateStudentQuestionPositionData, FirebaseError, UpdateStudentQuestionPositionVariables>): UseDataConnectMutationResult<UpdateStudentQuestionPositionData, UpdateStudentQuestionPositionVariables>;
```

### Variables
The `UpdateStudentQuestionPosition` Mutation requires an argument of type `UpdateStudentQuestionPositionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateStudentQuestionPositionVariables {
  studentEvaluationQuestionId: UUIDString;
  position: number;
}
```
### Return Type
Recall that calling the `UpdateStudentQuestionPosition` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateStudentQuestionPosition` Mutation is of type `UpdateStudentQuestionPositionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateStudentQuestionPositionData {
  studentEvaluationQuestion_update?: StudentEvaluationQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateStudentQuestionPosition`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateStudentQuestionPositionVariables } from '@dataconnect/generated';
import { useUpdateStudentQuestionPosition } from '@dataconnect/generated/react'

export default function UpdateStudentQuestionPositionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateStudentQuestionPosition();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateStudentQuestionPosition(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateStudentQuestionPosition(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateStudentQuestionPosition(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateStudentQuestionPosition` Mutation requires an argument of type `UpdateStudentQuestionPositionVariables`:
  const updateStudentQuestionPositionVars: UpdateStudentQuestionPositionVariables = {
    studentEvaluationQuestionId: ..., 
    position: ..., 
  };
  mutation.mutate(updateStudentQuestionPositionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentEvaluationQuestionId: ..., position: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateStudentQuestionPositionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentEvaluationQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveQuestionFromStudentEvaluation
You can execute the `RemoveQuestionFromStudentEvaluation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveQuestionFromStudentEvaluation(options?: useDataConnectMutationOptions<RemoveQuestionFromStudentEvaluationData, FirebaseError, RemoveQuestionFromStudentEvaluationVariables>): UseDataConnectMutationResult<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveQuestionFromStudentEvaluation(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveQuestionFromStudentEvaluationData, FirebaseError, RemoveQuestionFromStudentEvaluationVariables>): UseDataConnectMutationResult<RemoveQuestionFromStudentEvaluationData, RemoveQuestionFromStudentEvaluationVariables>;
```

### Variables
The `RemoveQuestionFromStudentEvaluation` Mutation requires an argument of type `RemoveQuestionFromStudentEvaluationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveQuestionFromStudentEvaluationVariables {
  studentEvaluationQuestionId: UUIDString;
}
```
### Return Type
Recall that calling the `RemoveQuestionFromStudentEvaluation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveQuestionFromStudentEvaluation` Mutation is of type `RemoveQuestionFromStudentEvaluationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveQuestionFromStudentEvaluationData {
  studentEvaluationQuestion_delete?: StudentEvaluationQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveQuestionFromStudentEvaluation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveQuestionFromStudentEvaluationVariables } from '@dataconnect/generated';
import { useRemoveQuestionFromStudentEvaluation } from '@dataconnect/generated/react'

export default function RemoveQuestionFromStudentEvaluationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveQuestionFromStudentEvaluation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveQuestionFromStudentEvaluation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveQuestionFromStudentEvaluation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveQuestionFromStudentEvaluation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveQuestionFromStudentEvaluation` Mutation requires an argument of type `RemoveQuestionFromStudentEvaluationVariables`:
  const removeQuestionFromStudentEvaluationVars: RemoveQuestionFromStudentEvaluationVariables = {
    studentEvaluationQuestionId: ..., 
  };
  mutation.mutate(removeQuestionFromStudentEvaluationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentEvaluationQuestionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(removeQuestionFromStudentEvaluationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentEvaluationQuestion_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RegisterStudentAnswer
You can execute the `RegisterStudentAnswer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useRegisterStudentAnswer(options?: useDataConnectMutationOptions<RegisterStudentAnswerData, FirebaseError, RegisterStudentAnswerVariables>): UseDataConnectMutationResult<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRegisterStudentAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<RegisterStudentAnswerData, FirebaseError, RegisterStudentAnswerVariables>): UseDataConnectMutationResult<RegisterStudentAnswerData, RegisterStudentAnswerVariables>;
```

### Variables
The `RegisterStudentAnswer` Mutation requires an argument of type `RegisterStudentAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RegisterStudentAnswerVariables {
  studentAnswerOptionId: UUIDString;
  studentEvaluationQuestionId: UUIDString;
  questionOptionId: UUIDString;
}
```
### Return Type
Recall that calling the `RegisterStudentAnswer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RegisterStudentAnswer` Mutation is of type `RegisterStudentAnswerData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RegisterStudentAnswerData {
  studentAnswerOption_insert: StudentAnswerOption_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RegisterStudentAnswer`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RegisterStudentAnswerVariables } from '@dataconnect/generated';
import { useRegisterStudentAnswer } from '@dataconnect/generated/react'

export default function RegisterStudentAnswerComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRegisterStudentAnswer();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRegisterStudentAnswer(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRegisterStudentAnswer(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRegisterStudentAnswer(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRegisterStudentAnswer` Mutation requires an argument of type `RegisterStudentAnswerVariables`:
  const registerStudentAnswerVars: RegisterStudentAnswerVariables = {
    studentAnswerOptionId: ..., 
    studentEvaluationQuestionId: ..., 
    questionOptionId: ..., 
  };
  mutation.mutate(registerStudentAnswerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentAnswerOptionId: ..., studentEvaluationQuestionId: ..., questionOptionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(registerStudentAnswerVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentAnswerOption_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveStudentAnswer
You can execute the `RemoveStudentAnswer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveStudentAnswer(options?: useDataConnectMutationOptions<RemoveStudentAnswerData, FirebaseError, RemoveStudentAnswerVariables>): UseDataConnectMutationResult<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveStudentAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveStudentAnswerData, FirebaseError, RemoveStudentAnswerVariables>): UseDataConnectMutationResult<RemoveStudentAnswerData, RemoveStudentAnswerVariables>;
```

### Variables
The `RemoveStudentAnswer` Mutation requires an argument of type `RemoveStudentAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveStudentAnswerVariables {
  studentAnswerOptionId: UUIDString;
}
```
### Return Type
Recall that calling the `RemoveStudentAnswer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveStudentAnswer` Mutation is of type `RemoveStudentAnswerData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveStudentAnswerData {
  studentAnswerOption_delete?: StudentAnswerOption_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveStudentAnswer`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveStudentAnswerVariables } from '@dataconnect/generated';
import { useRemoveStudentAnswer } from '@dataconnect/generated/react'

export default function RemoveStudentAnswerComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveStudentAnswer();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveStudentAnswer(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveStudentAnswer(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveStudentAnswer(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveStudentAnswer` Mutation requires an argument of type `RemoveStudentAnswerVariables`:
  const removeStudentAnswerVars: RemoveStudentAnswerVariables = {
    studentAnswerOptionId: ..., 
  };
  mutation.mutate(removeStudentAnswerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ studentAnswerOptionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(removeStudentAnswerVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.studentAnswerOption_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

