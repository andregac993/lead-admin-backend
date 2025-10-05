import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import { LeadService } from '../services/lead.service'
import { ListLeadsQueryDto, listLeadsQuerySchema } from '../dto/list-leads.dto'

import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class ListLeadsController {
  constructor(private leadService: LeadService) {}

  @Get()
  async handle(
    @CurrentUser() user: UserPayload,
    @Query(new ZodValidationPipe(listLeadsQuerySchema))
    query: ListLeadsQueryDto,
  ) {
    return this.leadService.findAll(user.sub, query)
  }
}
