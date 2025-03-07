import { useEffect } from 'react'
import { fetchUsers } from '../../store/actions/userActions'
import { useAppDispatch } from '../../store/hooks'
import UserList from '../../components/UserList'

export default function UsersPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return <UserList />
}
