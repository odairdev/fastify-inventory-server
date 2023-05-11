import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";
import { CreateProductUseCase } from "../createProductUseCase";

export function makeCreateProductUseCase() {
  const productRepository = new PrismaProductRepository()
  const createProductUseCase = new CreateProductUseCase(productRepository)

  return createProductUseCase
}