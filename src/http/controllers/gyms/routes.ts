import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlweares/verify-jwt'
import { SearchGyms } from './search'
import { NearbyGyms } from './nearby'
import { CreateGyms } from './create'

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', SearchGyms)
    app.get('/gyms/nearby', NearbyGyms)
    
    app.post('/gyms', CreateGyms)
}
