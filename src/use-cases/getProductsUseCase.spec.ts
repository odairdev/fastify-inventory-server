import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GetProductsUseCase } from "./getProductsUseCase";

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: GetProductsUseCase

describe('GetProducts Use Case', () => {
  beforeEach(async () => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new GetProductsUseCase(inMemoryProductsRepository)

    for(let i = 1; i <=50; i++) {
      await inMemoryProductsRepository.create({
        name: `product-${i}`,
        category: 'test',
        amount: 10
      })
    }
  })

  it('should be able to get first page products', async () => {
    const products = await sut.execute(1)

    expect(products.length).toEqual(50)
  })

  it('should be able to get second page products', async () => {
    await inMemoryProductsRepository.create({
      name: `product-51`,
      category: 'test',
      amount: 10
    })

    const products = await sut.execute(2)

    expect(products.length).toEqual(1)
    expect(products[0].name).toEqual("product-51")
  })
})