import User from './user'

const Post = `
  type Post {
    id: Int!
    title: String
    body: String
    author: User
  }
`

export default Post