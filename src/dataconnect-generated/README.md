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
  - [*ListSubjects*](#listsubjects)
  - [*GetSubject*](#getsubject)
  - [*ListUnits*](#listunits)
  - [*GetUnit*](#getunit)
  - [*ListTopics*](#listtopics)
  - [*GetTopic*](#gettopic)
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
    active: boolean;
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
    name: string;
    subjectId: UUIDString;
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
    name: string;
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
  authId: string;
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
  authId: ..., 
  name: ..., 
  email: ..., 
  role: ..., 
  createdBy: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ userId: ..., authId: ..., name: ..., email: ..., role: ..., createdBy: ..., });

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
  authId: ..., 
  name: ..., 
  email: ..., 
  role: ..., 
  createdBy: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ userId: ..., authId: ..., name: ..., email: ..., role: ..., createdBy: ..., });

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
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ userId: ..., name: ..., email: ..., role: ..., updatedBy: ..., updatedAt: ..., });

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
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ userId: ..., name: ..., email: ..., role: ..., updatedBy: ..., updatedAt: ..., });

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
  createdBy: ..., 
};

// Call the `createSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSubject(createSubjectVars);
// Variables can be defined inline as well.
const { data } = await createSubject({ subjectId: ..., name: ..., code: ..., createdBy: ..., });

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
  createdBy: ..., 
};

// Call the `createSubjectRef()` function to get a reference to the mutation.
const ref = createSubjectRef(createSubjectVars);
// Variables can be defined inline as well.
const ref = createSubjectRef({ subjectId: ..., name: ..., code: ..., createdBy: ..., });

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
  updatedBy: UUIDString;
  updatedAt: TimestampString;
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
  updatedBy: ..., 
  updatedAt: ..., 
};

// Call the `updateSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSubject(updateSubjectVars);
// Variables can be defined inline as well.
const { data } = await updateSubject({ subjectId: ..., name: ..., code: ..., updatedBy: ..., updatedAt: ..., });

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
  updatedBy: ..., 
  updatedAt: ..., 
};

// Call the `updateSubjectRef()` function to get a reference to the mutation.
const ref = updateSubjectRef(updateSubjectVars);
// Variables can be defined inline as well.
const ref = updateSubjectRef({ subjectId: ..., name: ..., code: ..., updatedBy: ..., updatedAt: ..., });

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
};

// Call the `deactivateSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateSubject(deactivateSubjectVars);
// Variables can be defined inline as well.
const { data } = await deactivateSubject({ subjectId: ..., deletedAt: ..., deletedBy: ..., });

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
};

// Call the `deactivateSubjectRef()` function to get a reference to the mutation.
const ref = deactivateSubjectRef(deactivateSubjectVars);
// Variables can be defined inline as well.
const ref = deactivateSubjectRef({ subjectId: ..., deletedAt: ..., deletedBy: ..., });

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
  deletedBy: UUIDString;
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
  deletedBy: ..., 
};

// Call the `reactivateSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateSubject(reactivateSubjectVars);
// Variables can be defined inline as well.
const { data } = await reactivateSubject({ subjectId: ..., deletedBy: ..., });

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
  deletedBy: ..., 
};

// Call the `reactivateSubjectRef()` function to get a reference to the mutation.
const ref = reactivateSubjectRef(reactivateSubjectVars);
// Variables can be defined inline as well.
const ref = reactivateSubjectRef({ subjectId: ..., deletedBy: ..., });

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
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  createdBy: ..., 
};

// Call the `createUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUnit(createUnitVars);
// Variables can be defined inline as well.
const { data } = await createUnit({ unitId: ..., name: ..., description: ..., subjectId: ..., createdBy: ..., });

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
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  createdBy: ..., 
};

// Call the `createUnitRef()` function to get a reference to the mutation.
const ref = createUnitRef(createUnitVars);
// Variables can be defined inline as well.
const ref = createUnitRef({ unitId: ..., name: ..., description: ..., subjectId: ..., createdBy: ..., });

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
  name: string;
  description?: string | null;
  subjectId: UUIDString;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
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
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
};

