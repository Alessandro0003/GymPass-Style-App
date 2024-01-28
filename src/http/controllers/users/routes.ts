import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authentication } from './authentication'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlweares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authentication)

  /* Rotas que será executada quando o usuario tiver Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
