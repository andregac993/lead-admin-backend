import { z } from 'zod'

export const createLeadSchema = z.object({
  landingPageId: z.uuid().optional().nullable(),
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  email: z.email('E-mail inválido'),
  phone: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  dateOfBirth: z.string().datetime().optional().nullable(),
  message: z.string().optional().nullable(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  utmTerm: z.string().optional().nullable(),
  utmContent: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  fbclid: z.string().optional().nullable(),
})

export type CreateLeadDto = z.infer<typeof createLeadSchema>
