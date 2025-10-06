import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-http-bearer'
import { PrismaService } from '../../database/prisma/prisma.service'

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private prisma: PrismaService) {
    super()
  }

  async validate(apiKey: string) {
    const user = await this.prisma.user.findUnique({
      where: { apiKey },
    })

    if (!user) {
      throw new UnauthorizedException('API key inválida')
    }

    return { sub: user.id }
  }
}
