"use client";
import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';

export default function SearchBox({ initialItems = [] }) {
  const [query, setQuery] = useState('');
  const fuse = useMemo(() => new Fuse(initialItems, { keys: ['title', 'excerpt', 'tags'], threshold: 0.35 }), [initialItems]);
  const results = query ? fuse.search(query).map(r => r.item) : initialItems;

  return (
    <div>
      <input
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        placeholder="Search posts…"
        className="w-full rounded bg-neutral-900 border border-white/10 px-3 py-2"
      />
      {query && (
        <ul className="space-y-5 mt-4">
          {results.map((p) => (
            <li key={p.slug}>
              <Link href={`/blogs/${p.slug}`} className="text-white hover:text-accent-teal">
                <div className="text-lg font-medium">{p.title}</div>
                <div className="text-white/60 text-sm">{new Date(p.date).toDateString()} • {p.readingTime?.text}</div>
                <p className="text-white/70 mt-1">{p.excerpt}</p>
              </Link>
            </li>
          ))}
          {!results.length && <li className="text-white/60">No matches.</li>}
        </ul>
      )}
    </div>
  );
}
