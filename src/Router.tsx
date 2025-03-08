import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Common/Layout'
import UsersPage from './pages/UsersPage'
import UserPostsPage from './pages/UserPostsPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UsersPage />} />
        <Route path="users/:id/posts" element={<UserPostsPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
