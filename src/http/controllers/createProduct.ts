import { makeCreateProductUseCase } from "@/use-cases/factories/makeCreateProductUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createProduct(request: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    name: z.string(),
    category: z.string(),
    amount: z.number().min(1)
  })

  const { name, category, amount} = createProductBodySchema.parse(request.body)

  try {
    const createProductUseCase = makeCreateProductUseCase()

    const product = await createProductUseCase.execute({
      name, category, amount
    })

    return reply.status(201).send(product)
  } catch(err) {
    return reply.status(400).send({ error: err})
  }
}