import { makeGetProducts } from "@/use-cases/factories/makeGetProducts";
import { FastifyReply, FastifyRequest } from "fastify";

interface QueryType {
  page: number
}

export async function readProducts(request: FastifyRequest<{ Querystring: QueryType }>, reply: FastifyReply) {
  const page = request.query.page

  try {
    const getProductsUseCase = makeGetProducts()
    const products = await getProductsUseCase.execute(page)

    return reply.status(200).send(products)
  } catch(err) {
    return await reply.status(500)
  }
}