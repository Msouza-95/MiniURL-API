import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Entity } from 'src/core/entities/entity'

interface IUrlProps {
  originalUrl: string
  miniUrl: string
  clickCount: number
  userId: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class Url extends Entity<IUrlProps> {
  get clickCount() {
    return this.props.clickCount
  }

  get miniUrl() {
    return this.props.miniUrl
  }

  get originalUrl() {
    return this.props.originalUrl
  }

  get createdAt() {
    return this.props.createdAt
  }

  get userId() {
    return this.props.userId
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt() {
    return this.props.deletedAt
  }

  private logicalDelete() {
    this.props.deletedAt = new Date()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<IUrlProps, 'createdAt' | 'deletedAt'>,
    id?: UniqueEntityID,
  ) {
    const url = new Url(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        deletedAt: props.deletedAt ?? new Date(),
      },
      id,
    )

    return url
  }
}
