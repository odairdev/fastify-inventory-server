import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import {describe, it, expect, beforeEach} from 'vitest'
import { UpdateProductInfoUseCase } from './updateProductInfo'
import { Product } from '@prisma/client'
import { ProductCannotBeCreated } from './errors/product-cannot-be-created-error'
import { ProductCannotHaveSameName } from './errors/same-product-name-error'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: UpdateProductInfoUseCase
let testProduct: Product

describe('Create Product Use Case', () => {
  beforeEach(async () => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new UpdateProductInfoUseCase(inMemoryProductsRepository)

    testProduct = await inMemoryProductsRepository.create({
      id: 'product-1',
      name: 'Test',
      category: 'Tests',
      amount: 10
    })
  })

  it('should be able to update a product info', async () => {
    const product = await sut.execute({
      id: 'product-1',
      name: 'Hammer',
      amount: 50,
      category: 'Tools',
      created_at: testProduct.created_at
    })

    expect(product.name).toEqual('Hammer')
  })

  it('should not be able to update a product info with an existing product name', async () => {
    await inMemoryProductsRepository.create({
      id: 'product-2',
      name: 'Test2',
      category: 'Tests',
      amount: 10
    })

    await expect(async () => {
      await sut.execute({
        id: 'product-1',
        name: 'Test2',
        amount: 50,
        category: 'Tools',
        created_at: testProduct.created_at
      })
    }).rejects.toBeInstanceOf(ProductCannotHaveSameName)
  })

  it('should not be able to update a product info with amount <= 0', async () => {
    await expect(async () => {
      await sut.execute({
        id: 'product-1',
        name: 'Test2',
        amount: 0,
        category: 'Tools',
        created_at: testProduct.created_at
      })
    }).rejects.toBeInstanceOf(ProductCannotBeCreated)
  })
}) 