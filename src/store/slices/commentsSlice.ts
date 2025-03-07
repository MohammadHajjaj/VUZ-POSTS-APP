import { createSlice } from '@reduxjs/toolkit'
import { fetchComments } from '../actions/commentActions'

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

interface CommentsState {
  comments: Record<number, Comment[]>
  loading: boolean
  error: string | null
}

const initialState: CommentsState = {
  comments: {},
  loading: false,
  error: null,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments[action.meta.arg] = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load comments'
      })
  },
})

export default commentsSlice.reducer
