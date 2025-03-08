import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../../../store/slices/userSlice'
import UserList from '..'
import { BrowserRouter } from 'react-router-dom'

describe('UserList Component', () => {
  const mockStore = configureStore({
    reducer: { users: userReducer },
    preloadedState: {
      users: {
        users: [
          {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'sincere@april.biz',
            phone: '1-770-736-8031',
          },
          {
            id: 2,
            name: 'Ervin Howell',
            username: 'Antonette',
            email: 'shanna@melissa.tv',
            phone: '010-692-6593',
          },
        ],
        loading: false,
        error: null,
      },
    },
  })

  test('renders Users title', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByText('Users')).toBeInTheDocument()
  })

  test('renders search input', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument()
  })

  test('renders all the users', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getAllByRole('link').length).toBe(2)
  })

  test('filters users when typing in search input', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    )

    const searchInput = screen.getByPlaceholderText('Search users...')
    fireEvent.change(searchInput, { target: { value: 'Leanne' } })

    expect(await screen.findByText(/Leanne Graham/i)).toBeInTheDocument()
  })

  test('displays error message on failure', async () => {
    const errorStore = configureStore({
      reducer: { users: userReducer },
      preloadedState: {
        users: {
          users: [],
          loading: false,
          error: 'Failed to load users.',
        },
      },
    })

    render(
      <Provider store={errorStore}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    )

    expect(await screen.findByText(/Failed to load users/i)).toBeInTheDocument()
  })
})
