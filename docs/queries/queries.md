
## Lista de asignaturas
```graphql
query ListSubjects @auth(level: PUBLIC, insecureReason: "This operation is safe to expose to the public") {
  subjects {
    subjectId
    code
    name
  }
}
```

## Lista de unidades

```graphql
query ListUnits @auth(level: PUBLIC, insecureReason: "This operation is safe to expose to the public") {
  units {
    unitId
    active
    createdAt
    createdBy
    deletedAt
    deletedBy
    description
    name
    subjectId
    updatedAt
    updatedBy
  }
}
```