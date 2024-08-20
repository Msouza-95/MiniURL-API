import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountDTO {
  @ApiProperty({ example: 'John Doe' })
  name: string

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string

  @ApiProperty({ example: 'password123' })
  password: string

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }
}
