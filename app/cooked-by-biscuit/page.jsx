import BackButton from '../../components/BackButton';
import Timeline from '../../components/Timeline';
import data from '../../data/memories.json';

export const dynamic = 'force-static';

export default function CookedByBiscuitPage() {
  const items = [...data.items].sort((a,b) => new Date(b.date) - new Date(a.date));
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-6">Cooked By Biscuit</h1>
      <Timeline items={items} />
    </main>
  );
}
