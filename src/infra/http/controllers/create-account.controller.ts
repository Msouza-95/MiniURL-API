import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.-pipe'
import { ViewUserMapper } from '../mappers/view-user-mapper'
import { Public } from '@/infra/auth/public'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateAccountDTO } from './dtos/create-account-dto'

const createAccountBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

type CreateAccountBody = z.infer<typeof createAccountBody>

@ApiTags('Users')
@Public()
@Controller('users/accounts')
export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBody))
  @ApiOperation({
    summary: 'Criar uma nova conta de usuário.',
    description:
      'Registra um novo usuário no sistema criando uma conta com as credenciais fornecidas.',
  })
  @ApiBody({ type: CreateAccountDTO })
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body

    const newUser = await this.createAccountUseCase.execute({
      name,
      email,
      password,
    })

    return ViewUserMapper.toView(newUser)
  }
}
