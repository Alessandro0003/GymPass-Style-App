import { expect, it, describe, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in/check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut : CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase( checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {

        const { checkIn } =  await sut.execute({
            gymId: 'any_gym',
            userId: 'any_user',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 23, 36, 0))

        await sut.execute({
            gymId: 'any_gym',
            userId: 'any_user',
        })

        await expect(() => sut.execute({
            gymId: 'any_gym',
            userId: 'any_user',
        })).rejects.toBeInstanceOf(Error)
    })
})