import { useEffect } from 'react'
import { fetchPosts } from '../../store/actions/postActions'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import PostComments from '../PostComments'
import './UserPosts.scss'

interface Props {
  userId: number
}

export default function UserPosts({ userId }: Props) {
  const dispatch = useAppDispatch()
  const { posts, loading, error } = useAppSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts(userId))
  }, [dispatch, userId])

  if (loading) return <p>Loading posts...</p>
  if (error) return <p>Error: {error}</p>
  if (!posts[userId] || posts[userId].length === 0)
    return <p>No posts found.</p>

  return (
    <div className="posts-container">
      <h1>User Posts</h1>
      <ul className="posts-list">
        {posts[userId].map((post) => (
          <li key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>

            <PostComments postId={post.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}
