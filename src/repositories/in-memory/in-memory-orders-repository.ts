import { InventoryOrder, Prisma } from "@prisma/client";
import { IInventoryOrdersRepository } from "../IInventoryOrdersRepository";
import { randomUUID } from "crypto";

export class InMemoryInventoryOrdersRepository implements IInventoryOrdersRepository {
  public db: InventoryOrder[] = []

  async create(data: Prisma.InventoryOrderUncheckedCreateInput): Promise<InventoryOrder> {
    const order = {
      id: data.id ? data.id : randomUUID(),
      type: data.type,
      amount: data.amount,
      created_at: new Date(),
      productId: data.productId
    }

    this.db.push(order)

    return order
  }

  async delete(orderId: string): Promise<void> {
    const orderIndex = this.db.findIndex(order => orderId === order.id)

    this.db.splice(orderIndex, 1)
  }
}