import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../actions/userActions'

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
}

interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load users'
      })
  },
})

export default usersSlice.reducer
