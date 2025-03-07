import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import UsersPage from './pages/UsersPage'
import UserPostsPage from './pages/UserPostsPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UsersPage />} />{' '}
        <Route path="users/:id/posts" element={<UserPostsPage />} />{' '}
      </Route>
    </Routes>
  )
}
