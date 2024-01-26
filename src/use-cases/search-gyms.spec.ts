import { expect, it, describe, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './check-in/fetch-user-check-ins-history'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './gym/search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut : SearchGymsUseCase

describe('Search Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase( gymsRepository)
    })

    it('should be able to search fro gyms', async () => {
        await gymsRepository.create({
            title: 'MMA Gyms',
            description: 'MMA Gym',
            phone: 'any_phone',
            latitude: -25.4496736,
            longitude: -49.068657
        })

        await gymsRepository.create({
            title: 'Muay Thai Gyms',
            description: 'Muay Thai Gyms',
            phone: 'any_phone',
            latitude: -25.4496736,
            longitude: -49.068657
        })

        const { gyms } =  await sut.execute({
            query: 'MMA',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'MMA Gyms', })
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22;  i++){
            await gymsRepository.create({
                title: `MMA Gyms ${i}`,
                description: 'MMA Gym',
                phone: 'any_phone',
                latitude: -25.4496736,
                longitude: -49.068657
            })
        }

        const { gyms } =  await sut.execute({
            query: 'MMA Gyms',
            page: 2,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'MMA Gyms 21' }),
            expect.objectContaining({ title: 'MMA Gyms 22' }),
        ])
    })
})