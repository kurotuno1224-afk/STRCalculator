import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * 全局 404 页面 — Server Component
 */
export default function NotFound() {
  return (
    <div className="page-container flex flex-col items-center justify-center py-32 text-center">
      <p className="text-[4rem] font-bold text-muted leading-none mb-4">404</p>
      <h2 className="text-h2 mb-2">页面不存在</h2>
      <p className="text-caption text-muted-foreground mb-8 max-w-xs">
        你访问的页面不存在，可能已被移除或链接有误
      </p>
      <Button asChild variant="outline">
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  )
}
