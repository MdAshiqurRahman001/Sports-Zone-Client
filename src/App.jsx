import { Outlet } from "react-router-dom"
import Navbar from "./Components/Header/Navbar"
import Footer from "./Components/Footer/Footer"

function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 font-sans">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
