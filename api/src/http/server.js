const fastify = require('fastify')
const cors = require('@fastify/cors')

const signUp = require('./routes/user/sign-up')
const login = require('./routes/user/login')

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.register(signUp)
app.register(login)

app.listen({
  port: 3333
}).then(() => {
  console.log('Server running at 3333')
})