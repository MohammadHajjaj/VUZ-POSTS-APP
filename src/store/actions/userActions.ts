import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface User {
  id: number
  name: string
  username: string
  email: string
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )
  return response.data
})
