"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function BackButton({ fallback = '/' }) {
  const router = useRouter();
  return (
    <div className="mb-6">
      <button
        onClick={() => (history.length > 1 ? router.back() : router.push(fallback))}
        className="inline-flex items-center gap-2 text-white/80 hover:text-white"
      >
        <ChevronLeft size={18} /> Back
      </button>
    </div>
  );
}
