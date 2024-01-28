import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })  

  const createCheckInsBodySchema = z.object({
    latitude: z.number().refine(value => {
        return Math.abs(value) <= 90
    }),

    longitude:  z.number().refine(value => {
        return Math.abs(value) <= 180
    }),
  })
  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInsBodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()     

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  })

  return await reply.status(201).send()
}

