import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation.-pipe'
import { CreateMiniUrlUseCase } from '@/domain/url/application/use-cases/create-mini-url'
import { ViewUrlMapper } from '../../mappers/view-url-mapper'

const createMiniUrlBody = z.object({
  url: z.string().url(),
})

type CreateMiniUrlBody = z.infer<typeof createMiniUrlBody>

@Controller('url/short')
export class CreateMiniUrlController {
  constructor(private createMiniUrlUseCase: CreateMiniUrlUseCase) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(createMiniUrlBody))
  async handle(@Body() body: CreateMiniUrlBody) {
    const { url } = body

    const { shortUrl, user } = await this.createMiniUrlUseCase.execute({ url })

    return ViewUrlMapper.toMiniUrlView(shortUrl, user)
  }
}
