"use client";
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import BackButton from '../../components/BackButton';

export default function LoginPage() {
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const isAuthed = status === 'authenticated';

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
  const res = await signIn('credentials', { email, passcode, redirect: false });
    if (res?.error) setError(res.error);
  }

  return (
    <main className="max-w-md mx-auto px-6 py-8">
      <BackButton />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl mb-4">Login</h1>
      {isAuthed ? (
        <p className="text-white/80">You are already signed in. <a href="/" className="underline">Go home</a>.</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/70">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded px-3 py-2 glass-input" required />
          </div>
          <div>
            <label className="block text-sm text-white/70">Passcode</label>
            <input type="password" value={passcode} onChange={(e)=>setPasscode(e.target.value)} className="w-full rounded px-3 py-2 glass-input" required />
            <p className="text-white/40 text-xs mt-1">Ask the owner for the passcode.</p>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button className="rounded px-4 py-2 glass">Sign in</button>
        </form>
      )}
    </main>
  );
}
