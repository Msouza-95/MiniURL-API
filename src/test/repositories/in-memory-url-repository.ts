import { IUrlAndUserDto } from '@/domain/url/application/dto/delete-url-by-user'
import { UrlRepository } from '@/domain/url/application/repositories/url-repository'
import { Url } from '@/domain/url/enterprise/entities/url'

export class InMemoryUrlRepository implements UrlRepository {
  public urls: Url[] = []

  async create(url: Url): Promise<Url> {
    this.urls.push(url)

    return url
  }

  async findById(id: string): Promise<Url | null> {
    const url = this.urls.find((item) => item.id.toString() === id)

    if (!url) {
      return null
    }

    return url
  }

  async findByMiniUrl(miniUrl: string): Promise<Url | null> {
    const url = this.urls.find((item) => item.miniUrl!.toString() === miniUrl)

    if (!url) {
      return null
    }

    return url
  }

  async findByUserId(userId: string): Promise<Url[]> {
    const urls = this.urls.filter((item) => item.userId?.toString() === userId)

    return urls
  }

  async deleteByUserIdLogic({ userId, urlId }: IUrlAndUserDto): Promise<void> {
    const newArray = this.urls.filter(
      (item) =>
        item.userId?.toString() !== userId || item.id.toString() !== urlId,
    )

    this.urls = newArray
  }
}
