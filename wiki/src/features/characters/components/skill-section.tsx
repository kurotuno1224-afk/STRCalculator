import Image from 'next/image'
import type { Skill, SkillType } from '@/types'
import { SKILL_TYPE_LABEL, SKILL_TYPE_COLOR } from '@/types'
import { SectionTitle } from '@/components/shared/section-title'
import { cn } from '@/lib/utils'

// ─── 技能展示顺序 ─────────────────────────────────────────────────────────
const SKILL_ORDER: Record<SkillType, number> = {
  Normal: 0,
  BPSkill: 1,
  Ultra: 2,
  Talent: 3,
  Maze: 4,
  MazeNormal: 5,
}

interface SkillSectionProps {
  skills: Skill[]
}

/**
 * Server Component — 技能区
 *
 * Phase 5 变更：
 * - 使用 SectionTitle（统一标题样式）
 * - 技能类型颜色统一来源 SKILL_TYPE_COLOR（移出硬编码）
 */
export function SkillSection({ skills }: SkillSectionProps) {
  const displayed = skills
    .filter((s) => ['Normal', 'BPSkill', 'Ultra', 'Talent', 'Maze'].includes(s.type))
    .sort((a, b) => (SKILL_ORDER[a.type] ?? 9) - (SKILL_ORDER[b.type] ?? 9))
    .filter((s, i, arr) => arr.findIndex((x) => x.type === s.type) === i)

  if (displayed.length === 0) return null

  return (
    <section aria-labelledby="skills-heading">
      <SectionTitle id="skills-heading">技能</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayed.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  const desc = skill.simpleDescription.trim() || skill.description.trim()

  return (
    <div className="flat-card p-3 flex gap-3">
      {/* 技能图标 */}
      <div className="relative w-12 h-12 flex-shrink-0 rounded bg-muted overflow-hidden">
        <Image
          src={skill.iconUrl}
          alt={skill.name}
          fill
          unoptimized
          className="object-contain p-1"
        />
      </div>

      {/* 信息 */}
      <div className="flex-1 min-w-0">
        {/* 类型标签 + 最大等级（统一来源：SKILL_TYPE_COLOR） */}
        <div className="flex items-center gap-2 mb-0.5">
          <span className={cn('text-caption font-semibold', SKILL_TYPE_COLOR[skill.type])}>
            {SKILL_TYPE_LABEL[skill.type]}
          </span>
          {skill.maxLevel > 1 && (
            <span className="text-caption text-muted-foreground">
              max Lv.{skill.maxLevel}
            </span>
          )}
        </div>

        {/* 技能名 */}
        <p className="text-body font-medium leading-snug mb-1">{skill.name}</p>

        {/* 简述 */}
        {desc && (
          <p className="text-caption text-muted-foreground line-clamp-3 leading-relaxed">
            {desc}
          </p>
        )}
      </div>
    </div>
  )
}
