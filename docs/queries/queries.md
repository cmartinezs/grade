
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

## Lista de Preguntas

```graphql
query ListAllQuestions @auth(level: PUBLIC, insecureReason: "This operation is safe to expose to the public") {
  questions {
    questionId
    active
    createdAt
    deletedAt
    deletedBy
    difficultyId
    isPublic
    originalQuestionId
    questionTypeId
    taxonomyId
    text
    topicId
    updatedAt
    updatedBy
    userId
    version
  }
}
```

## Eliminar todo
```graphql
mutation DeleteAllData @auth(level: NO_ACCESS) {
  course_deleteMany(all: true)
  difficulty_deleteMany(all: true)
  educationalLevel_deleteMany(all: true)
  levelCategory_deleteMany(all: true)
  question_deleteMany(all: true)
  questionOption_deleteMany(all: true)
  questionType_deleteMany(all: true)
  subject_deleteMany(all: true)
  taxonomy_deleteMany(all: true)
  topic_deleteMany(all: true)
  unit_deleteMany(all: true)
  user_deleteMany(all: true)
}
```
