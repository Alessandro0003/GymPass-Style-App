import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticationUser } from '@/utils/test/create-and-authentication-user'
import { prisma } from '@/lib/prisma'

describe('Check-In History(e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })


    afterAll(async () => {
        await app.close()
    })

    it('should be able list the history of check-ins', async () => {
        const { token } = await  createAndAuthenticationUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'Checkmat Academy',
                latitude: -25.4312448,
                longitude: -49.0602496
            }
        })

        await prisma.checkIn.createMany({
            data:[
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },

                {
                    gym_id: gym.id,
                    user_id: user.id,
                }
            ]
        })

        const response = await request(app.server)
            .get('/check-ins/history')
            .set('Authorization', `Bearer ${ token }`)    
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
             })

        ])
    })
})