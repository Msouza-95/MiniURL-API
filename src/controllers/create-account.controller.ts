import { PrismaService } from '@/prisma/prisma.service'
import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'

import { hash } from 'bcryptjs'

interface IRequest {
  name: string
  email: string
  password: string
}

@Controller('users/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: IRequest) {
    const { name, email, password } = body

    const emailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (emailExists) {
      throw new ConflictException(
        'User with same e-mail address already exists',
      )
    }

    const hashPassword = await hash(password, 8)

    const response = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    })

    return response
  }
}
