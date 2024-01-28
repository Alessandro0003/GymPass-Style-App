import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function SearchGyms(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
   q: z.string(),
   page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymQuerySchema.parse(request.body)

  const searchGymUseCase = makeSearchGymsUseCase()     

  const { gyms } = await searchGymUseCase.execute({
    query: q,
    page
  })

  return await reply.status(200).send({
    gyms
  })
}

