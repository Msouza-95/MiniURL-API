import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { CreateMiniUrlUseCase } from '@/domain/url/application/use-cases/create-mini-url'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateMiniUrlController } from './controllers/create-mini-url.controller'
import { AuthController } from './controllers/auth.controller'
import { AuthenticateUseCase } from '@/domain/user/application/use-cases/authenticate-user'
import { EnvService } from '../env/env.service'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    CreateMiniUrlController,
    AuthController,
  ],
  providers: [
    CreateAccountUseCase,
    CreateMiniUrlUseCase,
    AuthenticateUseCase,
    EnvService,
  ],
})
export class HttpModule {}
