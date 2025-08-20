import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchRepo, fetchRepoLanguages, type Repo } from '../api/github'

export default function RepoDetail() {
  const { name = '' } = useParams<{ name: string }>()
  const [repo, setRepo] = useState<Repo | null>(null)
  const [languages, setLanguages] = useState<string[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!name) return
    let isCancelled = false
    Promise.all([fetchRepo(name), fetchRepoLanguages(name)])
      .then(([r, langs]) => { if (!isCancelled) { setRepo(r); setLanguages(langs) } })
      .catch((e) => { if (!isCancelled) setError(e.message) })
    return () => { isCancelled = true }
  }, [name])

  if (error) {
    return <div role="alert">Failed to load repo: {error}</div>
  }
  if (!repo) {
    return <div>Loading…</div>
  }

  const watchers = repo.subscribers_count ?? repo.watchers_count

  return (
    <article>
      <Link to="/">← Back to list</Link>
      <h1 style={{ marginTop: '0.5rem' }}>{repo.name}</h1>
      <p style={{ marginTop: '0.25rem', opacity: 0.9 }}>{repo.description || 'No description'}</p>

      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <tbody>
            <Row label="Title" value={repo.name} />
            <Row label="Description" value={repo.description || 'No description'} />
            <Row label="Repository Link" value={<a href={repo.html_url} target="_blank" rel="noreferrer">{repo.html_url}</a>} />
            <Row label="Primary Language" value={repo.language || 'Unknown'} />
            <Row label="Languages" value={languages && languages.length > 0 ? (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {languages.map((lang) => (
                  <span key={lang} style={{ border: '1px solid #444', padding: '0.25rem 0.5rem', borderRadius: 999 }}>{lang}</span>
                ))}
              </div>
            ) : 'No languages reported'} />
            <Row label="Forks" value={String(repo.forks_count)} />
            <Row label="Open Issues" value={String(repo.open_issues_count)} />
            <Row label="Watchers" value={String(watchers)} />
          </tbody>
        </table>
      </div>
    </article>
  )
}

function Row({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <tr>
      <th style={{ textAlign: 'left', padding: '0.75rem 0.75rem 0.75rem 0', borderBottom: '1px solid #333', width: 220, verticalAlign: 'top' }}>{label}</th>
      <td style={{ padding: '0.75rem 0', borderBottom: '1px solid #333' }}>{value}</td>
    </tr>
  )
} 