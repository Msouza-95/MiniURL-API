import { Injectable } from '@nestjs/common'
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

    console.log(urls)

    return urls.map(PrismaUrlMapper.toDomain)
  }

  async findByWithoutUser(): Promise<Url[]> {
    const urls = await this.prisma.url.findMany({
      where: { userId: null, deletedAt: null },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return urls.map(PrismaUrlMapper.toDomain)
  }

  async save(url: Url): Promise<Url> {
    const result = await this.prisma.url.update({
      where: { id: url.id.toString() },
      data: PrismaUrlMapper.toPrisma(url),
    })

    return PrismaUrlMapper.toDomain(result)
  }

  async findByUserIdAndId({
    userId,
    urlId,
  }: IUrlAndUserDto): Promise<Url | null> {
    const url = await this.prisma.url.findFirst({
      where: { userId, id: urlId },
    })

    if (!url) {
      return null
    }

    return PrismaUrlMapper.toDomain(url)
  }
}
