import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <header style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700 }}>GoDaddy Repositories</Link>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://github.com/godaddy" target="_blank" rel="noreferrer">GitHub Org</a>
        </nav>
      </header>
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '1.5rem' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default App
