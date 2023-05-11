import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeDeleteProductUseCase } from "@/use-cases/factories/makeDeleteProductUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export interface ParamsType {
  id: string
}

export async function deleteProduct(request: FastifyRequest<{ Params: ParamsType}>, reply: FastifyReply) {
  const { id } = request.params

  console.log(id)

  try {
    const deleteProductUseCase = makeDeleteProductUseCase()

    await deleteProductUseCase.execute(id)

    return reply.status(200).send({message: 'Product deleted successfully'})
  }catch(err) {
    if(err instanceof ResourceNotFoundError) {
      return reply.status(404).send({message: err.message})
    } else {
      return reply.status(500).send()
    }
  }
}