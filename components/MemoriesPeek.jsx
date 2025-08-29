import data from '../data/memories.json';
import Link from 'next/link';

export default async function MemoriesPeek() {
  const items = data.items.slice(0, 3);
  if (!items.length) return null;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-medium">Latest crumbs</h2>
        <Link href="/cooked-by-biscuit" className="text-white/70 hover:text-white text-sm">See all</Link>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((it) => (
      <div key={it.id} className="rounded p-3 transition glass">
            <div className="text-white/60 text-xs">{new Date(it.date).toLocaleDateString()}</div>
            <div className="text-white mt-1 text-sm font-medium line-clamp-1">{it.title}</div>
            {it.description && <div className="text-white/70 text-sm line-clamp-2 mt-1">{it.description}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
