import {
  Controller,
  Get,
  HttpCode,
  Query,
  Redirect,
  UsePipes,
} from '@nestjs/common'

import { Public } from '@/infra/auth/public'
import { AccessMiniUrlUseCase } from '@/domain/url/application/use-cases/access-mini-url'

@Public()
@Controller('url/access')
export class AccessMiniUrlController {
  constructor(private accessMiniUrlUseCase: AccessMiniUrlUseCase) {}

  @Get()
  @HttpCode(200)
  @UsePipes()
  @Redirect()
  async handle(@Query('url') url: string) {
    const { originUrl } = await this.accessMiniUrlUseCase.execute({
      miniUrl: url,
    })

    return { url: originUrl }
  }
}
