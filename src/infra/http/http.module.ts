import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { CreateMiniUrlUseCase } from '@/domain/url/application/use-cases/create-mini-url'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateMiniUrlController } from './controllers/create-mini-url.controller'
import { AuthController } from './controllers/auth.controller'
import { AuthenticateUseCase } from '@/domain/user/application/use-cases/authenticate-user'
import { EnvService } from '../env/env.service'
import { ListUrlByUserController } from './controllers/list-url-by-user.controller'
import { ListUrlByUserUseCase } from '@/domain/url/application/use-cases/list-url-by-user'
import { DeleteUrlByUserUseCase } from '@/domain/url/application/use-cases/delete-url-by-user'
import { DeleteUrlByUserController } from './controllers/delete-url-by-user.controller'
import { UpdateOriginalUrlByUserUseCase } from '@/domain/url/application/use-cases/update-origin-url-by-user'
import { UpdateOriginalUrlByUserController } from './controllers/update-original-url-by-user.controller'
import { AccessMiniUrlController } from './controllers/access-mini-url.controller'
import { AccessMiniUrlUseCase } from '@/domain/url/application/use-cases/access-mini-url'
import { ListUrlWithoutUserController } from './controllers/list-url-wthout-user.controller'
import { ListUrlWithoutUserUseCase } from '@/domain/url/application/use-cases/list-url-without-user'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    CreateMiniUrlController,
    AuthController,
    ListUrlByUserController,
    DeleteUrlByUserController,
    UpdateOriginalUrlByUserController,
    AccessMiniUrlController,
    ListUrlWithoutUserController,
  ],
  providers: [
    CreateAccountUseCase,
    CreateMiniUrlUseCase,
    AuthenticateUseCase,
    EnvService,
    ListUrlByUserUseCase,
    DeleteUrlByUserUseCase,
    UpdateOriginalUrlByUserUseCase,
    AccessMiniUrlUseCase,
    ListUrlWithoutUserUseCase,
  ],
})
export class HttpModule {}
