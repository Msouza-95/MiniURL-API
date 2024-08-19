import { config } from 'dotenv'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

const userPayload = z.object({
  sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof userPayload>

config()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const publicKey = process.env.JWT_PUBLIC_KEY
    if (!publicKey) {
      throw new Error('JWT_PUBLIC_KEY must be defined')
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: UserPayload) {
    return userPayload.parse(payload)
  }
}
