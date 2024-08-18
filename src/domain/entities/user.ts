import { Entity } from "src/core/entities/entity"


interface IUserProps { 
   name: string 
   email: string  
   password: string
}


export class User extends Entity<IUserProps> { 
  
  get email() { 
     return this.props.email
  }

  get password() { 
    return this.props.password
  }

  get name () { 
    return this.props.name 
  }

}