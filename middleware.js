import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // public routes
        const publicPaths = [
          '/login',
          '/login/verify',
          '/login/error',
          '/api/auth',
          '/robots.txt',
          '/sitemap.xml',
          '/feed',
          '/feed.json',
          '/og',
        ];
        if (publicPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) return true;
        // allow next static and images
        if (pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.startsWith('/patterns') || pathname.startsWith('/memories')) return true;
        // require token (logged in)
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api/preview).*)'],
};
