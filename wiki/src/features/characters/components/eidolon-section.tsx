import Image from 'next/image'
import type { Eidolon } from '@/types'
import { SectionTitle } from '@/components/shared/section-title'

interface EidolonSectionProps {
  eidolons: Eidolon[]
}

/**
 * Server Component — 星魂区
 *
 * Phase 5 变更：使用 SectionTitle（统一标题样式）
 */
export function EidolonSection({ eidolons }: EidolonSectionProps) {
  const sorted = [...eidolons].sort((a, b) => a.rank - b.rank)
  if (sorted.length === 0) return null

  return (
    <section aria-labelledby="eidolons-heading">
      <SectionTitle id="eidolons-heading">星魂</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sorted.map((e) => (
          <EidolonCard key={e.id} eidolon={e} />
        ))}
      </div>
    </section>
  )
}

function EidolonCard({ eidolon }: { eidolon: Eidolon }) {
  return (
    <div className="flat-card p-3 flex gap-3">
      {/* 图标 */}
      <div className="relative w-12 h-12 flex-shrink-0 rounded bg-muted overflow-hidden">
        <Image
          src={eidolon.iconUrl}
          alt={eidolon.name}
          fill
          unoptimized
          className="object-contain p-1"
        />
      </div>

      {/* 信息 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-primary/10 text-primary text-caption font-bold border border-primary/20 flex-shrink-0">
            E{eidolon.rank}
          </span>
          <p className="text-body font-medium leading-tight truncate">
            {eidolon.name}
          </p>
        </div>
        {eidolon.description && (
          <p className="text-caption text-muted-foreground leading-relaxed line-clamp-4">
            {eidolon.description}
          </p>
        )}
      </div>
    </div>
  )
}
