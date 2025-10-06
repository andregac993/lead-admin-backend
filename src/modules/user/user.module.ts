import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/create-user.controller'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'

import { GetApiKeyController } from './controllers/get-api-key.controller'
import { RevokeApiKeyController } from './controllers/revoke-api-key.controller'
import { UserService } from './services/user.service'
import { AuthService } from './services/auth.service'
import { UserRepository } from './repositories/user.repository'
import { GenerateApiKeyController } from './controllers/generate-api-key.controller'

@Module({
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    GenerateApiKeyController,
    GetApiKeyController,
    RevokeApiKeyController,
  ],
  providers: [UserService, AuthService, UserRepository],
  exports: [UserService, AuthService],
})
export class UserModule {}
