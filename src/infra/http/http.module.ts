import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { CreateAccountController } from './controllers/user/create-account.controller'
import { CreateMiniUrlController } from './controllers/url/create-mini-url-controller'
import { CreateMiniUrlUseCase } from '@/domain/url/application/use-cases/create-mini-url'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccountController, CreateMiniUrlController],
  providers: [CreateAccountUseCase, CreateMiniUrlUseCase],
})
export class HttpModule {}
