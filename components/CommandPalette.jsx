"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const router = useRouter();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Cooked By Biscuit', href: '/cooked-by-biscuit' },
  ];
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="mx-auto mt-24 max-w-md rounded-lg p-3 glass" onClick={(e)=>e.stopPropagation()}>
        <input autoFocus value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search…" className="w-full rounded bg-neutral-800 px-3 py-2 outline-none" />
        <ul className="mt-2 divide-y divide-white/5">
          {filtered.map((i) => (
            <li key={i.href}>
              <button className="w-full text-left px-2 py-2 hover:bg-white/5" onClick={()=>{ router.push(i.href); setOpen(false); }}>
                {i.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="text-white/40 text-xs mt-2">Press Esc to close</div>
      </div>
    </div>
  );
}
