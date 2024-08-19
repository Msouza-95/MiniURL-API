import { Url } from '../../enterprise/entities/url'

export abstract class UrlRepository {
  abstract create(user: Url): Promise<Url>
  abstract findById(id: string): Promise<Url | null>
}
