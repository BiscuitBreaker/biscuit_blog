"use client";
import { useMemo, useState } from 'react';
import BackButton from '../../../components/BackButton';
import data from '../../../data/memories.json';

const PASSPHRASE = 'bikki';

const empty = () => ({
  id: '',
  date: new Date().toISOString().slice(0, 10),
  type: 'text',
  title: '',
  description: '',
  mediaUrl: '',
  externalUrl: '',
  tags: '',
});

export default function AdminMemoriesPage() {
  const [ok, setOk] = useState(false);
  const [items, setItems] = useState(() => [...(data.items || [])]);
  const [form, setForm] = useState(empty());
  const [err, setErr] = useState('');

  const sorted = useMemo(() => {
    return [...items].sort((a,b)=> new Date(b.date) - new Date(a.date));
  }, [items]);

  function onGate(e) {
    e.preventDefault();
    const v = new FormData(e.currentTarget).get('pass');
    if ((v || '').toString().trim() === PASSPHRASE) setOk(true);
  }

  function onAdd(e) {
    e.preventDefault();
    setErr('');
    if (!form.id.trim()) return setErr('ID is required');
    if (items.some(i => i.id === form.id.trim())) return setErr('ID already exists');
    if (!form.title.trim()) return setErr('Title is required');
    if (!form.date) return setErr('Date is required');
    const next = {
      id: form.id.trim(),
      date: form.date,
      type: form.type,
      title: form.title.trim(),
      description: form.description?.trim() || undefined,
      mediaUrl: form.mediaUrl?.trim() || undefined,
      externalUrl: form.externalUrl?.trim() || undefined,
      tags: form.tags ? form.tags.split(',').map(t=>t.trim()).filter(Boolean) : undefined,
    };
    setItems(prev => [...prev, next]);
    setForm(empty());
  }

  function onRemove(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function onDownload() {
    const body = JSON.stringify({ items }, null, 2);
    const blob = new Blob([body], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'memories.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function onReset() {
    setItems([...(data.items || [])]);
    setForm(empty());
    setErr('');
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-6">Admin · Memories</h1>
      {!ok ? (
        <form onSubmit={onGate} className="space-y-3 max-w-sm">
          <label className="block text-sm text-white/70">Passphrase</label>
          <input name="pass" type="password" className="w-full rounded px-3 py-2 glass-input" />
          <button className="rounded px-3 py-2 glass">Enter</button>
        </form>
      ) : (
        <div className="space-y-8">
          <section>
            <p className="text-white/70 text-sm mb-3">
              This edits a local copy of <code>data/memories.json</code>. Click "Download JSON" and replace the file in your repo, then commit and deploy.
            </p>
            <div className="flex gap-3">
              <button onClick={onDownload} className="rounded px-3 py-2 glass">Download JSON</button>
              <button onClick={onReset} className="rounded px-3 py-2 border border-white/10">Reset Changes</button>
            </div>
          </section>

          <section>
            <h2 className="text-white/90 mb-2">Add Item</h2>
            {err && <div className="text-red-400 text-sm mb-2">{err}</div>}
            <form onSubmit={onAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70">ID</label>
                  <input value={form.id} onChange={(e)=>setForm({...form,id:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
                </div>
                <div>
                  <label className="block text-sm text-white/70">Date</label>
                  <input type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-white/70">Type</label>
                  <select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} className="w-full rounded px-3 py-2 glass-input">
                    <option value="text">text</option>
                    <option value="image">image</option>
                    <option value="video">video</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-white/70">Title</label>
                  <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/70">Description</label>
                <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70">Media URL (for image/video)</label>
                  <input value={form.mediaUrl} onChange={(e)=>setForm({...form,mediaUrl:e.target.value})} className="w-full rounded px-3 py-2 glass-input" placeholder="/memories/file.jpg or https://..." />
                </div>
                <div>
                  <label className="block text-sm text-white/70">External URL (optional)</label>
                  <input value={form.externalUrl} onChange={(e)=>setForm({...form,externalUrl:e.target.value})} className="w-full rounded px-3 py-2 glass-input" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/70">Tags (comma separated)</label>
                <input value={form.tags} onChange={(e)=>setForm({...form,tags:e.target.value})} className="w-full rounded px-3 py-2 glass-input" placeholder="bake, chocolate" />
              </div>
              <button className="rounded px-4 py-2 glass">Add Item</button>
            </form>
          </section>

          <section>
            <h2 className="text-white/90 mb-2">Current Items ({items.length})</h2>
            <ul className="space-y-3">
              {sorted.map((i) => (
                <li key={i.id} className="flex items-start justify-between gap-3 p-3 glass rounded">
                  <div>
                    <div className="text-white/60 text-xs">{new Date(i.date).toDateString()} • {i.type}</div>
                    <div className="text-white">{i.title}</div>
                    {i.mediaUrl && <div className="text-white/60 text-xs break-all">{i.mediaUrl}</div>}
                  </div>
                  <button onClick={()=>onRemove(i.id)} className="px-2 py-1 text-sm border border-white/10 rounded">Delete</button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
