"use client";
import { ThemeProvider } from 'next-themes';
import PageTransition from './PageTransition';
import CommandPalette from './CommandPalette';

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <CommandPalette />
      <PageTransition>{children}</PageTransition>
    </ThemeProvider>
  );
}
