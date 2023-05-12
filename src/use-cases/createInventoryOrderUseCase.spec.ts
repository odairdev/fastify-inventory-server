import { InMemoryInventoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateInventoryOrderUseCase } from './createInventoryOrderUseCase'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { InsufficientProductAmount } from './errors/insufficient-product-amount'

let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryInventoryOrdersRepository: InMemoryInventoryOrdersRepository
let sut: CreateInventoryOrderUseCase

describe('Create Iventory Order Use Case', () => {
  beforeEach(async () => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryInventoryOrdersRepository = new InMemoryInventoryOrdersRepository()
    sut = new CreateInventoryOrderUseCase(inMemoryProductsRepository, inMemoryInventoryOrdersRepository)

    await inMemoryProductsRepository.create({ 
      id: 'product-1',
      name: 'Product Test',
      amount: 10,
      category: 'Test'
    })
  })

  it('should be able to create an order', async () => {
    const order = await sut.execute({
      id: 'order-1',
      type: 'out',
      amount: 10,
      productId: 'product-1'
    })

    expect(order.id).toEqual('order-1')
  })

  it('should not be able to create an order with an inexistent product', async () => {
    await expect(async () => {
      await sut.execute({
        id: 'order-1',
        type: 'in',
        amount: 5,
        productId: 'product-2'
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create an order with an amount larger than the available', async () => {
    await expect(async () => {
      await sut.execute({
        id: 'order-1',
        type: 'out',
        amount: 11,
        productId: 'product-1'
      })
    }).rejects.toBeInstanceOf(InsufficientProductAmount)
  })
})