import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityID
  protected createdAt: Date
  protected updatedAt?: Date
  protected props: Props

  get id() {
    return this._id
  }

  protected touch() {
    this.updatedAt = new Date()
  }

  constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this.createdAt = new Date()
    this._id = id ?? new UniqueEntityID()
  }
}
