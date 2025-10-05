import { Module } from '@nestjs/common'
import { CreateLandingPageController } from './controllers/create-landing-pages.controller'
import { ListLandingPagesController } from './controllers/list-landing-pages.controller'
import { LandingPageService } from './services/landing-page.service'
import { LandingPageRepository } from './repositories/landing-page.repository'

@Module({
  controllers: [CreateLandingPageController, ListLandingPagesController],
  providers: [LandingPageService, LandingPageRepository],
  exports: [LandingPageService],
})
export class LandingPageModule {}
