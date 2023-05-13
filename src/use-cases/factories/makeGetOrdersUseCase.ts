import { PrismaInventoryOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { GetOrdersUseCase } from "../getOrdersUseCase";

export function makeGetOrdersUseCase() {
  const inventoryOrdersRepository = new PrismaInventoryOrdersRepository()
  const getOrdersUseCase = new GetOrdersUseCase(inventoryOrdersRepository)

  return getOrdersUseCase
}