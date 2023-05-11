import { IProductsRepository } from "@/repositories/IProductsRepository";
import { ProductCannotBeCreated } from "./errors/product-cannot-be-created-error";

interface CreateProductsUseCaseRequest {
  name: string,
  category: string,
  amount: number
}

export class CreateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({name, category, amount}: CreateProductsUseCaseRequest) {
    if(name === '' || category === '' || amount <= 0) {
      throw new ProductCannotBeCreated()
    }

    const productAlreadyExists = await this.productsRepository.findByName(name)

    if(productAlreadyExists) {
      throw new Error('Product Already Exists.')
    }

    const product = await this.productsRepository.create({
      name,
      category,
      amount
    })

    return product
  }
}