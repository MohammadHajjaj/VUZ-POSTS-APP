import { useEffect } from 'react'
import { fetchUsers } from './store/actions/userActions'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { User } from './store/slices/userSlice'

export default function App() {
  const dispatch = useAppDispatch()
  const { users, loading, error } = useAppSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Users List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
