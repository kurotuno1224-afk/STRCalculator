/**
 * SectionTitle — 详情页各区域统一标题组件
 *
 * Phase 5 设计规范：
 * - 左侧 3px primary 竖条（由 .section-heading::before 实现）
 * - H2 字重/字号/字距遵循 design token
 * - 所有详情页 section 必须使用此组件，不得自行编写 h2 样式
 */

interface SectionTitleProps {
  children: React.ReactNode
  /** 用于 aria-labelledby — 与父 <section> 的 aria-labelledby 对应 */
  id?: string
}

export function SectionTitle({ children, id }: SectionTitleProps) {
  return (
    <h2 id={id} className="section-heading">
      {children}
    </h2>
  )
}
