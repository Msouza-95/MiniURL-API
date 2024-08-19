import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Entity } from 'src/core/entities/entity'

interface IClickProps {
  urlId: UniqueEntityID
  clickedAt: Date
}

export class Click extends Entity<IClickProps> {
  get urlId() {
    return this.props.urlId
  }

  get clickedAt() {
    return this.props.clickedAt
  }

  static create(
    props: Optional<IClickProps, 'clickedAt'>,
    id?: UniqueEntityID,
  ) {
    const click = new Click(
      {
        ...props,
        clickedAt: props.clickedAt ?? new Date(),
      },
      id,
    )

    return click
  }
}
