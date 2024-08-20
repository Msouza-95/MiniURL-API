import { ApiProperty } from '@nestjs/swagger'

export class AuthDTO {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string

  @ApiProperty({ example: 'password123' })
  password: string

  constructor(name: string, email: string, password: string) {
    this.email = email
    this.password = password
  }
}
