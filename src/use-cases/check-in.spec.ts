import { expect, it, describe, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in/check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut : CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase( checkInsRepository, gymsRepository)

        gymsRepository.items.push({
            id: 'any_gym',
            title: 'any_title',
            description: 'any_description',
            phone: 'any_phone',
            latitude: new Decimal(0),
            longitude: new Decimal(0)
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } =  await sut.execute({
            gymId: 'any_gym',
            userId: 'any_user',
            userLatitude: -25.4312448,
            userLongitude: -49.0602496
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 23, 36, 0))

        await sut.execute({
            gymId: 'any_gym',
            userId: 'any_user',
            userLatitude: -25.4312448,
            userLongitude: -49.0602496
        })

        await expect(() => sut.execute({
            gymId: 'any_gym',
            userId: 'any_user',
            userLatitude: -25.4312448,
            userLongitude: -49.0602496
        })).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 23, 36, 0))

        await sut.execute({
            gymId: 'any_gym',
            userId: 'any_user',
            userLatitude: -25.4312448,
            userLongitude: -49.0602496
        })

        vi.setSystemTime(new Date(2024, 0, 21, 23, 36, 0))


        const { checkIn } = await sut.execute({
            gymId: 'any_gym',
            userId: 'any_user',
            userLatitude: -25.4312448,
            userLongitude: -49.0602496
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})