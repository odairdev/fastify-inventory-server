import { IProductsRepository } from "@/repositories/IProductsRepository";
import { Prisma, Product } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { ProductCannotBeCreated } from "./errors/product-cannot-be-created-error";
import { ProductCannotHaveSameName } from "./errors/same-product-name-error";

export class UpdateProductInfoUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(product: Prisma.ProductUncheckedCreateInput) {
    if (!product.id) {
      throw new ResourceNotFoundError();
    }

    const productExists = await this.productsRepository.findById(product.id);

    if (!productExists) {
      throw new ResourceNotFoundError();
    }

    if (product.name !== productExists.name) {
      const productNameAlreadyInUse = await this.productsRepository.findByName(
        product.name
      );

      if (productNameAlreadyInUse) {
        throw new ProductCannotHaveSameName();
      }
    }

    if (product.amount <= 0) {
      throw new ProductCannotBeCreated();
    }

    const newProduct = await this.productsRepository.updateProduct(product);

    return newProduct;
  }
}
