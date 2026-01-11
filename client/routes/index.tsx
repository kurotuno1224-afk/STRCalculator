<<<<<<< HEAD
import { MyDialog } from "@/components/mydialog"
=======
import { NaviButton } from "./navi-button"

>>>>>>> main
function HomeRoute() {
  return (
    <section className="welcome-card">
      <div className="welcome-card__glow" aria-hidden />
      <p className="welcome-card__eyebrow">欢迎体验</p>
      <h2 className="welcome-card__title">STR Calculator · 前端结构治理</h2>
      <p className="welcome-card__body">
        这个静态页用于确认整理后的项目仍然可以运行、可持续维护。入口、路由与样式都已重新组织，接下来可在
        <code>client/</code> 各分层内扩展业务。
      </p>
      <MyDialog></MyDialog>
      <div className="welcome-card__badges">
        <span className="badge">React 19</span>
        <span className="badge">Vite 7</span>
        <span className="badge badge--pulse">结构 ready</span>
        <NaviButton />
      </div>
    </section>
  )
}

export default HomeRoute
