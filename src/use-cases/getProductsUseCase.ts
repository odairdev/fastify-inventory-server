import { IProductsRepository } from "@/repositories/IProductsRepository";

export class GetProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(page: number) {
    const products = this.productsRepository.fetchProducts(page)

    return products
  }
}