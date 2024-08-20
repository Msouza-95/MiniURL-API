import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Entity } from 'src/core/entities/entity'

interface IClickProps {
  urlId?: UniqueEntityID
  userId?: UniqueEntityID
  createdAt: Date
}

export class Click extends Entity<IClickProps> {
  get urlId() {
    return this.props.urlId
  }

  get userId() {
    return this.props.userId
  }

  get clickedAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<IClickProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const click = new Click(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return click
  }
}
