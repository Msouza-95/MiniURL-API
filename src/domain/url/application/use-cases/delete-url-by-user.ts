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

  async execute({
    userId,
    urlId,
  }: IDeleteUrlByUserRequest): Promise<Url | void> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('User id not Found')
    }
    // delete lógico
    const url = await this.urlRepository.deleteByUserIdLogic({ userId, urlId })

    return url
  }
}
