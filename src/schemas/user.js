import Post from './post'

const User = `
  type User {
    id: String!
    name: String
    email: String
    posts: [Post]
  }
`

export default User