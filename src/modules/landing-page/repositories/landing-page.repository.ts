import { Injectable } from '@nestjs/common'
import { LandingPage, Prisma } from '../../../../generated/prisma'
import { PrismaService } from '../../../shared/database/prisma/prisma.service'

@Injectable()
export class LandingPageRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LandingPageCreateInput): Promise<LandingPage> {
    return this.prisma.landingPage.create({ data })
  }

  async findBySlug(slug: string): Promise<LandingPage | null> {
    return this.prisma.landingPage.findUnique({
      where: { slug },
    })
  }

  async findManyByUser(params: {
    userId: string
    skip: number
    take: number
  }): Promise<{ landingPages: { id: string; name: string }[]; total: number }> {
    const { userId, skip, take } = params

    const [landingPages, total] = await Promise.all([
      this.prisma.landingPage.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.landingPage.count({ where: { userId } }),
    ])

    return { landingPages, total }
  }
}
