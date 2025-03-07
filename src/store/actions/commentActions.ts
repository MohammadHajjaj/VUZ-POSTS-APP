import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await axios.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    )
    return response.data
  }
)
