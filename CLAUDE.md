# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm start          # Dev server on localhost:3000
npm run build      # Production build
npm run build:qa   # QA build (uses .env.qa API endpoint)
npm test           # Jest test runner (watch mode)
```

## Architecture

This is a **React 19 + TypeScript** single-page application for "New Dawn Counselling," built with Create React App.

**Key tech:** Tailwind CSS 3, Axios, Cloudflare Turnstile (CAPTCHA)

### Component Structure

- **App.tsx** — Root component containing all page sections (Header, Home, Welcome, Trauma, About Me, Why Counselling, Services, I Can Help With, Contact, Footer). Navigation uses hash-based smooth scrolling, not a router.
- **Contact.tsx** — Contact form with validation, Turnstile CAPTCHA, and Axios POST to backend API.

### API & Environment

Three environment configs control the API base URL (`REACT_APP_API_URL`):
- `.env` → local dev API (`http://10.98.10.174:8000`)
- `.env.qa` → `https://qa-api.nevelen.com`
- `.env.production` → `https://api.nevelen.com`

Contact form endpoint: `{API_URL}/clients/new_dawn/contact`

### Styling

- Tailwind with custom breakpoint `sm: 320px` and three custom font families (`trirong_reg`, `trirong_bold`, `trirong_light`) loaded from `src/assets/fonts/`
- Responsive: mobile-first with desktop at Tailwind's `md` (768px) breakpoint
- Images hosted externally on AWS S3 (`nev-web` bucket)
