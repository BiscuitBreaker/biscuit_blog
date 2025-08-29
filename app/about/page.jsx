import BackButton from '../../components/BackButton';

export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-4">About</h1>
      <p className="text-white/80">This is BiscuitBlog. Stories, code, and memories—served fresh.</p>
    </main>
  );
}
