import { Prisma, Product } from "@prisma/client";
import { IProductsRepository } from "../IProductsRepository";
import { randomUUID } from "crypto";

export class InMemoryProductsRepository implements IProductsRepository {
  public db: Product[] = []

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = {
      id: randomUUID(),
      name: data.name,
      amount: data.amount,
      category: data.category,
      created_at: new Date()
    }

    this.db.push(product)

    return product
  }

  async fetchProducts(page: number): Promise<Product[]> {
    const products = this.db.slice((page - 1) * 50, page * 50)

    return products
  }

  async findById(productId: string): Promise<Product | null> {
    const product = this.db.find(product => product.id === productId) ?? null

    return product
  }

  async findByName(productName: string): Promise<Product | null> {
    const product = this.db.find(product => product.name === productName) ?? null

    return product
  }
}