import { expect, it, describe, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCases } from '@/use-cases/register/register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/users-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCases

describe('Register Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCases(usersRepository)
    })

    it('should be able to register', async () => {
        
        const { user } =  await sut.execute({
            name: 'Alessandro',
            email: 'ale@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () => {

        const { user } =  await sut.execute({
            name: 'Alessandro',
            email: 'ale@example.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        
        const email = 'ale@example.com'

        await sut.execute({
            name: 'Alessandro',
            email,
            password: '123456',
        })

        await expect(() => 
            sut.execute({
                name: 'Alessandro',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})