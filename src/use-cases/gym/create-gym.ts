import { UsersRepository } from '@/repositories/users/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/users-already-exists'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms/gyms-repository'

interface CreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number 
}

interface CreateGymUseCasesResponse {
  gym: Gym
}

export class CreateGymUseCases {

  constructor(private gymsRepository: GymsRepository) {}

  async execute({ title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCasesResponse> {

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return { 
      gym 
    }
  }
}
