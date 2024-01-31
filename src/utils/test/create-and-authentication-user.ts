import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticationUser(app: FastifyInstance, isAdmin = false ){
    await prisma.user.create({
        data: {
            name: 'Ale',
            email: 'ale@example.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER',
        }
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