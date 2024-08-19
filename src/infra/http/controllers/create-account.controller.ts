import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ViewUserMapper } from '../mappers/view-user-mapper'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.-pipe'

const createAccountBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

type CreateAccountBody = z.infer<typeof createAccountBody>

@Controller('users/accounts')
export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBody))
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
