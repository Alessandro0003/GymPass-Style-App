import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCases } from './gym/create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCases

describe('Register Use Case', () => {

    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCases(gymRepository)
    })

    it('should be able to gym', async () => {
        
        const { gym } =  await sut.execute({
            title: 'Gym',
            description: 'MMA Gym',
            phone: 'any_phone',
            latitude: -25.4496736,
            longitude: -49.068657
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})