import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../getUserProfileUseCase";

export function makeGetUserProfileUseCase () {
  const userRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(userRepository)

  return getUserProfileUseCase
}