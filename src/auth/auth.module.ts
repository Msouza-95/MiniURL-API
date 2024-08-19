import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { JwtStrategy } from './jwt.strategy'
import { DatabaseModule } from '@/infra/database/database.module'
import { AuthController } from './infra/http/controllers/auth.controller'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { AuthenticateUseCase } from '@/domain/user/application/use-cases/authenticate-user'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository'

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      // inject: [ConfigService],
      global: true,
      useFactory: async () => {
        const privateKey = process.env.JWT_PRIVATE_KEY!
        const publicKey = process.env.JWT_PUBLIC_KEY!

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  controllers: [AuthController],

  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    AuthenticateUseCase,
    JwtStrategy,
  ],
})
export class AuthModule {}
