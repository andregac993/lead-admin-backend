import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common'
import { LeadService } from '../services/lead.service'
import { LeadIdParamDto, leadIdParamSchema } from '../dto/list-leads.dto'

import { JwtAuthGuard } from '../../../shared/auth/guards/jwt-auth.guard'
import { CurrentUser } from '../../../shared/auth/decorators/current-user-decorator'
import { UserPayload } from '../../../shared/auth/strategies/jwt.strategy'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class DeleteLeadController {
  constructor(private leadService: LeadService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param(new ZodValidationPipe(leadIdParamSchema)) params: LeadIdParamDto,
  ) {
    await this.leadService.delete(user.sub, params.id)
  }
}
