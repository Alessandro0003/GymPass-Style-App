import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticationUser } from '@/utils/test/create-and-authentication-user'

describe('Create Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })


    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a gym', async () => {
        const { token } = await  createAndAuthenticationUser(app)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)    
            .send({
                title: 'Phoenix Academy',
                description: 'Academy In MUAY THAI',
                phone: '(41)70707-0707',
                latitude: -25.4312448,
                longitude: -49.0602496
            })

        expect(response.statusCode).toEqual(201)
    })
})