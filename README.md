# Flint

A small design system built on [shadcn/ui](https://ui.shadcn.com) with
[Base UI](https://base-ui.com) primitives, Tailwind CSS v4,
and [DTCG](https://tr.designtokens.org/format/) design tokens compiled with
[Terrazzo](https://terrazzo.app).

## Token pipeline

```
DTCG JSON  ──►  Terrazzo  ──►  CSS custom properties  ──►  Tailwind @theme  ──►  shadcn components
(packages/tokens/src)          (dist/tokens.css)          (ui globals.css)      (bg-primary, ...)
```

1. **`packages/tokens/src/*.json`** — tokens in DTCG format (`$type`, `$value`,
   `{alias.references}`). `primitives.json` holds the raw palette/scale,
   `semantic.json` holds the shadcn-shaped semantic aliases (`background`,
   `primary`, `ring`, ...) with light/dark values declared per token via
   `$extensions.mode`.
2. **`packages/tokens/terrazzo.config.js`** — Terrazzo emits a single
   `dist/tokens.css`: defaults + light mode in `:root`, dark mode scoped to
   `.dark` (see `modeSelectors`), aliases preserved as `var()` references.
3. **`packages/ui/src/styles/globals.css`** — imports the generated CSS and maps
   `--flint-*` variables into Tailwind's theme namespace via `@theme inline`,
   extending/overriding Tailwind defaults (`--color-*`, `--radius-*`, `--font-*`).
4. **`packages/ui/src/components/*`** — shadcn components (Button, Badge, Card,
   Input, Label) consume the semantic utilities (`bg-primary`,
   `text-muted-foreground`, `rounded-md`, ...).

## Workspace layout

| Package            | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `@flint/tokens`    | DTCG tokens + Terrazzo build                   |
| `@flint/ui`        | shadcn components, Tailwind v4 theme wiring    |
| `@flint/storybook` | Storybook 9 docs with light/dark theme toolbar |

## Usage

```sh
pnpm install
pnpm build        # builds tokens, then the static Storybook
pnpm dev          # starts Storybook at http://localhost:6006
```

Change a value in `packages/tokens/src/*.json`, run
`pnpm --filter @flint/tokens build`, and every component picks it up —
no component code changes needed.
