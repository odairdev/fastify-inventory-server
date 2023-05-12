import { InsufficientProductAmount } from "@/use-cases/errors/insufficient-product-amount";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeCreateInventoryOrderUseCase } from "@/use-cases/factories/makeCreateInventoryOrderUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOrder(request: FastifyRequest, reply: FastifyReply) {
  const getInventoryOrderBodySchema = z.object({
    type: z.enum(['in', 'out']),
    amount: z.number().min(1),
    productId: z.string().uuid()
  })

  const { type, amount, productId} = getInventoryOrderBodySchema.parse(request.body)

  try {
    const createInventoryOrdersUseCase = makeCreateInventoryOrderUseCase()

    const order = await createInventoryOrdersUseCase.execute({
      type,
      amount,
      productId
    })

    return reply.status(201).send(order)
  } catch(err) {
    if(err instanceof ResourceNotFoundError || err instanceof InsufficientProductAmount) {
      return reply.status(400).send({message: err.message})
    } else {
      return reply.status(500)
    }
  }
}