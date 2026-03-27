import { Suspense } from 'react'
import type { Metadata } from 'next'
import { fetchCharacterList } from '@/services/hsr-api'
import { toCharacterListItem } from '@/adapters/character-adapter'
import { PageHeader } from '@/components/shared/page-header'
import { LoadingGrid } from '@/components/shared/loading-grid'
import { CharacterGrid } from '@/features/characters/components/character-grid'
import { CharacterFilters } from '@/features/characters/components/character-filters'
import { CharacterSearch } from '@/features/characters/components/character-search'
import type { CharacterElement, CharacterPath, CharacterRarity } from '@/types'

export const metadata: Metadata = {
  title: '角色图鉴',
  description: '星穹铁道全角色技能、星魂、行迹与突破材料查询',
}

interface PageProps {
  // Next.js 15: searchParams 是 Promise
  searchParams: Promise<{
    q?: string
    element?: string
    path?: string
    rarity?: string
  }>
}

/**
 * 角色列表页 — Server Component
 *
 * 数据流：
 *   fetchCharacterList() → toCharacterListItem() → server-side filter → CharacterGrid
 *
 * 搜索/筛选状态存于 URL query params，由 Client Components 更新，
 * 页面 re-render 时服务端重新过滤，无客户端数据状态。
 */
export default async function CharactersPage({ searchParams }: PageProps) {
  // ─── 读取筛选参数 ────────────────────────────────────────────────────────
  const params = await searchParams
  const q = (params.q ?? '').trim().toLowerCase()
  const elementFilter = (params.element ?? '') as CharacterElement | ''
  const pathFilter = (params.path ?? '') as CharacterPath | ''
  const rawRarity = params.rarity
  const rarityFilter: CharacterRarity | '' =
    rawRarity === '4' ? 4 : rawRarity === '5' ? 5 : ''

  const hasFilters = Boolean(q || elementFilter || pathFilter || rarityFilter)

  // ─── 数据获取 + Adapter 转换 ──────────────────────────────────────────────
  // 获取原始列表 → 统一类型（组件层只见 CharacterListItem）
  const rawList = await fetchCharacterList()
  const allCharacters = rawList.map(toCharacterListItem)

  // ─── 服务端过滤 ───────────────────────────────────────────────────────────
  const filtered = allCharacters.filter((c) => {
    if (q && !c.name.toLowerCase().includes(q)) return false
    if (elementFilter && c.element !== elementFilter) return false
    if (pathFilter && c.path !== pathFilter) return false
    if (rarityFilter && c.rarity !== rarityFilter) return false
    return true
  })

  return (
    <div className="page-container py-8">
      {/* 页面标题 */}
      <PageHeader
        title="角色图鉴"
        description={`共收录 ${allCharacters.length} 位角色`}
      />

      {/* 搜索框 + 筛选栏
          CharacterSearch / CharacterFilters 使用 useSearchParams，必须包裹 Suspense */}
      <div className="mb-6 flex flex-col gap-4">
        <Suspense fallback={<div className="h-9 w-64 rounded bg-muted animate-pulse" />}>
          <CharacterSearch />
        </Suspense>

        <Suspense fallback={<div className="h-16 w-full rounded bg-muted animate-pulse" />}>
          <CharacterFilters />
        </Suspense>
      </div>

      {/* 筛选结果提示 */}
      {hasFilters && (
        <p className="text-caption text-muted-foreground mb-4">
          {filtered.length > 0
            ? `找到 ${filtered.length} 位角色`
            : '没有匹配的角色'}
        </p>
      )}

      {/* 角色网格（Server Component，直接渲染，无需 Suspense） */}
      <CharacterGrid characters={filtered} hasFilters={hasFilters} />
    </div>
  )
}
