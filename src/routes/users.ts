import { FastifyInstance } from 'fastify'
import { register } from '@/http/controllers/register'

export async function UsersRoutes(app: FastifyInstance) {

  app.post('/', register)

  // Authenticated Routes
  
}