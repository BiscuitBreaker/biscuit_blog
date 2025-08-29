import './globals.css';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';
import Providers from '../components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jet' });

export const metadata = {
  title: 'Biscuit Blog',
  description: 'Minimal, playful blog by BiscuitBreaker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} ${jetbrains.variable} bg-bg text-fg antialiased`}>
        <Providers>
          <div className="min-h-dvh">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
