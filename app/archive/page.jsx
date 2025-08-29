import Link from 'next/link';
import BackButton from '../../components/BackButton';
import { getAllPosts } from '../../lib/posts';

export const dynamic = 'force-static';

export default async function ArchivePage() {
  const posts = await getAllPosts();
  const groups = new Map();
  for (const p of posts) {
    const d = new Date(p.date);
    if (isNaN(d)) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }
  const sortedKeys = Array.from(groups.keys()).sort((a,b)=> b.localeCompare(a));
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-4">Archive</h1>
      <div className="space-y-8">
        {sortedKeys.map(key => {
          const [year, month] = key.split('-');
          const monthName = new Date(Number(year), Number(month)-1, 1).toLocaleString('en', { month: 'long' });
          const items = groups.get(key);
          return (
            <section key={key}>
              <h2 className="text-white/80 mb-2">{monthName} {year}</h2>
              <ul className="space-y-3">
                {items.map((p)=> (
                  <li key={p.slug}>
                    <div className="rounded p-3 glass">
                      <Link href={`/blogs/${p.slug}`} className="hover:text-accent-teal">
                        {p.title}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
