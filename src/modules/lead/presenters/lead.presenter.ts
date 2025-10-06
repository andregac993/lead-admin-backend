import { Lead } from '../../../../generated/prisma'
import {
  LeadDetailResponseDto,
  LeadResponseDto,
} from '../dto/lead-response.dto'

type LeadWithLandingPage = Lead & {
  landingPage: {
    id: string
    name: string
    slug: string
    url: string | null
  } | null
}

export class LeadPresenter {
  static toResponse(lead: Lead): LeadResponseDto {
    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      position: lead.position,
      dateOfBirth: lead.dateOfBirth,
      message: lead.message,
      landingPageId: lead.landingPageId,
      utmSource: lead.utmSource,
      utmMedium: lead.utmMedium,
      utmCampaign: lead.utmCampaign,
      utmTerm: lead.utmTerm,
      utmContent: lead.utmContent,
      gclid: lead.gclid,
      fbclid: lead.fbclid,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    }
  }

  static toDetailResponse(lead: LeadWithLandingPage): LeadDetailResponseDto {
    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      position: lead.position,
      dateOfBirth: lead.dateOfBirth,
      message: lead.message,
      tracking: {
        utmSource: lead.utmSource,
        utmMedium: lead.utmMedium,
        utmCampaign: lead.utmCampaign,
        utmTerm: lead.utmTerm,
        utmContent: lead.utmContent,
        gclid: lead.gclid,
        fbclid: lead.fbclid,
      },
      landingPage: lead.landingPage,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    }
  }
}
