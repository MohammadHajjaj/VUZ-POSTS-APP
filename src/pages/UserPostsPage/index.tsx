import { useParams } from 'react-router-dom'
import UserPosts from '../../components/UserPosts'

export default function UserPostsPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) return <p>Invalid User ID</p>

  return <UserPosts userId={Number(id)} />
}
