import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Users</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/comments">Comments</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}
