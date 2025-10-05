import { z } from 'zod'

export const createLandingPageSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  slug: z
    .string()
    .min(1, 'Slug é obrigatório')
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug deve conter apenas letras minúsculas, números e hífens',
    ),
  url: z.url('URL inválida').optional().nullable(),
})

export type CreateLandingPageDto = z.infer<typeof createLandingPageSchema>
