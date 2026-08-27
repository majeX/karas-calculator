# CLAUDE.md - Karas Calculator

React + TypeScript (CRA) tool that finds multiplier combinations reaching a
target point total. Deployed to GitHub Pages.

## Commands

Package manager is **bun**.

- `bun run test` — run Jest. IMPORTANT: never `bun test`; bun's own runner
  ignores the jsdom config and dies with `document is not defined`.
- `bunx tsc` — typecheck (`noEmit` is already set in tsconfig)
- `bun run start` — dev server
- `bun run build` — production build
- `bun run deploy` — build + publish to gh-pages

## Calculation engine

- `src/calculate-new.ts` is the only engine. Native integers, no BigNumber.
- `src/calculate-legacy.ts` is dead code kept for reference — nothing imports
  it. It still uses `bignumber.js`. Never import from it, and never add a new
  `bignumber.js` import; float division there caused the precision bugs the
  rewrite fixed.
- `src/calculateSimple.ts` is live — `Results/AllWithTabs.tsx` uses it.
- `src/calculate.test.ts` covers the current engine.
- Keep the engine free of React imports; shared types live in
  `src/types/calculation-types.ts`.

## Conventions

- TypeScript strict mode, 2-space indent, functional components with hooks.
- Match the style of the file you're editing.

## Before reporting work complete

Run `bunx tsc`, then `bun run test`, and show me the output. Don't claim a
task is done on the basis of code that hasn't been through both. A pre-commit
hook enforces this, but don't wait for it to catch you.
