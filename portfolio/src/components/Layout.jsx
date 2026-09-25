import { useEffect } from 'react'
import { Outlet, useLocation, useMatch } from 'react-router-dom'
import ParticlesBackground from './ParticlesBackground'
import Header from './Header'
import NavBar from './NavBar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  /*
    Project sub-pages drop the header so the write-up gets the full screen.
    This is decided here rather than with a second layout route: switching
    between two layout elements would unmount this one, restarting the
    particle canvas and breaking the nav pill's slide between tabs.
    Any future /projects/<slug> page picks this up automatically.
  */
  const isProjectSubPage = useMatch('/projects/:slug')

  /*
    <BrowserRouter> has no <ScrollRestoration> (that's data-router only), so
    without this a "Learn More" click halfway down Projects would land partway
    down the sub-page.
  */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <ParticlesBackground />
      {!isProjectSubPage && <Header />}
      <NavBar />
      <main className="flex w-full flex-1 flex-col items-center bg-base-100 px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
