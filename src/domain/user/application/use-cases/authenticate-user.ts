import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '../../enterprise/entities/user'

import { compare } from 'bcryptjs'
import { UserRepository } from '../repositories/user-repository'
import { JwtService } from '@nestjs/jwt'

interface IAuthenticateRequest {
  email: string
  password: string
}

interface IAuthenticateResponse {
  user: User
  accessToken: string
}

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match')
    }
    const accessToken = this.jwt.sign({ sub: user.id })

    return { user, accessToken }
  }
}
