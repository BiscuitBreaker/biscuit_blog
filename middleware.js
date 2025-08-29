import { withAuth } from 'next-auth/middleware';
const AUTH_DISABLED = process.env.AUTH_DISABLED === 'true';

export default withAuth(
  function middleware() {},
  {
    pages: { signIn: '/login' },
    callbacks: {
      authorized: ({ token, req }) => {
        if (AUTH_DISABLED) return true; // bypass auth when explicitly disabled (e.g., local dev)
        const { pathname } = req.nextUrl;
        // Public routes
        const publicPaths = [
          '/login',
          '/login/verify',
          '/login/error',
          '/robots.txt',
          '/sitemap.xml',
          '/feed',
          '/feed.json',
          '/og',
        ];
        if (pathname.startsWith('/api/auth')) return true; // always allow auth endpoints
        if (publicPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) return true;
        // Static assets
        if (
          pathname.startsWith('/_next') ||
          pathname.startsWith('/favicon') ||
          pathname.startsWith('/patterns') ||
          pathname.startsWith('/memories')
        ) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  // Exclude auth, login, and static/public endpoints from middleware to avoid loops
  matcher: [
    '/((?!api/auth|api/preview|login|feed|feed.json|sitemap.xml|robots.txt|og|_next/static|_next/image|favicon.ico|patterns|memories).*)',
  ],
};
