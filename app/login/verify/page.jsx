import BackButton from '../../../components/BackButton';

export default function VerifyPage() {
  return (
    <main className="max-w-md mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-4">Check your email</h1>
      <p className="text-white/80">We sent a sign-in link to your email.</p>
    </main>
  );
}
