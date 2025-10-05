import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './config/env'

import { LeadModule } from './modules/lead/lead.module'
import { LandingPageModule } from './modules/landing-page/landing-page.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { DatabaseModule } from './shared/database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    LeadModule,
    LandingPageModule,
  ],
})
export class AppModule {}
