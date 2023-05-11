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

  async updateProduct(product: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const newProduct = await prisma.product.update({
      where: {
        id: product.id
      },
      data: product
    })

    return newProduct
  }

  async fetchProducts(page: number): Promise<Product[]> {
    const products = await prisma.product.findMany({
      take: 50,
      skip: (page - 1) * 50
    })

    return products
  }

  async delete(productId: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id: productId
      }
    })
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