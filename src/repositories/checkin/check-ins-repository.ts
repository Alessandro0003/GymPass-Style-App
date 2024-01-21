import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string):Promise<CheckIn[]>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    
}