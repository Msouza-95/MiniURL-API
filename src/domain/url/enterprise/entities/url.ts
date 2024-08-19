import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { PreconditionFailedException } from '@nestjs/common'
import { Entity } from 'src/core/entities/entity'
import { randomBytes } from 'crypto'

interface IUrlProps {
  originalUrl: string
  miniUrl: string
  clickCount: number
  userId: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class Url extends Entity<IUrlProps> {
  get clickCount() {
    return this.props.clickCount
  }

  get miniUrl() {
    return this.props.miniUrl
  }

  set miniUrl(mini: string) {
    if (mini.length > 6) {
      throw new PreconditionFailedException(
        'the mini url must be less than 6 characters',
      )
    }

    this.props.miniUrl = 'http://localhost/' + mini
    this.touch()
  }

  get originalUrl() {
    return this.props.originalUrl
  }

  set originalUrl(originalUr: string) {
    if (originalUr !== this.originalUrl) {
      this.props.originalUrl = originalUr
      this.touch()
    }
  }

  get createdAt() {
    return this.props.createdAt
  }

  get userId() {
    return this.props.userId
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt() {
    return this.props.deletedAt
  }

  private logicalDelete() {
    this.props.deletedAt = new Date()
  }

  createShortUrl() {
    const upper = 'A'
      .repeat(26)
      .replace(/A/g, (_, i) => String.fromCharCode(65 + i)) // cria letras de A -Z

    const lower = 'a'
      .repeat(26)
      .replace(/a/g, (_, i) => String.fromCharCode(97 + i)) // cria letras de a -

    const numbers = '0'
      .repeat(10)
      .replace(/0/g, (_, i) => String.fromCharCode(48 + i))

    const chars = `${upper}${lower}${numbers}` // gera um unico caracter

    const length = Math.floor(Math.random() * 3) + 4 // gerar numero aléatorio entre 4 e 6

    const bytes = randomBytes(length)

    for (let i = 0; i < length; i++) {
      this.miniUrl += chars[bytes[i] % chars.length]
    }
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<IUrlProps, 'createdAt' | 'deletedAt'>,
    id?: UniqueEntityID,
  ) {
    const url = new Url(
      {
        ...props,
        clickCount: 0,
        createdAt: props.createdAt ?? new Date(),
        deletedAt: props.deletedAt ?? new Date(),
      },
      id,
    )

    return url
  }
}
