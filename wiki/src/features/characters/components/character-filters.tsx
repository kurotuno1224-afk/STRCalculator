'use client'

/**
 * CharacterFilters — Phase 5 重构
 *
 * 变更：
 * - 元素圆点颜色统一使用 ELEMENT_DOT_COLOR（移除重复硬编码）
 * - 稀有度颜色统一使用 RARITY_TEXT_COLOR（修复 amber-500 vs amber-400 不一致）
 * - filter chip 使用 .filter-chip-active / .filter-chip-inactive 工具类
 * - 所有 <button> 补全 type="button"
 * - 补全 focus-ring
 */

import { X } from 'lucide-react'
import type { CharacterElement, CharacterPath, CharacterRarity } from '@/types'
import {
  ELEMENT_LABEL,
  PATH_LABEL,
  ELEMENT_DOT_COLOR,
  RARITY_TEXT_COLOR,
} from '@/types'
import { useCharacterFilters } from '../hooks/use-character-filters'
import { cn } from '@/lib/utils'

// ─── 选项常量 ─────────────────────────────────────────────────────────────

const ELEMENTS: CharacterElement[] = [
  'Fire', 'Ice', 'Wind', 'Thunder', 'Quantum', 'Physical', 'Imaginary',
]

const PATHS: CharacterPath[] = [
  'Knight', 'Rogue', 'Mage', 'Warrior', 'Warlock', 'Sprout', 'Shaman', 'Memory',
]

const RARITIES: CharacterRarity[] = [5, 4]

// ─── 子组件 ───────────────────────────────────────────────────────────────

interface FilterRowProps {
  label: string
  children: React.ReactNode
}

function FilterRow({ label, children }: FilterRowProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-caption text-muted-foreground w-8 flex-shrink-0 select-none">
        {label}
      </span>
      {children}
    </div>
  )
}

// ─── 主组件 ───────────────────────────────────────────────────────────────

export function CharacterFilters() {
  const { filters, toggleFilter, clearAll, hasActiveFilters, isPending } =
    useCharacterFilters()

  return (
    <div
      className={cn(
        'flex flex-col gap-2.5',
        isPending && 'opacity-50 pointer-events-none select-none'
      )}
      aria-busy={isPending}
    >
      {/* 属性筛选 */}
      <FilterRow label="属性">
        {ELEMENTS.map((el) => {
          const active = filters.element === el
          return (
            <button
              key={el}
              type="button"
              onClick={() => toggleFilter('element', el)}
              className={cn(
                active ? 'filter-chip-active' : 'filter-chip-inactive',
                'focus-ring'
              )}
              aria-pressed={active}
            >
              {/* 元素圆点（统一来源：ELEMENT_DOT_COLOR） */}
              <span
                className={cn(
                  'w-1.5 h-1.5 rounded-full flex-shrink-0',
                  active ? 'bg-primary-foreground/70' : ELEMENT_DOT_COLOR[el]
                )}
                aria-hidden
              />
              {ELEMENT_LABEL[el]}
            </button>
          )
        })}
      </FilterRow>

      {/* 命途筛选 */}
      <FilterRow label="命途">
        {PATHS.map((p) => {
          const active = filters.path === p
          return (
            <button
              key={p}
              type="button"
              onClick={() => toggleFilter('path', p)}
              className={cn(
                active ? 'filter-chip-active' : 'filter-chip-inactive',
                'focus-ring'
              )}
              aria-pressed={active}
            >
              {PATH_LABEL[p]}
            </button>
          )
        })}
      </FilterRow>

      {/* 稀有度筛选 */}
      <FilterRow label="稀有">
        {RARITIES.map((r) => {
          const active = filters.rarity === r
          return (
            <button
              key={r}
              type="button"
              onClick={() => toggleFilter('rarity', String(r))}
              className={cn(
                active ? 'filter-chip-active' : 'filter-chip-inactive',
                'focus-ring'
              )}
              aria-pressed={active}
            >
              {/* 稀有度星星（统一来源：RARITY_TEXT_COLOR） */}
              <span className={active ? '' : RARITY_TEXT_COLOR[r]}>
                {'★'.repeat(r)}
              </span>
            </button>
          )
        })}
      </FilterRow>

      {/* 清除所有筛选 */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="self-start flex items-center gap-1 text-caption text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
        >
          <X size={12} aria-hidden />
          清除筛选
        </button>
      )}
    </div>
  )
}
