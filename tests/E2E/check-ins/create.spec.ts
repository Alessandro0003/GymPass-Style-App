import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticationUser } from '@/utils/test/create-and-authentication-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-In (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })


    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a check-in', async () => {
        const { token } = await  createAndAuthenticationUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'Checkmat Academy',
                latitude: -25.4312448,
                longitude: -49.0602496
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${ token }`)    
            .send({
                latitude: -25.4312448,
                longitude: -49.0602496
            })

        expect(response.statusCode).toEqual(201)
    })
})