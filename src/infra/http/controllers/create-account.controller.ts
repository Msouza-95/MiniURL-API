import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ViewUserMapper } from '../mappers/view-user-mapper'

interface IRequest {
  name: string
  email: string
  password: string
}

@Controller('users/accounts')
export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: IRequest) {
    const { name, email, password } = body

    const newUser = await this.createAccountUseCase.execute({
      name,
      email,
      password,
    })

    return ViewUserMapper.toView(newUser)
  }
}
