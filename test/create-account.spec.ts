import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateAccountUseCase } from '@/domain/user/application/use-cases/create-account'

test('create new accoount', () => {
  const createAccount = new CreateAccountUseCase()

  const user = createAccount.execute({
    name: 'matheus',
    email: 'email@gmail.com',
    password: ' 123456',
  })

  expect(user).toHaveProperty('id')
  expect(typeof user.id).toBe(UniqueEntityID)
})
