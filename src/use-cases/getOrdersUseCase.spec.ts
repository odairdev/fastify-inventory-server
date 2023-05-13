import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GetOrdersUseCase } from "./getOrdersUseCase";
import { InMemoryInventoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";

let inMemoryInventoryOrders: InMemoryInventoryOrdersRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let sut: GetOrdersUseCase

describe('GetProducts Use Case', () => {
  beforeEach(async () => {
    inMemoryInventoryOrders = new InMemoryInventoryOrdersRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new GetOrdersUseCase(inMemoryInventoryOrders)

    await inMemoryProductsRepository.create({
      id: 'product-1',
      name: 'test',
      category: 'test',
      amount: 1
    })

    for(let i = 1; i <=50; i++) {
      await inMemoryInventoryOrders.create({
        id: `order-${i}`,
        type: `in`,
        amount: 1,
        productId: 'product-1'
      })
    }
  })

  it('should be able to get first page orders', async () => {
    const orders = await sut.execute(1)

    expect(orders.length).toEqual(50)
  })

  it('should be able to get second page orders', async () => {
    await inMemoryInventoryOrders.create({
      type: 'in',
      productId: 'product-51',
      amount: 10
    })

    const orders = await sut.execute(2)

    expect(orders.length).toEqual(1)
    expect(orders[0].productId).toEqual("product-51")
  })
})