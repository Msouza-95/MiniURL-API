import { Entity } from "src/core/entities/entity"


interface IUserProps { 
   id: string 
   name: string 
   email: string  
   password: string

}


export class User extends Entity<IUserProps> { 
  
  get email() { 
     return this.email
  }

  set email(email:string) {
    this.email = email
  }

  get password() { 
    return this.password
  }

  set password(password:string) {
    this.password = password
  }

  get name () { 
    return this.name 
  }

  set name (name:string) { 
    this.name = name ; 
  }

}