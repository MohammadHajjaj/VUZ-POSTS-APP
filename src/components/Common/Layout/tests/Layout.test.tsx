import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Layout from '..'

describe('Layout Component', () => {
  test('renders layout container', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    )

    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  test('displays back link when not on home route', () => {
    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('← Back to Users')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '← Back to Users' })
    ).toHaveAttribute('href', '/')
  })

  test('does not display back link on home route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByText('← Back to Users')).not.toBeInTheDocument()
  })

  test('renders children inside Outlet', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<p>Child Component</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Child Component')).toBeInTheDocument()
  })
})
