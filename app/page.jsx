import Hero from '../components/Hero';
import FeaturedPost from '../components/FeaturedPost';
import MemoriesPeek from '../components/MemoriesPeek';

export default async function HomePage() {
  return (
    <main className="px-6 py-12 bakery-bg">
      <div className="max-w-3xl mx-auto">
        <Hero />
        <div className="mt-12">
          <FeaturedPost />
        </div>
        <div className="mt-12">
          <MemoriesPeek />
        </div>
      </div>
    </main>
  );
}
