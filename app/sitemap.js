import { slugs } from '../lib/posts';

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pages = ['/', '/blogs', '/cooked-by-biscuit'];
  const postSlugs = await slugs();
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified: new Date() })),
    ...postSlugs.map((s) => ({ url: `${base}/blogs/${s}`, lastModified: new Date() })),
  ];
}
