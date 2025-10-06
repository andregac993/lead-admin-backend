import { z } from 'zod'

export const exportLeadsParamSchema = z.object({
  landingPageId: z.uuid(),
})

export type ExportLeadsParamDto = z.infer<typeof exportLeadsParamSchema>
