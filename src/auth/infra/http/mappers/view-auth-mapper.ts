import { User } from '@/domain/user/enterprise/entities/user'

export class ViewAuthMapper {
  static toView(user: User, token: string) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      accessToken: token,
    }
  }
}
