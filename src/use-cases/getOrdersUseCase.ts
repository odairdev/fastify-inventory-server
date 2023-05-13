import { IInventoryOrdersRepository } from "@/repositories/IInventoryOrdersRepository";
import { IProductsRepository } from "@/repositories/IProductsRepository";

export class GetOrdersUseCase {
  constructor(private inventoryOrdersRepository: IInventoryOrdersRepository) {}

  async execute(page: number) {
    const orders = await this.inventoryOrdersRepository.findManyOrders(page);

    return orders;
  }
}
