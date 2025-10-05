import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common'
import { LeadService } from '../services/lead.service'
import {
  UpdateLeadDto,
  UpdateLeadParamDto,
  updateLeadParamSchema,
  updateLeadSchema,
} from '../dto/update-lead.dto'

import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class UpdateLeadController {
  constructor(private leadService: LeadService) {}

  @Put(':id')
  async handle(
    @CurrentUser() user: UserPayload,
    @Param(new ZodValidationPipe(updateLeadParamSchema))
    params: UpdateLeadParamDto,
    @Body(new ZodValidationPipe(updateLeadSchema)) body: UpdateLeadDto,
  ) {
    const lead = await this.leadService.update(user.sub, params.id, body)
    return { lead }
  }
}
