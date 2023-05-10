import { AuthenticationError } from "@/use-cases/errors/authentication-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/makeAuthenticaticateUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const getAuthenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const {email, password} = getAuthenticationBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({email, password})

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    })

    return {
      user,
      token
    }
  }catch(err) {
    if(err instanceof AuthenticationError) {
      return reply.status(403).send({ message: err.message})
    } else {
      return reply.status(500).send()
    }
  }
}