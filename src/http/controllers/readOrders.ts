import { makeGetOrdersUseCase } from "@/use-cases/factories/makeGetOrdersUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export type QueryType = {
  page: number
}

export async function readOrders(request: FastifyRequest<{Querystring: QueryType}>, reply: FastifyReply) {
   const { page } = request.query

   if(page <= 0) {
    return reply.status(400).send({message: 'Page has to be  equal 1 or higher.'})
   }

   try {
    const getOrdersUseCase = makeGetOrdersUseCase()
    const orders = await getOrdersUseCase.execute(page)

    return reply.status(200).send(orders)
   } catch(err) {
    return reply.status(500)
   }
}