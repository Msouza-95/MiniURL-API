import { Controller, Get, HttpCode } from '@nestjs/common'

import { CurrentUser } from '@/infra/auth/current-user-decorator'

import { ListUrlByUserUseCase } from '@/domain/url/application/use-cases/list-url-by-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ViewUrlMapper } from '../mappers/view-url-mapper'

@Controller('users/urls')
export class ListUrlByUserController {
  constructor(private listUrlByUser: ListUrlByUserUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() currentUser: UserPayload) {
    const { urls } = await this.listUrlByUser.execute({
      userId: currentUser.sub,
    })

    return urls.map(ViewUrlMapper.toUnicUrlView)
  }
}
