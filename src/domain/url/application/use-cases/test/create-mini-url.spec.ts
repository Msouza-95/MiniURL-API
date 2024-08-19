import { InMemoryUrlRepository } from '@/test/repositories/in-memory-url-repository'
import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateMiniUrlUseCase } from '../create-mini-url'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUrlRepository: InMemoryUrlRepository

let sub: CreateAccountUseCase
let createMiniUrl: CreateMiniUrlUseCase

describe('Create new a short url', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUrlRepository = new InMemoryUrlRepository()
    sub = new CreateAccountUseCase(inMemoryUserRepository)
    createMiniUrl = new CreateMiniUrlUseCase(
      inMemoryUserRepository,
      inMemoryUrlRepository,
    )
  })

  it('Should be able to create a short URL without user authentication', async () => {
    const result = await createMiniUrl.execute({
      url: 'https://www.google.com/',
    })

    expect(result).toHaveProperty('shortUrl')
    expect(result.shortUrl?.length).toBeLessThan(24) // a  shortUrl junto com o "http://localhost/, não pode ser maior que 23
  })

  it('Should be able to create a short URL with user authentication', async () => {
    const newUser = {
      name: 'Matheus',
      email: 'teste@gmail.com',
      password: '12345',
    }
    const user = await sub.execute(newUser)

    const result = await createMiniUrl.execute({
      url: 'https://www.google.com/',
      userId: user.id.toString(),
    })

    expect(result).toHaveProperty('user')
    expect(result.shortUrl?.length).toBeLessThan(24)
    expect(result.user?.id).toEqual(user.id)
  })
})
