import { useEffect } from 'react'
import { fetchUsers } from './store/actions/userActions'
import { fetchPosts } from './store/actions/postActions'
import { fetchComments } from './store/actions/commentActions'
import { useAppDispatch, useAppSelector } from './store/hooks'

export default function App() {
  const dispatch = useAppDispatch()
  const { users, loading, error } = useAppSelector((state) => state.users)
  const { posts } = useAppSelector((state) => state.posts)
  const { comments } = useAppSelector((state) => state.comments)

  useEffect(() => {
    dispatch(fetchUsers()).then((action) => {
      if (fetchUsers.fulfilled.match(action)) {
        action.payload.forEach((user) => dispatch(fetchPosts(user.id)))
      }
    })
  }, [dispatch])

  useEffect(() => {
    Object.keys(posts).forEach((userId) => {
      posts[Number(userId)].forEach((post) => dispatch(fetchComments(post.id)))
    })
  }, [dispatch, posts])

  return (
    <div>
      <h1>Fetching Data...</h1>
      {loading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}
      <p>Fetched {users.length} users</p>
      <p>Fetched {Object.keys(posts).length} users' posts</p>
      <p>Fetched {Object.keys(comments).length} posts' comments</p>
    </div>
  )
}
