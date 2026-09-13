# Final-ipmat — UI build stack

This repo is set up as a foundation for building an app with a large set of UI
component libraries, AI design skills, and the 21st.dev MCP server all installed
and wired together.

The app lives in [`app/`](./app) (Next.js 16 + React 19 + Tailwind CSS v4 +
shadcn/ui). Run it with:

```bash
cd app
npm install      # already installed in this repo
npm run dev      # http://localhost:3000
```

---

## What's installed

### 1. Component libraries (shadcn registries)

Each library is registered in [`app/components.json`](./app/components.json) under
`registries`, so you can pull any component with the shadcn CLI once you're on a
normal network:

| Library | Namespace | Add a component |
| --- | --- | --- |
| [Magic UI](https://magicui.design) | `@magicui` | `npx shadcn@latest add @magicui/marquee` |
| [SmoothUI](https://smoothui.dev) | `@smoothui` | `npx shadcn@latest add @smoothui/siri-orb` |
| [Neobrutalism](https://neobrutalism.com) | `@neobrutalism` / `@neobrutalism-base` / `@neobrutalism-radix` | `npx shadcn@latest add @neobrutalism-base/button` |
| [motion-primitives](https://motion-primitives.com) | `@motion-primitives` | `npx shadcn@latest add @motion-primitives/text-effect` |
| [unlumen UI](https://ui.unlumen.com) | `@unlumen` | `npx shadcn@latest add @unlumen/button` |
| [21st.dev](https://21st.dev) | `@21st` (+ MCP) | via MCP, see below |

> **Components are also vendored.** Because the component CDNs are not reachable
> from the build sandbox, the real source for every free component was copied
> from each project's published registry into `app/src/components/`:
>
> - `app/src/components/magicui/` — 78 Magic UI components
> - `app/src/components/smoothui/` — 131 SmoothUI components
> - `app/src/components/retroui/` — 35 Neobrutalism components
> - `app/src/components/motion-primitives/` — 33 motion-primitives components
> - `app/src/components/unlumen-ui/` — 30 unlumen UI primitives
> - `app/src/components/ui/` — 55 base shadcn/ui primitives (button, card, dialog…)
>
> These are ready to import right now, e.g. `import { Marquee } from
> "@/components/magicui/marquee"`. See `app/src/app/page.tsx` for a live showcase.
> When you're on a normal network you can also just use the `npx shadcn add`
> commands above to fetch fresh copies.

### 2. AI skills — UI/UX Pro Max

The [`nextlevelbuilder/ui-ux-pro-max`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
skill pack (7 skills) is installed into [`.claude/skills/`](./.claude/skills):

```
.claude/skills/ui-ux-pro-max/     # orchestrator, routes design requests
.claude/skills/ui-styling/        # Tailwind config, shadcn/ui, design system
.claude/skills/design/            # logo, icon, social, slides, banners
.claude/skills/design-system/     # token architecture, token validation
.claude/skills/brand/             # brand guidelines, palette, typography
.claude/skills/slides/            # HTML slide templates
.claude/skills/banner-design/     # ad banner sizes and creatives
```

Agents that read `.claude/skills/` (Claude Code, and via the CLI: Cursor,
Windsurf, Codex, Gemini, etc.) pick these up automatically. To install for a
different assistant later:

```bash
npx ui-ux-pro-max-cli init --ai cursor     # or windsurf, codex, gemini, all…
```

### 3. MCP servers

[`.mcp.json`](./.mcp.json) configures two MCP servers:

- **21st** — `https://21st.dev/api/mcp`, authenticated with the provided
  `x-api-key`. Exposes `search`, `get_component`, and the rest of the 21st.dev
  tools. Any MCP client that speaks streamable HTTP can read this file.
- **shadcn** — the local shadcn MCP server (`npx shadcn@latest mcp`), which lets
  an assistant browse/search/install components from every registry above.

Raw usage of the 21st endpoint (no client needed):

```bash
curl -X POST https://21st.dev/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "x-api-key: 21st_sk_…" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

`Authorization: Bearer <key>` works too. To point Claude Code at it locally:

```bash
npx shadcn@latest mcp init --client claude
```

### 4. Web apps referenced in the request

Two items in the request are hosted web apps rather than installable packages,
so they can't be "installed" into the repo — they're used from the browser and
their output is dropped into `app/`:

- **[Haikei](https://app.haikei.app/)** — generate SVG/PNG backgrounds (blobs,
  waves, gradients, mesh) in the app, export them, and drop the files into
  `app/public/`, then reference them from your components.
- **[Manus](https://manus.im/app)** — a hosted AI agent app; sign in in the
  browser to use it. Nothing to install locally.

---

## Notes on the sandbox build

The environment this was assembled in only had network access to npm and GitHub.
The component registry CDNs (`magicui.design`, `smoothui.dev`,
`neobrutalism.com`, `motion-primitives.com`, `ui.unlumen.com`), `21st.dev`,
`ui.shadcn.com`, and Google Fonts were all blocked. Consequences:

- Components were vendored from GitHub clones instead of `shadcn add` over the
  network (identical source).
- Google `next/font` was swapped for a system font stack so the app builds
  offline. Re-enable Geist with `next/font/google` on a normal network if you
  want it.
- The vendored library source is copied verbatim and doesn't type-check strictly
  against the very latest peer versions, so `typescript.ignoreBuildErrors` is set
  in `app/next.config.ts` (standard for copied component-library source). The app
  builds and runs cleanly.
