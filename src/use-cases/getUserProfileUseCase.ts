import { IUsersRepository } from "@/repositories/IUsersRepository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)

    if(!user) {
      throw new ResourceNotFoundError()
    }

    return {
      ...user,
      password_hash: undefined
    }
  }
}