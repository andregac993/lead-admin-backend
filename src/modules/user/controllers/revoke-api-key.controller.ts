import { Controller, Delete, HttpCode, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { JwtAuthGuard } from '../../../shared/auth/guards/jwt-auth.guard'
import { CurrentUser } from '../../../shared/auth/decorators/current-user-decorator'
import { UserPayload } from '../../../shared/auth/strategies/jwt.strategy'

@Controller('users/api-key')
@UseGuards(JwtAuthGuard)
export class RevokeApiKeyController {
  constructor(private userService: UserService) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload) {
    await this.userService.revokeApiKey(user.sub)
  }
}
