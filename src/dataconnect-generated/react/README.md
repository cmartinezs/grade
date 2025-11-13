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
  - [*GetQuestion*](#getquestion)
  - [*ListPublicQuestions*](#listpublicquestions)
  - [*ListPublicQuestionsByDifficulty*](#listpublicquestionsbydifficulty)
  - [*ListPublicQuestionsByType*](#listpublicquestionsbytype)
  - [*GetQuestionOptions*](#getquestionoptions)
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
  - [*DeactivateQuestionType*](#deactivatequestiontype)
  - [*ReactivateQuestionType*](#reactivatequestiontype)
  - [*CreateDifficulty*](#createdifficulty)
  - [*DeactivateDifficulty*](#deactivatedifficulty)
  - [*ReactivateDifficulty*](#reactivatedifficulty)
  - [*CreateTaxonomy*](#createtaxonomy)
  - [*UpdateTaxonomy*](#updatetaxonomy)
  - [*DeactivateTaxonomy*](#deactivatetaxonomy)
  - [*ReactivateTaxonomy*](#reactivatetaxonomy)

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
    name: string;
    subjectId: UUIDString;
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
    name: string;
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
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    updatedBy?: UUIDString | null;
    deletedAt?: TimestampString | null;
    deletedBy?: UUIDString | null;
  } & Question_Key)[];
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
    createdBy: ..., 
  };
  mutation.mutate(createSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ subjectId: ..., name: ..., code: ..., levelId: ..., createdBy: ..., });

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
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ subjectId: ..., name: ..., code: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

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
    name: ..., 
    description: ..., // optional
    subjectId: ..., 
    createdBy: ..., 
  };
  mutation.mutate(createUnitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ unitId: ..., name: ..., description: ..., subjectId: ..., createdBy: ..., });

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
    name: ..., 
    description: ..., // optional
    subjectId: ..., 
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateUnitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ unitId: ..., name: ..., description: ..., subjectId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

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
    name: ..., 
    unitId: ..., 
    createdBy: ..., 
  };
  mutation.mutate(createTopicVars);
  // Variables can be defined inline as well.
  mutation.mutate({ topicId: ..., name: ..., unitId: ..., createdBy: ..., });

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
    name: ..., 
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateTopicVars);
  // Variables can be defined inline as well.
  mutation.mutate({ topicId: ..., unitId: ..., name: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

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
    institutionName: ..., 
    levelId: ..., 
    userId: ..., 
    createdBy: ..., 
  };
  mutation.mutate(createCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., name: ..., code: ..., institutionName: ..., levelId: ..., userId: ..., createdBy: ..., });

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
    institutionName: ..., 
    levelId: ..., 
    userId: ..., 
    updatedBy: ..., 
    updatedAt: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., name: ..., code: ..., institutionName: ..., levelId: ..., userId: ..., updatedBy: ..., updatedAt: ..., firebaseId: ..., });

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
    firebaseId: ..., 
  };
  mutation.mutate(createQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., taxonomyId: ..., userId: ..., isPublic: ..., firebaseId: ..., });

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
    version: ..., 
    originalQuestionId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(createQuestionVersionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., taxonomyId: ..., userId: ..., isPublic: ..., version: ..., originalQuestionId: ..., firebaseId: ..., });

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
  updatedBy: UUIDString;
  updatedAt: TimestampString;
  userId: UUIDString;
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
    updatedBy: ..., 
    updatedAt: ..., 
    userId: ..., 
    firebaseId: ..., 
  };
  mutation.mutate(updateQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., text: ..., topicId: ..., difficultyId: ..., questionTypeId: ..., isPublic: ..., updatedBy: ..., updatedAt: ..., userId: ..., firebaseId: ..., });

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
    active: ..., 
  };
  mutation.mutate(createQuestionTypeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionTypeId: ..., code: ..., name: ..., description: ..., active: ..., });

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
    level: ..., 
    weight: ..., 
    description: ..., // optional
  };
  mutation.mutate(createDifficultyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ difficultyId: ..., level: ..., weight: ..., description: ..., });

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

