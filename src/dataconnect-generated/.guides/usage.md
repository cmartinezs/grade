# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUser, useUpdateUser, useCreateSubject, useUpdateSubject, useDeactivateSubject, useReactivateSubject, useCreateUnit, useUpdateUnit, useDeactivateUnit, useReactivateUnit } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useUpdateUser(updateUserVars);

const { data, isPending, isSuccess, isError, error } = useCreateSubject(createSubjectVars);

const { data, isPending, isSuccess, isError, error } = useUpdateSubject(updateSubjectVars);

const { data, isPending, isSuccess, isError, error } = useDeactivateSubject(deactivateSubjectVars);

const { data, isPending, isSuccess, isError, error } = useReactivateSubject(reactivateSubjectVars);

const { data, isPending, isSuccess, isError, error } = useCreateUnit(createUnitVars);

const { data, isPending, isSuccess, isError, error } = useUpdateUnit(updateUnitVars);

const { data, isPending, isSuccess, isError, error } = useDeactivateUnit(deactivateUnitVars);

const { data, isPending, isSuccess, isError, error } = useReactivateUnit(reactivateUnitVars);

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
import { createUser, updateUser, createSubject, updateSubject, deactivateSubject, reactivateSubject, createUnit, updateUnit, deactivateUnit, reactivateUnit } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateUser:  For variables, look at type UpdateUserVars in ../index.d.ts
const { data } = await UpdateUser(dataConnect, updateUserVars);

// Operation CreateSubject:  For variables, look at type CreateSubjectVars in ../index.d.ts
const { data } = await CreateSubject(dataConnect, createSubjectVars);

// Operation UpdateSubject:  For variables, look at type UpdateSubjectVars in ../index.d.ts
const { data } = await UpdateSubject(dataConnect, updateSubjectVars);

// Operation DeactivateSubject:  For variables, look at type DeactivateSubjectVars in ../index.d.ts
const { data } = await DeactivateSubject(dataConnect, deactivateSubjectVars);

// Operation ReactivateSubject:  For variables, look at type ReactivateSubjectVars in ../index.d.ts
const { data } = await ReactivateSubject(dataConnect, reactivateSubjectVars);

// Operation CreateUnit:  For variables, look at type CreateUnitVars in ../index.d.ts
const { data } = await CreateUnit(dataConnect, createUnitVars);

// Operation UpdateUnit:  For variables, look at type UpdateUnitVars in ../index.d.ts
const { data } = await UpdateUnit(dataConnect, updateUnitVars);

// Operation DeactivateUnit:  For variables, look at type DeactivateUnitVars in ../index.d.ts
const { data } = await DeactivateUnit(dataConnect, deactivateUnitVars);

// Operation ReactivateUnit:  For variables, look at type ReactivateUnitVars in ../index.d.ts
const { data } = await ReactivateUnit(dataConnect, reactivateUnitVars);


```