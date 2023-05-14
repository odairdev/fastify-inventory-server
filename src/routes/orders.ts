import { createOrder } from "@/http/controllers/createOrder";
import { ParamsType, deleteOrder } from "@/http/controllers/deleteOrder";
import { QueryType, readOrders } from "@/http/controllers/readOrders";
import { updateOrder } from "@/http/controllers/updateOrder";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function OrderRoutes(app: FastifyInstance) {
  app.post('/', {
    onRequest: verifyJWT
  }, createOrder)

  app.get<{Querystring: QueryType}>('/', {
    onRequest: verifyJWT
  }, readOrders)

  app.put('/', {
    onRequest: verifyJWT
  }, updateOrder)

  app.delete<{ Params: ParamsType}>('/:id', {
    onRequest: verifyJWT
  }, deleteOrder)
}