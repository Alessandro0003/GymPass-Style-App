import { expect, it, describe, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '@/use-cases/check-in/check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut : CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase( checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'any_gym',
            title: 'any_title',
            description: 'any_description',
            phone: 'any_phone',
            latitude: -25.4312448,
            longitude: -49.0602496
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
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
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

    it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'any_gym2',
            title: 'any_title',
            description: 'any_description',
            phone: 'any_phone',
            latitude: new Decimal(-25.4496736),
            longitude: new Decimal(-49.068657)
        })

        await expect(() => sut.execute({
            gymId: 'any_gym2',
            userId: 'any_user',
            userLatitude: -25.4312448,
            userLongitude: -49.0602496
        })).rejects.toBeInstanceOf(MaxDistanceError)
    })
})