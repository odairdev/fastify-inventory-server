import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function UsersRoutes(app: FastifyInstance) {
  app.get('/', () => {
    return 'users'
  })

  app.post('/', async (request, reply) => {
    const getBodyUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { name, email, password } = getBodyUserSchema.parse(request.body)

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(userAlreadyExists) {
      return reply.status(409).send({
        error: 'Email already in use.'
      })
    }

    const password_hash = await hash(password, 6)

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash
      }
    })

    return reply.status(201).send()
  })
}