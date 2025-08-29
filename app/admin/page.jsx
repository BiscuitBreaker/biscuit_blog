"use client";
import { useState } from 'react';
import BackButton from '../../components/BackButton';
import Link from 'next/link';

const PASSPHRASE = 'bikki';

export default function AdminPage() {
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', tags: '', cover: '', body: '' });

  function onGate(e) {
    e.preventDefault();
    const v = new FormData(e.currentTarget).get('pass');
    if ((v || '').toString().trim() === PASSPHRASE) setOk(true);
  }

  function onGen(e) {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 10);
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const fm = `---\ntitle: ${form.title}\nslug: ${slug}\ndate: ${date}\nexcerpt: ${form.excerpt}\ntags: [${form.tags}]\nauthor: BiscuitBreaker\ncover: ${form.cover}\n---\n\n`;
    const content = fm + form.body + '\n';
    const blob = new Blob([content], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${date}-${slug}.mdx`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-6">Admin</h1>
  {!ok ? (
        <form onSubmit={onGate} className="space-y-3 max-w-sm">
          <label className="block text-sm text-white/70">Passphrase</label>
          <input name="pass" type="password" className="w-full rounded px-3 py-2 glass-input" />
          <button className="rounded px-3 py-2 glass">Enter</button>
        </form>
      ) : (
        <>
        <div className="mb-6">
          <Link href="/admin/memories" className="px-3 py-2 rounded glass inline-block">Go to Memories Admin →</Link>
        </div>
        <form onSubmit={onGen} className="space-y-4">
          <div>
            <label className="block text-sm text-white/70">Title</label>
            <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70">Slug (optional)</label>
              <input value={form.slug} onChange={(e)=>setForm({...form,slug:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
            </div>
            <div>
              <label className="block text-sm text-white/70">Tags (comma separated)</label>
              <input value={form.tags} onChange={(e)=>setForm({...form,tags:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/70">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e)=>setForm({...form,excerpt:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
          </div>
          <div>
            <label className="block text-sm text-white/70">Cover URL (optional)</label>
            <input value={form.cover} onChange={(e)=>setForm({...form,cover:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
          </div>
          <div>
            <label className="block text-sm text-white/70">Body (MDX)</label>
            <textarea rows={12} value={form.body} onChange={(e)=>setForm({...form,body:e.target.value})} className="w-full rounded px-3 py-2 font-mono glass-input" />
          </div>
          <button className="rounded px-4 py-2 glass">Download MDX</button>
        </form>
        </>
      )}
    </main>
  );
}
