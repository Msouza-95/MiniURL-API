import { InMemoryUrlRepository } from '@/test/repositories/in-memory-url-repository'
import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { Url } from '@/domain/url/enterprise/entities/url'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UpdateOriginalUrlByUserUseCase } from '../update-origin-url-by-user'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUrlRepository: InMemoryUrlRepository

let updateUrlByUserUseCase: UpdateOriginalUrlByUserUseCase
let sub: CreateAccountUseCase

describe('Should be able to delete URL by user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUrlRepository = new InMemoryUrlRepository()
    sub = new CreateAccountUseCase(inMemoryUserRepository)

    updateUrlByUserUseCase = new UpdateOriginalUrlByUserUseCase(
      inMemoryUserRepository,
      inMemoryUrlRepository,
    )
  })

  it('Should be able to delete URL by userShould be able to update the original URL by the user', async () => {
    const oldUrl = 'https://www.google.com/'
    const newUrl = 'https://www.yarn.com/'

    const user = await sub.execute({
      name: 'matheus',
      email: 'teste@gmail.com',
      password: '12123',
    })

    inMemoryUrlRepository.create(
      new Url(
        {
          originalUrl: oldUrl,
          clickCount: 0,
          createdAt: new Date(),
          userId: new UniqueEntityID(user.id.toString()),
        },
        new UniqueEntityID('url_id-1'),
      ),
    )

    const result = await updateUrlByUserUseCase.execute({
      userId: user.id.toString(),
      urlId: 'url_id-1',
      originalUrl: newUrl,
    })

    expect(result.originalUrl).not.toEqual(oldUrl)
  })
})
