import { createProduct } from "@/http/controllers/createProduct";
import { readProducts } from "@/http/controllers/readProducts";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance, IQueryString } from "fastify";

export async function ProductsRoutes(app: FastifyInstance) {
  // Authenticated Routes
  app.post('/', {
    onRequest: verifyJWT
  }, createProduct)

  app.get('/', {
    onRequest: verifyJWT
  }, readProducts)
}