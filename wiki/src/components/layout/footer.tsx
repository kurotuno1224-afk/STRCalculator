import { SITE } from '@/lib/constants'

/**
 * Server Component — 底部页脚
 * 扁平化：顶部 1px border，无背景色
 */
export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="page-container flex h-12 items-center justify-between gap-4">
        <p className="text-caption text-muted-foreground">
          {SITE.name} &mdash; 非官方资料站，数据来源于公开 API
        </p>
        <p className="text-caption text-muted-foreground hidden sm:block">
          Built with Next.js &amp; TailwindCSS
        </p>
      </div>
    </footer>
  )
}
