import { InventoryOrder, Prisma } from "@prisma/client";

export interface IInventoryOrdersRepository {
  create(data: Prisma.InventoryOrderUncheckedCreateInput): Promise<InventoryOrder>
  findById(orderId: string): Promise<InventoryOrder | null>
  findManyOrders(page: number): Promise<InventoryOrder[]>
  update(order: Prisma.InventoryOrderUncheckedCreateInput): Promise<Prisma.InventoryOrderUncheckedCreateInput>
  delete(orderId: string): Promise<void>
}