import { PrismaService } from '../../prisma/prisma.service'
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { compare } from 'bcryptjs'

const authenticationUserBodySchema = z.object({
  email: z.email(),
  password: z.string(),
})

type AuthenticationUserBodySchema = z.infer<typeof authenticationUserBodySchema>

@Controller('sessions')
export class AuthenticationUserController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticationUserBodySchema))
  async handle(@Body() body: AuthenticationUserBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos')
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    return {
      access_token: accessToken,
    }
  }
}
