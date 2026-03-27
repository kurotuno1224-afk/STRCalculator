/** Site-level constants. Never import external API URLs from here in components. */

export const SITE = {
  name: 'HSR Wiki',
  description: '星穹铁道资料站 — 角色、技能、遗器',
  url: 'https://hsr-wiki.vercel.app',
} as const

export const NAV_LINKS = [
  { label: '角色', href: '/characters' },
  // Phase 扩展：遗器、光锥、攻略
] as const

/** 每页展示角色数量 */
export const CHARACTERS_PER_PAGE = 48

/** 支持的语言 */
export const SUPPORTED_LOCALES = ['zh-CN', 'en'] as const
