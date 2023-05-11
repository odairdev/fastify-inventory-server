import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";
import { DeleteProductUseCase } from "../deleteProductUseCase";

export function makeDeleteProductUseCase() {
  const productsRepository = new PrismaProductRepository()
  const deleteProductUseCase = new DeleteProductUseCase(productsRepository)

  return deleteProductUseCase
}