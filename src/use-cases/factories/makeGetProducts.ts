import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";
import { GetProductsUseCase } from "../getProductsUseCase";

export function makeGetProducts() {
  const productsRepository = new PrismaProductRepository()
  const getProductsUseCase = new GetProductsUseCase(productsRepository)

  return getProductsUseCase
}