import Link from 'next/link';
import { getAllPostsMeta } from '../lib/posts';

export default async function FeaturedPost() {
  const { posts } = await getAllPostsMeta(1, 1);
  const p = posts[0];
  if (!p) return null;
  return (
    <div className="rounded-lg p-5 transition glass">
      <div className="text-xs text-white/60">Featured</div>
      <Link href={`/blogs/${p.slug}`}>
        <h2 className="mt-1 text-xl font-medium">{p.title}</h2>
      </Link>
      <div className="text-white/60 text-sm">{new Date(p.date).toDateString()} • {p.readingTime?.text}</div>
      <p className="text-white/80 mt-2 line-clamp-2">{p.excerpt}</p>
      <div className="mt-4">
        <Link href={`/blogs/${p.slug}`} className="inline-block rounded border border-white/10 px-4 py-1.5 hover:bg-white/5">Read</Link>
      </div>
    </div>
  );
}
