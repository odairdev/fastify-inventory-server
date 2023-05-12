import { IInventoryOrdersRepository } from "@/repositories/IInventoryOrdersRepository";
import { IProductsRepository } from "@/repositories/IProductsRepository";
import { InventoryOrder } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { InsufficientProductAmount } from "./errors/insufficient-product-amount";

interface CreateInventoryOrderRequest {
  id?: string;
  type: string;
  amount: number;
  productId: string;
}

export class CreateInventoryOrderUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private inventoryOrdersRepository: IInventoryOrdersRepository
  ) {}

  async execute({
    id,
    type,
    amount,
    productId,
  }: CreateInventoryOrderRequest): Promise<InventoryOrder> {
    const product = await this.productsRepository.findById(productId)

    if(!product) {
      throw new ResourceNotFoundError()
    }

    if(type === 'out' && product.amount < amount) {
      throw new InsufficientProductAmount()
    }

    const order = await this.inventoryOrdersRepository.create({
      id,
      type,
      amount,
      productId
    })

    if(order && order.type === 'out') {
      this.productsRepository.updateProduct({
        ...product,
        amount: (product.amount - order.amount)
      })
    } else if(order && order.type === 'in') {
      this.productsRepository.updateProduct({
        ...product,
        amount: (product.amount + order.amount)
      })
    }

    return order
  }
}
