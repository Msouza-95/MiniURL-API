import { z } from 'zod'

import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.-pipe'
import { AuthenticateUseCase } from '@/domain/user/application/use-cases/authenticate-user'
import { ViewAuthMapper } from '../mappers/view-auth-mapper'
import { Public } from '@/infra/auth/public'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthDTO } from './dtos/auth-dto'

const authenticateBody = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBody = z.infer<typeof authenticateBody>

@ApiTags('Users')
@Controller('/users/sessions')
@Public()
export class AuthController {
  constructor(
    private readonly createauthenticateUseCase: AuthenticateUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBody))
  @ApiOperation({
    summary: 'Login de Usúarios',
    description:
      'Autentica o usuário com as credenciais fornecidas e inicia uma sessão, retornando um token de acesso',
  })
  @ApiBody({ type: AuthDTO })
  async handle(@Body() body: AuthenticateBody) {
    const { email, password } = body

    const result = await this.createauthenticateUseCase.execute({
      password,
      email,
    })

    return ViewAuthMapper.toView(result.user, result.accessToken)
  }
}
