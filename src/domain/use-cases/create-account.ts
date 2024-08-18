import { User } from "../entities/user"

interface ICreateAccountRequest { 
  
   name: string 
   email: string  
   password: string
 
}


export class CreateAccountUseCase {
  execute({name, email, password }: ICreateAccountRequest) {

    const user = new User({
      name,
      email,
      password
    })

    return user ;
  }
}