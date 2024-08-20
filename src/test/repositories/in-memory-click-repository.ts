import { ClickRepository } from '@/domain/url/application/repositories/click-repository'
import { Click } from '@/domain/url/enterprise/entities/click'

export class InMemoryClickRepository implements ClickRepository {
  public clicks: Click[] = []

  async create(click: Click): Promise<Click> {
    this.clicks.push(click)

    return click
  }

  async findById(id: string): Promise<Click | null> {
    const click = this.clicks.find((item) => item.id.toString() === id)

    if (!click) {
      return null
    }

    return click
  }

  async save(click: Click): Promise<Click> {
    const index = this.clicks.findIndex(
      (item) => item.id === click.id && item.userId === click.userId,
    )

    if (index !== -1) {
      // Atualiza o objeto encontrado
      this.clicks[index] = click
    }

    return this.clicks[index]
  }
}
