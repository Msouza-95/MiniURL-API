import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UrlRepository } from '../repositories/url-repository'
import { User } from '@/domain/user/enterprise/entities/user'
import { Url } from '../../enterprise/entities/url'

interface ICreateMiniUrlRequest {
  url: string
  userId?: string
}

interface ICreateMiniUrlResponse {
  user?: User
  shortUrl: string | undefined
}

@Injectable()
export class CreateMiniUrlUseCase {
  constructor(
    private userRepository: UserRepository,
    private urlRepository: UrlRepository,
  ) {}

  async execute({
    url,
    userId,
  }: ICreateMiniUrlRequest): Promise<ICreateMiniUrlResponse> {
    console.log('estou no usecase')
    const newUrl = Url.create({ originalUrl: url, clickCount: 0 })

    let isUnique = false

    while (!isUnique) {
      // Gera um novo miniUrl
      newUrl.createShortUrl()

      // Verifica se o miniUrl já existe no repositório
      const existingUrl = await this.urlRepository.findByMiniUrl(
        newUrl.miniUrl!,
      )

      // Se não existir, o miniUrl é único e pode ser usado
      if (!existingUrl) {
        isUnique = true
      }
    }

    // se é um user  autenticado, vincula a url a ele
    if (userId) {
      const user = await this.userRepository.findById(userId)

      if (!user) {
        throw new NotFoundException('User id not Found')
      }

      newUrl.userId = user.id

      await this.urlRepository.create(newUrl)

      return { user, shortUrl: newUrl.miniUrl }
    }

    // user não autenticados, retorna apenas as novas url

    await this.urlRepository.create(newUrl)

    return { shortUrl: newUrl.miniUrl }
  }
}
