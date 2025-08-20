# GoDaddy Repositories Explorer

A small app that lists GoDaddy GitHub repositories and shows details for each repo.

## Features

- Repository list with search and quick stats
- Detail page with title, description, link to GitHub, languages, forks, open issues, watchers

## Getting started

Requirements:
- Node 18+

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Build for production:

```bash
npm run build
npm run preview
```


## Project structure

```
src/
  api/github.ts          # Fetch helpers and types
  pages/RepoList.tsx     # List with search
  pages/RepoDetail.tsx   # Detail view with stats and languages
  __tests__/             # Unit tests
```
