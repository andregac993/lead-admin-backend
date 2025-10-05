import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '../../../../generated/prisma'
import { LeadRepository } from '../repositories/lead.repository'
import { LeadPresenter } from '../presenters/lead.presenter'
import { CreateLeadDto } from '../dto/create-lead.dto'
import { ListLeadsQueryDto } from '../dto/list-leads.dto'
import { UpdateLeadDto } from '../dto/update-lead.dto'
import {
  LeadDetailResponseDto,
  LeadListResponseDto,
  LeadResponseDto,
} from '../dto/lead-response.dto'

@Injectable()
export class LeadService {
  constructor(private leadRepository: LeadRepository) {}

  async create(userId: string, dto: CreateLeadDto): Promise<LeadResponseDto> {
    const { landingPageId, dateOfBirth, ...restBody } = dto

    if (landingPageId) {
      await this.validateLandingPageOwnership(landingPageId, userId)
      await this.validateEmailUniqueness(landingPageId, dto.email)
    }

    const lead = await this.leadRepository.create({
      user: { connect: { id: userId } },
      landingPage: landingPageId
        ? { connect: { id: landingPageId } }
        : undefined,
      ...restBody,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    })

    return LeadPresenter.toResponse(lead)
  }

  async findAll(
    userId: string,
    dto: ListLeadsQueryDto,
  ): Promise<LeadListResponseDto> {
    const { page = 1, perPage = 20, search, landingPageId } = dto

    const where: Prisma.LeadWhereInput = {
      userId,
      ...(landingPageId && { landingPageId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    }

    const { leads, total } = await this.leadRepository.findManyWithPagination({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return {
      leads,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async findById(
    userId: string,
    leadId: string,
  ): Promise<LeadDetailResponseDto> {
    const lead = await this.leadRepository.findById(leadId)

    if (!lead) {
      throw new NotFoundException('Lead não encontrado')
    }

    if (lead.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este lead',
      )
    }

    return LeadPresenter.toDetailResponse(lead)
  }

  async update(
    userId: string,
    leadId: string,
    dto: UpdateLeadDto,
  ): Promise<LeadResponseDto> {
    const { landingPageId, dateOfBirth, email, ...restBody } = dto

    const existingLead = await this.findLeadAndValidateOwnership(leadId, userId)

    if (landingPageId !== undefined && landingPageId !== null) {
      await this.validateLandingPageOwnership(landingPageId, userId)
    }

    if (email && email !== existingLead.email) {
      const targetLandingPageId =
        landingPageId !== undefined ? landingPageId : existingLead.landingPageId

      if (targetLandingPageId) {
        const duplicateLead =
          await this.leadRepository.findByLandingPageAndEmail(
            targetLandingPageId,
            email,
          )

        if (duplicateLead && duplicateLead.id !== leadId) {
          throw new ConflictException(
            'Já existe um lead com este e-mail nesta landing page',
          )
        }
      }
    }

    const updateData: Prisma.LeadUpdateInput = {
      ...restBody,
      ...(email !== undefined && { email }),
      ...(landingPageId !== undefined && { landingPageId }),
      ...(dateOfBirth !== undefined && {
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      }),
    }

    const lead = await this.leadRepository.update(leadId, updateData)

    return LeadPresenter.toResponse(lead)
  }

  async delete(userId: string, leadId: string): Promise<void> {
    await this.findLeadAndValidateOwnership(leadId, userId)
    await this.leadRepository.delete(leadId)
  }

  private async validateLandingPageOwnership(
    landingPageId: string,
    userId: string,
  ): Promise<void> {
    const landingPage = await this.leadRepository.findLandingPageByUser(
      landingPageId,
      userId,
    )

    if (!landingPage) {
      throw new ConflictException(
        'Landing page não encontrada ou não pertence ao usuário',
      )
    }
  }

  private async validateEmailUniqueness(
    landingPageId: string,
    email: string,
  ): Promise<void> {
    const existingLead = await this.leadRepository.findByLandingPageAndEmail(
      landingPageId,
      email,
    )

    if (existingLead) {
      throw new ConflictException(
        'Já existe um lead com este e-mail nesta landing page',
      )
    }
  }

  private async findLeadAndValidateOwnership(leadId: string, userId: string) {
    const lead = await this.leadRepository.findById(leadId)

    if (!lead) {
      throw new NotFoundException('Lead não encontrado')
    }

    if (lead.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este lead',
      )
    }

    return lead
  }
}
