import { InventoryOrder, Prisma } from "@prisma/client";

export interface IInventoryOrdersRepository {
  create(data: Prisma.InventoryOrderUncheckedCreateInput): Promise<InventoryOrder>
  delete(orderId: string): Promise<void>
}