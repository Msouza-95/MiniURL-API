import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { UrlRepository } from '@/domain/url/application/repositories/url-repository'
import { PrismaUrlRepository } from './prisma/repositories/prisma-url-repository'

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: UrlRepository, useClass: PrismaUrlRepository },
  ],

  exports: [PrismaService, UserRepository, UrlRepository],
})
export class DatabaseModule {}
