import { User } from '@/domain/user/enterprise/entities/user'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Url } from '../../enterprise/entities/url'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { UrlRepository } from '../repositories/url-repository'

interface IListUrlByUserRequest {
  userId: string
}

interface IListUrlByUserResponse {
  urls: Url[]
}

@Injectable()
export class ListUrlByUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private urlRepository: UrlRepository,
  ) {}

  async execute({
    userId,
  }: IListUrlByUserRequest): Promise<IListUrlByUserResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('User id not Found')
    }

    const urls = await this.urlRepository.findByUserId(user.id.toString())

    return { urls }
  }
}
