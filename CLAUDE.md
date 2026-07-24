# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm install
pnpm build                          # builds all packages: tokens first, then Storybook
pnpm dev                            # Storybook at http://localhost:6006
pnpm --filter @flint/tokens build   # regenerate dist/tokens.css (runs `tz build`)
pnpm --filter @flint/storybook build
```

No test runner, linter, or typecheck script is configured. `pnpm build` (which runs the TS/Vite build under Storybook) is the closest thing to a check.

## Architecture

pnpm workspace monorepo (`packages/*`, `apps/*`). Three packages form a one-directional token pipeline — nothing loops back:

```
DTCG JSON  →  Terrazzo  →  CSS custom properties  →  Tailwind @theme  →  shadcn components
@flint/tokens/src          @flint/tokens/dist         @flint/ui globals.css   @flint/ui components
```

**`@flint/tokens`** — design tokens as DTCG JSON (`$type`/`$value`/`{alias.references}`). `primitives.json` = raw palette/scale; `semantic.json` = shadcn-shaped aliases (`background`, `primary`, `ring`, ...) with light/dark declared per token via `$extensions.mode`. `terrazzo.config.js` compiles both into one `dist/tokens.css`: light in `:root`, dark scoped to `.dark` (`modeSelectors`). Every variable is prefixed `--flint-` (dots become dashes).

**`@flint/ui`** — shadcn components on Base UI primitives (`@base-ui/react`), Tailwind v4. `src/styles/globals.css` imports `@flint/tokens/css` then maps `--flint-*` into Tailwind's theme namespace via `@theme inline` (`--color-primary: var(--flint-color-primary)`, etc.), which is what makes `bg-primary`/`text-muted-foreground`/`rounded-md` resolve. Components use `cva` for variants and the `cn()` helper (`src/lib/utils.ts`, clsx + tailwind-merge). No build step — package exports raw `.tsx`/`.css`/`.ts` via subpath exports; consumers compile them.

**`@flint/storybook`** — Storybook 9/10 + react-vite. Tailwind runs through `@tailwindcss/vite` injected in `.storybook/main.ts` `viteFinal`. Light/dark toggle via `withThemeByClassName` (`.storybook/preview.tsx`) applying the `.dark` class the tokens depend on.

## Working with tokens vs components

- **Change a color/radius/font value** → edit `packages/tokens/src/*.json`, run `pnpm --filter @flint/tokens build`. Every component picks it up; no component edits needed. `dist/` is generated — never hand-edit `tokens.css`.
- **Add a new semantic color** → add the token in `semantic.json` (with `$extensions.mode` light/dark), rebuild, then add the matching `--color-*: var(--flint-*)` line in `globals.css` `@theme inline` so Tailwind exposes the utility.
- Dark mode is class-based (`.dark`), driven by `@custom-variant dark` in globals.css. Components use `dark:` variants for overrides beyond raw token swaps.
- shadcn config lives in `packages/ui/components.json` (style `base-nova`, base color neutral, lucide icons, `@/components` + `@/lib` aliases). React 19; `rsc: false`.
