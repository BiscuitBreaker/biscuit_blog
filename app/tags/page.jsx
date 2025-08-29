import Link from 'next/link';
import BackButton from '../../components/BackButton';
import { getAllTags } from '../../lib/posts';

export const dynamic = 'force-static';

export default async function TagsPage() {
  const tags = await getAllTags();
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-4">Tags</h1>
      <ul className="flex flex-wrap gap-3">
        {tags.map(t => (
          <li key={t.tag}>
            <Link href={`/tags/${encodeURIComponent(t.tag)}`} className="px-3 py-1 rounded border border-white/10 hover:bg-white/5">
              #{t.tag} <span className="text-white/50">({t.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
