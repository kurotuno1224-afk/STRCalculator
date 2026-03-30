import type { CharacterListItem } from '@/types'
import { CharacterCard } from './character-card'
import { EmptyState } from '@/components/shared/empty-state'

interface CharacterGridProps {
  characters: CharacterListItem[]
  /** 当前是否有活跃筛选（影响空状态文案） */
  hasFilters?: boolean
}

/**
 * Server Component — 角色卡片网格
 *
 * 响应式列数：
 * - 2 列（xs）→ 3 列（sm）→ 4 列（md）→ 6 列（lg）
 * 与 LoadingGrid 保持一致
 */
export function CharacterGrid({ characters, hasFilters = false }: CharacterGridProps) {
  if (characters.length === 0) {
    return hasFilters ? (
      <EmptyState
        title="没有找到角色"
        description="当前筛选条件下没有匹配的角色，尝试调整属性、命途或稀有度筛选"
      />
    ) : (
      <EmptyState
        title="暂无角色数据"
        description="数据加载失败或暂未收录任何角色"
      />
    )
  }

  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  )
}
