import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../../../shared/pipes/zod-validation.pipe'
import { UserService } from '../services/user.service'
import { CreateUserDto, createUserSchema } from '../dto/create-user.dto'

@Controller('users')
export class CreateUserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto,
  ): Promise<void> {
    await this.userService.create(body)
  }
}
