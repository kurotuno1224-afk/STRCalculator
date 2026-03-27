import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface LoadingGridProps {
  /** 骨架卡片数量 */
  count?: number
  className?: string
}

/**
 * Server Component — 角色列表页 loading 骨架网格
 * 与 CharacterGrid 的 grid 列数保持一致
 */
export function LoadingGrid({ count = 24, className }: LoadingGridProps) {
  return (
    <div
      className={cn(
        'grid gap-3',
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  )
}

function CharacterCardSkeleton() {
  return (
    <div className="flat-card overflow-hidden">
      {/* 角色图片区域 */}
      <Skeleton className="aspect-square w-full rounded-none" />
      {/* 信息区 */}
      <div className="p-2 flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}
