import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { UrlRepository } from '@/domain/url/application/repositories/url-repository'
import { PrismaUrlRepository } from './prisma/repositories/prisma-url-repository'
import { ClickRepository } from '@/domain/url/application/repositories/click-repository'
import { PrismaClickRepository } from './prisma/repositories/prisma-click-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: UrlRepository,
      useClass: PrismaUrlRepository,
    },
    {
      provide: ClickRepository,
      useClass: PrismaClickRepository,
    },
  ],

  exports: [PrismaService, UserRepository, UrlRepository, ClickRepository],
})
export class DatabaseModule {}
