import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UrlRepository } from '../repositories/url-repository'
import { Url } from '../../enterprise/entities/url'

interface IUpdateOriginalUrlByUserRequest {
  urlId: string
  userId: string
  originalUrl: string
}

@Injectable()
export class UpdateOriginalUrlByUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private urlRepository: UrlRepository,
  ) {}

  async execute({
    userId,
    urlId,
    originalUrl,
  }: IUpdateOriginalUrlByUserRequest): Promise<Url> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('User id not Found')
    }
    const url = await this.urlRepository.findByUserIdAndId({
      urlId,
      userId,
    })

    if (!url) {
      throw new NotFoundException('URL ID for the user not found')
    }
    url.originalUrl = originalUrl

    const updateUrl = await this.urlRepository.save(url)

    return updateUrl
  }
}
