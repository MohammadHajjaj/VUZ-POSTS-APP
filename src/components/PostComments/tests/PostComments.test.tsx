import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import commentReducer from '../../../store/slices/commentsSlice'
import PostComments from '..'

jest.mock('../../../store/actions/commentActions', () => {
  const dummyComments = [
    {
      id: 1,
      postId: 101,
      name: 'Alice',
      email: 'alice@example.com',
      body: 'Nice post!',
    },
    {
      id: 2,
      postId: 101,
      name: 'Bob',
      email: 'bob@example.com',
      body: 'Great article!',
    },
  ]

  type DispatchType = (action: {
    type: string
    payload?: unknown
    meta?: unknown
  }) => void

  interface FetchCommentsMock {
    (postId: number): (dispatch: DispatchType) => Promise<typeof dummyComments>
    pending: { type: string }
    fulfilled: { type: string }
    rejected: { type: string }
  }

  const fetchComments = jest.fn((postId: number) => {
    return async (dispatch: DispatchType) => {
      dispatch({
        type: fetchComments.fulfilled.type,
        payload: dummyComments,
        meta: { arg: postId },
      })
      return dummyComments
    }
  }) as unknown as FetchCommentsMock

  fetchComments.pending = { type: 'comments/fetchComments/pending' }
  fetchComments.fulfilled = { type: 'comments/fetchComments/fulfilled' }
  fetchComments.rejected = { type: 'comments/fetchComments/rejected' }

  return { fetchComments }
})

describe('PostComments Component', () => {
  const dummyComments = [
    {
      id: 1,
      postId: 101,
      name: 'Alice',
      email: 'alice@example.com',
      body: 'Nice post!',
    },
    {
      id: 2,
      postId: 101,
      name: 'Bob',
      email: 'bob@example.com',
      body: 'Great article!',
    },
  ]

  const mockStore = configureStore({
    reducer: { comments: commentReducer },
    preloadedState: {
      comments: {
        comments: {
          101: dummyComments,
        },
        loading: false,
        error: null,
      },
    },
  })

  test('renders Comments section title', async () => {
    render(
      <Provider store={mockStore}>
        <PostComments postId={101} />
      </Provider>
    )
    await screen.findByText('Comments')
  })

  test('renders all comments', async () => {
    render(
      <Provider store={mockStore}>
        <PostComments postId={101} />
      </Provider>
    )

    // Wait for any loader to disappear
    await waitFor(() =>
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    )

    // Check that our dummy comments are rendered
    expect(await screen.findByText(/Nice post!/i)).toBeInTheDocument()
    expect(await screen.findByText(/Great article!/i)).toBeInTheDocument()
  })

  test('displays error message on failure', () => {
    const errorStore = configureStore({
      reducer: { comments: commentReducer },
      preloadedState: {
        comments: {
          comments: {},
          loading: false,
          error: 'Failed to load comments.',
        },
      },
    })

    render(
      <Provider store={errorStore}>
        <PostComments postId={101} />
      </Provider>
    )

    expect(screen.getByText(/Failed to load comments/i)).toBeInTheDocument()
  })
})
