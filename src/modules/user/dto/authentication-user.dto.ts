import { z } from 'zod'

export const authenticateUserSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string(),
})

export type AuthenticateUserDto = z.infer<typeof authenticateUserSchema>
