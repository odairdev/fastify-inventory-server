import { OrderCannotBeDeletedError } from "@/use-cases/errors/OrderCannotBeDeletedError";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeUpdateOrderUseCase } from "@/use-cases/factories/makeUpdateOrderUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateOrder(request: FastifyRequest, reply: FastifyReply) {
  const getOrderSchema = z.object({
    type: z.enum(['in', 'out']),
    amount: z.number().min(1),
    productId: z.string().uuid()
  })

  const { type, amount, productId } = getOrderSchema.parse(request.body)

  try {
    const updateOrderUseCase = makeUpdateOrderUseCase()

    const newOrder = await updateOrderUseCase.execute({
      type,
      amount,
      productId
    })

    return reply.status(200).send(newOrder)
  } catch(err) {
    if(err instanceof ResourceNotFoundError || err instanceof OrderCannotBeDeletedError) {
      return reply.status(400).send({message: err.message})
    } else {
      return reply.status(500)
    }
  }
}