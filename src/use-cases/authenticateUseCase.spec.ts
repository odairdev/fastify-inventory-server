import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach} from 'vitest'
import { AuthenticateUseCase } from './autheticateUseCase'
import { hash } from 'bcryptjs'
import { AuthenticationError } from './errors/authentication-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate user', async () => {
    const password_hash = await hash('123456', 6)

    const createdUser = await inMemoryUsersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash
    })

    const {user} = await sut.execute({email: createdUser.email, password: '123456'})

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(async () => {
      const { user } = await sut.execute({email: 'teste@email.com', password: '123456'})
    }).rejects.toBeInstanceOf(AuthenticationError)
  })

  it('should not be able to authenticate user with wrong password', async () => {
    const password_hash = await hash('123456', 6)

    const createdUser = await inMemoryUsersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash
    })

    await expect(async () => {
      const { user } = await sut.execute({email: 'teste@email.com', password: '654321'})
    }).rejects.toBeInstanceOf(AuthenticationError)
  })
})