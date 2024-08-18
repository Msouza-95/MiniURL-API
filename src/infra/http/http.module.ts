import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccountController],
  providers: [CreateAccountUseCase],
})
export class HttpModule {}
