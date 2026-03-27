/**
 * Character Adapter
 *
 * 架构职责：
 * - 接收 services/hsr-api.ts 返回的原始数据
 * - 输出 types/index.ts 定义的统一领域类型
 * - 原始 API 字段名（snake_case、原始 API key）只在本文件内出现
 * - 所有图片 URL 通过 IMG_BASE_URL 构建，不硬编码外部域名
 *
 * 切换后端时：
 * - 若新后端返回字段结构不同 → 只修改本文件的映射逻辑
 * - 若新后端图片地址不同 → 修改 hsr-api.ts 的 IMG_BASE_URL 和本文件的 toImgUrl()
 */

import { IMG_BASE_URL } from '@/services/hsr-api'
import type {
  RawCharacter,
  RawSkill,
  RawEidolon,
  RawSkillTreeNode,
  RawItem,
  RawCharacterDetail,
} from '@/services/hsr-api'
import type {
  CharacterListItem,
  CharacterDetail,
  CharacterElement,
  CharacterPath,
  CharacterRarity,
  Skill,
  SkillType,
  Eidolon,
  TraceNode,
  TraceLevel,
  AscensionPhase,
  MaterialCost,
  StatBonus,
} from '@/types'

// ─── Image URL builder ────────────────────────────────────────────────────

function toImgUrl(relativePath: string): string {
  if (!relativePath) return ''
  // 防止双斜杠
  return `${IMG_BASE_URL}/${relativePath.replace(/^\//, '')}`
}

// ─── Primitive normalizers ────────────────────────────────────────────────

const ELEMENT_MAP: Record<string, CharacterElement> = {
  Fire: 'Fire',
  Ice: 'Ice',
  Wind: 'Wind',
  Thunder: 'Thunder',
  Quantum: 'Quantum',
  Physical: 'Physical',
  Imaginary: 'Imaginary',
}

const PATH_MAP: Record<string, CharacterPath> = {
  Knight: 'Knight',   // 存护
  Rogue: 'Rogue',     // 巡猎
  Mage: 'Mage',       // 智识
  Warrior: 'Warrior', // 毁灭
  Warlock: 'Warlock', // 虚无
  Sprout: 'Sprout',   // 同谐
  Shaman: 'Shaman',   // 丰饶
  Memory: 'Memory',   // 记忆
}

const SKILL_TYPE_VALID = new Set<SkillType>([
  'Normal',
  'BPSkill',
  'Ultra',
  'Talent',
  'Maze',
  'MazeNormal',
])

/** API 属性 type 标识 → 中文展示名 */
const STAT_DISPLAY_MAP: Record<string, string> = {
  HPDelta: 'HP',
  AttackDelta: '攻击力',
  DefenceDelta: '防御力',
  SpeedDelta: '速度',
  CriticalChanceBase: '暴击率',
  CriticalDamageBase: '暴击伤害',
  HPAddedRatio: 'HP%',
  AttackAddedRatio: '攻击力%',
  DefenceAddedRatio: '防御力%',
  BreakDamageAddedRatioBase: '击破特攻',
  HealRatioBase: '治疗量加成',
  StatusProbabilityBase: '效果命中',
  StatusResistanceBase: '效果抵抗',
  SPRatioBase: '能量恢复效率',
}

/** 各突破阶段对应的角色等级上限 */
const ASCENSION_LEVEL_CAPS = [20, 30, 40, 50, 60, 70, 80] as const

function normalizeElement(raw: string): CharacterElement {
  return ELEMENT_MAP[raw] ?? 'Physical'
}

function normalizePath(raw: string): CharacterPath {
  return PATH_MAP[raw] ?? 'Warrior'
}

function normalizeRarity(raw: number): CharacterRarity {
  return raw === 5 ? 5 : 4
}

function normalizeSkillType(raw: string): SkillType {
  return SKILL_TYPE_VALID.has(raw as SkillType) ? (raw as SkillType) : 'Normal'
}

// ─── Material helpers ─────────────────────────────────────────────────────

function toMaterialCost(
  id: string,
  num: number,
  items: Record<string, RawItem>
): MaterialCost {
  const item = items[id]
  return {
    id,
    num,
    name: item?.name ?? id,
    iconUrl: item ? toImgUrl(item.icon) : '',
  }
}

// ─── Sub-entity adapters ──────────────────────────────────────────────────

function toSkill(raw: RawSkill): Skill {
  return {
    id: raw.id,
    name: raw.name,
    type: normalizeSkillType(raw.type),
    typeText: raw.type_text,
    effect: raw.effect,
    effectText: raw.effect_text,
    description: raw.desc,
    simpleDescription: raw.simple_desc,
    maxLevel: raw.max_level,
    iconUrl: toImgUrl(raw.icon),
  }
}

function toEidolon(raw: RawEidolon): Eidolon {
  return {
    id: raw.id,
    name: raw.name,
    rank: Math.min(Math.max(raw.rank, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6,
    description: raw.desc,
    iconUrl: toImgUrl(raw.icon),
  }
}

function toTraceLevel(
  raw: RawSkillTreeNode['levels'][number],
  items: Record<string, RawItem>
): TraceLevel {
  return {
    promotion: raw.promotion,
    characterLevel: raw.level,
    materials: raw.materials.map((m) => toMaterialCost(m.id, m.num, items)),
    statBonuses: raw.properties.map(
      (p): StatBonus => ({
        type: p.type,
        displayType: STAT_DISPLAY_MAP[p.type] ?? p.type,
        value: p.value,
      })
    ),
  }
}

function toTraceNode(
  raw: RawSkillTreeNode,
  items: Record<string, RawItem>
): TraceNode {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.desc,
    iconUrl: toImgUrl(raw.icon),
    anchor: raw.anchor,
    prerequisites: raw.pre_points,
    levels: raw.levels.map((lvl) => toTraceLevel(lvl, items)),
  }
}

function toAscensionPhases(
  rawMaterials: Array<Array<{ id: string; num: number }>>,
  items: Record<string, RawItem>
): AscensionPhase[] {
  return rawMaterials.map((phaseMats, index) => ({
    phase: index,
    levelCap: ASCENSION_LEVEL_CAPS[index] ?? 80,
    materials: phaseMats.map((m) => toMaterialCost(m.id, m.num, items)),
  }))
}

// ─── Public adapters ──────────────────────────────────────────────────────

/**
 * 转换角色列表项
 * 输入：RawCharacter（来自 fetchCharacterList）
 * 输出：CharacterListItem（组件可消费）
 */
export function toCharacterListItem(raw: RawCharacter): CharacterListItem {
  return {
    id: raw.id,
    name: raw.name,
    rarity: normalizeRarity(raw.rarity),
    element: normalizeElement(raw.element),
    path: normalizePath(raw.path),
    iconUrl: toImgUrl(raw.icon),
    previewUrl: toImgUrl(raw.preview),
  }
}

/**
 * 转换角色完整详情
 * 输入：RawCharacterDetail（来自 fetchCharacterDetail，已聚合多个接口）
 * 输出：CharacterDetail（组件可消费）
 */
export function toCharacterDetail(raw: RawCharacterDetail): CharacterDetail {
  return {
    ...toCharacterListItem(raw.character),
    portraitUrl: toImgUrl(raw.character.portrait),
    maxSp: raw.character.max_sp,
    skills: raw.skills.map(toSkill),
    eidolons: raw.eidolons.map(toEidolon),
    traces: raw.traces.map((t) => toTraceNode(t, raw.items)),
    ascensionPhases: toAscensionPhases(raw.ascensionMaterials, raw.items),
  }
}
