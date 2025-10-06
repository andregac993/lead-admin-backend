import { z } from 'zod'

export const listLeadsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  landingPageId: z.uuid().optional(),
})

export const leadIdParamSchema = z.object({
  id: z.uuid('ID inválido'),
})

export type ListLeadsQueryDto = z.infer<typeof listLeadsQuerySchema>
export type LeadIdParamDto = z.infer<typeof leadIdParamSchema>
