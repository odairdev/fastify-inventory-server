import { InMemoryInventoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { UpdateOrderUseCase } from "./updateOrderUseCase";
import { OrderCannotBeUpdatedError } from "./errors/OrderCannotBeUpdatedError";

let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryInventoryOrdersRepository: InMemoryInventoryOrdersRepository;
let sut: UpdateOrderUseCase;

describe("Update Iventory Order Use Case", () => {
  beforeEach(async () => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    inMemoryInventoryOrdersRepository = new InMemoryInventoryOrdersRepository();
    sut = new UpdateOrderUseCase(
      inMemoryProductsRepository,
      inMemoryInventoryOrdersRepository
    );

    await inMemoryProductsRepository.create({
      id: "product-1",
      name: "Product Test",
      amount: 10,
      category: "Test",
    });

    await inMemoryInventoryOrdersRepository.create({
      id: "order-1",
      type: "out",
      amount: 5,
      productId: "product-1",
    });

    await inMemoryInventoryOrdersRepository.create({
      id: "order-2",
      type: "in",
      amount: 3,
      productId: "product-1",
    });

    inMemoryProductsRepository.db[0].amount -= 5; // To emulate CreateOrderUseCase taking out products amount
    inMemoryProductsRepository.db[0].amount += 3; //Product amount = 8
  });

  it("should be able to update an order", async () => {
    await sut.execute({
      id: "order-1",
      type: "out",
      amount: 4,
      productId: "product-1",
      created_at: new Date()
    });
    const product = inMemoryProductsRepository.db[0];

    expect(product.amount).toEqual(9);
  });

  it("should not be able to update an out order leaving negative product amount", async () => {
    await expect(async () => {
      await sut.execute({
        id: "order-1",
        type: "out",
        amount: 14,
        productId: "product-1",
        created_at: new Date()
      });

    }).rejects.toBeInstanceOf(OrderCannotBeUpdatedError)
  });

  it("should not be able to update an IN order leaving negative product amount", async () => {
    inMemoryProductsRepository.db[0].amount = 1

    await expect(async () => {
      await sut.execute({
        id: "order-2",
        type: "in",
        amount: 1,
        productId: "product-1",
        created_at: new Date()
      });

    }).rejects.toBeInstanceOf(OrderCannotBeUpdatedError)
  });

  it("should not be able to update an IN order to an OUT order leaving negative product amount", async () => {
    inMemoryProductsRepository.db[0].amount = 3

    await expect(async () => {
      await sut.execute({
        id: "order-2",
        type: "out",
        amount: 1,
        productId: "product-1",
        created_at: new Date()
      });

    }).rejects.toBeInstanceOf(OrderCannotBeUpdatedError)
  });

  it("should be able to update an OUT order to an IN order", async () => {
    await sut.execute({
      id: "order-1",
      type: "in",
      amount: 5,
      productId: "product-1",
      created_at: new Date()
    });
    const product = inMemoryProductsRepository.db[0];

    console.log(product.amount)

    expect(product.amount).toEqual(18);
  });
});
