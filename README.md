# Kaustubh Sen — Portfolio

A full-stack personal portfolio site with 3D animations, an Express API backend, and PostgreSQL database.

## Run & Operate

- `pnpm --filter @workspace/kaustubh-portfolio run dev` — run the portfolio frontend
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (not yet set; needed for DB features)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS 4, Framer Motion, Three.js / React Three Fiber
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec at `lib/api-spec/openapi.yaml`)
- Build: esbuild

## Where things live

- `artifacts/kaustubh-portfolio/` — React/Vite frontend
- `artifacts/api-server/` — Express API backend
- `artifacts/mockup-sandbox/` — design/mockup sandbox (Vite)
- `lib/db/` — shared Drizzle ORM schema
- `lib/api-spec/` — OpenAPI spec (source of truth for API contract)
- `lib/api-client-react/` — generated React Query hooks (from Orval)
- `lib/api-zod/` — generated Zod schemas (from Orval)

## Architecture decisions

- Three.js 3D scenes are wrapped in `WebGLErrorBoundary` throughout — they gracefully fall back to a CSS gradient in GPU-less environments.
- The portfolio plays a 14-second cinematic intro animation on every page load.

## Gotchas

- The preview will look black for ~14 seconds on first load — that's the intro animation, not a bug.
- WebGL / Three.js 3D scenes will not render if there's no GPU — the dark gradient fallback is intentional.
- `DATABASE_URL` must be set before any DB-backed API routes will work. Run `pnpm --filter @workspace/db run push` after setting it.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
