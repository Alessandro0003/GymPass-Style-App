import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticationUser } from '@/utils/test/create-and-authentication-user'

describe('Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })


    afterAll(async () => {
        await app.close()
    })

    it('should be able list nearby gyms', async () => {
        const { token } = await  createAndAuthenticationUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)    
            .send({
                title: 'Phoenix Academy',
                description: 'Academy In MUAY THAI',
                phone: '(41)70707-0707',
                latitude:  -25.465340,
                longitude: -49.065023
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)    
            .send({
                title: 'Checkmat Academy',
                description: 'Gym is martial arts',
                phone: '(41)70707-0707',
                latitude:    -25.374064,
                longitude: -49.076342
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude:  -25.465340,
                longitude: -49.065023
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Phoenix Academy',
            }),
        ])
    })
})