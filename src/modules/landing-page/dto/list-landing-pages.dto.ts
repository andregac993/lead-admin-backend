import { z } from 'zod'

export const listLandingPagesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
})

export type ListLandingPagesQueryDto = z.infer<
  typeof listLandingPagesQuerySchema
>
