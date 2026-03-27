import { Skeleton } from '@/components/ui/skeleton'

/**
 * 全局 loading.tsx — 根路由级别 loading UI
 * 仅在根路由 Suspense boundary 触发时显示
 */
export default function GlobalLoading() {
  return (
    <div className="page-container py-16 max-w-2xl">
      <Skeleton className="h-4 w-20 mb-3" />
      <Skeleton className="h-9 w-48 mb-3" />
      <Skeleton className="h-4 w-64 mb-12" />
      <Skeleton className="h-px w-full mb-8" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-24 mb-1" />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>
    </div>
  )
}
