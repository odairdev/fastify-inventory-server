import { IInventoryOrdersRepository } from "@/repositories/IInventoryOrdersRepository";
import { IProductsRepository } from "@/repositories/IProductsRepository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { OrderCannotBeDeletedError } from "./errors/OrderCannotBeDeletedError";

export class DeleteOrderUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private inventoryOrdersRepository: IInventoryOrdersRepository
  ) {}

  async execute(orderId: string) {
    const order = await this.inventoryOrdersRepository.findById(orderId);

    if (!order) {
      throw new ResourceNotFoundError();
    }

    const product = await this.productsRepository.findById(order.productId);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    if (order.type === "in" && order.amount > product.amount) {
      throw new OrderCannotBeDeletedError();
    }

    await this.inventoryOrdersRepository.delete(orderId);

    if (order.type === "in") {
      await this.productsRepository.updateProduct({
        ...product,
        amount: product.amount - order.amount,
      });
    } else {
      await this.productsRepository.updateProduct({
        ...product,
        amount: product.amount + order.amount,
      });
    }
  }
}
