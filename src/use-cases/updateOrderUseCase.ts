import { IInventoryOrdersRepository } from "@/repositories/IInventoryOrdersRepository";
import { IProductsRepository } from "@/repositories/IProductsRepository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { OrderCannotBeUpdatedError } from "./errors/OrderCannotBeUpdatedError";
import { Prisma } from "@prisma/client";

export class UpdateOrderUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private inventoryOrdersRepository: IInventoryOrdersRepository
  ) {}

  async execute(order: Prisma.InventoryOrderUncheckedCreateInput) {
    if (!order.id) {
      throw new Error("Order id null or undefined.");
    }

    const doesOrderExist = await this.inventoryOrdersRepository.findById(
      order.id
    );

    if (!doesOrderExist) {
      throw new ResourceNotFoundError();
    }

    const previousOrderAmount = doesOrderExist.amount;

    const product = await this.productsRepository.findById(order.productId);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    if (order.type === doesOrderExist.type) {
      if (order.type === "in") {
        if (order.amount < previousOrderAmount) {
          const difference = previousOrderAmount - order.amount;
          if (product.amount - difference >= 0) {
            await this.inventoryOrdersRepository.update(order);
            await this.productsRepository.updateProduct({
              ...product,
              amount: product.amount - difference,
            });
          } else {
            throw new OrderCannotBeUpdatedError();
          }
        } else {
          console.log('aqui')
          const difference = order.amount - previousOrderAmount;
          await this.inventoryOrdersRepository.update(order);
          await this.productsRepository.updateProduct({
            ...product,
            amount: product.amount + difference,
          });
        }
      } else {
        if (order.amount > previousOrderAmount) {
          const difference = order.amount - previousOrderAmount;
          if (product.amount - difference >= 0) {
            await this.inventoryOrdersRepository.update(order);
            await this.productsRepository.updateProduct({
              ...product,
              amount: product.amount - difference,
            });
          } else {
          console.log('erro?')

            throw new OrderCannotBeUpdatedError();
          }
        } else {
          const difference = previousOrderAmount - order.amount;
          await this.inventoryOrdersRepository.update(order);
          await this.productsRepository.updateProduct({
            ...product,
            amount: product.amount + difference,
          });
        }
      }
    } else {
      if (order.type === "in") {
        const finalAmountTobeAddedToProduct =
          previousOrderAmount + order.amount;
        await this.inventoryOrdersRepository.update(order);
        await this.productsRepository.updateProduct({
          ...product,
          amount: product.amount + finalAmountTobeAddedToProduct,
        });
      } else {
        const amountToBeTakenOutOfProduct = order.amount + previousOrderAmount;
        if (product.amount - amountToBeTakenOutOfProduct < 0) {
          throw new OrderCannotBeUpdatedError();
        } else {
          await this.inventoryOrdersRepository.update(order);
          await this.productsRepository.updateProduct({
            ...product,
            amount: product.amount - amountToBeTakenOutOfProduct,
          });
        }
      }
    }
  }
}
