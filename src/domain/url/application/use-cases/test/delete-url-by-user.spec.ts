import { InMemoryUrlRepository } from '@/test/repositories/in-memory-url-repository'
import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'
import { DeleteUrlByUserUseCase } from '../delete-url-by-user'
import { Url } from '@/domain/url/enterprise/entities/url'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUrlRepository: InMemoryUrlRepository

let deleteUrlByUserUseCase: DeleteUrlByUserUseCase
let sub: CreateAccountUseCase

describe('Should be able to delete URL by user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUrlRepository = new InMemoryUrlRepository()
    sub = new CreateAccountUseCase(inMemoryUserRepository)

    deleteUrlByUserUseCase = new DeleteUrlByUserUseCase(
      inMemoryUserRepository,
      inMemoryUrlRepository,
    )
  })

  it('Should be able to delete URL by user', async () => {
    const url = 'https://www.google.com/'

    const user = await sub.execute({
      name: 'matheus',
      email: 'teste@gmail.com',
      password: '12123',
    })

    inMemoryUrlRepository.create(
      new Url(
        {
          originalUrl: url,
          clickCount: 0,
          createdAt: new Date(),
          userId: new UniqueEntityID(user.id.toString()),
        },
        new UniqueEntityID('url_id-1'),
      ),
    )

    await deleteUrlByUserUseCase.execute({
      userId: user.id.toString(),
      urlId: 'url_id-1',
    })

    console.log(inMemoryUrlRepository.urls[0])

    expect(inMemoryUrlRepository.urls).toHaveLength(0)
  })
})
