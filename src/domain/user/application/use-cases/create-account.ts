import { ConflictException, Injectable } from '@nestjs/common'
import { User } from '../../enterprise/entities/user'

import { hash } from 'bcryptjs'
import { UserRepository } from '../repositories/user-repository'

interface ICreateAccountRequest {
  name: string
  email: string
  password: string
}

@Injectable()
export class CreateAccountUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateAccountRequest): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email)

    if (emailExists) {
      throw new ConflictException(
        'User with same e-mail address already exists',
      )
    }

    const hashPassword = await hash(password, 8)

    const user = User.create({
      name,
      email,
      password: hashPassword,
    })

    const newUser = await this.userRepository.create(user)

    return newUser
  }
}
