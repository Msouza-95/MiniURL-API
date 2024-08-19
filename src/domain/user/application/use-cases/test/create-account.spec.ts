import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateAccountUseCase } from '../create-account'

let inMemoryUserRepository: InMemoryUserRepository

let sut: CreateAccountUseCase
describe('Create account user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new CreateAccountUseCase(inMemoryUserRepository)
  })

  it('should be able to create a new account of a user', async () => {
    const newUser = {
      name: 'Matheus',
      email: 'teste@gmail.com',
      password: '12345',
    }
    const result = await sut.execute(newUser)

    expect(result).toMatchObject({
      name: 'Matheus',
      email: 'teste@gmail.com',
    })
    expect(result.id).toBeDefined() // Verific
  })

  it('should not allow creation of user with duplicate email', async () => {
    const newUser = {
      name: 'Matheus',
      email: 'teste@gmail.com',
      password: '12345678',
    }
    await sut.execute(newUser)

    await expect(sut.execute(newUser)).rejects.toThrow(
      'User with same e-mail address already exists',
    )
  })
})
