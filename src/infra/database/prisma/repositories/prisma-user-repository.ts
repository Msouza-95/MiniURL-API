import { User } from '@/domain/user/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user)

    const newUser = await this.prisma.user.create({ data })

    return PrismaUserMapper.toDomain(newUser)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      return null
    }
    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      return null
    }
    return PrismaUserMapper.toDomain(user)
  }
}
