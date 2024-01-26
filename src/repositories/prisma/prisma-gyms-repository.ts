import { prisma } from "@/lib/prisma";
import { FindManyNearbyParams, GymsRepository } from "../gyms/gyms-repository";
import { Gym, Prisma } from "@prisma/client";

export class PrismaGymsRepository implements GymsRepository {
    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            }
        })

        return gym
    }

    async findManyNearby({ latitude, longitude}: FindManyNearbyParams) {
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            /* Where para calcular a distancia em Km da latitude e longitude de cada academia de uma distancia que seja menor ou igual a 10 km*/
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms
    }

    async searchMany(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                },
            },
            take: 20,
            skip: (page - 1 ) * 20
        })

        return gyms
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        })

        return gym
    }
}