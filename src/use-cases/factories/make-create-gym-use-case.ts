import { CreateGymUseCase } from "../gym/create-gym"
import { FetchNearbyGymsUseCase } from "../gym/fetch-nearby-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const createGymUseCase = new CreateGymUseCase(gymsRepository)

   return createGymUseCase
}