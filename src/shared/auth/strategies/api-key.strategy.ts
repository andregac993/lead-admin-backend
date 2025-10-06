import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-http-bearer'
import { compare } from 'bcryptjs'
import { PrismaService } from '../../database/prisma/prisma.service'

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private prisma: PrismaService) {
    super()
  }

  async validate(apiKey: string) {
    const users = await this.prisma.user.findMany({
      where: {
        apiKey: {
          not: null,
        },
      },
    })

    for (const user of users) {
      if (user.apiKey) {
        const isValidApiKey = await compare(apiKey, user.apiKey)

        if (isValidApiKey) {
          return { sub: user.id }
        }
      }
    }

    throw new UnauthorizedException('API key inválida')
  }
}
