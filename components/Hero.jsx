"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Hero() {
  const prefersReduced = useReducedMotion();

  // Keyboard shortcuts: B -> /blogs, C -> /cooked-by-biscuit
  // attach once
  if (typeof window !== 'undefined' && !window.__biscuitKeys) {
    window.__biscuitKeys = true;
    const handler = (e) => {
      const tag = (e.target?.tagName || '').toUpperCase();
      if (['INPUT', 'TEXTAREA'].includes(tag)) return;
      const k = e.key?.toLowerCase();
      if (k === 'b') window.location.href = '/blogs';
      if (k === 'c') window.location.href = '/cooked-by-biscuit';
    };
    window.addEventListener('keydown', handler);
  }

  return (
    <section className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto mb-6 h-28 w-28 rounded-full overflow-hidden relative">
          <Image alt="BiscuitBreaker" src="/avatar.jpg" width={112} height={112} className="h-full w-full object-cover" />
          {!prefersReduced && (
            <motion.span
              className="absolute inset-0 rounded-full ring-2 ring-white/10"
              animate={{ boxShadow: [
                '0 0 0 0 rgba(99,102,241,0.3)',
                '0 0 0 8px rgba(236,72,153,0.15)',
                '0 0 0 0 rgba(45,212,191,0.25)'
              ] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}
        </div>
        <h1 className="font-[family-name:var(--font-sora)] text-4xl font-semibold">BiscuitBreaker</h1>
        <p className="mt-3 text-white/75">Minimal, playful notes and builds.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/blogs" className="rounded-full px-5 py-2 text-white/90 transition glass">Blogs <span className="text-white/50 text-xs ml-1">(B)</span></Link>
          <Link href="/cooked-by-biscuit" className="rounded-full px-5 py-2 text-white/90 transition glass">Cooked By Biscuit <span className="text-white/50 text-xs ml-1">(C)</span></Link>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-white/70">
          {/* Replace with your profiles later */}
          <a href="#" aria-label="GitHub" className="hover:text-white"><Github size={18} /></a>
          <a href="#" aria-label="Twitter/X" className="hover:text-white"><Twitter size={18} /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={18} /></a>
        </div>
      </motion.div>
    </section>
  );
}
