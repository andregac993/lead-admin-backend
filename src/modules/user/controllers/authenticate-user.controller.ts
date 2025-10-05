import { Body, Controller, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'
import { AuthService } from '../services/auth.service'
import {
  AuthenticateUserDto,
  authenticateUserSchema,
} from '../dto/authentication-user.dto'

@Controller('sessions')
export class AuthenticateUserController {
  constructor(private authService: AuthService) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(authenticateUserSchema))
    body: AuthenticateUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.authenticate(body)
  }
}
