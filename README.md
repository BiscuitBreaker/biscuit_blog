# Biscuit Blog (BiscuitBreaker)

React + Next.js (App Router) blog with MDX content, Tailwind CSS, dark theme by default, and a playful minimal vibe.

- JS (no TypeScript)
- Tailwind + Typography, next-themes (dark default)
- MDX in `content/posts/*`
- Pages: `/`, `/blogs`, `/blogs/[slug]`, `/cooked-by-biscuit`, `/admin`
- Hidden admin with passphrase to generate MDX for download (no backend yet)

## Scripts
- `npm run dev` – start dev server
- `npm run build` – prod build
- `npm start` – run prod server

## Content
Add posts as `.mdx` under `content/posts/` with frontmatter:
```
---
title: My Post
slug: my-post
date: 2025-08-29
excerpt: Short description...
tags: ["note"]
author: BiscuitBreaker
cover: /images/cover.jpg
---
```

## Deploy
Connect to Vercel. Custom domain later.
 
## Deploy (Vercel)
1. Push this repo to GitHub.
2. Import to Vercel, select this project root.
3. Build command: `next build` (default); Output: `.next` (auto).
4. No env vars needed. Deploy.

## Auth (allowlist-only via magic link)
- Set these env vars in Vercel (or `.env.local` for dev):
	- `ALLOWLIST` – comma-separated emails allowed to log in (e.g., `a@b.com,c@d.com`)
	- `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD` – SMTP creds
	- `EMAIL_FROM` – from address (e.g., `BiscuitBlog <no-reply@yourdomain>`)
	- Optional: `PREVIEW_SECRET` to override default
- Pages: `/login`, `/login/verify`, `/login/error`
- All other routes are protected by middleware; visitors must be signed in.

## Roadmap (non-visual)
- Tags & archives pages
- RSS/JSON feeds
- Dynamic OG images
- Draft/Preview mode
- About & Contact pages
- Finish Giscus config (after GitHub repo)
- Analytics (Plausible/Umami)
- PWA (offline recent posts)

## Notes
- Linting is skipped during build on purpose (`next.config.mjs`).
- For faster images in prod, install `sharp`.