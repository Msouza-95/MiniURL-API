import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Url } from '@/domain/url/enterprise/entities/url'
import { Prisma, Url as PrismaUrl } from '@prisma/client'

export class PrismaUrlMapper {
  static toDomain(raw: PrismaUrl): Url {
    return Url.create(
      {
        clickCount: raw.click_count,
        miniUrl: raw.mini_url,
        originalUrl: raw.original_url,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        userId: new UniqueEntityID(raw.userId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(url: Url): Prisma.UrlUncheckedCreateInput {
    return {
      id: url.id.toString(),
      click_count: url.clickCount,
      mini_url: url.miniUrl,
      original_url: url.originalUrl,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      userId: url.userId?.toString(),
    }
  }
}
