const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Todo {
    id: Int
    content: String
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(content: String!): Todo
    removeTodo(id: Int!): Int
    updateTodo(id: Int!, content: String): Todo
  }
`;

class TodosHandler {
  constructor(initialTodos = []) {
    this.todos = initialTodos;
    this.size = 0;
    this.lastId = initialTodos.length + 1;
  }

  getTodoIndex(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  validateId(id) {
    if (this.getTodoIndex(id) === -1) {
      throw Error(`todo's id <${id}> is not founded`);
    }
  }

  addTodo(content) {
    const newTodo = { id: this.lastId++, content };
    this.todos.push(newTodo);
    return newTodo;
  }

  removeTodo(removeId) {
    this.validateId(removeId);
    this.todos = this.todos.filter(({ id }) => id !== removeId);
    return removeId;
  }

  updateTodo({ id, content }) {
    this.validateId(id);
    const todo = this.todos[this.getTodoIndex(id)];
    todo.content = content;
    return todo;
  }
}

const todosHandler = new TodosHandler([
  { id: 1, content: 'nextjs 공부하기' },
  { id: 2, content: '투두리스트로 CRUD 하기' },
]);

const resolvers = {
  Query: {
    todos: () => todosHandler.todos,
  },
  Mutation: {
    addTodo: (_, { content }) => todosHandler.addTodo(content),
    removeTodo: (_, { id }) => todosHandler.removeTodo(id),
    updateTodo: (_, arg) => todosHandler.updateTodo(arg),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
