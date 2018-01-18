import express from 'express'
import faker from 'faker'
import bodyParser from 'body-parser'
import { map, range } from 'lodash'

const app = express()
const dev = process.env.NODE_ENV === 'development';

const renderPreflight = (_, res) => {
  res.setHeader("Acess-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.send("");
}

const renderJSON = (res, json, status) => {
  res.setHeader("Acess-Controll-Allow-Origin", "*")
  res.setHeader("Content-Type", "application/json")
  res.status(status).send(json)
}

app.use(bodyParser.json())

app.options('/api/1/users', renderPreflight)
app.get('/api/1/users', (req, res) => {
  
  const mockUsers = map(range(10), key => ({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email()
  }))

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(renderJSON(res, mockUsers, 200))
    }, 1000)
  });
})

app.options('/api/1/posts', renderPreflight)
app.get('/api/1/posts', (req, res) => {
  const mock = map(range(100), key => ({
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    body: faker.lorem.text()
  }))

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(renderJSON(res, mock, 200))
    }, 1000)
  });
})

const server = app.listen(3000, () => {
  const { port } = server.address();
  console.info(`\n\nExpress listen at http://localhost:${port} \n`);
});