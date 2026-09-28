# Ceremoni

Ceremoni is a Nigerian event-vendor marketplace prototype with a supervised AI concierge.

## Concierge setup

The concierge is served from `api/concierge/chat.js`, so the Gemini key never reaches the browser.

1. Copy `.env.example` to `.env` for local server configuration.
2. Set `GEMINI_API_KEY` in the Vercel project environment variables for deployed environments.
3. Run the app through Vercel's local development environment when testing the concierge endpoint; the Vite dev server alone does not run `/api` functions.

The current concierge is deliberately supervised: customers must review quote requests before sending, and vendors must edit or approve AI-generated replies before they are sent. The project still uses local mock data; database persistence and authentication are the next production steps.

## Node.js backend

The project now includes a dependency-free Node.js API in `server/index.js`. It provides vendor catalogue, quote-request, concierge, and support-handoff endpoints. Its local JSON store is created automatically at `server/data/database.json` and is intentionally ignored by Git.

Run these commands in separate terminals:

```bash
npm run server
npm run dev
```

Vite proxies `/api` requests to `http://localhost:3001` during local development. The API's development users are identified by `X-Ceremoni-User-Id` (for example, `u001`, `vendor-v001`, or `admin-001`). Replace this temporary development identity mechanism with real session authentication before a public deployment.

The old `VITE_GEMINI_API_KEY` should be removed from local frontend configuration and rotated if it has been used. Set only `GEMINI_API_KEY` in the Node server or deployment environment.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
