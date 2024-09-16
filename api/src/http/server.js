const fastify = require('fastify')({ logger: true })

import { signUp } from './routes/sign-up'
import { login } from './routes/login'

const app = fastify()

app.register(signUp)
app.register(login)

app.listen({
  port: 3333
}).then(() => {
  console.log('Server running at 3333')
})