import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { registerUseCases } from '@/use-cases/register'

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)

  try {
    await registerUseCases({
      name,
      email,
      password,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
