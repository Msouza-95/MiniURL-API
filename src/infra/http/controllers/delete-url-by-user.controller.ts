import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { CurrentUser } from '@/infra/auth/current-user-decorator'

import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ViewUrlMapper } from '../mappers/view-url-mapper'
import { DeleteUrlByUserUseCase } from '@/domain/url/application/use-cases/delete-url-by-user'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { string } from 'zod'

@ApiTags('Users')
@Controller('users/url/:urlid')
export class DeleteUrlByUserController {
  constructor(private deleteUrlByUser: DeleteUrlByUserUseCase) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Excluir uma URL do usuário.',
    description:
      'Remove a URL encurtada especificada pelo id do usuário autenticado.',
  })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'urlid',
    type: string,
    description: 'Url_id que deseja deletar',
  })
  async handle(
    @CurrentUser() currentUser: UserPayload,
    @Param('urlid') urlId: string,
  ) {
    const url = await this.deleteUrlByUser.execute({
      userId: currentUser.sub,
      urlId,
    })

    return ViewUrlMapper.toUnicUrlView(url!)
  }
}
