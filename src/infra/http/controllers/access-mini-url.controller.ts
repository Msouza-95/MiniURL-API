import {
  Controller,
  Get,
  HttpCode,
  Query,
  Redirect,
  Req,
  UsePipes,
} from '@nestjs/common'

import { Public } from '@/infra/auth/public'
import { AccessMiniUrlUseCase } from '@/domain/url/application/use-cases/access-mini-url'
import { Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { EnvService } from '@/infra/env/env.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('URLs')
@Public()
@Controller('url/access')
export class AccessMiniUrlController {
  constructor(
    private accessMiniUrlUseCase: AccessMiniUrlUseCase,
    private config: EnvService,
  ) {}

  @Get()
  @HttpCode(200)
  @UsePipes()
  @Redirect()
  @ApiOperation({
    summary:
      'Redirecionar para a URL original. Essa rota deve ser testado pelo Insomnia ou similar, pois na documentação não vai ter o efeito esperado',
    description:
      'Acessa a URL original usando uma URL encurtada, redirecionando o usuário para o destino original, tantos os user autenticados quantos os sem..',
  })
  @ApiBearerAuth('access-token')
  async handle(@Query('url') url: string, @Req() request: Request) {
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

      const { originUrl } = await this.accessMiniUrlUseCase.execute({
        miniUrl: url,
        userId: String(userId),
      })

      return { url: originUrl }
    }

    const { originUrl } = await this.accessMiniUrlUseCase.execute({
      miniUrl: url,
    })

    return { url: originUrl }
  }
}
