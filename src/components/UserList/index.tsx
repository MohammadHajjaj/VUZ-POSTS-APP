import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import debounce from 'lodash.debounce'
import Loader from '../Common/Loader'
import './UserList.scss'

export default function UserList() {
  const { users, loading, error } = useAppSelector((state) => state.users)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value.toLowerCase())
      }, 300),
    []
  )

  if (loading) return <Loader />
  if (error)
    return (
      <p className="error-message">Failed to load users. Please try again.</p>
    )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  )

  return (
    <div className="users-container">
      <h1>Users</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search users..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="user-cards">
        {filteredUsers.map((user) => (
          <Link
            to={`/users/${user.id}/posts`}
            key={user.id}
            className="user-card"
          >
            <h3 className="user-name">{user.name}</h3>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
