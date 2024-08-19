import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UrlRepository } from '@/domain/url/application/repositories/url-repository'
import { Url } from '@/domain/url/enterprise/entities/url'
import { PrismaUrlMapper } from '../mappers/prisma-url-mapper'

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
}
