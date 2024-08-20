import { Url } from '../../enterprise/entities/url'
import { IUrlAndUserDto } from '../dto/delete-url-by-user'

export abstract class UrlRepository {
  abstract create(url: Url): Promise<Url>
  abstract findById(id: string): Promise<Url | null>
  abstract findByMiniUrl(miniUrl: string): Promise<Url | null>
  abstract findByUserId(userId: string): Promise<Url[]>
  abstract findByWithoutUser(): Promise<Url[]>
  abstract findByUserIdAndId({
    userId,
    urlId,
  }: IUrlAndUserDto): Promise<Url | null>

  abstract save(url: Url): Promise<Url>
}
