import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticationUseCase } from '@/use-cases/factories/make-authentication-use-case'

export async function authentication(request: FastifyRequest, reply: FastifyReply) {
  const authenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticationBodySchema.parse(request.body)

  try {
    const authenticationUseCase = makeAuthenticationUseCase()

    const { user } = await authenticationUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id,
      }
    })

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}

