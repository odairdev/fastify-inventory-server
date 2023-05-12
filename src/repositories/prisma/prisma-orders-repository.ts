import { Prisma, InventoryOrder } from "@prisma/client";
import { IInventoryOrdersRepository } from "../IInventoryOrdersRepository";
import { prisma } from "@/lib/prisma";

export class PrismaInventoryOrdersRepository implements IInventoryOrdersRepository {
  async create(data: Prisma.InventoryOrderUncheckedCreateInput): Promise<InventoryOrder> {
    const order = await prisma.inventoryOrder.create({data})

    return order
  }

  async delete(orderId: string): Promise<void> {
     await prisma.inventoryOrder.delete({
      where: {
        id: orderId
      }
     })
  }
}