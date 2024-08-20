import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ClickRepository } from '@/domain/url/application/repositories/click-repository'
import { Click } from '@/domain/url/enterprise/entities/click'
import { PrismaCLickMapper } from '../mappers/prisma-click-mapper'

@Injectable()
export class PrismaClickRepository implements ClickRepository {
  constructor(private prisma: PrismaService) {}

  async create(click: Click): Promise<Click> {
    const data = PrismaCLickMapper.toPrisma(click)

    const newClick = await this.prisma.click.create({ data })

    return PrismaCLickMapper.toDomain(newClick)
  }

  async findById(id: string): Promise<Click | null> {
    const click = await this.prisma.click.findUnique({ where: { id } })

    if (!click) {
      return null
    }
    return PrismaCLickMapper.toDomain(click)
  }

  async save(click: Click): Promise<Click> {
    const result = await this.prisma.click.update({
      where: { id: click.id.toString() },
      data: PrismaCLickMapper.toPrisma(click),
    })

    return PrismaCLickMapper.toDomain(result)
  }
}
