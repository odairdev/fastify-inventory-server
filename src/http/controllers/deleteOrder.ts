import { OrderCannotBeDeletedError } from "@/use-cases/errors/OrderCannotBeDeletedError";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeDeleteOrderUseCase } from "@/use-cases/factories/makeDeleteOrderUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export type ParamsType = {
  id: string
}

export async function deleteOrder(request: FastifyRequest<{Params: ParamsType}>, reply: FastifyReply) {
  const { id } = request.params

  try {
    const deleteOrderUseCase = makeDeleteOrderUseCase()

    await deleteOrderUseCase.execute(id)
  } catch(err) {
    if(err instanceof ResourceNotFoundError || err instanceof OrderCannotBeDeletedError) {
      return reply.status(400).send({ message: err.message})
    } else {
      return reply.status(500)
    }
  }
}