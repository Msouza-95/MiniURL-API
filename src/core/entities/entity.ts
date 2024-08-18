import { UniqueEntityID } from "./unique-entity-id"


export class Entity<Props>{
  private  _id: UniqueEntityID
  protected createdAt: Date 
  protected updatedAt?: Date 
  protected props: any 

  get id() {
    return this._id
  }

  protected touch(){
    this.props.updatedAt = new Date()
  }

  constructor(props:any, id?:UniqueEntityID ) {
    
    this.props = props
    this.createdAt = new Date()
    this._id = id ?? new UniqueEntityID()
  }
}