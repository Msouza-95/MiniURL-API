import { Controller, Get, HttpCode } from '@nestjs/common'

import { CurrentUser } from '@/infra/auth/current-user-decorator'

import { ListUrlByUserUseCase } from '@/domain/url/application/use-cases/list-url-by-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ViewUrlMapper } from '../mappers/view-url-mapper'
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger'
import { Url } from '@/domain/url/enterprise/entities/url'

@ApiTags('Users')
@Controller('users/urls')
export class ListUrlByUserController {
  constructor(private listUrlByUser: ListUrlByUserUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Listar URLs do usuário.',
    description:
      'Recupera uma lista de URLs encurtadas associadas à conta do usuário autenticado.',
  })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 201, type: Url, isArray: true })
  async handle(@CurrentUser() currentUser: UserPayload) {
    const { urls } = await this.listUrlByUser.execute({
      userId: currentUser.sub,
    })

    return urls.map(ViewUrlMapper.toUnicUrlView)
  }
}
