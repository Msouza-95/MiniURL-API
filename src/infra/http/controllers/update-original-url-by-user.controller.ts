import { Body, Controller, HttpCode, Patch, UsePipes } from '@nestjs/common'

import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UpdateOriginalUrlByUserUseCase } from '@/domain/url/application/use-cases/update-origin-url-by-user'
import { ViewUrlMapper } from '../mappers/view-url-mapper'
import { ZodValidationPipe } from '../pipes/zod-validation.-pipe'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

const updateOriginalUrlBody = z.object({
  originalUrl: z.string().url(),
  urlId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(updateOriginalUrlBody)

type UpdateOriginalUrlBody = z.infer<typeof updateOriginalUrlBody>

@ApiTags('Users')
@Controller('users/url')
export class UpdateOriginalUrlByUserController {
  constructor(
    private updateOriginalUrlByUser: UpdateOriginalUrlByUserUseCase,
  ) {}

  @Patch()
  @HttpCode(201)
  @UsePipes()
  @ApiOperation({
    summary: 'Atualizar uma URL original do usuário',
    description:
      'tualiza os dados de uma URL encurtada do usuário, a URL original.',
  })
  @ApiBearerAuth('access-token')
  async handle(
    @Body(bodyValidationPipe) body: UpdateOriginalUrlBody,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const { originalUrl, urlId } = body

    const updateUser = await this.updateOriginalUrlByUser.execute({
      originalUrl,
      urlId,
      userId: currentUser.sub,
    })

    return ViewUrlMapper.toUnicUrlView(updateUser)
  }
}
