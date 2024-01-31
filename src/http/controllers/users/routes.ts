import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authentication } from './authentication'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlweares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authentication)

  /* Rota que será executada quando o usuario tiver Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)

  /* Rota que será executada quando o usuario perder a Authenticated, quando o token não for mais valido*/
  app.patch('/token/refresh', refresh)
}
