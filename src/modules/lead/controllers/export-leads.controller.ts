import { Controller, Get, Header, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../../shared/auth/guards/jwt-auth.guard'
import { CurrentUser } from '../../../shared/auth/decorators/current-user-decorator'
import { UserPayload } from '../../../shared/auth/strategies/jwt.strategy'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'
import { ExportLeadService } from '../services/export-lead.service'
import {
  ExportLeadsParamDto,
  exportLeadsParamSchema,
} from '../dto/export-leads.dto'

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class ExportLeadsController {
  constructor(private exportLeadService: ExportLeadService) {}

  @Get('export/:landingPageId')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="leads.csv"')
  async handle(
    @CurrentUser() user: UserPayload,
    @Param(new ZodValidationPipe(exportLeadsParamSchema))
    params: ExportLeadsParamDto,
  ) {
    return this.exportLeadService.exportToCsv(user.sub, params.landingPageId)
  }
}
