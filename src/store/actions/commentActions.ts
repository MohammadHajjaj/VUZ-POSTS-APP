import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { Comment } from '../slices/commentsSlice'

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      )
      return response.data
    } catch {
      return rejectWithValue('Failed to fetch comments')
    }
  }
)
