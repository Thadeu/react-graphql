import { makeExecutableSchema } from 'graphql-tools'
import UserSchema from './user'
import PostSchema from './post'

const SchemaDefinition = `
  type Query {
    user (id: Int!): User
    users: [User]
    posts: [Post]
  }
  
  schema {
    query: Query
  }
`;

const endpoint = 'http://localhost:3000/api/1'
const toJSON = res => res.json()

const posts = () => fetch(`${endpoint}/posts`).then(toJSON)
const users = () => fetch(`${endpoint}/users`).then(toJSON)

const resolvers = {
  Query: {
    users,
    posts
  }
}

export const schema = makeExecutableSchema({
  typeDefs: [
    UserSchema,
    PostSchema,
    SchemaDefinition
  ],
  resolvers,
});