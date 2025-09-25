# Mentora-Client

Vite + React + Tailwind client for Mentora backend.

## Setup

1. Copy `.env.example` to `.env` and set `VITE_API_URL` (default http://localhost:4000/api).
2. Install deps: `npm install`
3. Start dev: `npm run dev`

## Structure

```
src/
  components/
  pages/
  features/
  redux/
    store.js
    slices/
      authSlice.js
      coursesSlice.js
      reviewsSlice.js
  utils/
    api.js
```
