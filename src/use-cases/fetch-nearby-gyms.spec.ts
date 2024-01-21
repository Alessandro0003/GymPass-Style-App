import { expect, it, describe, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './gym/fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut : FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })

    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            description: 'MMA Gym',
            phone: 'any_phone',
            latitude:  -25.465340,
            longitude: -49.065023
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: 'Muay Thai Gyms',
            phone: 'any_phone',
            latitude:    -25.374064,
            longitude: -49.076342,


        })

        const { gyms } =  await sut.execute({
            userLatitude: -25.465340,
            userLongitude: -49.065023
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym', })
        ])
    })
})