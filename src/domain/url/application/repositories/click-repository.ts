import { Click } from '../../enterprise/entities/click'

export abstract class ClickRepository {
  abstract create(click: Click): Promise<Click>
  abstract findById(id: string): Promise<Click | null>
  abstract save(click: Click): Promise<Click>
}
