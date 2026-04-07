# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js App Router project. Main routes live in `app/`, with the landing page in `app/page.tsx`, shared layout in `app/layout.tsx`, and global styles in `app/globals.css`.

Reusable UI lives in `components/`. Keep generic primitives in `components/ui/` and page-specific display components alongside the existing feature components such as `CountUp.jsx` and `ThemeToggle.tsx`. Shared helpers belong in `lib/`, currently `lib/utils.ts` for class merging. Static assets go in `public/`. Reference docs and content notes live in `docs/`. Utility scripts belong in `scripts/`.

## Build, Test, and Development Commands
- `bun install`: install dependencies.
- `bun run dev`: start the local Next.js dev server with Turbopack.
- `bun run build`: create the production build.
- `bun run start`: serve the production build locally.
- `bun run lint`: run ESLint across the repo.
- `bun run typecheck`: run `tsc --noEmit`; use this explicitly because builds currently ignore TypeScript errors in `next.config.mjs`.
- `bun run format`: format `*.ts` and `*.tsx` files with Prettier.
- `bun run to:webp`: convert image assets with `scripts/convert-to-webp.mjs` using the Bun-managed toolchain.

## Coding Style & Naming Conventions
Use 2-space indentation, no semicolons, double quotes, and trailing commas where valid ES5 syntax allows them. Prettier and `prettier-plugin-tailwindcss` define the source of truth for formatting and Tailwind class order.

Prefer `@/` imports over deep relative paths. Use `PascalCase` for React component files, `camelCase` for utilities, and keep CSS files paired with their component when a component already follows that pattern, for example `GridMotion.jsx` and `GridMotion.css`.

## Testing Guidelines
There is no automated test suite configured yet. Until one is added, every change should pass `bun run lint` and `bun run typecheck`, plus manual verification in `bun run dev`.

If you add tests, place them in `tests/` or next to the feature as `*.test.ts(x)`, and document the new command in `package.json`.

## Commit & Pull Request Guidelines
Follow the existing Conventional Commit style from history: `feat(page): ...`, `fix(theme): ...`, `refactor(ui): ...`, `chore: ...`. Keep scopes short and tied to the affected area.

PRs should include a short description, the reason for the change, before/after screenshots for UI work, and a brief verification note listing the commands run.
