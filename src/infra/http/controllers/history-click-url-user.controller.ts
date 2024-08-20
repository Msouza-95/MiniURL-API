import { Controller, Get, HttpCode } from '@nestjs/common'

import { CurrentUser } from '@/infra/auth/current-user-decorator'

import { UserPayload } from '@/infra/auth/jwt.strategy'
import { HistoryClickUrlUseUseCase } from '@/domain/url/application/use-cases/history-click-url-user'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users/click/history')
export class HistoryClickUrlUserController {
  constructor(private historyClickUrlUse: HistoryClickUrlUseUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Histórico de cliques.',
    description:
      'Recupera o histórico de cliques em URLs encurtadas do usuário autenticado, incluindo detalhes como data e hora dos cliques.',
  })
  @ApiBearerAuth('access-token')
  async handle(@CurrentUser() currentUser: UserPayload) {
    const result = await this.historyClickUrlUse.execute({
      userId: currentUser.sub,
    })

    return result
  }
}
