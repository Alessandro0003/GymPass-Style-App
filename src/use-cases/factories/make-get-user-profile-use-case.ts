import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileUseCase } from "../user/get-user-profile"

export function makeGetUserProfileUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

   return getUserProfileUseCase
}