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
- **AI SDK v6 breaking changes**: Uses `@ai-sdk/react` `useChat` with `DefaultChatTransport` (not the old `api` prop). Messages use `UIMessage` type with `parts` array (no `content` field). Streaming uses `toUIMessageStreamResponse()` (not `toDataStreamResponse`). Must use `convertToModelMessages()` in the API route to convert UIMessages before passing to `streamText`.
- **AI Chat** requires `OPENAI_API_KEY` in `.env.local` with sufficient quota. The chat gracefully handles missing keys, quota errors, and connection failures.
- **AI SDK v6 error handling**: Error objects from `useChat` and OpenAI may contain nested objects (not plain strings). Always use `String()` and type checks before rendering error values in JSX.
