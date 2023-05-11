import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import {describe, it, expect, beforeEach} from 'vitest'
import { CreateProductUseCase } from './createProductUseCase'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Case', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a product', async () => {
    const product = await sut.execute({
      name: 'Hammer',
      amount: 50,
      category: 'Tools'
    })

    expect(product.name).toEqual('Hammer')
  })

  it('should not be able to create two products with the same name', async () => {
    const product = await sut.execute({
      name: 'Hammer',
      amount: 50,
      category: 'Tools'
    })

    await expect(async () => {
      await sut.execute({
        name: 'Hammer',
        amount: 50,
        category: 'Tools'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})