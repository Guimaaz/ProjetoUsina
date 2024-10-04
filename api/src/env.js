const z = require('zod')

const envSchema = z.object({
  JWT_SECRET: z.string()
})

const env = envSchema.parse(process.env)

module.exports = env