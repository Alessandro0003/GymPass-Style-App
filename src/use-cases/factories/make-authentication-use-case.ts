import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticationUseCase } from "../authentication/authentication"

export function makeAuthenticationUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const authenticationUseCase = new AuthenticationUseCase(usersRepository)

   return authenticationUseCase
}