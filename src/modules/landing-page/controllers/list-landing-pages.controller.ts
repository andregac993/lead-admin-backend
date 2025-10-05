import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { LandingPageService } from '../services/landing-page.service'
import {
  ListLandingPagesQueryDto,
  listLandingPagesQuerySchema,
} from '../dto/list-landing-pages.dto'

import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
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
