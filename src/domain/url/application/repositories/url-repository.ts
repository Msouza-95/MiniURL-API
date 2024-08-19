import { Url } from '../../enterprise/entities/url'

export abstract class UrlRepository {
  abstract create(url: Url): Promise<Url>
  abstract findById(id: string): Promise<Url | null>
  abstract findByMiniUrl(miniUrl: string): Promise<Url | null>
}
