/**
 * HSR API Service
 *
 * 架构硬约束（严禁破坏）：
 * 1. 整个项目中，外部 URL 字符串只允许出现在本文件
 * 2. 本文件只负责数据请求，不做任何业务逻辑或字段映射
 * 3. 组件和页面禁止直接 import 本文件 — 必须通过 features/ 层调用
 * 4. 切换自建后端时，只需修改 BASE_URL 和 fetch 函数，adapter 层零改动
 *
 * 数据源：Mar-7th/StarRailRes (GitHub)
 * 替换后端：修改 BASE_URL 常量，并按需调整 fetch 函数签名
 */

// ─── Base URLs ───────────────────────────────────────────────────────────
// 唯一允许写外部 URL 的位置
const BASE_RAW = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master'
const BASE_INDEX = `${BASE_RAW}/index_new/cn`

/**
 * 图片资源基础 URL — 供 adapter 层构建完整图片地址
 * adapter 不可自行拼写此 URL，必须 import 此常量
 */
export const IMG_BASE_URL = BASE_RAW

// ─── Raw API Types ────────────────────────────────────────────────────────
// 原始 API 字段结构。这些类型只在 services/ 和 adapters/ 中使用，
// 禁止在 components/ 和 app/ 中直接消费。

export interface RawCharacter {
  id: string
  name: string
  tag: string
  rarity: number
  path: string
  element: string
  max_sp: number | null
  ranks: string[]
  skills: string[]
  skill_trees: string[]
  icon: string
  preview: string
  portrait: string
}

export interface RawSkill {
  id: string
  name: string
  max_level: number
  element: string
  type: string
  type_text: string
  effect: string
  effect_text: string
  simple_desc: string
  desc: string
  params: number[][]
  icon: string
}

export interface RawEidolon {
  id: string
  name: string
  rank: number
  desc: string
  materials: Array<{ id: string; num: number }>
  level_up_skills: Array<{ id: string; num: number }>
  icon: string
}

export interface RawSkillTreeNode {
  id: string
  name: string
  max_level: number
  desc: string
  params: number[]
  anchor: string
  pre_points: string[]
  level_up_skills: Array<{ id: string; num: number }>
  icon: string
  levels: Array<{
    promotion: number
    level: number
    properties: Array<{ type: string; value: number }>
    materials: Array<{ id: string; num: number }>
  }>
}

export interface RawPromotion {
  id: string
  values: Array<{
    hp: { base: number; step: number }
    atk: { base: number; step: number }
    def: { base: number; step: number }
    spd: { base: number; step: number }
    taunt: { base: number; step: number }
    crit_rate: { base: number; step: number }
    crit_dmg: { base: number; step: number }
  }>
  materials: Array<Array<{ id: string; num: number }>>
}

export interface RawItem {
  id: string
  name: string
  type: string
  sub_type: string
  rarity: number
  icon: string
  come_from: string[]
}

/** 聚合的角色完整原始数据 — 供 adapter 统一转换 */
export interface RawCharacterDetail {
  character: RawCharacter
  skills: RawSkill[]
  eidolons: RawEidolon[]
  traces: RawSkillTreeNode[]
  /** 各突破阶段材料，index 对应阶段 0-6 */
  ascensionMaterials: Array<Array<{ id: string; num: number }>>
  /** 所有物品数据，用于 adapter 查名字和图标 */
  items: Record<string, RawItem>
}

// ─── Internal fetch helper ────────────────────────────────────────────────

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    // Next.js fetch 扩展：ISR 缓存，1 小时复用，避免重复请求同一 JSON
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    throw new Error(
      `[hsr-api] fetch failed: ${res.status} ${res.statusText}\nURL: ${url}`
    )
  }
  return res.json() as Promise<T>
}

// ─── Cached data loaders（各 JSON 文件各自缓存）──────────────────────────

function loadCharacters(): Promise<Record<string, RawCharacter>> {
  return fetchJson(`${BASE_INDEX}/characters.json`)
}

function loadSkills(): Promise<Record<string, RawSkill>> {
  return fetchJson(`${BASE_INDEX}/character_skills.json`)
}

function loadEidolons(): Promise<Record<string, RawEidolon>> {
  return fetchJson(`${BASE_INDEX}/character_ranks.json`)
}

function loadSkillTrees(): Promise<Record<string, RawSkillTreeNode>> {
  return fetchJson(`${BASE_INDEX}/character_skill_trees.json`)
}

function loadPromotions(): Promise<Record<string, RawPromotion>> {
  return fetchJson(`${BASE_INDEX}/character_promotions.json`)
}

function loadItems(): Promise<Record<string, RawItem>> {
  return fetchJson(`${BASE_INDEX}/items.json`)
}

// ─── Public API ───────────────────────────────────────────────────────────

/**
 * 获取所有角色原始列表
 *
 * 返回原始数据，必须经过 character-adapter.toCharacterListItem() 转换后才能进入组件
 */
export async function fetchCharacterList(): Promise<RawCharacter[]> {
  const data = await loadCharacters()
  // 过滤掉 NPC 和测试角色（id 以 8xxx 开头）
  return Object.values(data).filter((c) => !c.id.startsWith('8'))
}

/**
 * 获取单个角色的完整原始数据（并发请求多个 JSON，Next.js fetch 自动去重缓存）
 *
 * 返回 null 表示角色 ID 不存在
 * 返回原始数据，必须经过 character-adapter.toCharacterDetail() 转换后才能进入组件
 */
export async function fetchCharacterDetail(
  id: string
): Promise<RawCharacterDetail | null> {
  const [allChars, allSkills, allEidolons, allTrees, allPromotions, allItems] =
    await Promise.all([
      loadCharacters(),
      loadSkills(),
      loadEidolons(),
      loadSkillTrees(),
      loadPromotions(),
      loadItems(),
    ])

  const character = allChars[id]
  if (!character) return null

  const promotion = allPromotions[id]

  return {
    character,
    skills: character.skills
      .map((sid) => allSkills[sid])
      .filter((s): s is RawSkill => Boolean(s)),
    eidolons: character.ranks
      .map((rid) => allEidolons[rid])
      .filter((e): e is RawEidolon => Boolean(e)),
    traces: character.skill_trees
      .map((tid) => allTrees[tid])
      .filter((t): t is RawSkillTreeNode => Boolean(t)),
    ascensionMaterials: promotion?.materials ?? [],
    items: allItems,
  }
}
