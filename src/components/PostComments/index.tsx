import { useEffect, useState } from 'react'
import { fetchComments } from '../../store/actions/commentActions'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../Common/Loader'
import './PostComments.scss'

interface Props {
  postId: number
}

export default function PostComments({ postId }: Props) {
  const dispatch = useAppDispatch()
  const { comments, loading, error } = useAppSelector((state) => state.comments)
  const [visibleComments, setVisibleComments] = useState<number>(3)

  useEffect(() => {
    dispatch(fetchComments(postId))
  }, [dispatch, postId])

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 3)
  }

  if (loading) return <Loader />
  if (error) return <p className="error-message">Failed to load comments.</p>
  if (!comments[postId] || comments[postId].length === 0)
    return <p>No comments found.</p>

  return (
    <div className="comments-container" id={`scrollableDiv-${postId}`}>
      <h4>Comments</h4>
      <InfiniteScroll
        dataLength={visibleComments}
        next={loadMoreComments}
        hasMore={visibleComments < comments[postId].length}
        loader={<Loader />}
        scrollableTarget={`scrollableDiv-${postId}`}
      >
        <ul className="comments-list">
          {comments[postId].slice(0, visibleComments).map((comment) => (
            <li key={comment.id} className="comment-card">
              <strong>{comment.name}</strong>
              <span className="comment-email">({comment.email})</span>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
