import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './slices/userSlice'
import postsReducer from './slices/postsSlice'
import commentsReducer from './slices/commentsSlice'

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
})

export default rootReducer
