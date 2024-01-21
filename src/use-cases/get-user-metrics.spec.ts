import { expect, it, describe, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './check-in/fetch-user-check-ins-history'
import { GetUserMetricsUseCase } from './user/get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut : GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase( checkInsRepository)
    })

    it('should be able to get check-ins count from metrics', async () => {
        await checkInsRepository.create({
            gym_id: 'any_gym-01',
            user_id: 'any_userId-01'
        })

        await checkInsRepository.create({
            gym_id: 'any_gym-02',
            user_id: 'any_userId-01'
        })

        const { checkInsCount } =  await sut.execute({
            userId: 'any_userId-01',
        })

        expect(checkInsCount).toEqual(2)
    })
})