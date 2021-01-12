# TodoList-ApolloServer


This repository provides **ApolloServer code** to test ApolloClient implementing todolist.

If you need it, please fork or clone and enjoy it! 😎

## How To Run ?
- if you use npm, like this
```bash

npm run start

```
- if you use yarn , like this
```bash

yarn start

```

## API
### Query 
1. todos
```graphql

// operation
{
  todos {
    id
    content
  }
}

//response
{
  "data": {
    "todos": [
      {
        "id": 1,
        "content": "study nextjs"
      },
      {
        "id": 2,
        "content": "todolist crud"
      }
    ]
  }
}

```

### Mutation
1. addTodo
```graphql

// operation
mutation{
  addTodo(content:"wonderful todo"){
    id
    content
  }
}

// response
{
  "data": {
    "addTodo": {
      "id": 3,
      "content": "wonderful todo"
    }
  }
}
```

2. removeTodo
```graphql

// operation
mutation {
  removeTodo(id:3)
}

// response
{
  "data": {
    "removeTodo": 3
  }
}

```

3. updateTodo
```graphql

//operation
mutation {
  updateTodo(id:4,content:"updated"){
    id
    content
  }
}

// response
{
  "data": {
    "updateTodo": {
      "id": 4,
      "content": "updated"
    }
  }
}
```
