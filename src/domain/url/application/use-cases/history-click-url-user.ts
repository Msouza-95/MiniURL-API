import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { ClickRepository } from '../repositories/click-repository'

interface IHistoryClickUrlUseRequest {
  userId: string
}

@Injectable()
export class HistoryClickUrlUseUseCase {
  constructor(
    private userRepository: UserRepository,
    private clickRepository: ClickRepository,
  ) {}

  async execute({ userId }: IHistoryClickUrlUseRequest): Promise<unknown> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('User id not Found')
    }

    const result = await this.clickRepository.historyClicks(user.id.toString())

    return result
  }
}
