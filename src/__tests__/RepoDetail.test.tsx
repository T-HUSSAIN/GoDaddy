import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import RepoDetail from '../pages/RepoDetail'

vi.mock('../api/github', () => ({
  fetchRepo: vi.fn().mockResolvedValue({ id: 1, name: 'alpha', full_name: 'godaddy/alpha', description: 'first', html_url: 'https://github.com/godaddy/alpha', language: 'TS', forks_count: 1, open_issues_count: 2, watchers_count: 3, subscribers_count: 7, stargazers_count: 10 }),
  fetchRepoLanguages: vi.fn().mockResolvedValue(['TypeScript', 'JavaScript'])
}))

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/repo/:name" element={<RepoDetail />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('RepoDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders repo detail and languages', async () => {
    renderAt('/repo/alpha')

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'alpha' })).toBeInTheDocument()
    })

    expect(screen.getByRole('cell', { name: 'first' })).toBeInTheDocument()

    expect(screen.getByText('Primary Language')).toBeInTheDocument()
    expect(screen.getByText('Forks')).toBeInTheDocument()
    expect(screen.getByText('Open Issues')).toBeInTheDocument()
    expect(screen.getByText('Watchers')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
    })
  })
}) 