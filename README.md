# Biscuit Blog (BiscuitBreaker)

Next.js (App Router) blog with MDX, Tailwind, dark playful aesthetic, and sign-in gated access.

- JS (no TypeScript)
- Tailwind + Typography, next-themes (dark default)
- MDX in `content/posts/*`
- Pages: `/`, `/blogs`, `/blogs/[slug]`, `/cooked-by-biscuit`, `/admin`
- Hidden admin to manage the memories timeline (client-only JSON editor)

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

## Auth (allowlist + passcode, with optional Google Sign-In)
This site is protected using NextAuth:

- Credentials: email (must be allowlisted) + shared passcode
- Google: optional OAuth login; still restricted to the same allowlist

Required env vars (in Vercel and/or `.env.local`):

- Core URLs
	- `NEXT_PUBLIC_SITE_URL` – public site URL (e.g., `https://your-site.vercel.app`)
	- `NEXTAUTH_URL` – auth callback base URL (same as above in production)
	- `NEXTAUTH_SECRET` – a long random string
- Access control
	- `ALLOWLIST` – comma-separated emails allowed to log in
	- `LOGIN_PASSCODE` – shared passcode for credentials login
- Google OAuth (optional, for the Google button)
	- `GOOGLE_CLIENT_ID`
	- `GOOGLE_CLIENT_SECRET`
- Preview mode (optional)
	- `PREVIEW_SECRET` – defaults to `bikki` locally

Page routes:
- `/login` (sign-in form + Google button)
- `/login/error` (error screen)

All other routes are protected by middleware unless explicitly public (feeds, sitemap, robots, OG images, static assets, auth endpoints).

## Deploy (Vercel)
1. Push the repo to GitHub.
2. Import to Vercel.
3. Add the environment variables above for both Preview and Production.
4. If using Google, add these Authorized redirect URIs in Google Cloud:
	 - `http://localhost:3000/api/auth/callback/google` (local)
	 - `https://<your-vercel-domain>/api/auth/callback/google` (prod)
	 - Preview domains as needed.
5. Deploy. If you see OAuth errors, double-check envs and redirect URIs. You can temporarily set `NEXTAUTH_DEBUG=true` to get more logs.

## Notes
- Linting is skipped during build (`next.config.mjs`).
- For faster images in prod, consider installing `sharp`.