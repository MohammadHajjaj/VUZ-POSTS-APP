import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import UsersPage from './pages/UsersPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UsersPage />} />{' '}
      </Route>
    </Routes>
  )
}
