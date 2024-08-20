import { Injectable } from '@nestjs/common'
import { Url } from '../../enterprise/entities/url'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { UrlRepository } from '../repositories/url-repository'

interface IListUrlWithoutUserResponse {
  urls: Url[]
}

@Injectable()
export class ListUrlWithoutUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private urlRepository: UrlRepository,
  ) {}

  async execute(): Promise<IListUrlWithoutUserResponse> {
    const urls = await this.urlRepository.findByWithoutUser()

    return { urls }
  }
}
