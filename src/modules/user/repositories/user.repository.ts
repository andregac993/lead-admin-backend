import { Injectable } from '@nestjs/common'
import { Prisma, User } from '../../../../generated/prisma'
import { PrismaService } from '../../../shared/database/prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }
}
