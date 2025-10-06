import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { LeadService } from '../services/lead.service'
import { CreateLeadDto, createLeadSchema } from '../dto/create-lead.dto'

import { JwtOrApiKeyGuard } from '../../../shared/auth/guards/jwt-or-api-key.guard'
import { CurrentUser } from '../../../shared/auth/decorators/current-user-decorator'
import { UserPayload } from '../../../shared/auth/strategies/jwt.strategy'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'

@Controller('leads')
@UseGuards(JwtOrApiKeyGuard)
export class CreateLeadController {
  constructor(private leadService: LeadService) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createLeadSchema)) body: CreateLeadDto,
  ) {
    const lead = await this.leadService.create(user.sub, body)
    return { lead }
  }
}
