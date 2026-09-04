import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Coding from './pages/Coding'
import Designs from './pages/Designs'

/*
  A pathless layout route: <Layout /> renders once and stays mounted while
  the child route swaps inside its <Outlet />. That persistence is what lets
  the particle canvas keep animating and the nav pill animate between tabs —
  it replaces the original site's fetch() + innerHTML page swap.
*/
function App() {
  return (
    /*
      basename comes from Vite's `base`, so the app works both at the domain
      root and under the /Website/ sub-path GitHub Pages serves a project site
      from — without the routes below having to know which.
    */
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          {/*
            Home gets its own /home path so every page is addressable the same
            way. `replace` keeps the redirect out of history, so Back from
            /home goes wherever the visitor came from rather than to "/", which
            would bounce straight forward to /home again.
          */}
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="designs" element={<Designs />} />
          <Route path="coding" element={<Coding />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
