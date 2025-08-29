import { NextResponse } from 'next/server';
import { getAllPosts } from '../../lib/posts';

export const dynamic = 'force-static';

function escape(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

export async function GET(req) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const posts = await getAllPosts();
  const items = posts.map(p => `
    <item>
      <title>${escape(p.title || '')}</title>
      <link>${base}/blogs/${p.slug}</link>
      <guid>${base}/blogs/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escape((p.excerpt || '').toString())}</description>
    </item>
  `).join('\n');
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>BiscuitBlog</title>
      <link>${base}</link>
      <description>Fresh posts from BiscuitBlog</description>
      ${items}
    </channel>
  </rss>`;
  return new NextResponse(rss, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
