# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetUserByEmail, useGetUserById, useListSubjects, useGetSubject, useListUnits, useGetUnit, useListTopics, useGetTopic, useListLevelCategories, useGetLevelCategory } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetUserByEmail(getUserByEmailVars);

const { data, isPending, isSuccess, isError, error } = useGetUserById(getUserByIdVars);

const { data, isPending, isSuccess, isError, error } = useListSubjects();

const { data, isPending, isSuccess, isError, error } = useGetSubject(getSubjectVars);

const { data, isPending, isSuccess, isError, error } = useListUnits();

const { data, isPending, isSuccess, isError, error } = useGetUnit(getUnitVars);

const { data, isPending, isSuccess, isError, error } = useListTopics();

const { data, isPending, isSuccess, isError, error } = useGetTopic(getTopicVars);

const { data, isPending, isSuccess, isError, error } = useListLevelCategories();

const { data, isPending, isSuccess, isError, error } = useGetLevelCategory(getLevelCategoryVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getUserByEmail, getUserById, listSubjects, getSubject, listUnits, getUnit, listTopics, getTopic, listLevelCategories, getLevelCategory } from '@dataconnect/generated';


// Operation GetUserByEmail:  For variables, look at type GetUserByEmailVars in ../index.d.ts
const { data } = await GetUserByEmail(dataConnect, getUserByEmailVars);

// Operation GetUserById:  For variables, look at type GetUserByIdVars in ../index.d.ts
const { data } = await GetUserById(dataConnect, getUserByIdVars);

// Operation ListSubjects: 
const { data } = await ListSubjects(dataConnect);

// Operation GetSubject:  For variables, look at type GetSubjectVars in ../index.d.ts
const { data } = await GetSubject(dataConnect, getSubjectVars);

// Operation ListUnits: 
const { data } = await ListUnits(dataConnect);

// Operation GetUnit:  For variables, look at type GetUnitVars in ../index.d.ts
const { data } = await GetUnit(dataConnect, getUnitVars);

// Operation ListTopics: 
const { data } = await ListTopics(dataConnect);

// Operation GetTopic:  For variables, look at type GetTopicVars in ../index.d.ts
const { data } = await GetTopic(dataConnect, getTopicVars);

// Operation ListLevelCategories: 
const { data } = await ListLevelCategories(dataConnect);

// Operation GetLevelCategory:  For variables, look at type GetLevelCategoryVars in ../index.d.ts
const { data } = await GetLevelCategory(dataConnect, getLevelCategoryVars);


```