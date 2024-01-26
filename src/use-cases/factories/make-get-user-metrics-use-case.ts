import { GetUserMetricsUseCase } from "../user/get-user-metrics"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

   return getUserMetricsUseCase
}