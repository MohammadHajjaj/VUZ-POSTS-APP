import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { Post } from '../slices/postsSlice'

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetchPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      )
      return response.data
    } catch {
      return rejectWithValue('Failed to fetch posts')
    }
  }
)
