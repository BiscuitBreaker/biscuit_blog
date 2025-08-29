import Link from 'next/link';
import BackButton from '../../../components/BackButton';
import { getPostsByTag } from '../../../lib/posts';

export const dynamic = 'force-static';

export default async function TagDetailPage({ params, searchParams }) {
  const page = Number(searchParams?.page || 1);
  const { posts, totalPages } = await getPostsByTag(decodeURIComponent(params.tag), page, 10);
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-4">#{decodeURIComponent(params.tag)}</h1>
      <ul className="space-y-5 mt-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <div className="rounded p-4 transition glass">
              <Link href={`/blogs/${p.slug}`} className="text-white hover:text-accent-teal">
                <div className="text-lg font-medium">{p.title}</div>
                <div className="text-white/60 text-sm">{new Date(p.date).toDateString()} • {p.readingTime?.text}</div>
                <p className="text-white/70 mt-1">{p.excerpt}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex items-center gap-3">
        {page > 1 && (
          <Link href={`/tags/${encodeURIComponent(params.tag)}?page=${page - 1}`} className="px-3 py-1 border border-white/10 rounded">Prev</Link>
        )}
        {page < totalPages && (
          <Link href={`/tags/${encodeURIComponent(params.tag)}?page=${page + 1}`} className="px-3 py-1 border border-white/10 rounded">Next</Link>
        )}
      </div>
    </main>
  );
}
