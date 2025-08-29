import { NextResponse } from 'next/server';
import { getAllPosts } from '../../lib/posts';

export const dynamic = 'force-static';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const posts = await getAllPosts();
  const body = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'BiscuitBlog',
    home_page_url: base,
    feed_url: `${base}/feed.json`,
    items: posts.map(p => ({
      id: `${base}/blogs/${p.slug}`,
      url: `${base}/blogs/${p.slug}`,
      title: p.title,
      date_published: new Date(p.date).toISOString(),
      summary: p.excerpt,
      tags: p.tags,
    })),
  };
  return NextResponse.json(body);
}