// Call the `updateUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUnit(updateUnitVars);
// Variables can be defined inline as well.
const { data } = await updateUnit({ unitId: ..., name: ..., description: ..., subjectId: ..., updatedBy: ..., updatedAt: ..., });

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
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
};

// Call the `updateUnitRef()` function to get a reference to the mutation.
const ref = updateUnitRef(updateUnitVars);
// Variables can be defined inline as well.
const ref = updateUnitRef({ unitId: ..., name: ..., description: ..., subjectId: ..., updatedBy: ..., updatedAt: ..., });

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
};

// Call the `deactivateUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateUnit(deactivateUnitVars);
// Variables can be defined inline as well.
const { data } = await deactivateUnit({ unitId: ..., deletedAt: ..., deletedBy: ..., });

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
};

// Call the `deactivateUnitRef()` function to get a reference to the mutation.
const ref = deactivateUnitRef(deactivateUnitVars);
// Variables can be defined inline as well.
const ref = deactivateUnitRef({ unitId: ..., deletedAt: ..., deletedBy: ..., });

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
  deletedBy: UUIDString;
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
  deletedBy: ..., 
};

// Call the `reactivateUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateUnit(reactivateUnitVars);
// Variables can be defined inline as well.
const { data } = await reactivateUnit({ unitId: ..., deletedBy: ..., });

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
  deletedBy: ..., 
};

// Call the `reactivateUnitRef()` function to get a reference to the mutation.
const ref = reactivateUnitRef(reactivateUnitVars);
// Variables can be defined inline as well.
const ref = reactivateUnitRef({ unitId: ..., deletedBy: ..., });

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
  name: ..., 
  unitId: ..., 
  createdBy: ..., 
};

// Call the `createTopic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTopic(createTopicVars);
// Variables can be defined inline as well.
const { data } = await createTopic({ topicId: ..., name: ..., unitId: ..., createdBy: ..., });

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
  name: ..., 
  unitId: ..., 
  createdBy: ..., 
};

// Call the `createTopicRef()` function to get a reference to the mutation.
const ref = createTopicRef(createTopicVars);
// Variables can be defined inline as well.
const ref = createTopicRef({ topicId: ..., name: ..., unitId: ..., createdBy: ..., });

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
  name: string;
  updatedBy: UUIDString;
  updatedAt: TimestampString;
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
  name: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
};

// Call the `updateTopic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTopic(updateTopicVars);
// Variables can be defined inline as well.
const { data } = await updateTopic({ topicId: ..., unitId: ..., name: ..., updatedBy: ..., updatedAt: ..., });

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
  name: ..., 
  updatedBy: ..., 
  updatedAt: ..., 
};

// Call the `updateTopicRef()` function to get a reference to the mutation.
const ref = updateTopicRef(updateTopicVars);
// Variables can be defined inline as well.
const ref = updateTopicRef({ topicId: ..., unitId: ..., name: ..., updatedBy: ..., updatedAt: ..., });

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
};

// Call the `deactivateTopic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateTopic(deactivateTopicVars);
// Variables can be defined inline as well.
const { data } = await deactivateTopic({ topicId: ..., deletedAt: ..., deletedBy: ..., });

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
};

// Call the `deactivateTopicRef()` function to get a reference to the mutation.
const ref = deactivateTopicRef(deactivateTopicVars);
// Variables can be defined inline as well.
const ref = deactivateTopicRef({ topicId: ..., deletedAt: ..., deletedBy: ..., });

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
  deletedBy: UUIDString;
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
  deletedBy: ..., 
};

// Call the `reactivateTopic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reactivateTopic(reactivateTopicVars);
// Variables can be defined inline as well.
const { data } = await reactivateTopic({ topicId: ..., deletedBy: ..., });

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
  deletedBy: ..., 
};

// Call the `reactivateTopicRef()` function to get a reference to the mutation.
const ref = reactivateTopicRef(reactivateTopicVars);
// Variables can be defined inline as well.
const ref = reactivateTopicRef({ topicId: ..., deletedBy: ..., });

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

