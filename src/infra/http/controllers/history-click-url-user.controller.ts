import { Controller, Get, HttpCode } from '@nestjs/common'

import { CurrentUser } from '@/infra/auth/current-user-decorator'

import { UserPayload } from '@/infra/auth/jwt.strategy'
import { HistoryClickUrlUseUseCase } from '@/domain/url/application/use-cases/history-click-url-user'

@Controller('users/click/history')
export class HistoryClickUrlUserController {
  constructor(private historyClickUrlUse: HistoryClickUrlUseUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() currentUser: UserPayload) {
    const result = await this.historyClickUrlUse.execute({
      userId: currentUser.sub,
    })

    return result
  }
}
