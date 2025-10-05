import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/create-user.controller'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { UserService } from './services/user.service'
import { AuthService } from './services/auth.service'
import { UserRepository } from './repositories/user.repository'

@Module({
  controllers: [CreateUserController, AuthenticateUserController],
  providers: [UserService, AuthService, UserRepository],
  exports: [UserService, AuthService],
})
export class UserModule {}
