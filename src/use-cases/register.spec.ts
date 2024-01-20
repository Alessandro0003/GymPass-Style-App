import { expect, it, describe } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCases } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/users-already-exists'

describe('Register Use Case', () => {

    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()

        const registerUseCase = new RegisterUseCases(usersRepository)
        

        const { user } =  await registerUseCase.execute({
            name: 'Alessandro',
            email: 'ale@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()

        const registerUseCase = new RegisterUseCases(usersRepository)
        

        const { user } =  await registerUseCase.execute({
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
        const usersRepository = new InMemoryUsersRepository()

        const registerUseCase = new RegisterUseCases(usersRepository)
        
        const email = 'ale@example.com'

        await registerUseCase.execute({
            name: 'Alessandro',
            email,
            password: '123456',
        })

        await expect(() => 
            registerUseCase.execute({
                name: 'Alessandro',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})