import { Skeleton } from '@/components/ui/skeleton'

/**
 * 角色详情页 loading UI
 */
export default function CharacterDetailLoading() {
  return (
    <div className="page-container py-8">
      {/* 基础信息骨架 */}
      <div className="flex gap-6 mb-10 flex-wrap">
        <Skeleton className="w-40 h-40 rounded-md flex-shrink-0" />
        <div className="flex flex-col gap-3 flex-1 min-w-48">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-6 w-16 rounded" />
          </div>
        </div>
      </div>

      {/* 技能区骨架 */}
      <Skeleton className="h-6 w-20 mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-md" />
        ))}
      </div>

      {/* 星魂区骨架 */}
      <Skeleton className="h-6 w-20 mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-md" />
        ))}
      </div>
    </div>
  )
}
