# craig-stevenson-site

Personal site for Craig Stevenson, built with [Astro](https://astro.build). Content-first: the site exists to showcase projects and publish articles, not to be a JavaScript application.


## Vision & goals

- **Audience:** people who want to understand who Craig is, what he's built, and what he thinks about — recruiters, collaborators, fellow practitioners.
- **Tone:** considered, personal, not corporate. First-person prose.
- **Success looks like:** loads fast on any connection, reads cleanly on mobile, easy to add a new article or project without ceremony.
- **Non-goals:** SaaS-style auth, dashboards, anything that needs a backend beyond static hosting.

## Tech stack

- **Framework:** Astro (TypeScript)
- **Language:** TypeScript everywhere (`.astro`, `.ts`, `.tsx` if React islands are ever needed)
- **Package manager:** npm (default — switch and update here if that changes)
- **Styling:** Tailwind CSS via `@astrojs/tailwind`. Use utility classes; reach for a component or `@apply` only when a pattern is genuinely reused.
- **Deploy target:** Cloudflare Pages. Build command `npm run build`, output directory `dist/`.
- **Node version:** Node 22 (current LTS). Pin via `.nvmrc` containing `22`.
- **Analytics:** Cloudflare Web Analytics (free, cookieless, zero-config alongside Pages).

## Project structure

Follow the standard Astro layout:

```
src/
  pages/           # routes — each .astro file becomes a URL
  layouts/         # shared page shells (Base.astro, PostLayout.astro, etc.)
  components/      # reusable UI pieces
  content/         # content collections (see below)
    articles/      # articles as .md / .mdx
    projects/      # project entries as .md / .mdx
  styles/          # global CSS (if not using a utility framework)
public/            # static assets served as-is (favicons, OG images, downloads)
astro.config.mjs
tsconfig.json
```

Keep `src/pages` thin — pages compose layouts and components rather than holding logic.

## Content conventions

Use Astro **content collections** for both articles and projects. Define schemas in `src/content/config.ts` so frontmatter is validated.

**Article frontmatter (minimum):**
```yaml
---
title: "Article title"
description: "One-sentence summary used for previews and meta tags"
date: 2026-05-24
draft: false
tags: [astro, web]
---
```

**Project entry frontmatter (minimum):**
```yaml
---
title: "Project name"
description: "What it is in one line"
date: 2026-05-24
role: "What Craig did"
url: "https://..."     # optional
repo: "https://..."    # optional
---
```

Articles and projects are sorted by `date` (newest first). Anything with `draft: true` is excluded from production builds.

## Coding conventions

- Prefer `.astro` components for anything that doesn't need client-side interactivity — they ship zero JS.
- Reach for React/Svelte/Vue islands only when interactivity genuinely requires it, and use Astro's `client:*` directives narrowly (`client:visible` or `client:idle` over `client:load`).
- Type everything. No `any` without a comment explaining why.
- Keep components small and named after what they render (`ArticleCard.astro`, not `Card.astro`).
- Co-locate styles inside `.astro` files unless they're truly global.

## Workflow

- **Dev server:** `npm run dev` (Astro defaults to `http://localhost:4321`)
- **Build:** `npm run build` → outputs to `dist/`
- **Preview build locally:** `npm run preview`
- **Type check:** `npm run astro check` before pushing
- Commit small, descriptive changes. Drafts can be committed with `draft: true`.

## Decisions log

Settled choices, kept here so the rationale doesn't get lost:

- **Styling:** Tailwind CSS
- **Deploy target:** Cloudflare Pages
- **Node version:** 22 (LTS), pinned via `.nvmrc`
- **Analytics:** Cloudflare Web Analytics
- **Comments on articles:** none — readers can reach Craig via email/social
- **RSS feed:** no
- **Custom domain:** `craig-stevenson.com`
