"use client";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import BackButton from '../../components/BackButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    const res = await signIn('email', { email, redirect: false });
    if (res?.error) setError(res.error);
    else setSent(true);
  }

  return (
    <main className="max-w-md mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-4">Login</h1>
      {sent ? (
        <p className="text-white/80">Check your email for the sign-in link.</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/70">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded px-3 py-2 glass-input" required />
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button className="rounded px-4 py-2 glass">Send magic link</button>
        </form>
      )}
    </main>
  );
}
