import { LoadingGrid } from '@/components/shared/loading-grid'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * 角色列表页 loading UI
 * Next.js 自动在数据获取期间显示
 */
export default function CharactersLoading() {
  return (
    <div className="page-container py-8">
      {/* PageHeader skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* 筛选栏 skeleton */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>

      {/* 卡片网格 skeleton */}
      <LoadingGrid count={24} />
    </div>
  )
}
