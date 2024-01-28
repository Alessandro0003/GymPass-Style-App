import { FastifyInstance } from 'fastify'
import { Register } from './register'
import { Authentication } from './authentication'
import { Profile } from './profile'
import { verifyJWT } from '@/http/middlweares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/sessions', Authentication)

  /* Rotas que será executada quando o usuario tiver Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, Profile)
}
