import { slugs, getAllTags } from '../lib/posts';

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pages = ['/', '/blogs', '/cooked-by-biscuit', '/tags', '/archive', '/about'];
  const postSlugs = await slugs();
  const tags = await getAllTags();
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified: new Date() })),
    ...postSlugs.map((s) => ({ url: `${base}/blogs/${s}`, lastModified: new Date() })),
    ...tags.map((t) => ({ url: `${base}/tags/${encodeURIComponent(t.tag)}`, lastModified: new Date() })),
  ];
}
