import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";
import { UpdateProductInfoUseCase } from "../updateProductInfo";

export function makeUpdateProductInfoUseCase() {
  const productsRepository = new PrismaProductRepository()
  const updateProductInfoUseCase = new UpdateProductInfoUseCase(productsRepository)

  return updateProductInfoUseCase
}