import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RepoList from './pages/RepoList.tsx'
import RepoDetail from './pages/RepoDetail.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<RepoList />} />
          <Route path="repo/:name" element={<RepoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
