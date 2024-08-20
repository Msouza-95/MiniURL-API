import { InMemoryUrlRepository } from '@/test/repositories/in-memory-url-repository'
import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateMiniUrlUseCase } from '../create-mini-url'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { ListUrlByUserUseCase } from '../list-url-by-user'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUrlRepository: InMemoryUrlRepository

let sub: CreateAccountUseCase
let createMiniUrl: CreateMiniUrlUseCase
let listUrlByUser: ListUrlByUserUseCase

describe('list url by user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUrlRepository = new InMemoryUrlRepository()
    sub = new CreateAccountUseCase(inMemoryUserRepository)
    createMiniUrl = new CreateMiniUrlUseCase(
      inMemoryUserRepository,
      inMemoryUrlRepository,
    )
    listUrlByUser = new ListUrlByUserUseCase(
      inMemoryUserRepository,
      inMemoryUrlRepository,
    )
  })

  it('Should be able to list url by user', async () => {
    const newUser = {
      name: 'Matheus',
      email: 'teste@gmail.com',
      password: '12345',
    }
    const user = await sub.execute(newUser)

    const url = 'https://www.google.com/'
    await createMiniUrl.execute({
      url,
      userId: user.id.toString(),
    })

    const result = await listUrlByUser.execute({
      userId: user.id.toString(),
    })

    expect(result.urls[0].userId).toEqual(user.id)
    expect(result.urls[0].originalUrl).toEqual(url)
  })
})
