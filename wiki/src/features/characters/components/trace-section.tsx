import Image from 'next/image'
import type { TraceNode, StatBonus } from '@/types'
import { SectionTitle } from '@/components/shared/section-title'

// ─── 属性值格式化 ─────────────────────────────────────────────────────────

const PCT_STAT_TYPES = new Set([
  'CriticalChanceBase', 'CriticalDamageBase', 'BreakDamageAddedRatioBase',
  'HealRatioBase', 'StatusProbabilityBase', 'StatusResistanceBase',
  'HPAddedRatio', 'AttackAddedRatio', 'DefenceAddedRatio', 'SPRatioBase',
])

function formatStatValue(type: string, value: number): string {
  if (PCT_STAT_TYPES.has(type)) return `${(value * 100).toFixed(1)}%`
  return value % 1 === 0 ? String(value) : value.toFixed(1)
}

// ─── 节点分类 ─────────────────────────────────────────────────────────────

function classifyTraces(traces: TraceNode[]) {
  const abilityNodes: TraceNode[] = []
  const statNodes: TraceNode[] = []

  for (const trace of traces) {
    const hasDescription = trace.description.trim().length > 15
    const hasStatBonuses = trace.levels.some((l) => l.statBonuses.length > 0)
    if (hasDescription && !hasStatBonuses) {
      abilityNodes.push(trace)
    } else if (hasStatBonuses) {
      statNodes.push(trace)
    }
  }
  return { abilityNodes, statNodes }
}

function aggregateStatBonuses(
  statNodes: TraceNode[]
): Array<{ bonus: StatBonus }> {
  const map = new Map<string, { bonus: StatBonus; total: number }>()
  for (const node of statNodes) {
    for (const level of node.levels) {
      for (const bonus of level.statBonuses) {
        const existing = map.get(bonus.type)
        if (existing) {
          existing.total += bonus.value
        } else {
          map.set(bonus.type, { bonus: { ...bonus }, total: bonus.value })
        }
      }
    }
  }
  return Array.from(map.values()).map(({ bonus, total }) => ({
    bonus: { ...bonus, value: total },
  }))
}

// ─── Components ───────────────────────────────────────────────────────────

interface TraceSectionProps {
  traces: TraceNode[]
}

/**
 * Server Component — 行迹区
 *
 * Phase 5 变更：使用 SectionTitle（统一标题样式）
 */
export function TraceSection({ traces }: TraceSectionProps) {
  const { abilityNodes, statNodes } = classifyTraces(traces)
  const aggregated = aggregateStatBonuses(statNodes)

  if (abilityNodes.length === 0 && aggregated.length === 0) return null

  return (
    <section aria-labelledby="traces-heading">
      <SectionTitle id="traces-heading">行迹</SectionTitle>

      {/* 能力节点 */}
      {abilityNodes.length > 0 && (
        <div className="mb-5">
          <p className="text-caption text-muted-foreground uppercase tracking-wider mb-3">
            天赋能力
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {abilityNodes.map((trace) => (
              <AbilityTraceCard key={trace.id} trace={trace} />
            ))}
          </div>
        </div>
      )}

      {/* 属性节点汇总 */}
      {aggregated.length > 0 && (
        <div>
          <p className="text-caption text-muted-foreground uppercase tracking-wider mb-3">
            属性提升（行迹解锁合计）
          </p>
          <div className="flat-card p-3 flex flex-wrap gap-x-6 gap-y-2">
            {aggregated.map(({ bonus }) => (
              <StatBonusChip key={bonus.type} bonus={bonus} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function AbilityTraceCard({ trace }: { trace: TraceNode }) {
  const firstLevel = trace.levels[0]
  return (
    <div className="flat-card p-3 flex gap-3">
      <div className="relative w-10 h-10 flex-shrink-0 rounded bg-muted overflow-hidden">
        <Image src={trace.iconUrl} alt={trace.name} fill unoptimized className="object-contain p-1" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-body font-medium mb-1 leading-tight">{trace.name}</p>
        {firstLevel?.statBonuses.length > 0 ? (
          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
            {firstLevel.statBonuses.map((b, i) => (
              <StatBonusChip key={i} bonus={b} />
            ))}
          </div>
        ) : (
          <p className="text-caption text-muted-foreground leading-relaxed line-clamp-4">
            {trace.description}
          </p>
        )}
      </div>
    </div>
  )
}

function StatBonusChip({ bonus }: { bonus: StatBonus }) {
  return (
    <span className="flex items-center gap-1 text-caption">
      <span className="text-muted-foreground">{bonus.displayType}</span>
      <span className="text-primary font-semibold">
        +{formatStatValue(bonus.type, bonus.value)}
      </span>
    </span>
  )
}
