import { Injectable } from '@nestjs/common'
import { Lead, Prisma } from '../../../../generated/prisma'
import { PrismaService } from '../../../shared/database/prisma/prisma.service'

export type LeadWithLandingPage = Lead & {
  landingPage: {
    id: string
    name: string
    slug: string
    url: string | null
  } | null
}

export type LeadListItem = {
  id: string
  name: string
  email: string
  position: string | null
  createdAt: Date
}

export type LeadForExport = Omit<Lead, 'userId' | 'id'>

@Injectable()
export class LeadRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LeadCreateInput): Promise<Lead> {
    return this.prisma.lead.create({ data })
  }

  async findById(id: string): Promise<LeadWithLandingPage | null> {
    return this.prisma.lead.findUnique({
      where: { id },
      include: {
        landingPage: {
          select: {
            id: true,
            name: true,
            slug: true,
            url: true,
          },
        },
      },
    })
  }

  async findByLandingPageAndEmail(
    landingPageId: string,
    email: string,
  ): Promise<Lead | null> {
    return this.prisma.lead.findUnique({
      where: {
        landingPageId_email: {
          landingPageId,
          email,
        },
      },
    })
  }

  async findManyWithPagination(params: {
    where: Prisma.LeadWhereInput
    skip: number
    take: number
  }): Promise<{ leads: LeadListItem[]; total: number }> {
    const { where, skip, take } = params

    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          position: true,
          utmSource: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.lead.count({ where }),
    ])

    return { leads, total }
  }

  async update(id: string, data: Prisma.LeadUpdateInput): Promise<Lead> {
    return this.prisma.lead.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.lead.delete({ where: { id } })
  }

  async findLandingPageByUser(
    landingPageId: string,
    userId: string,
  ): Promise<{ id: string } | null> {
    return this.prisma.landingPage.findFirst({
      where: { id: landingPageId, userId },
      select: { id: true },
    })
  }

  async findAllByLandingPage(landingPageId: string): Promise<LeadForExport[]> {
    const leads = await this.prisma.lead.findMany({
      where: { landingPageId },
      orderBy: { createdAt: 'desc' },
    })

    return leads.map(({ ...rest }) => rest)
  }
}
