import { Controller, Get, HttpCode } from '@nestjs/common'

import { ViewUrlMapper } from '../mappers/view-url-mapper'
import { ListUrlWithoutUserUseCase } from '@/domain/url/application/use-cases/list-url-without-user'
import { Public } from '@/infra/auth/public'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('URLs')
@Public()
@Controller('/urls')
export class ListUrlWithoutUserController {
  constructor(private listUrlWithoutUser: ListUrlWithoutUserUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Listar URLs encurtadas public',
    description:
      'Recupera uma lista de URLs encurtadas que foram geradas por clientes sem contas cadastradas.',
  })
  async handle() {
    const { urls } = await this.listUrlWithoutUser.execute()

    return urls.map(ViewUrlMapper.toUnicUrlView)
  }
}
