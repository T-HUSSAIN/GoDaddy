import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import RepoList from '../pages/RepoList'

vi.mock('../api/github', () => ({
  fetchRepos: vi.fn().mockResolvedValue([
    { id: 1, name: 'alpha', full_name: 'godaddy/alpha', description: 'first', html_url: 'x', language: 'TS', forks_count: 1, open_issues_count: 2, watchers_count: 3, stargazers_count: 10 },
    { id: 2, name: 'beta', full_name: 'godaddy/beta', description: 'second', html_url: 'x', language: 'JS', forks_count: 0, open_issues_count: 0, watchers_count: 1, stargazers_count: 5 }
  ])
}))

function renderWithRouter(ui: React.ReactNode) {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={ui} />
      </Routes>
    </MemoryRouter>
  )
}

describe('RepoList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders repos and filters via search', async () => {
    renderWithRouter(<RepoList />)

    await waitFor(() => {
      expect(screen.getByText('alpha')).toBeInTheDocument()
      expect(screen.getByText('beta')).toBeInTheDocument()
    })

    await userEvent.type(screen.getByLabelText(/search repositories/i), 'alp')

    expect(screen.getByText('alpha')).toBeInTheDocument()
    expect(screen.queryByText('beta')).not.toBeInTheDocument()
  })
}) 