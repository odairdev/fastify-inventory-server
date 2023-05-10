import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/makeRegisterUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const getBodyUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = getBodyUserSchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({name, email, password})
  } catch(err) {
    if(err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message})
    }
  }

  return reply.status(201).send();
}
