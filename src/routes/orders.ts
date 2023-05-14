import { createOrder } from "@/http/controllers/createOrder";
import { ParamsType, deleteOrder } from "@/http/controllers/deleteOrder";
import { QueryType, readOrders } from "@/http/controllers/readOrders";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function OrderRoutes(app: FastifyInstance) {
  app.post('/', {
    onRequest: verifyJWT
  }, createOrder)

  app.get<{Querystring: QueryType}>('/', {
    onRequest: verifyJWT
  }, readOrders)

  app.delete<{ Params: ParamsType}>('/:id', {
    onRequest: verifyJWT
  }, deleteOrder)
}