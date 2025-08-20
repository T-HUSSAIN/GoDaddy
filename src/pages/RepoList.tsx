import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRepos, type Repo } from '../api/github'

export default function RepoList() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let isCancelled = false
    fetchRepos()
      .then((data) => { if (!isCancelled) setRepos(data) })
      .catch((e) => { if (!isCancelled) setError(e.message) })
    return () => { isCancelled = true }
  }, [])

  const filtered = useMemo(() => {
    if (!repos) return []
    const q = query.toLowerCase()
    return repos.filter(r => r.name.toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q))
  }, [repos, query])

  if (error) {
    return <div role="alert">Failed to load repositories: {error}</div>
  }
  if (!repos) {
    return <div>Loading repositories…</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem', alignItems: 'center' }}>
        <input
          aria-label="Search repositories"
          placeholder="Search repositories"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: '0.6rem 0.8rem', borderRadius: 8, border: '1px solid #444' }}
        />
        <div style={{ opacity: 0.8 }}>{filtered.length} of {repos.length}</div>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {filtered.map(repo => (
          <li key={repo.id} style={{ border: '1px solid #333', borderRadius: 12, padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'start' }}>
              <Link to={`/repo/${repo.name}`} style={{ fontWeight: 700, fontSize: '1.05rem' }}>{repo.name}</Link>
              <span aria-label="stars" title="Stars"> {repo.stargazers_count}</span>
            </div>
            <p style={{ margin: '0.5rem 0 0.75rem', opacity: 0.9 }}>{repo.description || 'No description'}</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.9rem', opacity: 0.9 }}>
              {repo.language && <span> {repo.language}</span>}
              <span>{repo.forks_count}</span>
              <span>{repo.watchers_count}</span>
              <span>{repo.open_issues_count} open issues</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
} 