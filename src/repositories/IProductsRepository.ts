import { Prisma, Product } from "@prisma/client";

export interface IProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  fetchProducts(page: number): Promise<Product[]>
  updateProduct(product: Prisma.ProductUncheckedCreateInput): Promise<Product>
  findById(productId: string): Promise<Product | null>
  findByName(productName: string): Promise<Product | null>
  delete(productId: string): Promise<void>
}