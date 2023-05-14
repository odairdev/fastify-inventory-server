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

  async findManyOrders(page: number): Promise<InventoryOrder[]> {
    const orders = this.db.slice((page - 1) * 50, page * 50)

    return orders
  }

  async findById(orderId: string): Promise<InventoryOrder | null> {
    const order = this.db.find(o => o.id === orderId) ?? null

    return order
  }

  async update(order: Prisma.InventoryOrderUncheckedCreateInput): Promise<Prisma.InventoryOrderUncheckedCreateInput> {
    const orderIndex = this.db.findIndex(o => o.id === order.id)

    // @ts-ignore
    this.db[orderIndex] = {
      ...order
    }

    return order
  }

  async delete(orderId: string): Promise<void> {
    const orderIndex = this.db.findIndex(order => orderId === order.id)

    this.db.splice(orderIndex, 1)
  }
}