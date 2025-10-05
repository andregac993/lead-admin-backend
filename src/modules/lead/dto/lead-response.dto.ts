import { z } from 'zod'

export const leadListItemSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  position: z.string().nullable(),
  createdAt: z.date(),
})

export const leadResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  phone: z.string().nullable(),
  position: z.string().nullable(),
  dateOfBirth: z.date().nullable(),
  message: z.string().nullable(),
  landingPageId: z.uuid().nullable(),
  utmSource: z.string().nullable(),
  utmMedium: z.string().nullable(),
  utmCampaign: z.string().nullable(),
  utmTerm: z.string().nullable(),
  utmContent: z.string().nullable(),
  gclid: z.string().nullable(),
  fbclid: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type LeadResponseDto = z.infer<typeof leadResponseSchema>

export const leadDetailResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  phone: z.string().nullable(),
  position: z.string().nullable(),
  dateOfBirth: z.date().nullable(),
  message: z.string().nullable(),
  tracking: z.object({
    utmSource: z.string().nullable(),
    utmMedium: z.string().nullable(),
    utmCampaign: z.string().nullable(),
    utmTerm: z.string().nullable(),
    utmContent: z.string().nullable(),
    gclid: z.string().nullable(),
    fbclid: z.string().nullable(),
  }),
  landingPage: z
    .object({
      id: z.uuid(),
      name: z.string(),
      slug: z.string(),
      url: z.string().nullable(),
    })
    .nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type LeadDetailResponseDto = z.infer<typeof leadDetailResponseSchema>

export const paginationSchema = z.object({
  page: z.number().int().positive(),
  perPage: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
})

export const leadListResponseSchema = z.object({
  leads: z.array(leadListItemSchema),
  pagination: paginationSchema,
})

export type LeadListResponseDto = z.infer<typeof leadListResponseSchema>
