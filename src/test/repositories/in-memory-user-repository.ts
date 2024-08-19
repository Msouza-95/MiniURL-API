import { ICreateAccountUserDto } from '@/domain/user/application/dto/create-account-user'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { User } from '@/domain/user/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async create(user: ICreateAccountUserDto): Promise<User> {
    const { name, email, password } = user
    const newUser = User.create({ name, email, password })

    this.users.push(newUser)

    return newUser
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email.toString() === email)

    if (!user) {
      return null
    }

    return user
  }
}
