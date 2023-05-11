import { Prisma, Product } from "@prisma/client";
import { IProductsRepository } from "../IProductsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaProductRepository implements IProductsRepository {
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = await prisma.product.create({
      data
    })

    return product
  }

  async findById(productId: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    return product
  }

  async findByName(productName: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        name: productName
      }
    })

    return product
  }
}