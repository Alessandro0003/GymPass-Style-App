import { FastifyInstance } from 'fastify'
import { Register } from './controllers/register'
import { Authentication } from './controllers/authentication'
import { Profile } from './controllers/profile'
import { verifyJWT } from './middlweares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/sessions', Authentication)

  /* Rotas que será executada quando o usuario tiver Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, Profile)
}
