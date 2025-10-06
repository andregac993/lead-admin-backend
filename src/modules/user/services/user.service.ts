import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { randomBytes } from 'crypto'
import { UserRepository } from '../repositories/user.repository'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(dto.email)

    if (existingUser) {
      throw new ConflictException('Já existe uma conta criada com esse e-mail')
    }

    const hashedPassword = await hash(dto.password, 8)

    await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    })
  }

  async generateApiKey(userId: string): Promise<string> {
    const apiKey = `lak_${randomBytes(32).toString('hex')}`

    await this.userRepository.update(userId, {
      apiKey,
    })

    return apiKey
  }

  async getApiKey(userId: string): Promise<string | null> {
    const user = await this.userRepository.findById(userId)
    return user?.apiKey ?? null
  }

  async revokeApiKey(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      apiKey: null,
    })
  }
}
