import { Outlet } from 'react-router-dom'
import ParticlesBackground from './ParticlesBackground'
import Header from './Header'
import NavBar from './NavBar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ParticlesBackground />
      <Header />
      <NavBar />
      <main className="flex w-full flex-1 flex-col items-center bg-base-100 px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
