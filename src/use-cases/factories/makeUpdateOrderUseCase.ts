import { PrismaInventoryOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";
import { UpdateOrderUseCase } from "../updateOrderUseCase";


export function makeUpdateOrderUseCase() {
  const productsRepository = new PrismaProductRepository()
  const inventoryOrdersRepository = new PrismaInventoryOrdersRepository()
  const updateOrderUseCase = new UpdateOrderUseCase(productsRepository, inventoryOrdersRepository)

  return updateOrderUseCase
}