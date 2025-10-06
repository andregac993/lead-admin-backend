import { Controller, Post, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { JwtAuthGuard } from '../../../shared/auth/guards/jwt-auth.guard'
import { CurrentUser } from '../../../shared/auth/decorators/current-user-decorator'
import { UserPayload } from '../../../shared/auth/strategies/jwt.strategy'

@Controller('users/api-key')
@UseGuards(JwtAuthGuard)
export class GenerateApiKeyController {
  constructor(private userService: UserService) {}

  @Post('generate')
  async handle(@CurrentUser() user: UserPayload) {
    const apiKey = await this.userService.generateApiKey(user.sub)
    return { apiKey }
  }
}
