import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { PreconditionFailedException } from '@nestjs/common'
import { Entity } from 'src/core/entities/entity'
import { randomBytes } from 'crypto'

interface IUrlProps {
  originalUrl: string
  miniUrl?: string
  clickCount: number
  userId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class Url extends Entity<IUrlProps> {
  get clickCount(): number {
    return this.props.clickCount
  }

  set clickCount(n: number) {
    this.props.clickCount = n
  }

  get miniUrl(): string | undefined {
    return this.props.miniUrl
  }

  set miniUrl(mini: string) {
    if (mini.length > 6) {
      throw new PreconditionFailedException(
        'the mini url must be less than 6 characters',
      )
    }

    this.props.miniUrl = 'http://localhost/' + mini
  }

  get originalUrl() {
    return this.props.originalUrl
  }

  set originalUrl(originalUrl: string) {
    if (originalUrl !== this.originalUrl) {
      this.props.originalUrl = originalUrl
      this.touch()
    }
  }

  get createdAt() {
    return this.props.createdAt
  }

  get userId(): UniqueEntityID | undefined {
    return this.props.userId
  }

  set userId(id: UniqueEntityID) {
    this.props.userId = id
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt(): Date | undefined | null {
    return this.props.deletedAt
  }

  set deletedAt(data: Date) {
    this.props.deletedAt = data
  }

  logicalDelete() {
    this.props.deletedAt = new Date()

    this.touch()
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
    let newMiniUrl: string = ''
    for (let i = 0; i < length; i++) {
      newMiniUrl += chars[bytes[i] % chars.length]
    }

    this.miniUrl = newMiniUrl
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
        createdAt: props.createdAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
      },
      id,
    )

    return url
  }
}
