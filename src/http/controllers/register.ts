import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/registerUseCase";
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
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({name, email, password})
  } catch(err) {
    return reply.status(409).send({
      error: "Email already in use.",
    });
  }

  return reply.status(201).send();
}
