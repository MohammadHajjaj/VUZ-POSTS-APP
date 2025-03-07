import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const response = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    )
    return response.data
  }
)
