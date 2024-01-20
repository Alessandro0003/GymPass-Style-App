import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './profile/get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut : GetUserProfileUseCase

describe('Get User Profile Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        
       const createdUser =  await usersRepository.create({
            name: 'any_name',
            email: 'any_mail@email.com',
            password_hash: await hash('any_password', 6)
        })

        const { user } =  await sut.execute({
            userId: createdUser.id,
        })

        expect(user.name).toEqual('any_name')
    })
})