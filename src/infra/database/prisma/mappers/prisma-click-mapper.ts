import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Click } from '@/domain/url/enterprise/entities/click'
import { Prisma, Click as PrismaClick } from '@prisma/client'

export class PrismaCLickMapper {
  static toDomain(raw: PrismaClick): Click {
    return Click.create(
      {
        createdAt: raw.createdAt,
        urlId: raw.urlId ? new UniqueEntityID(raw.urlId) : undefined,
        userId: raw.userId ? new UniqueEntityID(raw.userId) : undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(click: Click): Prisma.ClickUncheckedCreateInput {
    return {
      id: click.id.toString(),
      userId: click.userId ? click.userId.toString() : null,
      urlId: click.urlId ? click.urlId.toString() : null,
      createdAt: click.clickedAt,
    }
  }
}
