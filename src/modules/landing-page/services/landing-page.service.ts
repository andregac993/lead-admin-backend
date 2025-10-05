import { ConflictException, Injectable } from '@nestjs/common'
import { LandingPageRepository } from '../repositories/landing-page.repository'
import { CreateLandingPageDto } from '../dto/create-landing-page.dto'
import { ListLandingPagesQueryDto } from '../dto/list-landing-pages.dto'

@Injectable()
export class LandingPageService {
  constructor(private landingPageRepository: LandingPageRepository) {}

  async create(userId: string, dto: CreateLandingPageDto) {
    const existingSlug = await this.landingPageRepository.findBySlug(dto.slug)

    if (existingSlug) {
      throw new ConflictException('Slug já está em uso')
    }

    const landingPage = await this.landingPageRepository.create({
      user: { connect: { id: userId } },
      name: dto.name,
      slug: dto.slug,
      url: dto.url || null,
    })

    return {
      id: landingPage.id,
      name: landingPage.name,
      slug: landingPage.slug,
      url: landingPage.url,
      createdAt: landingPage.createdAt,
      updatedAt: landingPage.updatedAt,
    }
  }

  async findAll(userId: string, dto: ListLandingPagesQueryDto) {
    const { page = 1, perPage = 20 } = dto

    const { landingPages, total } =
      await this.landingPageRepository.findManyByUser({
        userId,
        skip: (page - 1) * perPage,
        take: perPage,
      })

    return {
      landingPages,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }
}
