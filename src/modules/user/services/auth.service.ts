import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { UserRepository } from '../repositories/user.repository'
import { AuthenticateUserDto } from '../dto/authentication-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async authenticate(
    dto: AuthenticateUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(dto.email)

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos')
    }

    const isPasswordValid = await compare(dto.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos')
    }

    const accessToken = this.jwtService.sign({ sub: user.id })

    return {
      access_token: accessToken,
    }
  }
}
