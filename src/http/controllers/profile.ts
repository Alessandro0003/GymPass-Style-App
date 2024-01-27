import { FastifyRequest, FastifyReply } from 'fastify'

export async function Profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  console.log(request.user.sub)
  return await reply.status(200).send()
}

