import { createProduct } from "@/http/controllers/createProduct";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function ProductsRoutes(app: FastifyInstance) {
  // Authenticated Routes
  app.post('/', {
    onRequest: verifyJWT
  }, createProduct)
}