import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { User } from '../slices/userSlice'

export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )
      return response.data
    } catch {
      return rejectWithValue('Failed to fetch users')
    }
  }
)
