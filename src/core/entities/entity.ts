import { randomUUID } from "crypto"


export class Entity<Props>{
  private  _id: string 
  protected props: any 

  get id() {
    return this._id
  }

  constructor(props:any, id?:string ) {
    this._id = id ??  randomUUID()
    this.props = props
  }
}