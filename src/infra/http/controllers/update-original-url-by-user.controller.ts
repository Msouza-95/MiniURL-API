import { Body, Controller, HttpCode, Patch, UsePipes } from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UpdateOriginalUrlByUserUseCase } from '@/domain/url/application/use-cases/update-origin-url-by-user'
import { ViewUrlMapper } from '../mappers/view-url-mapper'

const updateOriginalUrlBody = z.object({
  originalUrl: z.string().uuid(),
  urlId: z.string().uuid(),
})

type UpdateOriginalUrlBody = z.infer<typeof updateOriginalUrlBody>

@Controller('users/url')
export class UpdateOriginalUrlByUserController {
  constructor(
    private updateOriginalUrlByUser: UpdateOriginalUrlByUserUseCase,
  ) {}

  @Patch()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(updateOriginalUrlBody))
  async handle(
    @Body() body: UpdateOriginalUrlBody,
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
