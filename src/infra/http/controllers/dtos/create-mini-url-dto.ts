import { ApiProperty } from '@nestjs/swagger'

export class CreateMiniUrlDTO {
  @ApiProperty({ example: 'https://www.google.com/' })
  url: string

  constructor(url: string) {
    this.url = url
  }
}
