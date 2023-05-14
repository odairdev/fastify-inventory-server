import { Prisma, InventoryOrder } from "@prisma/client";
import { IInventoryOrdersRepository } from "../IInventoryOrdersRepository";
import { prisma } from "@/lib/prisma";

export class PrismaInventoryOrdersRepository implements IInventoryOrdersRepository {
  async create(data: Prisma.InventoryOrderUncheckedCreateInput): Promise<InventoryOrder> {
    const order = await prisma.inventoryOrder.create({data})

    return order
  }

  async findManyOrders(page: number): Promise<InventoryOrder[]> {
    const orders = await prisma.inventoryOrder.findMany({
      take: 50,
      skip: (page - 1) * 50
    })

    return orders
  }

  async findById(orderId: string): Promise<InventoryOrder | null> {
    const order = await prisma.inventoryOrder.findUnique({
      where: {
        id: orderId
      }
    })

    return order
  }

  async update(order: Prisma.InventoryOrderUncheckedCreateInput): Promise<InventoryOrder> {
    const newOrder = await prisma.inventoryOrder.update({
      where: {
        id: order.id
      },
      data: order
    })

    return newOrder
  }

  async delete(orderId: string): Promise<void> {
     await prisma.inventoryOrder.delete({
      where: {
        id: orderId
      }
     })
  }
}