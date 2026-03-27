import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * 角色详情页 404 — Server Component
 * 由 notFound() 触发
 */
export default function CharacterNotFound() {
  return (
    <div className="page-container flex flex-col items-center justify-center py-32 text-center">
      <p className="text-[4rem] font-bold text-muted leading-none mb-4">404</p>
      <h2 className="text-h2 mb-2">角色不存在</h2>
      <p className="text-caption text-muted-foreground mb-8 max-w-xs">
        未找到该角色的数据，可能 ID 有误或该角色尚未收录
      </p>
      <Button asChild variant="outline">
        <Link href="/characters">返回角色列表</Link>
      </Button>
    </div>
  )
}
