import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { LandingPageService } from '../services/landing-page.service'
import {
  ListLandingPagesQueryDto,
  listLandingPagesQuerySchema,
} from '../dto/list-landing-pages.dto'

import { JwtAuthGuard } from '../../../shared/auth/guards/jwt-auth.guard'
import { CurrentUser } from '../../../shared/auth/decorators/current-user-decorator'
import { UserPayload } from '../../../shared/auth/strategies/jwt.strategy'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'

@Controller('landing-pages')
@UseGuards(JwtAuthGuard)
export class ListLandingPagesController {
  constructor(private landingPageService: LandingPageService) {}

  @Get()
  async handle(
    @Query(new ZodValidationPipe(listLandingPagesQuerySchema))
    query: ListLandingPagesQueryDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.landingPageService.findAll(user.sub, query)
  }
}
