import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { LandingPageService } from '../services/landing-page.service'
import {
  CreateLandingPageDto,
  createLandingPageSchema,
} from '../dto/create-landing-page.dto'

import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'

@Controller('landing-pages')
@UseGuards(JwtAuthGuard)
export class CreateLandingPageController {
  constructor(private landingPageService: LandingPageService) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createLandingPageSchema))
    body: CreateLandingPageDto,
    @CurrentUser() user: UserPayload,
  ) {
    const landingPage = await this.landingPageService.create(user.sub, body)
    return { landingPage }
  }
}
