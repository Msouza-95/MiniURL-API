import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { UrlRepository } from '../repositories/url-repository'
import { Click } from '../../enterprise/entities/click'
import { ClickRepository } from '../repositories/click-repository'

interface IAccessMiniUrlUseCaseRequest {
  userId?: string
  miniUrl: string
}

interface IAccessMiniUrlUseCaseResponse {
  originUrl: string
}

@Injectable()
export class AccessMiniUrlUseCase {
  constructor(
    private userRepository: UserRepository,
    private urlRepository: UrlRepository,
    private clickRepository: ClickRepository,
  ) {}

  async execute({
    userId,
    miniUrl,
  }: IAccessMiniUrlUseCaseRequest): Promise<IAccessMiniUrlUseCaseResponse> {
    const url = await this.urlRepository.findByMiniUrl(miniUrl)
    if (!url) {
      throw new NotFoundException('Invalid mini url ')
    }

    if (userId) {
      const user = await this.userRepository.findById(userId)

      if (!user) {
        throw new NotFoundException('User id not Found')
      }

      // url.clickCount += 1

      const click = new Click({
        urlId: url.id,
        userId: user.id,
        createdAt: new Date(),
      })

      url.clickCount += 1

      await this.clickRepository.create(click)
      await this.urlRepository.save(url)

      return { originUrl: url.originalUrl }
    }

    // não foi um user cadastrado
    url.clickCount += 1

    await this.urlRepository.save(url)

    return { originUrl: url.originalUrl }
  }
}
