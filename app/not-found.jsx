import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold">Lost in the crumbs</h1>
      <p className="text-white/70 mt-2">That page was overbaked or never existed.</p>
      <Link href="/" className="inline-block mt-6 rounded border border-white/10 px-4 py-2">Go home</Link>
    </main>
  );
}
