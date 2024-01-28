import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticationUser(app: FastifyInstance){
    await request(app.server).post('/users') .send({
        name: 'Ale Brilhante',
        email: 'ale@example.com',
        password: '123456',
    })

    const authResponse= await request(app.server).post('/sessions').send({
        email: 'ale@example.com',
        password: '123456',
    })

    const { token } = authResponse.body

    return {
       token,
    }

}