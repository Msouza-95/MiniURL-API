import { Url } from '@/domain/url/enterprise/entities/url'
import { User } from '@/domain/user/enterprise/entities/user'

export class ViewUrlMapper {
  static toUrlView(url: Url, user?: User) {
    return {
      id: url.id.toString(),
      click_total: url.clickCount,
      created_at: url.createdAt,
      updated_at: url.updatedAt,
      mini_url: url.miniUrl,
      orignal_url: url.originalUrl,
      user,
    }
  }

  static toMiniUrlView(url?: string, user?: User) {
    return {
      mini_url: url,
      user,
    }
  }
}
