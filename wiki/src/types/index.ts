/**
 * 统一领域类型 (Unified Domain Types)
 *
 * 架构约束：
 * - 组件和页面只能消费这里定义的类型
 * - 禁止在组件层直接引用 services/ 或 adapters/ 中的原始类型
 * - 所有字段命名使用语义化命名（非 API 原始字段名）
 */

// ─── 枚举类型 ─────────────────────────────────────────────────────────────

export type CharacterRarity = 4 | 5

export type CharacterElement =
  | 'Fire'
  | 'Ice'
  | 'Wind'
  | 'Thunder'
  | 'Quantum'
  | 'Physical'
  | 'Imaginary'

export type CharacterPath =
  | 'Knight'   // 存护
  | 'Rogue'    // 巡猎
  | 'Mage'     // 智识
  | 'Warrior'  // 毁灭
  | 'Warlock'  // 虚无
  | 'Sprout'   // 同谐
  | 'Shaman'   // 丰饶
  | 'Memory'   // 记忆（Remembrance）

export type SkillType =
  | 'Normal'
  | 'BPSkill'
  | 'Ultra'
  | 'Talent'
  | 'Maze'
  | 'MazeNormal'

// ─── 核心领域模型 ──────────────────────────────────────────────────────────

/** 角色列表项 — 用于列表页卡片展示 */
export interface CharacterListItem {
  id: string
  name: string
  rarity: CharacterRarity
  element: CharacterElement
  path: CharacterPath
  iconUrl: string
  previewUrl: string
}

/** 角色完整详情 — 用于详情页 */
export interface CharacterDetail extends CharacterListItem {
  portraitUrl: string
  maxSp: number | null
  skills: Skill[]
  eidolons: Eidolon[]
  traces: TraceNode[]
  ascensionPhases: AscensionPhase[]
}

/** 技能 */
export interface Skill {
  id: string
  name: string
  type: SkillType
  typeText: string
  effect: string
  effectText: string
  description: string
  simpleDescription: string
  maxLevel: number
  iconUrl: string
}

/** 星魂 */
export interface Eidolon {
  id: string
  name: string
  rank: 1 | 2 | 3 | 4 | 5 | 6
  description: string
  iconUrl: string
}

/** 行迹节点 */
export interface TraceNode {
  id: string
  name: string
  description: string
  iconUrl: string
  anchor: string
  prerequisites: string[]
  levels: TraceLevel[]
}

/** 行迹节点每级所需条件 */
export interface TraceLevel {
  promotion: number
  characterLevel: number
  materials: MaterialCost[]
  statBonuses: StatBonus[]
}

/** 属性加成 */
export interface StatBonus {
  type: string
  displayType: string
  value: number
}

/** 材料消耗 */
export interface MaterialCost {
  id: string
  num: number
  name: string
  iconUrl: string
}

/** 突破阶段 */
export interface AscensionPhase {
  phase: number
  levelCap: number
  materials: MaterialCost[]
}

// ─── UI 展示映射 ──────────────────────────────────────────────────────────
/*
 * Phase 5 规范：
 * - 所有颜色类名必须在此集中定义，禁止在组件中分散硬编码
 * - src/types/ 已加入 Tailwind content 扫描路径，类名可被 JIT 识别
 * - 使用具体的 Tailwind 类名字符串（非模板字面量），确保 JIT 静态分析可识别
 */

export const ELEMENT_LABEL: Record<CharacterElement, string> = {
  Fire: '火',
  Ice: '冰',
  Wind: '风',
  Thunder: '雷',
  Quantum: '量子',
  Physical: '物理',
  Imaginary: '虚数',
}

export const PATH_LABEL: Record<CharacterPath, string> = {
  Knight: '存护',
  Rogue: '巡猎',
  Mage: '智识',
  Warrior: '毁灭',
  Warlock: '虚无',
  Sprout: '同谐',
  Shaman: '丰饶',
  Memory: '记忆',
}

export const SKILL_TYPE_LABEL: Record<SkillType, string> = {
  Normal: '普攻',
  BPSkill: '战技',
  Ultra: '终结技',
  Talent: '天赋',
  Maze: '秘技',
  MazeNormal: '秘技',
}

/**
 * 元素文字色（用于角色名下方的属性标签）
 * Phase 5: 单一来源，组件 import 此常量，不重复定义
 */
export const ELEMENT_TEXT_COLOR: Record<CharacterElement, string> = {
  Fire: 'text-red-500',
  Ice: 'text-sky-400',
  Wind: 'text-emerald-400',
  Thunder: 'text-violet-400',
  Quantum: 'text-indigo-400',
  Physical: 'text-gray-400',
  Imaginary: 'text-amber-400',
}

/** 向后兼容别名（逐步迁移至 ELEMENT_TEXT_COLOR） */
export const ELEMENT_COLOR = ELEMENT_TEXT_COLOR

/**
 * 元素圆点背景色（用于筛选 chip 的小圆点指示器）
 * Phase 5: 与 ELEMENT_TEXT_COLOR 保持色调一致，仅改 text- → bg-
 */
export const ELEMENT_DOT_COLOR: Record<CharacterElement, string> = {
  Fire: 'bg-red-500',
  Ice: 'bg-sky-400',
  Wind: 'bg-emerald-400',
  Thunder: 'bg-violet-400',
  Quantum: 'bg-indigo-400',
  Physical: 'bg-gray-400',
  Imaginary: 'bg-amber-400',
}

/**
 * 技能类型颜色（用于技能卡的类型标签）
 * Phase 5: 统一来源，移出 skill-section.tsx
 */
export const SKILL_TYPE_COLOR: Record<SkillType, string> = {
  Normal: 'text-muted-foreground',
  BPSkill: 'text-sky-500',
  Ultra: 'text-violet-500',
  Talent: 'text-amber-500',
  Maze: 'text-emerald-500',
  MazeNormal: 'text-emerald-500',
}

/**
 * 稀有度颜色（统一 amber/violet 取值，card 和 filters 共用）
 * Phase 5: 修复 amber-400 vs amber-500 不一致问题
 */
export const RARITY_COLOR: Record<CharacterRarity, string> = {
  5: 'fill-amber-400 text-amber-400',
  4: 'fill-violet-400 text-violet-400',
}

/** 稀有度悬停边框色（用于角色卡 hover 效果） */
export const RARITY_HOVER_BORDER: Record<CharacterRarity, string> = {
  5: 'hover:border-amber-300',
  4: 'hover:border-violet-300',
}

/** 稀有度文字色（用于筛选 chip 的星星显示） */
export const RARITY_TEXT_COLOR: Record<CharacterRarity, string> = {
  5: 'text-amber-400',
  4: 'text-violet-400',
}
