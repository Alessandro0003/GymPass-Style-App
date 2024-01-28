import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function NearbyGyms(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({

    latitude: z.number().refine(value => {
        return Math.abs(value) <= 90
    }),

    longitude:  z.number().refine(value => {
        return Math.abs(value) <= 180
    }),
  })

  const { latitude,  longitude } = nearbyGymsQuerySchema.parse(request.body)

  const featchnearbyGymsUseCase = makeFetchNearbyGymsUseCase()     

  const { gyms } = await featchnearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })

  return await reply.status(200).send({
    gyms
  })
}

