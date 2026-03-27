import Image from 'next/image'
import type { AscensionPhase, MaterialCost } from '@/types'
import { SectionTitle } from '@/components/shared/section-title'

interface AscensionSectionProps {
  phases: AscensionPhase[]
}

/**
 * Server Component — 突破材料区
 *
 * Phase 5 变更：使用 SectionTitle（统一标题样式）
 */
export function AscensionSection({ phases }: AscensionSectionProps) {
  const activePhases = phases.filter((p) => p.materials.length > 0)

  return (
    <section aria-labelledby="ascension-heading">
      <SectionTitle id="ascension-heading">突破材料</SectionTitle>

      {activePhases.length === 0 ? (
        <p className="text-caption text-muted-foreground">暂无突破材料数据</p>
      ) : (
        <div className="flat-card overflow-hidden divide-y divide-border">
          {/* 表头 */}
          <div className="flex items-center gap-4 px-4 py-2 bg-muted/50">
            <span className="text-caption text-muted-foreground w-20 flex-shrink-0">阶段</span>
            <span className="text-caption text-muted-foreground">所需材料</span>
          </div>

          {/* 各阶段行 */}
          {activePhases.map((phase) => (
            <AscensionRow key={phase.phase} phase={phase} />
          ))}
        </div>
      )}
    </section>
  )
}

function AscensionRow({ phase }: { phase: AscensionPhase }) {
  return (
    <div className="flex items-start gap-4 px-4 py-3 flex-wrap sm:flex-nowrap">
      {/* 阶段标识 */}
      <div className="w-20 flex-shrink-0 pt-0.5">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary/10 border border-primary/20 text-primary text-caption font-bold">
          {phase.phase}
        </span>
        <p className="text-caption text-muted-foreground mt-0.5">
          → Lv.{phase.levelCap}
        </p>
      </div>

      {/* 材料列表 */}
      <div className="flex flex-wrap gap-3">
        {phase.materials.map((mat) => (
          <MaterialItem key={mat.id} material={mat} />
        ))}
      </div>
    </div>
  )
}

function MaterialItem({ material }: { material: MaterialCost }) {
  return (
    <div className="flex items-center gap-1.5">
      {material.iconUrl ? (
        <div className="relative w-7 h-7 flex-shrink-0 rounded bg-muted overflow-hidden border border-border">
          <Image
            src={material.iconUrl}
            alt={material.name}
            fill
            unoptimized
            className="object-contain p-0.5"
          />
        </div>
      ) : (
        <div className="w-7 h-7 flex-shrink-0 rounded bg-muted border border-border" />
      )}
      <div>
        <p className="text-caption leading-tight max-w-[6rem] truncate" title={material.name}>
          {material.name}
        </p>
        <p className="text-caption text-primary font-semibold leading-tight">
          ×{material.num}
        </p>
      </div>
    </div>
  )
}
