import { PrismaInventoryOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";
import { CreateInventoryOrderUseCase } from "../createInventoryOrderUseCase";

export function makeCreateInventoryOrderUseCase() {
  const productsRepository = new PrismaProductRepository()
  const inventoryOrdersRepository = new PrismaInventoryOrdersRepository()
  const createInventoryOrdersUseCase = new CreateInventoryOrderUseCase(productsRepository, inventoryOrdersRepository)

  return createInventoryOrdersUseCase
}