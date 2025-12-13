import { Outlet } from "react-router"

function RootLayout() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <p className="app-shell__eyebrow">STR Calculator</p>
        <h1 className="app-shell__title">Strengthening the frontend baseline</h1>
      </header>

      <main className="app-shell__main">
        <Outlet />
      </main>

      <footer className="app-shell__footer">
        <small>结构整理演示 · React + Vite</small>
      </footer>
    </div>
  )
}

export default RootLayout
