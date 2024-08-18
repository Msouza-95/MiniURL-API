import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Entity } from 'src/core/entities/entity'

interface IUserProps {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<IUserProps> {
  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<IUserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return user
  }
}
