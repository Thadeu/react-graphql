import React, { Component } from 'react'
import '@app/app.scss'
import { graphql } from 'graphql'
import { schema } from '@schemas/schema'

const query = `{ 
  users { 
    id
    name
    email 
  }

  posts { 
    title
    body
  }
}`

const ResponseError = ({ error }) => {
  if(!error) return ''  
  return <p>error: {error}</p>
}

const ListUsers = ({ data }) => {
  if (data.length <= 0) return <div className="loading">carregando...</div>
  
  return Object.values(data).map((v, i) => (
    <li key={i}>{v.name} ({v.email})</li>
  ))
}

const ListPosts = ({ data }) => {
  if (data.length <= 0) return <div className="loading">carregando...</div>
  
  return Object.values(data).map((v, i) => (
    <li key={i}>
      <h2>título: {v.title}</h2>
      <p>{v.body}</p>
      <br />
    </li>
  ))
}

class App extends Component {
  state = {
    error: '',
    users: [],
    posts: []
  }

  async componentDidMount() {
    const { data, errors } = await graphql(schema, query)
    
    if(Array.isArray(errors)) {
      this.setState({ error: errors[0].message})
    }else {
      console.log(data)
      this.setState({
        users: { ...Object.values(data.users) },
        posts: { ...Object.values(data.posts) },
      })
    }
  }

  render() {
    return (
      <div className="container">
        <ResponseError error={this.state.error} />

        <h1>GraphQL</h1>

        <div>
          <h1>Usuários</h1>
          <ListUsers data={this.state.users} />
        </div>
        
        <div>
          <h1>Posts</h1>
          <ListPosts data={this.state.posts} />
        </div>
      </div>
    );
  }
}

export default App
