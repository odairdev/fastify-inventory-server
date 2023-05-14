import { PrismaInventoryOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { DeleteOrderUseCase } from "../deleteOrderUseCase";
import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";

export function makeDeleteOrderUseCase() {
  const inventoryOrdersRepository = new PrismaInventoryOrdersRepository()
  const productsRepository = new PrismaProductRepository()
  const deleteOrderUseCase = new DeleteOrderUseCase(productsRepository, inventoryOrdersRepository)

  return deleteOrderUseCase
}