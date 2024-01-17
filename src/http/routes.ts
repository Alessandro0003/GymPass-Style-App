import { FastifyInstance } from 'fastify'
import { Register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', Register)
}
