import { FastifyInstance } from 'fastify'
import { register } from '@/http/controllers/register'

export async function UsersRoutes(app: FastifyInstance) {
  app.get('/', () => {
    return 'users'
  })

  app.post('/', register)
}