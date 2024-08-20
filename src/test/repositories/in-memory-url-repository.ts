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

  async findByWithoutUser(): Promise<Url[]> {
    const urls: Url[] = []
    const url = this.urls.find((item) => item.userId === null)

    if (!url) {
      return urls
    }

    urls.push(url)

    return urls
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

  async findByUserIdAndId({
    userId,
    urlId,
  }: IUrlAndUserDto): Promise<Url | null> {
    const url = this.urls.find(
      (item) =>
        item.id.toString() === urlId && item.userId?.toString() === userId,
    )
    if (!url) {
      return null
    }

    return url
  }

  async save(url: Url): Promise<Url> {
    const index = this.urls.findIndex(
      (item) => item.id === url.id && item.userId === url.userId,
    )

    if (index !== -1) {
      // Atualiza o objeto encontrado
      this.urls[index] = url
    }

    return this.urls[index]
  }
}
