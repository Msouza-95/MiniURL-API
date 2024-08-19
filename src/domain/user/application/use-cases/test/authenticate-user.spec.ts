import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateAccountUseCase } from '../create-account'
import { AuthenticateUseCase } from '../authenticate-user'
import { JwtService } from '@nestjs/jwt'

let inMemoryUserRepository: InMemoryUserRepository
let jwt: JwtService

let auth: AuthenticateUseCase
let user: CreateAccountUseCase

describe('Create a authenticate of a user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    jwt = new JwtService({
      secret: 'test-secret', // Chave secreta para testes
      signOptions: { expiresIn: '1h' },
    })
    user = new CreateAccountUseCase(inMemoryUserRepository)
    auth = new AuthenticateUseCase(inMemoryUserRepository, jwt)
  })

  it('should be able to create a  authenticate', async () => {
    const newUser = {
      name: 'Matheus',
      email: 'teste@gmail.com',
      password: '12345678',
    }
    await user.execute(newUser)

    const createAuth = await auth.execute({
      email: 'teste@gmail.com',
      password: '12345678',
    })

    expect(createAuth).toHaveProperty('accessToken')
  })

  it('should not authenticate with incorrect password', async () => {
    const newUser = {
      name: 'Matheus',
      email: 'teste@gmail.com',
      password: '12345678',
    }
    await user.execute(newUser)

    await expect(
      auth.execute({
        email: 'teste@gmail.com',
        password: '12359',
      }),
    ).rejects.toThrow('User credentials do not match')
  })

  it('should not authenticate with incorrect email', async () => {
    const newUser = {
      name: 'Matheus',
      email: 'teste@gmail.com',
      password: '12345678',
    }
    await user.execute(newUser)

    await expect(
      auth.execute({
        email: 'mat@gmail.com',
        password: '12345678',
      }),
    ).rejects.toThrow('User credentials do not match')
  })
})
