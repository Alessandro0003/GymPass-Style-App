import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticationUseCase } from './authentication/authentication'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut : AuthenticationUseCase

describe('Authentication Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticationUseCase(usersRepository)
    })

    it('should be able to authentication', async () => {
        
        await usersRepository.create({
            name: 'any_name',
            email: 'any_mail@email.com',
            password_hash: await hash('any_password', 6)
        })

        const { user } =  await sut.execute({
            email: 'any_mail@email.com',
            password: 'any_password',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authentication with wrong email', async () => {

        await expect(() => sut.execute({
            email: 'any_mail@email.com',
            password: 'any_password',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authentication with wrong password', async () => {

        await usersRepository.create({
            name: 'any_name',
            email: 'any_mail@email.com',
            password_hash: await hash('any_password', 6)
        })

        await expect(() => sut.execute({
            email: 'any_mail@email.com',
            password: 'any_passwords',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})