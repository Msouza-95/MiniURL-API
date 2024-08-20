import { InMemoryUrlRepository } from '@/test/repositories/in-memory-url-repository'
import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateMiniUrlUseCase } from '../create-mini-url'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { AccessMiniUrlUseCase } from '../access-mini-url'
import { InMemoryClickRepository } from '@/test/repositories/in-memory-click-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUrlRepository: InMemoryUrlRepository
let inMemoryClickRepository: InMemoryClickRepository

let sub: CreateAccountUseCase
let createMiniUrl: CreateMiniUrlUseCase
let accessMiniUrl: AccessMiniUrlUseCase

describe('Access a URL ', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUrlRepository = new InMemoryUrlRepository()
    inMemoryClickRepository = new InMemoryClickRepository()
    sub = new CreateAccountUseCase(inMemoryUserRepository)
    createMiniUrl = new CreateMiniUrlUseCase(
      inMemoryUserRepository,
      inMemoryUrlRepository,
    )

    accessMiniUrl = new AccessMiniUrlUseCase(
      inMemoryUserRepository,
      inMemoryUrlRepository,
      inMemoryClickRepository,
    )
  })

  it('Should be able to access a URL with an authenticated user.', async () => {
    const newUser = {
      name: 'Matheus',
      email: 'teste@gmail.com',
      password: '12345678',
    }
    const user = await sub.execute(newUser)

    const url = 'https://www.google.com/'
    const miniUrl = await createMiniUrl.execute({
      url,
      userId: user.id.toString(),
    })

    const result = await accessMiniUrl.execute({
      userId: user.id.toString(),
      miniUrl: miniUrl.shortUrl!,
    })

    expect(result.originUrl).toEqual(url)
    // expect(result.urls[0].originalUrl).toEqual(url)
  })
})
