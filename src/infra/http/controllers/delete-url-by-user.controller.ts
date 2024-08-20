import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { CurrentUser } from '@/infra/auth/current-user-decorator'

import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ViewUrlMapper } from '../mappers/view-url-mapper'
import { DeleteUrlByUserUseCase } from '@/domain/url/application/use-cases/delete-url-by-user'

@Controller('users/url/:id')
export class DeleteUrlByUserController {
  constructor(private deleteUrlByUser: DeleteUrlByUserUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(
    @CurrentUser() currentUser: UserPayload,
    @Param('id') urlId: string,
  ) {
    const url = await this.deleteUrlByUser.execute({
      userId: currentUser.sub,
      urlId,
    })

    return ViewUrlMapper.toArraUrlView(url!)
  }
}
