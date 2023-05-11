import { createProduct } from "@/http/controllers/createProduct";
import { ParamsType, deleteProduct } from "@/http/controllers/deleteProducts";
import { QueryType, readProducts } from "@/http/controllers/readProducts";
import { updateProduct } from "@/http/controllers/updateProduct";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function ProductsRoutes(app: FastifyInstance) {
  // Authenticated Routes
  app.post('/', {
    onRequest: verifyJWT
  }, createProduct)

  app.put('/', {
    onRequest: verifyJWT
  }, updateProduct)

  app.get<{ Querystring: QueryType }>('/', {
    onRequest: verifyJWT
  }, readProducts)

  app.delete<{ Params: ParamsType }>('/:id', {
    onRequest: verifyJWT
  }, deleteProduct)
}