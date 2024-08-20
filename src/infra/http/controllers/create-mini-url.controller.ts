import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { z } from 'zod'
import { CreateMiniUrlUseCase } from '@/domain/url/application/use-cases/create-mini-url'
import { ViewUrlMapper } from '../mappers/view-url-mapper'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '../pipes/zod-validation.-pipe'
import * as jwt from 'jsonwebtoken'
import { EnvService } from '@/infra/env/env.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateMiniUrlDTO } from './dtos/create-mini-url-dto'
const createMiniUrlBody = z.object({
  url: z.string().url(),
})

const bodyValidationPipe = new ZodValidationPipe(createMiniUrlBody)

type CreateMiniUrlBody = z.infer<typeof createMiniUrlBody>

@ApiTags('URLs')
@Public()
@Controller('url/short')
export class CreateMiniUrlController {
  constructor(
    private createMiniUrlUseCase: CreateMiniUrlUseCase,
    private config: EnvService,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary:
      'Criar uma URL encurtada, tantos os user autenticados quantos os sem',
    description:
      'Recebe uma URL longa e retorna uma versão encurtada que pode ser usada para redirecionamento.',
  })
  @ApiBody({ type: CreateMiniUrlDTO })
  @ApiBearerAuth('access-token')
  async handle(
    @Body(bodyValidationPipe) body: CreateMiniUrlBody,
    @Req() request: Request,
  ) {
    const { url } = body
    const { authorization } = request.headers

    if (authorization) {
      const parts = authorization.split(' ')
      const token = parts[1]

      const decoded = jwt.verify(
        token,
        Buffer.from(this.config.get('JWT_PUBLIC_KEY'), 'base64'),
        {
          algorithms: ['RS256'],
        },
      )
      const userId = decoded.sub

      const { shortUrl, user } = await this.createMiniUrlUseCase.execute({
        url,
        userId: String(userId),
      })

      return ViewUrlMapper.toMiniUrlView(shortUrl, user)
    }

    const { shortUrl, user } = await this.createMiniUrlUseCase.execute({
      url,
    })

    return ViewUrlMapper.toMiniUrlView(shortUrl, user)
  }
}
