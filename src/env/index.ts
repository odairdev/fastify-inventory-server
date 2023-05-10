import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
  console.error('Invalid environment variable', _env.error.format())

  throw new Error('Invalid envrionment errors')
}

export const env = _env.data