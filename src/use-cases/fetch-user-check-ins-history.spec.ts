import { expect, it, describe, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './check-in/fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut : FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryUseCase( checkInsRepository)
    })

    it('should be able to fetch check-in history', async () => {
        await checkInsRepository.create({
            gym_id: 'any_gym-01',
            user_id: 'any_userId-01'
        })

        await checkInsRepository.create({
            gym_id: 'any_gym-02',
            user_id: 'any_userId-01'
        })

        const { checkIns } =  await sut.execute({
            userId: 'any_userId-01',
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'any_gym-01' }),
            expect.objectContaining({ gym_id: 'any_gym-02' })
        ])
    })
})