import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import RootLayout from "./routes/root"
import HomeRoute from "./routes/index"
import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomeRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
