import { createOrder } from "@/http/controllers/createOrder";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function OrderRoutes(app: FastifyInstance) {
  app.post('/', {
    onRequest: verifyJWT
  }, createOrder)
}