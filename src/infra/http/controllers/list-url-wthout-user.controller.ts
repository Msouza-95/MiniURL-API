import { Controller, Get, HttpCode } from '@nestjs/common'

import { ViewUrlMapper } from '../mappers/view-url-mapper'
import { ListUrlWithoutUserUseCase } from '@/domain/url/application/use-cases/list-url-without-user'
import { Public } from '@/infra/auth/public'

@Public()
@Controller('/urls')
export class ListUrlWithoutUserController {
  constructor(private listUrlWithoutUser: ListUrlWithoutUserUseCase) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const { urls } = await this.listUrlWithoutUser.execute()

    return urls.map(ViewUrlMapper.toUnicUrlView)
  }
}
