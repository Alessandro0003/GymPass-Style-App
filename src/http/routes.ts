import { FastifyInstance } from 'fastify'
import { Register } from './controllers/register'
import { Authentication } from './controllers/authentication'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', Register)

  app.post('/sessions', Authentication)
}
