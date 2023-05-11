import { IProductsRepository } from "@/repositories/IProductsRepository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

export class DeleteProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(productId: string) {
    const doesProductExist = await this.productsRepository.findById(productId)

    if(!doesProductExist) {
      throw new ResourceNotFoundError()
    }

    await this.productsRepository.delete(productId)
  }
}