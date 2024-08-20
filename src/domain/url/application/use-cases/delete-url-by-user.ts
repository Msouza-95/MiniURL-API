import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UrlRepository } from '../repositories/url-repository'
import { Url } from '../../enterprise/entities/url'

interface IDeleteUrlByUserRequest {
  userId: string
  urlId: string
}

@Injectable()
export class DeleteUrlByUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private urlRepository: UrlRepository,
  ) {}

  async execute({ userId, urlId }: IDeleteUrlByUserRequest): Promise<Url> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('User id not Found')
    }

    console.log(urlId)

    const url = await this.urlRepository.findByUserIdAndId({ userId, urlId })

    console.log(url)

    if (!url) {
      throw new NotFoundException('URL ID for the user not found')
    }

    url.logicalDelete()

    const deletelogicalUrl = await this.urlRepository.save(url)

    return deletelogicalUrl
  }
}
