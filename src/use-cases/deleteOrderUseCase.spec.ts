import { InMemoryInventoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { InsufficientProductAmount } from './errors/insufficient-product-amount'
import { DeleteOrderUseCase } from './deleteOrderUseCase'
import { OrderCannotBeDeletedError } from './errors/OrderCannotBeDeletedError'

let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryInventoryOrdersRepository: InMemoryInventoryOrdersRepository
let sut: DeleteOrderUseCase

describe('Delete Iventory Order Use Case', () => {
  beforeEach(async () => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryInventoryOrdersRepository = new InMemoryInventoryOrdersRepository()
    sut = new DeleteOrderUseCase(inMemoryProductsRepository, inMemoryInventoryOrdersRepository)

    await inMemoryProductsRepository.create({ 
      id: 'product-1',
      name: 'Product Test',
      amount: 10,
      category: 'Test'
    })

    await inMemoryInventoryOrdersRepository.create({
      id: 'order-1',
      type: 'out',
      amount: 5,
      productId: 'product-1'
    })

    inMemoryProductsRepository.db[0].amount -= 5 // To emulate CreateOrderUseCase taking out products amount
  })

  it('should be able to delete an order', async () => {
    await sut.execute('order-1')
    const product = inMemoryProductsRepository.db[0]

    expect(product.amount).toEqual(10)
  })

  it('should not be able to delete an inexistent order', async () => {
    await expect(async () => {
    await sut.execute('order-2')
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete an in order if there is not enough product amount', async () => {
    inMemoryProductsRepository.db[0].amount -= 5

    await inMemoryInventoryOrdersRepository.create({
      id: 'order-2',
      type: 'in',
      amount: 5,
      productId: 'product-1'
    })

    await expect(async () => {
    await sut.execute('order-2')
    }).rejects.toBeInstanceOf(OrderCannotBeDeletedError)
  })
})