import { Outlet, Link, useLocation } from 'react-router-dom'
import './Layout.scss'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="layout">
      {location.pathname !== '/' && (
        <nav className="navbar">
          <Link to="/" className="back-link">
            ← Back to Users
          </Link>
        </nav>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
