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