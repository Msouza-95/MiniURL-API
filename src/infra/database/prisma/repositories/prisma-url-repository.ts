import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UrlRepository } from '@/domain/url/application/repositories/url-repository'
import { Url } from '@/domain/url/enterprise/entities/url'
import { PrismaUrlMapper } from '../mappers/prisma-url-mapper'
import { IUrlAndUserDto } from '@/domain/url/application/dto/delete-url-by-user'

@Injectable()
export class PrismaUrlRepository implements UrlRepository {
  constructor(private prisma: PrismaService) {}

  async create(url: Url): Promise<Url> {
    const data = PrismaUrlMapper.toPrisma(url)

    const newUrl = await this.prisma.url.create({ data })

    return PrismaUrlMapper.toDomain(newUrl)
  }

  async findById(id: string): Promise<Url | null> {
    const url = await this.prisma.url.findUnique({ where: { id } })

    if (!url) {
      return null
    }
    return PrismaUrlMapper.toDomain(url)
  }

  async findByMiniUrl(miniUrl: string): Promise<Url | null> {
    const url = await this.prisma.url.findFirst({
      where: { mini_url: miniUrl },
    })
    if (!url) {
      return null
    }
    return PrismaUrlMapper.toDomain(url)
  }

  async findByUserId(userId: string): Promise<Url[]> {
    const urls = await this.prisma.url.findMany({
      where: { userId, deletedAt: null },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return urls.map(PrismaUrlMapper.toDomain)
  }

  async deleteByUserIdLogic({ userId, urlId }: IUrlAndUserDto): Promise<Url> {
    const url = await this.prisma.url.findFirst({
      where: { userId, id: urlId },
    })

    if (!url) {
      throw new NotFoundException('Url id not Found')
    }

    url.updatedAt = new Date()
    url.deletedAt = new Date()

    await this.prisma.url.update({ where: { id: url.id }, data: url })

    return PrismaUrlMapper.toDomain(url)
  }
}
