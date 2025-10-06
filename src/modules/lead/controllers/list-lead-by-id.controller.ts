import { Controller, Get, Param, UseGuards } from '@nestjs/common'

import { LeadService } from '../services/lead.service'
import { LeadIdParamDto, leadIdParamSchema } from '../dto/list-leads.dto'

import { JwtAuthGuard } from '../../../shared/auth/guards/jwt-auth.guard'
import { CurrentUser } from '../../../shared/auth/decorators/current-user-decorator'
import { UserPayload } from '../../../shared/auth/strategies/jwt.strategy'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class ListLeadByIdController {
  constructor(private leadService: LeadService) {}

  @Get(':id')
  async handle(
    @CurrentUser() user: UserPayload,
    @Param(new ZodValidationPipe(leadIdParamSchema)) params: LeadIdParamDto,
  ) {
    const lead = await this.leadService.findById(user.sub, params.id)
    return { lead }
  }
}
