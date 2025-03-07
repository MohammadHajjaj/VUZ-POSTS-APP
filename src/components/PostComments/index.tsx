import { useEffect } from 'react'
import { fetchComments } from '../../store/actions/commentActions'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import './PostComments.scss'

interface Props {
  postId: number
}

export default function PostComments({ postId }: Props) {
  const dispatch = useAppDispatch()
  const { comments, loading, error } = useAppSelector((state) => state.comments)

  useEffect(() => {
    dispatch(fetchComments(postId))
  }, [dispatch, postId])

  if (loading) return <p>Loading comments...</p>
  if (error) return <p>Error: {error}</p>
  if (!comments[postId] || comments[postId].length === 0)
    return <p>No comments found.</p>

  return (
    <div className="comments-container">
      <h4>Comments</h4>
      <ul className="comments-list">
        {comments[postId].map((comment) => (
          <li key={comment.id} className="comment-card">
            <strong>{comment.name}</strong>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
