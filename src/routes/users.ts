import { FastifyInstance } from 'fastify'
import { register } from '@/http/controllers/register'
import { authenticate } from '@/http/controllers/authenticate'
import { getUserProfile } from '@/http/controllers/getUserProfile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function UsersRoutes(app: FastifyInstance) {

  app.post('/', register)
  app.post('/authenticate', authenticate)

  // Authenticated Routes
  app.get('/profile', {
    onRequest: verifyJWT
  }, getUserProfile)
}