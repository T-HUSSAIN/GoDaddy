export type Repo = {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  forks_count: number
  open_issues_count: number
  watchers_count: number
  stargazers_count: number
  subscribers_count?: number
}

const BASE_URL = 'https://api.github.com'
const ORG = 'godaddy'

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function fetchRepos(): Promise<Repo[]> {
  const repos = await fetchJson<Repo[]>(`${BASE_URL}/orgs/${ORG}/repos?per_page=100`)
  return repos
    .filter(r => !r.name.startsWith('.'))
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
}

export async function fetchRepo(name: string): Promise<Repo> {
  return fetchJson<Repo>(`${BASE_URL}/repos/${ORG}/${name}`)
}

export async function fetchRepoLanguages(name: string): Promise<string[]> {
  const data = await fetchJson<Record<string, number>>(`${BASE_URL}/repos/${ORG}/${name}/languages`)
  return Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang)
}
