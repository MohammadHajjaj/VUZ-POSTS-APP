import { useEffect, useState } from 'react'
import { fetchPosts } from '../../store/actions/postActions'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import PostComments from '../PostComments'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../Common/Loader'
import './UserPosts.scss'

interface Props {
  userId: number
}

export default function UserPosts({ userId }: Props) {
  const dispatch = useAppDispatch()
  const { posts, loading, error } = useAppSelector((state) => state.posts)
  const [visiblePosts, setVisiblePosts] = useState<number>(5)

  useEffect(() => {
    dispatch(fetchPosts(userId))
  }, [dispatch, userId])

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 5)
  }

  if (loading) return <Loader />
  if (error)
    return (
      <p className="error-message">Failed to load posts. Please try again.</p>
    )
  if (!posts[userId] || posts[userId].length === 0)
    return <p>No posts found.</p>

  return (
    <div className="posts-container">
      <h1>User Posts</h1>
      <InfiniteScroll
        dataLength={visiblePosts}
        next={loadMorePosts}
        hasMore={visiblePosts < posts[userId].length}
        loader={<Loader />}
      >
        <ul className="posts-list">
          {posts[userId].slice(0, visiblePosts).map((post, index) => (
            <li key={post.id} className="post-card">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
              <PostComments postId={post.id} />
              {index !== posts[userId].slice(0, visiblePosts).length - 1 && (
                <div className="post-separator"></div>
              )}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
