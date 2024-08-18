import { User } from '@/domain/user/enterprise/entities/user'

export class ViewUserMapper {
  static toView(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
