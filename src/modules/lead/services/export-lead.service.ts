import { Injectable, NotFoundException } from '@nestjs/common'
import { LeadRepository } from '../repositories/lead.repository'

@Injectable()
export class ExportLeadService {
  constructor(private leadRepository: LeadRepository) {}

  async exportToCsv(userId: string, landingPageId: string): Promise<string> {
    const landingPage = await this.leadRepository.findLandingPageByUser(
      landingPageId,
      userId,
    )

    if (!landingPage) {
      throw new NotFoundException('Landing page não encontrada')
    }

    const leads = await this.leadRepository.findAllByLandingPage(landingPageId)

    if (leads.length === 0) {
      throw new NotFoundException(
        'Nenhum lead encontrado para esta landing page',
      )
    }

    const headers = [
      'landingPageId',
      'name',
      'email',
      'phone',
      'position',
      'dateOfBirth',
      'message',
      'utmSource',
      'utmMedium',
      'utmCampaign',
      'utmTerm',
      'utmContent',
      'gclid',
      'fbclid',
      'createdAt',
      'updatedAt',
    ]

    const csvRows = [headers.join(',')]

    for (const lead of leads) {
      const row = [
        lead.landingPageId || '',
        this.escapeCSV(lead.name),
        this.escapeCSV(lead.email),
        lead.phone || '',
        lead.position || '',
        lead.dateOfBirth ? lead.dateOfBirth.toISOString() : '',
        this.escapeCSV(lead.message || ''),
        lead.utmSource || '',
        lead.utmMedium || '',
        lead.utmCampaign || '',
        lead.utmTerm || '',
        lead.utmContent || '',
        lead.gclid || '',
        lead.fbclid || '',
        lead.createdAt.toISOString(),
        lead.updatedAt.toISOString(),
      ]
      csvRows.push(row.join(','))
    }

    return csvRows.join('\n')
  }

  private escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`
    }
    return value
  }
}
