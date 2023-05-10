import { makeGetUserProfileUseCase } from "@/use-cases/factories/makeGetUserProfileUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const user = await getUserProfileUseCase.execute(request.user.sub)

    return reply.status(200).send(user)
  } catch(err) {
    return reply.status(400).send({ message: 'Not Found.'})
  }
}