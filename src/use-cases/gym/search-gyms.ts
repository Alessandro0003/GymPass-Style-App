import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms/gyms-repository'

interface SearchGymsUseCaseRequest {
    query: string
    page: number
}

interface SearchGymsUseCasesResponse {
  gyms: Gym[]
}

export class SearchGymsUseCases {

  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCasesResponse> {

    const gyms = await this.gymsRepository.searchMany(
       query,
       page,
    )

    return { 
      gyms 
    }
  }
}
