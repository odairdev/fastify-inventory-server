import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach} from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './getUserProfileUseCase'
import { ResourceNotFoundError } from './errors/resource-not-found'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get an user', async () => {
    const password_hash = await hash('123456', 6)

    const createdUser = await inMemoryUsersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash
    })

    const user = await sut.execute(createdUser.id)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get an inexistent user', async () => {
    await expect(async () => {
      await sut.execute('user-123123')
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})