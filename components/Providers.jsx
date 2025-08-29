"use client";
import { ThemeProvider } from 'next-themes';
import PageTransition from './PageTransition';
import CommandPalette from './CommandPalette';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <CommandPalette />
        <PageTransition>{children}</PageTransition>
      </ThemeProvider>
    </SessionProvider>
  );
}
