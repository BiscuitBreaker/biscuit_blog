import BackButton from '../../../components/BackButton';

export default function LoginErrorPage() {
  return (
    <main className="max-w-md mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-4">Login error</h1>
      <p className="text-white/80">Your sign-in request could not be completed.</p>
    </main>
  );
}
