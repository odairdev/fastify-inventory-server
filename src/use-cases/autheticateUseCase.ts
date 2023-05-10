import { IUsersRepository } from "@/repositories/IUsersRepository"
import { compare } from "bcryptjs"
import { AuthenticationError } from "./errors/authentication-error"


interface AutheticateUseCaseRequest {
  email: string,
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({email, password}: AutheticateUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new AuthenticationError()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if(!doesPasswordMatch) {
      throw new AuthenticationError()
    }

    return {
      user: {
        ...user,
        password_hash: undefined
      }
    }
  }
}