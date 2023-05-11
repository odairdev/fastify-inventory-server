import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { DeleteProductUseCase } from "./deleteProductUseCase";
import { ResourceNotFoundError } from "./errors/resource-not-found";

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: DeleteProductUseCase

describe('GetProducts Use Case', () => {
  beforeEach(async () => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new DeleteProductUseCase(inMemoryProductsRepository)

    for(let i = 1; i <=2; i++) {
      await inMemoryProductsRepository.create({
        id: `p-${i}`,
        name: `product-${i}`,
        category: 'test',
        amount: 10
      })
    }
  })

  it('should be able to delete a product', async () => {
    await sut.execute('p-2')

    const products = await inMemoryProductsRepository.fetchProducts(1)

    expect(products.length).toEqual(1)
  })

  it('should not be able to delete a non-existent product', async () => {
    await expect(async () => {
      await sut.execute('product-3')
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})