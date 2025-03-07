import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import type { User } from '../store/slices/userSlice'
import debounce from 'lodash.debounce'

export default function UserList() {
  const { users, loading, error } = useAppSelector((state) => state.users)
  const [searchTerm, setSearchTerm] = useState('')

  // Debounced search function
  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value.toLowerCase())
      }, 300),
    []
  )

  if (loading) return <p>Loading users...</p>
  if (error) return <p>Error: {error}</p>

  const filteredUsers = users.filter((user: User) =>
    user.name.toLowerCase().includes(searchTerm)
  )

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user: User) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
