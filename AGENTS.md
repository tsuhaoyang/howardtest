## Cursor Cloud specific instructions

This repository contains **DesignPattern.ai**, a Next.js 16 (App Router) interactive design pattern encyclopedia located in the `designpattern-ai/` subdirectory.

### Services

| Service | Command | Port |
|---------|---------|------|
| Next.js dev server | `npm run dev` (from `designpattern-ai/`) | 3000 |

### Key commands

- **Dev**: `npm run dev` — starts Next.js dev server with Turbopack
- **Build**: `npm run build` — production build
- **Lint**: `npm run lint` — runs ESLint
- All commands run from `designpattern-ai/`.

### Caveats

- Uses `next-mdx-remote/rsc` (RSC approach) for MDX rendering; do NOT use the legacy `serialize` + client `MDXRemote` approach, as it fails with React 19.
- Dark mode is enforced via `className="dark"` on the `<html>` element in `layout.tsx`.
- Pattern content lives in `src/content/*.mdx` with gray-matter frontmatter; new patterns auto-appear in sidebar/dashboard.
- Interactive visualizers are in `src/components/visualizer/` and registered in `pattern-visualizer.tsx`.
