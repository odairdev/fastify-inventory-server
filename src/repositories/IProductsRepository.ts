import { Prisma, Product } from "@prisma/client";


export interface IProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  findById(productId: string): Promise<Product | null>
  findByName(productName: string): Promise<Product | null>
}