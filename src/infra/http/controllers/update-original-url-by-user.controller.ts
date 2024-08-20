import { Body, Controller, HttpCode, Patch, UsePipes } from '@nestjs/common'

import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UpdateOriginalUrlByUserUseCase } from '@/domain/url/application/use-cases/update-origin-url-by-user'
import { ViewUrlMapper } from '../mappers/view-url-mapper'
import { ZodValidationPipe } from '../pipes/zod-validation.-pipe'

const updateOriginalUrlBody = z.object({
  originalUrl: z.string().url(),
  urlId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(updateOriginalUrlBody)

type UpdateOriginalUrlBody = z.infer<typeof updateOriginalUrlBody>

@Controller('users/url')
export class UpdateOriginalUrlByUserController {
  constructor(
    private updateOriginalUrlByUser: UpdateOriginalUrlByUserUseCase,
  ) {}

  @Patch()
  @HttpCode(201)
  @UsePipes()
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
