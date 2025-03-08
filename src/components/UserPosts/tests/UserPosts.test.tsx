import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../../../store/slices/postsSlice'
import commentReducer from '../../../store/slices/commentsSlice'
import UserPosts from '..'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../../../store/actions/postActions', () => {
  const dummyPosts = [
    { id: 101, title: 'Test Post 1', body: 'Body of Post 1', userId: 1 },
    { id: 102, title: 'Test Post 2', body: 'Body of Post 2', userId: 1 },
  ]

  type DispatchType = (action: {
    type: string
    payload?: unknown
    meta?: unknown
  }) => void

  interface FetchPostsMock {
    (userId: number): (dispatch: DispatchType) => Promise<typeof dummyPosts>
    pending: { type: string }
    fulfilled: { type: string }
    rejected: { type: string }
  }

  const fetchPosts = jest.fn((userId: number) => {
    return async (dispatch: DispatchType) => {
      dispatch({
        type: fetchPosts.fulfilled.type,
        payload: dummyPosts,
        meta: { arg: userId },
      })
      return dummyPosts
    }
  }) as unknown as FetchPostsMock

  fetchPosts.pending = { type: 'posts/fetchPosts/pending' }
  fetchPosts.fulfilled = { type: 'posts/fetchPosts/fulfilled' }
  fetchPosts.rejected = { type: 'posts/fetchPosts/rejected' }

  return { fetchPosts }
})

describe('UserPosts Component', () => {
  const dummyPosts = [
    { id: 101, title: 'Test Post 1', body: 'Body of Post 1', userId: 1 },
    { id: 102, title: 'Test Post 2', body: 'Body of Post 2', userId: 1 },
  ]

  const mockStore = configureStore({
    reducer: { posts: postReducer, comments: commentReducer },
    preloadedState: {
      posts: {
        posts: {
          1: dummyPosts,
        },
        loading: false,
        error: null,
      },
      comments: {
        comments: {
          101: [
            {
              id: 1,
              name: 'Alice',
              email: 'alice@example.com',
              body: 'Nice post!',
              postId: 101,
            },
            {
              id: 2,
              name: 'Bob',
              email: 'bob@example.com',
              body: 'Great article!',
              postId: 101,
            },
          ],
        },
        loading: false,
        error: null,
      },
    },
  })

  test('renders User Posts title', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <UserPosts userId={1} />
        </BrowserRouter>
      </Provider>
    )
    await screen.findByText('User Posts')
  })

  test('renders all posts', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <UserPosts userId={1} />
        </BrowserRouter>
      </Provider>
    )

    await waitFor(() =>
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    )

    expect(await screen.findByText(/Test Post 1/i)).toBeInTheDocument()
    expect(await screen.findByText(/Test Post 2/i)).toBeInTheDocument()
  })

  test('displays error message on failure', async () => {
    const errorStore = configureStore({
      reducer: { posts: postReducer, comments: commentReducer },
      preloadedState: {
        posts: {
          posts: {},
          loading: false,
          error: 'Failed to load posts.',
        },
        comments: {
          comments: {},
          loading: false,
          error: null,
        },
      },
    })

    render(
      <Provider store={errorStore}>
        <BrowserRouter>
          <UserPosts userId={1} />
        </BrowserRouter>
      </Provider>
    )

    expect(await screen.findByText(/Failed to load posts/i)).toBeInTheDocument()
  })
})
